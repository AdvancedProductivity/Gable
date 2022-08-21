import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {ConfigServiceImpl} from './ConfigServiceImpl';
import {HttpApi, HttpApiResponse} from '../entity/HttpApi';
import {ArrayData} from '../entity/ArrayData';
import {randomString} from '../utils/Uuid';
import {db} from '../db';

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
    if (server && server !== 'null') {
      return this.httpClient.post(`${server}/api/apiRunner`, {
        id,
        type: 'http',
        params: reqBody
      });
    } else {
      return from(this.runByFetch(id, reqBody));
    }
  }

  public ping(url: string): Observable<any> {
    return this.httpClient.get(`${url}/api/apiRunner`);
  }

  private async runByFetch(id: number, reqBody: HttpApi): Promise<HttpApiResponse> {
    const resp = new HttpApiResponse();
    try {
      const requestOptions: RequestInit = this.getFetchOption(reqBody);
      const url = this.parserUrl(reqBody);
      console.log('fetch url is: ', url);
      resp.startAt = new Date().getTime();
      const response = await fetch(url, requestOptions);
      const buffer = await response.arrayBuffer();
      resp.endAt = new Date().getTime();
      resp.timeTakes = resp.endAt - resp.startAt;
      resp.code = response.status;
      resp.message = response.statusText;
      console.log('resp from fetch', response);
      resp.headers = [];
      resp.cookie = [];
      response.headers.forEach((val, key) => {
        console.log('header', key, val);
        if (key === 'content-type') {
          if (val.indexOf('json') !== -1) {
            resp.bodyType = 'json';
          } else {
            resp.bodyType = val;
          }
        }
        resp.headers.push({
          key,
          value: val
        });
      });
      const data = new ArrayData();
      data.id = randomString(10);
      data.data = buffer;
      resp.size = buffer.byteLength;
      resp.arrayId = await db.arrayData.add(data);
      resp.content = String.fromCharCode.apply(null, new Uint8Array(buffer));
      if (resp.bodyType !== 'json') {
        resp.bodyType = 'text';
      }else {
        resp.bodyType = 'json';
        try {
          resp.content = JSON.stringify(JSON.parse(resp.content), null, '\t');
        }catch(e) {
        }
      }
    }catch(e){
      resp.endAt = new Date().getTime();
      resp.timeTakes = resp.endAt - resp.startAt;
      resp.bodyType = 'text';
      resp.content = e.message;
    }
    return new Promise((resolve, reject) => {
      resolve(resp);
    });
  }

  private getFetchOption(reqBody: HttpApi) {
    const requestOptions: RequestInit = {};
    requestOptions.credentials = 'omit';
    requestOptions.method = reqBody.method;
    requestOptions.redirect = 'manual';
    const headers = new Headers();
    if (reqBody.method.toUpperCase() === 'POST' || reqBody.method.toUpperCase() === 'PUT') {
      if (reqBody.bodyType === 'none') {
        return requestOptions;
      }else if (reqBody.bodyType.toUpperCase() === 'FORM_DATA') {
        const formArr = reqBody.bodyForm.filter(item => item.using && item.key);
        const formData = new FormData();
        formArr.forEach(item => {
          if (item.type === 'text') {
            formData.append(item.key, item.value);
          }
        });
        requestOptions.body = formData;
      } else if (reqBody.bodyType.toUpperCase() === 'URLENCODED') {
        const urlencoded = new URLSearchParams();
        const urlEncodedArr = reqBody.bodyUrlEncoded.filter(item => item.using && item.key);
        urlEncodedArr.forEach(item => {
          urlencoded.append(item.key, item.value);
        });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        requestOptions.body = urlencoded;
      } else if (reqBody.bodyType.toUpperCase() === 'RAW') {
        requestOptions.body = reqBody.bodyText;
        const t = reqBody.bodyText.toUpperCase();
        if (t === 'JSON') {
          headers.append('Content-Type', 'application/json');
        } else if (t === 'TEXT') {
          headers.append('Content-Type', 'text/plain');
        } else if (t === 'HTML') {
          headers.append('Content-Type', 'text/html');
        } else if (t === 'XML') {
          headers.append('Content-Type', 'application/xml');
        }
      }
    }
    const h = reqBody.header.filter(item => item.using && item.key);
    h.forEach(item => {
      headers.append(item.key, item.value);
    });
    requestOptions.headers = headers;
    return requestOptions;
  }

  private parserUrl(reqBody: HttpApi) {
    const protocol = reqBody.protocol;
    const host = reqBody.hostArr.join('.');
    const path = reqBody.pathArray.join('/');
    const baseUrl = `${protocol}://${host}:${reqBody.port}/${path}`;
    if (Array.isArray(reqBody.query) && reqBody.query.length > 0) {
      const queryArray = reqBody.query.filter(item => item.using && item.key);
      if (queryArray.length > 0) {
        const queryArr = [];
        queryArray.forEach(item => {
          queryArr.push(item.key + '=' + item.value);
        });
        return baseUrl + '?' + queryArr.join('&');
      }
    }
    return baseUrl;
  }
}
