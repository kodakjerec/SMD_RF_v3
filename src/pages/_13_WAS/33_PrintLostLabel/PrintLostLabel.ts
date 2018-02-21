import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController, AlertController, ModalController, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_1333_WAS_PrintLostLabel'
})
@Component({
    templateUrl: 'PrintLostLabel.html'
})
export class _1333_WAS_PrintLostLabel {
    constructor(public navCtrl: NavController
        , public params: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private modalCtrl:ModalController
        , private vibration: Vibration) {

        this.data.RefValue = localStorage.getItem('WAS_OrderNo');
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.search();
    }

    data = {
        RefValue: ''
        , ITEM_NO: ''
    };

    TotalList = [];
    DefaultTestServer = '172_31_31_250';

    search() {
        let sql_StepValue = '40';
        let sql_parameter = this.data.RefValue;
        if (this.data.ITEM_NO.length > 0)
            sql_parameter += ',' + this.data.ITEM_NO;
        else
            sql_parameter += ',%%';

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: sql_StepValue }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                this.data.ITEM_NO = '';
                this.TotalList = response;
            })
            ;
    }

    //改量
    readyChangeAMOUNT(item) {
        this.vibration.vibrate(100);
        let alert = this.alertCtrl.create({
            title: '補印標籤',
            message: '呼出碼：' + item.ITEM_NO + '<br/>'
            + '營業所：' + item.SITE_ID + '<br/>',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '確定',
                    handler: data => {
                        this._http_services.POST(this.DefaultTestServer, 'sp'
                            , '[WAS].dbo.spactWAS_Line'
                            , [{ Name: '@Step', Value: '41' }
                                , { Name: '@Parameters', Value: item.ID }])
                            .then((response) => {
                                if (response != undefined) {
                                    switch (response[0].RT_CODE) {
                                        case 0:
                                            this.toastCtrl.create({
                                                message: response[0].RT_MSG,
                                                duration: myGlobals.Set_timeout,
                                                position: 'middle'
                                            }).present();
                                            break;
                                        default:
                                            this.alertCtrl.create({
                                                title: '結果 ' + response[0].RT_CODE,
                                                message: response[0].RT_MSG,
                                                buttons: ['關閉']
                                            }).present();
                                    }
                                }
                            })
                            ;
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    myKeylogger(event) {
        this.data.ITEM_NO = myGlobals.keyCodeToValue(event.keyCode, this.data.ITEM_NO);
        if (this.data.ITEM_NO.indexOf('ENTER') >= 0) {
            this.data.ITEM_NO = this.data.ITEM_NO.replace('ENTER', '');
            this.search();
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '呼出碼', Value: this.data.ITEM_NO });
        obj.onDidDismiss(data => {
            this.data.ITEM_NO = myGlobals.ProgParameters.get('ListTable_answer');
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
                this.navCtrl.pop();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}