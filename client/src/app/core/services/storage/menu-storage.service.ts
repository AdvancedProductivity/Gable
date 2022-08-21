import { Injectable } from '@angular/core';
import {MenuStorageRemoteService} from './remote/menu-storage-remote.service';
import {MenuStorageIndexDbService} from './indexdb/menu-storage-index-db.service';
import {MenuStorageElectronService} from './electron/menu-storage-electron.service';
import {ApiMenuCollection, ApiMenuItem} from '../entity/ApiMenu';
import {ElectronService} from '../electron/electron.service';
import {ConfigServiceImpl} from '../impl/ConfigServiceImpl';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageService {

  constructor(
    private electronService: ElectronService,
    private config: ConfigServiceImpl,
    private remoteService: MenuStorageRemoteService,
    private electronStorageService: MenuStorageElectronService,
    private indexDbService: MenuStorageIndexDbService
  ) {
  }

  public addCollectionToDb(collection: ApiMenuCollection): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.addCollection(collection);
    }else if (this.electronService.isElectron) {
      return this.electronStorageService.addCollection(collection);
    }else {
      return this.indexDbService.addCollection(collection);
    }
  }

  public getCollection(id: number): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getCollection(id);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.getCollection(id);
    } else {
      return this.indexDbService.getCollection(id);
    }
  }

  public getApiMenuItem(id: number): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getApiMenuItem(id);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.getApiMenuItem(id);
    } else {
      return this.indexDbService.getApiMenuItem(id);
    }
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    if (this.saveDataInRemote()) {
      console.log('get from index web');
      return this.remoteService.getAllMenus();
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.getAllMenus();
    } else {
      console.log('get from index db');
      return this.indexDbService.getAllMenus();
    }
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    if (this.saveDataInRemote()) {
      return this.remoteService.getAllMenuItems();
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.getAllMenuItems();
    } else {
      return this.indexDbService.getAllMenuItems();
    }
  }


  public renameCollection(id: number, newName: string): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.renameCollection(id, newName);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.renameCollection(id, newName);
    } else {
      return this.indexDbService.renameCollection(id, newName);
    }
  }


  public renameMenuItem(id: number, newName: string): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.renameMenuItem(id, newName);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.renameMenuItem(id, newName);
    } else {
      return this.indexDbService.renameMenuItem(id, newName);
    }
  }

  public async addMenuItemToDb(apiData: ApiMenuItem): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.addMenuItemToDb(apiData);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.addMenuItemToDb(apiData);
    } else {
      return this.indexDbService.addMenuItemToDb(apiData);
    }
  }

  public async updateTagAndVersion(id: number, tag: string, version: number): Promise<any> {
    if (this.saveDataInRemote()) {
      return this.remoteService.updateTagAndVersion(id, tag, version);
    } else if (this.electronService.isElectron) {
      return this.electronStorageService.updateTagAndVersion(id, tag, version);
    } else {
      return this.indexDbService.updateTagAndVersion(id, tag, version);
    }
  }

  private saveDataInRemote() {
    const server = this.config.getConfigSync('gableServer');
    return server && server !== 'null';
  }

}

