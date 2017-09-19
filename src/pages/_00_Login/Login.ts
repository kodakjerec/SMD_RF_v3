//angular, Ionic
import { Component, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Platform, NavController, AlertController, ToastController } from 'ionic-angular';

//Cordova
import { AppUpdate } from '@ionic-native/app-update';
import { NFC } from '@ionic-native/nfc';
import { Keyboard } from '@ionic-native/keyboard';

//My Pages
import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@Component({
    templateUrl: 'Login.html'
})

export class _00_Login {

    data = {
        IsHideWhenKeyboardOpen: false
        , Version: myGlobals.packageVersion
        , Changelog: myGlobals.Changelog
        , username: ''
        , password: ''
        , NeedUpdate: false    //通過自動更新 true:通過 false:失敗
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
        , private appUpdate: AppUpdate
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private keyboard: Keyboard) {

        this.initializeApp();

        //this.gotoTest();

        this.todo = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.myNFC();
            })
            .then(() => {
                this.checkUpdate();
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
        this.initializeBackButtonCustomHandler();

        setTimeout(() => {
            this.txb_username.setFocus();
        }, 150);
    }

    //離開頁面
    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    public initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.disableHardwareCallbackAction();
        }, 10);

    }
    private disableHardwareCallbackAction(): void {
        let toast = this.toastCtrl.create({
            message: '返回在登入頁面無法使用',
            duration: myGlobals.Set_timeout,
            position: 'bottom'
        });
        toast.present();
    };
    //#endregion

    //登入
    login() {
        this._http_services.POST('', 'sp'
            , '[sys.spDCS_LOGIN]'
            , [{ Name: '@ID', Value: this.data.username }
                , { Name: '@PASSWORD', Value: this.data.password }])
            .subscribe((response) => {
                if (response) {

                    switch (response[0].LOGIN_RESULT) {
                        case 0:
                            myGlobals.ProgParameters.set('USER_ID', response[0].ID);
                            myGlobals.ProgParameters.set('BLOCK_ID', response[0].BLOCK_ID);

                            this.navCtrl.push('_01_Menu');
                            break;
                        default:
                            let alert = this.alertCtrl.create({
                                title: '錯誤代號：' + response[0].LOGIN_RESULT,
                                subTitle: response[0].LOGIN_MESSAGE,
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

    gotoTest() {
        this.navCtrl.push('_99_TEST');
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

    //#region 檢查更新
    checkUpdate() {
        this.data.NeedUpdate = true;
        const updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl)
            .then(response => {
                let ErrMsg: string = '';
                switch (response.code) {
                    case 201:   //need update
                        break;
                    case 202:   //No need to update
                        this.data.NeedUpdate = false;
                        break;
                    case 203:   //version is updating
                        break;
                    case 301:
                    case 302:
                        ErrMsg = '檢查更新文件錯誤';
                        break;
                    case 404:
                    case 405:
                        ErrMsg = '網路錯誤';
                        break;
                    default:
                        ErrMsg = '未知錯誤';
                        break;
                };
                if (ErrMsg != '') {
                    let alert_appupdate = this.alertCtrl.create({
                        title: '檢查更新出錯',
                        subTitle: ErrMsg,
                        buttons: ['關閉']
                    });
                    alert_appupdate.present();
                }
                if (this.data.NeedUpdate) {
                    this.data.Changelog = '請安裝更新。';
                }
            });
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
