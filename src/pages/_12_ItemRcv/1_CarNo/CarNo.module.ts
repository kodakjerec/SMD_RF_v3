import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _121_CarNo } from './CarNo';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_121_CarNo)
  ],
  declarations: [_121_CarNo],
  entryComponents: [_121_CarNo]
})
export class AppModule { }