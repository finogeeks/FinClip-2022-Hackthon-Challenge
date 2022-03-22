var t = getApp(), a = function(t, a) {
    return t.forEach(function(t) {
        t.selected = !1, t.isOpen = !1, t.children = [], t.photos = [], a.forEach(function(a) {
            t.title.indexOf("小主题") >= 0 ? a.category.id == t.id && t.children.push({
                title: a.title,
                selected: !1,
                photos: a.gallery ? a.gallery : []
            }) : a.category.id == t.id && a.gallery && (t.photos = t.photos.concat(a.gallery));
        });
    }), t;
};

Page({
    data: {
        packageList: [],
        photoList: [],
        showMask: !1
    },
    onLoad: function(t) {
        this.initPhotos();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    initPhotos: function() {
        var e = this, i = "a13e5bca9835edf92bb4aa50";
        Promise.all([ t.getRequest(t.globalData.BASE_URL + "/product/categories?store_id=" + i, {}), t.getRequest(t.globalData.BASE_URL + "/product/items?store_id=" + i, {}) ]).then(function(t) {
            var i = a(t[0], t[1]);
            console.log(i), e.setData({
                packageList: i
            });
        });
    },
    openMenuHandler: function(t) {
        var a = t.target.dataset.index, e = this.data.packageList[a], i = e.selected, s = e.isOpen, o = e.children;
        if (i && s) return e.isOpen = !1, void this.setData({
            showMask: !1,
            packageList: this.data.packageList
        });
        this.data.packageList.map(function(t, a) {
            t.selected = !1, t.isOpen = !1;
        }), e.selected = !0, e.isOpen = !0, o.length > 0 ? this.setData({
            showMask: !0,
            packageList: this.data.packageList
        }) : this.setData({
            showMask: !1,
            packageList: this.data.packageList,
            photoList: e.photos
        });
    },
    previewBigImgHandler: function(t) {
        var a = t.currentTarget.dataset.index, e = [];
        this.data.photoList.map(function(t, a) {
            e.push(t.url.raw);
        }), wx.previewImage({
            current: this.data.photoList[a].url.raw,
            urls: e
        });
    },
    filterPhotosHandler: function(t) {
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.pindex, i = this.data.packageList[e].children[a];
        this.data.packageList[e].children.map(function(t, a) {
            t.selected = !1;
        }), i.selected = !0, this.data.packageList[e].isOpen = !1;
        var s = i.photos;
        this.setData({
            packageList: this.data.packageList,
            photoList: s,
            showMask: !1
        });
    }
});