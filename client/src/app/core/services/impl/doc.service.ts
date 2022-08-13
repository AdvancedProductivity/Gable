import { Injectable } from '@angular/core';
import {DocStorageService} from '../storage/doc-storage.service';
import {Doc, DocMenu} from '../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private docCache: Doc[];
  constructor(private docStorageService: DocStorageService) {
  }

  public addDoc(name: string): Promise<number> {
    const doc = new Doc();
    doc.name = name;
    doc.dateCreated = new Date().getTime();
    if (!Array.isArray(this.docCache)) {
      this.docCache = [];
    }
    this.docCache.push(doc);
    return this.docStorageService.addDoc(doc);
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
    doc.name = 'New Content';
    doc.dateCreated = new Date().getTime();
    doc.id = await this.docStorageService.addDocMenu(doc);
    return new Promise(resolve => {
      resolve(doc);
    });
  }

  public async addSubLevel(docId: number, parentId: number, level: number): Promise<DocMenu> {
    const doc = new DocMenu();
    doc.docId = docId;
    doc.level = level;
    doc.itemCount = 0;
    doc.parentId = parentId;
    doc.name = 'New Content';
    doc.dateCreated = new Date().getTime();
    doc.id = await this.docStorageService.addDocMenu(doc);
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
}
