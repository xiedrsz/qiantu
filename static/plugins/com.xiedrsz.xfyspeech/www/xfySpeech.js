cordova.define("com.xiedrsz.xfyspeech.Speech", function(require, exports, module) { //cordova.define("com.xiedrsz.xfyspeech.Speech", function(require, exports, module) {...});
var exec = require('cordova/exec');

module.exports = {
    recognize: function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, "Speech", "recognize", []);
    }
};
});
