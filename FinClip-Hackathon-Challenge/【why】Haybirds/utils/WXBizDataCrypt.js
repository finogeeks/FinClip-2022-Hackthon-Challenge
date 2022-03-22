function e(e, s) {
    this.appId = e, this.sessionKey = s;
}

var s = require("./cryptojs/cryptojs.js").Crypto;

getApp();

e.prototype.decryptData = function(e, t) {
    var o = s.util.base64ToBytes(this.sessionKey, "base64");
    e = s.util.base64ToBytes(e, "base64"), t = s.util.base64ToBytes(t, "base64");
    var r = new s.mode.CBC(s.pad.pkcs7);
    try {
        var a = s.AES.decrypt(e, o, {
            asBpytes: !0,
            iv: t,
            mode: r
        }), p = JSON.parse(a);
    } catch (e) {
        console.log(e);
    }
    return p.watermark.appid !== this.appId && console.log(err), p;
}, module.exports = e;