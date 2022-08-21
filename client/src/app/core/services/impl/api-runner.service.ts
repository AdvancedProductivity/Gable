import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigServiceImpl} from './ConfigServiceImpl';
import {HttpApi} from "../entity/HttpApi";
import {ArrayData} from "../entity/ArrayData";
import {randomString} from "../utils/Uuid";
import {db} from "../db";

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
    this.runByFetch(id, reqBody);
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

  private async runByFetch(id: number, reqBody: HttpApi) {
    const requestOptions: RequestInit = {};
    requestOptions.credentials = 'omit';
    requestOptions.method = reqBody.method;
    requestOptions.redirect = 'manual';
    const response = await fetch('http://localhost:12208/static/img.jpeg', requestOptions);
    console.log('resp from fetch', response);
    response.headers.forEach(function (val, key) {
      console.log('header from fetch: ' + key + ' -> ' + val);
    });
    const buffer = await response.arrayBuffer();
    const data = new ArrayData();
    data.id = randomString(10);
    data.data = buffer;
    db.arrayData.add(data).then(res => {
      console.log('data saved id, ', res);
    });
    const str = String.fromCharCode.apply(null, new Uint8Array(buffer));
    console.log(str);
  }
}
