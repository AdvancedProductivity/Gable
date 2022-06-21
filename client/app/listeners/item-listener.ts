import IpcMainEvent = Electron.IpcMainEvent;
import {getItemRepository} from "../config/app-my-datasource";

export const onItemGetAll = async (event: IpcMainEvent, ...args: any[]) => {
  const itemRepo = await getItemRepository();
  if (itemRepo) {
    try {
      event.returnValue = await itemRepo.find();
    } catch (err) {
      throw err;
    }
  } else {
    try {
      event.returnValue = {id: 0, name: 'item repo not init'};
    } catch (err) {
      throw err;
    }
  }
};

export const onItemAdd = async (event: IpcMainEvent, ...args: any[]) => {
  const itemRepo = await getItemRepository();
  if (itemRepo) {
    try {
      const item = itemRepo.create({ name: new Date().toString()});
      await itemRepo.save(item);
      event.returnValue = item;
    } catch (err) {
      throw err;
    }
  }else {
    try {
      event.returnValue = {id: 0, name: 'item repo not init'};
    } catch (err) {
      throw err;
    }



  }
};

export const onItemClear = async (event: IpcMainEvent, ...args: any[]) => {
  const itemRepo = await getItemRepository();
  if (itemRepo) {
    try {
      const allData = await itemRepo.find();
      let s = '';
      allData.forEach(item => {
        s += item.id + '.';
        itemRepo.remove(item);
      });
      event.returnValue = s
    } catch (err) {
      throw err;
    }
  }else {
    try {
      event.returnValue = {id: 0, name: 'item repo not init'};
    } catch (err) {
      throw err;
    }
  }
};
