webpackJsonp([17],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_update__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__00_Login_Login__ = __webpack_require__(357);
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


var UpdateApp = /** @class */ (function () {
    function UpdateApp(platform, navparams, navCtrl, loadingCtrl, alertCtrl, toastCtrl, appUpdate) {
        this.platform = platform;
        this.navparams = navparams;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.appUpdate = appUpdate;
        this.data = {
            NeedUpdateApk: false //通過自動更新 true:未更新 false:免更新
            ,
            checkStatus0: 'danger',
            checkStatus1: 'danger',
            checkStatus2: false,
            WebVersion: '',
            ApkVersion: '',
            ErrorTitle: '',
            ErrorMessage: ''
        };
        //#region 檢查更新 hot code push
        this.myloadingCtrl = this.loadingCtrl.create({
            content: "檢查網頁更新中...",
        });
        this.initialApp();
    }
    UpdateApp.prototype.initialApp = function () {
        var _this = this;
        this.data.ErrorTitle = '開始更新';
        this.data.ErrorMessage = '';
        this.data.checkStatus0 = 'danger';
        this.data.checkStatus1 = 'secondary';
        this.data.checkStatus2 = false;
        if (this.platform.is('core')) {
            this.data.checkStatus0 = 'secondary';
            this.data.checkStatus1 = 'secondary';
            this.hotcodepush_ChangeFlag();
            return;
        }
        this.platform.ready()
            .then(function (response) { _this.checkUpdate(); });
    };
    UpdateApp.prototype.gotoMain = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__00_Login_Login__["a" /* _00_Login */]);
    };
    UpdateApp.prototype.hotCodePush = function () {
        this.myloadingCtrl.present();
        window["thisRef"] = this;
        chcp.fetchUpdate(this.updateCallback);
        chcp.getVersionInfo(this.InfoCallback);
    };
    UpdateApp.prototype.updateCallback = function (error, data) {
        if (error) {
            switch (error.code) {
                case 2:
                    console.log('Web ' + error.description);
                    window["thisRef"].data.ErrorTitle = 'Web更新完畢';
                    window["thisRef"].data.checkStatus1 = 'secondary';
                    window["thisRef"].hotcodepush_ChangeFlag();
                    break;
                default:
                    window["thisRef"].data.ErrorTitle = 'Web更新失敗';
                    window["thisRef"].data.ErrorMessage = error.description;
                    console.error(error);
                    break;
            }
        }
        else {
            // 进度
            var progress = parseFloat(data.progress);
            console.log(data);
            if (progress == 1.0) {
                chcp.installUpdate();
            }
            console.log('Web Update is Loading ');
            window["thisRef"].data.ErrorTitle = 'Web正在更新';
            var myalert = window["thisRef"].alertCtrl.create({
                title: '準備下載 Web 更新',
                buttons: ['關閉']
            });
            myalert.onDidDismiss(function (response) {
                chcp.installUpdate(function (error) {
                    if (error) {
                        console.error(error);
                        window["thisRef"].data.ErrorTitle = 'Web更新失敗';
                        window["thisRef"].data.ErrorMessage = error.code;
                    }
                    else {
                        console.log('Web Update Finished ');
                        window["thisRef"].data.ErrorTitle = 'Web更新完畢';
                        window["thisRef"].data.checkStatus1 = 'secondary';
                        window["thisRef"].hotcodepush_ChangeFlag();
                    }
                });
            });
            myalert.present();
        }
    };
    UpdateApp.prototype.InfoCallback = function (err, data) {
        window["thisRef"].data.WebVersion = data.currentWebVersion;
        window["thisRef"].data.ApkVersion = data.appVersion;
    };
    UpdateApp.prototype.hotcodepush_ChangeFlag = function () {
        var _this = this;
        this.myloadingCtrl.dismiss();
        console.log('Check Finish Apk:' + this.data.checkStatus0 + ' Web:' + this.data.checkStatus1);
        //沒有做到同步處理, 無法檢查web 更新狀況
        if (this.data.checkStatus0 == 'secondary') {
            this.data.checkStatus2 = true;
            var toast = this.toastCtrl.create({
                message: '更新完畢，自動進入登入畫面',
                duration: 1000,
                position: 'middle'
            });
            toast.onDidDismiss(function (response) {
                _this.gotoMain();
            });
            toast.present();
        }
    };
    //#endregion
    //#region 檢查更新 Full apk
    UpdateApp.prototype.checkUpdate = function () {
        var _this = this;
        console.log('Apk Update is Loading ');
        var updateUrl = 'http://' + __WEBPACK_IMPORTED_MODULE_3__app_Settings__["c" /* Global_Server */] + '/Version/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl)
            .then(function (response) {
            var ErrMsg = '';
            switch (response.code) {
                case 201://need update
                    break;
                case 202://No need to update
                    console.log('Apk No Need to update ');
                    _this.data.ErrorTitle = '更新完畢';
                    _this.data.checkStatus0 = 'secondary';
                    break;
                case 203://version is updating
                    break;
                case 301:
                case 302:
                    ErrMsg = '檢查更新文件錯誤';
                    break;
                case 404:
                case 405:
                    ErrMsg = '網路錯誤';
                    break;
                default:
                    ErrMsg = '未知錯誤';
                    break;
            }
            ;
            if (ErrMsg != '') {
                _this.data.ErrorTitle = '檢查更新出錯';
                _this.data.ErrorMessage = ErrMsg;
            }
        })
            .then(function (response) {
            _this.hotCodePush();
        });
        ;
    };
    UpdateApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\UpdateApp\UpdateApp.html"*/'<ion-content>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <button [color]="data.checkStatus0" (click)="initialApp()" ion-button block>更新 Apk</button>\n\n            <button [color]="data.checkStatus1" (click)="initialApp()" ion-button block>更新 Web</button>\n\n            <button [disabled]="!data.checkStatus2" ion-button (click)="gotoMain()" block>進入RF</button>\n\n        </ion-row>\n\n        <ion-row>\n\n            {{data.ErrorTitle}}\n\n        </ion-row>\n\n        <ion-row>\n\n            {{data.ErrorMessage}}\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n<ion-footer no-border>\n\n    <ion-toolbar>\n\n        <ion-buttons end>\n\n            <span style="color:white">Web:{{data.WebVersion}}<br /> Apk:{{data.ApkVersion}}</span>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\UpdateApp\UpdateApp.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_update__["a" /* AppUpdate */]])
    ], UpdateApp);
    return UpdateApp;
}());

