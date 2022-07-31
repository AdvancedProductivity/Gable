import Dexie, { Table } from 'dexie';
import {ApiMenuCollection, ApiMenuItem, OpeningNavTab} from './entity/ApiMenu';


export class AppDB extends Dexie {
  apiMenus!: Table<ApiMenuCollection, number>;
  apiMenuItems!: Table<ApiMenuItem, number>;
  openingTabs!: Table<OpeningNavTab, string>;

  constructor() {
    super('gable');
    this.version(10).stores({
      apiMenus: '++id',
      openingTabs: 'tabId',
      apiMenuItems: '++id, collectionId',
    });
    this.on('ready', () => {
      console.log('index db load success');
    });
  }

}

export const db = new AppDB();
