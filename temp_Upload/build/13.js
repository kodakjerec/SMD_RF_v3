webpackJsonp([13],{

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CarNo__ = __webpack_require__(710);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__CarNo__["a" /* _121_CarNo */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__CarNo__["a" /* _121_CarNo */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__CarNo__["a" /* _121_CarNo */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=CarNo.module.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _121_CarNo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_PaperDetail_PaperDetail__ = __webpack_require__(360);
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



var _121_CarNo = /** @class */ (function () {
    function _121_CarNo(navCtrl, _http_services, modalCtrl, toastCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.vibration = vibration;
        this.data = {
            CarNo: '',
            viewColor: '',
            IsDisabled: true,
            USER_ID: localStorage.getItem('USER_ID'),
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.color = { green: '#79FF79', red: '#FF5151' }; // 控制已報到/未報到 顏色
        this.result = {};
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["h" /* loginCheck */]();
    }
    _121_CarNo.prototype.ionViewDidEnter = function () {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    };
    //重置btn
    _121_CarNo.prototype.reset = function () {
        localStorage.setItem('CarNo', '');
        this.result = {};
        this.data.viewColor = '';
        this.data.IsDisabled = true;
        this.myFocus();
    };
    ;
    //查詢欄位專用清除
    _121_CarNo.prototype.reset_btn = function () {
        this.reset();
        this.data.CarNo = '';
    };
    //#region 查詢報到牌btn
    _121_CarNo.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        if (this.data.CarNo == '') {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            return;
        }
        this.reset();
        this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [
            { Name: '@JOB_ID', Value: '1' },
            { Name: '@REG_ID', Value: this.data.CarNo }
        ])
            .then(function (response) {
            if (response != undefined) {
                switch (response[0].RT_CODE) {
                    case 0:
                        //Correct
                        _this.result = response[0];
                        _this.data.CarNo = response[0].REG_ID;
                        _this.data.IsDisabled = false;
                        localStorage.setItem('CarNo', _this.data.CarNo);
                        if (response[0].ROW10 == '未報到') {
                            _this.data.viewColor = 'red';
                            _this.data.IsDisabled = true;
                        }
                        else {
                            _this.data.viewColor = 'green';
                            _this.data.IsDisabled = false;
                        }
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
    _121_CarNo.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    //全選
    _121_CarNo.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //查詢明細
    //呼叫進貨單明細
    _121_CarNo.prototype.callPaperDetail = function () {
        var _this = this;
        console.log(this.data);
        if (this.data.IsDisabled == true)
            return;
        this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [{ Name: '@JOB_ID', Value: 11 },
            { Name: '@REG_ID', Value: this.data.CarNo }])
            .then(function (response) {
            __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', response);
            var obj = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_PaperDetail_PaperDetail__["a" /* PaperDetailPage */]);
            obj.present();
        });
    };
    ;
    //下一步
    _121_CarNo.prototype.Next = function () {
        if (this.data.IsDisabled == true)
            return;
        this.navCtrl.push('_122_PaperNo');
    };
    ;
    _121_CarNo.prototype.myKeylogger = function (event) {
        var obj = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    };
    //手勢
    _121_CarNo.prototype.swipeEvent = function (event) {
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
    ], _121_CarNo.prototype, "scan_Entry", void 0);
    _121_CarNo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\1_CarNo\CarNo.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>報到牌</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-end (click)="Next()" [disabled]="data.IsDisabled">\n\n                下一步\n\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">報到牌</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <ion-input #scan_Entry type="text"\n\n                           [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                           (keyup)="myKeylogger($event)"\n\n                           (keydown.Tab)="myKeylogger($event)"\n\n                           (ionFocus)="selectAll($event)"\n\n                           [(ngModel)]="data.CarNo"></ion-input>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="search"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-grid class="mylist">\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>狀態</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label item-content [ngStyle]="{color: data.viewColor}">{{result.ROW10}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>物流公司</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.TRAN_NAME}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>報到車牌</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.VEHICLE_NO}} {{result.VEHICLE_DRIVER}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>指派碼頭</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.DOCK_NAME}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>冷凍溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.VEHICLE_TEMP0}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>冷藏溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.VEHICLE_TEMP1}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>溫控溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.VEHICLE_TEMP2}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-item>\n\n            <!--IonicPage+div+hidden會導致Ionic排版錯誤，故意多加兩行空白-->\n\n            <h1>&nbsp;</h1><br />\n\n            <h1>&nbsp;</h1>\n\n        </ion-item>\n\n    </ion-card>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-buttons left>\n\n                <button ion-button outline (click)="callPaperDetail()" color="secondary" [disabled]="data.IsDisabled">\n\n                    明細\n\n                </button>\n\n            </ion-buttons>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\1_CarNo\CarNo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _121_CarNo);
    return _121_CarNo;
}());

//# sourceMappingURL=CarNo.js.map

/***/ })

});
//# sourceMappingURL=13.js.map