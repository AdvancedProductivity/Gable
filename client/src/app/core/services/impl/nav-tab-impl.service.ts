import { Injectable } from '@angular/core';
import {ElectronService} from '../electron/electron.service';
import {NavTabService} from '../ServiceDefine';
import {NavTabElecImplService} from './electron/nav-tab-elec-impl.service';
import {NavTabWebImplService} from './web/nav-tab-web-impl.service';
import {Observable} from 'rxjs';
import {DashBoardShowingMetadata, OpeningNavTab} from '../entity/ApiMenu';

@Injectable({
  providedIn: 'root'
})
export class NavTabImplService implements NavTabService{

  constructor(
    private electronService: ElectronService,
    private electronImpl: NavTabElecImplService,
    private webImpl: NavTabWebImplService
  ) { }

  getOpeningTab(): Observable<string> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getOpeningTab();
    }
    return this.webImpl.getOpeningTab();
  }

  getTabsData(): Observable<OpeningNavTab[]> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getTabsData();
    }else {
      return this.webImpl.getTabsData();
    }
  }

  getShowingTab(): Observable<DashBoardShowingMetadata> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getShowingTab();
    }else {
      return this.webImpl.getShowingTab();
    }
  }

  openTabs(tab: OpeningNavTab, created?: boolean): void {
    if (this.electronService.isElectron) {
      return this.electronImpl.openTabs(tab, created);
    }
    return this.webImpl.openTabs(tab, created);
  }

  closeTab(id: string): void {
    if (this.electronService.isElectron) {
      return this.electronImpl.closeTab(id);
    }
    return this.webImpl.closeTab(id);
  }

  closeAllTab(): void {
    if (this.electronService.isElectron) {
      return this.electronImpl.closeAllTab();
    }
    return this.webImpl.closeAllTab();
  }

  updateTabName(id: number, type: string, newName: string) {
    if (this.electronService.isElectron) {
      return this.electronImpl.updateTabName(id, type, newName);
    }
    return this.webImpl.updateTabName(id, type, newName);
  }
}
