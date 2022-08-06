import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRunnerService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public runHttp(id: number, reqbody: any): Observable<any> {
    console.log('req is', reqbody);
    return this.httpClient.post('http://localhost:8080/api/apiRunner', {
      id,
      type: 'http',
      params: reqbody
    });
  }
}
