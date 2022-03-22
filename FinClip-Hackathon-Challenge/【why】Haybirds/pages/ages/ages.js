const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')

var t = require("../../nitro.js"), e = (require("../../configs.js"), getApp());

Page({
    data: {
        isIpx: e.globalData.isIpx,
        stores: [],
        items: []
    },
    onLoad: function(t) {
        this.setData({
            options: t
        });
    },
    onReady: function() {},
    onShow: function() {
        let that = this;
        // var a = this, o = t.getStore();

        // wx.setNavigationBarTitle({
        //     title: "" + o.name
        // }),
        
        // delete e.globalData.categories, delete e.globalData.items, delete e.globalData.themeGroups;


        
        WXAPI.goodsCategory().then(function(res) {
            let categories = [];
            if (res.code == 0) {
              categories = categories.concat(res.data);
              console.log(categories);
              
              
              that.setData({
                loaded: !0,
                items: categories,
              });

            }
          

          })


      
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    initStores: function() {},
    // 点击跳转
    itemTapHandler: function(a) {
        var o = a.currentTarget.dataset.storeid,
            i = a.currentTarget.dataset.type,
            n = this.data.stores.find(function(t) {
            return t.id === o;
        });

        t.setStore(o), e.globalData.cart.store = n, e.globalData.cart.storeId = o;

        // var r = "/pages/artworks/artworks?store_id=" + o + "&type=" + i;

        var r = "/pages/artworks/artworks?category_id=99030&type=" + i;

        if("wj" === i){
            r = "/pages/product-detail/product-detail?category_id=99029&type=" + i
        }
     

        wx.navigateTo({
            url: r,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    }

});