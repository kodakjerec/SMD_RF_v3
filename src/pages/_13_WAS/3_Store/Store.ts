import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';
import { ListTablePage } from '../../_ZZ_CommonLib/ListTable/ListTable';

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
        , private toastCtrl: ToastController
        , private alertCtrl: AlertController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {
        //localStorage.setItem('USER_ID', '123456');
        //localStorage.setItem('BLOCK_NAME', 'A1DP1');
        //localStorage.setItem('BLOCK_NAME', '1樓撿貨區');
        //localStorage.setItem('WAS_OrderNo', '2018020601');
        //localStorage.setItem('WAS_Item', '{ "ITEM_NO": "310005", "ITEM_NAME": "澳洲穀飼牛梅花火鍋片" }');
        //localStorage.setItem('WAS_Store', '{"SITE_ID":"222100","SEQ":8,"AMOUNT":3,"TQty":1,"TWeight":1,"LeftQty":2,"SITE_NAME":"宜蘭泰山","PRICE":500,"PRICE_TYPE":"0"}');

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList(this.data.theLastSEQ);
        this.myFocus();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_Store: ''
        , IsInputEnable: true
        , IsHideWhenKeyboardOpen: false
        , InfiniteScrollEnable: true    //啟用無限卷軸
        , theLastSEQ: 0             //上次驗收最後進入的營業所SEQ
        , NoMoreOrders: false       //重整畫面使用, 已經沒有剩餘訂單的判斷
    };

    DisplayList = {
        SITE_ID: ''
        , SEQ: 0
        , AMOUNT: 0
        , UPD_AMOUNT: 0
        , TQty: 0
        , LeftQty: 0
        , SITE_NAME: ''
    };
    TotalList = [];
    DefaultTestServer = '172_31_31_250';

    BringDisplayList(startSEQ) {
        let sql_StepValue = '11';
        let sql_parameter = this.data.RefValue + ',' + startSEQ.toString();

        return this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: sql_StepValue }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    //先填入清單
                    this.BringDisplayList_Add(response);
                    if (this.TotalList.length > 0)
                        this.DisplayList = this.TotalList[0];

                    //檢查特殊情況
                    if (response.length == 0) {

                        this.data.InfiniteScrollEnable = false;

                        //連續兩次查料都沒有待處理清單, 回到上一頁
                        if (this.data.NoMoreOrders) {
                            this.reset();
                            this.navCtrl.pop();
                            return;
                        }

                        //從驗收回來後, 檢查是否還有剩餘資料
                        if (this.data.theLastSEQ > 0) {
                            this.data.theLastSEQ = 0;
                            this.data.NoMoreOrders = true;
                            this.BringDisplayList(0);
                            return;
                        }
                    }
                    else {
                        this.data.NoMoreOrders = false;
                        this.data.InfiniteScrollEnable = true;

                        //小於sp設定的50筆
                        //再次重頭搜尋未完成項目
                        if (response.length < 50) {
                            if (this.data.theLastSEQ > 0) {
                                console.log('小於sp設定的50筆');
                                this.data.theLastSEQ = 0;
                                this.BringDisplayList(0);
                                return;
                            }
                        }
                    }
                }

                return response;
            });
    }
    //查詢結果匯入TotalList
    BringDisplayList_Add(response) {
        response.forEach((value, index, array) => {
            let checkPK = this.TotalList.filter((value2, index2, array2) => value2.SITE_ID == value.SITE_ID);
            if (checkPK.length == 0)
                this.TotalList.push(value);
        });
    }
    //重置btn
    reset() {
        this.data.IsInputEnable = true;
        this.data.InfiniteScrollEnable = true;    //啟用無限卷軸
        this.data.theLastSEQ = 0;       //上次驗收最後進入的營業所SEQ
        this.data.NoMoreOrders = false;     //重整畫面使用, 已經沒有剩餘訂單的判斷
        this.data.WAS_Store = '';
        this.TotalList = [];

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
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_Store = '';
            this.data.IsInputEnable = true;
            return;
        }

        let sql_parameter = this.data.RefValue + ',' + this.data.WAS_Store;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '2' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                switch (response[0].RT_CODE) {
                    case 0:
                        let result = JSON.stringify({
                            SITE_ID: response[0].SITE_ID
                            , SEQ: response[0].SEQ
                            , AMOUNT: response[0].AMOUNT
                            , TQty: response[0].TQty
                            , TWeight: response[0].TWeight
                            , LeftQty: response[0].LeftQty
                            , SITE_NAME: response[0].SITE_NAME
                            , PRICE: response[0].PRICE
                            , PRICE_TYPE: response[0].PRICE_TYPE
                        });
                        localStorage.setItem('WAS_Store', result);

                        this.toastCtrl.create({
                            message: '驗證成功 ' + response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'middle'
                        }).present();

                        this.reset();

                        this.data.theLastSEQ = response[0].SEQ;
                        this.navCtrl.push('_134_WAS_Receive');
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
                this.data.WAS_Store = '';
                this.data.IsInputEnable = true;
            })
            ;
    }

    //改量
    btn_ChangeTqty() {
        this.reset();
        this.navCtrl.push('_1331_WAS_StoreChgAmount');
    }

    //補標
    btn_MorelastPrint() {
        let sql_parameter = this.data.RefValue;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '40' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response.length > 0) {
                    //開始補標
                    myGlobals.ProgParameters.set('ListTable_Source', response);

                    let obj = this.modalCtrl.create(ListTablePage);
                    obj.onDidDismiss(data => {
                        let ID = myGlobals.ProgParameters.get('ListTable_answer').Value;
                        if (ID != '') {
                            this._http_services.POST(this.DefaultTestServer, 'sp'
                                , '[WAS].dbo.spactWAS_Line'
                                , [{ Name: '@Step', Value: '41' }
                                    , { Name: '@Parameters', Value: ID }])
                                .then((response) => {
                                    //因為是特殊處理案例, 要跳出視窗嚴加提醒使用者
                                    this.alertCtrl.create({
                                        title: '結果 ' + response[0].RT_CODE,
                                        message: response[0].RT_MSG,
                                        buttons: ['關閉']
                                    }).present();
                                })
                        }
                        return;
                    });
                    obj.present();
                }
            });
    }

    //無限卷軸
    doInfinite(infiniteScroll) {
        let obj = this.TotalList[this.TotalList.length - 1];
        this.BringDisplayList(obj.SEQ + 1)
            .then(response => {
                infiniteScroll.complete();
            });
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
        console.log(event);
        this.data.WAS_Store = myGlobals.keyCodeToValue(event.keyCode, this.data.WAS_Store);
        if (this.data.WAS_Store.indexOf('ENTER') >= 0) {
            this.data.WAS_Store = this.data.WAS_Store.replace('ENTER', '');
            this.search();
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