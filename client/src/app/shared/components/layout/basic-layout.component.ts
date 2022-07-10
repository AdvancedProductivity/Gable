import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  template: `
    <nav class="gable-header">
      <span class="gable-logo-text">
        Gable
      </span>
      <a class="header-link" routerLink="/dashboard/home" routerLinkActive="active-link" mat-stroked-button matRipple>API Test</a>
      <a class="header-link" routerLink="/dashboard/home1" routerLinkActive="active-link" mat-button >API Document</a>
      <a class="header-link" routerLink="/dashboard/home2" routerLinkActive="active-link" mat-button >API Mock</a>
      <div class="flex-spacer"></div>
      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon style="color: whitesmoke">language</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <span>中文</span>
        </button>
        <button mat-menu-item>
          <span>English</span>
        </button>
      </mat-menu>
      <button mat-flat-button color="warn">Login</button>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {
  links = [
    'http://www.baidu.com',
    'http://www.google.com'
  ];
}
