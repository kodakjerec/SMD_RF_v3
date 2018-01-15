import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_134_WAS_Receive',
    segment: '_134_WAS_Receive'
})
@Component({
    templateUrl: 'Receive.html'
})
export class _134_WAS_Receive {
    constructor(public navCtrl: NavController
        , public platform: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private toastCtrl: ToastController
        , private keyboard: Keyboard
        , private vibration: Vibration) {

        this.data.RefValue = localStorage.getItem('WAS_OrderNo') + ',' + localStorage.getItem('WAS_Item') + ',' + localStorage.getItem('WAS_Store');
        this.data.BLOCK_NAME = myGlobals.ProgParameters.get('BLOCK_NAME');

        this.initializeApp();
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: ''
        , WAS_Barcode: ''
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
        , SID: 0
        , SEQ: 0
        , ITEM_NAME: ''
        , SITE_NAME: ''
        , PRICE_TYPE_NAME: ''
    };
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
        let sql_parameter = this.data.RefValue + ','

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '21' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .subscribe((response) => {
                if (response != undefined) {
                    this.Receive = response[0];

                    let PRICE_TYPE_NAME = '';
                    switch (this.Receive.PRICE_TYPE) {
                        case '0':
                            PRICE_TYPE_NAME = '秤重';
                            break;
                        case '1':
                            PRICE_TYPE_NAME = '定額';
                            break;
                    }
                    this.Receive.PRICE_TYPE_NAME = PRICE_TYPE_NAME;
                }

                setTimeout(() => {
                    this.scan_Entry.setFocus();
                }, 500);
            });
    }

    //重置btn
    reset() {
        this.data.WAS_Barcode = '';

        this.scan_Entry.setFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);

        //test
        this.data.WAS_Barcode =
            '20'
            + this.Receive.ITEM_NO;
        for (let i = 0; i < (4 - this.Receive.PRICE.toString().length); i++) {
            this.data.WAS_Barcode += '0';
        }
        this.data.WAS_Barcode += this.Receive.PRICE + '1';

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
                    setTimeout(() => {
                        this.scan_Entry.setFocus();
                    }, 150);
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
            .subscribe((response) => {
                if (response != undefined) {
                    console.log(response);
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
                        this.scan_Entry.setFocus();
                    }
                }
            });
        //#endregion 驗收
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