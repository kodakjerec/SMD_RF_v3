import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_131_WASOrderNo',
    segment: '_131_WASOrderNo'
})
@Component({
    templateUrl: 'OrderNo.html'
})
export class _131_WASOrderNo {
    constructor(public navCtrl: NavController
        , public platform: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private keyboard: Keyboard
        , private vibration: Vibration) {

        this.initializeApp();
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewDidEnter() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    }

    data = {
        OrderNo: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.keyboard.onKeyboardShow().subscribe(() => { this.data.IsHideWhenKeyboardOpen = true });
                this.keyboard.onKeyboardHide().subscribe(() => { this.data.IsHideWhenKeyboardOpen = false });
            })
            ;
    }

    //重置btn
    reset() {
        myGlobals.ProgParameters.set('CarNo', '');
        this.data.OrderNo = '';
        

        this.scan_Entry.setFocus();
    };


    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //手勢
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT

                break;
            case 4: //RIGHT
                this.navCtrl.pop();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}