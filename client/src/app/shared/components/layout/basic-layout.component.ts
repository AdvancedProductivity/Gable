import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigServiceImpl} from '../../../core/services/impl/ConfigServiceImpl';

@Component({
  selector: 'app-basic-layout',
  template: `
    <div fxFlexFill fxLayout="column">
      <div fxFlex="none" >
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
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
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
      <div fxFlex>
        <router-outlet></router-outlet>
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
