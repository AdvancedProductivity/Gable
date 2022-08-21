import {
  OnItemAddHandler,
  OnItemClearHandler,
  OnItemGetAllHandler
} from "./handler/item-listener";
import {Handler} from "./listener-handler";
import {ConfigGetHandler, ConfigSetHandler} from "./handler/ConfigGetHandler";
import {GetAllMenuItems, GetAllMenus, GetApiMenuItemById, GetCollectionById} from "./handler/MenuHandler";

export const listenerArray: { channel: string, handler: Handler }[] = [
  {channel: 'get-data', handler: new OnItemGetAllHandler()}
  , {channel: 'clear-data', handler: new OnItemClearHandler()}
  , {channel: 'add-data', handler: new OnItemAddHandler()}
  , {channel: 'get-config', handler: new ConfigGetHandler()}
  , {channel: 'set-config', handler: new ConfigSetHandler()}
  , {channel: 'getCollectionById', handler: new GetCollectionById()}
  , {channel: 'getAllMenus', handler: new GetAllMenus()}
  , {channel: 'getApiMenuItem', handler: new GetApiMenuItemById()}
  , {channel: 'getAllMenuItems', handler: new GetAllMenuItems()}
];
