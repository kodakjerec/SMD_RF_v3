import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';

//Cordova
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Vibration } from '@ionic-native/vibration';

//My pages
import * as myGlobals from '../../../app/Settings';
import { http_services } from '../../_ZZ_CommonLib/http_services';

@Component({
    templateUrl: 'myCAMERA.html'
})
export class myCAMERAPage {
    data = {
        IsDisabled: true
        , DuringCamera: false
        , FileName: ''
        , imageData: ''     //傳檔用
        , FileSource: ''    //顯示用
        , defaultFileDescription: ''
        , FileDescription: ''
        , PaperNo: ''
    };

    //拍照使用的設定
    options: CameraOptions = {
        sourceType: this.camera.PictureSourceType.CAMERA,
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 768,
        targetHeight: 1024,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        cameraDirection: this.camera.Direction.BACK,
        allowEdit: false
    }

    constructor(
        public viewCtrl: ViewController
        , params: NavParams
        , private alertCtrl: AlertController
        , private camera: Camera
        , private toastCtrl: ToastController
        , public _http_services: http_services
        , private vibration: Vibration
    ) {
        let obj = myGlobals.ProgParameters.get('ListTable_Source');

        this.data.defaultFileDescription = obj.FileDescription;
        this.data.PaperNo = obj.PaperNo;
        //設定檔案名稱
        this.setPictureFileName();

        this.callCamera();

        //for test
        //this.data.IsDisabled = false;
        this.data.imageData = '';
        this.data.FileSource = 'data:image/jpeg;base64,' + this.data.imageData;
    }

    //離開
    Leave() {
        this.viewCtrl.dismiss();
    }

    //重置
    reset() {
        this.data.IsDisabled = true;
        this.data.FileSource = '';
    }

    //拍照檔名
    setPictureFileName() {
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
    }
    format_two_digits(n): string {
        return n < 10 ? '0' + n : n;
    }

    //拍照
    callCamera() {
        this.vibration.vibrate(100);
        this.data.IsDisabled = true;
        this.data.DuringCamera = true;
        console.log(this.data.DuringCamera);

        this.camera.getPicture(this.options)
            .then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                this.data.imageData = imageData;
                this.data.FileSource = 'data:image/jpeg;base64,' + this.data.imageData;
            }, (err) => {
                console.log(err);
                // Handle error
                let alert = this.alertCtrl.create({
                    title: '錯誤',
                    subTitle: err,
                    buttons: ['關閉']
                });
                alert.present();
                this.data.FileSource = '';
            })
            .then(() => {
                this.data.DuringCamera = false;

                if (this.data.FileSource != '')
                    this.data.IsDisabled = false;
            });
    }

    //上傳
    upload() {
        if (this.data.IsDisabled)
            return;

        this.vibration.vibrate(100);
        this.data.IsDisabled = false;

        // Upload a file:
        this._http_services.POST('', 'Picture'
            , 'Picture'
            , [{ Name: '@FileName', Value: this.data.FileName }
                , { Name: '@FileSource', Value: this.data.imageData }
                , { Name: '@FileDescription', Value: this.data.defaultFileDescription + this.data.FileDescription }])
            .subscribe((response) => {
                if (response != undefined) {
                    console.log(response);
                    switch (response[0].RT_CODE) {
                        case 0:
                            this.reset();
                            this.setPictureFileName();
                            this.presentToast('照片成功上傳.');
                            break;
                        default:
                            //Error
                            let alert_fail = this.alertCtrl.create({
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
    }

    //Toast
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: myGlobals.Set_timeout,
            position: 'bottom'
        });
        toast.present();
    }
}