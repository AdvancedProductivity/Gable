import { Injectable } from '@angular/core';
import {MenuStorageRemoteService} from './remote/menu-storage-remote.service';
import {MenuStorageIndexDbService} from './indexdb/menu-storage-index-db.service';
import {MenuStorageElectronService} from './electron/menu-storage-electron.service';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageService {

  constructor(
    private remoteService: MenuStorageRemoteService,
    private electronService: MenuStorageElectronService,
    private indexDbService: MenuStorageIndexDbService
  ) {
  }
}
