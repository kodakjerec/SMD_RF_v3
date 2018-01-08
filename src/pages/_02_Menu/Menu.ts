import { Component } from '@angular/core';
import { NavController, Platform, NavParams, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_02_Menu',
    segment: '_02_Menu'
})
@Component({
    templateUrl: 'Menu.html'
})

export class _02_Menu {
    Lists = [{}];
    data = { Caption: '', OP_TYPE: '', BLOCK_ID: '', BLOCK_NAME:'', isButtonDisabled: false };


    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
    ) {
        this.data.Caption = navParams.get('Title');
        this.data.OP_TYPE = navParams.get('OP_TYPE');
        this.data.BLOCK_ID = navParams.get('BLOCK_ID');
        this.data.BLOCK_NAME = navParams.get('BLOCK_NAME');
        myGlobals.loginCheck.check();

        this.queryMENUS();
    }

    queryMENUS() {
        var sql_cmd = "[ui].[spDCS_RF_MENU]";
        this._http_services.POST('', 'sp'
            , sql_cmd
            , [
                { Name: '@MODE', Value: '2' }
                , { Name: '@OP_TYPE', Value: this.data.OP_TYPE }
                , { Name: '@MENUID', Value: this.data.BLOCK_ID }
            ])
            .subscribe((response) => {
                if (response) {
                    this.Lists = response;
                }
            });
    }

    menuClicked(item) {
        //先禁止使用按鈕
        this.data.isButtonDisabled = true;

        //Menu
        switch (item.URL) {
            case '':
                this.navCtrl.push('_02_Menu', {
                    Title: item.Caption
                    , BLOCK_ID: item.MENUID
                    , BLOCK_NAME: this.data.BLOCK_NAME
                    , OP_TYPE: this.data.OP_TYPE
                });
                break;
            case 'BACK':
                this.navCtrl.pop();
                break;
            default:
                //link to other page
                this.navCtrl.push(item.URL);
        }

        //兩秒後解鎖
        setTimeout(() => {
            this.data.isButtonDisabled = false;
        }, 2000);

    }
}
