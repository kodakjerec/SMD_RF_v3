rem ��scordova plugin
rem cordova-plugin-update

rem ionic ���]
rem ionic build --prod && cordova prepare android

rem �o��hot code push ���A:Staging
rem code-push release-cordova SMDRF android

rem �o��hot code push ���A:Rpoduction, ��o�B�~�൹�ϥΪ�
rem code-push promote SMDRF Staging Production

rem �]��apk
rem cordova build --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android
rem cordova run --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android --device

ionic build --prod && cordova prepare android && code-push release-cordova SMDRF android && code-push promote SMDRF Staging Production




