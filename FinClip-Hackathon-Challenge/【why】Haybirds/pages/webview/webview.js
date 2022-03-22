var app = getApp();
Page({
    data: {},
    onLoad: function(n) {
        var o = n.link;
        if (console.info("options", n), !o) return wx.showModal({
            title: "出错了",
            content: "无效的 URL"
        });
        this.setData({
            url: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});