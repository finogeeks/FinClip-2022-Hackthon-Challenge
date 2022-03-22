var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n) {
    "object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pingpp = n();
}(function() {
    return function e(n, a, t) {
        function r(l, c) {
            if (!a[l]) {
                if (!n[l]) {
                    var o = "function" == typeof require && require;
                    if (!c && o) return o(l, !0);
                    if (i) return i(l, !0);
                    var s = new Error("Cannot find module '" + l + "'");
                    throw s.code = "MODULE_NOT_FOUND", s;
                }
                var u = a[l] = {
                    exports: {}
                };
                n[l][0].call(u.exports, function(e) {
                    return r(n[l][1][e] || e);
                }, u, u.exports, e, n, a, t);
            }
            return a[l].exports;
        }
        for (var i = "function" == typeof require && require, l = 0; l < t.length; l++) r(t[l]);
        return r;
    }({
        1: [ function(e, n, a) {
            var t = e("./payment_elements.js");
            n.exports = {
                userCallback: void 0,
                urlReturnCallback: void 0,
                urlReturnChannels: [ "alipay_pc_direct" ],
                innerCallback: function(e, n) {
                    "function" == typeof this.userCallback && (void 0 === n && (n = this.error()), this.userCallback(e, n), 
                    this.userCallback = void 0, t.clear());
                },
                error: function(e, n) {
                    return e = void 0 === e ? "" : e, n = void 0 === n ? "" : n, {
                        msg: e,
                        extra: n
                    };
                },
                triggerUrlReturnCallback: function(e, n) {
                    "function" == typeof this.urlReturnCallback && this.urlReturnCallback(e, n);
                },
                shouldReturnUrlByCallback: function(e) {
                    return "function" == typeof this.urlReturnCallback && -1 !== this.urlReturnChannels.indexOf(e);
                }
            };
        }, {
            "./payment_elements.js": 30
        } ],
        2: [ function(e, n, a) {
            var t = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_PC_DIRECT_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, a = e.credential[n], i = this.ALIPAY_PC_DIRECT_URL;
                    r.call(a, "channel_url") && (i = a.channel_url), r.call(a, "_input_charset") || r.call(a, "service") && "create_direct_pay_by_user" === a.service && (a._input_charset = "utf-8");
                    var l = t.stringifyData(a, n, !0);
                    t.redirectTo(i + "?" + l, n);
                }
            };
        }, {
            "../utils": 33
        } ],
        3: [ function(e, n, a) {
            var t = {}.hasOwnProperty, r = e("../callbacks");
            n.exports = {
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    t.call(n, "transaction_no") ? this.tradePay(n.transaction_no) : r.innerCallback("fail", r.error("invalid_credential", "missing_field_transaction_no"));
                },
                ready: function(e) {
                    window.AlipayJSBridge ? e && e() : document.addEventListener("AlipayJSBridgeReady", e, !1);
                },
                tradePay: function(e) {
                    this.ready(function() {
                        AlipayJSBridge.call("tradePay", {
                            tradeNO: e
                        }, function(e) {
                            "9000" == e.resultCode ? r.innerCallback("success") : "6001" == e.resultCode ? r.innerCallback("cancel", r.error(e.result)) : r.innerCallback("fail", r.error(e.result));
                        });
                    });
                }
            };
        }, {
            "../callbacks": 1
        } ],
        4: [ function(e, n, a) {
            var t = e("../utils"), r = e("../mods"), i = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_WAP_URL_OLD: "https://wappaygw.alipay.com/service/rest.htm",
                ALIPAY_WAP_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, a = e.credential[n], l = this.ALIPAY_WAP_URL;
                    i.call(a, "req_data") ? l = this.ALIPAY_WAP_URL_OLD : i.call(a, "channel_url") && (l = a.channel_url), 
                    i.call(a, "_input_charset") || (i.call(a, "service") && "alipay.wap.create.direct.pay.by.user" === a.service || i.call(a, "req_data")) && (a._input_charset = "utf-8");
                    var c = l + "?" + t.stringifyData(a, n, !0), o = r.getExtraModule("ap");
                    t.inWeixin() && void 0 !== o ? o.pay(c) : t.redirectTo(c, n);
                }
            };
        }, {
            "../mods": 29,
            "../utils": 33
        } ],
        5: [ function(e, n, a) {
            var t = e("../utils"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    var n = e.channel, a = e.credential[n];
                    i.call(a, "url") ? t.redirectTo(a.url + "?" + t.stringifyData(a, n), n) : r.innerCallback("fail", r.error("invalid_credential", "missing_field:url"));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 33
        } ],
        6: [ function(e, n, a) {
            var t = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_PC_DIRECT_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, a = e.credential[n], i = this.ALIPAY_PC_DIRECT_URL;
                    r.call(a, "channel_url") && (i = a.channel_url), r.call(a, "_input_charset") || r.call(a, "service") && "create_direct_pay_by_user" === a.service && (a._input_charset = "utf-8");
                    var l = t.stringifyData(a, n, !0);
                    t.redirectTo(i + "?" + l, n);
                }
            };
        }, {
            "../utils": 33
        } ],
        7: [ function(e, n, a) {
            var t = e("../utils"), r = e("../mods"), i = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_WAP_URL_OLD: "https://wappaygw.alipay.com/service/rest.htm",
                ALIPAY_WAP_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, a = e.credential[n], l = this.ALIPAY_WAP_URL;
                    i.call(a, "req_data") ? l = this.ALIPAY_WAP_URL_OLD : i.call(a, "channel_url") && (l = a.channel_url), 
                    i.call(a, "_input_charset") || (i.call(a, "service") && "alipay.wap.create.direct.pay.by.user" === a.service || i.call(a, "req_data")) && (a._input_charset = "utf-8");
                    var c = l + "?" + t.stringifyData(a, n, !0), o = r.getExtraModule("ap");
                    t.inWeixin() && void 0 !== o ? o.pay(c) : t.redirectTo(c, n);
                }
            };
        }, {
            "../mods": 29,
            "../utils": 33
        } ],
        8: [ function(e, n, a) {
            var t = e("../callbacks"), r = e("../utils"), i = e("../stash"), l = e("../mods"), c = {}.hasOwnProperty;
            n.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://notify.pingxx.com/notify",
                handleCharge: function(e) {
                    for (var n = e.credential[e.channel], a = [ "appId", "timeStamp", "nonceStr", "package", "signType", "paySign" ], r = 0; r < a.length; r++) if (!c.call(n, a[r])) return void t.innerCallback("fail", t.error("invalid_credential", "missing_field_" + a[r]));
                    i.jsApiParameters = n, this.callpay();
                },
                callpay: function() {
                    var e = this, n = l.getExtraModule("wx_jssdk");
                    if (void 0 !== n && n.jssdkEnabled()) n.callpay(); else if ("undefined" == typeof WeixinJSBridge) {
                        var a = function() {
                            e.jsApiCall();
                        };
                        document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", a, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", a), 
                        document.attachEvent("onWeixinJSBridgeReady", a));
                    } else this.jsApiCall();
                },
                jsApiCall: function() {
                    c.call(i, "jsApiParameters") && WeixinJSBridge.invoke("getBrandWCPayRequest", i.jsApiParameters, function(e) {
                        delete i.jsApiParameters, "get_brand_wcpay_request:ok" == e.err_msg ? t.innerCallback("success") : "get_brand_wcpay_request:cancel" == e.err_msg ? t.innerCallback("cancel") : t.innerCallback("fail", t.error("wx_result_fail", e.err_msg));
                    });
                },
                runTestMode: function(e) {
                    if (confirm("模拟付款？")) {
                        var n = "/charges/" + e.id;
                        r.request(this.PINGPP_NOTIFY_URL_BASE + n + "?livemode=false", "GET", null, function(e, n) {
                            if (n >= 200 && n < 400 && "success" == e) t.innerCallback("success"); else {
                                var a = "http_code:" + n + ";response:" + e;
                                t.innerCallback("fail", t.error("testmode_notify_fail", a));
                            }
                        }, function() {
                            t.innerCallback("fail", t.error("network_err"));
                        });
                    }
                }
            };
        }, {
            "../callbacks": 1,
            "../mods": 29,
            "../stash": 31,
            "../utils": 33
        } ],
        9: [ function(e, n, a) {
            var t = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                CMB_WALLET_URL: "https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay",
                handleCharge: function(e) {
                    var n = e.credential[e.channel], a = this.CMB_WALLET_URL;
                    r.call(n, "ChannelUrl") && (a = n.ChannelUrl, delete n.ChannelUrl), r.call(n, "channelVersion") && delete n.channelVersion, 
                    t.formSubmit(a, "post", n);
                }
            };
        }, {
            "../utils": 33
        } ],
        10: [ function(e, n, a) {
            var t = e("../../utils"), r = e("../../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    var n, a = e.credential[e.channel];
                    if ("string" == typeof a) n = a; else {
                        if (!i.call(a, "url")) return void r.innerCallback("fail", r.error("invalid_credential", "credential format is incorrect"));
                        n = a.url;
                    }
                    t.redirectTo(n, e.channel);
                }
            };
        }, {
            "../../callbacks": 1,
            "../../utils": 33
        } ],
        11: [ function(e, n, a) {
            var t = e("../utils");
            n.exports = {
                CP_B2B_URL: "https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    t.formSubmit(this.CP_B2B_URL, "post", n);
                }
            };
        }, {
            "../utils": 33
        } ],
        12: [ function(e, n, a) {
            var t = e("../../stash"), r = {}.hasOwnProperty;
            !function() {
                var e = {}, a = {};
                a.PADCHAR = "=", a.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", 
                a.makeDOMException = function() {
                    try {
                        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
                    } catch (n) {
                        var e = new Error("DOM Exception 5");
                        return e.code = e.number = 5, e.name = e.description = "INVALID_CHARACTER_ERR", 
                        e.toString = function() {
                            return "Error: " + e.name + ": " + e.message;
                        }, e;
                    }
                }, a.getbyte64 = function(e, n) {
                    var t = a.ALPHA.indexOf(e.charAt(n));
                    if (-1 === t) throw a.makeDOMException();
                    return t;
                }, a.decode = function(e) {
                    e = "" + e;
                    var n, t, r, i = a.getbyte64, l = e.length;
                    if (0 === l) return e;
                    if (l % 4 != 0) throw a.makeDOMException();
                    n = 0, e.charAt(l - 1) === a.PADCHAR && (n = 1, e.charAt(l - 2) === a.PADCHAR && (n = 2), 
                    l -= 4);
                    var c = [];
                    for (t = 0; t < l; t += 4) r = i(e, t) << 18 | i(e, t + 1) << 12 | i(e, t + 2) << 6 | i(e, t + 3), 
                    c.push(String.fromCharCode(r >> 16, r >> 8 & 255, 255 & r));
                    switch (n) {
                      case 1:
                        r = i(e, t) << 18 | i(e, t + 1) << 12 | i(e, t + 2) << 6, c.push(String.fromCharCode(r >> 16, r >> 8 & 255));
                        break;

                      case 2:
                        r = i(e, t) << 18 | i(e, t + 1) << 12, c.push(String.fromCharCode(r >> 16));
                    }
                    return c.join("");
                }, a.getbyte = function(e, n) {
                    var t = e.charCodeAt(n);
                    if (t > 255) throw a.makeDOMException();
                    return t;
                }, a.encode = function(e) {
                    if (1 !== arguments.length) throw new SyntaxError("Not enough arguments");
                    var n, t, r = a.PADCHAR, i = a.ALPHA, l = a.getbyte, c = [], o = (e = "" + e).length - e.length % 3;
                    if (0 === e.length) return e;
                    for (n = 0; n < o; n += 3) t = l(e, n) << 16 | l(e, n + 1) << 8 | l(e, n + 2), c.push(i.charAt(t >> 18)), 
                    c.push(i.charAt(t >> 12 & 63)), c.push(i.charAt(t >> 6 & 63)), c.push(i.charAt(63 & t));
                    switch (e.length - o) {
                      case 1:
                        t = l(e, n) << 16, c.push(i.charAt(t >> 18) + i.charAt(t >> 12 & 63) + r + r);
                        break;

                      case 2:
                        t = l(e, n) << 16 | l(e, n + 1) << 8, c.push(i.charAt(t >> 18) + i.charAt(t >> 12 & 63) + i.charAt(t >> 6 & 63) + r);
                    }
                    return c.join("");
                }, e.url = "pay.htm", e.pay = function(n) {
                    var i = encodeURIComponent(a.encode(n));
                    r.call(t, "APURL") && (e.url = t.APURL), location.href = e.url + "?goto=" + i;
                }, e.decode = function(e) {
                    return a.decode(decodeURIComponent(e));
                }, n.exports = e;
            }();
        }, {
            "../../stash": 31
        } ],
        13: [ function(e, n, a) {
            var t = e("./commons/redirect_base");
            n.exports = {
                handleCharge: function(e) {
                    t.handleCharge(e);
                }
            };
        }, {
            "./commons/redirect_base": 10
        } ],
        14: [ function(e, n, a) {
            arguments[4][13][0].apply(a, arguments);
        }, {
            "./commons/redirect_base": 10,
            dup: 13
        } ],
        15: [ function(e, n, a) {
            var t = e("./commons/redirect_base"), r = e("../callbacks"), i = e("../utils"), l = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    var n = e.extra;
                    if (l.call(n, "pay_channel")) {
                        var a = n.pay_channel;
                        "wx" !== a || i.inWeixin() ? "alipay" !== a || i.inAlipay() ? t.handleCharge(e) : r.innerCallback("fail", r.error("Not in the Alipay browser")) : r.innerCallback("fail", r.error("Not in the WeChat browser"));
                    } else r.innerCallback("fail", r.error("invalid_charge", "charge 格式不正确"));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 33,
            "./commons/redirect_base": 10
        } ],
        16: [ function(e, n, a) {
            var t = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                JDPAY_WAP_URL_OLD: "https://m.jdpay.com/wepay/web/pay",
                JDPAY_H5_URL: "https://h5pay.jd.com/jdpay/saveOrder",
                JDPAY_PC_URL: "https://wepay.jd.com/jdpay/saveOrder",
                handleCharge: function(e) {
                    var n = e.credential[e.channel], a = this.JDPAY_H5_URL;
                    r.call(n, "channelUrl") ? (a = n.channelUrl, delete n.channelUrl) : r.call(n, "merchantRemark") && (a = this.JDPAY_WAP_URL_OLD), 
                    t.formSubmit(a, "post", n);
                }
            };
        }, {
            "../utils": 33
        } ],
        17: [ function(e, n, a) {
            var t = e("../utils");
            n.exports = {
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    t.redirectTo(n);
                }
            };
        }, {
            "../utils": 33
        } ],
        18: [ function(e, n, a) {
            var t = e("../callbacks"), r = e("../utils"), i = e("../stash"), l = {}.hasOwnProperty;
            n.exports = {
                SRC_URL: "https://open.mobile.qq.com/sdk/qqapi.js?_bid=152",
                ID: "mqq_api",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    l.call(n, "token_id") ? (i.tokenId = n.token_id, r.loadUrlJs(this.ID, this.SRC_URL, this.callpay)) : t.innerCallback("fail", t.error("invalid_credential", "missing_token_id"));
                },
                callpay: function() {
                    if ("undefined" != typeof mqq) {
                        if (0 == mqq.QQVersion) return t.innerCallback("fail", t.error("Not in the QQ client")), 
                        void delete i.tokenId;
                        mqq.tenpay.pay({
                            tokenId: i.tokenId
                        }, function(e) {
                            0 == e.resultCode ? t.innerCallback("success") : t.innerCallback("fail", t.error(e.retmsg));
                        });
                    } else t.innerCallback("fail", t.error("network_err"));
                    delete i.tokenId;
                }
            };
        }, {
            "../callbacks": 1,
            "../stash": 31,
            "../utils": 33
        } ],
        19: [ function(e, n, a) {
            var t = e("../utils");
            n.exports = {
                UPACP_PC_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    t.formSubmit(this.UPACP_PC_URL, "post", n);
                }
            };
        }, {
            "../utils": 33
        } ],
        20: [ function(e, n, a) {
            var t = e("../utils");
            n.exports = {
                UPACP_WAP_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    t.formSubmit(this.UPACP_WAP_URL, "post", n);
                }
            };
        }, {
            "../utils": 33
        } ],
        21: [ function(e, n, a) {
            var t = e("../stash"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://notify.pingxx.com/notify",
                handleCharge: function(e) {
                    for (var n = e.credential[e.channel], a = [ "appId", "timeStamp", "nonceStr", "package", "signType", "paySign" ], l = 0; l < a.length; l++) if (!i.call(n, a[l])) return void r.innerCallback("fail", r.error("invalid_credential", "missing_field_" + a[l]));
                    t.jsApiParameters = n, this.callpay();
                },
                wxLiteEnabled: function() {
                    return "undefined" != typeof wx && wx.requestPayment;
                },
                callpay: function() {
                    if (this.wxLiteEnabled()) {
                        var e = t.jsApiParameters;
                        delete e.appId, e.complete = function(e) {
                            "requestPayment:ok" === e.errMsg && r.innerCallback("success"), "requestPayment:cancel" === e.errMsg && r.innerCallback("cancel", r.error("用户取消支付")), 
                            "undefined" !== e.err_code && "undefined" !== e.err_desc && r.innerCallback("fail", r.error(e.err_desc, e));
                        }, wx.requestPayment(e);
                    } else console.log("请在微信小程序中打开");
                },
                runTestMode: function(e) {
                    var n = "/charges/" + e.id;
                    wx.request({
                        url: this.PINGPP_NOTIFY_URL_BASE + n + "?livemode=false",
                        success: function(e) {
                            "success" == e.data ? r.innerCallback("success") : r.innerCallback("fail", r.error("testmode_notify_fail"));
                        },
                        fail: function() {
                            r.innerCallback("fail", r.error("network_err"));
                        }
                    });
                }
            };
        }, {
            "../callbacks": 1,
            "../stash": 31
        } ],
        22: [ function(e, n, a) {
            arguments[4][8][0].apply(a, arguments);
        }, {
            "../callbacks": 1,
            "../mods": 29,
            "../stash": 31,
            "../utils": 33,
            dup: 8
        } ],
        23: [ function(n, a, t) {
            var r = n("../utils"), i = n("../callbacks"), l = {}.hasOwnProperty;
            a.exports = {
                handleCharge: function(n) {
                    var a = n.credential[n.channel];
                    "string" == typeof a ? r.redirectTo(a, n.channel) : "object" == (void 0 === a ? "undefined" : e(a)) && l.call(a, "url") ? r.redirectTo(a.url, n.channel) : i.innerCallback("fail", i.error("invalid_credential", "credential 格式不正确"));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 33
        } ],
        24: [ function(e, n, a) {
            var t = e("../utils"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                YEEPAY_WAP_URL: "https://ok.yeepay.com/paymobile/api/pay/request",
                YEEPAY_WAP_TEST_URL: "http://mobiletest.yeepay.com/paymobile/api/pay/request",
                handleCharge: function(e) {
                    for (var n = e.channel, a = e.credential[n], l = [ "merchantaccount", "encryptkey", "data" ], c = 0; c < l.length; c++) if (!i.call(a, l[c])) return void r.innerCallback("fail", r.error("invalid_credential", "missing_field_" + l[c]));
                    var o;
                    o = i.call(a, "mode") && "test" == a.mode ? this.YEEPAY_WAP_TEST_URL : this.YEEPAY_WAP_URL, 
                    t.redirectTo(o + "?" + t.stringifyData(a, n, !0), e.channel);
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 33
        } ],
        25: [ function(e, n, a) {
            var t = e("./utils"), r = e("./stash"), i = e("./libs/md5"), l = {
                seperator: "###",
                limit: 1,
                report_url: "https://statistics.pingxx.com/one_stats",
                timeout: 100
            }, c = function(e, n) {
                var a = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i"), t = e.substr(0).match(a);
                return null !== t ? unescape(t[2]) : null;
            }, o = function() {
                return navigator.userAgent;
            }, s = function() {
                return window.location.host;
            };
            l.store = function(e) {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var n = this, a = {};
                    a.app_id = e.app_id || r.app_id || "app_not_defined", a.ch_id = e.ch_id || "", a.channel = e.channel || "", 
                    a.type = e.type || "", a.user_agent = o(), a.host = s(), a.time = new Date().getTime(), 
                    a.puid = r.puid;
                    var t = "app_id=" + a.app_id + "&channel=" + a.channel + "&ch_id=" + a.ch_id + "&host=" + a.host + "&time=" + a.time + "&type=" + a.type + "&user_agent=" + a.user_agent + "&puid=" + a.puid, i = t;
                    null !== localStorage.getItem("PPP_ONE_STATS") && 0 !== localStorage.getItem("PPP_ONE_STATS").length && (i = localStorage.getItem("PPP_ONE_STATS") + n.seperator + t);
                    try {
                        localStorage.setItem("PPP_ONE_STATS", i);
                    } catch (e) {}
                }
            }, l.send = function() {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var e = this, n = localStorage.getItem("PPP_ONE_STATS");
                    if (!(null === n || n.split(e.seperator).length < e.limit)) try {
                        for (var a = [], r = n.split(e.seperator), l = i(r.join("&")), o = 0; o < r.length; o++) a.push({
                            app_id: c(r[o], "app_id"),
                            channel: c(r[o], "channel"),
                            ch_id: c(r[o], "ch_id"),
                            host: c(r[o], "host"),
                            time: c(r[o], "time"),
                            type: c(r[o], "type"),
                            user_agent: c(r[o], "user_agent"),
                            puid: c(r[o], "puid")
                        });
                        t.request(e.report_url, "POST", a, function(e, n) {
                            200 == n && localStorage.removeItem("PPP_ONE_STATS");
                        }, void 0, {
                            "X-Pingpp-Report-Token": l
                        });
                    } catch (e) {}
                }
            }, l.report = function(e) {
                var n = this;
                n.store(e), setTimeout(function() {
                    n.send();
                }, n.timeout);
            }, n.exports = l;
        }, {
            "./libs/md5": 27,
            "./stash": 31,
            "./utils": 33
        } ],
        26: [ function(e, n, a) {
            var t = e("./stash"), r = e("./utils"), i = e("./collection");
            n.exports = {
                SRC_URL: "https://cookie.pingxx.com",
                init: function() {
                    var e = this;
                    r.documentReady(function() {
                        try {
                            e.initPuid();
                        } catch (e) {}
                    });
                },
                initPuid: function() {
                    if ("undefined" != typeof window && "undefined" != typeof localStorage && null !== localStorage) {
                        var e = localStorage.getItem("pingpp_uid");
                        if (null === e) {
                            e = r.randomString();
                            try {
                                localStorage.setItem("pingpp_uid", e);
                            } catch (e) {}
                        }
                        if (t.puid = e, !document.getElementById("p_analyse_iframe")) {
                            var n;
                            try {
                                n = document.createElement("iframe");
                            } catch (e) {
                                n = document.createElement('<iframe name="ifr"></iframe>');
                            }
                            n.id = "p_analyse_iframe", n.src = this.SRC_URL + "/?puid=" + e, n.style.display = "none", 
                            document.body.appendChild(n);
                        }
                        setTimeout(function() {
                            i.send();
                        }, 0);
                    }
                }
            };
        }, {
            "./collection": 25,
            "./stash": 31,
            "./utils": 33
        } ],
        27: [ function(e, n, a) {
            !function() {
                function e(e, n) {
                    var a = (65535 & e) + (65535 & n);
                    return (e >> 16) + (n >> 16) + (a >> 16) << 16 | 65535 & a;
                }
                function a(e, n) {
                    return e << n | e >>> 32 - n;
                }
                function t(n, t, r, i, l, c) {
                    return e(a(e(e(t, n), e(i, c)), l), r);
                }
                function r(e, n, a, r, i, l, c) {
                    return t(n & a | ~n & r, e, n, i, l, c);
                }
                function i(e, n, a, r, i, l, c) {
                    return t(n & r | a & ~r, e, n, i, l, c);
                }
                function l(e, n, a, r, i, l, c) {
                    return t(n ^ a ^ r, e, n, i, l, c);
                }
                function c(e, n, a, r, i, l, c) {
                    return t(a ^ (n | ~r), e, n, i, l, c);
                }
                function o(n, a) {
                    n[a >> 5] |= 128 << a % 32, n[14 + (a + 64 >>> 9 << 4)] = a;
                    var t, o, s, u, d, p = 1732584193, h = -271733879, f = -1732584194, _ = 271733878;
                    for (t = 0; t < n.length; t += 16) o = p, s = h, u = f, d = _, h = c(h = c(h = c(h = c(h = l(h = l(h = l(h = l(h = i(h = i(h = i(h = i(h = r(h = r(h = r(h = r(h, f = r(f, _ = r(_, p = r(p, h, f, _, n[t], 7, -680876936), h, f, n[t + 1], 12, -389564586), p, h, n[t + 2], 17, 606105819), _, p, n[t + 3], 22, -1044525330), f = r(f, _ = r(_, p = r(p, h, f, _, n[t + 4], 7, -176418897), h, f, n[t + 5], 12, 1200080426), p, h, n[t + 6], 17, -1473231341), _, p, n[t + 7], 22, -45705983), f = r(f, _ = r(_, p = r(p, h, f, _, n[t + 8], 7, 1770035416), h, f, n[t + 9], 12, -1958414417), p, h, n[t + 10], 17, -42063), _, p, n[t + 11], 22, -1990404162), f = r(f, _ = r(_, p = r(p, h, f, _, n[t + 12], 7, 1804603682), h, f, n[t + 13], 12, -40341101), p, h, n[t + 14], 17, -1502002290), _, p, n[t + 15], 22, 1236535329), f = i(f, _ = i(_, p = i(p, h, f, _, n[t + 1], 5, -165796510), h, f, n[t + 6], 9, -1069501632), p, h, n[t + 11], 14, 643717713), _, p, n[t], 20, -373897302), f = i(f, _ = i(_, p = i(p, h, f, _, n[t + 5], 5, -701558691), h, f, n[t + 10], 9, 38016083), p, h, n[t + 15], 14, -660478335), _, p, n[t + 4], 20, -405537848), f = i(f, _ = i(_, p = i(p, h, f, _, n[t + 9], 5, 568446438), h, f, n[t + 14], 9, -1019803690), p, h, n[t + 3], 14, -187363961), _, p, n[t + 8], 20, 1163531501), f = i(f, _ = i(_, p = i(p, h, f, _, n[t + 13], 5, -1444681467), h, f, n[t + 2], 9, -51403784), p, h, n[t + 7], 14, 1735328473), _, p, n[t + 12], 20, -1926607734), f = l(f, _ = l(_, p = l(p, h, f, _, n[t + 5], 4, -378558), h, f, n[t + 8], 11, -2022574463), p, h, n[t + 11], 16, 1839030562), _, p, n[t + 14], 23, -35309556), f = l(f, _ = l(_, p = l(p, h, f, _, n[t + 1], 4, -1530992060), h, f, n[t + 4], 11, 1272893353), p, h, n[t + 7], 16, -155497632), _, p, n[t + 10], 23, -1094730640), f = l(f, _ = l(_, p = l(p, h, f, _, n[t + 13], 4, 681279174), h, f, n[t], 11, -358537222), p, h, n[t + 3], 16, -722521979), _, p, n[t + 6], 23, 76029189), f = l(f, _ = l(_, p = l(p, h, f, _, n[t + 9], 4, -640364487), h, f, n[t + 12], 11, -421815835), p, h, n[t + 15], 16, 530742520), _, p, n[t + 2], 23, -995338651), f = c(f, _ = c(_, p = c(p, h, f, _, n[t], 6, -198630844), h, f, n[t + 7], 10, 1126891415), p, h, n[t + 14], 15, -1416354905), _, p, n[t + 5], 21, -57434055), f = c(f, _ = c(_, p = c(p, h, f, _, n[t + 12], 6, 1700485571), h, f, n[t + 3], 10, -1894986606), p, h, n[t + 10], 15, -1051523), _, p, n[t + 1], 21, -2054922799), f = c(f, _ = c(_, p = c(p, h, f, _, n[t + 8], 6, 1873313359), h, f, n[t + 15], 10, -30611744), p, h, n[t + 6], 15, -1560198380), _, p, n[t + 13], 21, 1309151649), f = c(f, _ = c(_, p = c(p, h, f, _, n[t + 4], 6, -145523070), h, f, n[t + 11], 10, -1120210379), p, h, n[t + 2], 15, 718787259), _, p, n[t + 9], 21, -343485551), 
                    p = e(p, o), h = e(h, s), f = e(f, u), _ = e(_, d);
                    return [ p, h, f, _ ];
                }
                function s(e) {
                    var n, a = "";
                    for (n = 0; n < 32 * e.length; n += 8) a += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
                    return a;
                }
                function u(e) {
                    var n, a = [];
                    for (a[(e.length >> 2) - 1] = void 0, n = 0; n < a.length; n += 1) a[n] = 0;
                    for (n = 0; n < 8 * e.length; n += 8) a[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
                    return a;
                }
                function d(e) {
                    return s(o(u(e), 8 * e.length));
                }
                function p(e, n) {
                    var a, t, r = u(e), i = [], l = [];
                    for (i[15] = l[15] = void 0, r.length > 16 && (r = o(r, 8 * e.length)), a = 0; a < 16; a += 1) i[a] = 909522486 ^ r[a], 
                    l[a] = 1549556828 ^ r[a];
                    return t = o(i.concat(u(n)), 512 + 8 * n.length), s(o(l.concat(t), 640));
                }
                function h(e) {
                    var n, a, t = "";
                    for (a = 0; a < e.length; a += 1) n = e.charCodeAt(a), t += "0123456789abcdef".charAt(n >>> 4 & 15) + "0123456789abcdef".charAt(15 & n);
                    return t;
                }
                function f(e) {
                    return unescape(encodeURIComponent(e));
                }
                function _(e) {
                    return d(f(e));
                }
                function y(e) {
                    return h(_(e));
                }
                function m(e, n) {
                    return p(f(e), f(n));
                }
                function g(e, n) {
                    return h(m(e, n));
                }
                n.exports = function(e, n, a) {
                    return n ? a ? m(n, e) : g(n, e) : a ? _(e) : y(e);
                };
            }();
        }, {} ],
        28: [ function(n, a, t) {
            var r = n("./version").v, i = {}.hasOwnProperty, l = function() {
                n("./init").init();
            };
            l.prototype.version = r, a.exports = new l();
            var c = n("./testmode"), o = n("./callbacks"), s = n("./mods"), u = n("./stash"), d = n("./collection"), p = n("./payment_elements");
            l.prototype.createPayment = function(n, a, t, r) {
                if ("function" == typeof a && (o.userCallback = a), p.init(n), i.call(p, "id")) if (i.call(p, "channel")) {
                    i.call(p, "app") && ("string" == typeof p.app ? u.app_id = p.app : "object" == e(p.app) && "string" == typeof p.app.id && (u.app_id = p.app.id)), 
                    d.report({
                        type: u.type || "pure_sdk_click",
                        channel: p.channel,
                        ch_id: p.id
                    });
                    var l = p.channel;
                    if (i.call(p, "credential")) if (p.credential) if (i.call(p.credential, l)) if (i.call(p, "livemode")) {
                        var h = s.getChannelModule(l);
                        if (void 0 === h) return console.error('channel module "' + l + '" is undefined'), 
                        void o.innerCallback("fail", o.error("invalid_channel", 'channel module "' + l + '" is undefined'));
                        !1 !== p.livemode ? (void 0 !== t && (u.signature = t), "boolean" == typeof r && (u.debug = r), 
                        h.handleCharge(p)) : i.call(h, "runTestMode") ? h.runTestMode(p) : c.runTestMode(p);
                    } else o.innerCallback("fail", o.error("invalid_charge", "no_livemode_field")); else o.innerCallback("fail", o.error("invalid_credential", "credential_is_incorrect")); else o.innerCallback("fail", o.error("invalid_credential", "credential_is_undefined")); else o.innerCallback("fail", o.error("invalid_charge", "no_credential"));
                } else o.innerCallback("fail", o.error("invalid_charge", "no_channel")); else o.innerCallback("fail", o.error("invalid_charge", "no_charge_id"));
            }, l.prototype.setAPURL = function(e) {
                u.APURL = e;
            }, l.prototype.setUrlReturnCallback = function(e, n) {
                if ("function" != typeof e) throw "callback need to be a function";
                if (o.urlReturnCallback = e, void 0 !== n) {
                    if (!Array.isArray(n)) throw "channels need to be an array";
                    o.urlReturnChannels = n;
                }
            };
        }, {
            "./callbacks": 1,
            "./collection": 25,
            "./init": 26,
            "./mods": 29,
            "./payment_elements": 30,
            "./stash": 31,
            "./testmode": 32,
            "./version": 34
        } ],
        29: [ function(e, n, a) {
            var t = {}.hasOwnProperty, r = {};
            n.exports = r, r.channels = {
                alipay_pc_direct: e("./channels/alipay_pc_direct"),
                alipay_qr: e("./channels/alipay_qr"),
                alipay_wap: e("./channels/alipay_wap"),
                bfb_wap: e("./channels/bfb_wap"),
                cb_alipay_pc_direct: e("./channels/cb_alipay_pc_direct"),
                cb_alipay_wap: e("./channels/cb_alipay_wap"),
                cb_wx_pub: e("./channels/cb_wx_pub"),
                cmb_wallet: e("./channels/cmb_wallet"),
                cp_b2b: e("./channels/cp_b2b"),
                fqlpay_qr: e("./channels/fqlpay_qr"),
                fqlpay_wap: e("./channels/fqlpay_wap"),
                isv_wap: e("./channels/isv_wap"),
                jdpay_wap: e("./channels/jdpay_wap"),
                paypal: e("./channels/paypal"),
                qpay_pub: e("./channels/qpay_pub"),
                upacp_pc: e("./channels/upacp_pc"),
                upacp_wap: e("./channels/upacp_wap"),
                wx_lite: e("./channels/wx_lite"),
                wx_pub: e("./channels/wx_pub"),
                wx_wap: e("./channels/wx_wap"),
                yeepay_wap: e("./channels/yeepay_wap")
            }, r.extras = {
                ap: e("./channels/extras/ap")
            }, r.getChannelModule = function(e) {
                if (t.call(r.channels, e)) return r.channels[e];
            }, r.getExtraModule = function(e) {
                if (t.call(r.extras, e)) return r.extras[e];
            };
        }, {
            "./channels/alipay_pc_direct": 2,
            "./channels/alipay_qr": 3,
            "./channels/alipay_wap": 4,
            "./channels/bfb_wap": 5,
            "./channels/cb_alipay_pc_direct": 6,
            "./channels/cb_alipay_wap": 7,
            "./channels/cb_wx_pub": 8,
            "./channels/cmb_wallet": 9,
            "./channels/cp_b2b": 11,
            "./channels/extras/ap": 12,
            "./channels/fqlpay_qr": 13,
            "./channels/fqlpay_wap": 14,
            "./channels/isv_wap": 15,
            "./channels/jdpay_wap": 16,
            "./channels/paypal": 17,
            "./channels/qpay_pub": 18,
            "./channels/upacp_pc": 19,
            "./channels/upacp_wap": 20,
            "./channels/wx_lite": 21,
            "./channels/wx_pub": 22,
            "./channels/wx_wap": 23,
            "./channels/yeepay_wap": 24
        } ],
        30: [ function(e, n, a) {
            var t = e("./callbacks"), r = {}.hasOwnProperty;
            n.exports = {
                id: null,
                or_id: null,
                channel: null,
                app: null,
                credential: {},
                extra: null,
                livemode: null,
                order_no: null,
                time_expire: null,
                init: function(e) {
                    var n;
                    if ("string" == typeof e) try {
                        n = JSON.parse(e);
                    } catch (e) {
                        return void t.innerCallback("fail", t.error("json_decode_fail", e));
                    } else n = e;
                    if (void 0 !== n) {
                        if (r.call(n, "object") && "order" == n.object) {
                            n.or_id = n.id, n.order_no = n.merchant_order_no;
                            var a = n.charge_essentials;
                            if (n.channel = a.channel, n.credential = a.credential, n.extra = a.extra, r.call(n, "charge") && null != n.charge) n.id = n.charge; else if (r.call(a, "id") && null != a.id) n.id = a.id; else if (r.call(n, "charges")) for (var i = 0; i < n.charges.data.length; i++) if (n.charges.data[i].channel === a.channel) {
                                n.id = n.charges.data[i].id;
                                break;
                            }
                        } else r.call(n, "object") && "recharge" == n.object && (n = n.charge);
                        for (var l in this) r.call(n, l) && (this[l] = n[l]);
                        return this;
                    }
                    t.innerCallback("fail", t.error("json_decode_fail"));
                },
                clear: function() {
                    for (var e in this) "function" != typeof this[e] && (this[e] = null);
                }
            };
        }, {
            "./callbacks": 1
        } ],
        31: [ function(e, n, a) {
            n.exports = {};
        }, {} ],
        32: [ function(e, n, a) {
            var t = e("./utils"), r = {}.hasOwnProperty;
            n.exports = {
                PINGPP_MOCK_URL: "http://sissi.pingxx.com/mock.php",
                runTestMode: function(e) {
                    var n = {
                        ch_id: e.id,
                        scheme: "http",
                        channel: e.channel
                    };
                    r.call(e, "order_no") ? n.order_no = e.order_no : r.call(e, "orderNo") && (n.order_no = e.orderNo), 
                    r.call(e, "time_expire") ? n.time_expire = e.time_expire : r.call(e, "timeExpire") && (n.time_expire = e.timeExpire), 
                    r.call(e, "extra") && (n.extra = encodeURIComponent(JSON.stringify(e.extra))), t.redirectTo(this.PINGPP_MOCK_URL + "?" + t.stringifyData(n), e.channel);
                }
            };
        }, {
            "./utils": 33
        } ],
        33: [ function(n, a, t) {
            var r = n("./callbacks"), i = {}.hasOwnProperty, l = a.exports = {
                stringifyData: function(e, n, a) {
                    void 0 === a && (a = !1);
                    var t = [];
                    for (var r in e) i.call(e, r) && "function" != typeof e[r] && ("bfb_wap" == n && "url" == r || "yeepay_wap" == n && "mode" == r || "channel_url" != r && t.push(r + "=" + (a ? encodeURIComponent(e[r]) : e[r])));
                    return t.join("&");
                },
                request: function(n, a, t, r, c, o) {
                    if ("undefined" != typeof XMLHttpRequest) {
                        var s = new XMLHttpRequest();
                        if (void 0 !== s.timeout && (s.timeout = 6e3), "GET" === (a = a.toUpperCase()) && "object" == (void 0 === t ? "undefined" : e(t)) && t && (n += "?" + l.stringifyData(t, "", !0)), 
                        s.open(a, n, !0), void 0 !== o) for (var u in o) i.call(o, u) && s.setRequestHeader(u, o[u]);
                        "POST" === a ? (s.setRequestHeader("Content-type", "application/json; charset=utf-8"), 
                        s.send(JSON.stringify(t))) : s.send(), void 0 === r && (r = function() {}), void 0 === c && (c = function() {}), 
                        s.onreadystatechange = function() {
                            4 == s.readyState && r(s.responseText, s.status, s);
                        }, s.onerror = function(e) {
                            c(s, 0, e);
                        };
                    } else console.log("Function XMLHttpRequest is undefined.");
                },
                formSubmit: function(e, n, a) {
                    if ("undefined" != typeof window) {
                        var t = document.createElement("form");
                        t.setAttribute("method", n), t.setAttribute("action", e);
                        for (var r in a) if (i.call(a, r)) {
                            var l = document.createElement("input");
                            l.setAttribute("type", "hidden"), l.setAttribute("name", r), l.setAttribute("value", a[r]), 
                            t.appendChild(l);
                        }
                        document.body.appendChild(t), t.submit();
                    } else console.log("Not a browser, form submit url: " + e);
                },
                randomString: function(e) {
                    void 0 === e && (e = 32);
                    for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", a = n.length, t = "", r = 0; r < e; r++) t += n.charAt(Math.floor(Math.random() * a));
                    return t;
                },
                redirectTo: function(e, n) {
                    r.shouldReturnUrlByCallback(n) ? r.triggerUrlReturnCallback(null, e) : "undefined" != typeof window ? window.location.href = e : console.log("Not a browser, redirect url: " + e);
                },
                inWeixin: function() {
                    return "undefined" != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf("micromessenger");
                },
                inAlipay: function() {
                    return "undefined" != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf("alipayclient");
                },
                documentReady: function(e) {
                    "undefined" != typeof document ? "loading" != document.readyState ? e() : document.addEventListener("DOMContentLoaded", e) : e();
                },
                loadUrlJs: function(e, n, a) {
                    var t = document.getElementsByTagName("head")[0], r = null;
                    null == document.getElementById(e) ? ((r = document.createElement("script")).setAttribute("type", "text/javascript"), 
                    r.setAttribute("src", n), r.setAttribute("id", e), r.async = !0, null != a && (r.onload = r.onreadystatechange = function() {
                        if (r.ready) return !1;
                        r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (r.ready = !0, 
                        a());
                    }), t.appendChild(r)) : null != a && a();
                }
            };
        }, {
            "./callbacks": 1
        } ],
        34: [ function(e, n, a) {
            n.exports = {
                v: "2.2.2"
            };
        }, {} ]
    }, {}, [ 28 ])(28);
});