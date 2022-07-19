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

@NgModule({
  declarations: [
    PageNotFoundComponent
    , WebviewDirective
    , BasicLayoutComponent
    , ApiTreeMenuComponent
    , EmptyTreeComponent
    , RightPanelComponent
    , NavComponent
  ],
  imports: [
    CommonModule
    , TranslateModule
    , FlexLayoutModule
    , FormsModule
    , RouterModule
    , MatListModule
    , MatIconModule
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
    , NgxMatContextMenuTriggerModule
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
  ]
})
export class SharedModule {}
