import {Handler} from "../listener-handler";
import {ApiMenuCollection} from "../../entity/ApiMenuCollection";
import {
  getApiCollectionRepository, getDocBlockRepository,
  getDocDefineRepository,
  getDocMenuRepository,
  getDocsRepository
} from "../../config/init-datasource";
import {DocDefine, DocMenu, Docs} from "../../entity/Docs";
import {HttpApi} from "../../entity/HttpApi";

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
