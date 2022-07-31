import Dexie, { Table } from 'dexie';


export class AppDB extends Dexie {

  constructor() {
    super('ngdexieliveQuery');
    this.version(1);
  }

}

export const db = new AppDB();
