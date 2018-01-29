import { Component } from '@angular/core';
import { Platform, LoadingController, ToastController, NavController } from 'ionic-angular';

//Cordova
import { AppUpdate } from '@ionic-native/app-update';
import { CodePush } from '@ionic-native/code-push';

//My Pages
import * as myGlobals from '../../app/Settings';
import { _00_Login } from '../_00_Login/Login';

@Component({
    templateUrl: 'UpdateApp.html'
})
export class UpdateApp {
    constructor(
        public platform: Platform
        , public navCtrl: NavController
        , public loadingCtrl: LoadingController
        , private toastCtrl: ToastController
        , private appUpdate: AppUpdate
        , private codePush: CodePush
    ) {
        this.initialApp();
    }

    initialApp() {
        this.data.ErrorTitle = '開始更新';
        this.data.ErrorMessage = '';
        this.data.checkStatus0 = 'danger';
        this.data.checkStatus1 = 'danger';
        this.data.checkStatus2 = false;

        if (this.platform.is('core')) {
            this.data.checkStatus0 = 'secondary';
            this.data.checkStatus1 = 'secondary';
            this.hotcodepush_ChangeFlag();
            return;
        }
        this.platform.ready()
            .then(response => { this.checkUpdate() })
            .then(response => { this.hotCodePush() })
            ;
    }

    data = {
        NeedUpdateApk: false    //通過自動更新 true:未更新 false:免更新
        , checkStatus0: 'danger'
        , checkStatus1: 'danger'
        , checkStatus2: false
        , ApkVersion: ''
        , ErrorTitle: ''
        , ErrorMessage: ''
    };

    gotoMain() {
        this.navCtrl.setRoot(_00_Login);
    }

    //#region 檢查更新 hot code push

    hotCodePush() {
        let myloadingCtrl = this.loadingCtrl.create({
            content: "檢查網頁更新中...",
        });
        myloadingCtrl.present();
        this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));

        const downloadProgress = (progress) => {
            this.data.ErrorMessage = 'Downloaded ' + progress.receivedBytes + toString() + ' of ' + progress.totalBytes.toString();
        }
        this.codePush
            .sync({}, downloadProgress)
            .subscribe((syncStatus) => {
                console.log(syncStatus);
                this.data.checkStatus1 = 'secondary';
                myloadingCtrl.dismiss();
                this.hotcodepush_ChangeFlag();
            });
    }

    hotcodepush_ChangeFlag() {
        console.log('Check Finish Apk:' + this.data.checkStatus0 + ' Web:' + this.data.checkStatus1);

        //沒有做到同步處理, 無法檢查web 更新狀況
        if (this.data.checkStatus0 == 'secondary') {
            this.data.ErrorTitle = '更新完畢';
            this.data.ErrorMessage = 'Complete';
            this.data.checkStatus2 = true;

            let toast = this.toastCtrl.create({
                message: '更新完畢，自動進入登入畫面',
                duration: 1000,
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
    checkUpdate() {
        console.log('Apk Update is Loading ');
        const updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        return this.appUpdate.checkAppUpdate(updateUrl)
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

                return response;
            })
            ;
    }
    //#endregion
}