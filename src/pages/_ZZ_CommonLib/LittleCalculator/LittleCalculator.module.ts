import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LittleCalculatorPage } from './LittleCalculator';

@NgModule({
    declarations: [
        LittleCalculatorPage,
    ],
    imports: [
        IonicPageModule.forChild(LittleCalculatorPage),
    ],
    entryComponents: [
        LittleCalculatorPage,
    ]
})
export class AppModule { }