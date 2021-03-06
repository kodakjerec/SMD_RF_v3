﻿import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';

import { LittleCalculatorPage } from '../_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { myCAMERAPage } from '../_ZZ_CommonLib/myCAMERA/myCAMERA';
import { LittleKeyPad } from '../_ZZ_CommonLib/LittleKeyPad/LittleKeyPad';


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
        localStorage.setItem('USER_ID', '123456');
        localStorage.setItem('BLOCK_NAME', '1樓撿貨區');
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
            FileDescription: '車號：072\n'
            + 'PO單：PO170826000090\n'
            + 'PO_ID：ID170828000049\n'
            + '呼出碼：211566\n'
            + 'HO_ID：1170726461142\n'
            + 'LOT_ID：2170828000068\n'
            + '品質：不良\n'
            , PaperNo: 'PO170826000090'
        });

        let obj = this.modalCtrl.create(myCAMERAPage);
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));
        });
        obj.present();
    }

    gallery() {
        this.navCtrl.push('_24_PhotoGallery');
    }

    myBarcodeUI() {
        let obj = this.modalCtrl.create(LittleKeyPad, { Name: '條碼', Value: '456' });
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));
        });
        obj.present();
    }

    RFWAS() {
        this.navCtrl.push('_131_WAS_OrderNo');
    }
}