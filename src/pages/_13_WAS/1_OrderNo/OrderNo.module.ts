import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _131_WAS_OrderNo } from './OrderNo';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_131_WAS_OrderNo)
    ],
    declarations: [_131_WAS_OrderNo],
    entryComponents: [_131_WAS_OrderNo]
})
export class _131_WAS { }