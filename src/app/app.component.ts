import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';

//Cordova plugins
import { FCM } from '@ionic-native/fcm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//My Pages
import { _00_Login } from '../pages/_00_Login/Login';

@Component({
    templateUrl: 'app.html'
})
export class SMDRF {
    @ViewChild(Nav) nav: Nav;

    //設定root page
    rootPage: any = _00_Login;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform
        , public statusBar: StatusBar
        , public splashScreen: SplashScreen
        , public fcm: FCM
        , private alertCtrl: AlertController) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {
                title: '_00_Login'
                , component: _00_Login
            }
        ];

    }

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser");
            return;
        }
        this.platform.ready()
            .then(() => {
                
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
                //fcm.unsubscribeFromTopic('marketing');
            })
            .then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            })
            ;
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
