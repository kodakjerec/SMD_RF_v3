import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

import { SMDRF } from './app.component';
import { _00_Login } from '../pages/_00_Login/Login';

import { LittleCalculatorPage } from '../pages/_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { ListTablePage } from '../pages/_ZZ_CommonLib/ListTable/ListTable';
import { PaperDetailPage } from '../pages/_ZZ_CommonLib/PaperDetail/PaperDetail';
import { http_services } from '../pages/_ZZ_CommonLib/http_services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        SMDRF,

        //Pages
        _00_Login,
        LittleCalculatorPage,
        ListTablePage,
        PaperDetailPage,
        //Pipes
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(SMDRF, {
            activator: 'ripple',
            backButtonText: '返回',
            mode: 'ios',
            iconMode: 'ios',
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
    ],
    providers: [
        StatusBar,
        SplashScreen,
        http_services,
        Vibration,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
