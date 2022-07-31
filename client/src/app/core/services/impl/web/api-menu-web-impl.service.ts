import { Injectable } from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {Observable, from} from 'rxjs';
import {ApiMenuCollection, ApiMenuItem} from '../../entity/ApiMenu';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuWebImplService implements ApiMenuService{

  constructor() { }

  getMenus(): Observable<ApiMenuCollection[]> {
    return from(this.getMenu());
  }

  async getMenu(): Promise<ApiMenuCollection[]> {
    const collections = await db.apiMenus.toArray();
    console.log('zzq see collection array', collections);
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
    });
    return new Promise(resolve => {
      resolve(collections);
    });
  }
}
