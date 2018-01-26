webpackJsonp([0],{

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketListModule", function() { return BasketListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BasketList__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BasketListModule = /** @class */ (function () {
    function BasketListModule() {
    }
    BasketListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__BasketList__["a" /* _21_BasketList */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__BasketList__["a" /* _21_BasketList */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__BasketList__["a" /* _21_BasketList */]]
        })
    ], BasketListModule);
    return BasketListModule;
}());

//# sourceMappingURL=BasketList.module.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BasketList_pipe__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SearchPipe__ = __webpack_require__(706);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Pipes


var PipesModule = /** @class */ (function () {
    function PipesModule() {
        this.myOrderByPipe = new __WEBPACK_IMPORTED_MODULE_1__BasketList_pipe__["a" /* OrderByPipe */]();
        this.mySearchPipe = new __WEBPACK_IMPORTED_MODULE_2__SearchPipe__["a" /* SearchPipe */]();
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__BasketList_pipe__["a" /* OrderByPipe */],
                __WEBPACK_IMPORTED_MODULE_2__SearchPipe__["a" /* SearchPipe */]
            ],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__BasketList_pipe__["a" /* OrderByPipe */],
                __WEBPACK_IMPORTED_MODULE_2__SearchPipe__["a" /* SearchPipe */]
            ]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//排序
/*
    sample:     transform(this.DCS_Log, { property: 'scanTime', direction: -1 });
    HowToUse:   transform( Array[], {property: string, direction: boolean});
    Inputs:     property: ColumnName
                direction: 1:Ascending -1:Descending
                Array[]: You want to sort
*/

var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (records, args) {
        return records.sort(function (a, b) {
            if (a[args.property] < b[args.property]) {
                return -1 * args.direction;
            }
            else if (a[args.property] > b[args.property]) {
                return 1 * args.direction;
            }
            else {
                return 0;
            }
        });
    };
    ;
    OrderByPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'orderBy'
        })
    ], OrderByPipe);
    return OrderByPipe;
}());

//# sourceMappingURL=BasketList_pipe.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//排序
/*
    sample:     transform(this.DCS_Log, { property: 'scanTime', direction: -1 });
    HowToUse:   transform( Array[], {property: string, direction: boolean});
    Inputs:     property: ColumnName
                direction: 1:Ascending -1:Descending
                Array[]: You want to sort
*/

var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (records, args) {
        if (!records || !args)
            return records;
        return records.filter(function (record) { return record[args.property].indexOf(args.keyword) !== -1; });
    };
    ;
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'myfilter'
        })
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=SearchPipe.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _21_BasketList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Cordova

//My Pages




