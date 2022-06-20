import { Injectable } from '@angular/core';
import {ElectronService} from "./electron/electron.service";
import {DatabaseDataServiceService} from "./database-data-service.service";
import {WebDataService} from "./web-data.service";
import {DataService} from "./DataService";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceImplService implements DataService{

  constructor(private electronService: ElectronService,
              private databaseDataServiceService: DatabaseDataServiceService,
              private webDataService: WebDataService) {
  }

  getData(): Observable<any[]> {
    console.log('zzq see get data');
    if (this.electronService.isElectron) {
      return this.databaseDataServiceService.getData();
    } else {
      return this.webDataService.getData();
    }
  }
}
