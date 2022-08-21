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
      resolve(data);
    });
  }

  public addCollection(collection: ApiMenuCollection): Promise<any> {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addCollection', collection);
      resolve(data);
    });
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    return new Promise<ApiMenuCollection[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getAllMenus');
      resolve(data);
    });
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    return new Promise<ApiMenuItem[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('getAllMenuItems');
      resolve(data);
    });
  }

  public renameCollection(id: number, newName: string): Promise<any> {
    return new Promise<ApiMenuCollection[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('renameCollection', id, newName);
      resolve(data);
    });
  }

  public renameMenuItem(id: number, newName: string): Promise<any> {
    return new Promise<ApiMenuCollection[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('renameMenuItem', id, newName);
      resolve(data);
    });
  }

  addMenuItemToDb(apiData: ApiMenuItem) {
    return new Promise<any>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('addMenuItemToDb', apiData);
      resolve(data);
    });
  }

  public async updateTagAndVersion(id: number, tag: string, version: number): Promise<any> {
    return new Promise<ApiMenuCollection[]>(resolve => {
      const data = this.electronService.ipcRenderer.sendSync('updateTagAndVersion', id, tag, version);
      resolve(data);
    });
  }

}
