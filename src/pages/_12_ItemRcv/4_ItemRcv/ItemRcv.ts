import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, Platform, NavParams, IonicPage } from 'ionic-angular';
import { Navbar } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';
import { Keyboard } from '@ionic-native/keyboard';

//My Pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';
import { ListTablePage } from '../../_ZZ_CommonLib/ListTable/ListTable';
import { LittleCalculatorPage } from '../../_ZZ_CommonLib/LittleCalculator/LittleCalculator';
import { myCAMERAPage } from '../../_ZZ_CommonLib/myCAMERA/myCAMERA';


@IonicPage({
    name: '_124_ItemRcv',
    segment: '_124_ItemRcv'
})
@Component({
    templateUrl: 'ItemRcv.html'
})

export class _124_ItemRcv {
    constructor(public navCtrl: NavController
        , public platform: Platform
        , public navParams: NavParams
        , private vibration: Vibration
        , public _http_services: http_services
        , private modalCtrl: ModalController
        , private alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private keyboard: Keyboard) {
        this.data.USER_ID = myGlobals.ProgParameters.get('USER_ID');
        this.data.BLOCK_NAME = myGlobals.ProgParameters.get('BLOCK_NAME');
        this.data.CarNo = myGlobals.ProgParameters.get('CarNo');
        this.data.PaperNo = myGlobals.ProgParameters.get('PaperNo');
        this.data.PaperNo_ID = myGlobals.ProgParameters.get('PaperNo_ID');
        this.data.ItemCode = myGlobals.ProgParameters.get('ItemCode');
        this.data.ITEM_HOID = myGlobals.ProgParameters.get('ITEM_HOID');
        this.data.LOT_ID = myGlobals.ProgParameters.get('LOT_ID');

        this.result = myGlobals.ProgParameters.get('ReceiveResult');
        this.InitQueryItemState();

        //SHOW 待收百分比
        var QTY = this.result.PO_QTY.split("/");
        this.answer.QTY_left = parseInt(QTY[0]);
        this.answer.QTY_ShowTotal = parseInt(QTY[1]);

        this.initializeApp();
    }

    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('scan_Entry') scan_Entry;
    @ViewChild('scan_Entry2') scan_Entry2;

    //覆寫原本退回的動作
    ionViewDidLoad() {
        this.setBackButtonAction()
    }

    //Method to override the default back button action
    setBackButtonAction() {
        this.navBar.backButtonClick = () => {
            //Write here wherever you wanna do
            this.Back();
        }
    }

    initializeApp() {
        if (this.platform.is('core')) {
            console.log("You're develop in the browser");
            return;
        }
        this.platform.ready()
            .then(() => {
                this.keyboard.onKeyboardShow().subscribe(() => { this.data.IsHideWhenKeyboardOpen = true });
                this.keyboard.onKeyboardHide().subscribe(() => { this.data.IsHideWhenKeyboardOpen = false });
            })
            ;
    }

