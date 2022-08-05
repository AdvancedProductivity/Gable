/**
 * record the http api’s define
 * */
export class HttpApi {
  id?: number;
  protocol: string;
  method: string;
  host: string;
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
  bodyTextType: string;
  bodyGraphQlQuery: string;
  bodyGraphQlVar: any;
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
  return httpApi;
};

export class HttpApiResponse {
  statusCode: number;
  dateStart: number;
  dateEnd: number;
  size: number;
  body: any;
  cookies: any;
  header: any;
}
