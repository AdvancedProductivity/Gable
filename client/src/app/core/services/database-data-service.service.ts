import { Injectable } from '@angular/core';
import {DataService} from "./DataService";
import {ElectronService} from "./electron/electron.service";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatabaseDataServiceService implements DataService{

  constructor(private electronService: ElectronService) {
  }

  getData(): Observable<any[]> {
    return of(this.electronService.ipcRenderer.sendSync('get-data')).pipe(
      catchError((error: any) => {
        return new Observable(error.json)
      })
    );
  }
}
