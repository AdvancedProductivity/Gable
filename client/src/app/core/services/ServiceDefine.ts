import {Observable} from 'rxjs';
import {ApiMenuCollection, OpeningNavTab} from './entity/ApiMenu';

export interface ApiMenuService{

  getMenus: () => Observable<ApiMenuCollection[]>;

  addCollection: (collectionName) => Observable<void>;

  actions: () => Observable<any>;
}

export interface NavTabService {
  openTabs(tab: OpeningNavTab): void;

  getTabsData(): Observable<OpeningNavTab[]>;

  closeTab(id: string): void;
}
