import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _124_ItemRcv } from './ItemRcv';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_124_ItemRcv)
  ],
  declarations: [_124_ItemRcv],
  entryComponents: [_124_ItemRcv]
})
export class AppModule { }