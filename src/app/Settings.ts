//宣告全域變數

//連結伺服器
//網址
//export const Global_Server = 'localhost:1793';
//export const Global_Server = 'localhost/RF_DB';
export const Global_Server = '192.168.100.134/RF_DB';
export const Set_timeout = 1500;
export const packageVersion = '17.08.09.01';
export const DefaultServer = "DCStest";

export const Changelog = ''
    + '\n17.08.09.01:'
    + '\n 1."進貨驗收"加入小鍵盤'
    + '\n 2."呼出碼查詢"效期加上提示輸入內容'
    + '\n 3.顏色會改變了，請回饋心得'
    + '\n 4.各頁面的抬頭點一下，可以知道目前的作業資訊(回報資訊問題使用)'
    + '\n17.08.07.01:'
    + '\n 1."報到牌""進貨單查詢"可以查詢驗收明細'
    + '\n 2."呼出碼查詢"加速模糊搜尋商品條碼的速度';

//程式作用的變數
export const ProgParameters = {
    params: [
        //for test
        { Name: 'USER_ID', Value: '123' }
        , { Name: 'BLOCK_ID', Value: '02' }
        , { Name: 'CarNo', Value: '072' }
        , { Name: 'PaperNo', Value: 'PO170826000090' }
        , { Name: 'PaperNo_ID', Value: 'ID170828000049' }
        , { Name: 'ItemCode', Value: '211566' }
        , { Name: 'ITEM_HOID', Value: '1170726461142' }
        , { Name: 'LOT_ID', Value: '2170828000068' }
        , {
            Name: 'ReceiveResult', Value:
                {
                    RT_CODE: 0
                    , RT_MSG: '找到了'
                    , CN: '211566'
                    , IDN_ID: 'IDN170826000078'
                    , ITEM_HOID: '1170726461142'
                    , ITEM_ID: '211566'
                    , NAME: '文蛤（３００ｇ）真空包'
                    , NG_QTY: 0
                    , NG_WT: 0
                    , PO_QTY: '860 / 860'
                    , PRICE: 65
                    , PRICE_TYPE: 1
                    , QC_QTY: 86
                    , QC_RATE: '10%'
                    , QE_TYPE: 1
                    , QE_TYPE_NAME: '效期'
                    , QE_TYPE_TEXT: ''
                    , QL_TYPE: 0
                    , QTY: 0
                    , QT_TYPE: 1
                    , QT_TYPE_NAME: '表面溫度'
                    , ROW1: '211566 文蛤（３００ｇ）真空包'
                    , ROW2: '約３００ｇ/ 售價 65'
                    , ROW3: '本單應收 860 待收 860'
                    , ROW4: '應抽驗數86 (10%)'
                    , ROW5: '已收良品 0'
                    , ROW6: '已收不良 0'
                    , ROW7: '已收搭贈 0'
                    , SPEC: '約３００ｇ'
                    , UNIT: '包'
                    , UNIT_QTY: 1
                    , UNIT_WEIGHT: 300
                    , WT: 0
                }
        }
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