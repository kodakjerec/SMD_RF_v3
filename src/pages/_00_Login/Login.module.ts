import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _00_Login } from './Login';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_00_Login)
  ],
  declarations: [_00_Login],
  entryComponents: [_00_Login]
})
export class AppModule { }