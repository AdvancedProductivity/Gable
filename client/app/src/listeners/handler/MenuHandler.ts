import {Handler} from "../listener-handler";
import {getApiCollectionRepository, getApiMenuItemRepository, getConfigRepository} from "../../config/init-datasource";
import {ApiMenuCollection, ApiMenuItem} from "../../entity/ApiMenuCollection";

export class GetCollectionById implements Handler {

  async handle(args: any[]): Promise<any> {
    console.log('get collection by id', args);
    const apiCol = await getApiCollectionRepository();
    return new Promise(resolve => {
      resolve(apiCol.findOne({
          where: {
            id: args[0]
          }
        }
      ));
    });
  }

}

export class GetAllMenus implements Handler  {

  async handle(args: any[]): Promise<ApiMenuCollection[]> {
    console.log('get GetAllMenus', args);

    const apiCol = await getApiCollectionRepository();
    return new Promise(resolve => {
      resolve(apiCol.find());
    });
  }
}

export class GetApiMenuItemById implements Handler  {

  async handle(args: any[]): Promise<ApiMenuItem> {
    console.log('get GetApiMenuItemById', args);
    const apiMenuItemRepository = await getApiMenuItemRepository();
    const d = await apiMenuItemRepository.findOne({
      where: {
        id: args[0]
      }
    });
    return new Promise(resolve => {
      resolve(d);
    });
  }
}

export class GetApiMenuItemByDefineId implements Handler  {

  async handle(args: any[]): Promise<ApiMenuItem> {
    console.log('get GetApiMenuItemByDefineId', args);
    const apiMenuItemRepository = await getApiMenuItemRepository();
    const d = await apiMenuItemRepository.findOne({
      where: {
        defineId: args[0]
      }
    });
    return new Promise(resolve => {
      resolve(d);
    });
  }
}


export class GetAllMenuItems implements Handler  {

  async handle(args: any[]): Promise<ApiMenuItem[]> {
    console.log('get GetAllMenuItems', args);
    const apiMenuItemRepository = await getApiMenuItemRepository();
    return new Promise(resolve => {
      resolve(apiMenuItemRepository.find());
    });
  }
}


export class AddCollection implements Handler  {

  async handle(args: any[]): Promise<number> {
    const apiMenuCollectionRepository = await getApiCollectionRepository();
    const saved = await apiMenuCollectionRepository.save(args[0]);
    return new Promise(resolve => {
      resolve(saved.id);
    });
  }
}


export class AddMenuItemToDb implements Handler  {

  async handle(args: any[]): Promise<number> {
    const menuItemRepository = await getApiMenuItemRepository();
    const saved = await menuItemRepository.save(args[0]);
    return new Promise(resolve => {
      resolve(saved.id);
    });
  }
}


export class RenameCollection implements Handler  {

  async handle(args: any[]): Promise<any> {
    const apiMenuCollectionRepository = await getApiCollectionRepository();
    const renamed = await apiMenuCollectionRepository
      .createQueryBuilder()
      .update<ApiMenuCollection>(ApiMenuCollection, {name: args[1]})
      .where("id = :id", {id: args[0]})
      .execute();
    console.log('collection rename ', renamed);
    return new Promise(resolve => {
      resolve(renamed);
    });
  }
}


export class RenameMenuItem implements Handler  {

  async handle(args: any[]): Promise<any> {
    const menuItemRepository = await getApiMenuItemRepository();
    const renamed = await menuItemRepository
      .createQueryBuilder()
      .update<ApiMenuItem>(ApiMenuItem, {name: args[1]})
      .where("id = :id", {id: args[0]})
      .execute();
    console.log('ApiMenuItem rename ', renamed);
    return new Promise(resolve => {
      resolve(renamed);
    });
  }
}


export class UpdateTagAndVersion implements Handler  {

  async handle(args: any[]): Promise<any> {
    const menuItemRepository = await getApiMenuItemRepository();
    const updated = await menuItemRepository
      .createQueryBuilder()
      .update<ApiMenuItem>(ApiMenuItem, {tag: args[1], version: args[2]})
      .where("id = :id", {id: args[0]})
      .execute();
    console.log('UpdateTagAndVersion ', updated);
    return new Promise(resolve => {
      resolve(updated);
    });
  }
}
