REM �]�˦�apk--������
REM ionic cordova build android --prod --release -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android

ionic build --prod

cordova build android --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android
