import { Injectable } from '@angular/core';
import {NavTabService} from '../../ServiceDefine';
import {Observable} from 'rxjs';
import {DashBoardShowingMetadata, OpeningNavTab} from '../../entity/ApiMenu';

@Injectable({
  providedIn: 'root'
})
export class NavTabElecImplService  implements NavTabService{

  constructor() { }

  getOpeningTab(): Observable<string> {
    return undefined;
  }

  getTabsData(): Observable<OpeningNavTab[]> {
    return undefined;
  }

  openTabs(tab: OpeningNavTab): void {
  }

  closeTab(id: string): void {
  }

  closeAllTab(): void {
  }

  getShowingTab(): Observable<DashBoardShowingMetadata> {
    return undefined;
  }

  updateTabName(id: number, type: string, newName: string) {
  }
}
