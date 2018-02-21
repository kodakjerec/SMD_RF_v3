//宣告全域變數

//連結伺服器
//網址
//export const Global_Server = 'localhost:1793';
//export const Global_Server = 'localhost/RF_DB';
export const Global_Server = '172.31.31.250/RF_DB';
export const Set_timeout = 1500;
export const DefaultServer = "DCStest";
export const ShowLoadingWindow = false;

export const Changelog = ''
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
export const ProgParameters = {
    params: [
    ]
    ,
    set(name: string, value: any) {
        this.params.push({ Name: name, Value: value });
    }
    ,
    get(name: string): any {
        var object = undefined;

        this.params.forEach(value => {
            if (value.Name == name)
                object = value.Value;
        });
        return object;
    }
}

//登入檢查
export function loginCheck() {
    let UserID = localStorage.getItem('USER_ID');
    if (UserID == undefined)
        location.href = '/';
}
//keycode 回傳 string
export function keyCodeToValue(keycode: number, ParentObject: string): string {
    let returnStr = '';

    //根據keycode判別字串
    if (96 <= keycode && keycode <= 105) {
        returnStr = String.fromCharCode(keycode - 48);
    }
    else {
        switch (keycode) {
            case 9:     //Tab
            case 13:    //Enter
                returnStr = 'ENTER'; break;
            case 8:
            case 46:
                returnStr = 'DELETE'; break;
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