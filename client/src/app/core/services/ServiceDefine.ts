import {Observable} from 'rxjs';
import {ApiMenuCollection, DashBoardShowingMetadata, OpeningNavTab} from './entity/ApiMenu';

export interface ApiMenuService{

  getMenus: () => Observable<ApiMenuCollection[]>;

  addCollection: (collectionName) => Observable<void>;

  actions: () => Observable<any>;

  getCollectionData(id: number): Observable<ApiMenuCollection>;

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
