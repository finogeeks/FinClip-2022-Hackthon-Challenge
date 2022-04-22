// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    phone:'',
    input_phone:'',
    input_code:''
  },
  onLoad(option) {
    console.log("phone = " + option.param);
    this.setData({
      phone: option.param,
      input_phone: option.param
    })
  },
  bindKeyInput(e) {
    this.setData({
      input_phone: e.detail.value
    })
  },
  bindKeyInput2(e) {
    this.setData({
      input_code: e.detail.value
    })
  },
  //解绑
  unbindPhone() {
    //TODO "/api/v2/users/phone/unbind"
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let unbindPhone = app.guard.unbindPhone();
    ft.guardRequest({
      url: unbindPhone.url,
      body: unbindPhone.body,
      method: unbindPhone.method,
      success: function (res) {
        _this.setData({
            phone: '',
            input_phone:''
        })
        console.log("unbindPhone success");
        wx.hideToast();
        wx.showToast({title: '解绑成功'});
      },
      fail: function (res) {
        console.log("unbindPhone fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  },
  // 绑定
  bindPhone() {
    //TODO "/api/v2/users/phone/bind" phoneCountryCode、phone、code
    var inputPhone = String(this.data.input_phone);
    var inputCode = String(this.data.input_code);
    console.log("inputPhone = " + inputPhone);
    console.log("inputCode = " + inputCode);
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let bindPhone = app.guard.bindPhone(null, inputPhone, inputCode);
    ft.guardRequest({
      url: bindPhone.url,
      body: bindPhone.body,
      method: bindPhone.method,
      success: function (res) {
        _this.setData({
            phone: inputPhone
        })
        console.log("bindPhone success");
        wx.hideToast();
        wx.showToast({title: '绑定成功'});
      },
      fail: function (res) {
        console.log("bindPhone fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  },
  // 获取验证码
  sendSms() {
    //TODO "/api/v2/sms/send" phoneCountryCode、phone
    var inputPhone = String(this.data.input_phone);
    console.log("inputPhone = " + inputPhone);
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let sendSms = app.guard.sendSms(null, inputPhone);
    ft.guardRequest({
      url: sendSms.url,
      body: sendSms.body,
      method: sendSms.method,
      success: function (res) {
        console.log("sendSms success");
        wx.hideToast();
        wx.showToast({title: '发送验证码成功'});
      },
      fail: function (res) {
        console.log("sendSms fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  }
})
