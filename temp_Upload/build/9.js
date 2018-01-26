webpackJsonp([9],{

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_131_WAS_OrderNoModule", function() { return _131_WAS_OrderNoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OrderNo__ = __webpack_require__(714);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var _131_WAS_OrderNoModule = /** @class */ (function () {
    function _131_WAS_OrderNoModule() {
    }
    _131_WAS_OrderNoModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__OrderNo__["a" /* _131_WAS_OrderNo */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__OrderNo__["a" /* _131_WAS_OrderNo */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__OrderNo__["a" /* _131_WAS_OrderNo */]]
        })
    ], _131_WAS_OrderNoModule);
    return _131_WAS_OrderNoModule;
}());

//# sourceMappingURL=OrderNo.module.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _131_WAS_OrderNo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__ = __webpack_require__(358);
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



var _131_WAS_OrderNo = /** @class */ (function () {
    function _131_WAS_OrderNo(navCtrl, _http_services, toastCtrl, modalCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.vibration = vibration;
        this.data = {
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            WAS_OrderNo: '',
            IsInputEnable: true,
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.DisplayList = [];
        this.DefaultTestServer = '172_31_31_250';
    }
    _131_WAS_OrderNo.prototype.ionViewDidEnter = function () {
        this.BringDisplayList();
    };
    _131_WAS_OrderNo.prototype.ionViewWillEnter = function () {
        this.myFocus();
    };
    _131_WAS_OrderNo.prototype.BringDisplayList = function () {
        var _this = this;
        this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: '00' },
            { Name: '@Parameters', Value: '' }])
            .then(function (response) {
            if (response != undefined) {
                _this.DisplayList = response;
            }
        });
    };
    //重置btn
    _131_WAS_OrderNo.prototype.reset = function () {
        localStorage.setItem('WAS_OrderNo', '');
        this.data.WAS_OrderNo = '';
        this.myFocus();
    };
    ;
    //查詢
    _131_WAS_OrderNo.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;
        ////test
        //this.data.WAS_OrderNo = this.DisplayList[0].ORDER_NO;
        if (this.data.WAS_OrderNo.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_OrderNo = '';
            this.data.IsInputEnable = true;
            return;
        }
        var sql_parameter = this.data.WAS_OrderNo;
        this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: '0' },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            switch (response[0].RT_CODE) {
                case 0:
                    localStorage.setItem('WAS_OrderNo', response[0].RT_MSG);
                    _this.data.WAS_OrderNo = response[0].RT_MSG;
                    _this.toastCtrl.create({
                        message: '驗證成功 ' + response[0].RT_MSG,
                        duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                        position: 'middle'
                    }).present();
                    _this.navCtrl.push('_132_WAS_Item');
                    break;
                default:
                    _this.toastCtrl.create({
                        message: response[0].RT_MSG,
                        duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                        position: 'middle'
                    }).present();
            }
        })
            .then(function (response) {
            _this.data.WAS_OrderNo = '';
            _this.data.IsInputEnable = true;
        });
    };
    //全選
    _131_WAS_OrderNo.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //Focus
    _131_WAS_OrderNo.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry._elementRef.nativeElement.focus();
        }, 300);
    };
    _131_WAS_OrderNo.prototype.myKeylogger = function (event) {
        this.data.WAS_OrderNo = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.WAS_OrderNo);
        if (this.data.WAS_OrderNo.indexOf('ENTER') >= 0) {
            this.data.WAS_OrderNo = this.data.WAS_OrderNo.replace('ENTER', '');
            this.search();
        }
    };
    _131_WAS_OrderNo.prototype.openKeyPad = function () {
        var _this = this;
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */], { Name: '批次', Value: this.data.WAS_OrderNo });
        obj.onDidDismiss(function (data) {
            _this.data.WAS_OrderNo = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
            _this.search();
        });
        obj.present();
    };
    //手勢
    _131_WAS_OrderNo.prototype.swipeEvent = function (event) {
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                break;
            case 4://RIGHT
                this.reset();
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
    ], _131_WAS_OrderNo.prototype, "scan_Entry", void 0);
    _131_WAS_OrderNo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\1_OrderNo\OrderNo.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>WAS_批次</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-2>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">批次</ion-label>\n\n            </ion-col>\n\n            <ion-col col-8>\n\n                <button ion-button outline block\n\n                        [ngClass]="[\'myScanBarcodeUI\']"\n\n                        #scan_Entry\n\n                        (keyup)="myKeylogger($event)"\n\n                        (blur)="myFocus()"\n\n                        (ionFocus)="selectAll($event)"\n\n                        [disabled]="!data.IsInputEnable">\n\n                    {{data.WAS_OrderNo}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="openKeyPad()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="keypad"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid class="mytable">\n\n        <ion-row class="mytable_Head">\n\n            <ion-col col-12>可用批次</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let ListItem of DisplayList" class="mytable_Detail">\n\n            <ion-col col-12> {{ListItem.ORDER_NO}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\1_OrderNo\OrderNo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _131_WAS_OrderNo);
    return _131_WAS_OrderNo;
}());

//# sourceMappingURL=OrderNo.js.map

/***/ })

});
//# sourceMappingURL=9.js.map