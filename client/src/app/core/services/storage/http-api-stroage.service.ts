import { Injectable } from '@angular/core';
import {HttpApiStorageRemoteService} from './remote/http-api-storage-remote.service';
import {HttpApiStorageElectronService} from './electron/http-api-storage-electron.service';
import {HttpApiStorageIndexDbService} from './indexdb/http-api-storage-index-db.service';
import {HttpApi, HttpApiHistoryCache} from '../entity/HttpApi';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';
import {ElectronService} from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageService {

  constructor(
    private config: ConfigServiceImpl,
    private electronService: ElectronService,
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
      return this.storageElectronService.updateApi(httpDefineId, apiCache);
    }else {
      return this.indexDbService.updateApi(httpDefineId, apiCache);
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }
}
