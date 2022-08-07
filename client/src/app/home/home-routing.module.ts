import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PageNotFoundComponent} from '../shared/components';
import {ApiTestComponent} from './api-test/api-test.component';
import {SettingComponent} from './setting/setting.component';

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
