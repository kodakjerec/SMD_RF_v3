import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, ToastController, IonicPage } from 'ionic-angular';

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
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private toastCtrl: ToastController
        , private vibration: Vibration) {

        //localStorage.setItem('USER_ID', '123456');
        //localStorage.setItem('BLOCK_NAME', '1樓進貨暫存區');
        //localStorage.setItem('CarNo', '023');
        //localStorage.setItem('PaperNo', 'PO180125008341');
        //localStorage.setItem('PaperNo_ID', 'ID180126000086');
        //localStorage.setItem('ItemCode', '621087');
        //localStorage.setItem('ITEM_HOID', '1161129110915');
        //localStorage.setItem('LOT_ID', '2180125000150');
        //localStorage.setItem('ReceiveResult', '{"RT_CODE":0,"RT_MSG":"找到了","ITEM_HOID":"1161129110915","IDN_ID":"IDN180124000239","CN":"621087","PO_QTY":"46 / 46","ITEM_ID":"621087","ROW1":"621087 人蔘枸杞雞（元進莊）","ROW2":"約７００ｇ/ 售價 119","ROW3":"本單應收 46 待收 46","ROW4":"應抽驗數4 (10%)","ROW5":"已收良品 0","ROW6":"已收不良 0","ROW7":"已收搭贈 0","PRICE":119,"NAME":"人蔘枸杞雞（元進莊）","SPEC":"約７００ｇ","UNIT":"盒","PRICE_TYPE":0,"UNIT_QTY":1,"UNIT_WEIGHT":700,"QC_RATE":"10%","QC_QTY":4,"QL_TYPE":0,"QE_TYPE":1,"QE_TYPE_NAME":"效期","QE_TYPE_TEXT":"","QT_TYPE":1,"QT_TYPE_NAME":"表面溫度","BARCODE":"20621087","ADDON_QTY":0,"ADDON_WT":0,"QTY":30,"WT":0,"NG_QTY":0,"NG_WT":0}');
        //this.data.CarNo = localStorage.getItem('CarNo');
        //this.data.PaperNo = localStorage.getItem('PaperNo');
        //this.data.PaperNo_ID = localStorage.getItem('PaperNo_ID');
        //this.data.ItemCode = localStorage.getItem('ItemCode');
        //this.data.ITEM_HOID = localStorage.getItem('ITEM_HOID');
        //this.data.LOT_ID = localStorage.getItem('LOT_ID');
        //this.data.USER_ID = localStorage.getItem('USER_ID');
        //this.data.BLOCK_NAME = localStorage.getItem('BLOCK_NAME');


        myGlobals.loginCheck();
    }

    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    }

    data = {
        CarNo: localStorage.getItem('CarNo')
        , PaperNo: localStorage.getItem('PaperNo')
        , PaperNo_ID: localStorage.getItem('PaperNo_ID')
        , ItemCode: ''
        , ITEM_HOID: ''
        , LOT_ID: ''
        , IsDisabled: true
        , USER_ID: localStorage.getItem('USER_ID')
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    answer = {
        LOT: ''
        , SunDay: ''
        , SunDay_placeholder: '123'
        , Temp: 0
        , QTY_ShowTotal: 0
        , QTY_ProgressBar: ''
        , DisplaySunDay: 0
    };
    result = {};

    //進度表
    getQTY_ProgressBar() {
        return this.answer.QTY_ProgressBar;
    }

    //重置btn
    reset() {
        localStorage.setItem('ItemCode', '');
        localStorage.setItem('ITEM_HOID', '');
        this.data.ITEM_HOID = '';

        this.answer.LOT = '';
        this.answer.SunDay = '';
        this.answer.SunDay_placeholder = '123';

        this.answer.QTY_ShowTotal = 0;
        this.answer.QTY_ProgressBar = '';
        this.answer.DisplaySunDay = 0;

        //溫度
        this.answer.Temp = 0;


        this.result = {};
        this.data.IsDisabled = true;

        this.myFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.ItemCode.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            return;
        }

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
                if (response != '') {
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

                            localStorage.setItem('ItemCode', this.data.ItemCode);
                            localStorage.setItem('ITEM_HOID', this.data.ITEM_HOID);

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
                            this.answer.QTY_ShowTotal = parseInt(QTY[1]);
                            this.answer.QTY_ProgressBar = Math.round(obj_response.QTY / this.answer.QTY_ShowTotal * 100).toString()+'%';
                            
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

    //單品完成
    finish() {
        this.vibration.vibrate(100);
        if (this.data.ItemCode.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入呼出碼',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            return;
        }

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '45' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.ITEM_HOID }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ])
            .then((response) => {
                if (response != '') {
                    switch (response[0].RT_CODE) {
                        case 0:
                            let toast = this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'bottom'
                            });
                            toast.present();
                            this.reset();

                            break;
                        default:
                            //sp回傳有兩種錯誤格式
                            var ErrorMessage = '';
                            if (response[0].RT_MSG != undefined)
                                ErrorMessage = response[0].RT_MSG;
                            else
                                ErrorMessage = response[0].MEG;

                            this.toastCtrl.create({
                                message: ErrorMessage,
                                duration: myGlobals.Set_timeout,
                                position: 'middle'
                            }).present();
                            break;
                    }
                }
            });
    }

    //下一步
    Next() {
        if (this.data.IsDisabled == true)
            return;

        let ErrMsg = '';
        //批號
        //效期
        //溫度

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
                if (response != '') {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            this.data.LOT_ID = response[0].LOT_ID;

                            localStorage.setItem('LOT_ID', this.data.LOT_ID);
                            localStorage.setItem('ReceiveResult', JSON.stringify(this.result));
                            this.navCtrl.push('_124_ItemRcv');
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
            });
    };

    //喪失focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 300);
    };

    myKeylogger(event) {
        let obj = myGlobals.keyCodeToValue(event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    }

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
