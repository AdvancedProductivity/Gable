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
    return this.webImpl.clearAllCache();
  }

  public addApiDefine(data: HttpApiHistoryCache): void {
    return this.webImpl.addApiDefine(data);
  }

  public updateCache(data: HttpApiHistoryCache): void {
    return this.webImpl.updateCache(data);
  }

  public getCache(id: number): Observable<HttpApiHistoryCache> {
    return this.webImpl.getCache(id);
  }

  removeCache(id: number): Promise<any> {
    return this.webImpl.removeCache(id);
  }
}
