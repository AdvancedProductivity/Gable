import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import {ConfigServiceImpl} from './core/services/impl/ConfigServiceImpl';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private configService: ConfigServiceImpl,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
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
    this.iconRegistry.addSvgIcon(
      'menu-add',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/add.svg')
    );
  }

  private loadLanguage() {
    const langArray = ['en-US', 'zh-CN'];
    this.translate.addLangs(langArray);
    this.configService.getConfig('lang').subscribe((value: string) => {
      console.log('last setting language is ', value);
      if (!value) {
        let lang = navigator?.language;
        if (!lang) {
          lang = langArray[0];
        } else {
          if (!langArray.indexOf(lang)) {
            lang = langArray[0];
          }
        }
        this.translate.setDefaultLang(lang);
        this.configService.updateOrCreateConfig('lang', lang);
      } else {
        this.translate.setDefaultLang(value);
      }
    });

  }
}
