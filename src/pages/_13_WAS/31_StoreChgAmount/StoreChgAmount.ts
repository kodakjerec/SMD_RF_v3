import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import { http_services } from '../../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_1331_WAS_StoreChgAmount'
})
@Component({
    templateUrl: 'StoreChgAmount.html'
})
export class _1331_WAS_StoreChgAmount {
    constructor(public navCtrl: NavController
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
            , '[WAS].dbo.spactWAS_Line_v2'
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
            this.TotalList.push(value);
        });
    }

    //改量
    readyChangeAMOUNT(item) {
        this.vibration.vibrate(100);
        let alert = this.alertCtrl.create({
            title: '修改訂購量',
            message: '營業所：' + item.SITE_NAME + '<br/>'
            + '代號&nbsp&nbsp&nbsp&nbsp：' + item.SITE_ID + '<br/>'
            + '訂購量：' + item.AMOUNT + '<br/>',
            inputs: [
                {
                    name: 'UPD_AMOUNT',
                    type: 'number',
                    value: item.UPD_AMOUNT,
                    placeholder: ''
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '確定',
                    handler: data => {
                        //送出sql
                        let sql_StepValue = '22';
                        let sql_parameter = this.data.RefValue + ',' + item.SITE_ID + ',' + data.UPD_AMOUNT + ',' + localStorage.getItem('USER_ID');

                        this._http_services.POST(this.DefaultTestServer, 'sp'
                            , '[WAS].dbo.spactWAS_Line_v2'
                            , [{ Name: '@Step', Value: sql_StepValue }
                                , { Name: '@Parameters', Value: sql_parameter }])
                            .then((response) => {
                                if (response != undefined) {
                                    item.UPD_AMOUNT = data.UPD_AMOUNT;
                                }
                            });
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