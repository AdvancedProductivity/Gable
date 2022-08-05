import {Injectable} from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {from, map, Observable, of, Subject} from 'rxjs';
import {ApiMenuCollection, ApiMenuItem, MenuEvent} from '../../entity/ApiMenu';
import {db} from '../../db';
import {initHttpApi} from '../../entity/HttpApi';
import {HttpApiService} from '../http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuWebImplService implements ApiMenuService{
  menuActions: any;
  private menuActionListener = new Subject<MenuEvent>();
  private cache: ApiMenuCollection[];
  private cacheMap = new Map<number, ApiMenuCollection>();

  constructor(
    private httpApiService: HttpApiService
  ) {
  }

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

  addHttp(apiName, collectionId): Observable<void> {
    return from(this.addHttpApiToDb(apiName, collectionId));
  }

  async addHttpApiToDb(name: string, collectionId: number): Promise<any> {
    const data = {
      method: 'GET',
      url: '',
    };
    const newHttp = initHttpApi();
    const httpId = await db.httpApi.add(newHttp);
    await db.apiDefines.add({type: 'http', id: httpId, define: JSON.stringify(data)}).then(res => {
      console.log('add http api ', httpId);
    });
    newHttp.id = httpId;
    this.httpApiService.addApiDefine(newHttp);
    await db.httpApiCache.add(newHttp).then(res => {
      console.log('add http api ', httpId);
    });
    const apiData: ApiMenuItem = {
      name,
      type: 'http',
      collectionId,
      tag: 'GET',
      defineId: httpId,
      version: 0
    };
    apiData.id = await db.apiMenuItems.add(apiData);
    const collectionData = this.cacheMap.get(collectionId);
    collectionData.children.push(apiData);
    this.menuActionListener.next({name: 'addHttp', data: apiData});
    return new Promise(resolve => {
    });
  }

  async getMenu(): Promise<ApiMenuCollection[]> {
    const collections = await db.apiMenus.toArray();
    const allItems = await db.apiMenuItems.toArray();
    const collectionMap = new Map<number, ApiMenuItem[]>();
    allItems.forEach(item => {
      if (collectionMap.has(item.collectionId)) {
        collectionMap.get(item.collectionId).push(item);
      }else {
        const arr = [];
        arr.push(item);
        collectionMap.set(item.collectionId, arr);
      }
    });
    collections.forEach(item => {
      if (collectionMap.has(item.id)) {
        item.children = collectionMap.get(item.id);
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

  getApiData(id: number): Observable<ApiMenuItem> {
    return from(db.apiMenuItems.get(id));
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

  updateApiName(id: number, collectionId: number, newName: string) {
    const oldData = this.cacheMap.get(collectionId);
    if (!oldData) {
      return;
    }
    let waitForRename;
    oldData.children.forEach(item => {
      if (item.id === id) {
        waitForRename = item;
      }
    });
    if (!waitForRename) {
      return;
    }
    if (waitForRename.name === newName) {
      return;
    }
    waitForRename.name = newName;
    this.menuActionListener.next({name: 'rename', data: null});
    db.apiMenuItems.update(id, {name: newName}).then(res => {
    });
  }

  getCollectionName(id: number): Observable<string> {
    if (this.cacheMap.has(id)) {
      return of(this.cacheMap.get(id).name);
    }
    return from(db.apiMenus.get(id)).pipe(
      map(item => item.name)
    );
  }
}
