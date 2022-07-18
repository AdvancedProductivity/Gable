import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigServiceImpl} from '../../../core/services/impl/ConfigServiceImpl';

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
          <a class="header-link" routerLink="/dashboard/home1" routerLinkActive="active-link" mat-button>
            {{ 'PAGES.API_DOCUMENT.NAME' | translate }}
          </a>
          <a class="header-link" routerLink="/dashboard/home2" routerLinkActive="active-link" mat-button>
            {{ 'PAGES.API_Mock.NAME' | translate }}
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
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="changeLanguage('zh-CN')">
              <span>中文</span>
            </button>
            <button mat-menu-item (click)="changeLanguage('en-US')">
              <span>English</span>
            </button>
          </mat-menu>
          <button mat-flat-button color="warn">
            {{'OPERATION.LOGIN' | translate}}
          </button>
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
    private trans: TranslateService
  ) {
  }

  changeLanguage(newLang: string) {
    if (this.trans.getDefaultLang() === newLang) {
      return;
    }
    this.trans.setDefaultLang(newLang);
    this.configService.updateOrCreateConfig('lang', newLang);
  }
}
