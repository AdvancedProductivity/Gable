import { Injectable } from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {ApiMenuCollection, ApiMenuItem, MenuEvent} from '../../entity/ApiMenu';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuElecImplService implements ApiMenuService{
  private subject = new Subject<any>();
  constructor() { }

  actions(): Observable<MenuEvent> {
    return this.subject.asObservable();
  }

  getMenus(): Observable<ApiMenuCollection[]> {
    return undefined;
  }

  addCollection(collectionName): Observable<void> {
    return undefined;
  }

  getCollectionData(id: number): Observable<ApiMenuCollection> {
    return undefined;
  }

  updateCollectionName(id: number, newName: string) {
    return undefined;
  }

  addHttp(apiName: string, collectionId: number): Observable<void> {
    return undefined;
  }

  getApiData(id: number): Observable<ApiMenuItem> {
    return undefined;
  }

  getCollectionName(id: number): Observable<string> {
    return undefined;
  }

  updateApiName(id: number, collectionId: number, newName: string) {
  }

  upgradeHttpDefine(coId: number, id: number, httpDefineId: number): Observable<void> {
    return undefined;
  }
}
