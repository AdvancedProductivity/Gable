import { Injectable } from '@angular/core';
import {HttpApiStorageRemoteService} from './remote/http-api-storage-remote.service';
import {HttpApiStorageElectronService} from './electron/http-api-storage-electron.service';
import {HttpApiStorageIndexDbService} from './indexdb/http-api-storage-index-db.service';

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageService {

  constructor(
    private remoteService: HttpApiStorageRemoteService,
    private electronService: HttpApiStorageElectronService,
    private indexDbService: HttpApiStorageIndexDbService
  ) { }
}
