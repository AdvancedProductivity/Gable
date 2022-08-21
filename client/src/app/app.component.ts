import {Component, Injector} from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import {ConfigServiceImpl} from './core/services/impl/ConfigServiceImpl';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {iconArray} from './shared/icon';
import {createCustomElement} from '@angular/elements';
import {HttpApiDocComponent} from './shared/components/docs/http-api-doc/http-api-doc.component';
import {TreeDataEditorComponent} from './shared/components/api/work-bench/http-work-bench/tree-data-editor/tree-data-editor.component';
import {HttpUrlDocComponent} from './shared/components/docs/http-url-doc/http-url-doc.component';
import {RawTextDocComponent} from './shared/components/docs/raw-text-doc/raw-text-doc.component';
import {I18nTitleComponent} from './shared/components/docs/i18n-title/i18n-title.component';
import {DocService} from './core/services/impl/doc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private docService: DocService,
    private electronService: ElectronService,
    private configService: ConfigServiceImpl,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    injector: Injector) {
    const url = createCustomElement(HttpUrlDocComponent, {injector});
    customElements.define('http-url-doc-component', url);
    const i18nTitle = createCustomElement(I18nTitleComponent, {injector});
    customElements.define('i18n-title-component', i18nTitle);
    const rawText = createCustomElement(RawTextDocComponent, {injector});
    customElements.define('raw-text-doc-component', rawText);
    const monin = createCustomElement(HttpApiDocComponent, {injector});
    customElements.define('http-api-doc-component', monin);
    const treeDataEditor = createCustomElement(TreeDataEditorComponent, {injector});
    customElements.define('tree-data-editor-component', treeDataEditor);
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
    iconArray.forEach(item => {
      this.iconRegistry.addSvgIcon(
        item.name,
        this.sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/' + item.file)
      );
    });
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
