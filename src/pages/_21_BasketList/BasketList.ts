import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, IonicPage } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import { http_services } from '../_ZZ_CommonLib/http_services';
import { PipesModule } from '../../pipes/pipes.module';

@IonicPage({
    name: '_21_BasketList',
    segment: '_21_BasketList'
})
@Component({
    templateUrl: 'BasketList.html'
})

export class _21_BasketList {
    constructor(public navCtrl: NavController
        , plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private pipes: PipesModule
        , private vibration: Vibration) {
    }

    Lists: [{ Name: string, Value: any }];
    data = {
        ScanBarcode: ''
        , ShowStoreId: ''
        , ShowStoreName: ''
        , ShowBackgroundColor: false
        , ShowBackgroundColor_header: ''
        , DCS_log_show: true
        , DCS_log_show_btnName: '顯示掃描log'
    };
    //掃描的紀錄
    //barcode   條碼
    //Check     驗證結果 OK,NO,CLEAR
    //scanTime  掃描時間
    DCS_Log = []

    //合法的紀錄
    //ChuteId   滑道
    //Duplex    疊箱
    //StoreId   店號
    //ItemCode  呼出碼
    //Amount    數量
    DCSresult = []

    @ViewChild('scan_Entry') scan_Entry;

    reset() {
        this.data.ScanBarcode = '';
        this.scan_Entry.setFocus();
    };
    Totalreset() {
        this.data.ScanBarcode = '';
        this.data.ShowStoreId = '';
        this.data.ShowStoreName = '';
        this.DCSresult = [];
        this.scan_Entry.setFocus();
    };

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //開啟Help
    help = function () {
        let alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '"0000"：送出籃明細，印標籤，並且清除目前資料<br />"1111"：清除目前資料<br />同店號的條碼才能彙總，若要重來請清除目前資料<br />',
            buttons: ['關閉']
        });
        alert.present();
    };

    //變更log區塊高度
    showDCS_log() {
        if (this.data.DCS_log_show) {
            this.data.DCS_log_show = false;
            this.data.DCS_log_show_btnName = "不顯示掃描log";
        }
        else {
            this.data.DCS_log_show = true;
            this.data.DCS_log_show_btnName = "顯示掃描log";
        }
    }

    //查詢條碼
    search() {
        this.vibration.vibrate(100);
        var ErrMsg = '';
        var scanData = {
            barcode: this.data.ScanBarcode
            , Check: ''
            , scanTime: new Date()
        };

        //#region 紀錄資料

        switch (scanData.barcode) {
            case '0000'://送出籃明細+RESET
                var obj = '';

                this.DCSresult.forEach(value => {
                    obj += value.barcode + ',';
                });

                this._http_services.POST('172_31_31_250', 'sp'
                    , 'spactDCS_BASKET'
                    , [{ Name: '@Step', Value: '0' }
                        , { Name: '@GUIDMessage', Value: obj }])
                    .subscribe((response) => {
                        var result = response[0];
                        var successPageId = {};
                        switch (result.RT_CODE) {
                            case '0':
                                //記錄到log
                                successPageId = {
                                    barcode: result.RT_MSG
                                    , Check: '提交單號'
                                    , scanTime: new Date()
                                };
                                this.pushLog(successPageId);
                                break;
                            default:
                                //記錄到log
                                successPageId = {
                                    barcode: result.RT_MSG
                                    , Check: '提交失敗'
                                    , scanTime: new Date()
                                };
                                this.pushLog(successPageId);
                        }
                    });
                scanData.Check = 'V提交';
                this.Totalreset();
                break;
            case '1111'://RESET
                scanData.Check = '清除';
                this.Totalreset();
                break;
            default:

                if (scanData.barcode.length == 18) {
                    var SuccessData = {
                        barcode: scanData.barcode
                        , ChuteId: scanData.barcode.substring(0, 3)
                        , Duplex: scanData.barcode.substring(3, 3)
                        , StoreId: scanData.barcode.substring(4, 10)
                        , ItemCode: scanData.barcode.substring(10, 16)
                        , Amount: scanData.barcode.substring(16, 18)
                    };

                    //#region 檢查店號是否相同
                    if (this.DCSresult.length > 0) {
                        if (this.data.ShowStoreId != SuccessData.StoreId) {
                            ErrMsg = 'X店不同';
                        }
                    }
                    else {
                        //第一筆不檢查
                        this.data.ShowStoreId = SuccessData.StoreId;

                        //帶入店號
                        this._http_services.POST('172_31_31_250', 'sp'
                            , 'spactDCS_BASKET'
                            , [{ Name: '@Step', Value: '1' }
                                , { Name: '@GUIDMessage', Value: SuccessData.StoreId }])
                            .subscribe((response) => {
                                if (response != undefined) {
                                    var result = response[0];

                                    switch (result.RT_CODE) {
                                        case 0:
                                            this.data.ShowStoreName = result.RT_MSG;
                                            break;
                                        default:
                                            let alert = this.alertCtrl.create({
                                                title: '錯誤代號：' + result.RT_CODE,
                                                subTitle: result.RT_MSG,
                                                buttons: ['關閉']
                                            });
                                            alert.present();
                                    }
                                }
                                this.scan_Entry.setFocus();
                            });
                    }
                    //#endregion

                    //#region 檢查條碼是否重複刷入
                    this.DCSresult.forEach(obj => {
                        if (obj.barcode == SuccessData.barcode) {
                            ErrMsg = 'X條碼重複';
                        }
                    });
                    //#endregion
                }
                else {
                    ErrMsg = 'X';
                }

                if (ErrMsg == '') {
                    //合法, 輸出至暫存檔
                    this.DCSresult.push(SuccessData);
                    scanData.Check = 'V';
                }
                else {
                    scanData.Check = ErrMsg;
                }
                break;
        }

        //#endregion

        //紀錄掃描資料
        this.pushLog(scanData);

        //準備下一輪掃描
        this.reset();

        if (ErrMsg != '') {
            this.data.ShowBackgroundColor = true;
            this.data.ShowBackgroundColor_header = 'danger';
            this.vibration.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200]);
        }
        else {
            this.data.ShowBackgroundColor = false;
            this.data.ShowBackgroundColor_header = '';
        }
        this.scan_Entry.setFocus();
    }
    //喪失focus
    myfocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    };

    //塞入log
    pushLog(scanData: any) {
        this.DCS_Log.push(scanData);
        this.pipes.myOrderByPipe.transform(this.DCS_Log, { property: 'scanTime', direction: -1 });  //重新排序
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