//# sourceMappingURL=UpdateApp.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/_01_Zone/Zone.module": [
		687,
		16
	],
	"../pages/_02_Menu/Menu.module": [
		688,
		15
	],
	"../pages/_11_CheckIn/CheckIn.module": [
		689,
		14
	],
	"../pages/_12_ItemRcv/1_CarNo/CarNo.module": [
		690,
		13
	],
	"../pages/_12_ItemRcv/2_PaperNo/PaperNo.module": [
		691,
		12
	],
	"../pages/_12_ItemRcv/3_ItemCode/ItemCode.module": [
		693,
		11
	],
	"../pages/_12_ItemRcv/4_ItemRcv/ItemRcv.module": [
		692,
		10
	],
	"../pages/_13_WAS/1_OrderNo/OrderNo.module": [
		694,
		9
	],
	"../pages/_13_WAS/2_Item/Item.module": [
		695,
		1
	],
	"../pages/_13_WAS/31_StoreChgAmount/StoreChgAmount.module": [
		697,
		8
	],
	"../pages/_13_WAS/3_Store/Store.module": [
		696,
		7
	],
	"../pages/_13_WAS/4_Receive/Receive.module": [
		698,
		6
	],
	"../pages/_21_BasketList/BasketList.module": [
		699,
		0
	],
	"../pages/_22_PrintPickingLabel/PrintPickingLabel.module": [
		700,
		5
	],
	"../pages/_23_PrintLogisticLabel/PrintLogisticLabel.module": [
		701,
		4
	],
	"../pages/_24_PhotoGallery/PhotoGallery.module": [
		702,
		3
	],
	"../pages/_99_TEST/TEST.module": [
		703,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 208;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Global_Server; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Set_timeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DefaultServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ShowLoadingWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Changelog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ProgParameters; });
/* harmony export (immutable) */ __webpack_exports__["h"] = loginCheck;
/* harmony export (immutable) */ __webpack_exports__["g"] = keyCodeToValue;
//宣告全域變數
//連結伺服器
//網址
//export const Global_Server = 'localhost:1793';
//export const Global_Server = 'localhost/RF_DB';
var Global_Server = '172.20.20.11/RF_DB';
var Set_timeout = 1500;
var DefaultServer = "DCStest";
var ShowLoadingWindow = false;
var Changelog = ''
    + '\n18.01.25:'
    + '\n 1.新增功能 RFWAS'
    + '\n 2.新增硬體功能hot code push'
    + '\n 3.變更條碼讀取方式, 現在有android鍵盤與條碼專用兩種'
    + '\n 4.移除NFC自動登入, 但保留NFC硬體需求給未來使用'
    + '\n'
    + '\n17.12.13:'
    + '\n 1.登入步驟變更，登入->選區域->功能選單'
    + '\n 2.自動更新app 目前可相容android 7.0'
    + '\n'
    + '\n17.09.19:'
    + '\n 1.新增功能，物流標籤補印，路徑：測試功能=>物流標籤補印'
    + '\n'
    + '\n17.09.01:'
    + '\n 1.加入自動更新功能，如果跳出更新程式請同意下載更新'
    + '\n 2."_21_籃明細"加入掃到錯誤的條碼，會短暫震動5次'
    + '\n 3."_00_登入"加入NFC感應，用員工證就能直接登入'
    + '\n 4."_124_進貨驗收"加入拍照，拍照後立即上傳至雲端主機'
    + '\n'
    + '\n17.08.09:'
    + '\n 1."_124_進貨驗收"加入小鍵盤'
    + '\n 2."_123_呼出碼查詢"效期加上提示輸入內容'
    + '\n 3.顏色會改變了，請回饋心得'
    + '\n 4.各頁面的抬頭點一下，可以知道目前的作業資訊(回報資訊問題使用)'
    + '\n'
    + '\n17.08.07:'
    + '\n 1."_121_報到牌""_122_進貨單查詢"可以查詢驗收明細'
    + '\n 2."_123_呼出碼查詢"加速模糊搜尋商品條碼的速度';
//程式作用的變數
var ProgParameters = {
    params: [],
    set: function (name, value) {
        this.params.push({ Name: name, Value: value });
    },
    get: function (name) {
        var object = undefined;
        this.params.forEach(function (value) {
            if (value.Name == name)
                object = value.Value;
        });
        return object;
    }
};
//登入檢查
function loginCheck() {
    var UserID = localStorage.getItem('USER_ID');
    if (UserID == undefined)
        location.href = '/';
}
//keycode 回傳 string
function keyCodeToValue(keycode, ParentObject) {
    var returnStr = '';
    //根據keycode判別字串
    if (96 <= keycode && keycode <= 105) {
        returnStr = String.fromCharCode(keycode - 48);
    }
    else {
        switch (keycode) {
            case 9: //Tab
            case 13://Enter
                returnStr = 'ENTER';
                break;
            case 8:
            case 46:
                returnStr = 'DELETE';
                break;
            default:
                returnStr = String.fromCharCode(keycode);
        }
    }
    //決定字串回傳類型
    switch (returnStr) {
        case 'ENTER':
            ParentObject += returnStr;
            break;
        case 'DELETE':
            ParentObject = ParentObject.substr(0, ParentObject.length - 1);
            break;
        default:
            ParentObject += returnStr;
            break;
    }
    return ParentObject;
}
//# sourceMappingURL=Settings.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _00_Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_nfc__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UpdateApp_UpdateApp__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(356);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular, Ionic


//Cordova


//My Pages




