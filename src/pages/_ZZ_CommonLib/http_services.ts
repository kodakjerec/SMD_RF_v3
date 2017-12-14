// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/switchMap';

import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { AlertController, LoadingController } from 'ionic-angular';

import * as myGlobals from '../../app/Settings';

@Injectable()
export class http_services {

    constructor(private http: Http
        , private alertCtrl: AlertController
        , public loadingCtrl: LoadingController) {
    }

    //mode: 'sp', 'sqlcmd'
    //sqlcmd: sql command
    //params: parameters array list
    POST(server: string, mode: string, sqlcmd: string, params: Array<any>): Observable<any> {


        let loading = this.loadingCtrl.create({
            content: '送出查詢中...'
        });
        if(myGlobals.ShowLoadingWindow){
            loading.present();
        }

        let urlSearchParams = new URLSearchParams();

        //define server
        if (server == '')
            server = myGlobals.DefaultServer;
        urlSearchParams.append('server', server);

        //sp or query or excel or Picture
        urlSearchParams.append('mode', mode);

        //sp name
        urlSearchParams.append('sqlcmd', sqlcmd);

        //params
        params.forEach(value => {
            var obj = value;
            urlSearchParams.append(obj.Name, obj.Value);
        });

        let options = new RequestOptions();
        options.body = urlSearchParams;

        console.log(urlSearchParams);
        return this.http.post('http://' + myGlobals.Global_Server + '/handler/RF3_httpService.ashx', '', options)
            //.timeout(5000)
            .map((res: Response) => {
                loading.dismiss();
                console.log(res);
                if (mode == 'Picture') {
                    switch (sqlcmd) {
                        case 'download':
                            this.downloadFile(res, params[0].Value);
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
            .catch((error: any) => {
                loading.dismiss();
                console.log(error);

                // In a real world app, you might use a remote logging infrastructure
                let errtitle: string = '錯誤';
                let errMsg: string = '';

                if (error instanceof Response) {
                    //const body = error.json() || '';
                    //const err = body.error || JSON.stringify(body);
                    errMsg = `${error.status} - ${error.statusText || ''}`;
                } else {
                    errtitle += error.name ? error.name : '';
                    errMsg = error.message ? error.message : error.toString();
                }

                let alert = this.alertCtrl.create({
                    title: errtitle,
                    subTitle: errMsg,
                    buttons: ['關閉']
                });
                alert.present();
                return Observable.throw(error || 'Server Error');
            }); //...errors if any
    }

    downloadFile(data: any, filename: string) {
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
    }
}
