import {Handler} from "../listener-handler";
import {
  getApiMenuItemRepository, getDocBlockRepository,
  getDocDefineRepository,
  getDocMenuRepository,
  getDocsRepository
} from "../../config/init-datasource";
import {DocDefine, DocMenu, Docs} from "../../entity/Docs";
const { shell } = require('electron')

export class AddDoc implements Handler  {

  async handle(args: any[]): Promise<number> {
    const docsRepository = await getDocsRepository();
    console.log('add doc', args[0]);
    const saved = await docsRepository.save(args[0]);
    return new Promise(resolve => {
      resolve(saved.id);
    });
  }
}

export class GetAllDocs implements Handler  {

  async handle(args: any[]): Promise<Docs[]> {
    const docsRepository = await getDocsRepository();
    const allData = await docsRepository.find();
    return new Promise(resolve => {
      resolve(allData);
    });
  }
}

export class GetDocMenuOfApi implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('GetDocMenuOfApi', args);
    const httpDefineId = args[0];
    const apiMenuId = args[1];
    const collectionId = args[2];
    const collectionName = args[3];
    const apiName = args[4];
    const apiKey = apiMenuId + '_http';
    const docMenuRepository = await getDocMenuRepository();
    const docDefineRepository = await getDocDefineRepository();
    // add api doc menu
    let resp = await docMenuRepository.findOne({
        where: {
          apiKey
        }
      }
    );
    console.log('find doc menu for: ', apiKey, resp);
    if (!resp) {
      // create collection doc node
      const collectionKey = collectionId + '_' + 'c';
      let docMenuCollection = await docMenuRepository.findOne({
          where: {
            apiKey: collectionKey
          }
        }
      );
      if (!docMenuCollection) {
        const apiMenuItemRepository = await getApiMenuItemRepository();
        docMenuCollection = new DocMenu();
        docMenuCollection.name = collectionName;
        docMenuCollection.docId = 1;
        docMenuCollection.level = 0;
        docMenuCollection.itemCount = await apiMenuItemRepository.count({where: {collectionId: collectionId}});
        docMenuCollection.parentId = 0;
        docMenuCollection.apiKey = collectionKey;
        docMenuCollection.dateCreated = new Date().getTime();
        docMenuCollection = await docMenuRepository.save(docMenuCollection);
        let docDefine = new DocDefine();
        docDefine.name = docMenuCollection.name;
        docDefine.version = '2.25.0';
        docDefine.time = docMenuCollection.dateCreated;
        docDefine.id = docMenuCollection.id;
        docDefine = await docDefineRepository.save(docDefine);
      }
      resp = new DocMenu();
      resp.docId = 1;
      resp.level = 1;
      resp.parentId = docMenuCollection.id;
      resp.itemCount = 0;
      resp.name = apiName;
      resp.apiKey = apiMenuId + '_http';
      resp.dateCreated = new Date().getTime();
      resp = await docMenuRepository.save(resp);
      let docDefine2 = new DocDefine();
      docDefine2.id = resp.id;
      docDefine2.name = resp.name;
      docDefine2.version = '2.25.0';
      docDefine2.time = new Date().getTime();
      docDefine2 = await docDefineRepository.save(docDefine2);
    }


    return new Promise(resolve => {
      resolve(resp.id);
    });
  }
}

export class GetDocById implements Handler  {

  async handle(args: any[]): Promise<Docs> {
    const docsRepository = await getDocsRepository();
    const one = await docsRepository.findOne({
      where: {
        id: args[0]
      }
    });
    return new Promise(resolve => {
      resolve(one);
    });
  }
}

export class OpenBrowser implements Handler  {

  async handle(args: any[]): Promise<any> {
    await shell.openExternal(args[0]);
    return Promise.resolve();
  }
}

export class GetSubMenu implements Handler  {

  async handle(args: any[]): Promise<DocMenu[]> {
    console.log('get doc sub menu parent id', args);
    const docMenuRepository = await getDocMenuRepository();
    const menus = await docMenuRepository.findBy({parentId: args[0]});
    return new Promise(resolve => {
      resolve(menus);
    });
  }
}

export class GetDocMenuBaseLevel implements Handler  {

  async handle(args: any[]): Promise<DocMenu[]> {
    console.log('GetDocMenuBaseLevel', args);
    const docMenuRepository = await getDocMenuRepository();
    const menus = await docMenuRepository.findBy({docId: args[0], level: args[1]});
    return new Promise(resolve => {
      resolve(menus);
    });
  }
}


export class AddDocMenu implements Handler  {

  async handle(args: any[]): Promise<number> {
    console.log('AddDocMenu', args);
    const docMenuRepository = await getDocMenuRepository();
    const newMenu = await docMenuRepository.save(args[0]);
    return new Promise(resolve => {
      resolve(newMenu.id);
    });
  }
}



export class AddDocDefaultDefine implements Handler  {

  async handle(args: any[]): Promise<number> {
    console.log('AddDocMenu', args);
    const docDefineRepository = await getDocDefineRepository();
    args[0].id = args[1];
    const newDefine = await docDefineRepository.save(args[0]);
    return new Promise(resolve => {
      resolve(newDefine.id);
    });
  }
}




export class UpdateContentCount implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('UpdateContentCount', args);
    const docMenuRepository = await getDocMenuRepository();
    const updated = await docMenuRepository
      .createQueryBuilder()
      .update<DocMenu>(DocMenu, {itemCount: args[1]})
      .where("id = :id", {id: args[0]})
      .execute();
    return new Promise(resolve => {
      resolve(updated);
    });
  }
}


export class GetDocDefine implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('getDocDefine', args);
    const docDefineRepository = await getDocDefineRepository();
    const data = await docDefineRepository.findOne({
      where: {
        id: args[0]
      }
    });
    return new Promise(resolve => {
      resolve(data);
    });
  }
}


export class GetBlocksByDocId implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('getBlocksByDocId', args);
    const docBlockRepository = await getDocBlockRepository();
    const data = await docBlockRepository.find({
      where: {
        docDefineId: args[0]
      }
    });
    return new Promise(resolve => {
      resolve(data);
    });
  }
}


export class UpdateDocMenuName implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('updateDocMenuName', args);
    const docMenuRepository = await getDocMenuRepository();
    const updated = await docMenuRepository
      .createQueryBuilder()
      .update<DocMenu>(DocMenu, {name: args[1]})
      .where("id = :id", {id: args[0]})
      .execute();
    return new Promise(resolve => {
      resolve(updated);
    });
  }
}


export class UpdateOrCreateBlock implements Handler  {

  async handle(args: any[]): Promise<any> {
    console.log('updateDocMenuName', args);
    const docBlockRepository = await getDocBlockRepository();
    if (args[1]) {
      const docDefineRepository = await getDocDefineRepository();
      docDefineRepository
        .createQueryBuilder()
        .update<DocDefine>(DocDefine, {name: args[1]})
        .where("id = :id", {id: args[0]})
        .execute()
        .then(res => {
          console.log('update doc define name', res);
        });
    }
    await docBlockRepository.delete({docDefineId: args[0]});
    const allData = await docBlockRepository.save(args[2]);
    return new Promise(resolve => {
      resolve(allData);
    });
  }
}
