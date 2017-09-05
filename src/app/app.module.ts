//angular, ionic
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Cordova plugins
import { Vibration } from '@ionic-native/vibration';
import { FCM } from '@ionic-native/fcm';
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Camera } from '@ionic-native/camera';

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
        //Pipes
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(SMDRF, {
            activator: 'ripple',
            backButtonText: '返回',
            mode: 'md',
            iconMode: 'md',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            pageTransition: 'ios-transition',
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
        Vibration,
        FCM,
        AppUpdate,
        NFC, Ndef,
        Camera,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
