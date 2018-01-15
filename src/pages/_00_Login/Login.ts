//angular, Ionic
import { Component, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Platform, NavController, AlertController, LoadingController } from 'ionic-angular';

//Cordova
import { NFC } from '@ionic-native/nfc';
import { Keyboard } from '@ionic-native/keyboard';

//My Pages
import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

declare var chcp: any;

@Component({
    templateUrl: 'Login.html'
})

export class _00_Login {

    data = {
        IsHideWhenKeyboardOpen: false
        , WebVersion: myGlobals.ProgParameters.get('WebVersion')
        , ApkVersion: myGlobals.ProgParameters.get('ApkVersion')
        , Changelog: myGlobals.Changelog
        , username: ''
        , password: ''
        , NeedUpdateApk: false    //通過自動更新 true:通過 false:失敗
        , IsNFC_ON: false        //NFC有開啟    true:開啟 false:關閉
        , DCS_log_show: true
        , DCS_log_show_btnName: '顯示改版歷程'
    };
    private todo: FormGroup;
    @ViewChild('txb_username') txb_username;
    @ViewChild('txb_password') txb_password;

    constructor(public platform: Platform
        , public navCtrl: NavController
        , private formBuilder: FormBuilder
        , public _http_services: http_services
        , private nfc: NFC
        , private alertCtrl: AlertController
        , public loadingCtrl: LoadingController
        , private keyboard: Keyboard) {

        this.initializeApp();

        setTimeout(() => {
            this.txb_username.setFocus();
        }, 150);

        this.todo = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    initializeApp() {
        if (myGlobals.ProgParameters.get('NeedUpdateApk')) {
            this.data.Changelog = '請安裝更新。';
        }

        if (this.platform.is('core')) {
            console.log("You're develop in the browser. NO NFC,update");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.hotCodePush();
            })
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
    ionViewDidEnter() {

        //this.initializeBackButtonCustomHandler();
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
            .subscribe((response) => {
                if (response) {

                    switch (response[0].RTN_CODE) {
                        case 0:
                            myGlobals.ProgParameters.set('USER_ID', this.data.username);
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

    //進入測試網頁
    gotoTest() {
        this.navCtrl.push('_99_TEST');
    }

    getDownloadURL() {
        return 'http://' + myGlobals.Global_Server + '/Version/SMDRF_WG.apk';
    }

    //按下enter
    enter(obj: string) {
        if (obj == 'username') {
            this.txb_password.setFocus();
        }
        else {
            //this.login();
        }
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
            this.data.password = this.nfc.bytesToHexString(event.tag.id);
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

    //#region 檢查更新 hot code push
    //前端用
    hotCodePushUI() {
        let loading = this.loadingCtrl.create({
            content: '送出查詢中...'
        });

        loading.present();

        if (this.platform.is('core')) {
            location.reload();
        }
        else {
            this.hotCodePush();
        }

        loading.dismiss();
    }

    hotCodePush() {
        window["thisRef"] = this;
        chcp.fetchUpdate(this.updateCallback);
        chcp.getVersionInfo(this.InfoCallback);
    }
    updateCallback(error, data) {
        if (error) {
            switch (error.code) {
                case 2:
                    window["thisRef"].alertCtrl.create({
                        title: '完成',
                        message: '不用更新',
                        buttons: ['關閉']
                    }).present();
                    break;
                default:
                    console.error(error);
                    break;
            }
        } else {
            console.log('Update is loaded...');
            let confirm = window["thisRef"].alertCtrl.create({
                title: '應用程式更新',
                message: '按下"關閉"後會執行更新，請稍待數分鐘',
                buttons: [
                    {
                        text: '關閉',
                        handler: () => {
                            chcp.installUpdate(error => {
                                if (error) {
                                    console.error(error);
                                    window["thisRef"].alertCtrl.create({
                                        title: '更新內容下載失敗',
                                        subTitle: error.code,
                                        buttons: ['關閉']
                                    }).present();
                                } else {
                                    console.log('Update installed...');
                                }
                            });
                        }
                    }
                ]
            });
            confirm.present();
        }
    }
    InfoCallback(err, data) {
        window["thisRef"].data.WebVersion = data.currentWebVersion;
        window["thisRef"].data.ApkVersion = data.appVersion;
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
}
