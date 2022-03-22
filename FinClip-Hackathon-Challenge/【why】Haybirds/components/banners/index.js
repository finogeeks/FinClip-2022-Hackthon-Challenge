var n = getApp();

require("../../configs.js"), require("../../nitro.js");

// 自定义组件
Component({
    // 组件的对外属性，是属性名到属性设置的映射表
    properties: {
        banners: {
            type: Array,
            value: []
        },
        brand: {
            type: String,
            value: ""
        }
    },
    // 组件的内部数据，和 properties 一同用于组件的模板渲染
    data: {
        banners: []
    },
    // 组件生命周期函数-在组件实例进入页面节点树时执行)
    attached: function() {},
    // 组件生命周期函数-在组件布局完成后执行)
    ready: function() {
        var e = n.globalData.mpconfigs,
        a = e[this.data.brand + "_banners"] || [];
        console.log("mp", e, this.data.brand), this.setData({
            items: a
        });
    },
    // 组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见
    methods: {
        gotoBannerLink: function(n) {
            var e = n.currentTarget.dataset.link;
            console.info("open link", e), e && (e.includes("https://mp.weixin.qq.com") || e.includes("haybirds.cn")) && wx.navigateTo({
                url: "/pages/webview/webview?link=" + e
            });
        }
    }
});