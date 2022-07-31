import { Injectable } from '@angular/core';
import {NavTabService} from '../../ServiceDefine';
import {from, Observable, of, Subject} from 'rxjs';
import {OpeningNavTab} from '../../entity/ApiMenu';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class NavTabWebImplService implements NavTabService{
  lastOpening: string;
  cache: OpeningNavTab[];
  cacheMap: Map<string, OpeningNavTab>;
  private subject = new Subject<OpeningNavTab[]>();
  constructor() {
    this.cacheMap = new Map<string, OpeningNavTab>();
  }

  getOpeningTab(): Observable<string> {
    return of(this.lastOpening);
  }

  getTabsData(): Observable<OpeningNavTab[]> {
    const o = this.subject.asObservable();
    this.getTabsDataDb().then(res => {
      this.subject.next(this.cache);
    });
    return o;
  }

  async getTabsDataDb(): Promise<OpeningNavTab[]> {
    console.log('2');
    if (this.cache === undefined) {
      this.cache = await db.openingTabs.toArray();
      console.log('zzq see get openging tabs', this.cache);
      this.cache.forEach(item => {
        this.cacheMap.set(item.tabId, item);
        if (item.opening) {
          this.lastOpening = item.tabId;
          console.log('zzqsee last opening', this.lastOpening);
        }
      });
    }
    return new Promise(resolve => {
      resolve(this.cache);
    });
  }

  openTabs(tab: OpeningNavTab): void {
    const key = tab.id + '_' + tab.type;
    console.log('handle id', key);
    if (this.lastOpening === key) {
      return;
    }
    if (this.lastOpening) {
      db.openingTabs.update(this.lastOpening, {opening: false});
    }
    const last = this.cacheMap.get(this.lastOpening);
    if (last) {
      last.opening = false;
      db.openingTabs.update(this.lastOpening, {opening: false}).then(res => {});
    }
    if (this.cacheMap.has(key)) {
      this.cacheMap.get(key).opening = true;
      this.lastOpening = key;
      db.openingTabs.update(this.lastOpening, {opening: true}).then(res => {});
    } else {
      this.lastOpening = key;
      tab.opening = true;
      tab.tabId = key;
      this.cache.push(tab);
      db.openingTabs.add(tab, key).then(res => {
        this.cacheMap.set(key, tab);
      });
    }
    this.subject.next(this.cache);
  }

  closeTab(id: string): void {
    let isOpening;
    let index = -1;
    const newArr = [];
    this.cache.forEach((item, i) => {
      if (item.tabId === id) {
        index = i;
        isOpening = item.opening;
        this.cacheMap.delete(id);
      }else {
        newArr.push(item);
      }
    });
    this.cache = newArr;
    if (isOpening && this.cache.length > 0) {
      if (index === 0) {
        this.openTabs(this.cache[0]);
      }else if (index >= this.cache.length) {
        this.openTabs(this.cache[this.cache.length - 1]);
      }else {
        this.openTabs(this.cache[index - 1]);
      }
    }
    this.subject.next(this.cache);
    db.openingTabs.delete(id).then(res => {});
  }
}
