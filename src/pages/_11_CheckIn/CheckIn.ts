import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_11_CheckIn',
    segment: '_11_CheckIn'
})
@Component({
    templateUrl: 'CheckIn.html'
})
export class _11_CheckIn {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private vibration: Vibration) {
        myGlobals.loginCheck();
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewDidEnter() {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    }

    data = {
        CarNo: ''
        , viewColor: ''
        , IsDisabled: true
        , USER_ID: localStorage.getItem('USER_ID')
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    color = { green: '#79FF79', red: '#FF5151' }; // 控制已報到/未報到 顏色
    result = {};
    answer = { VEHICLE_TEMP0: 0, VEHICLE_TEMP1: 0, VEHICLE_TEMP2: 0 };

    //重置btn
    reset() {
        myGlobals.ProgParameters.set('CarNo', '');
        this.data.viewColor = '';
        this.data.IsDisabled = true;

        //輸入溫度
        this.answer.VEHICLE_TEMP0 = 0;
        this.answer.VEHICLE_TEMP1 = 0;
        this.answer.VEHICLE_TEMP2 = 0;

        this.result = {};

        this.myFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.CarNo == '') {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            return;
        }

        this.reset();

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [
                { Name: '@JOB_ID', Value: '1' }
                , { Name: '@REG_ID', Value: this.data.CarNo }
            ])
            .then((response) => {

                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            this.result = response[0];

                            //溫度
                            this.answer.VEHICLE_TEMP0 = Math.abs(response[0].VEHICLE_TEMP0);
                            this.answer.VEHICLE_TEMP1 = Math.abs(response[0].VEHICLE_TEMP1);
                            this.answer.VEHICLE_TEMP2 = Math.abs(response[0].VEHICLE_TEMP2);

                            this.data.CarNo = response[0].REG_ID;
                            if (response[0].ROW10 == '未報到') {
                                this.data.viewColor = 'red';
                                this.data.IsDisabled = false;
                            } else {
                                this.data.viewColor = 'green';
                                this.data.IsDisabled = true;
                            }
                            break;
                        default:
                            this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'middle'
                            }).present();
                            break;
                    }
                }
                this.myFocus();
            });
    };//#endregion

    //#region 報到牌報到btn
    register() {
        if (this.data.CarNo == '')
            return;
        if (this.data.IsDisabled == false) {
            this._http_services.POST('', 'sp'
                , 'spactDCS_ID_HEADER'
                , [
                    { Name: '@JOB_ID', Value: '2' }
                    , { Name: '@REG_ID', Value: this.data.CarNo }
                    , { Name: '@TEMP0', Value: this.answer.VEHICLE_TEMP0 }
                    , { Name: '@TEMP1', Value: this.answer.VEHICLE_TEMP1 }
                    , { Name: '@TEMP2', Value: this.answer.VEHICLE_TEMP2 }
                    , { Name: '@USER_NAME', Value: this.data.USER_ID }
                ])
                .then((response) => {
                    if (response != undefined) {
                        switch (response[0].RT_CODE) {
                            case 0:
                                //Correct
                                let alert_success = this.alertCtrl.create({
                                    title: '成功',
                                    subTitle: response[0].RT_MSG,
                                    buttons: ['關閉']
                                });
                                alert_success.onDidDismiss(() => {
                                    this.reset();
                                });
                                alert_success.present();
                                break;
                            default:
                                //Error
                                this.toastCtrl.create({
                                    message: response[0].RT_MSG,
                                    duration: myGlobals.Set_timeout,
                                    position: 'middle'
                                }).present();
                                break;
                        }

                    }
                    this.myFocus();
                });
        }//if IsDisabled == false
    };//#endregion

    //喪失focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 300);
    };

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    myKeylogger(event) {
        let obj = myGlobals.keyCodeToValue(event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
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