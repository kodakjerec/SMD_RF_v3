import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { http_services } from '../_ZZ_CommonLib/http_services';

@IonicPage({
    name: '_24_PhotoGallery',
    segment: '_24_PhotoGallery'
})
@Component({
    templateUrl: 'PhotoGallery.html'
})

export class _24_PhotoGallery {
    constructor(public navCtrl: NavController
        , private plt: Platform
        , public navParams: NavParams
        , public _http_services: http_services
        , private alertCtrl: AlertController) {

        this.data.devWidth = plt.width();
        console.log('Dev Width' + this.data.devWidth);
    }

    //#region Init
    data = {
        choice: 'DAS'
        , ScanBarcode: ''
        , JOBID: ''
        , devWidth: 0
    };

    Lists = [];


    @ViewChild('scan_Entry') scan_Entry;
    //#endregion

    ngOnInit() {
        this.searchPic();
    };

    searchPic() {
        this.Lists = [];
        this._http_services.POST('', 'Picture'
            , 'search'
            , [{}])
            .subscribe((response) => {
                for (var index in response) {
                    var value = response[index];
                    var value_Description = value.Description;
                    this.Lists.push({
                        FileName: value.FileName
                        , Description: value_Description
                        , showDescription: value_Description.replace(/\<br>/g, "\n")
                        , ThumbnailImage: 'data:image/png;base64,' + value.ThumbnailImage
                        , CreateTime: value.CreateTime
                        , check: false
                    });
                }
                console.log(this.Lists);
            });
    }

    //開啟編輯模式
    showPic(item) {
        item.check = !item.check;
        //this._http_services.POST('', 'Picture'
        //    , 'open'
        //    , [{ Name: '@FileName', Value: item.FileName }])
        //    .subscribe((response) => {
        //        console.log(response);
        //    });
    }

    //刪除圖片
    deletePic() {
        let strPicsList_show: string = '',
            strPicsList: Array<string> = [];

        this.Lists.forEach(value => {
            if (value.check) {
                strPicsList_show += value.FileName + '<br>';
                strPicsList.push(value.FileName);
            }
        });

        let confirm = this.alertCtrl.create({
            title: '確定要永久刪除勾選的圖片？',
            message: strPicsList_show,
            buttons: [
                {
                    text: '取消',
                    handler: () => {

                    }
                },
                {
                    text: '確定',
                    handler: () => {
                        this._http_services.POST('', 'Picture'
                            , 'delete'
                            , [{ Name: '@FileName', Value: strPicsList }])
                            .subscribe(() => {
                                this.searchPic();
                            });
                    }
                }
            ]
        });
        confirm.present();
    }

    //下載圖片
    downloadPic(item) {
        this._http_services.POST('', 'Picture'
            , 'download'
            , [{ Name: '@FileName', Value: item.FileName }])
            .subscribe(() => {

            });
    }

    //改變螢幕寬度時觸發
    onResize() {
        this.data.devWidth = this.plt.width();
    };

    //help
    help() {
        let alert = this.alertCtrl.create({
            title: '使用說明',
            subTitle: '1. 手機介面瀏覽時，下載功能無法使用<br>'
            + '2. 按下"下載圖案"：瀏覽器會跳出下載視窗<br>'
            + '3. 按下"圖片"：勾選該張圖片，勾選的圖片右上角會有V圖案<br>'
            + '4. 批次刪除：勾選多張圖片後，按下標題列右方的垃圾桶',
            buttons: ['關閉']
        });
        alert.present();
    }

    //喪失focus
    myfocus() {
        this.scan_Entry.setFocus();
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
                this.navCtrl.pop();
                break;
            case 8: //UP
                break;
            case 16://DOWN
                break;
        };
    }
}
