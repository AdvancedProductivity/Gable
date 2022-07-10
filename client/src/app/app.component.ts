import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.loadLanguage();
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  private loadLanguage() {
    const langArray = ['en-US', 'zh-CN'];
    this.translate.addLangs(langArray);
    const lang = navigator?.language;
    if (!lang) {
      this.translate.setDefaultLang(langArray[0]);
    } else {
      if (langArray.indexOf(lang)) {
        this.translate.setDefaultLang(lang);
      }else {
        this.translate.setDefaultLang(langArray[0]);
      }
    }
  }
}
