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

  public runHttp(id: number, req: any): Observable<any> {
    return this.httpClient.post('http://localhost:2208', req);
  }
}
