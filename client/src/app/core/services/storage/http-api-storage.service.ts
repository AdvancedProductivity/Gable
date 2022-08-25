import { Injectable } from '@angular/core';
import {HttpApiStorageRemoteService} from './remote/http-api-storage-remote.service';
import {HttpApiStorageElectronService} from './electron/http-api-storage-electron.service';
import {HttpApiStorageIndexDbService} from './indexdb/http-api-storage-index-db.service';
import {HttpApi, HttpApiHistoryCache} from '../entity/HttpApi';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';
import {ElectronService} from '../electron/electron.service';
import {FileUploadInfo} from '../entity/ApiPart';
import {DocBlock} from '../entity/Docs';
import {randomString} from "../utils/Uuid";
import {ArrayData} from "../entity/ArrayData";
import {db} from "../db";
import {AnalysisService} from "../analysis.service";

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageService {

  constructor(
    private config: ConfigServiceImpl,
    private electronService: ElectronService,
    private analysisService: AnalysisService,
    private remoteService: HttpApiStorageRemoteService,
    private storageElectronService: HttpApiStorageElectronService,
    private indexDbService: HttpApiStorageIndexDbService
  ) {
  }

  public async addHttp(http: HttpApi): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.addHttp(http);
    }else if (this.electronService.isElectron) {
      return this.storageElectronService.addHttp(http);
    }else {
      return this.indexDbService.addHttp(http);
    }
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.updateApi(httpDefineId, apiCache);
    }else if (this.electronService.isElectron) {
      this.storageElectronService.updateDoc(httpDefineId, apiCache).then(res => {
        console.log('update doc block in local');
      });
      return this.storageElectronService.updateApi(httpDefineId, apiCache);
    }else {
      this.indexDbService.updateDoc(httpDefineId, apiCache).then(res => {
        console.log('update doc block in web');
      });
      return this.indexDbService.updateApi(httpDefineId, apiCache);
    }
  }

  public async getApiDefine(id: number): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getApiDefine(id);
    }else if (this.electronService.isElectron) {
      return this.storageElectronService.getApiDefine(id);
    }else {
      return this.indexDbService.getApiDefine(id);
    }
  }

  public async setFile(file: any): Promise<FileUploadInfo> {
    if (this.saveDataInRemote() && this.runInRemote()) {
      this.analysisService.persistenceFile('remote').then(r => {});
      return this.remoteService.setFile(file);
    } else if (this.electronService.isElectron) {
      console.log('see file in elec', file);
      const uploadInfo = new FileUploadInfo();
      uploadInfo.id = randomString(10);
      uploadInfo.name = file.name;
      uploadInfo.path = file.path;
      this.analysisService.persistenceFile('electron').then(r => {});
      return new Promise(resolve => {
        resolve(uploadInfo);
      });
    } else {
      this.analysisService.persistenceFile('webLocal').then(r => {});
      const uploadInfo = new FileUploadInfo();
      uploadInfo.id = randomString(10);
      uploadInfo.name = file.name;
      return new Promise(resolve => {
        if (window.FileReader) {
          const reader = new FileReader();
          reader.onload = () => {
            // @ts-ignore
            const r: ArrayBuffer = reader.result;
            const waitForAdd = new ArrayData();
            waitForAdd.id = uploadInfo.id;
            waitForAdd.data = r;
            db.arrayData.add(waitForAdd, waitForAdd.id).then(rr => {
              resolve(uploadInfo);
            });
          };
          reader.readAsArrayBuffer(file);
        }
      });
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }

  private runInRemote() {
    const server = this.config.getConfigSync('proxyServer');
    return server && server !== 'null';
  }
}
