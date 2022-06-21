import {
  OnItemAddHandler,
  OnItemClearHandler,
  OnItemGetAllHandler
} from "./item-listener";
import {Handler} from "./listener-handler";

export const listenerArray: { channel: string, handler: Handler }[] = [
  {channel: 'get-data', handler: new OnItemGetAllHandler()}
  , {channel: 'clear-data', handler: new OnItemClearHandler()}
  , {channel: 'add-data', handler: new OnItemAddHandler()}
];
