import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';

@Component({
    templateUrl: 'LittleKeyPad.html'
})
export class LittleKeyPad {
    log = '';
    data = { Name: '條碼', ScanBarcode: '123' };

    @ViewChild('scan_Entry') scan_Entry;

    constructor(
        public viewCtrl: ViewController
        , params: NavParams
        , private vibration: Vibration
    ) {
        this.data.Name = params.get('Name');
        this.data.ScanBarcode = params.get('Value');
    }

    search() {
        myGlobals.ProgParameters.set('ListTable_answer', this.data.ScanBarcode);
        this.viewCtrl.dismiss();
    }
    reset() {
        this.data.ScanBarcode = '';
    }
    click(word) {
        this.vibration.vibrate(100);
        switch (word) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                this.data.ScanBarcode += word; break;
            case 'DEL':
                this.data.ScanBarcode = this.data.ScanBarcode.substr(0, this.data.ScanBarcode.length - 1);
        }
    }
}