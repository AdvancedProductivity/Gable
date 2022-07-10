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

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, BasicLayoutComponent],
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
    , MatMenuModule
  ],
  exports: [
    TranslateModule
    , WebviewDirective
    , FlexLayoutModule
    , FormsModule
    , MatButtonModule
    , MatSliderModule
    , MonacoEditorModule
  ]
})
export class SharedModule {}