    data = {
        CarNo: ''
        , PaperNo: ''
        , PaperNo_ID: ''
        , ItemCode: ''
        , ITEM_HOID: ''
        , LOT_ID: ''
        , viewColor: ''
        , USER_ID: ''
        , BLOCK_NAME: ''
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    answer = {
        QTY: 0
        , WEIGHT: 0.0
        , QualityValue: 1
        , QualityName: '品質'
        , QualityList: []
        , QTY_ShowTotal: 0
        , QTY_left: 0
    };
    result = {
        PO_QTY: '0/0'
        , PRICE_TYPE: 0
        , ADDON_QTY: 0
        , ADDON_WT: 0
        , QTY: 0
        , WT: 0
        , NG_QTY: 0
        , NG_WT: 0
        , ROW3: ''
        , ROW4: ''
        , ROW5: ''
        , ROW6: ''
    };

    //20170613需求，加入溫度正負按鈕
    QTY_color = { labelName: '＋', checked: false };
    WEIGHT_color = { labelName: '＋', checked: false };
    onToggleChange(item) {
        if (item.checked == true)
            item.labelName = '－';
        else
            item.labelName = '＋';
    }
    //加入溫度正負按鈕END

    //上一頁
    Back() {
        this.Unlock();
        this.reset();
        myGlobals.ProgParameters.set('ReceiveResult', this.result);
        this.navCtrl.pop();
    };

    ionViewDidEnter() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 150);
    }

    //重置btn
    reset() {
        this.data.viewColor = '';

        this.answer.QualityValue = 1;
        this.answer.QualityName = '品質';

        //數量 重量
        this.answer.QTY = 0;
        this.answer.WEIGHT = 0.0;
        //數量 重量 正負 reset
        this.QTY_color.checked = false;
        this.onToggleChange(this.QTY_color);
        this.WEIGHT_color.checked = false;
        this.onToggleChange(this.WEIGHT_color);

        this.scan_Entry.setFocus();
    };

    //選擇品質
    InitQueryItemState() {
        this._http_services.POST('', 'sqlcmd'
            , 'Select ID as Value, Name from vDCS_Table_item_State'
            , [])
            .subscribe((response) => {
                for (var index in response) {
                    var value = response[index];
                    this.answer.QualityList.push({ Name: value.Name, Value: value.Value });
                }

                this.findQualityNameAndColor();
            });
    }
    //品質選擇清單
    QueryItemState() {
        this.vibration.vibrate(100);
        //Multi variables, choose one
        myGlobals.ProgParameters.set('ListTable_Source', this.answer.QualityList);

        let obj = this.modalCtrl.create(ListTablePage);
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));
            this.answer.QualityValue = myGlobals.ProgParameters.get('ListTable_answer').Value;
            //查表找屬性
            this.findQualityNameAndColor();

            return;
        });
        obj.present();
    };
    //查表找屬性和顏色
    findQualityNameAndColor() {
        this.answer.QualityList.forEach(value => {
            if (value.Value == this.answer.QualityValue)
                this.answer.QualityName = value.Name;
        });

        switch (this.answer.QualityValue) {
            case 0:
                this.data.viewColor = '#79FF79'; break;
            case 1:
                this.data.viewColor = 'black'; break;
            default:
                this.data.viewColor = '#FF5151'; break;
        }
    };

    //呼叫小鍵盤
    showCalculator(flag) {
        this.vibration.vibrate(100);
        switch (flag) {
            case 'QTY':
                myGlobals.ProgParameters.set('ListTable_Source', this.answer.QTY);
                break;
            case 'WEIGHT':
                myGlobals.ProgParameters.set('ListTable_Source', this.answer.WEIGHT);
                break;
            default:
                return;
        }


        let obj = this.modalCtrl.create(LittleCalculatorPage);
        obj.onDidDismiss(data => {
            console.log(myGlobals.ProgParameters.get('ListTable_answer'));

            switch (flag) {
                case 'QTY':
                    this.answer.QTY = myGlobals.ProgParameters.get('ListTable_answer');
                    break;
                case 'WEIGHT':
                    this.answer.WEIGHT = myGlobals.ProgParameters.get('ListTable_answer');
                    break;
                default:
                    return;
            }
        });
        obj.present();
    }

    //驗收
    Receive() {
        this.vibration.vibrate(100);
        //檢查
        if (this.result.PRICE_TYPE == 0 && this.answer.WEIGHT <= 0) {
            //Error
            let alert_fail = this.alertCtrl.create({
                title: '失敗',
                subTitle: "秤重欄位尚未輸入",
                buttons: [{
                    text: '關閉',
                    handler: data => {
                        this.scan_Entry2.setFocus();
                    }
                }]
            });
            alert_fail.present();
            return;
        }

        //正負
        if (this.QTY_color.checked == true)
            this.answer.QTY = 0 - this.answer.QTY;
        if (this.WEIGHT_color.checked == true)
            this.answer.WEIGHT = 0 - this.answer.WEIGHT;

        //驗收
        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '3' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.LOT_ID }
                , { Name: '@STATE_TYPE', Value: this.answer.QualityValue }
                , { Name: '@QTY', Value: this.answer.QTY }
                , { Name: '@WT', Value: this.answer.WEIGHT }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ])
            .subscribe((response) => {
                if (response != '') {
                    switch (response[0].RT_CODE) {
                        case 0:
                            //SHOW 待收百分比
                            this.answer.QTY_left -= this.answer.QTY;

                            console.log(response[0]);
                            //更新顯示
                            this.result.ADDON_QTY = response[0].ADDON_QTY;
                            this.result.ADDON_WT = response[0].ADDON_WT;
                            this.result.QTY = response[0].QTY;
                            this.result.WT = response[0].WT;
                            this.result.NG_QTY = response[0].NG_QTY;
                            this.result.NG_WT = response[0].NG_WT;
                            this.result.ROW3 = response[0].ROW3;
                            this.result.ROW4 = response[0].ROW4;
                            this.result.ROW5 = response[0].ROW5;
                            this.result.ROW6 = response[0].ROW6;

                            //reset
                            this.reset();

                            let toast = this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'bottom'
                            });
                            toast.onDidDismiss(() => {
                                this.scan_Entry.setFocus();
                            });
                            toast.present();

                            break;
                        default:
                            //Error
                            let alert_fail = this.alertCtrl.create({
                                title: '失敗',
                                subTitle: response[0].RT_MSG,
                                buttons: [{
                                    text: '關閉',
                                    handler: data => {
                                        this.scan_Entry.setFocus();
                                    }
                                }]
                            });
                            alert_fail.present();
                            break;
                    }
                }
            });
    };

    //解鎖
    Unlock() {
        this._http_services.POST('', 'sp'
            , 'spactDCS_ID_LINE'
            , [
                { Name: '@JOB_ID', Value: '4' }
                , { Name: '@ID', Value: this.data.PaperNo_ID }
                , { Name: '@ITEM', Value: this.data.LOT_ID }
                , { Name: '@USER_ID', Value: this.data.USER_ID }
            ]).subscribe(() => { });
    };

    //拍照上傳
    showCamera() {
        this.vibration.vibrate(100);
        myGlobals.ProgParameters.set('ListTable_Source', {
            FileDescription: '車號：' + this.data.CarNo + '\n'
            + 'PO單：' + this.data.PaperNo + '\n'
            + 'PO_ID：' + this.data.PaperNo_ID + '\n'
            + '呼出碼：' + this.data.ItemCode + '\n'
            + 'HO_ID：' + this.data.ITEM_HOID + '\n'
            + 'LOT_ID：' + this.data.LOT_ID + '\n'
            + '品質：' + this.answer.QualityName + '\n'
            , PaperNo: this.data.PaperNo
        });

        let obj = this.modalCtrl.create(myCAMERAPage);
        obj.present();
    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    //手勢
    swipeEvent(event) {
        switch (event.direction) {
            case 1: //NONE
                break;
            case 2: //LEFT

                break;
            case 4: //RIGHT
                this.Back();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}
