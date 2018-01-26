webpackJsonp([2],{

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TEST__ = __webpack_require__(723);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__TEST__["a" /* _99_TEST */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__TEST__["a" /* _99_TEST */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__TEST__["a" /* _99_TEST */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=TEST.module.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _99_TEST; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ZZ_CommonLib_LittleCalculator_LittleCalculator__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_myCAMERA_myCAMERA__ = __webpack_require__(362);
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






var _99_TEST = /** @class */ (function () {
    function _99_TEST(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        localStorage.setItem('USER_ID', '123456');
        localStorage.setItem('BLOCK_NAME', '1樓撿貨區');
    }
    ;
    //呼叫小鍵盤
    _99_TEST.prototype.showCalculator = function () {
        __WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', '123');
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__ZZ_CommonLib_LittleCalculator_LittleCalculator__["a" /* LittleCalculatorPage */]);
        obj.onDidDismiss(function (data) {
            console.log(__WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
        });
        obj.present();
    };
    _99_TEST.prototype.showCamera = function () {
        __WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].set('ListTable_Source', {
            FileDescription: '車號：072\n'
                + 'PO單：PO170826000090\n'
                + 'PO_ID：ID170828000049\n'
                + '呼出碼：211566\n'
                + 'HO_ID：1170726461142\n'
                + 'LOT_ID：2170828000068\n'
                + '品質：不良\n',
            PaperNo: 'PO170826000090'
        });
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__ZZ_CommonLib_myCAMERA_myCAMERA__["a" /* myCAMERAPage */]);
        obj.onDidDismiss(function (data) {
            console.log(__WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
        });
        obj.present();
    };
    _99_TEST.prototype.gallery = function () {
        this.navCtrl.push('_24_PhotoGallery');
    };
    _99_TEST.prototype.myBarcodeUI = function () {
        var obj = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */], { Name: '條碼', Value: '456' });
        obj.onDidDismiss(function (data) {
            console.log(__WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].get('ListTable_answer'));
        });
        obj.present();
    };
    _99_TEST.prototype.RFWAS = function () {
        this.navCtrl.push('_131_WAS_OrderNo');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], _99_TEST.prototype, "scan_Entry", void 0);
    _99_TEST = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_99_TEST\TEST.html"*/'﻿<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>測試網頁</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button outline (click)="showCalculator()">Calculator</button>\n\n                <button ion-button outline (click)="showCamera()">CAMERA</button>\n\n                <button ion-button outline (click)="gallery()">gallery</button>\n\n                <button ion-button outline (click)="RFWAS()">RFWAS</button>\n\n                <button ion-button outline (click)="myBarcodeUI()">myBarcodeUI</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_99_TEST\TEST.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], _99_TEST);
    return _99_TEST;
}());

//# sourceMappingURL=TEST.js.map

/***/ })

});
//# sourceMappingURL=2.js.map