import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PaperDetailPage } from './PaperDetail';

@NgModule({
    declarations: [
        PaperDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(PaperDetailPage),
    ],
    entryComponents: [
        PaperDetailPage,
    ]
})
export class AppModule { }