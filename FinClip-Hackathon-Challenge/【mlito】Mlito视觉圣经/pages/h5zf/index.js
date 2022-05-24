const WXAPI = require('apifm-wxapi')
const wxpay = require('../../utils/pay.js')
const AUTH = require('../../utils/auth')

Page({
  data: {
    payType: 'wxpay'
  },



  onLoad: function (options) {

    // 获取上一个页面的数组
    console.log(1111111);
    console.log(options);
    console.log("dddd:",options.remark);
    this.money = options.money;
    this.nextAction = options.nextAction;
    this.payName = options.payName;
    this.remark = options.remark;
    this.token = options.token;
    // this.amount = options.money;
    this.setData({
      mingc: options.remark,
      amount : options.money +"元",
      money : options.money,
      nextAction : options.nextAction,
      payName : options.payName,
      remark : options.remark,
      token : options.token
    })
    // this.payBillDiscounts()
    // this.setData({
    //   balance_pay_pwd: wx.getStorageSync('balance_pay_pwd')
    // })
  },

  
  mhy() {
    var that = this;
    const postData = {
      token: that.data.token,
      money: that.data.money,
      remark: that.data.remark,
      payName: that.data.payName,
      nextAction : that.data.nextAction
    }
    WXAPI.wxpay(postData).then(function (res) {
      if (res.code == 0) {
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          fail: function (aaa) {
            console.error(aaa)
            wx.showToast({
              title: '支付失败:' + aaa
            })
          },
          success: function () {
            // 提示支付成功
            wx.showToast({
              title: '支付成功'
            })
            wx.redirectTo({
              url: redirectUrl
            });
          }
        })
      } else {
        that.xcxzf();

        // wx.showModal({
        //   title: '出错了',
        //   content: JSON.stringify(res),
        //   showCancel: false
        // })
      }
    })
  },


  xcxzf() {
    var that = this;
     AUTH.checkHasLogined().then(isLogined => {
      if (!isLogined) {
        AUTH.authorize().then( aaa => {
          AUTH.bindSeller()
          that.qzf();
        })
      } else {
        AUTH.bindSeller();
        that.qzf();
      }
    })





},

  qzf(){

    
    var that = this;
    const postData = {
      token: wx.getStorageSync('token'),
      money: that.data.money,
      remark: that.data.remark,
      payName: that.data.payName,
      nextAction : that.data.nextAction
    }
    WXAPI.wxpay(postData).then(function (res) {
      if (res.code == 0) {
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          fail: function (aaa) {
            console.error(aaa)
            wx.showToast({
              title: '支付失败:' 
              // title: '支付失败:' + aaa
            })
          },
          success: function () {
            // 提示支付成功
            wx.showToast({
              title: '支付成功'
            })
            // wx.redirectTo({
            //   url: redirectUrl
            // });
          }
        })
      } else {
        wx.showModal({
          title: '微信支付',
          content: "网络链接失败，请重试",
          showCancel: false
        })
      }
    })

  },



  onShow () {

    // var that = this;
    // const code = await AUTH.wxaCode();

    // const res = await WXAPI.bindOpenid(wx.getStorageSync('token'),code);
    // console.log(res);
    // that.mhy();


    // const code = await AUTH.wxaCode()

    // const res = await WXAPI.bindOpenid(this.token,code);
    // console.log("resresres:",res);
    // if (res.code === 0) {
    //   this.mhy()
    // }



    // AUTH.checkHasLogined().then(isLogined => {
    //   if (!isLogined) {
    //     AUTH.login(this)
    //   } else {
    //     this.userAmount()
    //   }
    // })
  },
  async payBillDiscounts() {
    const res = await WXAPI.payBillDiscounts()
    if (res.code === 0) {
      this.setData({
        rechargeSendRules: res.data
      })
    }
  },
  async userAmount() {
    const res = await WXAPI.userAmount(wx.getStorageSync('token'))
    if (res.code === 0) {
      this.setData({
        balance: res.data.balance
      })
    }
  },



  // 点击去支付
  async bindSave() {

    var that = this;

    wx.login({
      success: function (res) {
        console.log("sdfdsf",res);
        that.setData({
          codeaa: res.code
        })

        const resa =  WXAPI.bindOpenid(that.data.token,res.code);
        console.log(resa);
        setTimeout(function(){
          that.mhy();
        },600)
        
      }

    })

    



    // const code = await AUTH.wxaCode();
    

    

    // const amount = this.data.amount;
    // if (!amount) {
    //   wx.showToast({
    //     title: '请填写正确的消费金额',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (this.data.payType == 'balance') {
    //   if (this.data.balance_pay_pwd == '1' && !this.data.pwd) {
    //     wx.showToast({
    //       title: '请输入交易密码',
    //       icon: 'none'
    //     })
    //     return
    //   }
    // }
    // const res = await WXAPI.payBillV2({
    //   token: wx.getStorageSync('token'),
    //   money: amount,
    //   calculate: true
    // })
    // if (res.code != 0) {
    //   wx.showToast({
    //     title: res.msg,
    //     icon: 'none'
    //   })
    //   return
    // }
    // const amountReal = res.data.realMoney
    // const _msg = `您本次消费${amount}，优惠后只需支付${amountReal}`
    
    // wx.showModal({
    //   title: '请确认消费金额',
    //   content: _msg,
    //   confirmText: "确认支付",
    //   cancelText: "取消支付",
    //   success: res => {
    //     if (res.confirm) {
    //       this.goPay(amount, amountReal)
    //     }
    //   }
    // });
  },





  async goPay(amount, wxpayAmount){
    if (this.data.payType == 'balance') {
      const res = await WXAPI.payBillV2({
        token: wx.getStorageSync('token'),
        money: amount,
        pwd: this.data.pwd
      })
      if (res.code != 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      wx.showModal({
        title: '成功',
        content: '买单成功，欢迎下次光临！',
        showCancel: false
      })
    } else {
      wxpay.wxpay('paybill', wxpayAmount, 0, "/pages/asset/index", { money: amount});
    }
  },






  // 其他的2个方法
  payTypeChange(event) {
    this.setData({
      payType: event.detail,
    });
  },
  payTypeClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      payType: name,
    });
  },

})