import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PageNotFoundComponent} from '../shared/components';
import {ApiTestComponent} from './api-test/api-test.component';
import {SettingComponent} from './setting/setting.component';
import {DocPageComponent} from './doc-page/doc-page.component';
import {MockPageComponent} from './mock-page/mock-page.component';
import {DocDashBoardComponent} from './doc-page/doc-dash-board/doc-dash-board.component';

const routes: Routes = [
  { path: '', redirectTo: 'api', pathMatch: 'full' },
  {
    path: 'api',
    component: ApiTestComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'doc',
    component: DocPageComponent,
    children: [
      { path: '', redirectTo: 'd', pathMatch: 'full' },
      { path: 'd', component: DocDashBoardComponent}
    ]
  },
  {
    path: 'mock',
    component: MockPageComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
