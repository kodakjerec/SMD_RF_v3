import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, IonicPage } from 'ionic-angular';

import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_23_PhotoGallery',
    segment: '_23_PhotoGallery'
})
@Component({
    templateUrl: 'PhotoGallery.html'
})

export class _23_PhotoGallery {
    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController) {
    }

    //#region Init
    data = {
        choice: 'DAS'
        , ScanBarcode: ''
        , JOBID: ''
    };

    Lists = [];

    @ViewChild('scan_Entry') scan_Entry;
    //#endregion

    ngOnInit() {
        this._http_services.POST('', 'Picture'
            , 'search'
            , [{}])
            .then((response) => {
                console.log(response);
                for (var index in response) {
                    var value = response[index];
                    this.Lists.push({
                        FileName: value.FileName
                        , Description: value.Description
                        , ThumbnailImage: value.ThumbnailImage
                        , CreateTime: value.CreateTime
                    });
                }
            });
    };

    //喪失focus
    myfocus() {
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