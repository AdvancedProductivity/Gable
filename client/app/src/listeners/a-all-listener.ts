import {
  OnItemAddHandler,
  OnItemClearHandler,
  OnItemGetAllHandler
} from "./handler/item-listener";
import {Handler} from "./listener-handler";
import {ConfigGetHandler, ConfigSetHandler} from "./handler/ConfigGetHandler";
import {
  AddCollection, AddMenuItemToDb,
  GetAllMenuItems,
  GetAllMenus,
  GetApiMenuItemById,
  GetCollectionById, RenameCollection, RenameMenuItem, UpdateTagAndVersion
} from "./handler/MenuHandler";
import {AddHttp, GetApiDefine, UpdateApi} from "./handler/HttpApi";
import {
  AddDoc,
  AddDocDefaultDefine,
  AddDocMenu,
  GetAllDocs, GetBlocksByDocId, GetDocById, GetDocDefine,
  GetDocMenuBaseLevel,
  GetSubMenu, UpdateContentCount, UpdateDocMenuName, UpdateOrCreateBlock
} from "./handler/DocsHandler";

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
  , {channel: 'addCollection', handler: new AddCollection()}
  , {channel: 'renameCollection', handler: new RenameCollection()}
  , {channel: 'renameMenuItem', handler: new RenameMenuItem()}
  , {channel: 'addMenuItemToDb', handler: new AddMenuItemToDb()}
  , {channel: 'updateTagAndVersion', handler: new UpdateTagAndVersion()}
  , {channel: 'addHttp', handler: new AddHttp()}
  , {channel: 'updateApi', handler: new UpdateApi()}
  , {channel: 'getApiDefine', handler: new GetApiDefine()}
  , {channel: 'addDoc', handler: new AddDoc()}
  , {channel: 'getAllDocs', handler: new GetAllDocs()}
  , {channel: 'getSubMenu', handler: new GetSubMenu()}
  , {channel: 'getDocMenuBaseLevel', handler: new GetDocMenuBaseLevel()}
  , {channel: 'addDocMenu', handler: new AddDocMenu()}
  , {channel: 'addDocDefaultDefine', handler: new AddDocDefaultDefine()}
  , {channel: 'updateContentCount', handler: new UpdateContentCount()}
  , {channel: 'getDocDefine', handler: new GetDocDefine()}
  , {channel: 'getBlocksByDocId', handler: new GetBlocksByDocId()}
  , {channel: 'updateDocMenuName', handler: new UpdateDocMenuName()}
  , {channel: 'updateOrCreateBlock', handler: new UpdateOrCreateBlock()}
  , {channel: 'getDocById', handler: new GetDocById()}
];
