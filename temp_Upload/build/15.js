webpackJsonp([15],{

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Menu__ = __webpack_require__(708);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__Menu__["a" /* _02_Menu */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__Menu__["a" /* _02_Menu */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__Menu__["a" /* _02_Menu */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=Menu.module.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _02_Menu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Settings__ = __webpack_require__(33);
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




var _02_Menu = /** @class */ (function () {
    function _02_Menu(navCtrl, navParams, _http_services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._http_services = _http_services;
        this.Lists = [{}];
        this.data = { Caption: '', OP_TYPE: '', BLOCK_ID: '', BLOCK_NAME: '', isButtonDisabled: false };
        this.data.Caption = navParams.get('Title');
        this.data.OP_TYPE = navParams.get('OP_TYPE');
        this.data.BLOCK_ID = navParams.get('BLOCK_ID');
        this.data.BLOCK_NAME = navParams.get('BLOCK_NAME');
        __WEBPACK_IMPORTED_MODULE_2__app_Settings__["h" /* loginCheck */]();
        this.queryMENUS();
    }
    _02_Menu.prototype.queryMENUS = function () {
        var _this = this;
        var sql_cmd = "[ui].[spDCS_RF_MENU]";
        this._http_services.POST('', 'sp', sql_cmd, [
            { Name: '@MODE', Value: '2' },
            { Name: '@OP_TYPE', Value: this.data.OP_TYPE },
            { Name: '@MENUID', Value: this.data.BLOCK_ID }
        ])
            .then(function (response) {
            if (response) {
                _this.Lists = response;
            }
        });
    };
    _02_Menu.prototype.menuClicked = function (item) {
        var _this = this;
        //���T���ϥΫ��s
        this.data.isButtonDisabled = true;
        //Menu
        switch (item.URL) {
            case '':
                this.navCtrl.push('_02_Menu', {
                    Title: item.Caption,
                    BLOCK_ID: item.MENUID,
                    BLOCK_NAME: this.data.BLOCK_NAME,
                    OP_TYPE: this.data.OP_TYPE
                });
                break;
            case 'BACK':
                this.navCtrl.pop();
                break;
            default:
                //link to other page
                this.navCtrl.push(item.URL);
        }
        //����������
        setTimeout(function () {
            _this.data.isButtonDisabled = false;
        }, 2000);
    };
    _02_Menu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_02_Menu\Menu.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{data.Caption}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-list class="mylist">\n\n        <button ion-button\n\n                *ngFor="let item of Lists"\n\n                (click)="menuClicked(item)"\n\n                class="btn_list"\n\n                color="dark"\n\n                [disabled]="data.isButtonDisabled"\n\n                large block>\n\n            {{item.Caption}}\n\n        </button>\n\n    </ion-list>\n\n</ion-content>\n\n<ion-footer>\n\n    <ion-toolbar>\n\n        <ion-label class="bottom_BLOCK">區域：{{data.BLOCK_NAME}}</ion-label>\n\n    </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_02_Menu\Menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ZZ_CommonLib_http_services__["a" /* http_services */]])
    ], _02_Menu);
    return _02_Menu;
}());

//# sourceMappingURL=Menu.js.map

/***/ })

});
//# sourceMappingURL=15.js.map