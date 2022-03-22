var e = getApp(), o = require("./configs.js");

require("./utils/pingpp.js");

module.exports = {
    setGlobal: function(o, t) {
        e.globalData[o] = t;
    },
    setStore: function(t) {
        wx.setStorageSync("nitro:storeId", t), e.globalData.storeId = t, e.globalData.store = o.stores.find(function(e) {
            return e._id === t;
        });
    },
    getStore: function(e) {
        var o = e || wx.getStorageSync("nitro:storeId");
        return this.getStores().find(function(e) {
            return e._id === o;
        });
    },
    getStores: function() {
        return o.stores;
    },
    fetchMPConfigs: function() {
        var o = this;
        return e.getRequest("https://haybirds.cn/v1/settings/mp", {}).then(function(e) {
            var t = e.value;
            return console.info("fetchMPConfigs", e), wx.setStorageSync("nitro:mpconfigs", t), 
            o.setGlobal("mpconfigs", t), t;
        });
    },
    checkAvailableDiscounts: function() {
        return e.postRequest(e.globalData.BASE_URL + "/campaign/checkAvailableDiscounts", {
            user_id: e.globalData.userId,
            email: e.globalData.userInfo.email,
            mobile: e.globalData.userInfo.mobile
        }).then(function(e) {
            return console.info("checkAvailableDiscounts", e), e;
        });
    },
    updateWeChatUserInfo: function(o) {
        var t = e.globalData.userId;
        return e.patchRequest(e.globalData.BASE_URL + "/users/" + t + "/wxUserInfo", o);
    },
    fetchProducts: function(o) {
        var t = o || e.globalData.storeId, a = e.globalData.categories, n = e.globalData.items;
        return a && n ? (console.info("fetchProducts() from local"), Promise.resolve().then(function() {
            return {
                categories: a,
                items: n
            };
        })) : Promise.all([ e.getRequest("https://haybirds.cn/v1/product/categories?store_id=" + t, {}), e.getRequest("https://haybirds.cn/v1/product/items?store_id=" + t, {}) ]).then(function(o) {
            var t = o[0], a = o[1];
            return e.globalData.categories = t, e.globalData.items = a, console.info("fetchProducts() from remote"), 
            {
                categories: t,
                items: a
            };
        });
    },
    payOrder: function(o, t, a) {
        wx.showLoading({
            title: "准备支付…",
            mask: !0
        }), o ? (console.log("payOrder app.globalData", e.globalData), e.postRequest(e.globalData.BASE_URL + "/orders/" + o + "/pay", {}).then(function(n) {
            console.info("pay charge", n), n.success = function(o) {
                console.info("success", o), e.globalData.campaign && e.campaignEventLog("prepaid_order"), 
                t && t(), wx.showToast({
                    title: "支付成功",
                    icon: "success",
                    duration: 2e3,
                    success: function() {}
                });
            }, n.fail = function(t) {
                console.info("fail", t);
                var s = "requestPayment:fail cancel" === t.errMsg ? "支付已取消" : "支付失败";
                wx.showToast({
                    title: s,
                    icon: "none",
                    duration: 3e3
                }), console.log("charge.fail", t), e.postRequest(e.globalData.BASE_URL + "/orders/" + o + "/uncharge", {
                    charge_id: n.paySign
                }).then(function(e) {
                    console.info("客户端撤销支付", e), a ? a() : wx.reLaunch({
                        url: "/pages/orders/orders?reload=true"
                    });
                });
            }, n.complete = function(e) {
                console.info("complete", e);
            }, wx.requestPayment(n);
        }, function(e) {
            wx.showToast({
                title: "当前下单人较多，服务器繁忙，请稍后再试。",
                icon: "none",
                duration: 2e3,
                success: function() {
                    setTimeout(function() {
                        wx.removeStorageSync("token"), wx.removeStorageSync("userId"), wx.reLaunch({
                            url: "/pages/stores/stores"
                        });
                    }, 2e3);
                }
            });
        })) : wx.showToast({
            title: "数据异常，请重试。",
            icon: "none",
            duration: 2e3,
            success: function() {}
        });
    }
};