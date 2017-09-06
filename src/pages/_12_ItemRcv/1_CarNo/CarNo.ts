import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, Platform, NavParams, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';
import { Keyboard } from '@ionic-native/keyboard';

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
        , public platform: Platform
        , public navParams: NavParams
        , private vibration: Vibration
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private alertCtrl: AlertController
        , private keyboard: Keyboard) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_ID = myGlobals.ProgParameters.get('BLOCK_ID');

        this.initializeApp();
    }

    @ViewChild('scan_Entry') scan_Entry;

    data = {
        CarNo: ''
        , viewColor: ''
        , IsDisabled: true
        , USER_ID: ''
        , BLOCK_ID: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    color = { green: '#79FF79', red: '#FF5151' }; // 控制已報到/未報到 顏色
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
        myGlobals.ProgParameters.set('CarNo', '');
        this.result = {};
        this.data.viewColor = '';
        this.data.IsDisabled = true;

        this.scan_Entry.setFocus();
    };

    //#region 查詢報到牌btn
    search() {
        this.vibration.vibrate(100);
        if (this.data.CarNo == '')
            return;

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

                            myGlobals.ProgParameters.set('CarNo', this.data.CarNo);

                            if (response[0].ROW10 == '未報到') {
                                this.data.viewColor = 'red';
                                this.data.IsDisabled = true;
                            } else {
                                this.data.viewColor = 'green';
                                this.data.IsDisabled = false;
                            }
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

    //喪失focus
    myfocus() {
        //this.scan_Entry.setFocus();
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
