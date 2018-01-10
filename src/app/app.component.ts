import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';

//Cordova plugins
import { FCM } from '@ionic-native/fcm';
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';

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
        , private keyboard: Keyboard
    ) {
        keyboard.disableScroll(false);

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
            } else {
                let alert_foreground = this.alertCtrl.create({
                    title: 'F ' + data.title,
                    subTitle: data.body,
                    buttons: ['關閉']
                });
                alert_foreground.present();
            };
        })

        this.fcm.onTokenRefresh().subscribe(token => {
            //backend.registerToken(token);
        })

        //解除安裝
        //fcm.unsubscribeFromTopic('developers');
    }

    //#region 檢查更新 Full apk
    checkUpdate() {
        myGlobals.ProgParameters.set('ApkVersion', AppVersion.version);

        let NeedUpdateApk = true;
        const updateUrl = 'http://' + myGlobals.Global_Server + '/Version/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl)
            .then(response => {
                let ErrMsg: string = '';
                switch (response.code) {
                    case 201:   //need update
                        break;
                    case 202:   //No need to update
                        NeedUpdateApk = false;
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
                console.log("Update Status Code: " + response.code);
                myGlobals.ProgParameters.set('NeedUpdateApk', NeedUpdateApk);
            });
    }
    //#endregion

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
