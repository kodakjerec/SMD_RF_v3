import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';

//Cordova plugins
import { FCM } from '@ionic-native/fcm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//My Pages
import { _00_Login } from '../pages/_00_Login/Login';

@Component({
    selector: 'SMDRF',
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
        , private alertCtrl: AlertController
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

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
