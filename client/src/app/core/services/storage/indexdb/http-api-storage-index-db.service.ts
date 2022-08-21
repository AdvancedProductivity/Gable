import { Injectable } from '@angular/core';
import {HttpApi, HttpApiHistoryCache} from '../../entity/HttpApi';
import {db} from '../../db';
import {DocBlock, DocDefine, DocMenu} from '../../entity/Docs';
import {generateBlocks} from "../../utils/DocBlockGenerateUtils";

@Injectable({
  providedIn: 'root'
})
export class HttpApiStorageIndexDbService {

  constructor() { }

  public addHttp(http: HttpApi): Promise<any>{
    return db.httpApi.add(http);
  }

  public async updateApi(httpDefineId: number, apiCache: HttpApiHistoryCache): Promise<any>{
    return db.httpApi.update(httpDefineId, apiCache);
  }

  public async updateDoc(httpDefineId: number, apiHistoryCache: HttpApiHistoryCache): Promise<any> {
    let resp = null;
    const menuArr = await db.apiMenuItems.where({defineId: httpDefineId}).toArray();
    if (Array.isArray(menuArr) && menuArr.length === 1) {
      const apiMenu = menuArr[0];
      // find the doc menu
      const apiMenuId = apiMenu.id;
      const apiKey = apiMenuId + '_http';
      const docsMenu = await db.docsMenu.where({apiKey}).toArray();
      console.log('find docs menu', docsMenu);
      if (Array.isArray(docsMenu)) {
        let docMenu = null;
        if (docsMenu.length === 1) {
          docMenu = docsMenu[0];
        } else {
          docMenu = await this.createDocMenu(apiMenuId, apiMenu.collectionId, apiMenu.name);
        }
        const httpMenu = (await db.apiMenuItems.where({defineId: httpDefineId}).toArray())[0];
        const collectionMenu = (await db.apiMenus.get(httpMenu.collectionId));
        const blocks = generateBlocks(docMenu.id, apiHistoryCache, collectionMenu.id, httpMenu.id,
          httpMenu.name, collectionMenu.name, apiHistoryCache.version);
        resp = blocks;
        await db.docBlocks.where({docDefineId: docMenu.id}).delete();
        return db.docBlocks.bulkAdd(blocks);
      } else {
        console.log('doc menu is not array');
      }
    }
    return new Promise<any>(resolve => {
      resolve(resp);
    });
  }

  public async getApiDefine(id: number): Promise<any> {
    return new Promise(resolve => {
      resolve({});
    });
  }

  private async createDocMenu(apiMenuId: number, collectionId: number, name: string) {
    let resp = null;
    const collection = await db.apiMenus.get(collectionId);
    if (collection) {
      const collectionKey = collection.id + '_' + 'c';
      const docsMenu = await db.docsMenu.where({apiKey: collectionKey}).toArray();
      let docMenuCollection = null;
      if (Array.isArray(docsMenu) && docsMenu.length > 0) {
        docMenuCollection = docsMenu[0];
      }else {
        docMenuCollection = new DocMenu();
        docMenuCollection.name = collection.name;
        docMenuCollection.docId = 1;
        docMenuCollection.level = 0;
        docMenuCollection.itemCount = (await db.apiMenuItems.where({collectionId}).toArray()).length;
        docMenuCollection.parentId = 0;
        docMenuCollection.apiKey = collectionKey;
        docMenuCollection.dateCreated = new Date().getTime();
        docMenuCollection.id = await db.docsMenu.add(docMenuCollection);
        const docDefine = new DocDefine();
        docDefine.name = docMenuCollection.name;
        docDefine.version = '2.25.0';
        docDefine.time = docMenuCollection.dateCreated;
        docDefine.id = docMenuCollection.id;
        docDefine.id = await db.docDefines.add(docDefine, docDefine.id);
      }
      // add api doc menu
      resp = new DocMenu();
      resp.name = name;
      resp.docId = 1;
      resp.level = 1;
      resp.parentId = docMenuCollection.id;
      resp.itemCount = 0;
      resp.apiKey = apiMenuId + '_http';
      resp.id = await db.docsMenu.add(resp);
      const docDefine2 = new DocDefine();
      docDefine2.id = resp.id;
      docDefine2.name = resp.name;
      docDefine2.version = '2.25.0';
      docDefine2.time = new Date().getTime();
      docDefine2.id= await db.docDefines.add(docDefine2);
    }

    return new Promise(resolve => {
      resolve(resp);
    });
  }
}
