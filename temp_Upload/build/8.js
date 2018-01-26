webpackJsonp([8],{

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreChgAmountModule", function() { return StoreChgAmountModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StoreChgAmount__ = __webpack_require__(717);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StoreChgAmountModule = /** @class */ (function () {
    function StoreChgAmountModule() {
    }
    StoreChgAmountModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__StoreChgAmount__["a" /* _1331_WAS_StoreChgAmount */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__StoreChgAmount__["a" /* _1331_WAS_StoreChgAmount */])
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__StoreChgAmount__["a" /* _1331_WAS_StoreChgAmount */]
            ]
        })
    ], StoreChgAmountModule);
    return StoreChgAmountModule;
}());

//# sourceMappingURL=StoreChgAmount.module.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _1331_WAS_StoreChgAmount; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ZZ_CommonLib_http_services__ = __webpack_require__(87);
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

var _1331_WAS_StoreChgAmount = /** @class */ (function () {
    function _1331_WAS_StoreChgAmount(navCtrl, _http_services, alertCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        this.vibration = vibration;
        this.data = {
            RefValue: '',
            InfiniteScrollEnable: true //啟用無限卷軸
        };
        this.TotalList = [];
        this.DefaultTestServer = '172_31_31_250';
        this.data.RefValue = localStorage.getItem('WAS_OrderNo')
            + ',' + JSON.parse(localStorage.getItem('WAS_Item')).ITEM_NO;
    }
    _1331_WAS_StoreChgAmount.prototype.ionViewWillEnter = function () {
        this.BringDisplayList(0);
    };
    _1331_WAS_StoreChgAmount.prototype.BringDisplayList = function (startSEQ) {
        var _this = this;
        var sql_StepValue = '21';
        var sql_parameter = this.data.RefValue + ',' + startSEQ.toString();
        return this._http_services.POST(this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: sql_StepValue },
            { Name: '@Parameters', Value: sql_parameter }])
            .then(function (response) {
            if (response != undefined) {
                _this.BringDisplayList_Add(response);
                //檢查特殊情況
                if (response.length == 0) {
                    _this.data.InfiniteScrollEnable = false;
                }
                else {
                    _this.data.InfiniteScrollEnable = true;
                }
            }
            return response;
        });
    };
    //查詢結果匯入TotalList
    _1331_WAS_StoreChgAmount.prototype.BringDisplayList_Add = function (response) {
        var _this = this;
        response.forEach(function (value, index, array) {
            _this.TotalList.push(value);
        });
    };
    //改量
    _1331_WAS_StoreChgAmount.prototype.readyChangeAMOUNT = function (item) {
        var _this = this;
        this.vibration.vibrate(100);
        var alert = this.alertCtrl.create({
            title: '修改訂購量',
            message: '營業所：' + item.SITE_NAME + '<br/>'
                + '代號&nbsp&nbsp&nbsp&nbsp：' + item.SITE_ID + '<br/>'
                + '訂購量：' + item.AMOUNT + '<br/>',
            inputs: [
                {
                    name: 'UPD_AMOUNT',
                    type: 'number',
                    value: item.UPD_AMOUNT,
                    placeholder: ''
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                },
                {
                    text: '確定',
                    handler: function (data) {
                        //送出sql
                        var sql_StepValue = '22';
                        var sql_parameter = _this.data.RefValue + ',' + item.SITE_ID + ',' + data.UPD_AMOUNT + ',' + localStorage.getItem('USER_ID');
                        _this._http_services.POST(_this.DefaultTestServer, 'sp', '[WAS].dbo.spactWAS_Line_v2', [{ Name: '@Step', Value: sql_StepValue },
                            { Name: '@Parameters', Value: sql_parameter }])
                            .then(function (response) {
                            if (response != undefined) {
                                item.UPD_AMOUNT = data.UPD_AMOUNT;
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    //無限卷軸
    _1331_WAS_StoreChgAmount.prototype.doInfinite = function (infiniteScroll) {
        if (!this.data.InfiniteScrollEnable) {
            infiniteScroll.complete();
            return;
        }
        var obj = this.TotalList[this.TotalList.length - 1];
        this.BringDisplayList(obj.SEQ + 1)
            .then(function (response) {
            console.log('InfiniteScroll Complete');
            infiniteScroll.complete();
        });
    };
    //全選
    _1331_WAS_StoreChgAmount.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _1331_WAS_StoreChgAmount.prototype.swipeEvent = function (event) {
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
    ], _1331_WAS_StoreChgAmount.prototype, "scan_Entry", void 0);
    _1331_WAS_StoreChgAmount = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\31_StoreChgAmount\StoreChgAmount.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>WAS_營業所改量</ion-title>\n\n        <ion-buttons end>\n\n            <span style="white-space:pre;color:white">{{data.RefValue}}</span>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid class="mytable">\n\n        <ion-row class="mytable_Head">\n\n            <ion-col col-2>順序</ion-col>\n\n            <ion-col col-3>營業所</ion-col>\n\n            <ion-col col-2>代號</ion-col>\n\n            <ion-col col-2>訂購量</ion-col>\n\n            <ion-col col-1>實績量</ion-col>\n\n            <ion-col col-2>修改量</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let ListItem of TotalList" class="mytable_Detail" (click)="readyChangeAMOUNT(ListItem)">\n\n            <ion-col col-2> {{ListItem.SEQ}}</ion-col>\n\n            <ion-col col-3> {{ListItem.SITE_NAME}}</ion-col>\n\n            <ion-col col-2> {{ListItem.SITE_ID}}</ion-col>\n\n            <ion-col col-2> {{ListItem.AMOUNT}}</ion-col>\n\n            <ion-col col-1> {{ListItem.TQty}}</ion-col>\n\n            <ion-col col-2> {{ListItem.UPD_AMOUNT}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_13_WAS\31_StoreChgAmount\StoreChgAmount.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _1331_WAS_StoreChgAmount);
    return _1331_WAS_StoreChgAmount;
}());

//# sourceMappingURL=StoreChgAmount.js.map

/***/ })

});
//# sourceMappingURL=8.js.map