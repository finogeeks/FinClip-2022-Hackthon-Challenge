const WXAPI = require('../wxapi/main')

/**
 * type: order 支付订单 recharge 充值 paybill 优惠买单
 * data: 扩展数据对象，用于保存参数
 */
function wxpay(type, money, orderId, redirectUrl, data) {
  let remark = "在线充值";
  let nextAction = {};
  if (type === 'order') {
    remark = "支付订单 ：" + orderId;
    nextAction = {
      type: 0,
      id: orderId
    };
  }
  if (type === 'paybill') {
    remark = "优惠买单 ：" + data.money;
    nextAction = {
      type: 4,
      uid: wx.getStorageSync('uid'),
      money: data.money
    };
  }
  WXAPI.wxpay({
    token: wx.getStorageSync('token'),
    money: money,
    remark: remark,
    payName: remark,
    nextAction: JSON.stringify(nextAction)
  }).then(function (res) {
    if (res.code == 0) {






      // 发起支付
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: 'prepay_id=' + res.data.prepayId,
        signType: 'MD5',
        paySign: res.data.sign,
        fail: function (aaa) {
          console.log(aaa.errMsg);
          if(aaa.errMsg == "requestPayment:fail cancel"){
            aaa.errMsg = "取消"
          }
          
          wx.showToast({
            title: '支付失败:' + aaa.errMsg
          })

          console.log("支付失败跳转：",redirectUrl);
          wx.reLaunch({
            url: redirectUrl
          })

        
        },
        success: function () {


          var openid = "";

          var zfid = res.data.prepayId;
    
          console.log("prepayId:",res.data.prepayId);
          
          console.log("shangyiy:",data);
          
          WXAPI.wxinfo(wx.getStorageSync('token')).then(res => {
            if (res.code == 0) {
              openid = res.data.openid;
              var as = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxfbf0087b8e4fdc52&secret=dff86497471da2845578db34ad3d7ffa`;
              wx.request({
                url: as,
                method: "GET",
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(request) {
                  console.log("access_token:",request.data.access_token);
                  var xxurl =`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${request.data.access_token}`;
                  console.log("openid:",res.data.openid);
                  var aa = {
                    "touser": openid,
                    "template_id": "XZCd2fv2O_yU546nUo7xw6aD6rsVWaCLNhFt_b-j6-o",
                    "page": "/pages/orders/orders?reload=true",
                    "form_id": zfid,
                    "data": {
                        "keyword1": {
                            "value": `${data.jq}`
                        },
                        "keyword2": {
                            "value": `${data.nr}`
                        },
                        "keyword3": {
                            "value": `${orderId}`
                        } ,
                        "keyword4": {
                            "value": `${data.time}`
                        }
                    }
                  };
      
                  aa =  JSON.stringify(aa);
                  wx.request({
                    url: xxurl,
                    method: "POST",
                    data: aa,
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success(request) {
                      console.log(request.data)
                    },
                    fail(error) {
                      console.log(error)
                    },
                    complete(aaa) {
                      // 加载完成
                    }
                  })
    
                },
                fail(error) {
                  console.log(error)
                },
                complete(aaa) {
                  // 加载完成
                }
              })
            }
          })




 


          console.log("付款成功跳转：",redirectUrl);
          // 保存 formid
          WXAPI.addTempleMsgFormid({
            token: wx.getStorageSync('token'),
            type: 'pay',
            formId: res.data.prepayId
          })
          // 提示支付成功
          wx.showToast({
            title: '支付成功'
          })


          

          wx.reLaunch({
            url: redirectUrl
          })

          // wx.redirectTo({
          //   url: redirectUrl
          // });
        }
      })
    } else {
      wx.showModal({
        title: '出错了',
        content: res.code + ':' + res.msg + ':' + res.data,
        showCancel: false,
        success: function (res) {

        }
      })
    }
  })
}

module.exports = {
  wxpay: wxpay
}