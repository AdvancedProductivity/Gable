import Dexie, { Table } from 'dexie';
import {ApiMenuCollection, ApiMenuItem} from './entity/ApiMenu';


export class AppDB extends Dexie {
  apiMenus!: Table<ApiMenuCollection, number>;
  apiMenuItems!: Table<ApiMenuItem, number>;

  constructor() {
    super('gable');
    console.log('zzq see create indexdb');
    this.version(10).stores({
      apiMenus: '++id',
      apiMenuItems: '++id, collectionId',
    });
    this.on('ready', () => {
      console.log('ok');
    });
  }

}

export const db = new AppDB();
