import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
    async POST(server: string, mode: string, sqlcmd: string, params: Array<any>): Promise<JSON> {
        let loading = this.loadingCtrl.create({
            content: '送出查詢中...'
        });
        loading.present();

        let urlSearchParams = new URLSearchParams();

        //define server
        if (server == '')
            server = myGlobals.DefaultServer;
        urlSearchParams.append('server', server);

        //sp or query
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
            .toPromise()
            .then((res: Response) => {  //成功
                console.log(res);
                loading.dismiss();
                return res.json();
            })
            .catch((error: Response | any) => { //失敗
                loading.dismiss();
                // In a real world app, you might use a remote logging infrastructure
                let errMsg: string;

                if (error instanceof Response) {
                    //const body = error.json() || '';
                    //const err = body.error || JSON.stringify(body);
                    errMsg = `${error.status} - ${error.statusText || ''}`;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                let alert = this.alertCtrl.create({
                    title: '錯誤',
                    subTitle: errMsg,
                    buttons: ['關閉']
                });
                alert.present();
                return undefined;
            });
    }
}
