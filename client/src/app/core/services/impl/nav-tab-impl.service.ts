import { Injectable } from '@angular/core';
import {ElectronService} from '../electron/electron.service';
import {NavTabService} from '../ServiceDefine';
import {NavTabElecImplService} from './electron/nav-tab-elec-impl.service';
import {NavTabWebImplService} from './web/nav-tab-web-impl.service';
import {Observable} from 'rxjs';
import {DashBoardShowingMetadata, MenuSelectedEvent, OpeningNavTab} from '../entity/ApiMenu';

@Injectable({
  providedIn: 'root'
})
export class NavTabImplService implements NavTabService{

  constructor(
    private electronImpl: NavTabElecImplService,
    private webImpl: NavTabWebImplService
  ) { }

  public clearAllCache(){
    return this.webImpl.clearAllCache();
  }

  getOpeningTab(): Observable<string> {
    return this.webImpl.getOpeningTab();
  }

  getTabsData(): Observable<OpeningNavTab[]> {
    return this.webImpl.getTabsData();
  }

  getShowingTab(): Observable<DashBoardShowingMetadata> {
    return this.webImpl.getShowingTab();
  }

  openTabs(tab: OpeningNavTab | any, fromMenu: boolean, created?: boolean): void {
    return this.webImpl.openTabs(tab, fromMenu, created);
  }

  closeTab(id: string): void {
    return this.webImpl.closeTab(id);
  }

  closeOther(id: string): void {
    return this.webImpl.closeOther(id);
  }

  closeLeft(id: string): void {
    return this.webImpl.closeLeft(id);
  }

  closeRight(id: string): void {
    return this.webImpl.closeRight(id);
  }

  closeAllTab(): void {
    return this.webImpl.closeAllTab();
  }

  updateTabName(id: number, type: string, newName: string) {
    return this.webImpl.updateTabName(id, type, newName);
  }

  getFocusMenu(): Observable<MenuSelectedEvent> {
    return this.webImpl.getFocusMenu();
  }

  changeTab(type: string, id: number, newTag: string): void {
    return this.webImpl.changeTab(type, id, newTag);
  }
}
