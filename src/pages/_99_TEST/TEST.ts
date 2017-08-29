import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';

@IonicPage({
    name: '_99_TEST',
    segment: '_99_TEST'
})
@Component({
    templateUrl: 'TEST.html'
})

export class _99_TEST {
    constructor(public navCtrl: NavController
        , private alertCtrl: AlertController) {
    };

    @ViewChild('scan_Entry') scan_Entry;

    //呼叫小鍵盤
    testEnter() {
        
        let alert_fail = this.alertCtrl.create({
            title: '成功',
            subTitle: '取得ENTER',
            buttons: [{
                text: '關閉',
                handler: () => {

                }
            }]
        });
        alert_fail.present();
    };
}