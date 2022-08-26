import {Handler} from "../listener-handler";

const ua = require("universal-analytics");
export const visitor = ua('UA-235247128-1');


export class AnalysisHandler implements Handler {

  handle(args: any[]): any {
    visitor.event(args[0]).send();
    console.log('send args', args);
  }

}
