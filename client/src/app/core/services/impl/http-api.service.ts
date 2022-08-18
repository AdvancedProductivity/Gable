import { Injectable } from '@angular/core';
import {ElectronService} from '../electron/electron.service';
import {HttpApiElecImplService} from './electron/http-api-elec-impl.service';
import {HttpApiWebImplService} from './web/http-api-web-impl.service';
import {HttpApiHistoryCache} from '../entity/HttpApi';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(
    private electronService: ElectronService,
    private electronImpl: HttpApiElecImplService,
    private webImpl: HttpApiWebImplService
  ) { }

  public clearAllCache(){
    if (this.electronService.isElectron) {
    } else {
      return this.webImpl.clearAllCache();
    }
  }

  public addApiDefine(data: HttpApiHistoryCache): void {
    if (this.electronService.isElectron) {
      return this.electronImpl.addApiDefine(data);
    } else {
      return this.webImpl.addApiDefine(data);
    }
  }

  public updateCache(data: HttpApiHistoryCache): void {
    if (this.electronService.isElectron) {
      return this.electronImpl.updateCache(data);
    } else {
      return this.webImpl.updateCache(data);
    }
  }

  public getCache(id: number): Observable<HttpApiHistoryCache> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getCache(id);
    } else {
      return this.webImpl.getCache(id);
    }
  }

  removeCache(id: number): Promise<any> {
    if (this.electronService.isElectron) {
      return this.electronImpl.removeCache(id);
    } else {
      return this.webImpl.removeCache(id);
    }
  }
}
