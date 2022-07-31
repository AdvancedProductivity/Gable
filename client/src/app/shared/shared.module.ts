import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {BasicLayoutComponent, PageNotFoundComponent} from './components/';
import {WebviewDirective} from './directives/';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTreeModule} from '@angular/material/tree';
import { ApiTreeMenuComponent } from './components/api/api-tree-menu/api-tree-menu.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EmptyTreeComponent } from './components/api/api-tree-menu/inner/empty-tree/empty-tree.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AngularSplitModule} from 'angular-split';
import { RightPanelComponent } from './components/api/right-panel/right-panel.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { NavComponent } from './components/api/nav/nav.component';
import {NgxMatContextMenuTriggerModule} from '@w3soto/ngx-mat-context-menu-trigger';
import { ApiHeaderOperationComponent } from './components/api/api-header-operation/api-header-operation.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { HttpWorkBenchComponent } from './components/api/work-bench/http-work-bench/http-work-bench.component';
import { RequestTabsComponent } from './components/api/work-bench/http-work-bench/request-tabs/request-tabs.component';
import {AgGridModule} from 'ag-grid-angular-legacy';
import { QueryTableComponent } from './components/api/work-bench/http-work-bench/request-tabs/query-table/query-table.component';
import { CellContentComponent } from './components/api/work-bench/http-work-bench/request-tabs/inner/cell-content/cell-content.component';
// eslint-disable-next-line max-len
import { CheckBoxCellEditorComponent } from './components/api/work-bench/http-work-bench/request-tabs/inner/check-box-cell-editor/check-box-cell-editor.component';
import { CellFileComponent } from './components/api/work-bench/http-work-bench/request-tabs/inner/cell-file/cell-file.component';
import { TextBodyComponent } from './components/api/work-bench/http-work-bench/request-tabs/text-body/text-body.component';
import {
  FormEditorComponent
} from './components/api/work-bench/http-work-bench/request-tabs/form-editor/form-editor.component';
import {
  CloseInputCellComponent
} from './components/api/work-bench/http-work-bench/request-tabs/inner/close-input-cell/close-input-cell.component';
import {
  CheckBoxCellComponent
} from './components/api/work-bench/http-work-bench/request-tabs/inner/check-box-cell/check-box-cell.component';
import {
  CellFileTextComponent
} from './components/api/work-bench/http-work-bench/request-tabs/inner/cell-file-text/cell-file-text.component';
import { DevelopingComponent } from './components/developing/developing.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BodyContainerComponent } from './components/api/work-bench/http-work-bench/request-tabs/body-container/body-container.component';
import {MatRadioModule} from '@angular/material/radio';
import { NoneBodyComponent } from './components/api/work-bench/http-work-bench/request-tabs/none-body/none-body.component';
import { GraphQLComponent } from './components/api/work-bench/http-work-bench/request-tabs/graph-ql/graph-ql.component';
import { ResponseTabsComponent } from './components/api/work-bench/http-work-bench/response-tabs/response-tabs.component';
import { BodyTextComponent } from './components/api/work-bench/http-work-bench/response-tabs/body-text/body-text.component';
import { BodyHtmlComponent } from './components/api/work-bench/http-work-bench/response-tabs/body-text/body-html/body-html.component';
import { EmptyResponseComponent } from './components/api/work-bench/http-work-bench/response-tabs/empty-response/empty-response.component';
// eslint-disable-next-line max-len
import {ResponseHeadersComponent} from './components/api/work-bench/http-work-bench/response-tabs/response-headers/response-headers.component';
// eslint-disable-next-line max-len
import {ResponseKeyValueComponent} from './components/api/work-bench/http-work-bench/response-tabs/response-key-value/response-key-value.component';
// eslint-disable-next-line max-len
import {ResponseCookiesComponent} from './components/api/work-bench/http-work-bench/response-tabs/response-cookies/response-cookies.component';
import { TestDashboardComponent } from './components/api/test-dashboard/test-dashboard.component';
import { CollectionWorkBenchComponent } from './components/api/work-bench/collection-work-bench/collection-work-bench.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
    , WebviewDirective
    , BasicLayoutComponent
    , ApiTreeMenuComponent
    , EmptyTreeComponent
    , RightPanelComponent
    , NavComponent
    , ApiHeaderOperationComponent
    , HttpWorkBenchComponent
    , RequestTabsComponent
    , FormEditorComponent
    , QueryTableComponent
    , CloseInputCellComponent
    , CellContentComponent
    , CheckBoxCellComponent
    , CheckBoxCellEditorComponent
    , CellFileTextComponent
    , CellFileComponent
    , TextBodyComponent
    , DevelopingComponent
    , BodyContainerComponent
    , NoneBodyComponent
    , GraphQLComponent
    , ResponseTabsComponent
    , BodyTextComponent
    , BodyHtmlComponent
    , EmptyResponseComponent
    , ResponseHeadersComponent
    , ResponseKeyValueComponent
    , ResponseCookiesComponent, TestDashboardComponent, CollectionWorkBenchComponent
  ],
  imports: [
    CommonModule
    , TranslateModule
    , FlexLayoutModule
    , MonacoEditorModule
    , FormsModule
    , RouterModule
    , MatSnackBarModule
    , MatListModule
    , MatIconModule
    , MatRadioModule
    , MatButtonModule
    , MatRippleModule
    , MatTreeModule
    , MatMenuModule
    , PerfectScrollbarModule
    , MatFormFieldModule
    , MatInputModule
    , MatTooltipModule
    , NgxSpinnerModule
    , AngularSplitModule
    , MatDividerModule
    , MatTabsModule
    , NgSelectModule
    , NgxMatContextMenuTriggerModule
    , AgGridModule
  ],
  exports: [
    TranslateModule
    , WebviewDirective
    , FlexLayoutModule
    , FormsModule
    , MatIconModule
    , MatButtonModule
    , MatSliderModule
    , MatTreeModule
    , MatSnackBarModule
    , MatRadioModule
    , MonacoEditorModule
    , ApiTreeMenuComponent
    , MatFormFieldModule
    , MatInputModule
    , MatTabsModule
    , MatMenuModule
    , MatTooltipModule
    , MatDividerModule
    , NgxSpinnerModule
    , AngularSplitModule
    , RightPanelComponent
    , NgxMatContextMenuTriggerModule
    , NavComponent
    , ApiHeaderOperationComponent
    , NgSelectModule
    , HttpWorkBenchComponent
    , AgGridModule, TestDashboardComponent
  ]
})
export class SharedModule {}
