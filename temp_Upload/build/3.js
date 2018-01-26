webpackJsonp([3],{

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_24_PhotoGalleryModule", function() { return _24_PhotoGalleryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PhotoGallery__ = __webpack_require__(722);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var _24_PhotoGalleryModule = /** @class */ (function () {
    function _24_PhotoGalleryModule() {
    }
    _24_PhotoGalleryModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__PhotoGallery__["a" /* _24_PhotoGallery */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__PhotoGallery__["a" /* _24_PhotoGallery */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__PhotoGallery__["a" /* _24_PhotoGallery */]]
        })
    ], _24_PhotoGalleryModule);
    return _24_PhotoGalleryModule;
}());

//# sourceMappingURL=PhotoGallery.module.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _24_PhotoGallery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ZZ_CommonLib_http_services__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var _24_PhotoGallery = /** @class */ (function () {
    function _24_PhotoGallery(navCtrl, plt, _http_services, alertCtrl) {
        this.navCtrl = navCtrl;
        this.plt = plt;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        //#region Init
        this.data = {
            choice: 'DAS',
            ScanBarcode: '',
            JOBID: '',
            devWidth: 0
        };
        this.Lists = [];
        this.data.devWidth = plt.width();
        console.log('Dev Width' + this.data.devWidth);
    }
    //#endregion
    _24_PhotoGallery.prototype.ngOnInit = function () {
        this.searchPic();
    };
    ;
    _24_PhotoGallery.prototype.searchPic = function () {
        var _this = this;
        this.Lists = [];
        this._http_services.POST('', 'Picture', 'search', [{}])
            .then(function (response) {
            for (var index in response) {
                var value = response[index];
                var value_Description = value.Description;
                _this.Lists.push({
                    FileName: value.FileName,
                    Description: value_Description,
                    showDescription: value_Description.replace(/\<br>/g, "\n"),
                    ThumbnailImage: 'data:image/png;base64,' + value.ThumbnailImage,
                    CreateTime: value.CreateTime,
                    check: false
                });
            }
            console.log(_this.Lists);
        });
    };
    //開啟編輯模式
    _24_PhotoGallery.prototype.showPic = function (item) {
        item.check = !item.check;
        //this._http_services.POST('', 'Picture'
        //    , 'open'
        //    , [{ Name: '@FileName', Value: item.FileName }])
        //    .then((response) => {
        //        console.log(response);
        //    });
    };
    //刪除圖片
    _24_PhotoGallery.prototype.deletePic = function () {
        var _this = this;
        var strPicsList_show = '', strPicsList = [];
        this.Lists.forEach(function (value) {
            if (value.check) {
                strPicsList_show += value.FileName + '<br>';
                strPicsList.push(value.FileName);
            }
        });
        var confirm = this.alertCtrl.create({
            title: '確定要永久刪除勾選的圖片？',
            message: strPicsList_show,
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '確定',
                    handler: function () {
                        _this._http_services.POST('', 'Picture', 'delete', [{ Name: '@FileName', Value: strPicsList }])
                            .then(function () {
                            _this.searchPic();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    //下載圖片
    _24_PhotoGallery.prototype.downloadPic = function (item) {
        this._http_services.POST('', 'Picture', 'download', [{ Name: '@FileName', Value: item.FileName }])
            .then(function () {
        });
    };
    //改變螢幕寬度時觸發
    _24_PhotoGallery.prototype.onResize = function () {
        this.data.devWidth = this.plt.width();
    };
    ;
    //help
    _24_PhotoGallery.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 手機介面瀏覽時，下載功能無法使用<br>'
                + '2. 按下"下載圖案"：瀏覽器會跳出下載視窗<br>'
                + '3. 按下"圖片"：勾選該張圖片，勾選的圖片右上角會有V圖案<br>'
                + '4. 批次刪除：勾選多張圖片後，按下標題列右方的垃圾桶',
            buttons: ['關閉']
        });
        alert.present();
    };
    //喪失focus
    _24_PhotoGallery.prototype.myfocus = function () {
        this.scan_Entry.setFocus();
    };
    ;
    //全選
    _24_PhotoGallery.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //手勢
    _24_PhotoGallery.prototype.swipeEvent = function (event) {
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
    ], _24_PhotoGallery.prototype, "scan_Entry", void 0);
    _24_PhotoGallery = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_24_PhotoGallery\PhotoGallery.html"*/'﻿<ion-header>\n\n    <ion-navbar>\n\n        <ion-title (click)="help()">不良品相簿管理<button small ion-button outline>HELP</button></ion-title>\n\n        <ion-buttons end>\n\n            <button ion-fab mini (click)="deletePic(item)"><ion-icon name="trash"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col *ngFor="let item of Lists" col-4>\n\n                <ion-card>\n\n                    <ion-card-header style="padding:0px 0px 0px 0px;" (click)="showPic(item)">\n\n                        <img [src]="item.ThumbnailImage" />\n\n                    </ion-card-header>\n\n                    <div>\n\n                        <ion-fab right top>\n\n                            <button ion-fab mini [hidden]="!item.check" (click)="showPic(item)"><ion-icon name="checkmark"></ion-icon></button>\n\n                        </ion-fab>\n\n                        <div (window:resize)="onResize()" [hidden]="data.devWidth<480">\n\n                            <label>{{item.FileName}}</label><br />\n\n                            <label style="white-space: pre;color:white">{{item.showDescription}}</label>\n\n\n\n                            <ion-fab right bottom>\n\n                                <button ion-fab mini (click)="downloadPic(item)"><ion-icon name="download"></ion-icon></button>\n\n                            </ion-fab>\n\n                        </div>\n\n                    </div>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_24_PhotoGallery\PhotoGallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], _24_PhotoGallery);
    return _24_PhotoGallery;
}());

//# sourceMappingURL=PhotoGallery.js.map

/***/ })

});
//# sourceMappingURL=3.js.map