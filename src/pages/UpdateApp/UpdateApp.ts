import { Component } from '@angular/core';
import { Platform, NavParams, AlertController, ToastController, NavController } from 'ionic-angular';

//Cordova
import { AppUpdate } from '@ionic-native/app-update';

//My Pages
import * as myGlobals from '../../app/Settings';
import { _00_Login } from '../_00_Login/Login';

//hot code push
declare var chcp: any;

@Component({
    templateUrl: 'UpdateApp.html'
})
export class UpdateApp {
    constructor(
        public platform: Platform
        , private navparams: NavParams
        , public navCtrl: NavController
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private appUpdate: AppUpdate
    ) {
        if (this.navparams.get('UpdateApp') != undefined)
            this.data.CallFromLogin = true;
        this.initialApp();
    }

    initialApp() {
        this.data.ErrorTitle = '開始更新';
        this.data.ErrorMessage = '';
        this.data.checkStatus0 = 'danger';
        this.data.checkStatus1 = 'secondary';
        this.data.checkStatus2 = false;

        if (this.platform.is('core')) {
            this.data.checkStatus0 = 'secondary';
            this.data.checkStatus1 = 'secondary';
            this.hotcodepush_ChangeFlag();
            console.log("You're develop in the browser. NO NFC,update");
            return;
        }
        this.platform.ready()
            .then(response => { this.checkUpdate() })
    }

    data = {
        NeedUpdateApk: false    //通過自動更新 true:未更新 false:免更新
        , checkStatus0: 'danger'
        , checkStatus1: 'danger'
        , checkStatus2: false
        , WebVersion: ''
        , ApkVersion: ''
        , ErrorTitle: ''
        , ErrorMessage: ''
        , CallFromLogin: false
    };

    gotoMain() {
        this.navCtrl.setRoot(_00_Login);
    }

    //#region 檢查更新 hot code push
    hotCodePush(): any {
        window["thisRef"] = this;
        chcp.fetchUpdate(this.updateCallback);
        chcp.getVersionInfo(this.InfoCallback);
    }
    updateCallback(error, data) {
        if (error) {
            switch (error.code) {
                case 2:
                    console.log('Web ' + error.description);
                    window["thisRef"].data.ErrorTitle = 'Web更新完畢';
                    window["thisRef"].data.checkStatus1 = 'secondary';
                    window["thisRef"].hotcodepush_ChangeFlag();
                    break;
                default:
                    window["thisRef"].data.ErrorTitle = 'Web更新失敗';
                    window["thisRef"].data.ErrorMessage = error.description;
                    console.error(error);
                    break;
            }
        }
        else {
            // 进度
            var progress = parseFloat(data.progress);
            console.log(data);
            if (progress == 1.0) {
                chcp.installUpdate();
            }

            console.log('Web Update is Loading ');
            window["thisRef"].data.ErrorTitle = 'Web正在更新';

            if (window["thisRef"].data.CallFromLogin) {
                let myalert = window["thisRef"].alertCtrl.create({
                    title: '準備下載 Web 更新',
                    buttons: ['關閉']
                });
                myalert.onDidDismiss(response => {
                    chcp.installUpdate(error => {
                        if (error) {
                            console.error(error);
                            window["thisRef"].data.ErrorTitle = 'Web更新失敗';
                            window["thisRef"].data.ErrorMessage = error.code;
                        }
                        else {
                            console.log('Web Update Finished ');
                            window["thisRef"].data.ErrorTitle = 'Web更新完畢';
                            window["thisRef"].data.checkStatus1 = 'secondary';
                            window["thisRef"].hotcodepush_ChangeFlag();
                        }
                    });
                });
                myalert.present();
            }
            else {
                chcp.installUpdate(error => {
                    if (error) {
                        console.error(error);
                        window["thisRef"].data.ErrorTitle = 'Web更新失敗';
                        window["thisRef"].data.ErrorMessage = error.code;
                    }
                    else {
                        console.log('Web Update Finished ');
                        window["thisRef"].data.ErrorTitle = 'Web更新完畢';
                        window["thisRef"].data.checkStatus1 = 'secondary';
                        window["thisRef"].hotcodepush_ChangeFlag();
                    }
                });
            }
        }
    }
    InfoCallback(err, data) {
        window["thisRef"].data.WebVersion = data.currentWebVersion;
        window["thisRef"].data.ApkVersion = data.appVersion;
    }
    hotcodepush_ChangeFlag() {
        console.log('Check Finish Apk:' + this.data.checkStatus0 + ' Web:' + this.data.checkStatus1);

        //沒有做到同步處理, 無法檢查web 更新狀況
        if (this.data.checkStatus0 == 'secondary') {
            this.data.checkStatus2 = true;
            let toast = this.toastCtrl.create({
                message: '更新完畢，自動進入登入畫面',
                duration: 2000,
                position: 'middle'
            });
            toast.onDidDismiss(response => {
                this.gotoMain();
            });
            toast.present();
        }
    }
    //#endregion

    //#region 檢查更新 Full apk
    checkUpdate(): any {
        console.log('Apk Update is Loading ');
        const updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl)
            .then(response => {
                let ErrMsg: string = '';
                switch (response.code) {
                    case 201:   //need update
                        break;
                    case 202:   //No need to update
                        console.log('Apk No Need to update ');
                        this.data.ErrorTitle = '更新完畢';
                        this.data.checkStatus0 = 'secondary';
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
                    this.data.ErrorTitle = '檢查更新出錯';
                    this.data.ErrorMessage = ErrMsg;
                }
            })
            .then(response => {
                this.hotCodePush();
            });
        ;
    }
    //#endregion
}