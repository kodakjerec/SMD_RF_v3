import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';

import { LittleCalculatorPage } from '../_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { myCAMERAPage } from '../_ZZ_CommonLib/myCAMERA/myCAMERA';


@IonicPage({
    name: '_99_TEST',
    segment: '_99_TEST'
})
@Component({
    templateUrl: 'TEST.html'
})

export class _99_TEST {
    constructor(public navCtrl: NavController
        , private modalCtrl: ModalController) {
    };

    @ViewChild('scan_Entry') scan_Entry;

    //呼叫小鍵盤
    showCalculator() {
        myGlobals.ProgParameters.set('ListTable_Source', '123');

        let obj = this.modalCtrl.create(LittleCalculatorPage);
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));
        });
        obj.present();
    }

    showCamera() {
        myGlobals.ProgParameters.set('ListTable_Source', {
            FileDescription: '車號：081, PO單：PO17090100001, 呼出碼：123456, 品質：外表不良'+'\n'
        });

        let obj = this.modalCtrl.create(myCAMERAPage);
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));
        });
        obj.present();
    }
}