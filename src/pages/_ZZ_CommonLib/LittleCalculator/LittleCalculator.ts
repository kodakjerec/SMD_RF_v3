import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

//Cordova
import { Vibration } from '@ionic-native/vibration';

//My Pages
import * as myGlobals from '../../../app/Settings';

@Component({
    templateUrl: 'LittleCalculator.html'
})
export class LittleCalculatorPage {
    //計算過程使用
    oldNum = 0;
    newNum = 0;
    lastClickChar = '=';
    log = '';
    NumClicked = false;
    decimalAdd = false;
    dotAdd = false;

    data = {  KeyinValue: '0' };

    constructor(
        public viewCtrl: ViewController
        , params: NavParams
        , private vibration: Vibration
    ) {
        this.data.KeyinValue = myGlobals.ProgParameters.get('ListTable_Source');
    }

    click(flag) {
        this.vibration.vibrate(100);
        switch (flag) {
            case 'OK':
                //計算
                this.CalSub('=');

                //回傳
                myGlobals.ProgParameters.set('ListTable_answer', this.data.KeyinValue);
                this.viewCtrl.dismiss();
            case 'AC':
                this.oldNum = 0;
                this.newNum = 0;
                this.decimalAdd = false;
                this.dotAdd = false;
                this.data.KeyinValue = '0';
                this.log += 'AC\n';
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
                this.CalSub(flag); break;
            case '.':
                if (!this.dotAdd) {
                    this.data.KeyinValue += flag;
                    this.dotAdd = true;
                    this.log += flag;
                }
                break;
            default:    //數字
                if (this.decimalAdd == false) { //有按下運算鑑
                    if (this.NumClicked == false) { //第一次按下數字
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

    //計算函數
    CalSub(New_operator) {
        console.log(
            ' KeyinValue:' + this.data.KeyinValue
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
    }
    GetRound(num, len) {
    　　　　return Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
　　}
}