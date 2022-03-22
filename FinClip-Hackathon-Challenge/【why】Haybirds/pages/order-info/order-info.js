var a = getApp();

Page({
    data: {
        isIpx: a.globalData.isIpx,
        radioItems: [ {
            name: "男孩",
            value: "男孩"
        }, {
            name: "女孩",
            value: "女孩"
        } ],

        form: {
            extra: {
                agreed_to_public: void 0
            },
            child: {},
            children: [],
            contact: {
                mobile: a.globalData.userInfo ? a.globalData.userInfo.mobile : "",
                name: a.globalData.userInfo ? a.globalData.userInfo.name : "",
                email: a.globalData.userInfo ? a.globalData.userInfo.email : ""
            },
        }
    },
    onLoad: function(e) {
        var i = a.globalData.userInfo;
        if (i) {
            if (i.children.length) {
                var o = i.children[0], t = this.data.radioItems, s = t.find(function(a) {
                    return a.value === o.gender;
                });
                if (s && (s.checked = !0), i.shipping_address) {
                    var n = i.shipping_address.address + "\n" + i.shipping_address.recipient + " " + i.shipping_address.mobile;
                    this.setData({
                        shipping_address_text: n,
                        "form.shipping_address": i.shipping_address
                    });
                }
                this.setData({
                    radioItems: t,
                    "form.child": o
                }), console.info("set default userInfo", this.data.form.child);
            }
            (i.mobile || i.name || i.email) && this.setData({
                "form.contact.mobile": i.mobile || "",
                "form.contact.name": i.name || "",
                "form.contact.email": i.email || ""
            });
        }
        console.log("this.data.form", this.data.form);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindDateChange: function(a) {
        console.info("生日切换", a), this.setData({
            "form.child.birthday": a.detail.value
        });
    },
    bindChooseAddr: function() {
        var a = this;
        wx.chooseAddress({
            success: function(e) {
                console.log("bindChooseAddr", e);
                var i = {
                    address: [ e.provinceName, e.cityName, e.countyName, e.detailInfo ].join(""),
                    recipient: e.userName,
                    mobile: e.telNumber
                }, o = i.address + "\n" + i.recipient + " " + i.mobile;
                a.setData({
                    shipping_address_text: o,
                    "form.shipping_address": i
                });
            }
        });
    },
    
    bindRadioChange: function(a) {
        console.log("radio发生change事件，携带value值为：", a.detail.value);
        for (var e = this.data.radioItems, i = 0, o = e.length; i < o; ++i) e[i].checked = e[i].value == a.detail.value;
        this.setData({
            radioItems: e,
            "form.child.gender": a.detail.value
        });
    },
    showToast: function(a) {
        wx.showToast({
            title: a,
            icon: "none",
            duration: 2e3,
            success: function() {}
        });
    },
    formSubmit: function(e) {
        console.log("form发生了提交事件，携带数据为：", e.detail.value), console.log("data", this.data);
        var i = e.detail.value;
        var xinx =[];
        return i["家长称呼"] ? i["手机"] ? i["Email"] ? !i["宝宝姓名"] || !i["宝宝小名"] || this.data.form.child && !this.data.form.child.gender ? this.showToast("请填写宝宝信息") : i["宝宝生日"] 

        ? (
            
            // this.setData({
            // "form.children": [ {
            //     name: i["child.name"],
            //     nickname: i["child.nickname"],
            //     gender: this.data.form.child.gender,
            //     birthday: this.data.form.child.birthday
            // } ],
            // "form.contact.mobile": i["contact.mobile"],
            // "form.contact.name": i["contact.name"],
            // "form.contact.email": i["contact.email"]
            // }),
            // xinx.家长称呼=i["contact.name"],
            // xinx.手机=i["contact.mobile"],
            i.宝宝性别 = this.data.form.child.gender,

            wx.setStorageSync('extJsonStr', i),

            a.globalData.cart.info = this.data.form, console.info("app.globalData.cart.info", this.data.form), 

            void wx.navigateTo({
                url: "/pages/order-confirm/order-confirm",
                success: function(a) {},
                fail: function(a) {},
                complete: function(a) {}
            })
        
        ) : 
        
        this.showToast("请填写宝宝生日") : this.showToast("请填写Email，用于接收选片通知") : this.showToast("请填写联系方式") : this.showToast("请填写称呼");
    }
});