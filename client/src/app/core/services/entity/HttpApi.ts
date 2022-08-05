export class HttpApi {
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

export class HttpApiResponse {
  statusCode: number;
  dateStart: number;
  dateEnd: number;
  size: number;
  body: any;
  cookies: any;
  header: any;
}