var _00_Login = /** @class */ (function () {
    function _00_Login(platform, navCtrl, _http_services, alertCtrl, loadingCtrl, keyboard, nfc, file) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this._http_services = _http_services;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.keyboard = keyboard;
        this.nfc = nfc;
        this.file = file;
        this.data = {
            IsHideWhenKeyboardOpen: false,
            Changelog: __WEBPACK_IMPORTED_MODULE_4__app_Settings__["a" /* Changelog */],
            username: '123456',
            password: '111',
            IsNFC_ON: false //NFC有開啟    true:NFC開啟 false:NFC關閉
            ,
            DCS_log_show: true,
            DCS_log_show_btnName: '顯示改版歷程',
            Iskeyin_OK: true
        };
        this.initializeApp();
    }
    _00_Login.prototype.initializeApp = function () {
        var _this = this;
        if (this.platform.is('core')) {
            console.log("You're develop in the browser. NO NFC,update");
            return;
        }
        this.platform.ready()
            .then(function () {
            _this.myNFC();
        })
            .then(function () {
            _this.keyboard.onKeyboardShow().subscribe(function () { _this.data.IsHideWhenKeyboardOpen = true; });
            _this.keyboard.onKeyboardHide().subscribe(function () { _this.data.IsHideWhenKeyboardOpen = false; });
        });
    };
    //進入頁面
    _00_Login.prototype.ionViewWillEnter = function () {
        this.myFocus();
        localStorage.clear();
    };
    //離開頁面
    _00_Login.prototype.ionViewWillLeave = function () {
        // Unregister the custom back button action for this page
        // this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    };
    _00_Login.prototype.initializeBackButtonCustomHandler = function () {
        var _this = this;
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function () {
            _this.disableHardwareCallbackAction();
        }, 10);
    };
    _00_Login.prototype.disableHardwareCallbackAction = function () {
        //let toast = this.toastCtrl.create({
        //    message: '返回在登入頁面無法使用',
        //    duration: myGlobals.Set_timeout,
        //    position: 'bottom'
        //});
        //toast.present();
    };
    ;
    //#endregion
    //登入
    _00_Login.prototype.login = function () {
        var _this = this;
        this._http_services.POST('', 'sp', '[ui].[spDCS_LOGIN]', [{ Name: '@ID', Value: this.data.username },
            { Name: '@PASSWORD', Value: this.data.password },
            { Name: '@TYPE', Value: 0 }
        ])
            .then(function (response) {
            if (response) {
                switch (response[0].RTN_CODE) {
                    case 0:
                        localStorage.setItem('USER_ID', _this.data.username);
                        _this.navCtrl.push('_01_Zone');
                        break;
                    default:
                        var alert_1 = _this.alertCtrl.create({
                            title: '錯誤代號：' + response[0].RTN_CODE,
                            subTitle: response[0].RTN_MSG,
                            buttons: ['關閉']
                        });
                        alert_1.present();
                }
            }
        });
    };
    //全選
    _00_Login.prototype.selectAll = function ($event) {
        $event._native.nativeElement.select();
    };
    //喪失focus
    _00_Login.prototype.myFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.scan_Entry.setFocus();
        }, 300);
    };
    ;
    _00_Login.prototype.myKeylogger = function (event) {
        var obj = __WEBPACK_IMPORTED_MODULE_4__app_Settings__["g" /* keyCodeToValue */](event.keyCode, this.data.username);
        if (obj.indexOf('ENTER') >= 0) {
            this.login();
        }
    };
    //進入測試網頁
    _00_Login.prototype.gotoTest = function () {
        this.navCtrl.push('_99_TEST');
    };
    //回傳下載路徑
    _00_Login.prototype.getDownloadURL = function () {
        return 'http://' + __WEBPACK_IMPORTED_MODULE_4__app_Settings__["c" /* Global_Server */] + '/Version/SMDRF_WG.apk';
    };
    //帳號密碼長度
    _00_Login.prototype.checkLength = function () {
        if (this.data.username.length > 0 && this.data.password.length > 0)
            this.data.Iskeyin_OK = true;
    };
    //#region NFC
    _00_Login.prototype.myNFC = function () {
        var _this = this;
        //NFC感應
        this.nfc.addTagDiscoveredListener(function () {
            console.log('successfully attached TagDiscovered listener');
            _this.data.IsNFC_ON = true;
        }, function (err) {
            console.log('error attaching ndef listener', err);
        }).subscribe(function (event) {
            console.log('received ndef message. the tag contains: ', event.tag);
            console.log('decoded tag id', _this.nfc.bytesToHexString(event.tag.id));
            _this.data.username = _this.nfc.bytesToHexString(event.tag.id);
            _this.login();
            //分享訊息
            //let message = this.ndef.textRecord('Hello world');
            //this.nfc.share([message]).then(onSuccess).catch(onError);
        });
    };
    _00_Login.prototype.checkNFCreturnColor = function () {
        if (this.data.IsNFC_ON == true) {
            return 'secondary';
        }
        else {
            return 'dark';
        }
    };
    //#endregion
    //變更log區塊高度
    _00_Login.prototype.showDCS_log = function () {
        if (this.data.DCS_log_show) {
            this.data.DCS_log_show = false;
            this.data.DCS_log_show_btnName = "不顯示改版歷程";
        }
        else {
            this.data.DCS_log_show = true;
            this.data.DCS_log_show_btnName = "顯示改版歷程";
        }
    };
    //重新更新
    _00_Login.prototype.gotoUpdateApp = function () {
        if (!this.platform.is('core')) {
            var path = this.file.dataDirectory + 'cordova-hot-code-push-plugin/';
            console.log(path);
            //console.log(this.file.listDir(path, 'cordova-hot-code-push-plugin'));
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__UpdateApp_UpdateApp__["a" /* UpdateApp */], { UpdateApp: true });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], _00_Login.prototype, "scan_Entry", void 0);
    _00_Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_00_Login\Login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>五股善美的RF驗收</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <img class="myimg" src="assets/imgs/ionic.png" />\n\n    <ion-grid>\n\n        <div id="div_login" [hidden]="data.NeedUpdateApk">\n\n            <ion-row align-items-center>\n\n                <ion-col col-3><span style="font-size: large">帳號</span></ion-col>\n\n                <ion-col col-9>\n\n                    <ion-input #scan_Entry type="number"\n\n                               [ngClass]="[\'myScanBarcodeUI_input\']"\n\n                               [(ngModel)]="data.username"\n\n                               (keyup)="myKeylogger($event)"\n\n                               (keydown.Tab)="myKeylogger($event)"\n\n                               (ionFocus)="selectAll($event)"\n\n                               placeholder="工號">\n\n                    </ion-input>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <button ion-button block \n\n                        [disabled]="!data.Iskeyin_OK" \n\n                        color="primary" \n\n                        (click)="login()" >登入</button>\n\n            </ion-row>\n\n        </div>\n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button (click)="showDCS_log()" outline>\n\n                    {{data.DCS_log_show_btnName}}\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <div id="DCS_log" [hidden]="data.DCS_log_show">\n\n                <p style="white-space: pre;color:white">{{data.Changelog}}</p>\n\n            </div>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n<div [hidden]="data.IsHideWhenKeyboardOpen">\n\n    <ion-footer no-border>\n\n        <ion-toolbar>\n\n            <button small ion-button outline (click)="gotoTest()">test</button>\n\n            <button small ion-button outline>\n\n                <a [href]="getDownloadURL()">APK</a>\n\n            </button>\n\n            <button small ion-button outline icon-only (click)="gotoUpdateApp()">\n\n                <ion-icon name="refresh"></ion-icon>\n\n            </button>\n\n            <!--<button small ion-button outline [color]="checkNFCreturnColor()" [disabled]="true">NFC</button>-->\n\n        </ion-toolbar>\n\n    </ion-footer>\n\n</div>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_00_Login\Login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_nfc__["a" /* NFC */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
    ], _00_Login);
    return _00_Login;
}());

