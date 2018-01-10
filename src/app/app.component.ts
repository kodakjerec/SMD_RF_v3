import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';

//Cordova plugins
import { FCM } from '@ionic-native/fcm';
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SyncStatus } from 'ionic-native';
import { CodePush  } from '@ionic-native/code-push';


//My Pages
import { _00_Login } from '../pages/_00_Login/Login';
import * as myGlobals from './Settings';

@Component({
    templateUrl: 'app.html'
})
export class SMDRF {
    @ViewChild(Nav) nav: Nav;

    //設定root page
    rootPage: any = _00_Login;

    pages: Array<{ title: string, component: any }>;
    messageText: string;

    constructor(public platform: Platform
        , public statusBar: StatusBar
        , public splashScreen: SplashScreen
        , public fcm: FCM
        , private appUpdate: AppUpdate
        , private alertCtrl: AlertController
        , private codePush: CodePush
        , private ngZone: NgZone
        , private events: Events
    ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {
                title: '_00_Login'
                , component: _00_Login
            }
        ];

        localStorage.clear();
    }

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser.NO FCM");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.hotCodePush();
            })
            .then(() => {
                this.checkUpdate();
            })
            .then(() => {
                this.myFCM()
            })
            .then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            })
            ;
    }

    myFCM() {

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.

        //FCM
        this.fcm.subscribeToTopic('developers');

        this.fcm.getToken().then(token => {
            //backend.registerToken(token);
            console.log(token);
        })

        this.fcm.onNotification().subscribe(data => {
            var obj = JSON.stringify(data);
            alert(obj);
            if (data.wasTapped) {
                let alert_background = this.alertCtrl.create({
                    title: 'B ' + data.title,
                    subTitle: data.body,
                    buttons: ['關閉']
                });
                alert_background.present();
                console.log("Received in background");
            } else {
                let alert_foreground = this.alertCtrl.create({
                    title: 'F ' + data.title,
                    subTitle: data.body,
                    buttons: ['關閉']
                });
                alert_foreground.present();
                console.log("Received in foreground");
            };
        })

        this.fcm.onTokenRefresh().subscribe(token => {
            //backend.registerToken(token);
            console.log(token);
        })

        //解除安裝
        //fcm.unsubscribeFromTopic('developers');
    }

    //#region 檢查更新 Full apk
    checkUpdate() {
        let NeedUpdate = true;
        const updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl)
            .then(response => {
                let ErrMsg: string = '';
                switch (response.code) {
                    case 201:   //need update
                        break;
                    case 202:   //No need to update
                        NeedUpdate = false;
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

                myGlobals.ProgParameters.set('NeedUpdate', NeedUpdate);
            });
    }
    //#endregion

    //#region 檢查更新 hot code push
    hotCodePush() {
        this.codePush.sync().subscribe((syncStatus) => {
            console.log('Sync Status: ', syncStatus);
        });

        const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
        this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
    }
    //#endregion

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
