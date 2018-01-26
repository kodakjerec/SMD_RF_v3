import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

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
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private toastCtrl: ToastController
        , private vibration: Vibration) {
        myGlobals.loginCheck();
    }

    @ViewChild('scan_Entry') scan_Entry;

    ionViewDidEnter() {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    }

    data = {
        CarNo: localStorage.getItem('CarNo')
        , PaperNo: ''
        , PaperNo_ID: ''
        , IsDisabled: true
        , USER_ID: localStorage.getItem('USER_ID')
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    result = {};

    //重置btn
    reset() {
        localStorage.setItem('PaperNo', '');
        localStorage.setItem('PaperNo_ID', '');
        this.data.PaperNo_ID = '';

        this.result = {};

        this.data.IsDisabled = true;

        this.myFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.PaperNo == '') {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: myGlobals.Set_timeout,
                position: 'middle'
            }).present();
            return;
        }

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

                if (response != '') {
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

                            localStorage.setItem('PaperNo', this.data.PaperNo);
                            localStorage.setItem('PaperNo_ID', this.data.PaperNo_ID);

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

    //單據完成
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
                            this.toastCtrl.create({
                                message: response[0].RT_MSG,
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
