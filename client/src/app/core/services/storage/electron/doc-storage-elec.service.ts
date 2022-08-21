import { Injectable } from '@angular/core';
import {ElectronService} from '../../electron/electron.service';
import {Doc, DocBlock, DocDefine, DocMenu} from '../../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocStorageElecService {

  constructor(
    private electronService: ElectronService
  ) { }

  public async addDoc(doc: Doc): Promise<any> {
    return null;
  }

  public async getAllDocs(): Promise<Doc[]>{
    return null;
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]>{
    return null;
  }

  public async getDocMenuBaseLevel(docId: number, level: number): Promise<DocMenu[]> {
    return null;
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number>{
    return null;
  }

  public async addDocDefaultDefine(doc: DocDefine, id: number): Promise<number> {
    return null;
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    return null;
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    return null;
  }

  public async getDocDefine(docDefineId: number): Promise<DocDefine> {
    return null;
  }

  public async updateDocMenuName(id: number, name: string): Promise<number> {
    return null;
  }

  public async updateOrCreateBlock(docId: number, arr: any[], newName: string): Promise<any> {
    return null;
  }

}
