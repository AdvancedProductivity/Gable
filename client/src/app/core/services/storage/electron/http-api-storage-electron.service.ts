import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache} from '../../entity/HttpApi';

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageElectronService {

  constructor() { }

  public addHttp(http: HttpApi): Promise<any>{
    return null;
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any>{
    return null;
  }

  public async getApiDefine(id: number): Promise<any> {
    return new Promise(resolve => {
      resolve({});
    });
  }
}
