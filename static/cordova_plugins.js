cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.xiedrsz.xfyspeech/www/xfySpeech.js",
        "id": "com.xiedrsz.xfyspeech.Speech",
        "clobbers": [
            "navigator.xfySpeech"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.xiedrsz.xfyspeech": "1.1.1-dev"
}
// BOTTOM OF METADATA
});