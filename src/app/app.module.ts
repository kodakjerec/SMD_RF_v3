//angular, ionic
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Cordova plugins
import { FCM } from '@ionic-native/fcm';
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';


//My Pages
import { SMDRF } from './app.component';
import { _00_Login } from '../pages/_00_Login/Login';
import { LittleCalculatorPage } from '../pages/_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { ListTablePage } from '../pages/_ZZ_CommonLib/ListTable/ListTable';
import { PaperDetailPage } from '../pages/_ZZ_CommonLib/PaperDetail/PaperDetail';
import { myCAMERAPage } from '../pages/_ZZ_CommonLib/myCAMERA/myCAMERA';
import { http_services } from '../pages/_ZZ_CommonLib/http_services';

@NgModule({
    declarations: [
        SMDRF,

        //Pages
        _00_Login,
        LittleCalculatorPage,
        ListTablePage,
        PaperDetailPage,
        myCAMERAPage,

        //Directives

    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(SMDRF, {
            activator: 'ripple',
            backButtonText: '返回',
            mode: 'md',
            iconMode: 'md',
            pageTransition: 'md-transition',
            tabsPlacement: 'bottom'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        SMDRF,
        _00_Login,
        LittleCalculatorPage,
        ListTablePage,
        PaperDetailPage,
        myCAMERAPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        http_services,
        FCM,
        AppUpdate,
        NFC, Ndef,
        Camera,
        Keyboard,
        Vibration,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
