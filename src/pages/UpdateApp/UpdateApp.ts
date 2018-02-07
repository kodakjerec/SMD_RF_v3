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
        window["thisRef"] = this;
        this.initialApp();
    }

    initialApp() {
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
        , MsgApk: 'Apk開始更新'
        , MsgWeb: 'Web開始更新'
    };

    gotoMain() {
        this.navCtrl.setRoot(_00_Login);
    }

    //#region 檢查更新 hot code push
    hotCodePush() {
        this.codePush.sync()
            .subscribe((syncStatus) => {
                this.syncStatus(syncStatus)
            });
    }
    syncStatus(syncStatus) {
        console.log(syncStatus);
        let ErrMSg = '';

		// not facing zoning issue here ?
		switch (syncStatus) {
			case 0: //SyncStatus.UP_TO_DATE
				ErrMSg = 'App is up to date !';
				this.data.checkStatus1 = 'secondary';
				this.hotcodepush_ChangeFlag();
				break;
			case 1: //SyncStatus.UPDATE_INSTALLED
				ErrMSg = 'Installed the update ..';
				this.data.checkStatus1 = 'secondary';
				this.hotcodepush_ChangeFlag();
				this.codePush.restartApplication();
				break;
			case 2: //SyncStatus.UPDATE_IGNORED
				ErrMSg = 'UPDATE_IGNORED ...';
				break;
			case 3: //SyncStatus.ERROR
				ErrMSg = 'An error occurred :( ...';
				break;
			case 4: //SyncStatus.IN_PROGRESS
				ErrMSg = 'An update is in progress ..';
				break;
			case 5: //SyncStatus.CHECKING_FOR_UPDATE
				ErrMSg = 'Checking for update ..';
				break;
			case 6: //SyncStatus.AWAITING_USER_ACTION
				break;
			case 7: //SyncStatus.DOWNLOADING_PACKAGE
				ErrMSg = 'Downloading package ..';
				break;
			case 8: //SyncStatus.INSTALLING_UPDATE
				ErrMSg = 'Installing update ..';
				break;

			default:
				ErrMSg = 'An unhandled sync status ..';
				break;
		}

        this.data.MsgWeb = 'Web:'+ ErrMSg;
    }

    hotcodepush_ChangeFlag() {
        console.log('Check Finish Apk:' + this.data.checkStatus0 + ' Web:' + this.data.checkStatus1);

        //沒有做到同步處理, 無法檢查web 更新狀況
        if (this.data.checkStatus0 == 'secondary') {
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
        let updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        return this.appUpdate.checkAppUpdate(updateUrl)
            .then(response => {
                let ErrMsg: string = '';
                switch (response.code) {
                    case 201:   //need update
                        break;
                    case 202:   //No need to update
                        console.log('Apk No Need to update ');
                        ErrMsg = 'Apk 更新完畢';
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
                    this.data.MsgApk = 'Apk:'+ ErrMsg;
                }

                return response;
            })
            ;
    }
    //#endregion
}