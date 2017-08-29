import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _01_Menu } from './Menu';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_01_Menu)
  ],
  declarations: [_01_Menu],
  entryComponents: [_01_Menu]
})
export class AppModule { }