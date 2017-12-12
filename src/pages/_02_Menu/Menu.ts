import { Component } from '@angular/core';
import { NavController, Platform, NavParams, IonicPage } from 'ionic-angular';

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
    data = { Caption: '', GROUP_ID: '', BLOCK_ID: '', isButtonDisabled: false };


    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
    ) {
        this.data.Caption = navParams.get('Title');
        this.data.GROUP_ID = localStorage.getItem('GROUP_ID');
        this.data.BLOCK_ID = localStorage.getItem('BLOCK_ID');

        this.queryMENUS();
    }

    queryMENUS() {
        var sql_cmd = "[ui.spDCS_RF_MENU]";
        this._http_services.POST('', 'sp'
            , sql_cmd
            , [
                { Name: '@MODE', Value: '2' }
                , { Name: '@UserGroup', Value: this.data.GROUP_ID }
                , { Name: '@BLOCK', Value: this.data.BLOCK_ID }
            ])
            .subscribe((response) => {
                if (response) {
                    this.Lists = response;
                    localStorage.setItem('Menu', JSON.stringify(response));
                }
            });
    }

    menuClicked(item) {
        //先禁止使用按鈕
        this.data.isButtonDisabled = true;

        //Menu
        switch (item.URL) {
            case '':
                localStorage.setItem('BLOCK_ID', item.MENUID);
                this.navCtrl.push('_02_Menu', { Title: item.Caption });
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
