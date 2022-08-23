import { Injectable } from '@angular/core';
import {ApiMenuCollection, ApiMenuItem} from '../../entity/ApiMenu';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageIndexDbService {

  constructor() { }

  public addCollection(collection: ApiMenuCollection): Promise<any> {
    return db.apiMenus.add(collection);
  }

  public getCollection(id: number): Promise<any>{
    return db.apiMenus.get(id);
  }

  public getApiMenuItem(id: number): Promise<any>{
    return db.apiMenuItems.get(id);
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    return db.apiMenus.toArray();
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    return db.apiMenuItems.toArray();
  }

  public renameCollection(id: number, newName: string): Promise<any> {
    this.renameDoc(id + '_' + 'c', newName).then(r => {});
    return db.apiMenus.update(id, {name: newName});
  }

  public renameMenuItem(id: number, newName: string): Promise<any> {
    this.renameDoc(id + '_' + 'http', newName).then(r => {});
    return db.apiMenuItems.update(id, {name: newName});
  }

  async addMenuItemToDb(apiData: ApiMenuItem): Promise<any> {
    return db.apiMenuItems.add(apiData);
  }

  async updateTagAndVersion(id: number, tag: string, version: number): Promise<any> {
    return db.apiMenuItems.update(id, {tag, version});
  }

  private async renameDoc(apiKey: string, newName: string): Promise<any> {
    const res = await db.docsMenu.where({apiKey}).toArray();
    if (Array.isArray(res) && res.length === 1) {
      const docMenu = res[0];
      await db.docsMenu.update(docMenu.id, {name: newName});
      await db.docDefines.update(docMenu.id, {name: newName});
    }
    return new Promise(resolve => {
      resolve(null);
    });
  }
}