//# sourceMappingURL=Login.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LittleKeyPad; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
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

var LittleKeyPad = /** @class */ (function () {
    function LittleKeyPad(viewCtrl, params, vibration) {
        this.viewCtrl = viewCtrl;
        this.vibration = vibration;
        this.log = '';
        this.data = { Name: '條碼', ScanBarcode: '123' };
        this.data.Name = params.get('Name');
        this.data.ScanBarcode = params.get('Value');
    }
    LittleKeyPad.prototype.search = function () {
        __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_answer', this.data.ScanBarcode);
        this.viewCtrl.dismiss();
    };
    LittleKeyPad.prototype.reset = function () {
        this.data.ScanBarcode = '';
    };
    LittleKeyPad.prototype.click = function (word) {
        this.vibration.vibrate(100);
        switch (word) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                this.data.ScanBarcode += word;
                break;
            case 'DEL':
                this.data.ScanBarcode = this.data.ScanBarcode.substr(0, this.data.ScanBarcode.length - 1);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scan_Entry'),
        __metadata("design:type", Object)
    ], LittleKeyPad.prototype, "scan_Entry", void 0);
    LittleKeyPad = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\LittleKeyPad\LittleKeyPad.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-title>{{data.Name}}</ion-title>\n\n\n\n        <ion-buttons end>\n\n            <button ion-button (click)="search()" color="danger" solid>DONE</button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="Calculator_Content">\n\n        <ion-row align-items-center>\n\n            <ion-col><button ion-button outline block class="Calculator_Result">{{data.ScanBarcode}}</button></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col><button ion-button full (click)="click(\'7\')">7</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'8\')">8</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'9\')">9</button></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col><button ion-button full (click)="click(\'4\')">4</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'5\')">5</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'6\')">6</button></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col><button ion-button full (click)="click(\'1\')">1</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'2\')">2</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'3\')">3</button></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col><button ion-button full (click)="click(\'DEL\')"><ion-icon name="backspace"></ion-icon></button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'0\')">0</button></ion-col>\n\n            <ion-col><button ion-button full (click)="click(\'.\')">.</button></ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\LittleKeyPad\LittleKeyPad.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], LittleKeyPad);
    return LittleKeyPad;
}());

//# sourceMappingURL=LittleKeyPad.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTablePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
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

var ListTablePage = /** @class */ (function () {
    function ListTablePage(viewCtrl, vibration) {
        this.viewCtrl = viewCtrl;
        this.vibration = vibration;
        this.Lists = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_Source');
    }
    ListTablePage.prototype.choose = function (item) {
        this.vibration.vibrate(100);
        if (item == '')
            __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_answer', { Name: '', Value: '' });
        else
            __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_answer', item);
        this.viewCtrl.dismiss();
    };
    //����
    ListTablePage.prototype.swipeEvent = function (event) {
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                this.choose(this.Lists[0]);
                break;
            case 4://RIGHT
                this.choose(this.Lists[0]);
                break;
            case 8://UP
                break;
            case 16://DOWN
                break;
        }
        ;
    };
    ListTablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\ListTable\ListTable.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-buttons left>\n\n            <button ion-button (click)="choose(\'\')">返回</button>\n\n        </ion-buttons>\n\n        <ion-title>選擇一個選項</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-list>\n\n        <button ion-button large full\n\n                *ngFor="let obj of Lists"\n\n                class="btn_list"\n\n                color="dark"\n\n                (click)="choose(obj)">\n\n            {{obj.Name}}\n\n        </button>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\ListTable\ListTable.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], ListTablePage);
    return ListTablePage;
}());

