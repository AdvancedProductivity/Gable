import IpcMainEvent = Electron.IpcMainEvent;
import {Handler} from "../listeners/listener-handler";

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
