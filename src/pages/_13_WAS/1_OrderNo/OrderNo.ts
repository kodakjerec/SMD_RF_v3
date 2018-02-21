import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_131_WAS_OrderNo',
    segment: '_131_WAS_OrderNo'
})
@Component({
    templateUrl: 'OrderNo.html'
})
export class _131_WAS_OrderNo {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {
        localStorage.setItem('USER_ID', '123456');
        localStorage.setItem('BLOCK_ID', 'A1DP1');
        localStorage.setItem('BLOCK_NAME', '1樓撿貨區');
    }

    enterFullScreen() {
        var elem = document.getElementById("Mainapp");

        if (!this.data.FullScreenMode) {
            this.data.FullScreenMode = true;
            //show full screen 
            elem.webkitRequestFullScreen();
        }
        else {
            this.data.FullScreenMode = false;

            document.webkitExitFullscreen();
        }
    }

    @ViewChild('scan_Entry') scan_Entry;

    ionViewDidEnter() {
        this.BringDisplayList();
    }

    ionViewWillEnter() {
        this.myFocus();
    }

    data = {
        BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_OrderNo: ''
        , IsInputEnable: true
        , FullScreenMode: false
    };

    DisplayList = [];
    DefaultTestServer = '172_31_31_250';

    BringDisplayList() {
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '00' }
                , { Name: '@Parameters', Value: '' }])
            .then((response) => {
                if (response != undefined) {
                    this.DisplayList = response;
                }
            });
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_OrderNo', '');
        this.data.WAS_OrderNo = '';

        this.myFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;
        ////test
        //this.data.WAS_OrderNo = this.DisplayList[0].ORDER_NO;

        if (this.data.WAS_OrderNo.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_OrderNo = '';
            this.data.IsInputEnable = true;
            return;
        }

        let sql_parameter = this.data.WAS_OrderNo;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '0' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                switch (response[0].RT_CODE) {
                    case 0:
                        localStorage.setItem('WAS_OrderNo', response[0].RT_MSG);
                        this.data.WAS_OrderNo = response[0].RT_MSG;
                        this.toastCtrl.create({
                            message: '驗證成功 ' + response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'middle'
                        }).present();
                        this.navCtrl.push('_132_WAS_Item');
                        break;
                    default:
                        this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'middle'
                        }).present();
                }
            })
            .then(response => {
                this.data.WAS_OrderNo = '';
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
        this.data.WAS_OrderNo = myGlobals.keyCodeToValue(event.keyCode, this.data.WAS_OrderNo);
        if (this.data.WAS_OrderNo.indexOf('ENTER') >= 0) {
            this.data.WAS_OrderNo = this.data.WAS_OrderNo.replace('ENTER', '');
            this.search();
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '批次', Value: this.data.WAS_OrderNo });
        obj.onDidDismiss(data => {
            this.data.WAS_OrderNo = myGlobals.ProgParameters.get('ListTable_answer');
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