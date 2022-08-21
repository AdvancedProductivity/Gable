import { Injectable } from '@angular/core';
import {ElectronService} from '../../electron/electron.service';
import {Doc, DocBlock, DocDefine, DocMenu, tansBlockToElec, tansBlockToWebData} from '../../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocStorageElecService {

  constructor(
    private electronService: ElectronService
  ) { }

  public async addDoc(doc: Doc): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addDoc', doc);
      console.log('addDoc', data);
      resolve(data);
    });
  }

  public async getAllDocs(): Promise<Doc[]>{
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getAllDocs');
      console.log('getAllDocs', data);
      resolve(data);
    });
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]>{
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getSubMenu', parentId);
      console.log('getSubMenu', data);
      resolve(data);
    });
  }

  public async getDocMenuBaseLevel(docId: number, level: number): Promise<DocMenu[]> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getDocMenuBaseLevel', docId, level);
      console.log('getDocMenuBaseLevel', data);
      resolve(data);
    });
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number>{
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addDocMenu', docMenu);
      console.log('addDocMenu', data);
      resolve(data);
    });
  }

  public async addDocDefaultDefine(doc: DocDefine, id: number): Promise<number> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addDocDefaultDefine', doc, id);
      console.log('addDocDefaultDefine', data);
      resolve(data);
    });
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('updateContentCount', id, newCount);
      console.log('updateContentCount', data);
      resolve(data);
    });
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getBlocksByDocId', docDefineId);
      console.log('getBlocksByDocId', data);
      const arr = [];
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
          arr.push(tansBlockToWebData(item));
        });
      }
      resolve(arr);
    });
  }

  public async getDocDefine(docDefineId: number): Promise<DocDefine> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getDocDefine', docDefineId);
      console.log('getDocDefine', data);
      resolve(data);
    });
  }

  public async updateDocMenuName(id: number, name: string): Promise<number> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('updateDocMenuName', id, name);
      console.log('updateDocMenuName', data);
      resolve(data);
    });
  }

  public async updateOrCreateBlock(docId: number, arr: any[], newName: string): Promise<any> {
    const blocks = [];
    if (arr.length > 0) {
      arr.forEach(item => {
        blocks.push(tansBlockToElec(item));
      });
    }
    console.log('updateOrCreateBlock', blocks);
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('updateOrCreateBlock', docId, newName, blocks);
      console.log('updateOrCreateBlock', data);
      resolve(data);
    });
  }

  public async initBaseDoc(): Promise<string> {
    return new Promise(resolve => {
      const d = this.electronService.ipcRenderer.sendSync('getDocById', 1);
      let r = 'base doc init';
      if (d) {
        r = 'base doc have exist';
      }else {
        const doc = new Doc();
        doc.name = 'Default';
        doc.dateCreated = new Date().getTime();
        doc.id = 1;
        this.addDoc(doc).then(ro => {});
      }
      resolve(r);
    });
  }
}
