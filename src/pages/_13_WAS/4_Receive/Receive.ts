import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_134_WAS_Receive',
    segment: '_134_WAS_Receive'
})
@Component({
    templateUrl: 'Receive.html'
})
export class _134_WAS_Receive {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {
//localStorage.setItem('USER_ID', '123456');
//localStorage.setItem('BLOCK_NAME', '1樓撿貨區');
//localStorage.setItem('WAS_OrderNo', '1800901');
//localStorage.setItem('WAS_Item', '{ "ITEM_NO": "310098", "ITEM_NAME": "益之豬蒜泥白肉片" }');
//localStorage.setItem('WAS_Store', '{"RT_CODE": 0,"SITE_ID": "751400","SITE_NAME": "天母天玉","PRICE": 330,"PRICE_TYPE": "1","AMOUNT": 6,"TQty": 4,"TWeight":4.97,"LeftQty": 2,"SEQ":99}');

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO
            + ',' + JSON.parse(localStorage.getItem('WAS_Store')).SITE_ID;
    }
    @ViewChild('scan_Entry') scan_Entry;
    @ViewChild('scan_Entry2') scan_Entry2;

    ionViewWillEnter() {
        this.BringDisplayList();
        this.myFocus();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_Barcode: ''
        , IsInputEnable: true
        , IsHideWhenKeyboardOpen: false
        , InputMode: 0
        , InputModeName: '手動'
        , InputMode_Qty: '0'
        , InputMode_Weight: '0'
    };

    Receive = {
        ORDER_NO: ''
        , ITEM_NO: ''
        , SITE_ID: ''
        , AMOUNT: 0
        , TQty: 0
        , TWeight: 0.00
        , LeftQty: 0
        , PRICE: 0
        , PRICE_TYPE: '0'
        , ITEM_NAME: ''
        , SITE_NAME: ''
        , PRICE_TYPE_NAME: ''
    };
    DefaultTestServer = '172_31_31_250';

    BringDisplayList() {
        this.Receive.ORDER_NO = localStorage.getItem('WAS_OrderNo');

        let wasItem = JSON.parse(localStorage.getItem('WAS_Item'));
        this.Receive.ITEM_NO = wasItem.ITEM_NO;
        this.Receive.ITEM_NAME = wasItem.ITEM_NAME;

        let wasStore = JSON.parse(localStorage.getItem('WAS_Store'));
        this.Receive.SITE_ID = wasStore.SITE_ID;
        this.Receive.SITE_NAME = wasStore.SITE_NAME;
        this.Receive.PRICE = wasStore.PRICE;
        this.Receive.AMOUNT = wasStore.AMOUNT;
        this.Receive.TQty = wasStore.TQty;
        this.Receive.TWeight = wasStore.TWeight;
        this.Receive.LeftQty = wasStore.LeftQty;
        this.Receive.PRICE_TYPE = wasStore.PRICE_TYPE;

        switch (this.Receive.PRICE_TYPE) {
            case '0':
                this.Receive.PRICE_TYPE_NAME = '秤重';
                break;
            case '1':
                this.Receive.PRICE_TYPE_NAME = '定額';
                break;
        }
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_Store', '');

        this.data.WAS_Barcode = '';
        this.data.InputMode_Qty = '0';
        this.data.InputMode_Weight = '0';

        this.data.IsInputEnable = true;
        this.myFocus();
    };

