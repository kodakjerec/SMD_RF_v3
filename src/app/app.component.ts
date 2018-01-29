import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

//Cordova plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//My Pages
import { UpdateApp } from '../pages/UpdateApp/UpdateApp';

@Component({
    selector: 'SMDRF',
    templateUrl: 'app.html'
})
export class SMDRF {
    @ViewChild(Nav) nav: Nav;
    //設定root page
    rootPage: any = UpdateApp;

    pages: Array<{ title: string, component: any }>;
    messageText: string;

    constructor(public platform: Platform
        , public statusBar: StatusBar
        , public splashScreen: SplashScreen
    ) {
        this.statusBar.hide();
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {
                title: 'UpdateApp'
                , component: UpdateApp
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
