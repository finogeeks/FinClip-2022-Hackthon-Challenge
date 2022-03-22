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
        title:"温馨提示",
        spid:"191821",
        ptid:"1632",
        bbxm:"",
        lxdh:""
    },
    //返回到介绍
    bindViewTap: function() {
        wx.navigateTo({
        url: "/pages/webview_pt/webview_pt",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
        })
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
        console.log(e.spid);
        var spid = e.spid;
        var ptid = e.ptid;

        var that=this;
        // that.setData({
        //     ptid: ptid,
        //     spid: spid
        // });
        
        // mycart.xd_goodsId = wx.getStorageSync("xd_goodsId");
        // mycart.xd_goods = wx.getStorageSync("xd_goods");
        // mycart.xd_propertyChildIds = wx.getStorageSync("xd_propertyChildIds").replace(',', '');;
        // mycart.xd_propertyChildIds_name = wx.getStorageSync("xd_propertyChildIds_name");
        // mycart.xd_dingjin = wx.getStorageSync("xd_dingjin");
        // mycart.xd_quankuan = wx.getStorageSync("xd_quankuan");
        // mycart.extJsonStr = wx.getStorageSync("extJsonStr");
     
        // var yukuan = wx.getStorageSync("xd_quankuan") - wx.getStorageSync("xd_dingjin");
        // mycart.yukuan = yukuan;

        // console.log("dingdan:",mycart);
        // console.log(mycart.xd_quankuan);

        // that.setData({
        //     cart: mycart
        // });

        // WXAPI.fap(3).then(res => {
        //     if (res.code == 0) {
        //         that.setData({
        //             title:res.data.title
        //         })
                
        //         WxParse.wxParse('article', 'html', res.data.content, that, 5);
        //     }
        // })

    },

    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},





    formSubmit: function(e) {
      console.log("form发生了提交事件，携带数据为：", e.detail.value), console.log("data", this.data);
      var i = e.detail.value;
      var xinx =[];
     
     
  },

  showToast: function(a) {
    wx.showToast({
        title: a,
        icon: "none",
        duration: 2e3,
        success: function() {}
    });
},

    // 提交订单
    onSubmit: function(o) {

        var that=this;
       
        console.info("onSubmit_spid:", that.data.spid),
        console.info(o.detail.value["宝宝姓名"]),
        console.info(o.detail.value["联系电话"]);

        if(o.detail.value["宝宝姓名"] == ""){
          that.showToast("请填写宝宝姓名");
          return; 
        };

        if(o.detail.value["联系电话"] == ""){
          that.showToast("请填写联系电话");
          return;
        };

        that.setData({
            bbxm: o.detail.value["宝宝姓名"],
            lxdh:o.detail.value["联系电话"]
        });

        

        WXAPI.pingtuanOpen(that.data.spid, wx.getStorageSync('token')).then(function(res) {
          console.info("ddid:", res.data.id),
          
            // wx.navigateTo({
            //   url: "/pages/to-pay-order/index?orderType=buyNow&pingtuanOpenId=" + 
            // })
            

            that.createOrder(res.data.id);


          })

        // 创建订单
        // this.onCreateOrder(o.detail.formId);
        
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
        
        var spgg = {"goodsId":that.data.spid,"number":1,"logisticsType":0};
        var spggs =[];
        spggs.push(spgg);
        spggs = JSON.stringify(spggs);
        console.log(e);

        mycart.宝宝姓名 = that.data.bbxm;
        mycart.联系电话 = that.data.lxdh;

        var aa = JSON.stringify(mycart);
        console.log(aa);
       

        let postData = {
          token: loginToken,
          pingtuanOpenId:e,
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

        wx.showLoading({
            title: "创建订单…",
            mask: !0
        });
          
          console.log("订单：",res.data);
          console.log("支付金额：",res.data.amount);


        var nr = `拼团商品`;
        var jq = `${res.data.amount}元`;
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

    // openAgreement: function() {
    //     wx.navigateTo({
    //         url: "/pages/agreement/agreement",
    //         success: function(e) {},
    //         fail: function(e) {},
    //         complete: function(e) {}
    //     });
    // }

    
});