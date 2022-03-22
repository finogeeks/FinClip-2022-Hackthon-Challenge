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
        wk:0,
        zj:0,
        dj:1,
        tc:"",
        yh: "",
        zxx: "",
        cart:""
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

        

        var zj = wx.getStorageSync("zxzj");
      

        
       var that = this;
       WXAPI.queryConfigBatch('spid0').then(function(res) {
        // WXAPI.queryConfigBatch('dj,spid,spid0').then(function(res) {
            console.log("queryConfigBatchqueryConfigBatch:",res);
        if (res.code == 0) {
            console.log("qqqqqqqqqq:",res.data[0].value);
            that.setData({
                // dj0:res.data[0].value,
                spid:res.data[0].value,
                // dj:res.data[2].value,
            })
            
                // if(res.data[0].key == "spid"){
                //     that.setData({
                //         spid:res.data[0].value,
                //     })
                // }else{
                //     that.setData({
                //         dj:res.data[1].value,
                //     })
                //     that.setData({
                //         dj0:res.data[2].value,
                //     })
                // }
          


            
            
       
            
            var yh = wx.getStorageSync("zxyh");
            var zxx = wx.getStorageSync("zxzxx");
            var tc = wx.getStorageSync("tc");
            // var wk = parseInt(zj)-parseInt(that.data.dj);

            // var dj = parseInt(zj) / 2;
            var wk = parseInt(0);
            var dj = parseInt(0);

            if(zj == 0){

                that.setData({
                    dj:dj,
                    tc:tc,
                    zj:zj,
                    yh: yh,
                    zxx: zxx,
                    wk:wk,
                    cart: zxx
                });
            }else{
                that.setData({
                    dj:dj,
                    tc:tc,
                    zj: zj,
                    yh: yh,
                    zxx: zxx,
                    wk:wk,
                    cart: zxx
                });
            }

          


            console.log("zxxzxxzxxzxx",that.data.zxx);

        }
      }) 

        

   
        WXAPI.fap(3).then(res => {
            if (res.code == 0) {
                that.setData({
                    title:res.data.title,
                    xxnr:res.data.content
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


        var spggs =[];
        let spsj = that.data.zxx;
        // for(let i=0;i<spsj.length;i++){
        //     var spgg = {"goodsId":spsj[i].basicInfo.id,"number":1,"propertyChildIds":"","logisticsType":0};
        //     spggs.push(spgg);
        // }

        var spgg = {"goodsId":that.data.spid,"number":1,"propertyChildIds":"","logisticsType":0};
        spggs.push(spgg);
        
        spggs = JSON.stringify(spggs);
        console.log(spggs);


        var qk = parseInt(that.data.dj) + parseInt(that.data.wk);
        mycart.extJsonStr.定金 = that.data.dj;
        mycart.extJsonStr.余款 = that.data.wk;
        mycart.extJsonStr.余款 = that.data.wk;
        mycart.extJsonStr.套餐 = that.data.tc;
        if(wx.getStorageSync("zxzj")!=0){
            mycart.extJsonStr.全款 = `${wx.getStorageSync("zxzj")}元`;
        }else{
            mycart.extJsonStr.全款 = 0;
        }
       
        
        

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


        var nr = `${that.data.tc}`;
        var jq = `${qk}元 (定金：${that.data.dj}元 + 余款：${that.data.wk}元) `;
        var time = `${res.data.dateAdd}`;
        var adata ={"nr":nr,"time":time,"jq":jq};
        console.log(adata);

        // wxpay.wxpay('order', res.data.amount, res.data.id, "/pages/orders/orders?reload=true",adata);

        WXAPI.orderPay(res.data.id,loginToken).then(function (res) {

            console.log("orderPay",res);
            if (res.code != 0) {
                wx.showModal({
                  title: '错误',
                  content: res.msg,
                  showCancel: false
                })
                return;
            }else{
                    // 下单成功，跳转到订单管理界面
                    wx.reLaunch({
                        url: "/pages/orders/orders?reload=true"
                    })
            }

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