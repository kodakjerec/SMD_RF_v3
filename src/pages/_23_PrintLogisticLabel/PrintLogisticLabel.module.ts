import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _23_PrintLogisticLabel } from './PrintLogisticLabel';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_23_PrintLogisticLabel)
  ],
  declarations: [_23_PrintLogisticLabel],
  entryComponents: [_23_PrintLogisticLabel]
})
export class AppModule { }