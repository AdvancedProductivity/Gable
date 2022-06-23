import { Injectable } from '@angular/core';
import {DataService} from './DataService';
import {ElectronService} from './electron/electron.service';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseDataServiceService implements DataService{

  constructor(private electronService: ElectronService) {
  }

  clearAll(): Observable<string> {
    return of(this.electronService.ipcRenderer.sendSync('clear-data')).pipe(
      catchError((error: any) => new Observable(error.json))
    );
  }

  getData(): Observable<any[]> {
    return of(this.electronService.ipcRenderer.sendSync('get-data')).pipe(
      catchError((error: any) => new Observable(error.json))
    );
  }

  addItem(): Observable<any> {
    console.log('run add item in database');
    return of(this.electronService.ipcRenderer.sendSync('add-data')).pipe(
      catchError((error: any) => new Observable(error.json))
    );
  }
}
