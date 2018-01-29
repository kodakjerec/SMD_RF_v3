//angular, ionic
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Cordova plugins
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';
import { File } from '@ionic-native/file';
import { CodePush } from '@ionic-native/code-push';

//My Pages
import { SMDRF } from './app.component';
import { UpdateApp } from '../pages/UpdateApp/UpdateApp';
import { _00_Login } from '../pages/_00_Login/Login';
import { LittleCalculatorPage } from '../pages/_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { ListTablePage } from '../pages/_ZZ_CommonLib/ListTable/ListTable';
import { PaperDetailPage } from '../pages/_ZZ_CommonLib/PaperDetail/PaperDetail';
import { myCAMERAPage } from '../pages/_ZZ_CommonLib/myCAMERA/myCAMERA';
import { http_services } from '../pages/_ZZ_CommonLib/http_services';
import { LittleKeyPad } from '../pages/_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';

@NgModule({
    declarations: [
        SMDRF,

        //Pages
        UpdateApp,
        _00_Login,
        LittleCalculatorPage,
        ListTablePage,
        PaperDetailPage,
        myCAMERAPage,
        LittleKeyPad
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
            animate: false,
            pageTransition: 'md-transition',
            tabsPlacement: 'bottom'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        SMDRF,
        UpdateApp,
        _00_Login,
        LittleCalculatorPage,
        ListTablePage,
        PaperDetailPage,
        myCAMERAPage,
        LittleKeyPad
    ],
    providers: [
        StatusBar,
        SplashScreen,
        http_services,
        AppUpdate,
        NFC, Ndef,
        Camera,
        Keyboard,
        Vibration,
        File,
        CodePush,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
