import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';

@Component({
    templateUrl: 'ListTable.html'
})
export class ListTablePage {
    Lists: [{}];

    constructor(
        public viewCtrl: ViewController
        , params: NavParams
        , private vibration: Vibration) {
        this.Lists = myGlobals.ProgParameters.get('ListTable_Source');
    }

    choose(item) {
        this.vibration.vibrate(100);
        if (item == '')
            myGlobals.ProgParameters.set('ListTable_answer', { Name: '', Value: '' });
        else
            myGlobals.ProgParameters.set('ListTable_answer', item);
        this.viewCtrl.dismiss();
    }

    //¤â¶Õ
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT
                this.choose(this.Lists[0]);
                break;
            case 4: //RIGHT
                this.choose(this.Lists[0]);
                break;
            case 8: //UP

                break;
            case 16://DOWN
                break;
        };
    }
}