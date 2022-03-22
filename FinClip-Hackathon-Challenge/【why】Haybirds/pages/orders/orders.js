const WXAPI = require('../../wxapi/main')
const wxpay = require('../../utils/pay.js')

var e = getApp();





Page({
    data: {
        loaded: !1,
        isTestEnv: e.globalData.isTestEnv,
        mp_status_index:1,

        orderList2: []
    },
    onLoad: function(t) {

        var n = this;
        wx.showLoading({
            title: ""
        }), e.login(function() {
            n.initOrders();
        });  
    },

    onReady: function() {},
    onShow: function() {
         this.initOrders();
    },

    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},

    initOrders: function() {


          // 获取订单列表
          var that = this;
          var postData = {
          token: wx.getStorageSync('token')
          };

       
          var nl = [];
          WXAPI.orderList(postData).then(function(res) {
          if (res.code == 0) {

              console.log(res.data.orderList);
          
             var al =res.data.orderList.length;
          
              for(var a = 0; a < al; a++) { // 这里的i是代表数组的下标

                  WXAPI.orderDetail(res.data.orderList[a].id, wx.getStorageSync('token')).then(function (res) {
                      if (res.code != 0) {
                        wx.showModal({
                          title: '错误',
                          content: res.msg,
                          showCancel: false
                        })
                        return;
                      };

                      nl.push(res.data);

                      that.setData({
                          loaded: !0,
                        orderList2:nl
                      }), wx.hideLoading();   
                     
                  })

              };
              console.log(nl);
             
          } else {
              that.setData({
                loaded: !0,
                  orderList2: null
              }), wx.hideLoading();
          }
          })
    },
    initOrderActions: function(e) {
        var t = {
            faq: !1,
            cancel: !1,
            reschedule: !1,
            prepay: !1,
            selection: !1,
            confirm_album: !1,
            evaluation: !1,
            revoked: !1
        };
        return "created" === e.state && "unpaid" === e.payment_state && (t.faq = !0, t.prepay = !0), 
        "confirmed" === e.state && "created" === e.ticket.state ? (t.faq = !0, t.reschedule = !0) : "revoked" === e.state ? t.revoked = !0 : "closed" === e.state ? t.closed = !0 : "prepaid" === e.payment_state && (t.faq = !0, 
        t.reschedule = !0), "ee681c9d4db6de2733747ae6" === e.store_id && (t.reschedule = !1), 
        t;
    },

    checkTipsHandler: function() {
        wx.navigateTo({
            url: "/pages/faq/faq"
        });
    },



    jumpHanlder: function(e) {
      
    },



    gotoOrderDetail: function(e) {
        var t = e.currentTarget.dataset.orderid;
        // wx.navigateTo({
        //     url: "/pages/order-detail/order-detail?order_id=" + t,
        //     success: function(e) {},
        //     fail: function(e) {},
        //     complete: function(e) {}
        // });
    },
    onReschedule: function(t) {
       
    },





    pxtx: function(e){
        let pingtuanopenid = e.currentTarget.dataset.pingtuanopenid;
        console.log(pingtuanopenid);
        console.log("/pages/goods-details/index?ctspid=&ctptid=&ctid=" + pingtuanopenid +"&kt="+false+"&ct="+false+"&xq="+true);
        
        
        wx.reLaunch({
          url: '/pages/goods-details/index?ctspid=&ctptid=&ctid=' + pingtuanopenid +'&kt=&ct=&xq=true'
        })
    },

    onPayOrder: function(e) {

        var t = e.currentTarget.dataset.orderid;
        var amount = e.currentTarget.dataset.amount;
        var nr = e.currentTarget.dataset.nr;
        var jq = e.currentTarget.dataset.jq;
        var time = e.currentTarget.dataset.time;
        var data ={"nr":nr,"time":time,"jq":jq};
        console.log(t);

        wxpay.wxpay('order', amount, t, "/pages/orders/orders?reload=true",data);
        
    },

    onCancelOrder: function(t) {
    },
    onExitTestEnv: function(t) {
        e.markAsDebug(!1);
    }
});