import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import { http_services } from '../../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_1332_WAS_StoreChg'
})
@Component({
    templateUrl: 'StoreChg.html'
})
export class _1332_WAS_StoreChg {
    constructor(public navCtrl: NavController
        , public params: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private vibration: Vibration) {

        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    @ViewChild('scan_Entry') scan_Entry;

    ionViewWillEnter() {
        this.BringDisplayList(0);
    }

    data = {
        RefValue: ''
        , InfiniteScrollEnable: true    //啟用無限卷軸
    };

    TotalList = [];
    DefaultTestServer = '172_31_31_250';

    BringDisplayList(startSEQ) {
        let sql_StepValue = '21';
        let sql_parameter = this.data.RefValue + ',' + startSEQ.toString();

        return this._http_services.POST(this.DefaultTestServer, 'sp'
            , '[WAS].dbo.spactWAS_Line'
            , [{ Name: '@Step', Value: sql_StepValue }
                , { Name: '@Parameters', Value: sql_parameter }])
            .then((response) => {
                if (response != undefined) {
                    this.BringDisplayList_Add(response);

                    //檢查特殊情況
                    if (response.length == 0) {
                        this.data.InfiniteScrollEnable = false;
                    }
                    else {
                        this.data.InfiniteScrollEnable = true;
                    }
                }

                return response;
            })
            ;
    }
    //查詢結果匯入TotalList
    BringDisplayList_Add(response) {
        response.forEach((value, index, array) => {
			if(value.UPD_AMOUNT!=null)
				value.AMOUNT=value.UPD_AMOUNT;
            this.TotalList.push(value);
        });
    }

    //變更營業所
    readyChangeAMOUNT(item) {
        this.vibration.vibrate(100);
        let alert = this.alertCtrl.create({
            title: '變更營業所',
            message: '營業所：' + item.SITE_NAME + '<br/>'
            + '代號&nbsp&nbsp&nbsp&nbsp：' + item.SITE_ID + '<br/>'
            + '訂購量：' + item.AMOUNT + '<br/>',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '確定',
                    handler: data => {

                        this.navCtrl.pop().then(() => this.params.get('resolve')(item.SEQ));
                    }
                }
            ]
        });
        alert.present();
    }

    //無限卷軸
    doInfinite(infiniteScroll) {
        if (!this.data.InfiniteScrollEnable) {
            infiniteScroll.complete();
            return;
        }

        let obj = this.TotalList[this.TotalList.length - 1];

        this.BringDisplayList(obj.SEQ + 1)
            .then(response => {
                console.log('InfiniteScroll Complete');
                infiniteScroll.complete();
            });
    }

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