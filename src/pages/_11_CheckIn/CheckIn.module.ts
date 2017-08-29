import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _11_CheckIn } from './CheckIn';

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(_11_CheckIn)
    ],
    declarations: [_11_CheckIn],
    entryComponents: [_11_CheckIn]
})
export class AppModule { }