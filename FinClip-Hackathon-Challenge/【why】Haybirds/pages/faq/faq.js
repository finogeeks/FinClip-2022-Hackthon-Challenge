const WXAPI = require('../../wxapi/main');
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        title:"",
        nr:""
    },
    onLoad: function(n) {
        var that = this;
        WXAPI.fap(1).then(res => {
            if (res.code == 0) {
                that.setData({
                    title:res.data.title
                })
                
                WxParse.wxParse('article', 'html', res.data.content, that, 5);
            }
        })

    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});