import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_23_PrintLogisticLabel',
    segment: '_23_PrintLogisticLabel'
})
@Component({
        templateUrl: 'PrintLogisticLabel.html'
})

export class _23_PrintLogisticLabel {
    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private vibration: Vibration) {
    }

    //#region Init
    data = {
        ScanBarcode: ''
    };
    data2 = {
        Barcode: ''
        , Shop: ''
        , Qty: ''
        ,IP_Qty:''
    };

    @ViewChild('scan_Entry') scan_Entry;
    @ViewChild('scan_Entry2') scan_Entry2;
    //#endregion

    search() {
        this.vibration.vibrate(100);

        //#region Check error
        let ErrMsg: string='';
        if (this.data.ScanBarcode == '') {
            ErrMsg = '請輸入物流標';
        }
        if (ErrMsg != '') {
            let toast = this.toastCtrl.create({
                message: ErrMsg,
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            });
            toast.present();
            return;
        }
        //#endregion

        this._http_services.POST('', 'sp'
            , '[md.spDCS_LABEL_SORTER]'
            , [
                { Name: '@CODE', Value: this.data.ScanBarcode }
            ])
            .subscribe((response) => {
                let toast = this.toastCtrl.create({
                    message: '成功送出補印需求',
                    duration: myGlobals.Set_timeout,
                    position: 'bottom'
                });
                toast.present();
            ]).subscribe(() => {
            });

        //準備下一輪掃描
        this.reset();

        this.myfocus();
    };

    search2() {
        this.vibration.vibrate(100);

        //#region Check error
        let ErrMsg: string = '';
        if (this.data2.Barcode == '') {
            ErrMsg = '請輸入呼出碼';
        }
        if (this.data2.Qty == '') {
            ErrMsg = '請輸入數量';
        }
        if (ErrMsg != '') {
            let toast = this.toastCtrl.create({
                message: ErrMsg,
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            });
            toast.present();
            return;
        }
        //#endregion

        this._http_services.POST('', 'sp'
            , '[md.spDCS_LABEL_SORTER]'
            , [
                { Name: '@CODE', Value: '' }
                , { Name: '@ITEM_ID', Value: this.data2.Barcode }
                , { Name: '@SITE_ID', Value: this.data2.Shop }
                , { Name: '@QTY', Value: this.data2.Qty }
                , { Name: '@IP_QTY', Value: this.data2.IP_Qty }
            ])
            .subscribe((response) => {
                let toast = this.toastCtrl.create({
                    message: '成功送出補印需求',
                    duration: myGlobals.Set_timeout,
                    position: 'bottom'
                });
                toast.present();
            };

        //準備下一輪掃描
        this.reset();

        this.myfocus2();
    };

    reset() {
        this.data.ScanBarcode = '';

        this.data2.Barcode = '';
        this.data2.Shop = '';
        this.data2.Qty = '';
        this.data2.IP_Qty = '';
    };

    help() {
        let alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 輸入物流標，產生指定內容<br/>'
                    + '2. 輸入指定內容：滑道(3)+疊箱(1)+店鋪(6)+批號(6)+數量(2)',
            buttons: ['關閉']
        });

        alert.present();
    };
    help2() {
        let alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 呼出碼和數量一定要輸入<br/>'
            + '2. 不指定店鋪，會印出所有店鋪標籤<br/>'
            + '4. 不指定入數，會印出系統預設入數:6',
            buttons: ['關閉']
        });

        alert.present();
    };

    //喪失focus
    myfocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    };
    myfocus2() {
        setTimeout(() => {
            this.scan_Entry2.setFocus();
        }, 150);
    };

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //手勢
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT

                break;
            case 4: //RIGHT
                this.navCtrl.pop();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}