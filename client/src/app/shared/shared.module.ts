import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import {BasicLayoutComponent, PageNotFoundComponent} from './components/';
import { WebviewDirective } from './directives/';
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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, BasicLayoutComponent, ApiTreeMenuComponent],
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
  ]
})
export class SharedModule {}
