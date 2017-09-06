import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, Platform, NavParams, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';
import { Keyboard } from '@ionic-native/keyboard';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { ListTablePage } from '../../_ZZ_CommonLib/ListTable/ListTable';
import { PaperDetailPage } from '../../_ZZ_CommonLib/PaperDetail/PaperDetail';

@IonicPage({
    name: '_122_PaperNo',
    segment: '_122_PaperNo'
})
@Component({
    templateUrl: 'PaperNo.html'
})

export class _122_PaperNo {
    constructor(public navCtrl: NavController
        , public platform: Platform
        , public navParams: NavParams
        , private vibration: Vibration
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private keyboard: Keyboard) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_ID = myGlobals.ProgParameters.get('BLOCK_ID');
        this.data.CarNo = myGlobals.ProgParameters.get('CarNo');

        this.initializeApp();
    }

    @ViewChild('scan_Entry') scan_Entry;

    data = {
        CarNo: ''
        , PaperNo: ''
        , PaperNo_ID: ''
        , IsDisabled: true
        , USER_ID: ''
        , BLOCK_ID: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    result = {};

    ionViewDidEnter() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    }

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
        myGlobals.ProgParameters.set('PaperNo', '');
        myGlobals.ProgParameters.set('PaperNo_ID', '');
        this.data.PaperNo_ID = '';
        this.result = {};
        this.data.IsDisabled = true;

        this.scan_Entry.setFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.PaperNo == '')
            return;

        this.reset();

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [
                { Name: '@JOB_ID', Value: '3' }
                , { Name: '@REG_ID', Value: this.data.CarNo }
                , { Name: '@ID', Value: this.data.PaperNo }
                , { Name: '@USER_NAME', Value: this.data.USER_ID }
            ])
            .then((response) => {

                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case -1:
                            //Multi variables, choose one
                            let Lists = [];

                            for (var index in response) {
                                var value = response[index];
                                Lists.push({ Name: value.RT_MSG, Value: value.PO_ID });
                            }

                            myGlobals.ProgParameters.set('ListTable_Source', Lists);

                            let obj = this.modalCtrl.create(ListTablePage);
                            obj.onDidDismiss(data => {
                                this.data.PaperNo = myGlobals.ProgParameters.get('ListTable_answer').Value;
                                this.search();
                                return;
                            });
                            obj.present();
                            break;
                        case 0:
                            //Correct
                            this.data.IsDisabled = false;

                            this.data.PaperNo = response[0].PO_ID;
                            this.data.PaperNo_ID = response[0].ID;

                            myGlobals.ProgParameters.set('PaperNo', this.data.PaperNo);
                            myGlobals.ProgParameters.set('PaperNo_ID', this.data.PaperNo_ID);

                            //帶出驗收明細
                            this._http_services.POST('', 'sp'
                                , 'spactDCS_ID_HEADER'
                                , [
                                    { Name: '@JOB_ID', Value: '31' }
                                    , { Name: '@REG_ID', Value: this.data.CarNo }
                                    , { Name: '@ID', Value: this.data.PaperNo }
                                    , { Name: '@USER_NAME', Value: this.data.USER_ID }
                                ])
                                .then((response2) => {
                                    this.result = response2[0];
                                });

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

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //查詢明細
    //呼叫進貨單明細
    callPaperDetail() {
        if (this.data.IsDisabled == true)
            return;

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [{ Name: '@JOB_ID', Value: 13 }
                , { Name: '@REG_ID', Value: this.data.CarNo }
                , { Name: '@ID', Value: this.data.PaperNo }])
            .then((response) => {
                myGlobals.ProgParameters.set('ListTable_Source', response);

                let obj = this.modalCtrl.create(PaperDetailPage);
                obj.present();
            });
    };

    //單品完成
    finish() {
        this.vibration.vibrate(100);
        if (this.data.IsDisabled == true)
            return;

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [
                { Name: '@JOB_ID', Value: '4' }
                , { Name: '@REG_ID', Value: this.data.CarNo }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@USER_NAME', Value: this.data.USER_ID }
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

        this.navCtrl.push('_123_ItemCode');
    };

    //手勢
    swipeEvent(event) {
        console.log(event);
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT
                this.Next();
                break;
            case 4: //RIGHT
                this.reset();
                this.navCtrl.pop();
                break;
            //case 8: //UP
            //    break;
            //case 16://DOWN
            //    break;
        };
    }
}
