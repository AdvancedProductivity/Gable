import Dexie, { Table } from 'dexie';
import {ApiMenuCollection, ApiMenuItem, OpeningNavTab} from './entity/ApiMenu';
import {HttpApi} from './entity/HttpApi';
import {Doc, DocBlock, DocDefine, DocMenu} from './entity/Docs';


export class AppDB extends Dexie {
  apiMenus!: Table<ApiMenuCollection, number>;
  apiMenuItems!: Table<ApiMenuItem, number>;
  openingTabs!: Table<OpeningNavTab, string>;
  httpApi!: Table<HttpApi, number>;
  httpApiCache!: Table<HttpApi, number>;
  docs!: Table<Doc, number>;
  docsMenu!: Table<DocMenu, number>;
  docBlocks!: Table<DocBlock, number>;
  docDefines!: Table<DocDefine, number>;

  constructor() {
    super('gable');
    this.version(15).stores({
      apiMenus: '++id',
      docs: '++id',
      apiDefines: '++id',
      httpApi: '++id',
      httpApiCache: '++id',
      docDefines: '++id',
      openingTabs: 'tabId',
      docBlocks: '++i,docDefineId',
      docsMenu: '++id,docId,level,parentId,apiKey',
      apiMenuItems: '++id, collectionId',
    });
    this.on('ready', () => {
      this.docs.get(1).then(res => {
        console.log('zzq see docs', res);
        if (!res) {
          const doc = new Doc();
          doc.name = 'Default';
          doc.dateCreated = new Date().getTime();
          this.docs.add(doc, 1);
        }
      });
      console.log('index db load success');
    });
  }

}

export const db = new AppDB();
