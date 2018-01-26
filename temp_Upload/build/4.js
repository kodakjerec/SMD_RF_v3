webpackJsonp([4],{

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintLogisticLabelModule", function() { return PrintLogisticLabelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PrintLogisticLabel__ = __webpack_require__(721);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PrintLogisticLabelModule = /** @class */ (function () {
    function PrintLogisticLabelModule() {
    }
    PrintLogisticLabelModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__PrintLogisticLabel__["a" /* _23_PrintLogisticLabel */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__PrintLogisticLabel__["a" /* _23_PrintLogisticLabel */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__PrintLogisticLabel__["a" /* _23_PrintLogisticLabel */]]
        })
    ], PrintLogisticLabelModule);
    return PrintLogisticLabelModule;
}());

//# sourceMappingURL=PrintLogisticLabel.module.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _23_PrintLogisticLabel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
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



var _23_PrintLogisticLabel = /** @class */ (function () {
    function _23_PrintLogisticLabel(navCtrl, _http_services, alertCtrl, toastCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.vibration = vibration;
        //#region Init
        this.data = {
            ScanBarcode: ''
        };
        this.data2 = {
            Barcode: '',
            Shop: '',
            Qty: '',
            IP_Qty: '',
            SUP_Qty: ''
        };
    }
    //#endregion
    _23_PrintLogisticLabel.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        //#region Check error
        var ErrMsg = '';
        if (this.data.ScanBarcode == '') {
            ErrMsg = '請輸入物流標';
        }
        if (ErrMsg != '') {
            var toast = this.toastCtrl.create({
                message: ErrMsg,
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'bottom'
            });
            toast.present();
            return;
        }
        //#endregion
        var parameters = [];
        if (this.data.ScanBarcode != '')
            parameters.push({ Name: '@CODE', Value: this.data.ScanBarcode });
        this._http_services.POST('', 'sp', '[md.spDCS_LABEL_SORTER]', parameters)
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case '0':
                        var toast = _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'bottom'
                        });
                        toast.present();
                        break;
                    default:
                        var alert_1 = _this.alertCtrl.create({
                            title: '錯誤' + response[0].RT_CODE,
                            subTitle: response[0].RT_MSG,
                            buttons: ['關閉']
                        });
                        alert_1.present();
                        break;
                }
            }
        });
        //準備下一輪掃描
        this.reset();
        this.myfocus();
    };
    ;
    _23_PrintLogisticLabel.prototype.search2 = function (Mode) {
        var _this = this;
        switch (Mode) {
            case 0:
                this.txb_search_1.setFocus();
                return;
            case 1:
                this.txb_search_2.setFocus();
                return;
            case 2:
                this.txb_search_3.setFocus();
                return;
            case 3:
                this.txb_search_4.setFocus();
                return;
            case 4:
                break;
        }
        this.vibration.vibrate(100);
        //#region Check error
        var ErrMsg = '';
        if (this.data2.Barcode == '') {
            ErrMsg = '請輸入呼出碼';
        }
        if (this.data2.Shop != '') {
            if (this.data2.Qty == '') {
                ErrMsg = '請輸入數量(已指定店鋪)';
            }
        }
        if (ErrMsg != '') {
            var toast = this.toastCtrl.create({
                message: ErrMsg,
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'bottom'
            });
            toast.present();
            return;
        }
        //#endregion
        //add parameter
        var parameters = [];
        if (this.data2.Barcode != '')
            parameters.push({ Name: '@ITEM_ID', Value: this.data2.Barcode });
        if (this.data2.Shop != '')
            parameters.push({ Name: '@SITE_ID', Value: this.data2.Shop });
        if (this.data2.Qty != '')
            parameters.push({ Name: '@QTY', Value: this.data2.Qty });
        if (this.data2.IP_Qty != '')
            parameters.push({ Name: '@IP_QTY', Value: this.data2.IP_Qty });
        if (this.data2.SUP_Qty != '')
            parameters.push({ Name: '@SUP_QTY', Value: this.data2.SUP_Qty });
        this._http_services.POST('', 'sp', '[md.spDCS_LABEL_SORTER]', parameters)
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case '0':
                        var toast = _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'bottom'
                        });
                        toast.present();
                        break;
                    default:
                        var alert_2 = _this.alertCtrl.create({
                            title: '錯誤' + response[0].RT_CODE,
                            subTitle: response[0].RT_MSG,
                            buttons: [{
                                    text: '關閉',
                                    handler: function () {
                                        _this.myfocus2();
                                    }
                                }]
                        });
                        alert_2.present();
                        break;
                }
            }
        });
        //準備下一輪掃描
        this.reset();
        this.myfocus2();
    };
    ;
    _23_PrintLogisticLabel.prototype.reset = function () {
        this.data.ScanBarcode = '';
        this.data2.Barcode = '';
        this.data2.Shop = '';
        this.data2.Qty = '';
        this.data2.IP_Qty = '';
        this.data2.SUP_Qty = '';
    };
    ;
    _23_PrintLogisticLabel.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 輸入物流標，產生指定內容<br/>'
                + '2. 輸入指定內容：滑道(3)+疊箱(1)+店鋪(6)+批號(6)+數量(2)',
            buttons: ['關閉']
        });
        alert.present();
    };
    ;
    _23_PrintLogisticLabel.prototype.help2 = function () {
        var alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 呼出碼一定要輸入<br/>'
                + '2. 不指定店鋪，會印出所有店鋪標籤<br/>'
                + '3.   指定店鋪一定要輸入數量<br/>'
                + '4. 不指定入數，會印出系統預設入數:6',
            buttons: ['關閉']
        });
        alert.present();
    };
    ;
    //喪失focus
    _23_PrintLogisticLabel.prototype.myfocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 150);
    };
    ;
    _23_PrintLogisticLabel.prototype.myfocus2 = function () {
        var _this = this;
        setTimeout(function () {
            _this.txb_search_0.setFocus();
        }, 150);
    };
    ;
    //全選
    _23_PrintLogisticLabel.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _23_PrintLogisticLabel.prototype.swipeEvent = function (event) {
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
    ], _23_PrintLogisticLabel.prototype, "scan_Entry", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('txb_search_0'),
        __metadata("design:type", Object)
    ], _23_PrintLogisticLabel.prototype, "txb_search_0", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('txb_search_1'),
        __metadata("design:type", Object)
    ], _23_PrintLogisticLabel.prototype, "txb_search_1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('txb_search_2'),
        __metadata("design:type", Object)
    ], _23_PrintLogisticLabel.prototype, "txb_search_2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('txb_search_3'),
        __metadata("design:type", Object)
    ], _23_PrintLogisticLabel.prototype, "txb_search_3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('txb_search_4'),
        __metadata("design:type", Object)
    ], _23_PrintLogisticLabel.prototype, "txb_search_4", void 0);
    _23_PrintLogisticLabel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_23_PrintLogisticLabel\PrintLogisticLabel.html"*/'﻿<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>物流標籤列印</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-card-header (click)="help()">\n\n            從 物流標籤 補印<button small ion-button outline>HELP</button>\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <ion-grid>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>*物流標</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #scan_Entry id="txb_scan_Entry" type="number"\n\n                                   (keyup.enter)="search()"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   [(ngModel)]="data.ScanBarcode"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col>\n\n                        <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                            <ion-icon name="print"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header (click)="help2()">\n\n            指定 詳細內容 補印<button small ion-button outline>HELP</button>\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <ion-grid>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>*呼出碼</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #txb_search_0 id="txb_scan_Entry2" type="number"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   (keyup.enter)="search2(0)"\n\n                                   [(ngModel)]="data2.Barcode"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>店鋪代號</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #txb_search_1 type="number"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   (keyup.enter)="search2(1)"\n\n                                   [(ngModel)]="data2.Shop"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>數量</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #txb_search_2 type="number"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   (keyup.enter)="search2(2)"\n\n                                   [(ngModel)]="data2.Qty"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>入數</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #txb_search_3 type="number"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   (keyup.enter)="search2(3)"\n\n                                   [(ngModel)]="data2.IP_Qty"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <ion-label>廠商入數</ion-label>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <ion-input #txb_search_4 type="number"\n\n                                   (ionFocus)="selectAll($event)"\n\n                                   (keyup.enter)="search2(4)"\n\n                                   [(ngModel)]="data2.SUP_Qty"></ion-input>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col>\n\n                        <button ion-button (click)="search2(4)" color="secondary" solid class="toolbar-button">\n\n                            <ion-icon name="print"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_23_PrintLogisticLabel\PrintLogisticLabel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _23_PrintLogisticLabel);
    return _23_PrintLogisticLabel;
}());

//# sourceMappingURL=PrintLogisticLabel.js.map

/***/ })

});
//# sourceMappingURL=4.js.map