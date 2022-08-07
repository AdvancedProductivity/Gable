import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache} from '../../entity/HttpApi';
import {ConfigServiceImpl} from '../../impl/ConfigServiceImpl';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageRemoteService {

  constructor(
    private config: ConfigServiceImpl,
    private httpClient: HttpClient
  ) { }

  public async addHttp(http: HttpApi): Promise<any>{
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/collection/http`, http).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any>{
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.put(`${server}/api/collection/http`, apiCache, {
      params: {id: httpDefineId}
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getApiDefine(id: number): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/collection/httpDetail`,{
      params: {id}
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }
}
