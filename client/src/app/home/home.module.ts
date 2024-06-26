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
import { DocMenuTreeComponent } from './doc-page/doc-detail/doc-menu-tree/doc-menu-tree.component';
import { DiffComponent } from './diff/diff.component';
import {MatGridListModule} from "@angular/material/grid-list";

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
    DocCreateDialogComponent,
    DocMenuTreeComponent,
    DiffComponent
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule, PerfectScrollbarModule, MatGridListModule]
})
export class HomeModule {}
