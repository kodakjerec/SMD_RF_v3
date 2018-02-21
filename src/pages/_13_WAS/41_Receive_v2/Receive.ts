import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_134_WAS_Receive_v2',
    segment: '_134_WAS_Receive_v2'
})
@Component({
    templateUrl: 'Receive.html'
})
export class _134_WAS_Receive_v2 {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    @ViewChild('scan_Entry') scan_Entry;
    @ViewChild('scan_Entry2') scan_Entry2;
    @ViewChild('scan_Entry3') scan_Entry3;

    ionViewDidLoad() {
        this.BringFirstStore();
        this.myFocus();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_Barcode: ''
        , IsInputEnable: true
        , myFocusEnable: true
        , InputMode: 0
        , InputModeName: '條碼'
        , InputMode_Qty: '0'
        , InputMode_Weight: '0'
        , theLastSEQ: 0             //上次驗收最後進入的營業所SEQ
        , NoMoreOrders: false       //重整畫面使用, 已經沒有剩餘訂單的判斷
        , NextStore: {}
    };

    Receive = {
        ORDER_NO: ''
        , ITEM_NO: ''
        , SITE_ID: ''
        , AMOUNT: 0
        , TQty: 0
        , TWeight: 0.00
        , LeftQty: 0
        , NowBOXQTY: '0'
        , BOXQTY: 12
        , PRICE: 0
        , PRICE_TYPE: '0'
        , ITEM_NAME: ''
        , SITE_NAME: ''
        , PRICE_TYPE_NAME: ''
        , SEQ: 0
    };
    DefaultTestServer = '172_31_31_250';

