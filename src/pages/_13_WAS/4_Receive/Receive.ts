import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage } from 'ionic-angular';

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
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO
            + ',' + JSON.parse(localStorage.getItem('WAS_Store')).SITE_ID;
    }
    @ViewChild('scan_Entry') scan_Entry;

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
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true

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
        this.data.WAS_Barcode = '';

        this.myFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;

        ////test
        //this.data.WAS_Barcode =
        //    '20'
        //    + this.Receive.ITEM_NO;
        //for (let i = 0; i < (4 - this.Receive.PRICE.toString().length); i++) {
        //    this.data.WAS_Barcode += '0';
        //}
        //this.data.WAS_Barcode += this.Receive.PRICE + '1';

        let ITEM_NO = this.data.WAS_Barcode.substr(2, 6);
        let Price = this.data.WAS_Barcode.substr(8, 4);
        let AssignQty = 0;
        let AssignWeight = 0.00;

        //#region Error-Check
        let ErrMsg = '';
        if (ITEM_NO != this.Receive.ITEM_NO) {
            ErrMsg = '條碼 與 呼出碼 不吻合';
        }

        try {
            switch (this.Receive.PRICE_TYPE) {
                case '0':
                    AssignQty += 1;
                    AssignWeight += parseFloat((parseInt(Price) / this.Receive.PRICE * 1.1).toFixed(2));
                    break;
                case '1':
                    AssignQty += 1;
                    break;
            }
        } catch (err) {
            ErrMsg = err;
        }

        if (ErrMsg.length > 0) {
            this.toastCtrl.create({
                message: ErrMsg,
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            }).present()
                .then(response => {
                    this.myFocus();
                });
            return;
        }
        //#endregion Error-Check

        //#region 驗收
        let sql_parameter = this.data.RefValue
            + ',' + AssignQty.toString()
            + ',' + AssignWeight.toString();
        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '3' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    this.Receive.TQty += AssignQty;
                    this.Receive.LeftQty -= AssignQty;

                    this.Receive.TWeight = parseFloat((this.Receive.TWeight + AssignWeight).toFixed(2));

                    if (this.Receive.LeftQty <= 0) {
                        //驗收完畢
                        this.reset();
                        this.navCtrl.pop();
                    }
                    else {
                        //繼續驗收
                        this.data.WAS_Barcode = '';
                    }
                }
            })
            .then(response => {
                this.data.IsInputEnable = true;
                this.myFocus();
            })
            ;
        //#endregion 驗收
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
        let keyValue = myGlobals.keyCodeToValue(event.keyCode);
        switch (keyValue) {
            case 'ENTER':
                this.search();
                break;
            default:
                this.data.WAS_Barcode += keyValue;
                break;
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '條碼', Value: this.data.WAS_Barcode });
        obj.onDidDismiss(data => {
            this.data.WAS_Barcode = myGlobals.ProgParameters.get('ListTable_answer');
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