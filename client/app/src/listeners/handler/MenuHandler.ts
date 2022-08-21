import {Handler} from "../listener-handler";
import {getApiCollectionRepository, getApiMenuItemRepository, getConfigRepository} from "../../config/init-datasource";
import {ApiMenuCollection, ApiMenuItem} from "../../entity/ApiMenuCollection";

export class GetCollectionById implements Handler {

  async handle(args: any[]): Promise<any> {
    console.log('get collection by id', args);
    const apiCol = await getApiCollectionRepository();
    return new Promise(resolve => {
      resolve(apiCol.getId(args[0]));
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
    return new Promise(resolve => {
      resolve(apiMenuItemRepository.getId(args[0]));
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
