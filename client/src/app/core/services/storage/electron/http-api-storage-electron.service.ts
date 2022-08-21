import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache, transformToApiDefine, transformToElectronData} from '../../entity/HttpApi';
import {ElectronService} from '../../electron/electron.service';
import {generateBlocks} from "../../utils/DocBlockGenerateUtils";
import {tansBlockToElec} from "../../entity/Docs";

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageElectronService {

  constructor(
    private electronService: ElectronService
  ) { }

  public addHttp(http: HttpApi): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addHttp', transformToElectronData(http));
      console.log('addHttp', data);
      resolve(data);
    });
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any>{
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('updateApi', httpDefineId, transformToElectronData(apiCache));
      console.log('updateApi', data);
      resolve(data);
    });
  }

  public async updateDoc(httpDefineId: number, apiHistoryCache: HttpApiHistoryCache): Promise<any> {
    return new Promise<any>(resolve => {
      const menuItem = this.electronService.ipcRenderer.sendSync('getApiMenuItemByDefineId', httpDefineId);
      const collection = this.electronService.ipcRenderer.sendSync('getCollectionById', menuItem.collectionId);
      console.log('get from two data', menuItem, collection);
      const docMenuId = this.electronService.ipcRenderer.sendSync('getDocMenuOfApi', httpDefineId,
        menuItem.id, collection.id, collection.name, menuItem.name);
      console.log('get menu doc id', docMenuId);
      const blocks = generateBlocks(docMenuId, apiHistoryCache, collection.id, httpDefineId,
        menuItem.name, collection.name, apiHistoryCache.version);
      const arr = [];
      if (blocks.length > 0) {
        blocks.forEach(item => {
          arr.push(tansBlockToElec(item));
        });
      }
      const data = this.electronService.ipcRenderer.sendSync('updateOrCreateBlock', docMenuId,
        null, arr);
      console.log('updateOrCreateBlock', data);
    });
  }

  public async getApiDefine(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getApiDefine', id);
      console.log('getApiDefine', id, data);
      resolve(transformToApiDefine(data));
    });
  }
}
