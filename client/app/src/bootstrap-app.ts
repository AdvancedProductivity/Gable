import {BrowserWindow, ipcMain, screen} from "electron";
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {listenerArray} from "./listeners/a-all-listener";
import {wrapper} from "./utils/icp-main-wrapper-utils";
import {initDatasource} from "./config/init-datasource";

export async function createWindow(serve: boolean) {
  let win: BrowserWindow = null;
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });
  await initDatasource();

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = '../index.html';

    if (fs.existsSync(path.join(__dirname, '../../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  listenerArray.forEach(item => {
    ipcMain.on(item.channel, wrapper(item.handler));
  });

  return win;

}
