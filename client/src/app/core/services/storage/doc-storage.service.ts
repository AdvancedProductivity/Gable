import { Injectable } from '@angular/core';
import {DocStorageElecService} from './electron/doc-storage-elec.service';
import {DocStorageIndexDbService} from './indexdb/doc-storage-index-db.service';
import {DocStorageRemoteService} from './remote/doc-storage-remote.service';
import {ElectronService} from '../electron/electron.service';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';
import {Doc, DocBlock, DocDefine, DocMenu} from '../entity/Docs';

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
      return this.remoteService.addDoc(doc);
    }else if (this.electronService.isElectron) {
      return this.elecService.addDoc(doc);
    }else {
      return this.indexDbService.addDoc(doc);
    }
  }

  public async getAllDocs(): Promise<Doc[]> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getAllDocs();
    } else if (this.electronService.isElectron) {
      return this.elecService.getAllDocs();
    } else {
      return this.indexDbService.getAllDocs();
    }
  }

  public async getDocMenuBaseLevel(docId: number): Promise<DocMenu[]> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getDocMenuBaseLevel(docId, 0);
    }else if (this.electronService.isElectron) {
      return this.elecService.getDocMenuBaseLevel(docId, 0);
    }else {
      return this.indexDbService.getDocMenuBaseLevel(docId, 0);
    }
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getSubMenu(parentId);
    }else if (this.electronService.isElectron) {
      return this.elecService.getSubMenu(parentId);
    }else {
      return this.indexDbService.getSubMenu(parentId);
    }
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number> {
    if (this.saveDataInRemote()) {
      return this.remoteService.addDocMenu(docMenu);
    }else if (this.electronService.isElectron) {
      return this.elecService.addDocMenu(docMenu);
    }else {
      return this.indexDbService.addDocMenu(docMenu);
    }
  }

  public async addDocDefault(id: number, newName: string): Promise<number> {
    const doc = new DocDefine();
    doc.name = newName;
    doc.version = '2.25.0';
    doc.time = new Date().getTime();
    doc.blocks = [];
    doc.id = id;
    if (this.saveDataInRemote()) {
      return this.remoteService.addDocDefaultDefine(doc, id);
    } else if (this.electronService.isElectron) {
      return this.elecService.addDocDefaultDefine(doc, id);
    } else {
      return this.indexDbService.addDocDefaultDefine(doc, id);
    }
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.updateContentCount(id, newCount);
    } else if (this.electronService.isElectron) {
      return this.elecService.updateContentCount(id, newCount);
    } else {
      return this.indexDbService.updateContentCount(id, newCount);
    }
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getBlocksByDocId(docDefineId);
    } else if (this.electronService.isElectron) {
      return this.elecService.getBlocksByDocId(docDefineId);
    } else {
      return this.indexDbService.getBlocksByDocId(docDefineId);
    }
  }

  public async updateOrCreateBlock(docId: number, arr: any[], newName: string) {
    if (this.saveDataInRemote()) {
      return this.remoteService.updateOrCreateBlock(docId, arr, newName);
    } else if (this.electronService.isElectron) {
      return this.elecService.updateOrCreateBlock(docId, arr, newName);
    } else {
      return this.indexDbService.updateOrCreateBlock(docId, arr, newName);
    }
  }

  public async getDocDefine(docDefineId: number): Promise<DocDefine> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getDocDefine(docDefineId);
    } else if (this.electronService.isElectron) {
      return this.elecService.getDocDefine(docDefineId);
    } else {
      return this.indexDbService.getDocDefine(docDefineId);
    }
  }

  public async updateName(id: number, name: string): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.updateDocMenuName(id, name);
    } else if (this.electronService.isElectron) {
      return this.elecService.updateDocMenuName(id, name);
    } else {
      return this.indexDbService.updateDocMenuName(id, name);
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }
}
