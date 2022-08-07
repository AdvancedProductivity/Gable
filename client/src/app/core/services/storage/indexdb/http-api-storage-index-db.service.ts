import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache} from '../../entity/HttpApi';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageIndexDbService {

  constructor() { }

  public addHttp(http: HttpApi): Promise<any>{
    return db.httpApi.add(http);
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any>{
    return db.httpApi.update(httpDefineId, apiCache);
  }
}
