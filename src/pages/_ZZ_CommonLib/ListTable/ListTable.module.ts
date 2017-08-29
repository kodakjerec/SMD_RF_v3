import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListTablePage } from './ListTable';

@NgModule({
    declarations: [
        ListTablePage,
    ],
    imports: [
        IonicPageModule.forChild(ListTablePage),
    ],
    entryComponents: [
        ListTablePage,
    ]
})
export class AppModule { }