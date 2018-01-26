webpackJsonp([12],{

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PaperNo__ = __webpack_require__(711);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__PaperNo__["a" /* _122_PaperNo */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__PaperNo__["a" /* _122_PaperNo */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__PaperNo__["a" /* _122_PaperNo */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=PaperNo.module.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _122_PaperNo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ZZ_CommonLib_PaperDetail_PaperDetail__ = __webpack_require__(360);
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




var _122_PaperNo = /** @class */ (function () {
    function _122_PaperNo(navCtrl, _http_services, modalCtrl, toastCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.vibration = vibration;
        this.data = {
            CarNo: localStorage.getItem('CarNo'),
            PaperNo: '',
            PaperNo_ID: '',
            IsDisabled: true,
            USER_ID: localStorage.getItem('USER_ID'),
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.result = {};
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["h" /* loginCheck */]();
    }
    _122_PaperNo.prototype.ionViewDidEnter = function () {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    };
    //重置btn
    _122_PaperNo.prototype.reset = function () {
        localStorage.setItem('PaperNo', '');
        localStorage.setItem('PaperNo_ID', '');
        this.data.PaperNo_ID = '';
        this.result = {};
        this.data.IsDisabled = true;
        this.myFocus();
    };
    ;
    //#region 查詢報到牌btn
    _122_PaperNo.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        if (this.data.PaperNo == '') {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            return;
        }
        this.reset();
        this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [
            { Name: '@JOB_ID', Value: '3' },
            { Name: '@REG_ID', Value: this.data.CarNo },
            { Name: '@ID', Value: this.data.PaperNo },
            { Name: '@USER_NAME', Value: this.data.USER_ID }
        ])
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case -1:
                        //Multi variables, choose one
                        var Lists = [];
                        for (var index in response) {
                            var value = response[index];
                            Lists.push({ Name: value.RT_MSG, Value: value.PO_ID });
                        }
                        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', Lists);
                        var obj = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__["a" /* ListTablePage */]);
                        obj.onDidDismiss(function (data) {
                            _this.data.PaperNo = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer').Value;
                            _this.search();
                            return;
                        });
                        obj.present();
                        break;
                    case 0:
                        //Correct
                        _this.data.IsDisabled = false;
                        _this.data.PaperNo = response[0].PO_ID;
                        _this.data.PaperNo_ID = response[0].ID;
                        localStorage.setItem('PaperNo', _this.data.PaperNo);
                        localStorage.setItem('PaperNo_ID', _this.data.PaperNo_ID);
                        //帶出驗收明細
                        _this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [
                            { Name: '@JOB_ID', Value: '31' },
                            { Name: '@REG_ID', Value: _this.data.CarNo },
                            { Name: '@ID', Value: _this.data.PaperNo },
                            { Name: '@USER_NAME', Value: _this.data.USER_ID }
                        ])
                            .then(function (response2) {
                            _this.result = response2[0];
                        });
                        break;
                    default:
                        _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'middle'
                        }).present();
                        break;
                }
            }
            _this.myFocus();
        });
    };
    ; //#endregion
    //喪失focus
    _122_PaperNo.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    _122_PaperNo.prototype.myKeylogger = function (event) {
        var obj = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    };
    //全選
    _122_PaperNo.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //查詢明細
    //呼叫進貨單明細
    _122_PaperNo.prototype.callPaperDetail = function () {
        var _this = this;
        if (this.data.IsDisabled == true)
            return;
        this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [{ Name: '@JOB_ID', Value: 13 },
            { Name: '@REG_ID', Value: this.data.CarNo },
            { Name: '@ID', Value: this.data.PaperNo }])
            .then(function (response) {
            __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', response);
            var obj = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__ZZ_CommonLib_PaperDetail_PaperDetail__["a" /* PaperDetailPage */]);
            obj.present();
        });
    };
    ;
    //單據完成
    _122_PaperNo.prototype.finish = function () {
        var _this = this;
        this.vibration.vibrate(100);
        if (this.data.IsDisabled == true)
            return;
        this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [
            { Name: '@JOB_ID', Value: '4' },
            { Name: '@REG_ID', Value: this.data.CarNo },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@USER_NAME', Value: this.data.USER_ID }
        ])
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case 0:
                        var toast = _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'bottom'
                        });
                        toast.present();
                        _this.reset();
                        break;
                    default:
                        _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'middle'
                        }).present();
                        break;
                }
            }
        });
    };
    //下一步
    _122_PaperNo.prototype.Next = function () {
        if (this.data.IsDisabled == true)
            return;
        this.navCtrl.push('_123_ItemCode');
    };
    ;
    //手勢
    _122_PaperNo.prototype.swipeEvent = function (event) {
        console.log(event);
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                this.Next();
                break;
            case 4://RIGHT
                this.reset();
                this.navCtrl.pop();
                break;
        }
        ;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], _122_PaperNo.prototype, "scan_Entry", void 0);
    _122_PaperNo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\2_PaperNo\PaperNo.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>進貨單查詢</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-end (click)="Next()" [disabled]="data.IsDisabled">\n\n                下一步\n\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">進貨單</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <ion-input #scan_Entry type="text"\n\n                           [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                           (keyup)="myKeylogger($event)"\n\n                           (keydown.Tab)="myKeylogger($event)"\n\n                           (ionFocus)="selectAll($event)"\n\n                           [(ngModel)]="data.PaperNo"></ion-input>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="search"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)" (swipeup)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-grid class="mylist">\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label class="item-left">總品項數</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.ITEM_QTY}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label class="item-left">未驗品數</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.ITEM_QTY0}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label class="item-left">待驗品數</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.ITEM_QTY1}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label class="item-left">已驗品數</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.ITEM_QTY2}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-item>\n\n            <!--IonicPage+div+hidden會導致Ionic排版錯誤，故意多加兩行空白-->\n\n            <h1>&nbsp;</h1><br />\n\n            <h1>&nbsp;</h1>\n\n        </ion-item>\n\n    </ion-card>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-buttons left>\n\n                <button ion-button outline (click)="callPaperDetail()" color="secondary" [disabled]="data.IsDisabled">\n\n                    明細\n\n                </button>\n\n                <button ion-button icon-start solid (click)="finish()" color="primary" [disabled]="data.IsDisabled">\n\n                    <ion-icon name="checkmark"></ion-icon>\n\n                    完成驗收\n\n                </button>\n\n            </ion-buttons>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\2_PaperNo\PaperNo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _122_PaperNo);
    return _122_PaperNo;
}());

//# sourceMappingURL=PaperNo.js.map

/***/ })

});
//# sourceMappingURL=12.js.map