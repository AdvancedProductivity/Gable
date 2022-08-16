import { Injectable } from '@angular/core';
import {Doc, DocBlock, DocDefine, DocMenu} from '../../entity/Docs';
import {ConfigServiceImpl} from '../../impl/ConfigServiceImpl';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocStorageRemoteService {

  constructor(
    private config: ConfigServiceImpl,
    private httpClient: HttpClient) { }

  public async addDoc(doc: Doc): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/doc`, doc).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getAllDocs(): Promise<Doc[]>{
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc`).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getSubMenu(parentId: number): Promise<DocMenu[]>{
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc/subMenu`, {
      params: {parentId}
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getDocMenuBaseLevel(docId: number, level: number): Promise<DocMenu[]> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc/menu`, {
      params: {docId, level}
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async addDocMenu(docMenu: DocMenu): Promise<number>{
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/doc/menu`, docMenu).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async addDocDefaultDefine(doc: DocDefine, id: number): Promise<number> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/doc/docDefine`, doc).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async updateContentCount(id: number, newCount: any): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc/newCount`, {params: {id, newCount}}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getBlocksByDocId(docDefineId: number): Promise<DocBlock[]> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc/blocks`, {params: {docDefineId}}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async getDocDefine(id: number): Promise<DocDefine> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/doc/define`, {params: {id}}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async updateDocMenuName(id: number, newName: string): Promise<DocDefine> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/doc/menuRename`, {}, {
      params: {
        id, newName
      }
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async updateOrCreateBlock(docId: number, arr: any[], newName: string): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/doc/blocks`, {
      id: docId,
      blocks: arr,
      name: newName
    }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }
}
