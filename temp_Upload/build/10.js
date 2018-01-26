webpackJsonp([10],{

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemRcv__ = __webpack_require__(712);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__ItemRcv__["a" /* _124_ItemRcv */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__ItemRcv__["a" /* _124_ItemRcv */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__ItemRcv__["a" /* _124_ItemRcv */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=ItemRcv.module.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _124_ItemRcv; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ZZ_CommonLib_LittleCalculator_LittleCalculator__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ZZ_CommonLib_myCAMERA_myCAMERA__ = __webpack_require__(362);
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





var _124_ItemRcv = /** @class */ (function () {
    function _124_ItemRcv(navCtrl, _http_services, alertCtrl, modalCtrl, toastCtrl, vibration) {
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.vibration = vibration;
        this.data = {
            CarNo: localStorage.getItem('CarNo'),
            PaperNo: localStorage.getItem('PaperNo'),
            PaperNo_ID: localStorage.getItem('PaperNo_ID'),
            ItemCode: localStorage.getItem('ItemCode'),
            ITEM_HOID: localStorage.getItem('ITEM_HOID'),
            LOT_ID: localStorage.getItem('LOT_ID'),
            viewColor: '',
            USER_ID: localStorage.getItem('USER_ID'),
            BLOCK_NAME: localStorage.getItem('BLOCK_NAME'),
            IsHideWhenKeyboardOpen: false
        }; // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
        this.answer = {
            QTY: 0,
            WEIGHT: 0.0,
            QualityValue: 1,
            QualityName: '品質',
            QualityList: [],
            QTY_ShowTotal: 0,
            QTY_ProgressBar: ''
        };
        this.result = {
            PO_QTY: '0/0',
            PRICE_TYPE: 0,
            ADDON_QTY: 0,
            ADDON_WT: 0,
            QTY: 0,
            WT: 0,
            NG_QTY: 0,
            NG_WT: 0,
            ROW3: '',
            ROW4: '',
            ROW5: '',
            ROW6: ''
        };
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["h" /* loginCheck */]();
        this.result = JSON.parse(localStorage.getItem('ReceiveResult'));
        this.InitQueryItemState();
        //SHOW 待收百分比
        var QTY = this.result.PO_QTY.split("/");
        this.answer.QTY_ShowTotal = parseInt(QTY[1]);
        this.answer.QTY_ProgressBar = Math.round(this.result.QTY / this.answer.QTY_ShowTotal * 100).toString() + '%';
    }
    _124_ItemRcv.prototype.ionViewDidEnter = function () {
        this.myFocus();
    };
    //覆寫原本退回的動作
    _124_ItemRcv.prototype.ionViewDidLoad = function () {
        this.setBackButtonAction();
    };
    //Method to override the default back button action
    _124_ItemRcv.prototype.setBackButtonAction = function () {
        var _this = this;
        this.navBar.backButtonClick = function () {
            //Write here wherever you wanna do
            _this.Back();
        };
    };
    //進度表
    _124_ItemRcv.prototype.getQTY_ProgressBar = function () {
        return this.answer.QTY_ProgressBar;
    };
    //上一頁
    _124_ItemRcv.prototype.Back = function () {
        this.Unlock();
        this.reset();
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ReceiveResult', this.result);
        this.navCtrl.pop();
    };
    ;
    //重置btn
    _124_ItemRcv.prototype.reset = function () {
        this.data.viewColor = '';
        this.answer.QualityValue = 1;
        this.answer.QualityName = '品質';
        //數量 重量
        this.answer.QTY = 0;
        this.answer.WEIGHT = 0.0;
        this.myFocus();
    };
    ;
    //選擇品質
    _124_ItemRcv.prototype.InitQueryItemState = function () {
        var _this = this;
        this._http_services.POST('', 'sqlcmd', 'Select ID as Value, Name from vDCS_Table_item_State', [])
            .then(function (response) {
            for (var index in response) {
                var value = response[index];
                _this.answer.QualityList.push({ Name: value.Name, Value: value.Value });
            }
            _this.findQualityNameAndColor();
        });
    };
    //品質選擇清單
    _124_ItemRcv.prototype.QueryItemState = function () {
        var _this = this;
        this.vibration.vibrate(100);
        //Multi variables, choose one
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', this.answer.QualityList);
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_ListTable_ListTable__["a" /* ListTablePage */]);
        obj.onDidDismiss(function (data) {
            console.log(__WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
            _this.answer.QualityValue = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer').Value;
            //查表找屬性
            _this.findQualityNameAndColor();
            return;
        });
        obj.present();
    };
    ;
    //查表找屬性和顏色
    _124_ItemRcv.prototype.findQualityNameAndColor = function () {
        var _this = this;
        this.answer.QualityList.forEach(function (value) {
            if (value.Value == _this.answer.QualityValue)
                _this.answer.QualityName = value.Name;
        });
        switch (this.answer.QualityValue) {
            case 0:
                this.data.viewColor = '#79FF79';
                break;
            case 1:
                this.data.viewColor = 'black';
                break;
            default:
                this.data.viewColor = '#FF5151';
                break;
        }
    };
    ;
    //呼叫小鍵盤
    _124_ItemRcv.prototype.showCalculator = function (flag) {
        var _this = this;
        this.vibration.vibrate(100);
        switch (flag) {
            case 'QTY':
                __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', this.answer.QTY);
                break;
            case 'WEIGHT':
                __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', this.answer.WEIGHT);
                break;
            default:
                return;
        }
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__ZZ_CommonLib_LittleCalculator_LittleCalculator__["a" /* LittleCalculatorPage */]);
        obj.onDidDismiss(function (data) {
            console.log(__WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
            switch (flag) {
                case 'QTY':
                    _this.answer.QTY = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
                    break;
                case 'WEIGHT':
                    _this.answer.WEIGHT = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_answer');
                    break;
                default:
                    return;
            }
        });
        obj.present();
    };
    //驗收
    _124_ItemRcv.prototype.Receive = function () {
        var _this = this;
        this.vibration.vibrate(100);
        var ErrMsg = '';
        //#region 檢查
        if (this.answer.QTY == 0) {
            ErrMsg += "數量欄位尚未輸入 ";
        }
        if (this.result.PRICE_TYPE == 0 && this.answer.WEIGHT == 0) {
            ErrMsg += "秤重欄位尚未輸入 ";
        }
        if (ErrMsg.length > 0) {
            //Error
            this.toastCtrl.create({
                message: ErrMsg,
                duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                position: 'middle'
            }).present();
            this.myFocus2();
            return;
        }
        //#endregion
        if (this.answer.QTY < 0 || this.answer.WEIGHT < 0) {
            if (this.answer.QTY < 0) {
                ErrMsg = '數量 ' + this.answer.QTY.toString() + ' 小於零，將會執行減量<br/>'
                    + '請確認是否輸入正確？';
            }
            if (this.answer.WEIGHT < 0) {
                ErrMsg = '重量 ' + this.answer.WEIGHT.toString() + ' 小於零，將會執行減量<br/>'
                    + '請確認是否輸入正確？';
            }
            this.alertCtrl.create({
                title: '提示 減量',
                subTitle: ErrMsg,
                buttons: [{
                        text: '取消',
                        handler: function () {
                            return;
                        }
                    },
                    {
                        text: '確定'
                    }
                ]
            }).present();
        }
        //驗收
        this._http_services.POST('', 'sp', 'spactDCS_ID_LINE', [
            { Name: '@JOB_ID', Value: '3' },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@ITEM', Value: this.data.LOT_ID },
            { Name: '@STATE_TYPE', Value: this.answer.QualityValue },
            { Name: '@QTY', Value: this.answer.QTY },
            { Name: '@WT', Value: this.answer.WEIGHT },
            { Name: '@USER_ID', Value: this.data.USER_ID }
        ])
            .then(function (response) {
            if (response != '') {
                switch (response[0].RT_CODE) {
                    case 0:
                        //更新顯示
                        _this.result.ADDON_QTY = response[0].ADDON_QTY;
                        _this.result.ADDON_WT = response[0].ADDON_WT;
                        _this.result.QTY = response[0].QTY;
                        _this.result.WT = response[0].WT;
                        _this.result.NG_QTY = response[0].NG_QTY;
                        _this.result.NG_WT = response[0].NG_WT;
                        _this.result.ROW3 = response[0].ROW3;
                        _this.result.ROW4 = response[0].ROW4;
                        _this.result.ROW5 = response[0].ROW5;
                        _this.result.ROW6 = response[0].ROW6;
                        _this.answer.QTY_ProgressBar = Math.round(_this.result.QTY / _this.answer.QTY_ShowTotal * 100).toString() + '%';
                        //reset
                        _this.reset();
                        _this.toastCtrl.create({
                            message: response[0].RT_MSG,
                            duration: __WEBPACK_IMPORTED_MODULE_3__app_Settings__["e" /* Set_timeout */],
                            position: 'bottom'
                        }).present();
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
        });
        this.myFocus();
    };
    ;
    //解鎖
    _124_ItemRcv.prototype.Unlock = function () {
        this._http_services.POST('', 'sp', 'spactDCS_ID_LINE', [
            { Name: '@JOB_ID', Value: '4' },
            { Name: '@ID', Value: this.data.PaperNo_ID },
            { Name: '@ITEM', Value: this.data.LOT_ID },
            { Name: '@USER_ID', Value: this.data.USER_ID }
        ]);
    };
    ;
    //拍照上傳
    _124_ItemRcv.prototype.showCamera = function () {
        this.vibration.vibrate(100);
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', {
            FileDescription: '車號：' + this.data.CarNo + '\n'
                + 'PO單：' + this.data.PaperNo + '\n'
                + 'PO_ID：' + this.data.PaperNo_ID + '\n'
                + '呼出碼：' + this.data.ItemCode + '\n'
                + 'HO_ID：' + this.data.ITEM_HOID + '\n'
                + 'LOT_ID：' + this.data.LOT_ID + '\n'
                + '品質：' + this.answer.QualityName + '\n',
            PaperNo: this.data.PaperNo
        });
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__ZZ_CommonLib_myCAMERA_myCAMERA__["a" /* myCAMERAPage */]);
        obj.present();
    };
    //喪失focus
    _124_ItemRcv.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    _124_ItemRcv.prototype.myFocus2 = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry2.setFocus();
        }, 300);
    };
    ;
    //全選
    _124_ItemRcv.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _124_ItemRcv.prototype.swipeEvent = function (event) {
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                break;
            case 4://RIGHT
                this.Back();
                break;
            case 8://UP
                break;
            case 16://DOWN
                break;
        }
        ;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Navbar */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Navbar */])
    ], _124_ItemRcv.prototype, "navBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], _124_ItemRcv.prototype, "scan_Entry", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry2'),
        __metadata("design:type", Object)
    ], _124_ItemRcv.prototype, "scan_Entry2", void 0);
    _124_ItemRcv = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\4_ItemRcv\ItemRcv.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>進貨驗收</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-card>\n\n        <ion-grid class="mylist">\n\n            <ion-row align-items-center>\n\n                <ion-col col-3>\n\n                    <ion-label>{{result.UNIT}}</ion-label>\n\n                </ion-col>\n\n                <ion-col col-7>\n\n                    <ion-input #scan_Entry type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.QTY"\n\n                               (ionFocus)="selectAll($event)"></ion-input>\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <!--小鍵盤-->\n\n                    <button ion-button outline icon-only (click)="showCalculator(\'QTY\')">\n\n                        <ion-icon name="calculator"></ion-icon>\n\n                    </button>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center [hidden]="result.PRICE_TYPE==1">\n\n                <ion-col col-3>\n\n                    <ion-label>秤重(kg)</ion-label>\n\n                </ion-col>\n\n                <ion-col col-7>\n\n                    <ion-input #scan_Entry2 type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="answer.WEIGHT"\n\n                               (ionFocus)="selectAll($event)"></ion-input>\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <!--小鍵盤-->\n\n                    <button ion-button outline icon-only (click)="showCalculator(\'WEIGHT\')">\n\n                        <ion-icon name="calculator"></ion-icon>\n\n                    </button>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row align-items-center>\n\n                <ion-col col-3>\n\n                    <label>品質</label>\n\n                </ion-col>\n\n                <ion-col col-7>\n\n                    <button ion-button block solid\n\n                            color="light"\n\n                            [ngStyle]="{\'color\': data.viewColor}"\n\n                            (click)="QueryItemState()">\n\n                        {{answer.QualityName}}\n\n                    </button>\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <button ion-button outline icon-only (click)="showCamera()">\n\n                        <ion-icon name="camera"></ion-icon>\n\n                    </button>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW1}}</ion-label>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW2}}</ion-label>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-8>\n\n                    <label>{{result.ROW3}}</label>\n\n                </ion-col>\n\n                <ion-col col-4>\n\n                    <div class="myProgressBar">\n\n                        <div class="loader" [ngStyle]="{\'width\': answer.QTY_ProgressBar}">\n\n                            <p class="percent">{{this.answer.QTY_ProgressBar}}</p>\n\n                        </div>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-label>{{result.ROW4}}</ion-label>\n\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-item>\n\n            <!--IonicPage+div+hidden會導致Ionic排版錯誤，故意多加兩行空白-->\n\n            <h1>&nbsp;</h1><br />\n\n            <h1>&nbsp;</h1>\n\n        </ion-item>\n\n    </ion-card>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <ion-item>\n\n                <ion-label>{{result.ROW5}}</ion-label>\n\n                <ion-label>{{result.ROW6}}</ion-label>\n\n                <ion-label>{{result.ROW7}}</ion-label>\n\n            </ion-item>\n\n        </ion-toolbar>\n\n        <ion-toolbar>\n\n            <button ion-button icon-start solid full (click)="Receive()" color="primary">\n\n                <ion-icon name="checkmark"></ion-icon>\n\n                驗收\n\n            </button>\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_12_ItemRcv\4_ItemRcv\ItemRcv.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], _124_ItemRcv);
    return _124_ItemRcv;
}());

//# sourceMappingURL=ItemRcv.js.map

/***/ })

});
//# sourceMappingURL=10.js.map