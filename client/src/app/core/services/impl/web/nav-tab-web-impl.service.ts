import { Injectable } from '@angular/core';
import {NavTabService} from '../../ServiceDefine';
import {from, Observable, of, Subject} from 'rxjs';
import {DashBoardShowingMetadata, MenuSelectedEvent, OpeningNavTab} from '../../entity/ApiMenu';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class NavTabWebImplService implements NavTabService{
  lastOpening: string;
  cache: OpeningNavTab[];
  cacheMap: Map<string, OpeningNavTab>;
  private subject = new Subject<OpeningNavTab[]>();
  private focusSubject = new Subject<MenuSelectedEvent>();
  private showingSubject = new Subject<DashBoardShowingMetadata>();
  constructor() {
    this.cacheMap = new Map<string, OpeningNavTab>();
  }

  getOpeningTab(): Observable<string> {
    return of(this.lastOpening);
  }

  getShowingTab(): Observable<DashBoardShowingMetadata> {
    return this.showingSubject.asObservable();
  }

  getFocusMenu(): Observable<MenuSelectedEvent> {
    return this.focusSubject.asObservable();
  }

  getTabsData(): Observable<OpeningNavTab[]> {
    const o = this.subject.asObservable();
    this.getTabsDataDb().then(res => {
      this.subject.next(this.cache);
    });
    return o;
  }

  async getTabsDataDb(): Promise<OpeningNavTab[]> {
    if (this.cache === undefined) {
      this.cache = await db.openingTabs.toArray();
      this.cache.forEach(item => {
        this.cacheMap.set(item.tabId, item);
        if (item.opening) {
          this.lastOpening = item.tabId;
          // initial the test dashboard view
          this.showingSubject.next({id: item.id, type: item.type, isEditing: false});
          const isCol = item.type === 'collection';
          this.focusSubject.next({
            isCollection: isCol,
            fromMenu: false,
            collectionId: isCol ? item.id : item.collectionId,
            apiId: item.id}
          );
        }
      });
    }
    return new Promise(resolve => {
      resolve(this.cache);
    });
  }

  openTabs(tab: OpeningNavTab, fromMenu: boolean, created?: boolean): void {
    const key = tab.id + '_' + tab.type;
    if (this.lastOpening === key) {
      return;
    }
    if (this.lastOpening) {
      db.openingTabs.update(this.lastOpening, {opening: false});
    }
    const last = this.cacheMap.get(this.lastOpening);
    if (last) {
      last.opening = false;
      db.openingTabs.update(this.lastOpening, {opening: false}).then(res => {
      });
    }
    if (this.cacheMap.has(key)) {
      this.cacheMap.get(key).opening = true;
      this.lastOpening = key;
      db.openingTabs.update(this.lastOpening, {opening: true}).then(res => {
      });
      // modify the test dashboard view
      this.showingSubject.next({id: tab.id, type: tab.type, isEditing: false});
    } else {
      this.lastOpening = key;
      tab.opening = true;
      tab.tabId = key;
      this.cache.push(tab);
      db.openingTabs.add(tab, key).then(res => {
        // modify the test dashboard view
        this.showingSubject.next({id: tab.id, type: tab.type, isEditing: created});
        this.cacheMap.set(key, tab);
      });
    }
    this.subject.next(this.cache);
    const isCol = tab.type === 'collection';
    this.focusSubject.next({
      isCollection: isCol,
      fromMenu,
      collectionId: isCol ? tab.id : tab.collectionId,
      apiId: tab.id
    });
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
    this.subject.next(this.cache);
    if (isOpening && this.cache.length > 0) {
      if (index === 0) {
        this.openTabs(this.cache[0], false);
      }else if (index >= this.cache.length) {
        this.openTabs(this.cache[this.cache.length - 1], false);
      }else {
        this.openTabs(this.cache[index - 1], false);
      }
    }
    db.openingTabs.delete(id).then(res => {});
  }

  closeAllTab(): void {
    const ids = this.cache.map(item => item.tabId);
    this.cache = [];
    this.cacheMap.clear();
    this.subject.next(this.cache);
    db.openingTabs.bulkDelete(ids);
  }

  updateTabName(id: number, type: string, newName: string) {
    const key = id + '_' + type;
    const oldData = this.cacheMap.get(key);
    if (oldData && oldData.name !== newName) {
      oldData.name = newName;
      db.openingTabs.update(key, {name: newName}).then(res => {});
      this.subject.next(this.cache);
    }
  }
}
