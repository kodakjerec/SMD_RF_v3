import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _134_WAS_Receive } from './Receive';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_134_WAS_Receive)
    ],
    declarations: [_134_WAS_Receive],
    entryComponents: [_134_WAS_Receive]
})
export class AppModule { }