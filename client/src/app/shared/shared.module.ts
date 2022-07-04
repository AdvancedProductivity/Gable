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
@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, BasicLayoutComponent],
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
  exports: [
    TranslateModule
    , WebviewDirective
    , FormsModule
    , MatButtonModule
    , MatSliderModule
    , MonacoEditorModule
  ]
})
export class SharedModule {}