//# sourceMappingURL=ListTable.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaperDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Settings__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaperDetailPage = /** @class */ (function () {
    function PaperDetailPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.Lists = __WEBPACK_IMPORTED_MODULE_2__app_Settings__["d" /* ProgParameters */].get('ListTable_Source');
    }
    PaperDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    //����
    PaperDetailPage.prototype.swipeEvent = function (event) {
        switch (event.direction) {
            case 1://NONE
                break;
            case 2://LEFT
                this.dismiss();
                break;
            case 4://RIGHT
                this.dismiss();
                break;
            case 8://UP
                break;
            case 16://DOWN
                break;
        }
        ;
    };
    PaperDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\PaperDetail\PaperDetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-buttons left>\n\n            <button ion-button (click)="dismiss()">返回</button>\n\n        </ion-buttons>\n\n        <ion-title>清單</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content (swipe)="swipeEvent($event)">\n\n    <ion-grid class="mytable">\n\n        <ion-row class="mytable_Head">\n\n            <ion-col col-2>狀態</ion-col>\n\n            <ion-col col-6>品項</ion-col>\n\n            <ion-col col-2>訂量</ion-col>\n\n            <ion-col col-2>驗量</ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let ListItem of Lists" class="mytable_Detail" style=\'{color:{{ListItem.UIColor}}}\'>\n\n                <ion-col col-2> {{ListItem.UISt}}</ion-col>\n\n                <ion-col col-6> {{ListItem.ITEM_ID}} {{ListItem.NAME}}</ion-col>\n\n                <ion-col col-2> {{ListItem.PO_QTY}}</ion-col>\n\n                <ion-col col-2> {{ListItem.QTY}}</ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\PaperDetail\PaperDetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], PaperDetailPage);
    return PaperDetailPage;
}());

//# sourceMappingURL=PaperDetail.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LittleCalculatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Settings__ = __webpack_require__(33);
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

var LittleCalculatorPage = /** @class */ (function () {
    function LittleCalculatorPage(viewCtrl, vibration) {
        this.viewCtrl = viewCtrl;
        this.vibration = vibration;
        //計算過程使用
        this.oldNum = 0;
        this.newNum = 0;
        this.lastClickChar = '=';
        this.log = '';
        this.NumClicked = false;
        this.decimalAdd = false;
        this.dotAdd = false;
        this.data = { KeyinValue: '0' };
        this.data.KeyinValue = __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].get('ListTable_Source');
    }
    LittleCalculatorPage.prototype.click = function (flag) {
        this.vibration.vibrate(100);
        switch (flag) {
            case 'OK':
                //計算
                this.CalSub('=');
                //回傳
                __WEBPACK_IMPORTED_MODULE_3__app_Settings__["d" /* ProgParameters */].set('ListTable_answer', this.data.KeyinValue);
                this.viewCtrl.dismiss();
            case 'AC':
                this.oldNum = 0;
                this.newNum = 0;
                this.decimalAdd = false;
                this.dotAdd = false;
                this.NumClicked = false;
                this.data.KeyinValue = '0';
                this.log += '\nAC\n';
                break;
            case 'DEL':
                this.data.KeyinValue = this.data.KeyinValue.substring(0, this.data.KeyinValue.length - 1).trim();
                if (this.data.KeyinValue.length == 0) {
                    this.newNum = 0;
                    this.data.KeyinValue = '0';
                }
                else {
                    this.newNum = parseFloat(this.data.KeyinValue);
                }
                this.log += flag;
                break;
            case '+':
            case '-':
            case '*':
                if (!this.decimalAdd) {
                    if (this.data.KeyinValue == '0')
                        this.data.KeyinValue = flag;
                    else
                        this.data.KeyinValue += flag;
                    this.dotAdd = false;
                    this.decimalAdd = true;
                    this.log += flag;
                }
                break;
            case '=':
                this.decimalAdd = true;
                this.CalSub(flag);
                break;
            case '.':
                if (!this.dotAdd) {
                    this.data.KeyinValue += flag;
                    this.dotAdd = true;
                    this.log += flag;
                }
                break;
            default://數字
                if (this.decimalAdd == false) {
                    if (this.NumClicked == false) {
                        this.data.KeyinValue = flag;
                    }
                    else {
                        this.data.KeyinValue += flag;
                    }
                    this.NumClicked = true;
                }
                else {
                    //沒有按下運算建
                    this.decimalAdd = false;
                    this.NumClicked = true;
                    if (this.data.KeyinValue == '0')
                        this.data.KeyinValue = flag;
                    else
                        this.data.KeyinValue += flag;
                }
                this.newNum = parseFloat(this.data.KeyinValue);
                this.log += flag;
        }
        this.lastClickChar = flag;
    };
    ;
    //計算函數
    LittleCalculatorPage.prototype.CalSub = function (New_operator) {
        console.log(' KeyinValue:' + this.data.KeyinValue
            + ' New_operator:' + New_operator);
        if (this.lastClickChar == New_operator) {
            //重複輸入'='
            return;
        }
        if (this.data.KeyinValue.substring(0, 1) == '+'
            || this.data.KeyinValue.substring(0, 1) == '-') {
            //Calculate
            this.newNum = eval(this.data.KeyinValue);
            this.oldNum = eval(this.oldNum + '+' + this.newNum);
        }
        else {
            this.oldNum = 0;
            this.newNum = eval(this.data.KeyinValue);
            this.oldNum = eval(this.oldNum + '+' + this.newNum);
        }
        //Final
        this.oldNum = this.GetRound(this.oldNum, 1);
        this.newNum = 0;
        //this.data.KeyinValue = '0';
        this.data.KeyinValue = this.oldNum.toString();
        this.log += New_operator + this.data.KeyinValue + '\n';
        //RESET
        this.decimalAdd = false;
        this.dotAdd = false;
        this.NumClicked = false;
    };
    LittleCalculatorPage.prototype.GetRound = function (num, len) {
        return Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
    };
    LittleCalculatorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\LittleCalculator\LittleCalculator.html"*/'<ion-content>\n\n    <ion-grid>\n\n        <div class="Calculator_Content">\n\n            <ion-row align-items-center>\n\n                <ion-col><ion-label class="Calculator_Result">{{data.KeyinValue}}</ion-label></ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col><button ion-button full color="danger" class="Calculator_AC" (click)="click(\'AC\')">C</button></ion-col>\n\n                <ion-col><button ion-button full color="secondary" class="Calculator_OK" (click)="click(\'OK\')">OK</button></ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col><button ion-button full (click)="click(\'7\')">7</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'8\')">8</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'9\')">9</button></ion-col>\n\n                <ion-col><button ion-button full class="btn_operator" (click)="click(\'*\')">*</button></ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col><button ion-button full (click)="click(\'4\')">4</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'5\')">5</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'6\')">6</button></ion-col>\n\n                <ion-col><button ion-button full class="btn_operator" (click)="click(\'-\')">-</button></ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col><button ion-button full (click)="click(\'1\')">1</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'2\')">2</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'3\')">3</button></ion-col>\n\n                <ion-col><button ion-button full class="btn_operator" (click)="click(\'+\')">+</button></ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-6><button ion-button full (click)="click(\'0\')">0</button></ion-col>\n\n                <ion-col><button ion-button full (click)="click(\'.\')">.</button></ion-col>\n\n                <ion-col><button ion-button full class="btn_operator" (click)="click(\'=\')">=</button></ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </ion-grid>\n\n    <span>以下為輸入歷程：</span>\n\n    <p style="white-space: pre;color:white">{{log}}</p>\n\n</ion-content>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\LittleCalculator\LittleCalculator.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_vibration__["a" /* Vibration */]])
    ], LittleCalculatorPage);
    return LittleCalculatorPage;
}());

