import {rootJsonDoc} from "./Docs";

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
  httpApi.bodyTextDoc = rootJsonDoc();
  httpApi.respBodyTextDoc = rootJsonDoc();
  return httpApi;
};

export class HttpApiResponse {
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

export const getEmptyResponse = () => {
  const r = new HttpApiResponse();
  r.code = 0;
  r.content = '';
  r.timeTakes = 0;
  r.size = 0;
  r.bodyType = 'json';
  return r;
};
