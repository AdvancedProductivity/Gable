import { Injectable } from '@angular/core';
import {ApiMenuCollection, ApiMenuItem} from '../entity/ApiMenu';
import {Observable} from 'rxjs';
import {ElectronService} from '../electron/electron.service';
import {ApiMenuWebImplService} from './web/api-menu-web-impl.service';
import {ApiMenuService} from '../ServiceDefine';
import {ApiMenuElecImplService} from './electron/api-menu-elec-impl.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuServiceImpl implements ApiMenuService{

  constructor(
    private electronService: ElectronService,
    private electronImpl: ApiMenuElecImplService,
    private webImpl: ApiMenuWebImplService
  ) {
  }


  getMenus(): Observable<ApiMenuCollection[]> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getMenus();
    } else {
      return this.webImpl.getMenus();
    }
  }

  actions(): Observable<any> {
    if (this.electronService.isElectron) {
      return this.electronImpl.actions();
    } else {
      return this.webImpl.actions();
    }
  }

  /**
   * add collection. this is a menu which can expand
   * */
  addCollection(collectionName): Observable<void> {
    if (this.electronService.isElectron) {
      return this.electronImpl.addCollection(collectionName);
    } else {
      return this.webImpl.addCollection(collectionName);
    }
  }

  /**
   * add http api. this is a menu which is leaf
   * */
  addHttp(apiName: string, collectionId: number): Observable<void> {
    if (this.electronService.isElectron) {
      return this.electronImpl.addHttp(apiName, collectionId);
    } else {
      return this.webImpl.addHttp(apiName, collectionId);
    }
  }

  getCollectionData(id: number): Observable<ApiMenuCollection> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getCollectionData(id);
    } else {
      return this.webImpl.getCollectionData(id);
    }
  }

  getApiData(id: number): Observable<ApiMenuItem> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getApiData(id);
    } else {
      return this.webImpl.getApiData(id);
    }
  }

  updateCollectionName(id: number, newName: string) {
    if (this.electronService.isElectron) {
      return this.electronImpl.updateCollectionName(id, newName);
    } else {
      return this.webImpl.updateCollectionName(id, newName);
    }
  }
}
