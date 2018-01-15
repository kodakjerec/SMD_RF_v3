import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _TEST_00_myBarcodeUI } from './myBarcodeUI';
import { IonDigitKeyboard } from '../../../components/ion-digit-keyboard/ion-digit-keyboard.module';

@NgModule({
    imports: [
        CommonModule,
        IonDigitKeyboard,
        IonicPageModule.forChild(_TEST_00_myBarcodeUI)
    ],
    declarations: [_TEST_00_myBarcodeUI],
    entryComponents: [_TEST_00_myBarcodeUI]
})
export class AppModule { }