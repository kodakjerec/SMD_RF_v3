import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _01_Zone } from './Zone';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_01_Zone)
  ],
  declarations: [_01_Zone],
  entryComponents: [_01_Zone]
})
export class AppModule { }