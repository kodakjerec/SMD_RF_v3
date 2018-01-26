import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { _11_CheckIn } from './CheckIn';

@NgModule({
    imports: [
        IonicPageModule.forChild(_11_CheckIn)
    ],
    declarations: [_11_CheckIn],
    entryComponents: [_11_CheckIn]
})
export class CheckInModule { }