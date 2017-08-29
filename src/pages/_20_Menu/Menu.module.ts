import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _20_Menu } from './Menu';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_20_Menu)
  ],
  declarations: [_20_Menu],
  entryComponents: [_20_Menu]
})
export class AppModule { }