var t = getApp(), a = require("../../utils/util.js"), o = function(t, o) {
    return t.forEach(function(t) {
        t.packages = [], t.gallery = [], o.forEach(function(o) {
            o.selected = !1, o.category && o.category.id == t.id && (t.packages.push(o), t.gallery = a.shuffle(t.gallery.concat(o.gallery)).slice(0, 10), 
            t.hasSubItems = t.title.indexOf("小主题") > -1);
        });
    }), t;
};

Page({
    data: {
        isIpx: t.globalData.isIpx,
        storeId: "",
        disabledScroll: !1,
        categories: [],
        gallery: {},
        artworkTabs: a.config("artworkTabs"),
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg" ],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3
    },
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    onLoad: function(t) {
        var a = t.store_id || "a13e5bca9835edf92bb4aa50", o = t.category_id || "", e = this.data.artworkTabs;
        console.log("categoryId", o), console.log("artworkTabs", e), e.find(function(t) {
            return t.category_id === o;
        }).active = !0, wx.showLoading({
            title: "载入客片"
        }), this.setData({
            categoryId: o,
            storeId: a,
            artworkTabs: e
        }), this.initData(a);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    initData: function(a) {
        var e = this;
        Promise.all([ t.getRequest(t.globalData.BASE_URL + "/stores/" + a, {}), t.getRequest(t.globalData.BASE_URL + "/product/categories?store_id=" + a, {}), t.getRequest(t.globalData.BASE_URL + "/product/items?store_id=" + a, {}) ]).then(function(t) {
            var a = o(t[1], t[2]);
            e.setData({
                store: t[0],
                packageLoaded: !0,
                categories: a
            }), wx.hideLoading();
        });
    },
    onPreviewSlides: function(t) {
        var a = t.currentTarget.dataset.url, o = t.currentTarget.dataset.category, e = t.currentTarget.dataset.package, n = [];
        this.data.categories.forEach(function(t) {
            t.id === o && (console.info(">>", o, e, t), t.hasSubItems ? t.packages.forEach(function(t) {
                t.id === e && t.gallery.forEach(function(t) {
                    n.push(t.url.raw);
                });
            }) : t.gallery.forEach(function(t) {
                n.push(t.url.raw);
            }));
        }), wx.previewImage({
            current: a,
            urls: n
        });
    },
    loadPhotos: function(t) {
        var a = t.currentTarget.dataset.id;
        a !== this.data.categoryId && wx.navigateTo({
            url: "/pages/photos/photos?category_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    loadMorePhotos: function(t) {
        var a = t.currentTarget.dataset.category, o = t.currentTarget.dataset.package;
        wx.navigateTo({
            url: "/pages/photos/photos?category_id=" + a + "&package_id=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    }
});