import { Component } from '@angular/core';
import { NavController, Platform, NavParams, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';

@IonicPage({
    name: '_20_Menu',
    segment: '_20_Menu'
})
@Component({
    templateUrl: 'Menu.html'
})

export class _20_Menu {
    Lists: [{ Name: string, Value: any }];
    data = { ID: '', BLOCK_ID: '' };

    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams) {
        this.data.ID = myGlobals.ProgParameters.get('ID');
        this.data.BLOCK_ID = myGlobals.ProgParameters.get('BLOCK_ID');

        this.Lists = [
            { Name: '籃明細', Value:'_21_BasketList' },
            { Name: '撿貨標籤列印', Value: '_22_PrintPickingLabel' },
            { Name: '物流標籤列印', Value: '_23_PrintLogisticLabel' },
            { Name: '網路相簿', Value: '_23_PhotoGallery' }
        ];
    }

    menuClicked(item) {
        this.navCtrl.push(item.Value);
    };
}
