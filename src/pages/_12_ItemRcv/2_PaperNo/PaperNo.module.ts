import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _122_PaperNo } from './PaperNo';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_122_PaperNo)
  ],
  declarations: [_122_PaperNo],
  entryComponents: [_122_PaperNo]
})
export class AppModule { }