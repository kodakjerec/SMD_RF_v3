import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _02_Menu } from './Menu';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_02_Menu)
  ],
  declarations: [_02_Menu],
  entryComponents: [_02_Menu]
})
export class AppModule { }