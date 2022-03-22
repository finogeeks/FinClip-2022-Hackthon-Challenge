var o = getApp(), e = require("../../nitro.js");
const WXAPI = require('../../wxapi/main')
const wxpay = require('../../utils/pay.js')
var WxParse = require('../../wxParse/wxParse.js');

var mycart ={};
Page({
    data: {
        isIpx: o.globalData.isIpx,
        aggreed: !1,
        cart:{},
        title:"温馨提示"
    },
    // 点击切换
    checkboxChange: function(o) {
        console.info("checkboxChange", o), this.setData({
            aggreed: !this.data.aggreed
        });
    },
    // 加载数据
    onLoad: function(e) {
        console.log("app.globalData", o.globalData);
        var that=this;
        
        mycart.xd_goodsId = wx.getStorageSync("xd_goodsId");
        mycart.xd_goods = wx.getStorageSync("xd_goods");
        mycart.xd_propertyChildIds = wx.getStorageSync("xd_propertyChildIds").replace(',', '');;
        mycart.xd_propertyChildIds_name = wx.getStorageSync("xd_propertyChildIds_name");
        mycart.xd_dingjin = wx.getStorageSync("xd_dingjin");
        mycart.xd_quankuan = wx.getStorageSync("xd_quankuan");
        mycart.extJsonStr = wx.getStorageSync("extJsonStr");
     
        var yukuan = wx.getStorageSync("xd_quankuan") - wx.getStorageSync("xd_dingjin");
        mycart.yukuan = yukuan;

        console.log("dingdan:",mycart);
        console.log(mycart.xd_quankuan);

        that.setData({
            cart: mycart
        });

        var that = this;
        WXAPI.fap(3).then(res => {
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
    onShareAppMessage: function() {},

    // 提交订单
    onSubmit: function(o) {
        console.info("onSubmit", mycart),

        wx.showLoading({
            title: "创建订单…",
            mask: !0
        }),

        // 创建订单
        // this.onCreateOrder(o.detail.formId);
        this.createOrder(mycart);
    },

    // formSubmit: function(o) {
    //     console.log("form submit事件，携带数据为：", o.detail.value);
    // },

    formReset: function() {
        console.log("form reset事件");
    },

   




    createOrder: function (e) {
        var that = this;
        var loginToken = wx.getStorageSync('token') // 用户登录 token
        var spgg = {"goodsId":mycart.xd_goodsId,"number":1,"propertyChildIds":mycart.xd_propertyChildIds,"logisticsType":0};
        var spggs =[];
        spggs.push(spgg);
        spggs = JSON.stringify(spggs);
        console.log(spggs);

        mycart.extJsonStr.定金 = mycart.xd_dingjin;
        mycart.extJsonStr.余款 = mycart.yukuan;
        mycart.extJsonStr.全款 = mycart.xd_quankuan;
        
        var aa = JSON.stringify(mycart.extJsonStr);
        console.log(aa);
       

        
        let postData = {
          token: loginToken,
          goodsJsonStr: spggs,
          extJsonStr: aa
        };
       
        WXAPI.orderCreate(postData).then(function (res) {
          if (res.code != 0) {
            wx.showModal({
              title: '错误',
              content: res.msg,
              showCancel: false
            })
            return;
          }
          
          console.log("订单：",res.data);
          console.log("支付金额：",res.data.amount);


        var nr = `${mycart.xd_goods.basicInfo.name} - ${mycart.xd_propertyChildIds_name}`;
        var jq = `${mycart.xd_quankuan}元 (定金：${mycart.xd_dingjin}元 + 余款：${mycart.yukuan}元)`;
        var time = `${res.data.dateAdd}`;
        var adata ={"nr":nr,"time":time,"jq":jq};
        console.log(adata);

          wxpay.wxpay('order', res.data.amount, res.data.id, "/pages/orders/orders?reload=true",adata);



          // 下单成功，跳转到订单管理界面
          wx.reLaunch({
            url: "/pages/orders/orders?reload=true"
          })

        })
      },

    openAgreement: function() {
        wx.navigateTo({
            url: "/pages/agreement/agreement",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    }

    
});