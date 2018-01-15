import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _133_WAS_Store } from './Store';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_133_WAS_Store)
    ],
    declarations: [_133_WAS_Store],
    entryComponents: [_133_WAS_Store]
})
export class AppModule { }