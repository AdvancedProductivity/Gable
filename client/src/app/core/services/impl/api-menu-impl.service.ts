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
    private webImpl: ApiMenuWebImplService
  ) {
  }


  getMenus(): Observable<ApiMenuCollection[]> {
    return this.webImpl.getMenus();
  }

  actions(): Observable<any> {
    return this.webImpl.actions();
  }

  /**
   * add collection. this is a menu which can expand
   * */
  addCollection(collectionName): Observable<void> {
    return this.webImpl.addCollection(collectionName);
  }

  /**
   * add http api. this is a menu which is leaf
   * */
  addHttp(apiName: string, collectionId: number): Observable<void> {
    return this.webImpl.addHttp(apiName, collectionId);
  }

  getCollectionData(id: number): Observable<ApiMenuCollection> {

    return this.webImpl.getCollectionData(id);
  }

  getApiData(id: number): Observable<ApiMenuItem> {
    return this.webImpl.getApiData(id);
  }

  updateCollectionName(id: number, newName: string) {

    return this.webImpl.updateCollectionName(id, newName);
  }

  updateApiName(id: number, collectionId: number, newName: string) {
    return this.webImpl.updateApiName(id, collectionId, newName);
  }

  getCollectionName(collectionId): Observable<string> {
    return this.webImpl.getCollectionName(collectionId);
  }

  /**
   * @param id menu id
   * @param coId collection id
   * @param httpDefineId http id
   * */
  upgradeHttpDefine(coId: number, id: number, httpDefineId: number): Observable<void> {
    return this.webImpl.upgradeHttpDefine(coId, id, httpDefineId);
  }
}
