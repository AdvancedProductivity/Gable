import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache, transformToApiDefine, transformToElectronData} from '../../entity/HttpApi';
import {ElectronService} from '../../electron/electron.service';

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

  public async getApiDefine(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getApiDefine', id);
      console.log('getApiDefine', id, data);
      resolve(transformToApiDefine(data));
    });
  }
}
