import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _132_WAS_Item } from './Item';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        IonicPageModule.forChild(_132_WAS_Item)
    ],
    declarations: [_132_WAS_Item],
    entryComponents: [_132_WAS_Item]
})
export class AppModule { }