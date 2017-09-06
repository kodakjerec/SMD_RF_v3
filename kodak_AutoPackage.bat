REM 包裝成apk--正式版
REM ionic cordova build android --prod --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android

REM ionic build --prod

cordova build android --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android
