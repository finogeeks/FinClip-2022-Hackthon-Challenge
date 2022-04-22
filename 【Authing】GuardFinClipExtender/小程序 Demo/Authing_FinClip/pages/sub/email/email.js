// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    email:'',
    input_email:'',
    input_code:''
  },
  onLoad(option) {
    console.log("email = " + option.param);
    this.setData({
      email: option.param,
      input_email: option.param
    })
  },
  bindKeyInput(e) {
    this.setData({
      input_email: e.detail.value
    })
  },
  bindKeyInput2(e) {
    this.setData({
      input_code: e.detail.value
    })
  },
  unbindEmail() {
    //TODO "/api/v2/users/email/unbind"
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let unbindEmail = app.guard.unbindEmail();
    ft.guardRequest({
      url: unbindEmail.url,
      body: unbindEmail.body,
      method: unbindEmail.method,
      success: function (res) {
        _this.setData({
            email: '',
            input_email:''
        })
        console.log("unbindEmail success");
        wx.hideToast();
        wx.showToast({title: '解绑成功'});
      },
      fail: function (res) {
        console.log("unbindEmail fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  },
  // 绑定
  bindEmail() {
    //TODO "/api/v2/users/email/bind" email、emailCode
    var inputEmail = String(this.data.input_email);
    var inputCode = String(this.data.input_code);
    console.log("inputEmail = " + inputEmail);
    console.log("inputCode = " + inputCode);
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let bindEmail = app.guard.bindEmail(inputEmail, inputCode);
    ft.guardRequest({
      url: bindEmail.url,
      body: bindEmail.body,
      method: bindEmail.method,
      success: function (res) {
        _this.setData({
            email: inputEmail
        })
        console.log("bindEmail success");
        wx.hideToast();
        wx.showToast({title: '绑定成功'});
      },
      fail: function (res) {
        console.log("bindEmail fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  },
  // 获取验证码
  sendResetPasswordEmail() {
    var inputEmail = String(this.data.input_email);
    console.log("inputEmail = " + inputEmail);
    var _this = this;
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let sendResetPasswordEmail = app.guard.sendResetPasswordEmail(inputEmail);
    ft.guardRequest({
      url: sendResetPasswordEmail.url,
      body: sendResetPasswordEmail.body,
      method: sendResetPasswordEmail.method,
      success: function (res) {
        console.log("sendResetPasswordEmail success");
        wx.hideToast();
        wx.showToast({title: '发送验证码成功'});
      },
      fail: function (res) {
        console.log("sendResetPasswordEmail fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  }
})
