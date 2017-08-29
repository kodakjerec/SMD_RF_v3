import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _123_ItemCode } from './ItemCode';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_123_ItemCode)
  ],
  declarations: [_123_ItemCode],
  entryComponents: [_123_ItemCode]
})
export class AppModule { }