import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_133_WAS_Store',
    segment: '_133_WAS_Store'
})
@Component({
    templateUrl: 'Store.html'
})
export class _133_WAS_Store {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {
        localStorage.setItem('WAS_OrderNo', '1800901');
        localStorage.setItem('WAS_Item', '{ "ITEM_NO": "212521", "ITEM_NAME": "肉魚" }');

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList();
        this.myFocus();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_Store: ''
        , IsInputEnable: true
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true

    DisplayList = {
        SITE_ID: ''
        , SEQ: 0
        , AMOUNT: 0
        , TQty: 0
        , LeftQty: 0
        , SITE_NAME: ''
    };
    DefaultTestServer = '172_31_31_250';

    BringDisplayList() {
        let sql_parameter = this.data.RefValue + ','

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '11' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    this.DisplayList = response[0];
                }
            });
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_Store', '');
        this.data.WAS_Store = '';

        this.myFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;

        ////test
        //this.data.WAS_Store = this.DisplayList.SITE_ID;

        if (this.data.WAS_Store.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            }).present()
                .then(response => {
                    this.myFocus();
                });
            return;
        }

        let sql_parameter = this.data.RefValue + ',' + this.data.WAS_Store;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '2' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                switch (response[0].RT_CODE) {
                    case 0:
                        let result = JSON.stringify({
                            SITE_ID: response[0].RT_MSG
                            , SITE_NAME: response[0].SITE_NAME
                            , PRICE: response[0].PRICE
                            , PRICE_TYPE: response[0].PRICE_TYPE
                            , AMOUNT: response[0].AMOUNT
                            , TQty: response[0].TQty
                            , LeftQty: response[0].LeftQty
                        });
                        localStorage.setItem('WAS_Store', result);

                        let toast = this.toastCtrl.create({
                            message: '驗證成功 ' + response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'bottom'
                        });
                        toast.present();
                        this.data.WAS_Store = '';
                        this.navCtrl.push('_134_WAS_Receive');
                        break;
                    default:
                        let alert = this.alertCtrl.create({
                            title: '錯誤代號：' + response[0].RT_CODE,
                            subTitle: response[0].RT_MSG,
                            buttons: ['關閉']
                        });
                        alert.present();
                }
            })
            .then(response => {
                this.data.IsInputEnable = true;
            })
            ;
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }
    //Focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry._elementRef.nativeElement.focus();
        }, 300);
    }
    myKeylogger(event) {
        let keyValue = myGlobals.keyCodeToValue(event.keyCode);
        switch (keyValue) {
            case 'ENTER':
                this.search();
                break;
            default:
                this.data.WAS_Store += keyValue;
                break;
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '營業所', Value: this.data.WAS_Store });
        obj.onDidDismiss(data => {
            this.data.WAS_Store = myGlobals.ProgParameters.get('ListTable_answer');
            this.search();
        });
        obj.present();
    }

    //手勢
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT

                break;
            case 4: //RIGHT
                this.reset();
                this.navCtrl.pop();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}