var _21_BasketList = /** @class */ (function () {
    function _21_BasketList(navCtrl, plt, navParams, _http_services, alertCtrl, modalCtrl, pipes, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.pipes = pipes;
        this.vibration = vibration;
        this.data = {
            ScanBarcode: '',
            ShowStoreId: '',
            ShowStoreName: '',
            ShowBackgroundColor: false,
            ShowBackgroundColor_header: '',
            DCS_log_show: true,
            DCS_log_show_btnName: '顯示掃描log'
        };
        //掃描的紀錄
        //barcode   條碼
        //Check     驗證結果 OK,NO,CLEAR
        //scanTime  掃描時間
        this.DCS_Log = [];
        //合法的紀錄
        //ChuteId   滑道
        //Duplex    疊箱
        //StoreId   店號
        //ItemCode  呼出碼
        //Amount    數量
        this.DCSresult = [];
        //開啟Help
        this.help = function () {
            var alert = this.alertCtrl.create({
                title: '使用說明',
                subTitle: '"0000"：送出籃明細，印標籤，並且清除目前資料<br />"1111"：清除目前資料<br />同店號的條碼才能彙總，若要重來請清除目前資料<br />',
                buttons: ['關閉']
            });
            alert.present();
        };
    }
    _21_BasketList.prototype.ionViewWillEnter = function () {
        this.myFocus();
    };
    _21_BasketList.prototype.reset = function () {
        this.data.ScanBarcode = '';
        this.myFocus();
    };
    ;
    _21_BasketList.prototype.Totalreset = function () {
        this.data.ScanBarcode = '';
        this.data.ShowStoreId = '';
        this.data.ShowStoreName = '';
        this.DCSresult = [];
        this.myFocus();
    };
    ;
    //變更log區塊高度
    _21_BasketList.prototype.showDCS_log = function () {
        if (this.data.DCS_log_show) {
            this.data.DCS_log_show = false;
            this.data.DCS_log_show_btnName = "不顯示掃描log";
        }
        else {
            this.data.DCS_log_show = true;
            this.data.DCS_log_show_btnName = "顯示掃描log";
        }
    };
    //塞入log
    _21_BasketList.prototype.pushLog = function (scanData) {
        this.DCS_Log.push(scanData);
        this.pipes.myOrderByPipe.transform(this.DCS_Log, { property: 'scanTime', direction: -1 }); //重新排序
    };
    //查詢條碼
    _21_BasketList.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        var ErrMsg = '';
        var scanData = {
            barcode: this.data.ScanBarcode,
            Check: '',
            scanTime: new Date()
        };
        //#region 紀錄資料
        switch (scanData.barcode) {
            case '0000'://送出籃明細+RESET
                var obj = '';
                this.DCSresult.forEach(function (value) {
                    obj += value.barcode + ',';
                });
                this._http_services.POST('172_31_31_250', 'sp', 'spactDCS_BASKET', [{ Name: '@Step', Value: '0' },
                    { Name: '@GUIDMessage', Value: obj }])
                    .subscribe(function (response) {
                    var result = response[0];
                    var successPageId = {};
                    switch (result.RT_CODE) {
                        case '0':
                            //記錄到log
                            successPageId = {
                                barcode: result.RT_MSG,
                                Check: '提交單號',
                                scanTime: new Date()
                            };
                            _this.pushLog(successPageId);
                            break;
                        default:
                            //記錄到log
                            successPageId = {
                                barcode: result.RT_MSG,
                                Check: '提交失敗',
                                scanTime: new Date()
                            };
                            _this.pushLog(successPageId);
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
                        barcode: scanData.barcode,
                        ChuteId: scanData.barcode.substring(0, 3),
                        Duplex: scanData.barcode.substring(3, 3),
                        StoreId: scanData.barcode.substring(4, 10),
                        ItemCode: scanData.barcode.substring(10, 16),
                        Amount: scanData.barcode.substring(16, 18)
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
                        this._http_services.POST('172_31_31_250', 'sp', 'spactDCS_BASKET', [{ Name: '@Step', Value: '1' },
                            { Name: '@GUIDMessage', Value: SuccessData.StoreId }])
                            .subscribe(function (response) {
                            if (response != '') {
                                var result = response[0];
                                switch (result.RT_CODE) {
                                    case 0:
                                        _this.data.ShowStoreName = result.RT_MSG;
                                        break;
                                    default:
                                        var alert_1 = _this.alertCtrl.create({
                                            title: '錯誤代號：' + result.RT_CODE,
                                            subTitle: result.RT_MSG,
                                            buttons: ['關閉']
                                        });
                                        alert_1.present();
                                }
                            }
                        });
                    }
                    //#endregion
                    //#region 檢查條碼是否重複刷入
                    this.DCSresult.forEach(function (obj) {
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
        if (ErrMsg != '') {
            this.data.ShowBackgroundColor = true;
            this.data.ShowBackgroundColor_header = 'danger';
            this.vibration.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200]);
        }
        else {
            this.data.ShowBackgroundColor = false;
            this.data.ShowBackgroundColor_header = '';
        }
        //準備下一輪掃描
        this.reset();
    };
    //全選
    _21_BasketList.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //Focus
    _21_BasketList.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry._elementRef.nativeElement.focus();
        }, 300);
    };
    _21_BasketList.prototype.myKeylogger = function (event) {
        this.data.ScanBarcode = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.ScanBarcode);
        if (this.data.ScanBarcode.indexOf('ENTER') >= 0) {
            this.data.ScanBarcode = this.data.ScanBarcode.replace('ENTER', '');
            this.search();
        }
    };
    _21_BasketList.prototype.openKeyPad = function () {
        var _this = this;
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */], { Name: '批次', Value: this.data.ScanBarcode });
        obj.onDidDismiss(function (data) {
            _this.data.ScanBarcode = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
            _this.search();
        });
        obj.present();
    };
    //手勢
    _21_BasketList.prototype.swipeEvent = function (event) {
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                break;
            case 4://RIGHT
                this.navCtrl.pop();
                break;
            case 8://UP
                break;
            case 16://DOWN
                break;
        }
        ;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], _21_BasketList.prototype, "scan_Entry", void 0);
    _21_BasketList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_21_BasketList\BasketList.html"*/'﻿<ion-header>\n\n    <ion-navbar color="{{data.ShowBackgroundColor_header}}">\n\n        <ion-title (click)="help()">籃明細<button small ion-button outline>HELP</button></ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row [ngClass]="{\'toolbar-background_danger\':data.ShowBackgroundColor}">\n\n            <ion-col col-2>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">條碼</ion-label>\n\n            </ion-col>\n\n            <ion-col col-8>\n\n                <button ion-button outline block\n\n                        [ngClass]="[\'myScanBarcodeUI\']"\n\n                        #scan_Entry\n\n                        (keyup)="myKeylogger($event)"\n\n                        (blur)="myFocus()"\n\n                        (ionFocus)="selectAll($event)">\n\n                    {{data.ScanBarcode}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="openKeyPad()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="keypad"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)" [ngClass]="{\'toolbar-background_danger\':data.ShowBackgroundColor}">\n\n    <ion-grid class="mytable">\n\n        <ion-row style="font-size:xx-large">\n\n            <ion-col>{{data.ShowStoreId}}</ion-col>\n\n            <ion-col>{{data.ShowStoreName}}</ion-col>\n\n        </ion-row>\n\n        <ion-row class="mytable_Head">\n\n            <ion-col>滑道</ion-col>\n\n            <ion-col>店號</ion-col>\n\n            <ion-col>呼出碼</ion-col>\n\n            <ion-col>數量</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let s of DCSresult" class="mytable_Detail">\n\n            <ion-col> {{s.ChuteId}}</ion-col>\n\n            <ion-col> {{s.StoreId}}</ion-col>\n\n            <ion-col> {{s.ItemCode}}</ion-col>\n\n            <ion-col> {{s.Amount}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n    <button ion-button (click)="showDCS_log()" full outline>\n\n        {{data.DCS_log_show_btnName}}\n\n    </button>\n\n    <div id="DCS_log" [hidden]="data.DCS_log_show">\n\n        <ion-grid>\n\n            <ion-row class="mytable_Head">\n\n                <ion-col col-6>條碼</ion-col>\n\n                <ion-col col-3>動作</ion-col>\n\n                <ion-col col-3>掃描時間</ion-col>\n\n            </ion-row>\n\n            <ion-row *ngFor="let s of DCS_Log" class="mytable_Detail">\n\n                <ion-col col-6>[{{s.barcode}}]</ion-col>\n\n                <ion-col col-3>{{s.Check}}</ion-col>\n\n                <ion-col col-3>{{s.scanTime | date:\'HH:mm:ss\'}}</ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_21_BasketList\BasketList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _21_BasketList);
    return _21_BasketList;
}());

//# sourceMappingURL=BasketList.js.map

/***/ })

});
//# sourceMappingURL=0.js.map