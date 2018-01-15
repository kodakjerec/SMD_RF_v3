import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, ToastController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../../components/ion-digit-keyboard';


@IonicPage({
    name: '_TEST_00_myBarcodeUI',
    segment: '_TEST_00_myBarcodeUI'
})
@Component({
    templateUrl: 'myBarcodeUI.html'
})
export class _TEST_00_myBarcodeUI{
    log = '';
    data = { ScanBarcode: '' };
    scan_Entry = document.getElementById('scan_Entry');

    constructor(
        public viewCtrl: ViewController
        , params: NavParams
        , private vibration: Vibration
        , private toastCtrl: ToastController
    ) {

        setTimeout(() => {
            this.scan_Entry = document.getElementById('scan_Entry');
            this.mysetFocus();
        }, 500);
    }

    search() {
        this.vibration.vibrate(100);
        let toast = this.toastCtrl.create({
            message: '成功!資料=>' + this.data.ScanBarcode,
            duration: myGlobals.Set_timeout,
            position: 'middle'
        });
        toast.present()
            .then(response => {
                this.reset();
            })
    }
    reset() {
        this.data.ScanBarcode = '';
    }
    mysetFocus() {
        this.scan_Entry.focus();
    }
    myKeylogger(event) {
        let keyValue = myGlobals.myClass.keyCodeToValue(event.keyCode);
        switch (keyValue) {
            case 'ENTER':
                this.search();
                break;
            default:
                this.data.ScanBarcode += keyValue;
                break;
        }
        this.log += keyValue + "\n";
    }

    //#region ionic-digital-keyboard
    @ViewChild(IonDigitKeyboardCmp) ionkeyboard;

    public keyboardSettings: IonDigitKeyboardOptions = {
        align: 'center',
        width: '80%',
        visible: false,
        leftActionOptions: {
            text:'C',
            fontSize: '1.4em'
        },
        rightActionOptions: {
            iconName: 'ios-checkmark-circle-outline',
            fontSize: '1.3em'
        },
        roundButtons: false,
        showLetters: false,
        swipeToHide: true,
        // Available themes: IonDigitKeyboard.themes
        theme: 'dark'
    };
    public showKeyboard() {
        this.ionkeyboard.show();
    }

    // Event way
    public ionkeyboard_numberClick(key: number) {
        this.vibration.vibrate(100);
        this.data.ScanBarcode += key.toString();
    }
    public ionkeyboard_clear() {
        this.reset();
    }
    public ionkeyboard_hideKeyboard() {
        this.ionkeyboard.hide();
        this.search();
    }
    //#endregion
}