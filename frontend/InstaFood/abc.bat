# download the Firebase SDK config for test project (which is required to make the build succeed)
curl https://raw.githubusercontent.com/dpa99c/cordova-plugin-firebase-test/master/www/google-services.json -o google-services.json

# add the latest cordova-android platform (v8.0.0)
cordova platform remove android
cordova platform add android@latest

# add my fork of this plugin
cordova plugin add cordova-plugin-firebasex

# add plugin to enable AndroidX in the project
cordova plugin add cordova-plugin-androidx

# add plugin to patch existing plugin source that uses the Android Support Library to use AndroidX
cordova plugin add cordova-plugin-androidx-adapter