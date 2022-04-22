// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name:'请填写姓名',
    inputValue:''
  },
  onLoad() {
    // var _this = this
    // ft.getUserName({
    //   success: function (res) {
    //       _this.setData({
    //         name:res.name
    //       })
    //       console.log("调用ggetUserName success");
    //       console.log(JSON.stringify(res));
    //   },
    //   fail: function (res) {
    //       console.log("调用getUserName fail");
    //       console.log(JSON.stringify(res["errMsg"]));
    //   }
    // })

    //TODO 获取名称
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
      
    let userName = app.guard.updateProfile({name: inputValue});
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