    //查詢
    barcode_search() {
        let ErrMsg = '';
        let AssignQty = 0;
        let AssignWeight = 0.00;

        let ITEM_NO = this.data.WAS_Barcode.substr(2, 6);

        //檢查
        if (ITEM_NO != this.Receive.ITEM_NO) {
            ErrMsg = '條碼 與 呼出碼 不吻合';
        }

        AssignQty += 1;

        if (ErrMsg.length > 0) {
            this.toastCtrl.create({
                message: ErrMsg,
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_Barcode = '';
            this.data.IsInputEnable = true;
            return;
        }

        this.search(this.data.WAS_Barcode, AssignQty, AssignWeight);
    }
    Input_search() {
        let AssignQty = 0;
        let AssignWeight = 0.00;

        //檢查Qty和Weight
        AssignQty = parseInt(this.data.InputMode_Qty);
        AssignWeight = parseFloat(this.data.InputMode_Weight);

        //減量輸入
        if (AssignQty < 0)
            AssignWeight = 0 - Math.abs(AssignWeight);

        if (AssignQty == 0) {
            //不可為空
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
        }
        else if (AssignQty < 0) {
            this.alertCtrl.create({
                title: '提示 減量',
                subTitle: '指示量 ' + AssignQty.toString() + ' 小於零，將會執行減量<br/>'
                + '請確認是否輸入正確？'
                ,
                buttons: [{
                    text: '取消'
                    , handler: () => {
                        return;
                    }
                }
                    , {
                        text: '確定'
                        , handler: () => {
                            this.search('0', AssignQty, AssignWeight);
                        }
                    }
                ]
            }).present();
        }
        else if (AssignQty > this.Receive.LeftQty) {
            //Qty超過剩餘量, 需提示使用者
            this.alertCtrl.create({
                title: '提示',
                subTitle: '指示量 ' + AssignQty.toString() + ' 超出剩餘量 ' + this.Receive.LeftQty.toString() + '<br/>'
                + '請確認是否輸入正確？'
                ,
                buttons: [{
                    text: '取消'
                    , handler: () => {
                        return;
                    }
                }
                    , {
                        text: '確定'
                        , handler: () => {
                            this.search('0', AssignQty, AssignWeight);
                        }
                    }
                ]
            }).present();
        }
        else {
            this.search('0', AssignQty, AssignWeight);
        }
    }
    search(barcode: string, AssignQty: number, AssignWeight: number) {
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;

        //#region 驗收
        let sql_parameter =
            this.Receive.ORDER_NO
            + ',' + this.Receive.ITEM_NO
            + ',' + this.Receive.SITE_ID
            + ',' + AssignQty.toString()
            + ',' + AssignWeight.toString()
            + ',' + barcode
            + ',' + localStorage.getItem('USER_ID');
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '3' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //塞入歷史資料
                            myGlobals.ProgParameters.set('lastReceive', {
                                Order_No: this.Receive.ORDER_NO
                                , Item_No: this.Receive.ITEM_NO
                                , Store: this.Receive.SITE_ID
                                , barcode: barcode
                                , AssignQty: AssignQty
                                , AssignWeight: AssignWeight
                            });

                            this.Receive.TQty = response[0].TQty;
                            this.Receive.TWeight = response[0].TWeight;
                            this.Receive.LeftQty = response[0].LeftQty;

                            if (this.Receive.LeftQty <= 0) {
                                //吐標


                                //驗收完畢
                                this.reset();
                                this.navCtrl.pop();
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
            })
            .then(response => {
                this.reset();
            })
            ;
        //#endregion 驗收
    }

    //刪除上一次紀錄
    btn_MorelastReceive() {
        let oldData = myGlobals.ProgParameters.get('lastReceive');

        if (myGlobals.ProgParameters.get('lastReceive') == undefined) {
            this.toastCtrl.create({
                message: '沒有上一次的操作紀錄',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            this.myFocus();
            return;
        }

        //開始刪除舊資料				
        let sql_parameter =
            oldData.Order_No
            + ',' + oldData.Item_No
            + ',' + oldData.Store
            + ',' + (0 - oldData.AssignQty).toString()
            + ',' + (0 - oldData.AssignWeight).toString()
            + ',' + oldData.barcode
            + ',' + localStorage.getItem('USER_ID');
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '3' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    myGlobals.ProgParameters.set('lastReceive', undefined);

                    switch (response[0].RT_CODE) {
                        case 0:
                            //同一個營業所, 才需要幫忙更新資料
                            if (oldData.Store == this.Receive.SITE_ID) {
                                this.Receive.TQty = response[0].TQty;
                                this.Receive.TWeight = response[0].TWeight;
                                this.Receive.LeftQty = response[0].LeftQty;
                            }

                            this.toastCtrl.create({
                                message: '刪除上一筆資料完成',
                                duration: myGlobals.Set_timeout,
                                position: 'middle'
                            }).present();

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
            })
            .then(response => {
                this.reset();
            })
            ;
    }

    //切換 手動/自動條碼 模式, 0-手動 1-自動條碼
    btn_ChangeInputMode() {
        if (this.data.InputMode == 0) {
            this.data.InputMode = 1;
            this.data.InputModeName = '條碼';
            setTimeout(() => {
                this.scan_Entry2.setFocus();
            }, 300);
        }
        else {
            this.data.InputMode = 0;
            this.data.InputModeName = '手動'
            this.myFocus();
        }
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }
    //Focus
    myFocus() {
        if (this.data.InputMode == 0) {
            setTimeout(() => {
                this.scan_Entry._elementRef.nativeElement.focus();
            }, 300);
        }
    }
    myKeylogger(event) {
        this.data.WAS_Barcode = myGlobals.keyCodeToValue(event.keyCode, this.data.WAS_Barcode);
        if (this.data.WAS_Barcode.indexOf('ENTER') >= 0) {
            this.data.WAS_Barcode = this.data.WAS_Barcode.replace('ENTER', '');
            this.barcode_search();
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '條碼', Value: this.data.WAS_Barcode });
        obj.onDidDismiss(data => {
            this.data.WAS_Barcode = myGlobals.ProgParameters.get('ListTable_answer');
            this.barcode_search();
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