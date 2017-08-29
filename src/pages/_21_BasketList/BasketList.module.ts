import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { _21_BasketList } from './BasketList';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        IonicPageModule.forChild(_21_BasketList)
    ],
    declarations: [_21_BasketList],
    entryComponents: [_21_BasketList]
})
export class AppModule { }