import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';
import { Keyboard } from '@ionic-native/keyboard';

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
        , public platform: Platform
        , public navParams: NavParams
        , private vibration: Vibration
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private keyboard: Keyboard) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_NAME = myGlobals.ProgParameters.get('BLOCK_NAME');

        this.initializeApp();
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewDidEnter() {
        if (this.data.IsDisabled == true) {
            setTimeout(() => {
                this.scan_Entry.setFocus();
            }, 150);
        }
    }

    data = {
        CarNo: ''
        , viewColor: ''
        , IsDisabled: true
        , USER_ID: ''
        , BLOCK_NAME: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    color = { green: '#79FF79', red: '#FF5151' }; // 控制已報到/未報到 顏色
    result = {};
    answer = { VEHICLE_TEMP0: 0, VEHICLE_TEMP1: 0, VEHICLE_TEMP2: 0 };

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

    //重置btn
    reset() {
        myGlobals.ProgParameters.set('CarNo', '');
        this.data.viewColor = '';
        this.data.IsDisabled = true;

        //輸入溫度
        this.answer.VEHICLE_TEMP0 = 0;
        this.answer.VEHICLE_TEMP1 = 0;
        this.answer.VEHICLE_TEMP2 = 0;
        //輸入溫度正負 reset
        this.VEHICLE_TEMP0_color.checked = false;
        this.onToggleChange(this.VEHICLE_TEMP0_color);
        this.VEHICLE_TEMP1_color.checked = false;
        this.onToggleChange(this.VEHICLE_TEMP1_color);
        this.VEHICLE_TEMP2_color.checked = false;
        this.onToggleChange(this.VEHICLE_TEMP2_color);

        this.result = {};

        this.scan_Entry.setFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.CarNo == '')
            return;

        this.reset();

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [
                { Name: '@JOB_ID', Value: '1' }
                , { Name: '@REG_ID', Value: this.data.CarNo }
            ])
            .subscribe((response) => {

                if (response != '') {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            this.result = response[0];

                            //溫度
                            this.answer.VEHICLE_TEMP0 = Math.abs(response[0].VEHICLE_TEMP0);
                            this.answer.VEHICLE_TEMP1 = Math.abs(response[0].VEHICLE_TEMP1);
                            this.answer.VEHICLE_TEMP2 = Math.abs(response[0].VEHICLE_TEMP2);
                            //溫度正負
                            if (response[0].VEHICLE_TEMP0 < 0) {
                                this.VEHICLE_TEMP0_color.checked = true;
                                this.onToggleChange(this.VEHICLE_TEMP0_color);
                            }
                            if (response[0].VEHICLE_TEMP1 < 0) {
                                this.VEHICLE_TEMP1_color.checked = true;
                                this.onToggleChange(this.VEHICLE_TEMP1_color);
                            }
                            if (response[0].VEHICLE_TEMP2 < 0) {
                                this.VEHICLE_TEMP2_color.checked = true;
                                this.onToggleChange(this.VEHICLE_TEMP2_color);
                            }

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
                            //Error
                            let alert_fail = this.alertCtrl.create({
                                title: '失敗',
                                subTitle: response[0].RT_MSG,
                                buttons: [{
                                    text: '關閉',
                                    handler: data => {
                                        this.scan_Entry.setFocus();
                                    }
                                }]
                            });
                            alert_fail.present();
                            break;
                    }
                }
                this.scan_Entry.setFocus();
            });
    };//#endregion

    //#region 20170613需求，加入溫度正負按鈕
    VEHICLE_TEMP0_color = { labelName: '＋', checked: false };
    VEHICLE_TEMP1_color = { labelName: '＋', checked: false };
    VEHICLE_TEMP2_color = { labelName: '＋', checked: false };
    onToggleChange(item) {
        if (item.checked == true)
            item.labelName = '－';
        else
            item.labelName = '＋';
    }
    //#endregion

    //#region 報到牌報到btn
    register() {
        if (this.data.CarNo == '')
            return;
        if (this.data.IsDisabled == false) {
            //20170613需求，加入溫度正負判斷，若選擇為負數，需將數值改成負，但ui不可顯示負號
            var TEMP0 = this.answer.VEHICLE_TEMP0;
            var TEMP1 = this.answer.VEHICLE_TEMP1;
            var TEMP2 = this.answer.VEHICLE_TEMP2;

            if (this.VEHICLE_TEMP0_color.checked == true)
                TEMP0 = -TEMP0;
            if (this.VEHICLE_TEMP1_color.checked == true)
                TEMP1 = -TEMP1;
            if (this.VEHICLE_TEMP2_color.checked == true)
                TEMP2 = -TEMP2;

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
                .subscribe((response) => {
                    if (response != '') {
                        var result = response[0];
                        switch (result.RT_CODE) {
                            case 0:
                                //Correct
                                let alert_success = this.alertCtrl.create({
                                    title: '成功',
                                    subTitle: result.RT_MSG,
                                    buttons: [{
                                        text: '關閉',
                                        handler: data => {
                                            this.reset();
                                        }
                                    }]
                                });
                                alert_success.present();
                                break;
                            default:
                                //Error
                                let alert_fail = this.alertCtrl.create({
                                    title: '失敗',
                                    subTitle: result.RT_MSG,
                                    buttons: [{
                                        text: '關閉',
                                        handler: data => {
                                            this.scan_Entry.setFocus();
                                        }
                                    }]
                                });
                                alert_fail.present();
                                break;
                        }

                    }
                    this.scan_Entry.setFocus();
                });
        }//if IsDisabled == false
    };//#endregion

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