import {Injectable} from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {from, map, Observable, of, Subject} from 'rxjs';
import {ApiMenuCollection, ApiMenuItem, MenuEvent} from '../../entity/ApiMenu';
import {db} from '../../db';
import {initHttpApi} from '../../entity/HttpApi';
import {HttpApiService} from '../http-api.service';
import {NavTabImplService} from '../nav-tab-impl.service';
import {MenuStorageService} from '../../storage/menu-storage.service';
import {HttpApiStorageService} from '../../storage/http-api-stroage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuWebImplService implements ApiMenuService{
  menuActions: any;
  private menuActionListener = new Subject<MenuEvent>();
  private cache: ApiMenuCollection[];
  private cacheMap = new Map<number, ApiMenuCollection>();

  constructor(
    private menuStorageService: MenuStorageService,
    private httpApiStorageService: HttpApiStorageService,
    private httpApiService: HttpApiService,
    private navTabImplService: NavTabImplService
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
    const collectionId = await this.menuStorageService.addCollectionToDb({name, apiCount: 0, type: 'c'});
    const collection = {id: collectionId, name, apiCount: 0, type: 'c', children: []};
    this.cache.push(collection);
    this.cacheMap.set(collectionId, collection);
    this.menuActionListener.next({name: 'add', data: collection});
    return new Promise(resolve => {});
  }

  addHttp(apiName, collectionId): Observable<void> {
    return from(this.addHttpApiToDb(apiName, collectionId));
  }

  upgradeHttpDefine(coId: number, id: number, httpDefineId: number): Observable<void> {
    this.httpApiService.getCache(httpDefineId).subscribe(apiCache => {
      this.httpApiStorageService.updateApi(httpDefineId, apiCache).then(res => {
        console.log('persistence cache finished', res);
      });
      this.menuStorageService.updateTagAndVersion(id, apiCache.method, apiCache.version).then(mr => {
        console.log('menu item update finished', mr);
      });
      this.navTabImplService.changeTab('http', id, apiCache.method);
      this.menuActionListener.next({name: 'tag', data: {collectionId: coId, id, tag: apiCache.method}});
      this.cacheMap.forEach(item => {
        if (item.id === coId) {
          item.children.forEach(menu => {
            if (menu.id === id) {
              menu.tag = apiCache.method;
              menu.version = apiCache.version;
              console.log('update menu in tree finished');
            }
          });
        }
      });
    });
    return of(null);
  }

  async addHttpApiToDb(name: string, collectionId: number): Promise<any> {
    const newHttp = initHttpApi();
    const httpId = await this.httpApiStorageService.addHttp(newHttp);
    console.log('add http req', httpId);
    newHttp.id = httpId;
    this.httpApiService.addApiDefine(newHttp);
    await db.httpApiCache.add(newHttp).then(res => {
      console.log('add http api ', httpId);
    });
    const apiData: ApiMenuItem = {
      name,
      type: 'http',
      collectionId,
      tag: newHttp.method,
      defineId: httpId,
      version: newHttp.version
    };
    apiData.id = await this.menuStorageService.addMenuItemToDb(apiData);
    const collectionData = this.cacheMap.get(collectionId);
    collectionData.children.push(apiData);
    this.menuActionListener.next({name: 'addHttp', data: apiData});
    return new Promise(resolve => {
    });
  }

  async getMenu(): Promise<ApiMenuCollection[]> {
    const data = await Promise.all([
      this.menuStorageService.getAllMenus(),
      this.menuStorageService.getAllMenuItems(),
    ]);
    const collections = data[0];
    const allItems = data[1];
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
    return from(this.menuStorageService.getCollection(id));
  }

  getApiData(id: number): Observable<ApiMenuItem> {
    return from(this.menuStorageService.getApiMenuItem(id));
  }

  updateCollectionName(id: number, newName: string) {
    const oldData = this.cacheMap.get(id);
    if (oldData.name === newName) {
      return;
    }
    oldData.name = newName;
    this.menuActionListener.next({name: 'rename', data: null});
    this.menuStorageService.renameCollection(id, newName).then(res => {
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
    this.menuStorageService.renameMenuItem(id, newName).then(res => {
    });
  }

  getCollectionName(id: number): Observable<string> {
    if (this.cacheMap.has(id)) {
      return of(this.cacheMap.get(id).name);
    }
    return from(this.menuStorageService.getCollection(id)).pipe(
      map(item => item.name)
    );
  }
}
