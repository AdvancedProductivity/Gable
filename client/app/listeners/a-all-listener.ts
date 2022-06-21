import IpcMainEvent = Electron.IpcMainEvent;
import {onItemAdd, onItemClear, onItemGetAll} from "./item-listener";

export const listenerArray: { channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void; }[] = [
  {channel: 'get-data', listener: onItemGetAll}
  , {channel: 'clear-data', listener: onItemClear}
  , {channel: 'add-data', listener: onItemAdd}
];
