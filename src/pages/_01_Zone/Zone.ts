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
    data = { USER_ID: '' };

    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , private toastCtrl: ToastController
        , public _http_services: http_services
    ) {
        myGlobals.loginCheck.check();
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');

        let toast = this.toastCtrl.create({
            message: '使用者 ' + this.data.USER_ID + ' 成功登入',
            duration: myGlobals.Set_timeout,
            position: 'bottom'
        });
        toast.present();

        this.queryBLOCKS();
    }

    queryBLOCKS() {
        var sql_cmd = "[ui].[spDCS_LOGIN_WORKSPACE]";
        this._http_services.POST('', 'sp'
            , sql_cmd
            , [
                { Name: '@ID', Value: this.data.USER_ID }
            ])
            .subscribe((response) => {
                if (response) {

                    this.Lists = response;

                }
            });
    }

    menuClicked(item) {
        myGlobals.ProgParameters.set('BLOCK_NAME', item.NAME);
        this.navCtrl.push('_02_Menu', {
            Title: '選單'
            , BLOCK_ID: '0'
            , BLOCK_NAME: item.NAME
            , OP_TYPE: item.OP_TYPE
        });
    };
}
