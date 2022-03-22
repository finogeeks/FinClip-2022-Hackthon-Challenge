var t = getApp(), a = require("../../utils/util.js"), o = function(t, o) {
    return t.forEach(function(t) {
        t.selected = !1, t.isOpen = !1, t.children = [], t.photos = [], o.forEach(function(o) {
            t.title.indexOf("小主题") >= 0 ? o.category.id == t.id && t.children.push({
                title: o.title,
                selected: !1,
                id: o.id,
                photos: o.gallery ? a.appendProcessSuffix(o.gallery) : []
            }) : o.category.id == t.id && o.gallery && (t.photos = t.photos.concat(o.gallery));
        });
    }), t;
};

Page({
    data: {
        artworkTabs: a.config("artworkTabs"),
        packages: [],
        photos: [],
        showMask: !1
    },
    onLoad: function(t) {
        var o = t.store_id || "a13e5bca9835edf92bb4aa50", e = t.category_id || !1, n = t.package_id || !1, i = a.artworkTabs(e), r = i.find(function(t) {
            return t.category_id === e;
        });
        wx.showLoading({
            title: "载入客片"
        }), this.setData({
            categoryId: e,
            packageId: n,
            storeId: o,
            artworkTabs: i,
            class: r.class
        }), this.initPhotos(o, e, n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    initPhotos: function(a, e, n) {
        var i = this;
        console.log("initPhotos", a, e, n), Promise.all([ t.getRequest(t.globalData.BASE_URL + "/product/categories?store_id=" + a, {}), t.getRequest(t.globalData.BASE_URL + "/product/items?store_id=" + a, {}) ]).then(function(t) {
            var a = o(t[0], t[1]);
            console.log(e, n), console.info("packages", a), i.setData({
                packages: a
            }), wx.hideLoading();
        });
    },
    previewImageHandler: function(t) {
        var a = t.currentTarget.dataset.index, o = [];
        this.data.photos.map(function(t, a) {
            o.push(t.url.raw);
        }), console.log(this.data.photos[a].url.raw), console.log(o), wx.previewImage({
            current: this.data.photos[a].url.raw,
            urls: o
        });
    },
    openPhotosHandler: function(t, a, o) {
        var e = t && t.currentTarget.dataset.categoryid || a, n = t && t.currentTarget.dataset.packageid || o, i = this.data.packages.find(function(t) {
            return t.id === e;
        });
        console.log("openPhotosHandler ---\x3e", e, n);
        var r = i.children.find(function(t) {
            return t.id === n;
        });
        console.log("target_category", i), console.log("target_package", r);
        var s = r.photos;
        this.setData({
            packages: this.data.packages,
            photos: s,
            showMask: !1
        });
    },
    calcPackageInfo: function(t, a) {
        var o = t.find(function(t) {
            return t._id === a;
        });
        console.info("category", o);
        var e = {
            special_explanation: o.special_explanation,
            mp_info: o.mp_info,
            packages: []
        };
        return o.packages.map(function(t) {
            ("小主题" === o.title && t.title.includes("T") || "小主题" !== o.title) && e.packages.push({
                title: t.title.substr(0, 2),
                id: t._id,
                options: t.options,
                price: t.price,
                description: t.description.replace(/\\r\\n/g, "\n")
            });
        }), e.packages.sort(function(t, a) {
            return t.title > a.title;
        }), e;
    },
    onSwitchTab: function(t) {
        var o = t.currentTarget.dataset.categoryid, e = a.artworkTabs(o), n = e.find(function(t) {
            return t.category_id === o;
        });
        console.info("onSwitchTab", o, e, n), this.setData({
            categoryId: o,
            artworkTabs: a.artworkTabs(o),
            class: n.class
        });
    }
});