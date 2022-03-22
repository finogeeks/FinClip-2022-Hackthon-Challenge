var e = getApp(), n = require("../../utils/util.js"), t = require("../../nitro.js");

Page({
    data: {
        isIpx: e.globalData.isIpx,
        loaded: !1
    },
    onLoad: function(o) {
        var i = this, r = o.order_id;
        wx.showLoading({
            title: ""
        }), e.getRequest(e.globalData.BASE_URL + "/orders/" + r).then(function(o) {
            console.info("order", o), console.info("stores", e.globalData.stores, {
                id: o.store_id
            });
            var r = t.getStores().find(function(e) {
                return e.id === o.store_id;
            });
            o.ticket.inventory && (o.ticket.inventory.sku_label = n.skuLabel(o.ticket.inventory.sku)), 
            i.setData({
                loaded: !0,
                order: o,
                store: r,
                prepay_action: "created" === o.state && "unpaid" === o.payment_state
            }), wx.hideLoading();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    openAgreement: function() {
        wx.navigateTo({
            url: "/pages/agreement/agreement",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onSubmit: function() {
        this.onCreateOrder();
    },
    onPayOrder: function(e) {
        var n = this.data.order._id;
        t.payOrder(n, function() {
            wx.reLaunch({
                url: "/pages/orders/orders?reload=true"
            });
        }, function() {});
    }
});