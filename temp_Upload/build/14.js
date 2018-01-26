webpackJsonp([14],{

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckInModule", function() { return CheckInModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CheckIn__ = __webpack_require__(709);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CheckInModule = /** @class */ (function () {
    function CheckInModule() {
    }
    CheckInModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__CheckIn__["a" /* _11_CheckIn */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__CheckIn__["a" /* _11_CheckIn */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__CheckIn__["a" /* _11_CheckIn */]]
        })
    ], CheckInModule);
    return CheckInModule;
}());

//# sourceMappingURL=CheckIn.module.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _11_CheckIn; });
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

//My Pages


var _11_CheckIn = /** @class */ (function () {
    function _11_CheckIn(navCtrl, _http_services, alertCtrl, toastCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
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
        this.answer = { VEHICLE_TEMP0: 0, VEHICLE_TEMP1: 0, VEHICLE_TEMP2: 0 };
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["h" /* loginCheck */]();
    }
    _11_CheckIn.prototype.ionViewDidEnter = function () {
        if (this.data.IsDisabled == true) {
            this.myFocus();
        }
    };
    //重置btn
    _11_CheckIn.prototype.reset = function () {
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('CarNo', '');
        this.data.viewColor = '';
        this.data.IsDisabled = true;
        //輸入溫度
        this.answer.VEHICLE_TEMP0 = 0;
        this.answer.VEHICLE_TEMP1 = 0;
        this.answer.VEHICLE_TEMP2 = 0;
        this.result = {};
        this.myFocus();
    };
    ;
    //#region 查詢報到牌btn
    _11_CheckIn.prototype.search = function () {
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
                        //溫度
                        _this.answer.VEHICLE_TEMP0 = Math.abs(response[0].VEHICLE_TEMP0);
                        _this.answer.VEHICLE_TEMP1 = Math.abs(response[0].VEHICLE_TEMP1);
                        _this.answer.VEHICLE_TEMP2 = Math.abs(response[0].VEHICLE_TEMP2);
                        _this.data.CarNo = response[0].REG_ID;
                        if (response[0].ROW10 == '未報到') {
                            _this.data.viewColor = 'red';
                            _this.data.IsDisabled = false;
                        }
                        else {
                            _this.data.viewColor = 'green';
                            _this.data.IsDisabled = true;
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
    //#region 報到牌報到btn
    _11_CheckIn.prototype.register = function () {
        var _this = this;
        if (this.data.CarNo == '')
            return;
        if (this.data.IsDisabled == false) {
            this._http_services.POST('', 'sp', 'spactDCS_ID_HEADER', [
                { Name: '@JOB_ID', Value: '2' },
                { Name: '@REG_ID', Value: this.data.CarNo },
                { Name: '@TEMP0', Value: this.answer.VEHICLE_TEMP0 },
                { Name: '@TEMP1', Value: this.answer.VEHICLE_TEMP1 },
                { Name: '@TEMP2', Value: this.answer.VEHICLE_TEMP2 },
                { Name: '@USER_NAME', Value: this.data.USER_ID }
            ])
                .then(function (response) {
                if (response != undefined) {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //Correct
                            var alert_success = _this.alertCtrl.create({
                                title: '成功',
                                subTitle: response[0].RT_MSG,
                                buttons: ['關閉']
                            });
                            alert_success.onDidDismiss(function () {
                                _this.reset();
                            });
                            alert_success.present();
                            break;
                        default:
                            //Error
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
        } //if IsDisabled == false
    };
    ; //#endregion
    //喪失focus
    _11_CheckIn.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    //全選
    _11_CheckIn.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    _11_CheckIn.prototype.myKeylogger = function (event) {
        var obj = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.CarNo);
        if (obj.indexOf('ENTER') >= 0) {
            this.search();
        }
    };
    //手勢
    _11_CheckIn.prototype.swipeEvent = function (event) {
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
    ], _11_CheckIn.prototype, "scan_Entry", void 0);
    _11_CheckIn = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_11_CheckIn\CheckIn.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>進貨報到</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-3>\n\n                <ion-label [ngClass]="[\'myScanBarcodeUI_Label\']">報到牌</ion-label>\n\n            </ion-col>\n\n            <ion-col col-7>\n\n                <ion-input #scan_Entry type="text"\n\n                           [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                           (keyup)="myKeylogger($event)"\n\n                           (keydown.Tab)="myKeylogger($event)"\n\n                           (ionFocus)="selectAll($event)"\n\n                           [(ngModel)]="data.CarNo"></ion-input>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <button ion-button (click)="search()" color="primary" solid class="toolbar-button">\n\n                    <ion-icon name="search"></ion-icon>\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-grid class="mylist">\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>狀態</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label item-content [ngStyle]="{color: data.viewColor}">{{result.ROW10}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>物流公司</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.TRAN_NAME}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>報到車牌</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.VEHICLE_NO}} {{result.VEHICLE_DRIVER}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-label>指派碼頭</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-label>{{result.DOCK_NAME}}</ion-label>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row align-items-center>\n\n                <ion-col col-4>\n\n                    <ion-label>冷凍溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.VEHICLE_TEMP0"\n\n                               (ionFocus)="selectAll($event)"\n\n                               [disabled]="data.IsDisabled"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center>\n\n                <ion-col col-4>\n\n                    <ion-label item-start>冷藏溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.VEHICLE_TEMP1"\n\n                               (ionFocus)="selectAll($event)"\n\n                               [disabled]="data.IsDisabled"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center>\n\n                <ion-col col-4>\n\n                    <ion-label item-start>溫控溫度</ion-label>\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <ion-input type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.VEHICLE_TEMP2"\n\n                               (ionFocus)="selectAll($event)"\n\n                               [disabled]="data.IsDisabled"></ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-card>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <button ion-button (click)="register()" [disabled]="data.IsDisabled" block>報到</button>\n\n            <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_11_CheckIn\CheckIn.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _11_CheckIn);
    return _11_CheckIn;
}());

//# sourceMappingURL=CheckIn.js.map

/***/ })

});
//# sourceMappingURL=14.js.map