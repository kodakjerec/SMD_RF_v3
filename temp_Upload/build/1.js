webpackJsonp([1],{

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_132_WAS_ItemModule", function() { return _132_WAS_ItemModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Item__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var _132_WAS_ItemModule = /** @class */ (function () {
    function _132_WAS_ItemModule() {
    }
    _132_WAS_ItemModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__Item__["a" /* _132_WAS_Item */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__Item__["a" /* _132_WAS_Item */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__Item__["a" /* _132_WAS_Item */]]
        })
    ], _132_WAS_ItemModule);
    return _132_WAS_ItemModule;
}());

//# sourceMappingURL=Item.module.js.map

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

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _132_WAS_Item; });
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



var _132_WAS_Item = /** @class */ (function () {
    function _132_WAS_Item(navCtrl, _http_services, toastCtrl, modalCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.vibration = vibration;
        this.data = {
            RefValue: '',
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            WAS_Item: '',
            IsInputEnable: true,
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.DisplayList = [];
        this.DefaultTestServer = '172_31_31_250';
        this.data.RefValue = localStorage.getItem('WAS_OrderNo');
    }
    _132_WAS_Item.prototype.ionViewWillEnter = function () {
        this.BringDisplayList();
        this.myFocus();
    };
    _132_WAS_Item.prototype.BringDisplayList = function () {
        var _this = this;
        var sql_parameter = this.data.RefValue + ',';
        this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: '01' },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            if (response != undefined) {
                _this.DisplayList = response;
            }
        });
    };
    //重置btn
    _132_WAS_Item.prototype.reset = function () {
        localStorage.setItem('WAS_Item', '');
        this.data.WAS_Item = '';
        this.myFocus();
    };
    ;
    //查詢
    _132_WAS_Item.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        this.data.IsInputEnable = false;
        ////test
        //let FilterObj = this.pipes.mySearchPipe.transform(this.DisplayList, { property: 'ITEM_NO', keyword: this.data.WAS_Item });
        //if (FilterObj.length > 0)
        //    this.data.WAS_Item = FilterObj[0].ITEM_NO;
        //else
        //    this.data.WAS_Item = this.DisplayList[0].ITEM_NO;
        if (this.data.WAS_Item.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            this.myFocus();
            this.data.WAS_Item = '';
            this.data.IsInputEnable = true;
            return;
        }
        var sql_parameter = this.data.RefValue + ',' + this.data.WAS_Item;
        this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: '1' },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            switch (response[0].RT_CODE) {
                case 0:
                    var result = JSON.stringify({
                        ITEM_NO: response[0].RT_MSG,
                        ITEM_NAME: response[0].ITEM_NAME
                    });
                    localStorage.setItem('WAS_Item', result);
                    _this.toastCtrl.create({
                        message: '驗證成功 ' + response[0].RT_MSG,
                        duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                        position: 'middle'
                    }).present();
                    _this.navCtrl.push('_133_WAS_Store');
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
            _this.data.WAS_Item = '';
            _this.data.IsInputEnable = true;
        });
    };
    //全選
    _132_WAS_Item.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //Focus
    _132_WAS_Item.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry._elementRef.nativeElement.focus();
        }, 300);
    };
    _132_WAS_Item.prototype.myKeylogger = function (event) {
        this.data.WAS_Item = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.WAS_Item);
        if (this.data.WAS_Item.indexOf('ENTER') >= 0) {
            this.data.WAS_Item = this.data.WAS_Item.replace('ENTER', '');
            this.search();
        }
    };
    _132_WAS_Item.prototype.openKeyPad = function () {
        var _this = this;
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */], { Name: '呼出碼', Value: this.data.WAS_Item });
        obj.onDidDismiss(function (data) {
            _this.data.WAS_Item = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
            _this.search();
        });
        obj.present();
    };
    //手勢
    _132_WAS_Item.prototype.swipeEvent = function (event) {
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
    ], _132_WAS_Item.prototype, "scan_Entry", void 0);
    _132_WAS_Item = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\2_Item\Item.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>WAS_呼出碼</ion-title>\n\n        <ion-buttons end>\n\n            <span style="white-space:pre;color:white">{{data.RefValue}}</span>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">呼出碼</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <button ion-button outline block\n\n                        [ngClass]="[\'myScanBarcodeUI\']"\n\n                        #scan_Entry\n\n                        (keyup)="myKeylogger($event)"\n\n                        (blur)="myFocus()"\n\n                        (ionFocus)="selectAll($event)"\n\n                        [disabled]="!data.IsInputEnable">\n\n                    {{data.WAS_Item}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="openKeyPad()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="keypad"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid class="mytable">\n\n        <ion-row class="mytable_Head">\n\n            <ion-col col-4>呼出碼</ion-col>\n\n            <ion-col col-2>計價</ion-col>\n\n            <ion-col col-2>訂購</ion-col>\n\n            <ion-col col-2>實績</ion-col>\n\n            <ion-col col-2>剩餘</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let ListItem of DisplayList" class="mytable_Detail">\n\n            <ion-col col-4> {{ListItem.ITEM_NO}}</ion-col>\n\n            <ion-col col-2> {{ListItem.PRICE_TYPE_NAME}}</ion-col>\n\n            <ion-col col-2> {{ListItem.AMOUNT}}</ion-col>\n\n            <ion-col col-2> {{ListItem.TQty}}</ion-col>\n\n            <ion-col col-2> {{ListItem.LeftQty}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n    <ion-item>\n\n        <!--IonicPage+div+hidden會導致Ionic排版錯誤，故意多加兩行空白-->\n\n        <h1>&nbsp;</h1><br />\n\n        <h1>&nbsp;</h1>\n\n    </ion-item>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\2_Item\Item.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _132_WAS_Item);
    return _132_WAS_Item;
}());

//# sourceMappingURL=Item.js.map

/***/ })

});
//# sourceMappingURL=1.js.map