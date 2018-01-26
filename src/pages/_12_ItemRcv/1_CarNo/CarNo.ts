import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { PaperDetailPage } from '../../_ZZ_CommonLib/PaperDetail/PaperDetail';

@IonicPage({
    name: '_121_CarNo',
    segment: '_121_CarNo'
})
@Component({
    templateUrl: 'CarNo.html'
})

export class _121_CarNo {
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
        CarNo: ''
        , viewColor: ''
        , IsDisabled: true
        , USER_ID: localStorage.getItem('USER_ID')
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    color = { green: '#79FF79', red: '#FF5151' }; // 控制已報到/未報到 顏色
    result = {};

    //重置btn
    reset() {
        localStorage.setItem('CarNo', '');

        this.result = {};

        this.data.viewColor = '';
        this.data.IsDisabled = true;

        this.myFocus();
    };
    //查詢欄位專用清除
    reset_btn() {
        this.reset();
        this.data.CarNo = '';
    }

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.CarNo == '') {
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
                { Name: '@JOB_ID', Value: '1' }
                , { Name: '@REG_ID', Value: this.data.CarNo }
            ])
            .then((response) => {

                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            this.result = response[0];

                            this.data.CarNo = response[0].REG_ID;
                            this.data.IsDisabled = false;

                            localStorage.setItem('CarNo', this.data.CarNo);

                            if (response[0].ROW10 == '未報到') {
                                this.data.viewColor = 'red';
                                this.data.IsDisabled = true;
                            } else {
                                this.data.viewColor = 'green';
                                this.data.IsDisabled = false;
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

    //喪失focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 300);
    };

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //查詢明細
    //呼叫進貨單明細
    callPaperDetail() {
        console.log(this.data);
        if (this.data.IsDisabled == true)
            return;

        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_HEADER'
            , [{ Name: '@JOB_ID', Value: 11 }
                , { Name: '@REG_ID', Value: this.data.CarNo }])
            .then((response) => {
                myGlobals.ProgParameters.set('ListTable_Source', response);

                let obj = this.modalCtrl.create(PaperDetailPage);
                obj.present();
            });
    };

    //下一步
    Next() {
        if (this.data.IsDisabled == true)
            return;

        this.navCtrl.push('_122_PaperNo');
    };

    myKeylogger(event) {
        let obj = myGlobals.keyCodeToValue(event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    }

    //手勢
    swipeEvent(event) {
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
