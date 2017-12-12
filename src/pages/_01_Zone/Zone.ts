import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_01_Zone',
    segment: '_01_Zone'
})
@Component({
    templateUrl: 'Zone.html'
})

export class _01_Zone {
    Lists: [{ Name: string, Value: any }];
    data = { USER_ID: '', GROUP_ID: '' };

    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , private toastCtrl: ToastController
        , public _http_services: http_services
    ) {
        this.data.USER_ID = localStorage.getItem('USER_ID');
        this.data.GROUP_ID = 'admin';
        localStorage.setItem('GROUP_ID', this.data.GROUP_ID);

        let toast = this.toastCtrl.create({
            message: '使用者 ' + this.data.USER_ID + ' 成功登入',
            duration: myGlobals.Set_timeout,
            position: 'bottom'
        });
        toast.present();

        this.queryBLOCKS();
    }

    queryBLOCKS() {
        var sql_cmd = "[ui.spDCS_RF_MENU]";
        this._http_services.POST('', 'sp'
            , sql_cmd
            , [
                { Name: '@MODE', Value: '1' }
                , { Name: '@UserGroup', Value: this.data.GROUP_ID }
                , { Name: '@BLOCK', Value: '' }
            ])
            .subscribe((response) => {
                if (response) {

                    this.Lists = response;

                }
            });
    }

    menuClicked(item) {
        localStorage.setItem('BLOCK_ID', item.MENUID);
        this.navCtrl.push('_02_Menu', { Title: item.Caption + '選單' });
    };
}
