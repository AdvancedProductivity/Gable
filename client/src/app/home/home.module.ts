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
import { DocEditorComponent } from './doc-page/doc-editor/doc-editor.component';
import { DocDashBoardComponent } from './doc-page/doc-dash-board/doc-dash-board.component';
import { DocDetailComponent } from './doc-page/doc-detail/doc-detail.component';
import { DocCreateDialogComponent } from './doc-page/doc-dash-board/doc-create-dialog/doc-create-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    ApiTestComponent,
    SettingComponent,
    DocPageComponent,
    MockPageComponent,
    DocEditorComponent,
    DocDashBoardComponent,
    DocDetailComponent,
    DocCreateDialogComponent
  ],
    imports: [CommonModule, SharedModule, HomeRoutingModule, PerfectScrollbarModule]
})
export class HomeModule {}
