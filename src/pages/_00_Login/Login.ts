import { Component, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Platform, AlertController, IonicPage } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_00_Login',
    segment: '_00_Login'
})
@Component({
    templateUrl: 'Login.html'
})

export class _00_Login {
    loginData = {
        Version: myGlobals.packageVersion
        , Changelog: myGlobals.Changelog
    };
    private todo: FormGroup;
    @ViewChild('txb_username') txb_username;
    @ViewChild('txb_password') txb_password;

    constructor(public navCtrl: NavController
        , plt: Platform
        , private formBuilder: FormBuilder
        , public _http_services: http_services
        , private alertCtrl: AlertController) {

        this.gotoTest();

        this.todo = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.txb_username.setFocus();
        }, 150);
    }

    //重新整理
    reload() {
        window.location.reload();
    };

    //登入
    login() {
        this._http_services.POST('', 'sp'
            , '[sys.spDCS_LOGIN]'
            , [{ Name: '@ID', Value: this.todo.value.username }
                , { Name: '@PASSWORD', Value: this.todo.value.password }])
            .then((response) => {
                if (response != undefined) {

                    switch (response[0].LOGIN_RESULT) {
                        case 0:
                            myGlobals.ProgParameters.set('USER_ID', response[0].ID);
                            myGlobals.ProgParameters.set('BLOCK_ID', response[0].BLOCK_ID);

                            this.navCtrl.push('_01_Menu');
                            break;
                        default:
                            let alert = this.alertCtrl.create({
                                title: '錯誤代號：' + response[0].LOGIN_RESULT,
                                subTitle: response[0].LOGIN_MESSAGE,
                                buttons: ['關閉']
                            });
                            alert.present();
                    }

                }
            });

    }

    //全選
    selectAll($event) {
        $event._native.nativeElement.select();
    }

    gotoTest() {
        this.navCtrl.push('_99_TEST');
    }

    //按下enter
    enter(obj: string) {
        if (obj == 'username') {
            this.txb_password.setFocus();
        }
        else {
            this.login();
        }
    }
}
