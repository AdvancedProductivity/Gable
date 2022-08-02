import { Injectable } from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {Observable, from, Subject, of} from 'rxjs';
import {ApiMenuCollection, ApiMenuItem, MenuEvent} from '../../entity/ApiMenu';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuWebImplService implements ApiMenuService{
  menuActions: any;
  private menuActionListener = new Subject<MenuEvent>();
  private cache: ApiMenuCollection[];
  private cacheMap = new Map<number, ApiMenuCollection>();
  constructor() { }

  actions(): Observable<MenuEvent> {
    return this.menuActionListener.asObservable();
  }

  getMenus(): Observable<ApiMenuCollection[]> {
    return from(this.getMenu());
  }

  addCollection(collectionName): Observable<void> {
    return from(this.addCollectionToDb(collectionName));
  }

  async addCollectionToDb(name: string): Promise<any> {
    const collectionId = await db.apiMenus.add({name, apiCount: 0, type: 'c'});
    const collection = {id: collectionId, name, apiCount: 0, type: 'c', children: []};
    this.cache.push(collection);
    this.cacheMap.set(collectionId, collection);
    this.menuActionListener.next({name: 'add', data: collection});
    return new Promise(resolve => {});
  }

  async getMenu(): Promise<ApiMenuCollection[]> {
    const collections = await db.apiMenus.toArray();
    const allItems = await db.apiMenuItems.toArray();
    const map = new Map<number, ApiMenuItem[]>();
    allItems.forEach(item => {
      if (map.has(item.collectionId)) {
        map.get(item.collectionId).push(item);
      }else {
        const arr = [];
        arr.push(item);
        map.set(item.collectionId, arr);
      }
    });
    collections.forEach(item => {
      if (map.has(item.id)) {
        item.children = map.get(item.id);
      } else {
        item.children = [];
      }
      this.cacheMap.set(item.id, item);
    });
    this.cache = collections;
    return new Promise(resolve => {
      resolve(collections);
    });
  }

  getCollectionData(id: number): Observable<ApiMenuCollection> {
    if (this.cacheMap.has(id)) {
      return of(this.cacheMap.get(id));
    }
    return from(db.apiMenus.get(id));
  }

  updateCollectionName(id: number, newName: string) {
    const oldData = this.cacheMap.get(id);
    if (oldData.name === newName) {
      return;
    }
    oldData.name = newName;
    this.menuActionListener.next({name: 'rename', data: null});
    db.apiMenus.update(id, {name: newName}).then(res => {
    });
  }
}
