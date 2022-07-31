import { Injectable } from '@angular/core';
import {NavTabService} from '../../ServiceDefine';
import {Observable} from 'rxjs';
import {OpeningNavTab} from '../../entity/ApiMenu';

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
}
