import { Injectable } from '@angular/core';
import {DocStorageElecService} from './electron/doc-storage-elec.service';
import {DocStorageIndexDbService} from './indexdb/doc-storage-index-db.service';
import {DocStorageRemoteService} from './remote/doc-storage-remote.service';
import {ElectronService} from '../electron/electron.service';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';
import {db} from '../db';
import {Doc, DocMenu} from '../entity/Docs';
import {equals} from "@ngx-translate/core/lib/util";

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

  public async getDocMenuBaseLevel(docId: number): Promise<DocMenu[]> {
    if (this.saveDataInRemote()) {
    }else if (this.electronService.isElectron) {
    }else {
      return db.docsMenu.where({docId, level: 0}).toArray();
    }
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]> {
    if (this.saveDataInRemote()) {
    }else if (this.electronService.isElectron) {
    }else {
      return db.docsMenu.where({parentId}).toArray();
    }
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number> {
    if (this.saveDataInRemote()) {
    }else if (this.electronService.isElectron) {
    }else {
      return db.docsMenu.add(docMenu);
    }
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    if (this.saveDataInRemote()) {
    } else if (this.electronService.isElectron) {
    } else {
      return db.docsMenu.update(id, {itemCount: newCount});
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }
}
