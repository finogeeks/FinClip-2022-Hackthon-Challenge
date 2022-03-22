var e = getApp();

require("../../configs.js"), require("../../nitro.js");

Component({
    properties: {
        qr: {
            type: String,
            value: ""
        }
    },
    data: {
        qr: ""
    },
    attached: function() {},
    ready: function() {
        e.globalData.cart.storeId, e.globalData.mpconfigs.qr;
    },
    methods: {
        openImage: function(e) {
            var r = e.currentTarget.dataset.link;
            wx.previewImage({
                current: r,
                urls: [ r ]
            });
        }
    }
});