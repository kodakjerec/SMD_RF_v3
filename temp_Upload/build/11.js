webpackJsonp([11],{

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemCode__ = __webpack_require__(713);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__ItemCode__["a" /* _123_ItemCode */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__ItemCode__["a" /* _123_ItemCode */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__ItemCode__["a" /* _123_ItemCode */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=ItemCode.module.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _123_ItemCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__ = __webpack_require__(359);
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



var _123_ItemCode = /** @class */ (function () {
    function _123_ItemCode(navCtrl, _http_services, modalCtrl, toastCtrl, vibration) {
        //localStorage.setItem('USER_ID', '123456');
        //localStorage.setItem('BLOCK_NAME', '1樓進貨暫存區');
        //localStorage.setItem('CarNo', '023');
        //localStorage.setItem('PaperNo', 'PO180125008341');
        //localStorage.setItem('PaperNo_ID', 'ID180126000086');
        //localStorage.setItem('ItemCode', '621087');
        //localStorage.setItem('ITEM_HOID', '1161129110915');
        //localStorage.setItem('LOT_ID', '2180125000150');
        //localStorage.setItem('ReceiveResult', '{"RT_CODE":0,"RT_MSG":"找到了","ITEM_HOID":"1161129110915","IDN_ID":"IDN180124000239","CN":"621087","PO_QTY":"46 / 46","ITEM_ID":"621087","ROW1":"621087 人蔘枸杞雞（元進莊）","ROW2":"約７００ｇ/ 售價 119","ROW3":"本單應收 46 待收 46","ROW4":"應抽驗數4 (10%)","ROW5":"已收良品 0","ROW6":"已收不良 0","ROW7":"已收搭贈 0","PRICE":119,"NAME":"人蔘枸杞雞（元進莊）","SPEC":"約７００ｇ","UNIT":"盒","PRICE_TYPE":0,"UNIT_QTY":1,"UNIT_WEIGHT":700,"QC_RATE":"10%","QC_QTY":4,"QL_TYPE":0,"QE_TYPE":1,"QE_TYPE_NAME":"效期","QE_TYPE_TEXT":"","QT_TYPE":1,"QT_TYPE_NAME":"表面溫度","BARCODE":"20621087","ADDON_QTY":0,"ADDON_WT":0,"QTY":30,"WT":0,"NG_QTY":0,"NG_WT":0}');
        //this.data.CarNo = localStorage.getItem('CarNo');
        //this.data.PaperNo = localStorage.getItem('PaperNo');
        //this.data.PaperNo_ID = localStorage.getItem('PaperNo_ID');
        //this.data.ItemCode = localStorage.getItem('ItemCode');
        //this.data.ITEM_HOID = localStorage.getItem('ITEM_HOID');
        //this.data.LOT_ID = localStorage.getItem('LOT_ID');
        //this.data.USER_ID = localStorage.getItem('USER_ID');
        //this.data.BLOCK_NAME = localStorage.getItem('BLOCK_NAME');
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.vibration = vibration;
        this.data = {
            CarNo: localStorage.getItem('CarNo'),
            PaperNo: localStorage.getItem('PaperNo'),
            PaperNo_ID: localStorage.getItem('PaperNo_ID'),
            ItemCode: '',
            ITEM_HOID: '',
            LOT_ID: '',
            IsDisabled: true,
            USER_ID: localStorage.getItem('USER_ID'),
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.answer = {
            LOT: '',
            SunDay: '',
            SunDay_placeholder: '123',
            Temp: 0,
            QTY_ShowTotal: 0,
            QTY_ProgressBar: '',
            DisplaySunDay: 0
        };
        this.result = {};
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["h" /* loginCheck */]();
    }
    _123_ItemCode.prototype.ionViewWillEnter = function () {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    };
    //進度表
    _123_ItemCode.prototype.getQTY_ProgressBar = function () {
        return this.answer.QTY_ProgressBar;
    };
    //重置btn
    _123_ItemCode.prototype.reset = function () {
        localStorage.setItem('ItemCode', '');
        localStorage.setItem('ITEM_HOID', '');
        this.data.ITEM_HOID = '';
        this.answer.LOT = '';
        this.answer.SunDay = '';
        this.answer.SunDay_placeholder = '123';
        this.answer.QTY_ShowTotal = 0;
        this.answer.QTY_ProgressBar = '';
        this.answer.DisplaySunDay = 0;
        //溫度
        this.answer.Temp = 0;
        this.result = {};
        this.data.IsDisabled = true;
        this.myFocus();
    };
    ;
    //#region 查詢報到牌btn
    _123_ItemCode.prototype.search = function () {
        var _this = this;
        this.vibration.vibrate(100);
        if (this.data.ItemCode.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入數值',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            return;
        }
        this.reset();
        this._http_services.POST('', 'sp', 'spactDCS_ID_LINE', [
            { Name: '@JOB_ID', Value: '1' },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@ITEM', Value: this.data.ItemCode },
            { Name: '@USER_ID', Value: this.data.USER_ID }
        ])
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case -1:
                        //Multi variables, choose one
                        var Lists = [];
                        for (var index in response) {
                            var value = response[index];
                            Lists.push({ Name: value.RT_MSG, Value: value.BARCODE });
                        }
                        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', Lists);
                        var obj = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__["a" /* ListTablePage */]);
                        obj.onDidDismiss(function (data) {
                            _this.data.ItemCode = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer').Value;
                            console.log(__WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
                            _this.search();
                            return;
                        });
                        obj.present();
                        break;
                    case 0:
                        //Correct
                        _this.result = response[0];
                        _this.data.IsDisabled = false;
                        _this.data.ItemCode = response[0].ITEM_ID;
                        _this.data.ITEM_HOID = response[0].ITEM_HOID;
                        localStorage.setItem('ItemCode', _this.data.ItemCode);
                        localStorage.setItem('ITEM_HOID', _this.data.ITEM_HOID);
                        //帶出太陽日
                        _this._http_services.POST('', 'sqlcmd', "SELECT DATENAME(dayofyear, getdate()) AS 'SunDay'", [])
                            .then(function (response2) {
                            _this.answer.DisplaySunDay = response2[0].SunDay;
                        });
                        //帶入obj_response:any
                        var obj_response = response[0];
                        //SHOW 待收百分比
                        var QTY = obj_response.PO_QTY.split("/");
                        _this.answer.QTY_ShowTotal = parseInt(QTY[1]);
                        _this.answer.QTY_ProgressBar = Math.round(obj_response.QTY / _this.answer.QTY_ShowTotal * 100).toString() + '%';
                        //介面顯示設定
                        _this.answer.SunDay = obj_response.QE_TYPE_TEXT;
                        if (obj_response.QE_TYPE_NAME == '效期') {
                            _this.answer.SunDay_placeholder = 'YYMMDD';
                        }
                        else {
                            _this.answer.SunDay_placeholder = '123';
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
    //單品完成
    _123_ItemCode.prototype.finish = function () {
        var _this = this;
        this.vibration.vibrate(100);
        if (this.data.ItemCode.length <= 0) {
            this.toastCtrl.create({
                message: '請輸入呼出碼',
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            return;
        }
        this._http_services.POST('', 'sp', 'spactDCS_ID_LINE', [
            { Name: '@JOB_ID', Value: '45' },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@ITEM', Value: this.data.ITEM_HOID },
            { Name: '@USER_ID', Value: this.data.USER_ID }
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
                        //sp回傳有兩種錯誤格式
                        var ErrorMessage = '';
                        if (response[0].RT_MSG != undefined)
                            ErrorMessage = response[0].RT_MSG;
                        else
                            ErrorMessage = response[0].MEG;
                        _this.toastCtrl.create({
                            message: ErrorMessage,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'middle'
                        }).present();
                        break;
                }
            }
        });
    };
    //下一步
    _123_ItemCode.prototype.Next = function () {
        var _this = this;
        if (this.data.IsDisabled == true)
            return;
        var ErrMsg = '';
        //批號
        //效期
        //溫度
        //開始鎖定
        this._http_services.POST('', 'sp', 'spactDCS_ID_LINE', [
            { Name: '@JOB_ID', Value: '2' },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@ITEM', Value: this.data.ITEM_HOID },
            { Name: '@ITEM_LOT', Value: this.answer.LOT },
            { Name: '@ITEM_DATE', Value: this.answer.SunDay },
            { Name: '@ITEM_TEMP', Value: this.answer.Temp },
            { Name: '@USER_ID', Value: this.data.USER_ID }
        ])
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case 0:
                        //Correct
                        _this.data.LOT_ID = response[0].LOT_ID;
                        localStorage.setItem('LOT_ID', _this.data.LOT_ID);
                        localStorage.setItem('ReceiveResult', JSON.stringify(_this.result));
                        _this.navCtrl.push('_124_ItemRcv');
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
    ;
    //喪失focus
    _123_ItemCode.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    _123_ItemCode.prototype.myKeylogger = function (event) {
        var obj = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    };
    //全選
    _123_ItemCode.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _123_ItemCode.prototype.swipeEvent = function (event) {
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
    ], _123_ItemCode.prototype, "scan_Entry", void 0);
    _123_ItemCode = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\3_ItemCode\ItemCode.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>呼出碼查詢</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-end (click)="Next()" [disabled]="data.IsDisabled">\n\n                下一步\n\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">呼出碼</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <ion-input #scan_Entry id="txb_scan_Entry" type="number"\n\n                           [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                           (keyup)="myKeylogger($event)"\n\n                           (keydown.Tab)="myKeylogger($event)"\n\n                           (ionFocus)="selectAll($event)"\n\n                           [(ngModel)]="data.ItemCode"></ion-input>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="search"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card [hidden]="data.IsDisabled">\n\n        <ion-grid class="mylist">\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>太陽日</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{answer.DisplaySunDay}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW1}}</ion-label>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW2}}</ion-label>\n\n            </ion-row>\n\n            <ion-row [hidden]="!result.QL_TYPE"> <!--廠商批號-->\n\n                <ion-col col-4>\n\n                    <ion-label>廠商批號</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="text"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.LOT"\n\n                               (ionFocus)="selectAll($event)"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center [hidden]="!result.QE_TYPE"> <!--效期/太陽日-->\n\n                <ion-col col-4>\n\n                    <ion-label>{{result.QE_TYPE_NAME}}</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.SunDay"\n\n                               (ionFocus)="selectAll($event)"\n\n                               placeholder="{{answer.SunDay_placeholder}}"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center [hidden]="!result.QT_TYPE"> <!--溫度-->\n\n                <ion-col col-4>\n\n                    <ion-label>{{result.QT_TYPE_NAME}}</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.Temp"\n\n                               (ionFocus)="selectAll($event)"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-8>\n\n                    <label [ngStyle]="{color: data.viewColor}">{{result.ROW3}}</label>\n\n                </ion-col>\n\n                <ion-col col-4>\n\n                    <div class="myProgressBar">\n\n                        <div class="loader" [ngStyle]="{\'width\': answer.QTY_ProgressBar}">\n\n                            <p class="percent">{{this.answer.QTY_ProgressBar}}</p>\n\n                        </div>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW4}}</ion-label>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-item>\n\n            <!--IonicPage+div+hidden會導致Ionic排版錯誤，故意多加兩行空白-->\n\n            <h1>&nbsp;</h1><br />\n\n            <h1>&nbsp;</h1>\n\n        </ion-item>\n\n    </ion-card>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-item>\n\n                <ion-label>{{result.ROW5}}</ion-label>\n\n                <ion-label>{{result.ROW6}}</ion-label>\n\n                <ion-label>{{result.ROW7}}</ion-label>\n\n            </ion-item>\n\n        </ion-toolbar>\n\n        <ion-toolbar>\n\n            <ion-buttons left>\n\n                <button ion-button icon-start solid (click)="finish()" color="primary" [disabled]="data.IsDisabled">\n\n                    <ion-icon name="checkmark"></ion-icon>\n\n                    單品完成\n\n                </button>\n\n            </ion-buttons>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\3_ItemCode\ItemCode.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _123_ItemCode);
    return _123_ItemCode;
}());

//# sourceMappingURL=ItemCode.js.map

/***/ })

});
//# sourceMappingURL=11.js.map