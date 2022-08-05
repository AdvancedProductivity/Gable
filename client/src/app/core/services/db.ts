import Dexie, { Table } from 'dexie';
import {ApiDefine, ApiMenuCollection, ApiMenuItem, OpeningNavTab} from './entity/ApiMenu';
import {HttpApi} from './entity/HttpApi';


export class AppDB extends Dexie {
  apiMenus!: Table<ApiMenuCollection, number>;
  apiMenuItems!: Table<ApiMenuItem, number>;
  apiDefines!: Table<ApiDefine, number>;
  openingTabs!: Table<OpeningNavTab, string>;
  httpApi!: Table<HttpApi, number>;
  httpApiCache!: Table<HttpApi, number>;

  constructor() {
    super('gable');
    this.version(10).stores({
      apiMenus: '++id',
      apiDefines: '++id',
      httpApi: '++id',
      httpApiCache: '++id',
      openingTabs: 'tabId',
      apiMenuItems: '++id, collectionId',
    });
    this.on('ready', () => {
      console.log('index db load success');
    });
  }

}

export const db = new AppDB();
