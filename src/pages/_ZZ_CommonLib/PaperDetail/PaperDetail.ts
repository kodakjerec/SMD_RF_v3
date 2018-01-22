import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import * as myGlobals from '../../../app/Settings';

@Component({
    templateUrl: 'PaperDetail.html'
})
export class PaperDetailPage {
    Lists: [{}];

    constructor(
        public viewCtrl: ViewController,
    ) {
        this.Lists = myGlobals.ProgParameters.get('ListTable_Source');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    //¤â¶Õ
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT
                this.dismiss();
                break;
            case 4: //RIGHT
                this.dismiss();
                break;
            case 8: //UP

                break;
            case 16://DOWN
                break;
        };
    }
}