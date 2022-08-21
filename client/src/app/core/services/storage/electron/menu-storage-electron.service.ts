import { Injectable } from '@angular/core';
import {ApiMenuCollection, ApiMenuItem} from '../../entity/ApiMenu';
import {ElectronService} from "../../electron/electron.service";

@Injectable({
  providedIn: 'root'
})
export class MenuStorageElectronService {

  constructor(
    private electronService: ElectronService
  ) {
  }

  public getCollection(id: number): Promise<any>{
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getCollectionById', id);
      console.log('getCollection by id', id, data);
      resolve(data);
    });
  }

  public getApiMenuItem(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getApiMenuItem', id);
      console.log('getApiMenuItem by id', id, data);
      resolve(data);
    });
  }

  public addCollection(collection: ApiMenuCollection): Promise<any> {
    return null;
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    console.log('get all menus in electron');
    return new Promise<ApiMenuCollection[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getAllMenus');
      console.log('getAllMenus in browser', data);
      resolve(data);
    });
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    return new Promise<ApiMenuItem[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getAllMenuItems');
      console.log('getAllMenuItems in browser', data);
      resolve(data);
    });
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
