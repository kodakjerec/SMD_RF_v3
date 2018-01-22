xcopy /E /D /Y www\build\*.* temp_Upload\build\
xcopy /E /D /Y www\assets\*.* temp_Upload\assets\ 
cordova-hcp build && xcopy /D /Y www\chcp.* temp_Upload\&& xcopy /D /E /Y temp_Upload\*.* \\172.20.20.11\c$\pxmart\RF_Web\RF_DB\Version\www\