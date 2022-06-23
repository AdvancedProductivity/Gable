import { Injectable } from '@angular/core';
import {DataService} from './DataService';
import {Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebDataService implements DataService{

  constructor() { }

  clearAll(): Observable<string>  {
    return of('zzq see get data in web');
  };

  getData(): Observable<any[]> {
    return of([{id: -1, name: 'zzq see get data in web'}]);
  }

  addItem(): Observable<any> {
    console.log('run add item in web');
    return of([{id: -1, name: 'zzq see get data in web'}]);
  }
}