//# sourceMappingURL=LittleCalculator.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myCAMERAPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_Settings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_http_services__ = __webpack_require__(87);
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


//My pages


var myCAMERAPage = /** @class */ (function () {
    function myCAMERAPage(viewCtrl, params, alertCtrl, camera, toastCtrl, _http_services, vibration) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this._http_services = _http_services;
        this.vibration = vibration;
        this.data = {
            IsDisabled: true,
            DuringCamera: false,
            FileName: '',
            imageData: '' //傳檔用
            ,
            FileSource: '' //顯示用
            ,
            defaultFileDescription: '',
            FileDescription: '',
            PaperNo: ''
        };
        //拍照使用的設定
        this.options = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 768,
            targetHeight: 1024,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            cameraDirection: this.camera.Direction.BACK,
            allowEdit: false
        };
        var obj = __WEBPACK_IMPORTED_MODULE_4__app_Settings__["d" /* ProgParameters */].get('ListTable_Source');
        this.data.defaultFileDescription = obj.FileDescription;
        this.data.PaperNo = obj.PaperNo;
        //設定檔案名稱
        this.setPictureFileName();
        this.callCamera();
        //for test
        //this.data.IsDisabled = false;
        this.data.imageData = '';
        this.data.FileSource = 'data:image/png;base64,' + this.data.imageData;
    }
    //離開
    myCAMERAPage.prototype.Leave = function () {
        this.viewCtrl.dismiss();
    };
    //重置
    myCAMERAPage.prototype.reset = function () {
        this.data.IsDisabled = true;
        this.data.FileSource = '';
    };
    //拍照檔名
    myCAMERAPage.prototype.setPictureFileName = function () {
        var myDate = new Date();
        var year = this.format_two_digits(myDate.getFullYear());
        var month = this.format_two_digits(myDate.getMonth() + 1);
        var day = this.format_two_digits(myDate.getDate());
        var hours = this.format_two_digits(myDate.getHours());
        var minutes = this.format_two_digits(myDate.getMinutes());
        var seconds = this.format_two_digits(myDate.getSeconds());
        var DateString = year + month + day;
        var timeString = hours + minutes + seconds;
        this.data.FileName = this.data.PaperNo + '_' + DateString + timeString;
    };
    myCAMERAPage.prototype.format_two_digits = function (n) {
        return n < 10 ? '0' + n : n;
    };
    //拍照
    myCAMERAPage.prototype.callCamera = function () {
        var _this = this;
        this.vibration.vibrate(100);
        this.data.IsDisabled = true;
        this.data.DuringCamera = true;
        console.log(this.data.DuringCamera);
        this.camera.getPicture(this.options)
            .then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.data.imageData = imageData;
            _this.data.FileSource = 'data:image/png;base64,' + _this.data.imageData;
        }, function (err) {
            console.log(err);
            // Handle error
            var alert = _this.alertCtrl.create({
                title: '錯誤',
                subTitle: err,
                buttons: ['關閉']
            });
            alert.present();
            _this.data.FileSource = '';
        })
            .then(function () {
            _this.data.DuringCamera = false;
            if (_this.data.FileSource != '')
                _this.data.IsDisabled = false;
        });
    };
    //上傳
    myCAMERAPage.prototype.upload = function () {
        var _this = this;
        if (this.data.IsDisabled)
            return;
        this.vibration.vibrate(100);
        this.data.IsDisabled = false;
        // Upload a file:
        this._http_services.POST('', 'Picture', 'upload', [{ Name: '@FileName', Value: this.data.FileName },
            { Name: '@FileSource', Value: this.data.imageData },
            { Name: '@FileDescription', Value: this.data.defaultFileDescription + this.data.FileDescription }])
            .then(function (response) {
            if (response != '') {
                console.log(response);
                switch (response[0].RT_CODE) {
                    case 0:
                        _this.reset();
                        _this.setPictureFileName();
                        _this.presentToast('照片成功上傳.');
                        break;
                    default:
                        //Error
                        var alert_fail = _this.alertCtrl.create({
                            title: '失敗',
                            subTitle: response[0].RT_MSG,
                            buttons: [{
                                    text: '關閉'
                                }]
                        });
                        alert_fail.present();
                        break;
                }
            }
        });
        this.data.IsDisabled = true;
    };
    //Toast
    myCAMERAPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: __WEBPACK_IMPORTED_MODULE_4__app_Settings__["e" /* Set_timeout */],
            position: 'bottom'
        });
        toast.present();
    };
    myCAMERAPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\myCAMERA\myCAMERA.html"*/'<ion-header no-border>\n\n    <ion-navbar>\n\n        <ion-buttons left>\n\n            <button ion-button (click)="Leave()">返回</button>\n\n        </ion-buttons>\n\n        <ion-title>拍照上傳</ion-title>\n\n        <ion-buttons right>\n\n            <button ion-button color="primary" [disabled]="data.DuringCamera" solid icon-start (click)="callCamera()">\n\n                <ion-icon name="camera"></ion-icon>\n\n                拍照\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-grid>\n\n        <ion-row align-items-center>\n\n            <ion-col col-2>\n\n                <ion-label>檔<br />名<br />：</ion-label>\n\n            </ion-col>\n\n            <ion-col col-8>\n\n                <textarea [(ngModel)]="data.FileName" \n\n                        class="mytextarea"\n\n                        row="2"></textarea>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <ion-label>.jpg</ion-label>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row align-items-center>\n\n            <ion-col col-2>\n\n                <ion-label>固<br />定<br />描<br />述<br />：</ion-label>\n\n            </ion-col>\n\n            <ion-col col-10>\n\n                <ion-label style="white-space: pre;font-size:small">{{data.defaultFileDescription}}</ion-label>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row align-items-center>\n\n            <ion-col col-2>\n\n                <ion-label>自<br />訂<br />描<br />述<br />：</ion-label>\n\n            </ion-col>\n\n            <ion-col col-10>\n\n                <textarea placeholder="輸入照片描述"\n\n                        [(ngModel)]="data.FileDescription"\n\n                        class="mytextarea"\n\n                        rows="5"></textarea>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col>\n\n                <img [src]="data.FileSource" *ngIf="data.FileSource" />\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button color="primary" block solid icon-start\n\n                        [disabled]="data.IsDisabled"\n\n                        (click)="upload()">\n\n                    <ion-icon name="cloud-upload"></ion-icon>\n\n                    傳送\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\pages\_ZZ_CommonLib\myCAMERA\myCAMERA.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ZZ_CommonLib_http_services__["a" /* http_services */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__["a" /* Vibration */]])
    ], myCAMERAPage);
    return myCAMERAPage;
}());

