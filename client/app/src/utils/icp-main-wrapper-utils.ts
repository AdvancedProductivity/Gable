import IpcMainEvent = Electron.IpcMainEvent;
import {Handler} from "../listeners/listener-handler";
import {getDocDefineRepository, getDocMenuRepository} from "../config/init-datasource";
import {ApiMenuItem} from "../entity/ApiMenuCollection";
import {DocDefine, DocMenu} from "../entity/Docs";

export function wrapper(handler: Handler): any {
  return async function (event: IpcMainEvent, ...args: any[]) {
    try {
      if (!handler) {
        event.returnValue = {tip: 'no handler set'};
      } else {
        event.returnValue = await handler.handle(args);
      }
    } catch (err) {
      event.returnValue = err;
      throw err;
    }
  }
}

export async function renameDoc(apiKey: string, newName: string): Promise<any> {
  const docMenuRepository = await getDocMenuRepository();
  const docMenu = await docMenuRepository.findOne({
    where: {apiKey}
  });
  if (docMenu) {
    const menuRenamed = await docMenuRepository
      .createQueryBuilder()
      .update<DocMenu>(DocMenu, {name: newName})
      .where("id = :id", {id: docMenu.id})
      .execute();
    const docDefineRepository = await getDocDefineRepository();
    const defineRenamed = await docDefineRepository
      .createQueryBuilder()
      .update<DocDefine>(DocDefine, {name: newName})
      .where("id = :id", {id: docMenu.id})
      .execute();
  }
  return new Promise(resolve => {
    resolve(null);
  });
}
