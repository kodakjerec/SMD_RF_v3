import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_131_WAS_OrderNo',
    segment: '_131_WAS_OrderNo'
})
@Component({
    templateUrl: 'OrderNo.html'
})
export class _131_WAS_OrderNo {
    constructor(public navCtrl: NavController
        , public platform: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private keyboard: Keyboard
        , private vibration: Vibration) {
        this.data.BLOCK_NAME = myGlobals.ProgParameters.get('BLOCK_NAME');
        this.initializeApp();
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList();
    }

    data = {
        BLOCK_NAME: ''
        , WAS_OrderNo: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true

    DisplayList = [];
    DefaultTestServer = '172_31_31_250';

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.keyboard.onKeyboardShow().subscribe(() => { this.data.IsHideWhenKeyboardOpen = true });
                this.keyboard.onKeyboardHide().subscribe(() => { this.data.IsHideWhenKeyboardOpen = false });
            })
            ;
    }

    BringDisplayList() {
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '00' }
                , { Name: '@Parameters', Value: '' }])
            .subscribe((response) => {
                if (response != undefined) {
                    this.DisplayList = response;
                }
                setTimeout(() => {
                    this.scan_Entry.setFocus();
                }, 500);
            });
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_OrderNo', '');
        this.data.WAS_OrderNo = '';

        this.scan_Entry.setFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);

        //test
        this.data.WAS_OrderNo = this.DisplayList[0].ORDER_NO;

        if (this.data.WAS_OrderNo.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            }).present()
                .then(response => {
                    this.scan_Entry.setFocus();
                });
            return;
        }

        let sql_parameter = this.data.WAS_OrderNo;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '0' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .subscribe((response) => {
                switch (response[0].RT_CODE) {
                    case 0:
                        localStorage.setItem('WAS_OrderNo', response[0].RT_MSG);
                        this.data.WAS_OrderNo = response[0].RT_MSG;
                        let toast = this.toastCtrl.create({
                            message: '驗證成功 ' + response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'bottom'
                        });
                        toast.present()
                            .then(response => {
                                this.navCtrl.push('_132_WAS_Item');
                            });
                        break;
                    default:
                        let alert = this.alertCtrl.create({
                            title: '錯誤代號：' + response[0].RT_CODE,
                            subTitle: response[0].RT_MSG,
                            buttons: ['關閉']
                        });
                        alert.present();
                }
            });
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }
    //Focus
    myFocus() {
        this.scan_Entry.setFocus();
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