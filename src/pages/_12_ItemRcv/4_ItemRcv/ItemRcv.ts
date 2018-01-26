import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, IonicPage } from 'ionic-angular';
import { Navbar } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

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
        , public _http_services: http_services
        , private alertCtrl: AlertController
        , private modalCtrl: ModalController
        , private toastCtrl: ToastController
        , private vibration: Vibration) {
        myGlobals.loginCheck();

        this.result = JSON.parse(localStorage.getItem('ReceiveResult'));
        this.InitQueryItemState();

        //SHOW 待收百分比
        var QTY = this.result.PO_QTY.split("/");
        this.answer.QTY_ShowTotal = parseInt(QTY[1]);
        this.answer.QTY_ProgressBar = Math.round(this.result.QTY / this.answer.QTY_ShowTotal * 100).toString()+'%';
    }

    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('scan_Entry') scan_Entry;
    @ViewChild('scan_Entry2') scan_Entry2;

    ionViewDidEnter() {
        this.myFocus();
    }

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

    data = {
        CarNo: localStorage.getItem('CarNo')
        , PaperNo: localStorage.getItem('PaperNo')
        , PaperNo_ID: localStorage.getItem('PaperNo_ID')
        , ItemCode: localStorage.getItem('ItemCode')
        , ITEM_HOID: localStorage.getItem('ITEM_HOID')
        , LOT_ID: localStorage.getItem('LOT_ID')
        , viewColor: ''
        , USER_ID: localStorage.getItem('USER_ID')
        , BLOCK_NAME: localStorage.getItem('BLOCK_NAME')
        , IsHideWhenKeyboardOpen: false
    };  // IsDisabled控制"btn報到"是否顯示，預設不顯示：IsDisabled = true
    answer = {
        QTY: 0
        , WEIGHT: 0.0
        , QualityValue: 1
        , QualityName: '品質'
        , QualityList: []
        , QTY_ShowTotal: 0
        , QTY_ProgressBar: ''
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

    //進度表
    getQTY_ProgressBar() {
        return this.answer.QTY_ProgressBar;
    }

    //上一頁
    Back() {
        this.Unlock();
        this.reset();
        myGlobals.ProgParameters.set('ReceiveResult', this.result);
        this.navCtrl.pop();
    };

    //重置btn
    reset() {
        this.data.viewColor = '';

        this.answer.QualityValue = 1;
        this.answer.QualityName = '品質';

        //數量 重量
        this.answer.QTY = 0;
        this.answer.WEIGHT = 0.0;

        this.myFocus();
    };

    //選擇品質
    InitQueryItemState() {
        this._http_services.POST('', 'sqlcmd'
            , 'Select ID as Value, Name from vDCS_Table_item_State'
            , [])
            .then((response) => {
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

        let ErrMsg:string = '';
        //#region 檢查
        if (this.answer.QTY == 0) {
            ErrMsg += "數量欄位尚未輸入 ";
        }

        if (this.result.PRICE_TYPE == 0 && this.answer.WEIGHT == 0) {
            ErrMsg += "秤重欄位尚未輸入 ";   
        }

        if (ErrMsg.length>0) {
            //Error
            this.toastCtrl.create({
                message: ErrMsg,
                duration: myGlobals.Set_timeout,
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
                subTitle: ErrMsg ,
                buttons: [{
                    text: '取消'
                    , handler: () => {
                        return;
                    }
                }
                    , {
                        text: '確定'
                    }
                ]
            }).present();
        }

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
            .then((response) => {
                if (response != '') {
                    switch (response[0].RT_CODE) {
                        case 0:
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

                            this.answer.QTY_ProgressBar = Math.round(this.result.QTY / this.answer.QTY_ShowTotal * 100).toString()+'%';

                            //reset
                            this.reset();

                            this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'bottom'
                            }).present();

                            break;
                        default:
                            //Error
                            this.toastCtrl.create({
                                message: response[0].RT_MSG,
                                duration: myGlobals.Set_timeout,
                                position: 'middle'
                            }).present();
                            break;
                    }
                }
            });

        this.myFocus();
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
            ]);
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

    //喪失focus
    myFocus() {
        setTimeout(() => {
            this.scan_Entry.setFocus();
        }, 300);
    };
    myFocus2() {
        setTimeout(() => {
            this.scan_Entry2.setFocus();
        }, 300);
    };

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
