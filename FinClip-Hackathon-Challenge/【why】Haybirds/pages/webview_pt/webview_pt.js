var app = getApp();
Page({
    data: {
        url: 'https://www.zhitujiu.com/wp-admin/pt/index.html#show={{showed}}',
        showed: false
    },
    onLoad: function(options) {
        options.url ? this.setData({url: options.url}) : wx.navigateBack({delta: 2});
        // var o = n.link;
        // if (console.info("options", n), !o) return wx.showModal({
        //     title: "出错了",
        //     content: "无效的 URL"
        // });
        // this.setData({
        //     url: o
        // });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            showed: true
        });
    },
    onHide: function() {
        console.log("hidedddd");
        
        this.setData({
            showed: false
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});