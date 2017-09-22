import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _24_PhotoGallery } from './PhotoGallery';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(_24_PhotoGallery)
  ],
  declarations: [_24_PhotoGallery],
  entryComponents: [_24_PhotoGallery]
})
export class AppModule { }