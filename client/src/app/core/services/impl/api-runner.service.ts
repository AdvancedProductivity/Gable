import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigServiceImpl} from './ConfigServiceImpl';

@Injectable({
  providedIn: 'root'
})
export class ApiRunnerService {

  constructor(
    private config: ConfigServiceImpl,
    private httpClient: HttpClient
  ) {
  }

  public runHttp(id: number, reqBody: any): Observable<any> {
    const server = this.config.getConfigSync('proxyServer');
    return this.httpClient.post(`${server}/api/apiRunner`, {
      id,
      type: 'http',
      params: reqBody
    });
  }

  public ping(url: string): Observable<any> {
    return this.httpClient.get(`${url}/api/apiRunner`);
  }
}
