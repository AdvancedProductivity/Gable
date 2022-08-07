import { Injectable } from '@angular/core';
import {ApiMenuCollection, ApiMenuItem} from '../../entity/ApiMenu';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageElectronService {

  constructor(
  ) {
  }

  public getCollection(id: number): Promise<any>{
    return null;
  }

  public getApiMenuItem(id: number): Promise<any>{
    return null;
  }

  public addCollection(collection: ApiMenuCollection): Promise<any> {
    return null;
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    return null;
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    return null;
  }

  public renameCollection(id: number, newName: string): Promise<any> {
    return null;
  }

  public renameMenuItem(id: number, newName: string): Promise<any> {
    return null;
  }

  addMenuItemToDb(apiData: ApiMenuItem) {
    return null;
  }

  public async updateTagAndVersion(id: number, tag: string, version: number): Promise<any> {
    return null;
  }

}
