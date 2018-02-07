rem 更新cordova plugin
rem cordova-plugin-update

rem ionic 打包
rem ionic build --prod && cordova prepare android

rem 發布hot code push 狀態:Staging
rem code-push release-cordova SMDRF android

rem 發布hot code push 狀態:Rpoduction, 到這步才能給使用者
rem code-push promote SMDRF Staging Production

rem 包裝apk
rem cordova build --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android
rem cordova run --debug -- --keystore=mtk6753.keystore --alias=androiddebugkey --storePassword=android --password=android --device

ionic build --prod && cordova prepare android && code-push release-cordova SMDRF android && code-push promote SMDRF Staging Production




