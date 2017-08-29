import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _22_PrintPickingLabel } from './PrintPickingLabel';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_22_PrintPickingLabel)
  ],
  declarations: [_22_PrintPickingLabel],
  entryComponents: [_22_PrintPickingLabel]
})
export class AppModule { }