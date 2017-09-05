import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, Platform, NavParams, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { ListTablePage } from '../../_ZZ_CommonLib/ListTable/ListTable';

@IonicPage({
    name: '_123_ItemCode',
    segment: '_123_ItemCode'
})
@Component({
    templateUrl: 'ItemCode.html'
})

export class _123_ItemCode {
    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , private vibration: Vibration
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_ID = myGlobals.ProgParameters.get('BLOCK_ID');
        this.data.CarNo = myGlobals.ProgParameters.get('CarNo');
        this.data.PaperNo = myGlobals.ProgParameters.get('PaperNo');
        this.data.PaperNo_ID = myGlobals.ProgParameters.get('PaperNo_ID');
    }

    @ViewChild('scan_Entry') scan_Entry;

    data = {
        CarNo: ''
        , PaperNo: ''
        , PaperNo_ID: ''
        , ItemCode: ''
        , ITEM_HOID: ''
        , LOT_ID: ''
        , viewColor: ''
        , IsDisabled: true
        , USER_ID: ''
        , BLOCK_ID: ''
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    answer = {
        LOT: ''
        , SunDay: ''
        , SunDay_placeholder: '123'
        , Temp: 0
        , QTY_ShowTotal: 0
        , QTY_left: 0
        , DisplaySunDay: 0
    };
    result = {};

    //20170613需求，加入溫度正負按鈕
    Temp_color = 'pos';
    //加入溫度正負按鈕END

    ionViewDidEnter() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    }

    //重置btn
    reset() {
        myGlobals.ProgParameters.set('ItemCode', '');
        myGlobals.ProgParameters.set('ITEM_HOID', '');
        this.data.ITEM_HOID = '';

        this.answer.LOT = '';
        this.answer.SunDay = '';
        this.answer.SunDay_placeholder = '123';
        this.answer.Temp = 0;
        this.answer.QTY_ShowTotal = 0;
        this.answer.QTY_left = 0;
        this.answer.DisplaySunDay = 0;

        this.result = {};
        this.data.IsDisabled = true;

        this.scan_Entry.setFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.ItemCode == '')
            return;

        this.reset();

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '1' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.ItemCode }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ])
            .then((response) => {
                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case -1:
                            //Multi variables, choose one
                            let Lists = [];

                            for (var index in response) {
                                var value = response[index];
                                Lists.push({ Name: value.RT_MSG, Value: value.BARCODE });
                            }

                            myGlobals.ProgParameters.set('ListTable_Source', Lists);

                            let obj = this.modalCtrl.create(ListTablePage);
                            obj.onDidDismiss(data => {
                                this.data.ItemCode = myGlobals.ProgParameters.get('ListTable_answer').Value;
                                console.log(myGlobals.ProgParameters.get('ListTable_answer'));
                                this.search();
                                return;
                            });
                            obj.present();
                            break;
                        case 0:
                            //Correct
                            this.result = response[0];

                            this.data.IsDisabled = false;

                            this.data.ItemCode = response[0].ITEM_ID;
                            this.data.ITEM_HOID = response[0].ITEM_HOID;

                            myGlobals.ProgParameters.set('ItemCode', this.data.ItemCode);
                            myGlobals.ProgParameters.set('ITEM_HOID', this.data.ITEM_HOID);

                            //帶出太陽日
                            this._http_services.POST('', 'sqlcmd'
                                , "SELECT DATENAME(dayofyear, getdate()) AS 'SunDay'"
                                , [])
                                .then((response2) => {
                                    this.answer.DisplaySunDay = response2[0].SunDay;
                                });

                            //帶入obj_response:any
                            var obj_response = response[0];

                            //SHOW 待收百分比
                            var QTY = obj_response.PO_QTY.split("/");
                            this.answer.QTY_left = parseInt(QTY[0]);
                            this.answer.QTY_ShowTotal = parseInt(QTY[1]);

                            //SHOW待收顏色
                            if (this.answer.QTY_left <= 0)
                                this.data.viewColor = 'white';
                            else
                                this.data.viewColor = 'red';

                            //介面顯示設定
                            this.answer.SunDay = obj_response.QE_TYPE_TEXT;

                            if (obj_response.QE_TYPE_NAME == '效期') {
                                this.answer.SunDay_placeholder = 'YYMMDD';
                            }
                            else {
                                this.answer.SunDay_placeholder = '123'
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

    //單品完成
    finish() {
        this.vibration.vibrate(100);
        if (this.data.ItemCode == '')
            return;

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '45' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.ItemCode }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ])
            .then((response) => {
                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            let toast = this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'bottom'
                            });
                            toast.present();
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
            });
    }

    //下一步
    Next() {
        if (this.data.IsDisabled == true)
            return;

        if (this.Temp_color == 'neg')
            this.answer.Temp = -this.answer.Temp;

        //開始鎖定
        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '2' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.ITEM_HOID }
                , { Name: '@ITEM_LOT', Value: this.answer.LOT }
                , { Name: '@ITEM_DATE', Value: this.answer.SunDay }
                , { Name: '@ITEM_TEMP', Value: this.answer.Temp }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ])
            .then((response) => {
                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            this.data.LOT_ID = response[0].LOT_ID;

                            myGlobals.ProgParameters.set('LOT_ID', this.data.LOT_ID);
                            myGlobals.ProgParameters.set('ReceiveResult', this.result);

                            this.navCtrl.push('_124_ItemRcv');
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
            });
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
