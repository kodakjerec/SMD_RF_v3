import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';

@IonicPage({
    name: '_01_Menu',
    segment: '_01_Menu'
})
@Component({
    templateUrl: 'Menu.html'
})

export class _01_Menu {
    Lists: [{ Name: string, Value: any }];
    data = { USER_ID: '', BLOCK_ID: '' };

    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , private toastCtrl: ToastController
    ) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_ID = myGlobals.ProgParameters.get('BLOCK_ID');

        let toast = this.toastCtrl.create({
            message: '使用者 ' + this.data.USER_ID + ' 成功登入',
            duration: myGlobals.Set_timeout,
            position: 'bottom'
        });
        toast.present();

        this.Lists = [
            { Name: '進貨報到', Value: '_11_CheckIn' },
            { Name: '進貨檢品', Value: '_121_CarNo' },
            { Name: '測試功能', Value: '_20_Menu' }];
    }

    menuClicked(item) {
        this.navCtrl.push(item.Value);
    };
}