    //帶入顯示用的營業所資料
    BringDisplayList(wasStore) {
        this.Receive.ORDER_NO = localStorage.getItem('WAS_OrderNo');

        let wasItem = JSON.parse(localStorage.getItem('WAS_Item'));
        this.Receive.ITEM_NO = wasItem.ITEM_NO;
        this.Receive.ITEM_NAME = wasItem.ITEM_NAME;

        this.Receive.SEQ = wasStore.SEQ;
        this.Receive.SITE_ID = wasStore.SITE_ID;
        this.Receive.SITE_NAME = wasStore.SITE_NAME;
        this.Receive.PRICE = wasStore.PRICE;
        this.Receive.AMOUNT = wasStore.AMOUNT;
        this.Receive.TQty = wasStore.TQty;
        this.Receive.TWeight = wasStore.TWeight;
        this.Receive.LeftQty = wasStore.LeftQty;
        this.Receive.NowBOXQTY = '0';
        this.Receive.BOXQTY = wasStore.BOXQTY;
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

    //帶入下一家預備操作的第一家營業所
    BringFirstStore() {
        let sql_parameter = this.data.RefValue + ',' + this.data.theLastSEQ;
        let Store_Object = {};
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '11' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response.length > 0) {
                    this.data.NoMoreOrders = false;
                    sql_parameter = this.data.RefValue + ',' + response[0].SITE_ID

                    //下一間營業所
                    if (response.length >= 2) {
                        this.data.NextStore = response[1];
                    }

                    this._http_services.POST(this.DefaultTestServer, 'sp'
                        , '[WAS].dbo.spactWAS_Line'
                        , [{ Name: '@Step', Value: '2' }
                            , { Name: '@Parameters', Value: sql_parameter }])
                        .then(function (response) {
                            switch (response[0].RT_CODE) {
                                case 0:
                                    Store_Object = response[0];
                                    break;
                                default:
                                    this.toastCtrl.create({
                                        message: response[0].RT_MSG,
                                        duration: myGlobals.Set_timeout,
                                        position: 'middle'
                                    }).present();
                            }
                        })
                        .then((response) => {
                            this.BringDisplayList(Store_Object);
                        });
                }
                else {
                    //連續兩次查料都沒有待處理清單, 回到上一頁
                    if (this.data.NoMoreOrders) {
                        console.log('[Receive]NavCtrl Pop');
                        this.reset();
                        this.navCtrl.pop();
                        return;
                    }

                    //從驗收回來後, 檢查是否還有剩餘資料
                    if (this.data.theLastSEQ > 0) {
                        console.log('[Receive]NoMoreOrders');
                        this.data.theLastSEQ = 0;
                        this.data.NoMoreOrders = true;
                        this.BringFirstStore();
                        return;
                    }
                }
            })
            ;
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_Store', '');

        this.data.WAS_Barcode = '';
        this.data.InputMode_Qty = '0';
        this.data.InputMode_Weight = '0';

        this.data.myFocusEnable = true;
        this.data.IsInputEnable = true;
        this.myFocus();
    };

    //查詢
    barcode_search() {
        let ErrMsg = '';
        let AssignQty = 0;
        let AssignWeight = 0.00;

        let ITEM_NO = this.data.WAS_Barcode.substr(2, 6);
        let ITEM_PRICE = this.data.WAS_Barcode.substr(8, 4);
        //檢查
        if (this.data.WAS_Barcode.length != 13) {
            ErrMsg = '條碼 長度不足13碼';
        }

        if (ITEM_NO != this.Receive.ITEM_NO) {
            ErrMsg = '條碼 與 呼出碼 不吻合';
        }

        AssignWeight = parseFloat((parseFloat(ITEM_PRICE) / this.Receive.PRICE).toFixed(2));
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
            , '[WAS].dbo.spactWAS_Line'
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
                            let message = '驗收成功！數量：' + AssignQty.toString();
                            if (AssignWeight > 0)
                                message += ' 重量：' + AssignWeight.toString();
                            this.toastCtrl.create({
                                message: message,
                                duration: myGlobals.Set_timeout,
                                position: 'bottom'
                            }).present();

                            this.Receive.NowBOXQTY = (parseInt(this.Receive.NowBOXQTY) + AssignQty).toString();    //箱入數增加

                            //手動輸入, 吐小計標
                            if (barcode == '0') {
                                this.PrintLabel(0, AssignQty, AssignWeight);
                            }
                            else {
                                //箱入數滿足, 吐小計標
                                if (parseInt(this.Receive.NowBOXQTY) >= this.Receive.BOXQTY) {
                                    this.PrintLabel(0, parseInt(this.Receive.NowBOXQTY), 0);
                                }

                                //無剩餘量
                                if (this.Receive.LeftQty <= 0) {
                                    //分檢完畢, 吐物流標
                                    this.PrintLabel(1, this.Receive.TQty, this.Receive.TWeight);

                                    //驗收完畢
                                    this.data.theLastSEQ = this.Receive.SEQ;
                                    this.BringFirstStore();
                                }
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

    //切換 手動/自動條碼 模式, 0-條碼 1-手動
    btn_ChangeInputMode() {
        if (this.data.InputMode == 0) {
            this.data.InputMode = 1;
            this.data.InputModeName = '手動';
        }
        else {
            this.data.InputMode = 0;
            this.data.InputModeName = '條碼'
        }
        this.myFocus();
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }
    //啟用/停用 自動Focus
    disablemyFocus(Mode) {
        if (Mode == 0)
            this.data.myFocusEnable = false;
        else
            this.data.myFocusEnable = true;
    }
    myFocus() {
        setTimeout(() => {
            if (this.data.myFocusEnable == false)
                return;

            if (this.data.InputMode == 0) {
                this.scan_Entry._elementRef.nativeElement.focus();
            }
            else {
                this.scan_Entry2.setFocus();
            }
        }, 300);
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

    //秤重模式下按enter
    InputMode_0_keyupEnter(Mode) {
        if (Mode == 0)
            this.scan_Entry3.setFocus();
        if (Mode == 1)
            this.Input_search();
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

    //吐標
    PrintLabel(Mode: number, AssignQty: number, AssignWeight: number) {
        //Mode:0 小記標籤
        //Mode:1 物流標籤
        let sql_parameter =
            this.Receive.ORDER_NO
            + ',' + this.Receive.ITEM_NO
            + ',' + this.Receive.SITE_ID
            + ',' + localStorage.getItem('BLOCK_ID')
            + ',' + AssignQty.toString()
            + ',' + AssignWeight.toString()
            + ',' + Mode.toString();

        this.Receive.NowBOXQTY = '0';

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: '4' }
                , { Name: '@Parameters', Value: sql_parameter }])
    }

    //改量
    btn_ChangeTqty() {
        //this.reset();
        this.navCtrl.push('_1331_WAS_StoreChgAmount');
    }

    //切換營業所
    btn_ChangeStore() {
        //用Promise等待navCtrl.push回傳訊息
        //指定number回傳型態
        new Promise<number>((resolve, reject) => {
            this.navCtrl.push('_1332_WAS_StoreChg', { resolve: resolve });
        }).then(data => {
            this.reset();
            this.data.theLastSEQ = data;
            this.BringFirstStore();
        });
    }
}