webpackJsonp([7],{

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_133_WAS_StoreModule", function() { return _133_WAS_StoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Store__ = __webpack_require__(716);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var _133_WAS_StoreModule = /** @class */ (function () {
    function _133_WAS_StoreModule() {
    }
    _133_WAS_StoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__Store__["a" /* _133_WAS_Store */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__Store__["a" /* _133_WAS_Store */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__Store__["a" /* _133_WAS_Store */]]
        })
    ], _133_WAS_StoreModule);
    return _133_WAS_StoreModule;
}());

//# sourceMappingURL=Store.module.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _133_WAS_Store; });
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



var _133_WAS_Store = /** @class */ (function () {
    function _133_WAS_Store(navCtrl, _http_services, toastCtrl, modalCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.vibration = vibration;
        this.data = {
            RefValue: '',
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            WAS_Store: '',
            IsInputEnable: true,
            IsHideWhenKeyboardOpen: false,
            InfiniteScrollEnable: true //啟用無限卷軸
            ,
            theLastSEQ: 0 //上次驗收最後進入的營業所SEQ
            ,
            NoMoreOrders: false //重整畫面使用, 已經沒有剩餘訂單的判斷
        };
        this.DisplayList = {
            SITE_ID: '',
            SEQ: 0,
            AMOUNT: 0,
            UPD_AMOUNT: 0,
            TQty: 0,
            LeftQty: 0,
            SITE_NAME: ''
        };
        this.TotalList = [];
        this.DefaultTestServer = '172_31_31_250';
        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    _133_WAS_Store.prototype.ionViewWillEnter = function () {
        this.BringDisplayList(this.data.theLastSEQ);
        this.myFocus();
    };
    _133_WAS_Store.prototype.BringDisplayList = function (startSEQ) {
        var _this = this;
        var sql_StepValue = '11';
        var sql_parameter = this.data.RefValue + ',' + startSEQ.toString();
        return this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: sql_StepValue },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            if (response != undefined) {
                //先填入清單
                _this.BringDisplayList_Add(response);
                if (_this.TotalList.length > 0)
                    _this.DisplayList = _this.TotalList[0];
                //檢查特殊情況
                if (response.length == 0) {
                    _this.data.InfiniteScrollEnable = false;
                    //連續兩次查料都沒有待處理清單, 回到上一頁
                    if (_this.data.NoMoreOrders) {
                        _this.reset();
                        _this.navCtrl.pop();
                        return;
                    }
                    //從驗收回來後, 檢查是否還有剩餘資料
                    if (_this.data.theLastSEQ > 0) {
                        _this.data.theLastSEQ = 0;
                        _this.data.NoMoreOrders = true;
                        _this.BringDisplayList(0);
                        return;
                    }
                }
                else {
                    _this.data.NoMoreOrders = false;
                    _this.data.InfiniteScrollEnable = true;
                    //小於sp設定的50筆
                    //再次重頭搜尋未完成項目
                    if (response.length < 50) {
                        if (_this.data.theLastSEQ > 0) {
                            console.log('小於sp設定的50筆');
                            _this.data.theLastSEQ = 0;
                            _this.BringDisplayList(0);
                            return;
                        }
                    }
                }
            }
            return response;
        });
    };
    //查詢結果匯入TotalList
    _133_WAS_Store.prototype.BringDisplayList_Add = function (response) {
        var _this = this;
        response.forEach(function (value, index, array) {
            var checkPK = _this.TotalList.filter(function (value2, index2, array2) { return value2.SITE_ID == value.SITE_ID; });
            if (checkPK.length == 0)
                _this.TotalList.push(value);
        });
    };
    //重置btn
    _133_WAS_Store.prototype.reset = function () {
        this.data.IsInputEnable = true;
        this.data.InfiniteScrollEnable = true; //啟用無限卷軸
        this.data.theLastSEQ = 0; //上次驗收最後進入的營業所SEQ
        this.data.NoMoreOrders = false; //重整畫面使用, 已經沒有剩餘訂單的判斷
        this.data.WAS_Store = '';
        this.TotalList = [];
        this.myFocus();
    };
    ;
    //查詢
    _133_WAS_Store.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;
        ////test
        //this.data.WAS_Store = this.DisplayList.SITE_ID;
        if (this.data.WAS_Store.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_Store = '';
            this.data.IsInputEnable = true;
            return;
        }
        var sql_parameter = this.data.RefValue + ',' + this.data.WAS_Store;
        this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: '2' },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            switch (response[0].RT_CODE) {
                case 0:
                    var result = JSON.stringify({
                        SITE_ID: response[0].SITE_ID,
                        SEQ: response[0].SEQ,
                        AMOUNT: response[0].AMOUNT,
                        TQty: response[0].TQty,
                        TWeight: response[0].TWeight,
                        LeftQty: response[0].LeftQty,
                        SITE_NAME: response[0].SITE_NAME,
                        PRICE: response[0].PRICE,
                        PRICE_TYPE: response[0].PRICE_TYPE
                    });
                    localStorage.setItem('WAS_Store', result);
                    _this.toastCtrl.create({
                        message: '驗證成功 ' + response[0].RT_MSG,
                        duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                        position: 'middle'
                    }).present();
                    _this.reset();
                    _this.navCtrl.push('_134_WAS_Receive');
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
            _this.data.WAS_Store = '';
            _this.data.IsInputEnable = true;
        });
    };
    //改量
    _133_WAS_Store.prototype.btn_ChangeTqty = function () {
        this.reset();
        this.navCtrl.push('_1331_WAS_StoreChgAmount');
    };
    //補標
    _133_WAS_Store.prototype.btn_MorelastPrint = function () {
        if (__WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('lastPrint') == undefined) {
            this.toastCtrl.create({
                message: '沒有上一次的列印紀錄',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            this.myFocus();
            return;
        }
        //開始補標
        this.reset();
    };
    //無限卷軸
    _133_WAS_Store.prototype.doInfinite = function (infiniteScroll) {
        var obj = this.TotalList[this.TotalList.length - 1];
        this.BringDisplayList(obj.SEQ + 1)
            .then(function (response) {
            infiniteScroll.complete();
        });
    };
    //全選
    _133_WAS_Store.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //Focus
    _133_WAS_Store.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry._elementRef.nativeElement.focus();
        }, 300);
    };
    _133_WAS_Store.prototype.myKeylogger = function (event) {
        this.data.WAS_Store = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.WAS_Store);
        if (this.data.WAS_Store.indexOf('ENTER') >= 0) {
            this.data.WAS_Store = this.data.WAS_Store.replace('ENTER', '');
            this.search();
        }
    };
    _133_WAS_Store.prototype.openKeyPad = function () {
        var _this = this;
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */], { Name: '營業所', Value: this.data.WAS_Store });
        obj.onDidDismiss(function (data) {
            _this.data.WAS_Store = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
            _this.search();
        });
        obj.present();
    };
    //手勢
    _133_WAS_Store.prototype.swipeEvent = function (event) {
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
    ], _133_WAS_Store.prototype, "scan_Entry", void 0);
    _133_WAS_Store = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\3_Store\Store.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>WAS_營業所</ion-title>\n\n        <ion-buttons end>\n\n            <span style="white-space:pre;color:white">{{data.RefValue}}</span>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">營業所</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <button ion-button outline block\n\n                        [ngClass]="[\'myScanBarcodeUI\']"\n\n                        #scan_Entry\n\n                        (keyup)="myKeylogger($event)"\n\n                        (blur)="myFocus()"\n\n                        (ionFocus)="selectAll($event)"\n\n                        [disabled]="!data.IsInputEnable">\n\n                    {{data.WAS_Store}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="openKeyPad()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="keypad"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid class="mytable">\n\n        <ion-row>\n\n            <ion-col col-1>{{DisplayList.SEQ}}</ion-col>\n\n            <ion-col col-11>{{DisplayList.SITE_NAME}}</ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col style="font-size:70px;color:yellow" col-12>{{DisplayList.SITE_ID}}</ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-3>訂購量</ion-col>\n\n            <ion-col col-3>實績量</ion-col>\n\n            <ion-col col-6>剩餘量</ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col style="font-size:30px" col-3>{{DisplayList.AMOUNT}}</ion-col>\n\n            <ion-col style="font-size:30px" col-3>{{DisplayList.TQty}}</ion-col>\n\n            <ion-col style="font-size:30px" col-6>{{DisplayList.LeftQty}}</ion-col>\n\n        </ion-row>\n\n        <ion-row class="mytable_Head">\n\n            <ion-col col-1></ion-col>\n\n            <ion-col col-3>營業所</ion-col>\n\n            <ion-col col-2>代號</ion-col>\n\n            <ion-col col-2>訂購量</ion-col>\n\n            <ion-col col-2>實績量</ion-col>\n\n            <ion-col col-2>剩餘量</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let ListItem of TotalList" class="mytable_Detail">\n\n            <ion-col col-1> {{ListItem.SEQ}}</ion-col>\n\n            <ion-col col-3> {{ListItem.SITE_NAME}}</ion-col>\n\n            <ion-col col-2> {{ListItem.SITE_ID}}</ion-col>\n\n            <ion-col col-2> {{ListItem.AMOUNT}}</ion-col>\n\n            <ion-col col-2> {{ListItem.TQty}}</ion-col>\n\n            <ion-col col-2> {{ListItem.LeftQty}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="data.InfiniteScrollEnable">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-buttons left>\n\n                <button color="danger" ion-button solid (click)=\'btn_ChangeTqty()\'>改量</button>\n\n                <button color="secondary" ion-button outline (click)=\'btn_MorelastPrint()\'>補標</button>\n\n            </ion-buttons>\n\n            <ion-buttons right>\n\n                <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n            </ion-buttons>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\3_Store\Store.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _133_WAS_Store);
    return _133_WAS_Store;
}());

//# sourceMappingURL=Store.js.map

/***/ })

});
//# sourceMappingURL=7.js.map