import { Injectable } from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {ApiMenuCollection, MenuEvent} from '../../entity/ApiMenu';
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
}
