webpackJsonp([5],{

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintPickingLabelModule", function() { return PrintPickingLabelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PrintPickingLabel__ = __webpack_require__(720);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PrintPickingLabelModule = /** @class */ (function () {
    function PrintPickingLabelModule() {
    }
    PrintPickingLabelModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__PrintPickingLabel__["a" /* _22_PrintPickingLabel */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__PrintPickingLabel__["a" /* _22_PrintPickingLabel */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__PrintPickingLabel__["a" /* _22_PrintPickingLabel */]]
        })
    ], PrintPickingLabelModule);
    return PrintPickingLabelModule;
}());

//# sourceMappingURL=PrintPickingLabel.module.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _22_PrintPickingLabel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ZZ_CommonLib_http_services__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var _22_PrintPickingLabel = /** @class */ (function () {
    function _22_PrintPickingLabel(navCtrl, _http_services, alertCtrl) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        //#region Init
        this.data = {
            choice: 'DAS',
            ScanBarcode: '',
            JOBID: ''
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
    }
    //#endregion
    _22_PrintPickingLabel.prototype.ngOnInit = function () {
        var _this = this;
        this._http_services.POST('', 'sqlcmd', 'select OrderNo=MAX(OrderNo) from DDI.dbo.DDI_WORKSPACE_STATUS with(nolock)', [{}])
            .then(function (response) {
            _this.data.JOBID = response[0].OrderNo;
        });
    };
    ;
    _22_PrintPickingLabel.prototype.search = function () {
        //#region 紀錄資料
        if (this.data.choice == 'DAS') {
            this._http_services.POST('', 'sp', '[md.spDCS_LABEL_DAS]', [
                { Name: '@JOBID', Value: this.data.JOBID },
                { Name: '@PRINTER', Value: "172.20.22.4" },
                { Name: '@BC', Value: this.data.ScanBarcode }
            ])
                .then(function (response) {
                console.log(response);
            });
        }
        else {
            this._http_services.POST('', 'sp', '[md.spDCS_LABEL_SF]', [
                { Name: '@cGUID', Value: this._uuid() },
                { Name: '@cJOB_ID', Value: this.data.JOBID },
                { Name: '@iSEQ', Value: "1" },
                { Name: '@cTYPE', Value: "BOX" },
                { Name: '@cPRINT_SITE', Value: "172.20.22.4" },
                { Name: '@cBARCODE', Value: this.data.ScanBarcode }
            ])
                .then(function (response) {
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
    ;
    _22_PrintPickingLabel.prototype._uuid = function () {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    _22_PrintPickingLabel.prototype.reset = function () {
        this.data.ScanBarcode = '';
        this.scan_Entry.setFocus();
    };
    ;
    _22_PrintPickingLabel.prototype.Totalreset = function () {
        this.data.choice = 'DAS';
        this.data.ScanBarcode = '';
        this.DCSresult = [];
        this.scan_Entry.setFocus();
    };
    ;
    _22_PrintPickingLabel.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '"000000"：全部列印',
            buttons: ['關閉']
        });
        alert.present();
    };
    ;
    //喪失focus
    _22_PrintPickingLabel.prototype.myfocus = function () {
        this.scan_Entry.setFocus();
    };
    ;
    //全選
    _22_PrintPickingLabel.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _22_PrintPickingLabel.prototype.swipeEvent = function (event) {
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
    ], _22_PrintPickingLabel.prototype, "scan_Entry", void 0);
    _22_PrintPickingLabel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_22_PrintPickingLabel\PrintPickingLabel.html"*/'﻿<ion-header>\n\n    <ion-navbar>\n\n        <ion-title (click)="help()">撿貨標籤<button small ion-button outline>HELP</button></ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-item>\n\n            <ion-label>條碼</ion-label>\n\n            <ion-input #scan_Entry id="txb_scan_Entry" type="number"\n\n                       (keyup.enter)="search()"\n\n                       (ionFocus)="selectAll($event)"\n\n                       [(ngModel)]="data.ScanBarcode"></ion-input>\n\n        </ion-item>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="reset()" color="danger" solid class="toolbar-button">\n\n                <ion-icon name="close"></ion-icon>\n\n            </button>\n\n            <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                <ion-icon name="search"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-item>\n\n                <ion-label>批次</ion-label>\n\n                <ion-label>{{data.JOBID}}</ion-label>\n\n            </ion-item>\n\n        </ion-card-header>\n\n        <ion-list radio-group [(ngModel)]="data.choice">\n\n            <ion-list-header>\n\n                選擇模式\n\n            </ion-list-header>\n\n            <ion-item>\n\n                <ion-label>DAS</ion-label>\n\n                <ion-radio checked="true" value="DAS"></ion-radio>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>SF</ion-label>\n\n                <ion-radio value="SF"></ion-radio>\n\n            </ion-item>\n\n        </ion-list>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_22_PrintPickingLabel\PrintPickingLabel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], _22_PrintPickingLabel);
    return _22_PrintPickingLabel;
}());

//# sourceMappingURL=PrintPickingLabel.js.map

/***/ })

});
//# sourceMappingURL=5.js.map