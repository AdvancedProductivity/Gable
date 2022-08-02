import {Observable} from 'rxjs';
import {ApiMenuCollection, ApiMenuItem, DashBoardShowingMetadata, MenuEvent, OpeningNavTab} from './entity/ApiMenu';

export interface ApiMenuService{

  getMenus: () => Observable<ApiMenuCollection[]>;

  addCollection: (collectionName) => Observable<void>;

  actions: () => Observable<MenuEvent>;

  getCollectionData(id: number): Observable<ApiMenuCollection>;

  getApiData(id: number): Observable<ApiMenuItem>;

  addHttp(apiName: string, collectionId: number): Observable<void>;

  updateCollectionName(id: number, newName: string);
}

export interface NavTabService {
  openTabs(tab: OpeningNavTab): void;

  getTabsData(): Observable<OpeningNavTab[]>;

  getShowingTab(): Observable<DashBoardShowingMetadata>;

  updateTabName(id: number, type: string, newName: string);

  closeTab(id: string): void;
  closeAllTab(): void;
}
