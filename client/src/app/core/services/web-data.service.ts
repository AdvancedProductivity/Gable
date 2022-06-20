import { Injectable } from '@angular/core';
import {ElectronService} from "./electron/electron.service";
import {DataService} from "./DataService";
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class WebDataService implements DataService{

  constructor() { }

  getData(): Observable<any[]> {
    return of([{id: -1, name: 'zzq see get data in web'}]);
  }
}
