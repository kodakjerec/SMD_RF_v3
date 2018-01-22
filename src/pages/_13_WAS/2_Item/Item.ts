import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { PipesModule } from '../../../pipes/pipes.module';
import { LittleKeyPad } from '../../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@IonicPage({
    name: '_132_WAS_Item',
    segment: '_132_WAS_Item'
})
@Component({
    templateUrl: 'Item.html'
})
export class _132_WAS_Item {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private pipes: PipesModule
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private modalCtrl: ModalController
        , private vibration: Vibration) {
        this.data.RefValue = localStorage.getItem('WAS_OrderNo');
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList();
        this.myFocus();
    }

    data = {
        RefValue: ''
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , WAS_Item: ''
        , IsInputEnable: true
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true

    DisplayList = [];
    DefaultTestServer = '172_31_31_250';

    BringDisplayList() {
        let sql_parameter = this.data.RefValue + ','

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '01' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    this.DisplayList = response;
                }
            });
    }

    //重置btn
    reset() {
        localStorage.setItem('WAS_Item', '');
        this.data.WAS_Item = '';

        this.myFocus();
    };

    //查詢
    search() {
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;

        ////test
        //let FilterObj = this.pipes.mySearchPipe.transform(this.DisplayList, { property: 'ITEM_NO', keyword: this.data.WAS_Item });
        //if (FilterObj.length > 0)
        //    this.data.WAS_Item = FilterObj[0].ITEM_NO;
        //else
        //    this.data.WAS_Item = this.DisplayList[0].ITEM_NO;

        if (this.data.WAS_Item.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'bottom'
            }).present()
                .then(response => {
                    this.myFocus();
                });
            return;
        }

        let sql_parameter = this.data.RefValue + ',' + this.data.WAS_Item;

        this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line_v2'
            , [{ Name: '@Step', Value: '1' }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                switch (response[0].RT_CODE) {
                    case 0:
                        let result = JSON.stringify({
                            ITEM_NO: response[0].RT_MSG
                            , ITEM_NAME: response[0].ITEM_NAME
                        });
                        localStorage.setItem('WAS_Item', result);

                        let toast = this.toastCtrl.create({
                            message: '驗證成功 ' + response[0].RT_MSG,
                            duration: myGlobals.Set_timeout,
                            position: 'bottom'
                        });
                        toast.present();
                        this.data.WAS_Item = '';
                        this.navCtrl.push('_133_WAS_Store');
                        break;
                    default:
                        let alert = this.alertCtrl.create({
                            title: '錯誤代號：' + response[0].RT_CODE,
                            subTitle: response[0].RT_MSG,
                            buttons: ['關閉']
                        });
                        alert.present();
                }
            })
            .then(response => {
                this.data.IsInputEnable = true;
            })
            ;
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
                this.data.WAS_Item += keyValue;
                break;
        }
    }
    openKeyPad() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '呼出碼', Value: this.data.WAS_Item });
        obj.onDidDismiss(data => {
            this.data.WAS_Item = myGlobals.ProgParameters.get('ListTable_answer');
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