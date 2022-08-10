import { Injectable } from '@angular/core';
import {HttpApiHistoryCache} from '../../entity/HttpApi';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiElecImplService {

  constructor() { }

  public addApiDefine(data: HttpApiHistoryCache): void {
  }

  public updateCache(data: HttpApiHistoryCache): void {
  }

  public getCache(id: number): Observable<HttpApiHistoryCache> {
    return undefined;
  }

  public removeCache(id: number): Promise<any> {
    return null;
  }
}
