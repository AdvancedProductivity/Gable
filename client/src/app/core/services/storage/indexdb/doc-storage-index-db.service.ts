import { Injectable } from '@angular/core';
import {Doc, DocBlock, DocDefine, DocMenu} from '../../entity/Docs';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class DocStorageIndexDbService {

  constructor() { }

  public async addDoc(doc: Doc): Promise<any> {
    return db.docs.add(doc);
  }

  public async getAllDocs(): Promise<Doc[]>{
    return db.docs.toArray();
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]>{
    return db.docsMenu.where({parentId}).toArray();
  }

  public async getDocMenuBaseLevel(docId: number, level: number): Promise<DocMenu[]> {
    return db.docsMenu.where({docId, level}).toArray();
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number>{
    return db.docsMenu.add(docMenu);
  }

  public async addDocDefaultDefine(doc: DocDefine, id: number): Promise<number> {
    return db.docDefines.add(doc, id);
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    return db.docsMenu.update(id, {itemCount: newCount});
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    return db.docBlocks.where({docDefineId}).toArray();
  }

  public async getDocDefine(docDefineId: number): Promise<DocDefine> {
    return db.docDefines.get(docDefineId);
  }

  public async updateDocMenuName(id: number, name: string): Promise<number> {
    return db.docsMenu.update(id, {name});
  }

  public async updateOrCreateBlock(docId: number, arr: any[], newName: string): Promise<any> {
    db.docDefines.update(docId, {name: newName}).then(res => {});
    await db.docBlocks.where({docDefineId: docId}).delete();
    return db.docBlocks.bulkAdd(arr);
  }

  public async initBaseDoc(): Promise<string> {
    const d = await db.docs.get(1);
    let r = 'base doc init';
    if (d) {
      r = 'base doc have exist';
    }else {
      const doc = new Doc();
      doc.name = 'Default';
      doc.dateCreated = new Date().getTime();
      await db.docs.add(doc, 1);
    }
    return new Promise(resolve => {
      resolve(r);
    });
  }
}
