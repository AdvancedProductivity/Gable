import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ApiTestComponent } from './api-test/api-test.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { SettingComponent } from './setting/setting.component';
import { DocPageComponent } from './doc-page/doc-page.component';
import { MockPageComponent } from './mock-page/mock-page.component';

@NgModule({
  declarations: [HomeComponent, ApiTestComponent, SettingComponent, DocPageComponent, MockPageComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule, PerfectScrollbarModule]
})
export class HomeModule {}
