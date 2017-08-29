import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _99_TEST } from './TEST';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_99_TEST)
    ],
    declarations: [_99_TEST],
    entryComponents: [_99_TEST]
})
export class AppModule { }