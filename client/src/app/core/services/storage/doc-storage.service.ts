import { Injectable } from '@angular/core';
import {DocStorageElecService} from './electron/doc-storage-elec.service';
import {DocStorageIndexDbService} from './indexdb/doc-storage-index-db.service';
import {DocStorageRemoteService} from './remote/doc-storage-remote.service';
import {ElectronService} from '../electron/electron.service';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';
import {db} from '../db';
import {Doc} from '../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocStorageService {

  constructor(
    private config: ConfigServiceImpl,
    private electronService: ElectronService,
    private elecService: DocStorageElecService,
    private remoteService: DocStorageRemoteService,
    private indexDbService: DocStorageIndexDbService
  ) {
  }

  public async addDoc(doc: Doc): Promise<number>{
    if (this.saveDataInRemote()) {
    }else if (this.electronService.isElectron) {
    }else {
      return db.docs.add(doc);
    }
  }

  public async getAllDocs() {
    if (this.saveDataInRemote()) {
    }else if (this.electronService.isElectron) {
    }else {
      return db.docs.toArray();
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }
}
