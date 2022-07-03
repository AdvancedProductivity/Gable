import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import {PassportRoutingModule} from './passport-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
