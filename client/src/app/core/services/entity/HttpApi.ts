import {rootJsonDoc} from './Docs';

/**
 * record the http api’s define
 * */
export class HttpApi {
  id?: number;
  protocol: string;
  method: string;
  host: string;
  hostArr: string[];
  port: string;
  path: string;
  pathArray: string[];
  url: string;
  query: any;
  header: any;
  bodyType: string;
  bodyForm: any;
  bodyUrlEncoded: any;
  bodyText: string;
  bodyTextDoc: any;
  respBodyTextDoc: any;
  bodyTextType: string;
  bodyGraphQlQuery: string;
  bodyGraphQlVar: any;
  version: number;
}
export class HttpApiInElec {
  id?: number;
  protocol: string;
  method: string;
  host: string;
  hostArr: string;
  port: string;
  path: string;
  pathArray: string;
  url: string;
  query: string;
  header: string;
  bodyType: string;
  bodyForm: string;
  bodyUrlEncoded: string;
  bodyText: string;
  bodyTextDoc: string;
  respBodyTextDoc: any;
  bodyTextType: string;
  bodyGraphQlQuery: string;
  bodyGraphQlVar: string;
  version: number;
}

/**
 * record the http api’s cache。 is like HttpApi
 * */
export class HttpApiHistoryCache extends HttpApi {
}

export class HttpApiHistory extends HttpApi {
  apiId: number;
}

export const initHttpApi = (): HttpApi => {
  const httpApi = new HttpApi();
  httpApi.protocol = 'http';
  httpApi.method = 'GET';
  httpApi.host = 'localhost';
  httpApi.hostArr = ['localhost'];
  httpApi.port = '80';
  httpApi.path = '';
  httpApi.pathArray = [];
  httpApi.url = 'http://localhost:80/';
  httpApi.query = [];
  httpApi.header = [];
  httpApi.bodyType = 'none';
  httpApi.bodyForm = [];
  httpApi.bodyUrlEncoded = [];
  httpApi.bodyText = '';
  httpApi.bodyTextType = 'json';
  httpApi.bodyGraphQlQuery = '';
  httpApi.bodyGraphQlVar = '';
  httpApi.version = new Date().getTime();
  httpApi.bodyTextDoc = [rootJsonDoc()];
  httpApi.respBodyTextDoc = [rootJsonDoc()];
  return httpApi;
};

export class HttpApiResponse {
  arrayId: string;
  bodyType: string;
  code: number;
  content: any;
  contentType: string;
  startAt: number;
  endAt: number;
  timeTakes: number;
  message: string;
  size: number;
  headers: any[];
  cookie: any[];
}

export const transformToElectronData = (api: HttpApi) => {
  const httpApi = new HttpApiInElec();
  httpApi.id = api.id;
  httpApi.protocol = api.protocol;
  httpApi.method = api.method;
  httpApi.host = api.host;
  httpApi.hostArr = JSON.stringify(api.hostArr);
  httpApi.port = api.port;
  httpApi.path = api.path;
  httpApi.pathArray = JSON.stringify(api.pathArray);
  httpApi.url = api.url;
  httpApi.query =JSON.stringify(api.query);
  httpApi.header = JSON.stringify(api.header);
  httpApi.bodyType = api.bodyType;
  httpApi.bodyForm = JSON.stringify(api.bodyForm);
  httpApi.bodyUrlEncoded = JSON.stringify(api.bodyUrlEncoded);
  httpApi.bodyText = api.bodyText;
  httpApi.bodyTextType = api.bodyTextType;
  httpApi.bodyGraphQlQuery = api.bodyGraphQlQuery;
  httpApi.bodyGraphQlVar = api.bodyGraphQlVar;
  httpApi.version = api.version;
  httpApi.bodyTextDoc = JSON.stringify(api.bodyTextDoc);
  httpApi.respBodyTextDoc = JSON.stringify(api.respBodyTextDoc);
  return httpApi;
};

export const transformToApiDefine = (api: HttpApiInElec) => {
  const httpApi = new HttpApi();
  httpApi.id = api.id;
  httpApi.protocol = api.protocol;
  httpApi.method = api.method;
  httpApi.host = api.host;
  httpApi.hostArr = JSON.parse(api.hostArr);
  httpApi.port = api.port;
  httpApi.path = api.path;
  httpApi.pathArray = JSON.parse(api.pathArray);
  httpApi.url = api.url;
  httpApi.query = JSON.parse(api.query);
  httpApi.header = JSON.parse(api.header);
  httpApi.bodyType = api.bodyType;
  httpApi.bodyForm = JSON.parse(api.bodyForm);
  httpApi.bodyUrlEncoded = JSON.parse(api.bodyUrlEncoded);
  httpApi.bodyText = api.bodyText;
  httpApi.bodyTextType = api.bodyTextType;
  httpApi.bodyGraphQlQuery = api.bodyGraphQlQuery;
  httpApi.bodyGraphQlVar = api.bodyGraphQlVar;
  httpApi.version = api.version;
  httpApi.bodyTextDoc = JSON.parse(api.bodyTextDoc);
  httpApi.respBodyTextDoc = JSON.parse(api.respBodyTextDoc);
  return httpApi;
};

export const getEmptyResponse = () => {
  const r = new HttpApiResponse();
  r.code = 0;
  r.content = '';
  r.timeTakes = 0;
  r.size = 0;
  r.bodyType = 'json';
  return r;
};
