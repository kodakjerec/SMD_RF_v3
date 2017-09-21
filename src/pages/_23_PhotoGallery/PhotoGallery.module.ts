import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _23_PhotoGallery } from './PhotoGallery';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_23_PhotoGallery)
  ],
  declarations: [_23_PhotoGallery],
  entryComponents: [_23_PhotoGallery]
})
export class AppModule { }