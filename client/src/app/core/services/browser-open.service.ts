import { Injectable } from '@angular/core';
import {ElectronService} from './electron/electron.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserOpenService {

  constructor(
    private electronService: ElectronService,
    private trans: TranslateService
  ) { }

  public open(url: string) {
    this.trans.get([url]).subscribe(msg => {
      const u = msg[url];
      if (this.electronService.isElectron) {
        this.electronService.ipcRenderer.sendSync('openBrowser', u);
      }else {
        window.open(u, '_blank');
      }
    });
  }
}
