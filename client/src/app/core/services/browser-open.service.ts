import { Injectable } from '@angular/core';
import {ElectronService} from './electron/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {AnalysisService} from './analysis.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserOpenService {

  constructor(
    private electronService: ElectronService,
    private analysisService: AnalysisService,
    private trans: TranslateService
  ) {
  }

  public open(url: string) {
    this.trans.get([url]).subscribe(msg => {
      const u = msg[url];
      this.analysisService.openLink(u).then(r => {});
      if (this.electronService.isElectron) {
        this.electronService.ipcRenderer.sendSync('openBrowser', u);
      } else {
        window.open(u, '_blank');
      }
    });
  }
}
