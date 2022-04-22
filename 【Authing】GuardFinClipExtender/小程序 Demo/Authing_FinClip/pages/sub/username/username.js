// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name:'请填写用户名',
    inputValue:''
  },
  onLoad() {

  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  
  // 提交
  submit() {
    var inputValue = String(this.data.inputValue);

    var _this = this;
    wx.showLoading({title: '提交中', duration: 10000});
      
    let userName = app.guard.updateProfile({username: inputValue});
    ft.guardRequest({
      url: userName.url,
      body: userName.body,
      method: userName.method,
      success: function (res) {
        wx.hideLoading();
        wx.showToast({title: '提交成功'});
        console.log("updateProfile success");
      },
      fail: function (res) {        
        wx.hideLoading();
        wx.showToast({title: res.errMsg, icon: 'error'});
        console.log("updateProfile fail");
        console.log(res.errMsg);
      }
    });
  }
})
