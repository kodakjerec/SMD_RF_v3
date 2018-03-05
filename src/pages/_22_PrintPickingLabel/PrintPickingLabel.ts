import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';

import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_22_PrintPickingLabel',
    segment: '_22_PrintPickingLabel'
})
@Component({
    templateUrl: 'PrintPickingLabel.html'
})

export class _22_PrintPickingLabel {
    constructor(public navCtrl: NavController
        , public _http_services: http_services
        , private alertCtrl: AlertController) {
    }

    //#region Init
    data = {
        choice: 'DAS'
        , ScanBarcode: ''
        , JOBID: ''
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
    //#endregion

	ionViewWillEnter(){
		console.log('refresh ALL js');
	}
	
    ngOnInit() {
        this._http_services.POST('', 'sqlcmd'
            , 'select OrderNo=MAX(OrderNo) from DDI.dbo.DDI_WORKSPACE_STATUS with(nolock)'
            , [{}])
            .then((response) => {
                this.data.JOBID = response[0].OrderNo;
            });
    };

    search() {
        //#region 紀錄資料
        if (this.data.choice == 'DAS') {
            this._http_services.POST('', 'sp'
                , '[md.spDCS_LABEL_DAS]'
                , [
                    { Name: '@JOBID', Value: this.data.JOBID }
                    , { Name: '@PRINTER', Value: "172.20.22.4" }
                    , { Name: '@BC', Value: this.data.ScanBarcode }
                ])
                .then((response) => {
                    console.log(response);
                });
        }
        else {
            this._http_services.POST('', 'sp'
                , '[md.spDCS_LABEL_SF]'
                , [
                    { Name: '@cGUID', Value: this._uuid() }
                    , { Name: '@cJOB_ID', Value: this.data.JOBID }
                    , { Name: '@iSEQ', Value: "1" }
                    , { Name: '@cTYPE', Value: "BOX" }
                    , { Name: '@cPRINT_SITE', Value: "172.20.22.4" }
                    , { Name: '@cBARCODE', Value: this.data.ScanBarcode }
                ])
                .then((response) => {
                    console.log(response);
                });
        }
        //#endregion

        //紀錄掃描資料
        this.DCS_Log.push(this.data.ScanBarcode);

        //準備下一輪掃描
        this.reset();

        this.scan_Entry.setFocus();
    };

    _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

    reset() {
        this.data.ScanBarcode = '';
        this.scan_Entry.setFocus();
    };
    Totalreset() {
        this.data.choice = 'DAS';
        this.data.ScanBarcode = '';

        this.DCSresult = [];
        this.scan_Entry.setFocus();
    };

    help() {
        let alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '"000000"：全部列印',
            buttons: ['關閉']
        });

        alert.present();
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