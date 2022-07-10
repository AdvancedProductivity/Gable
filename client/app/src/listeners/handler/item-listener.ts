import {Handler} from "../listener-handler";
import {getItemRepository} from "../../config/init-datasource";
import {Repository} from "typeorm/repository/Repository";
import {Item} from "../../entity/Item";

export class OnItemGetAllHandler implements Handler {

  async handle(args: any[]) {
    const itemRepo = await getItemRepository();
    return await itemRepo.find();
  }

}
export class OnItemAddHandler implements Handler{
  async handle(args: any[]) {
    const itemRepo = await getItemRepository();
    const item = itemRepo.create({ name: new Date().toString()});
    await itemRepo.save(item);
    return item;
  }

}
export class OnItemClearHandler implements Handler{
  async handle(args: any[]) {
    const itemRepo: Repository<Item> = await getItemRepository();
    const allData = await itemRepo.find();
    let s = '';
    for (const item of allData) {
      s += item.id + '.';
      await itemRepo.remove(item);
    }
    return s;
  }

}
