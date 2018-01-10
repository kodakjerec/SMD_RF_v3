import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _131_WASOrderNo } from './OrderNo';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_131_WASOrderNo)
    ],
    declarations: [_131_WASOrderNo],
    entryComponents: [_131_WASOrderNo]
})
export class AppModule { }