import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigServiceImpl} from '../../../core/services/impl/ConfigServiceImpl';
import {AnalysisService} from '../../../core/services/analysis.service';
import {BrowserOpenService} from '../../../core/services/browser-open.service';

@Component({
  selector: 'app-basic-layout',
  template: `
    <div class="gable-layout">
      <div class="gable-layout-header" >
        <nav class="gable-header">
          <span class="gable-logo-text">
            Gable
          </span>
          <a class="header-link" routerLink="/dashboard/api" routerLinkActive="active-link" mat-stroked-button
             matRipple>
            {{ 'PAGES.API_TEST.NAME' | translate }}
          </a>
          <a class="header-link" routerLink="/dashboard/doc" routerLinkActive="active-link" mat-button>
            {{ 'PAGES.API_DOCUMENT.NAME' | translate }}
          </a>
          <a class="header-link" routerLink="/dashboard/mock" routerLinkActive="active-link" mat-button>
            {{ 'PAGES.API_Mock.NAME' | translate }}
          </a>
          <a class="header-link" routerLink="/dashboard/setting" routerLinkActive="active-link" mat-button>
            {{ 'PAGES.SETTING.NAME' | translate }}
          </a>
          <a class="header-link" (click)="goToDoc()" mat-button>
            {{ 'STUDY.NAME' | translate }}
          </a>
          <div class="flex-spacer"></div>
          <button
            mat-icon-button
            [matMenuTriggerFor]="menu"
            aria-label="Change Language"
            matTooltip="{{ 'PAGES.NAV.LANG_TIP' | translate }}"
            [matTooltipShowDelay]="800"
          >
            <mat-icon style="color: whitesmoke">language</mat-icon>
          </button>
          <button
            mat-icon-button
            (click)="browserOpenService.open('LINK.GITHUB')"
            aria-label="Change Language"
          >
            <svg style="width: 26px;height: 26px" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                 focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                 data-testid="GitHubIcon">
              <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27">
              </path></svg>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="changeLanguage('zh-CN')">
              <span>中文</span>
            </button>
            <button mat-menu-item (click)="changeLanguage('en-US')">
              <span>English</span>
            </button>
          </mat-menu>
<!--          <button mat-flat-button color="warn">-->
<!--            {{'OPERATION.LOGIN' | translate}}-->
<!--          </button>-->
        </nav>
      </div>
      <div class="gable-layout-content">
        <div style="height: 100%;">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {

  constructor(
    private configService: ConfigServiceImpl,
    private analysisService: AnalysisService,
    private browserOpenService: BrowserOpenService,
    private trans: TranslateService
  ) {
  }

  changeLanguage(newLang: string) {
    if (this.trans.getDefaultLang() === newLang) {
      return;
    }
    this.analysisService.changeLanguage().then(r => {});
    this.trans.setDefaultLang(newLang);
    this.configService.updateOrCreateConfig('lang', newLang);
  }

  goToDoc() {
    this.browserOpenService.open('LINK.DOCUMENT');
  }
}
