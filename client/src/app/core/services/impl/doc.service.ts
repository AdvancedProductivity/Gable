import { Injectable } from '@angular/core';
import {DocStorageService} from '../storage/doc-storage.service';
import {Doc, DocBlock, DocDefine, DocMenu} from '../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private docCache: Doc[];
  constructor(private docStorageService: DocStorageService) {
    this.docStorageService.initBaseDoc().then(r => {
      console.log('init doc data ' +  r);
    });
  }

  public async addDoc(name: string): Promise<number> {
    const doc = new Doc();
    doc.name = name;
    doc.dateCreated = new Date().getTime();
    if (!Array.isArray(this.docCache)) {
      this.docCache = [];
    }
    const docId = await this.docStorageService.addDoc(doc);
    return new Promise(resolve => {
      doc.id = docId;
      this.docCache.push(doc);
      resolve(docId);
    });
  }

  public async getAllDocs(): Promise<Doc[]> {
    if (!this.docCache) {
      this.docCache = await this.docStorageService.getAllDocs();
    }
    return new Promise<Doc[]>(resolve => {
      resolve(this.docCache);
    });
  }

  public async getDocMenuBaseLevel(docId: number): Promise<DocMenu[]> {
    return this.docStorageService.getDocMenuBaseLevel(docId);
  }

  public async addBaseDocMenuItem(id: number): Promise<DocMenu> {
    const doc = new DocMenu();
    doc.docId = id;
    doc.level = 0;
    doc.itemCount = 0;
    doc.parentId = 0;
    doc.apiKey = '';
    doc.name = 'New Content';
    doc.dateCreated = new Date().getTime();
    doc.id = await this.docStorageService.addDocMenu(doc);
    this.docStorageService.addDocDefault(doc.id, doc.name).then(res => {});
    return new Promise(resolve => {
      resolve(doc);
    });
  }

  public async addSubLevel(parentId: number, docId: number, level: number): Promise<DocMenu> {
    const doc = new DocMenu();
    doc.docId = docId;
    doc.level = level;
    doc.itemCount = 0;
    doc.parentId = parentId;
    doc.name = 'New Content';
    doc.apiKey = '';
    doc.dateCreated = new Date().getTime();
    doc.id = await this.docStorageService.addDocMenu(doc);
    this.docStorageService.addDocDefault(doc.id, doc.name).then(res => {});
    return new Promise(resolve => {
      resolve(doc);
    });
  }

  public async updateDocItemCount(id: number, newCount: any): Promise<any> {
    return this.docStorageService.updateContentCount(id, newCount);
  }

  public async getSubMenu(id: number): Promise<DocMenu[]> {
    return this.docStorageService.getSubMenu(id);
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    return this.docStorageService.getBlocksByDocId(docDefineId);
  }

  public async getDocDefine(docId: number): Promise<DocDefine> {
    return this.docStorageService.getDocDefine(docId);
  }

  public async updateBlock(docId: number, block: any[], newName: string): Promise<DocBlock[]> {
    const arr = [];
    let index = 0;
    block.forEach(item => {
      const i = new DocBlock();
      i.docDefineId = docId;
      i.order = index++;
      i.id = item.id;
      i.data = item.data;
      i.type = item.type;
      i.config = item.config;
      arr.push(i);
    });
    await this.docStorageService.updateOrCreateBlock(docId, arr, newName);
    return new Promise(resolve => {
      resolve(arr);
    });
  }

  public async updateName(info: { name: string; id: number }): Promise<any> {
    return this.docStorageService.updateName(info.id, info.name);
  }
}
