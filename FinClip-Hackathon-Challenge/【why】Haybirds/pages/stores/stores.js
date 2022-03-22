var o = require("../../nitro.js"), t = getApp();

Page({
    data: {
        isIpx: t.globalData.isIpx,
        stores: []
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.showLoading({
            title: ""
        }), wx.setNavigationBarTitle({
            title: "haybirds儿童摄影"
        }),


        delete t.globalData.categories, delete t.globalData.items, delete t.globalData.themeGroups, 
        console.info("onShow clean data", t.globalData),
        console.info("onShown12321321")
        ,t.login(function() {
            console.info("app.login1111()"), console.info("stores111", o.getStore()),
            o.fetchMPConfigs(), 
            o.checkAvailableDiscounts().then(function(o) {
                console.info("results", o), o.length > 0 && (t.globalData.campaign = o[0]);
            }).catch(function(o) {
                return console.error("ERROR", o);
            }), e.setData({
                loaded: !0,
                stores: o.getStores().filter(function(o) {
                    return "active" === o.state;
                })
            }), t.globalData.BASE_URL.indexOf("nitro-api-test") > -1 && wx.showToast({
                title: "当前正在使用测试环境",
                icon: "none",
                duration: 1e3
            }), wx.hideLoading();
        });

        
    },

    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    initStores: function() {},





    storeTapHandler: function(e) {
        var a = e.currentTarget.dataset.storeid, n = this.data.stores.find(function(o) {
            return o.id === a;
        });
        console.log("storeId storeTapHandler", a), o.setStore(a), t.globalData.cart.store = n, 
        t.globalData.cart.storeId = a, t.globalData.store_id = a;
        var i = "/pages/artworks/artworks?store_id=" + a + "&type=kids";
        "a13e5bca9835edf92bb4aa50" === a && (i = "/pages/ages/ages?store_id=" + a), wx.navigateTo({
            url: i,
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        });
    },


    
    storeChooseHandler: function() {
        var o = void 0;
        this.data.stores.forEach(function(t) {
            t.opened && (o = t.id);
        });
    }
});