//# sourceMappingURL=myCAMERA.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(368);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_fcm__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_update__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_nfc__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_keyboard__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_vibration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_UpdateApp_UpdateApp__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_00_Login_Login__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_ZZ_CommonLib_LittleCalculator_LittleCalculator__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_ZZ_CommonLib_ListTable_ListTable__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_ZZ_CommonLib_PaperDetail_PaperDetail__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_ZZ_CommonLib_myCAMERA_myCAMERA__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_ZZ_CommonLib_http_services__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_ZZ_CommonLib_LittleKeyPad_LittleKeyPad__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//angular, ionic




//Cordova plugins









//My Pages









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* SMDRF */],
                //Pages
                __WEBPACK_IMPORTED_MODULE_14__pages_UpdateApp_UpdateApp__["a" /* UpdateApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_00_Login_Login__["a" /* _00_Login */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ZZ_CommonLib_LittleCalculator_LittleCalculator__["a" /* LittleCalculatorPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ZZ_CommonLib_ListTable_ListTable__["a" /* ListTablePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_ZZ_CommonLib_PaperDetail_PaperDetail__["a" /* PaperDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_ZZ_CommonLib_myCAMERA_myCAMERA__["a" /* myCAMERAPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */]
                //Directives
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* SMDRF */], {
                    activator: 'ripple',
                    backButtonText: '返回',
                    mode: 'md',
                    iconMode: 'md',
                    animate: false,
                    pageTransition: 'md-transition',
                    tabsPlacement: 'bottom'
                }, {
                    links: [
                        { loadChildren: '../pages/_01_Zone/Zone.module#AppModule', name: '_01_Zone', segment: '_01_Zone', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_02_Menu/Menu.module#AppModule', name: '_02_Menu', segment: '_02_Menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_11_CheckIn/CheckIn.module#CheckInModule', name: '_11_CheckIn', segment: '_11_CheckIn', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_12_ItemRcv/1_CarNo/CarNo.module#AppModule', name: '_121_CarNo', segment: '_121_CarNo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_12_ItemRcv/2_PaperNo/PaperNo.module#AppModule', name: '_122_PaperNo', segment: '_122_PaperNo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_12_ItemRcv/4_ItemRcv/ItemRcv.module#AppModule', name: '_124_ItemRcv', segment: '_124_ItemRcv', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_12_ItemRcv/3_ItemCode/ItemCode.module#AppModule', name: '_123_ItemCode', segment: '_123_ItemCode', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_13_WAS/1_OrderNo/OrderNo.module#_131_WAS_OrderNoModule', name: '_131_WAS_OrderNo', segment: '_131_WAS_OrderNo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_13_WAS/2_Item/Item.module#_132_WAS_ItemModule', name: '_132_WAS_Item', segment: '_132_WAS_Item', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_13_WAS/3_Store/Store.module#_133_WAS_StoreModule', name: '_133_WAS_Store', segment: '_133_WAS_Store', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_13_WAS/31_StoreChgAmount/StoreChgAmount.module#StoreChgAmountModule', name: '_1331_WAS_StoreChgAmount', segment: 'StoreChgAmount', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_13_WAS/4_Receive/Receive.module#_134_WAS_ReceiveModule', name: '_134_WAS_Receive', segment: '_134_WAS_Receive', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_21_BasketList/BasketList.module#BasketListModule', name: '_21_BasketList', segment: '_21_BasketList', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_22_PrintPickingLabel/PrintPickingLabel.module#PrintPickingLabelModule', name: '_22_PrintPickingLabel', segment: '_22_PrintPickingLabel', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_23_PrintLogisticLabel/PrintLogisticLabel.module#PrintLogisticLabelModule', name: '_23_PrintLogisticLabel', segment: '_23_PrintLogisticLabel', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_24_PhotoGallery/PhotoGallery.module#_24_PhotoGalleryModule', name: '_24_PhotoGallery', segment: '_24_PhotoGallery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/_99_TEST/TEST.module#AppModule', name: '_99_TEST', segment: '_99_TEST', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* SMDRF */],
                __WEBPACK_IMPORTED_MODULE_14__pages_UpdateApp_UpdateApp__["a" /* UpdateApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_00_Login_Login__["a" /* _00_Login */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ZZ_CommonLib_LittleCalculator_LittleCalculator__["a" /* LittleCalculatorPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ZZ_CommonLib_ListTable_ListTable__["a" /* ListTablePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_ZZ_CommonLib_PaperDetail_PaperDetail__["a" /* PaperDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_ZZ_CommonLib_myCAMERA_myCAMERA__["a" /* myCAMERAPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_ZZ_CommonLib_LittleKeyPad_LittleKeyPad__["a" /* LittleKeyPad */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_20__pages_ZZ_CommonLib_http_services__["a" /* http_services */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_update__["a" /* AppUpdate */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_nfc__["a" /* NFC */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_nfc__["b" /* Ndef */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SMDRF; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_fcm__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_UpdateApp_UpdateApp__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Cordova plugins



//My Pages

var SMDRF = /** @class */ (function () {
    function SMDRF(platform, statusBar, splashScreen, fcm, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        //設定root page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_UpdateApp_UpdateApp__["a" /* UpdateApp */];
        this.statusBar.hide();
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            {
                title: 'UpdateApp',
                component: __WEBPACK_IMPORTED_MODULE_5__pages_UpdateApp_UpdateApp__["a" /* UpdateApp */]
            }
        ];
        localStorage.clear();
    }
    SMDRF.prototype.initializeApp = function () {
        var _this = this;
        if (this.platform.is('core')) {
            console.log("You're develop in the browser.NO FCM");
            return;
        }
        this.platform.ready()
            .then(function () {
            _this.myFCM();
        })
            .then(function () {
            _this.splashScreen.hide();
        });
    };
    SMDRF.prototype.myFCM = function () {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        var _this = this;
        //FCM
        this.fcm.subscribeToTopic('developers');
        this.fcm.getToken().then(function (token) {
            //backend.registerToken(token);
            console.log(token);
        });
        this.fcm.onNotification().subscribe(function (data) {
            if (data.wasTapped) {
                var alert_background = _this.alertCtrl.create({
                    title: 'B ' + data.title,
                    subTitle: data.body,
                    buttons: ['關閉']
                });
                alert_background.present();
            }
            else {
                var alert_foreground = _this.alertCtrl.create({
                    title: 'F ' + data.title,
                    subTitle: data.body,
                    buttons: ['關閉']
                });
                alert_foreground.present();
            }
            ;
        });
        this.fcm.onTokenRefresh().subscribe(function (token) {
            //backend.registerToken(token);
        });
        //解除安裝
        //fcm.unsubscribeFromTopic('developers');
    };
    SMDRF.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], SMDRF.prototype, "nav", void 0);
    SMDRF = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'SMDRF',template:/*ion-inline-start:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"F:\Projects\SMD\SMD_HandRF\RF_Web\RF_Web\SMD_RF_v3\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SMDRF);
    return SMDRF;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return http_services; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_Settings__ = __webpack_require__(33);
// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.
// Statics

// Operators











var http_services = /** @class */ (function () {
    function http_services(http, alertCtrl, loadingCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    //mode: 'sp', 'sqlcmd'
    //sqlcmd: sql command
    //params: parameters array list
    http_services.prototype.POST = function (server, mode, sqlcmd, params) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: '送出查詢中...'
        });
        if (__WEBPACK_IMPORTED_MODULE_11__app_Settings__["f" /* ShowLoadingWindow */]) {
            loading.present();
        }
        var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_9__angular_http__["e" /* URLSearchParams */]();
        //define server
        if (server == '')
            server = __WEBPACK_IMPORTED_MODULE_11__app_Settings__["b" /* DefaultServer */];
        urlSearchParams.append('server', server);
        //sp or query or excel or Picture
        urlSearchParams.append('mode', mode);
        //sp name
        urlSearchParams.append('sqlcmd', sqlcmd);
        //params
        params.forEach(function (value) {
            var obj = value;
            urlSearchParams.append(obj.Name, obj.Value);
        });
        var options = new __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* RequestOptions */]();
        options.body = urlSearchParams;
        //console.log(urlSearchParams);
        return this.http.post('http://' + __WEBPACK_IMPORTED_MODULE_11__app_Settings__["c" /* Global_Server */] + '/handler/RF3_httpService.ashx', '', options)
            .map(function (res) {
            loading.dismiss();
            //console.log(res);
            if (mode == 'Picture') {
                switch (sqlcmd) {
                    case 'download':
                        _this.downloadFile(res, params[0].Value);
                        return '';
                    case 'open':
                        return '[{"ImageContent":' + 'data:image/png;base64,' + res['_body'] + '}]';
                    case 'upload':
                    case 'search':
                        return res.json();
                    case 'delete':
                        return '';
                }
            }
            else
                return res.json();
        }) // ...and calling .json() on the response to return data
            .catch(function (error) {
            loading.dismiss();
            // In a real world app, you might use a remote logging infrastructure
            var errtitle = '錯誤';
            var errMsg = '';
            if (error instanceof __WEBPACK_IMPORTED_MODULE_9__angular_http__["d" /* Response */]) {
                if (error.status <= 0) {
                    errMsg = error.status.toString() + ' - ' + 'No Network Connection';
                }
                else {
                    errMsg = error.status.toString() + ' - ' + error.statusText;
                }
            }
            else {
                errtitle += error.name ? error.name : '';
                errMsg = error.message ? error.message : error.toString();
            }
            _this.alertCtrl.create({
                title: errtitle,
                subTitle: errMsg,
                buttons: ['關閉']
            }).present();
            return __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__["Observable"].throw(error || 'Server Error');
        })
            .toPromise(); //...errors if any
    };
    http_services.prototype.downloadFile = function (data, filename) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:image/png;base64,' + data._body);
        pom.setAttribute('download', filename);
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    };
    http_services = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["f" /* LoadingController */]])
    ], http_services);
    return http_services;
}());

//# sourceMappingURL=http_services.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map