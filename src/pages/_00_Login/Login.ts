//angular, Ionic
import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, AlertController, LoadingController } from 'ionic-angular';

//Cordova
import { NFC } from '@ionic-native/nfc';
import { Keyboard } from '@ionic-native/keyboard';

//My Pages
import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';
import { UpdateApp } from '../UpdateApp/UpdateApp';
import { File } from '@ionic-native/file';

@Component({
    templateUrl: 'Login.html'
})

export class _00_Login {
    constructor(public platform: Platform
        , public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , public loadingCtrl: LoadingController
        , private keyboard: Keyboard
        , private nfc: NFC
        , private file: File
    ) {
        this.initializeApp();
    }

    data = {
        IsHideWhenKeyboardOpen: false
        , Changelog: myGlobals.Changelog
        , username: '123456'
        , password: '111'
        , IsNFC_ON: false        //NFC有開啟    true:NFC開啟 false:NFC關閉
        , DCS_log_show: true
        , DCS_log_show_btnName: '顯示改版歷程'
        , Iskeyin_OK: true
    };

    @ViewChild('scan_Entry') scan_Entry;

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser. NO NFC,update");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.myNFC();
            })
            .then(() => {
                this.keyboard.onKeyboardShow().subscribe(() => { this.data.IsHideWhenKeyboardOpen = true });
                this.keyboard.onKeyboardHide().subscribe(() => { this.data.IsHideWhenKeyboardOpen = false });
            })
            ;
    }

    //#region 還原硬體鍵[左鍵]的設定
    public unregisterBackButtonAction: any;

    //進入頁面
    ionViewWillEnter() {
        this.myFocus();

        localStorage.clear();
    }

    //離開頁面
    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        // this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    public initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.disableHardwareCallbackAction();
        }, 10);

    }
    private disableHardwareCallbackAction(): void {
        //let toast = this.toastCtrl.create({
        //    message: '返回在登入頁面無法使用',
        //    duration: myGlobals.Set_timeout,
        //    position: 'bottom'
        //});
        //toast.present();
    };
    //#endregion

    //登入
    login() {
        this._http_services.POST('', 'sp'
            , '[ui].[spDCS_LOGIN]'
            , [{ Name: '@ID', Value: this.data.username }
                , { Name: '@PASSWORD', Value: this.data.password }
                , { Name: '@TYPE', Value: 0 }
            ])
            .then((response) => {
                if (response) {

                    switch (response[0].RTN_CODE) {
                        case 0:
                            localStorage.setItem('USER_ID', this.data.username);
                            this.navCtrl.push('_01_Zone');
                            break;
                        default:
                            let alert = this.alertCtrl.create({
                                title: '錯誤代號：' + response[0].RTN_CODE,
                                subTitle: response[0].RTN_MSG,
                                buttons: ['關閉']
                            });
                            alert.present();
                    }

                }
            });
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //喪失focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 300);
    };

    myKeylogger(event) {
        let obj = myGlobals.keyCodeToValue(event.keyCode, this.data.username);
        if (obj.indexOf('ENTER') >= 0) {
            this.login();
        }
    }

    //進入測試網頁
    gotoTest() {
        this.navCtrl.push('_99_TEST');
    }
    //回傳下載路徑
    getDownloadURL() {
        return 'http://' + myGlobals.Global_Server + '/Version/SMDRF_WG.apk';
    }

    //帳號密碼長度
    checkLength() {
        if (this.data.username.length > 0 && this.data.password.length > 0)
            this.data.Iskeyin_OK = true;
    }

    //#region NFC
    myNFC() {
        //NFC感應
        this.nfc.addTagDiscoveredListener(() => {
            console.log('successfully attached TagDiscovered listener');
            this.data.IsNFC_ON = true;
        }, (err) => {
            console.log('error attaching ndef listener', err);
        }).subscribe((event) => {
            console.log('received ndef message. the tag contains: ', event.tag);
            console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

            this.data.username = this.nfc.bytesToHexString(event.tag.id);
            this.login();

            //分享訊息
            //let message = this.ndef.textRecord('Hello world');
            //this.nfc.share([message]).then(onSuccess).catch(onError);
        });
    }
    checkNFCreturnColor(): string {
        if (this.data.IsNFC_ON == true) {
            return 'secondary';
        }
        else {
            return 'dark';
        }
    }
    //#endregion

    //變更log區塊高度
    showDCS_log() {
        if (this.data.DCS_log_show) {
            this.data.DCS_log_show = false;
            this.data.DCS_log_show_btnName = "不顯示改版歷程";
        }
        else {
            this.data.DCS_log_show = true;
            this.data.DCS_log_show_btnName = "顯示改版歷程";
        }
    }

    //重新更新
    gotoUpdateApp() {
        if (!this.platform.is('core')) {
            let path = this.file.dataDirectory + 'cordova-hot-code-push-plugin/';
            console.log(path);
            //console.log(this.file.listDir(path, 'cordova-hot-code-push-plugin'));
        }
        this.navCtrl.push(UpdateApp, {UpdateApp: true});
    }
}
