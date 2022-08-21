import {Handler} from "../listener-handler";
import axios, {AxiosRequestHeaders} from "axios";
import {HttpApiResponse, HttpFromWeb} from "../../entity/HttpApi";
const FormData = require('form-data');

export class HttpRunner implements Handler {

  async handle(args: any[]): Promise<any> {
    console.log('req', args[1]);
    const reqBody = args[1];
    const url = this.parserUrl(args[1]);
    const resp = new HttpApiResponse();
    resp.startAt = new Date().getTime();
    try {
      const headers: AxiosRequestHeaders = {};
      const reqBodyData = this.getPostData(reqBody, headers);
      const response = await axios.request({
        url,
        method: reqBody.method,
        data: reqBodyData,
        headers,
        timeout: 3000,
        responseType: 'arraybuffer',
      });
      resp.endAt = new Date().getTime();
      resp.timeTakes = resp.endAt - resp.startAt;
      resp.code = response.status;
      resp.message = response.statusText;
      resp.headers = [];
      resp.cookie = [];
      Object.keys(response.headers).forEach(key => {
        const val = response.headers[key];
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
      resp.content = new TextDecoder().decode(new Uint8Array(response.data));
      resp.size = response.data.byteLength;
      console.log('req response', resp);
      if (resp.bodyType !== 'json') {
        resp.bodyType = 'text';
      }else {
        resp.bodyType = 'json';
        try {
          resp.content = JSON.stringify(JSON.parse(resp.content), null, '\t');
        }catch(e) {
        }
      }
    }catch (e) {
      resp.endAt = new Date().getTime();
      resp.timeTakes = resp.endAt - resp.startAt;
      resp.bodyType = 'text';
      resp.content = e.message;
      if (e.code) {
        resp.code = e.code;
      }
      if (e.response && e.response.data) {
        resp.content = new TextDecoder().decode(new Uint8Array(e.response.data));
        try {
          resp.content = JSON.stringify(JSON.parse(resp.content), null, '\t');
        }catch(e) {
        }
      }
    }
    return new Promise(resolve => {
      resolve(resp)
    })
  }

  private parserUrl(reqBody: HttpFromWeb) {
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

  private getPostData(reqBody: any, headers: any) {
    const h = reqBody.header.filter(item => item.using && item.key);
    let data = null;
    if (reqBody.method.toUpperCase() === 'POST' || reqBody.method.toUpperCase() === 'PUT') {
      if (reqBody.bodyType === 'none') {
      }else if (reqBody.bodyType.toUpperCase() === 'FORM_DATA') {
        const formArr = reqBody.bodyForm.filter(item => item.using && item.key);
        const formData = new FormData();
        formArr.forEach(item => {
          if (item.type === 'text') {
            formData.append(item.key, item.value);
          }
        });
        data = formData;
      } else if (reqBody.bodyType.toUpperCase() === 'URLENCODED') {
        const urlencoded = new URLSearchParams();
        const urlEncodedArr = reqBody.bodyUrlEncoded.filter(item => item.using && item.key);
        urlEncodedArr.forEach(item => {
          urlencoded.append(item.key, item.value);
        });
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        data = urlencoded;
      } else if (reqBody.bodyType.toUpperCase() === 'RAW') {
        data = reqBody.bodyText;
        const t = reqBody.bodyText.toUpperCase();
        if (t === 'JSON') {
          headers['Content-Type'] = 'application/json';
        } else if (t === 'TEXT') {
          headers['Content-Type'] = 'text/plain';
        } else if (t === 'HTML') {
          headers['Content-Type'] = 'text/html';
        } else if (t === 'XML') {
          headers['Content-Type'] = 'text/xml';
        }
      }
    }
    h.forEach(item => {
      headers[item.key] = item.value;
    });
    return data;
  }
}
