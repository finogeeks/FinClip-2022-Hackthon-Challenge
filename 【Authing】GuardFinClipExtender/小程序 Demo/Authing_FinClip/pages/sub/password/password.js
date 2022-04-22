// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    inputValue1:'',
    inputValue2:'',
    inputValue3:''
  },
  onLoad() {

  },
  bindKeyInput1(e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2(e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  bindKeyInput3(e) {
    this.setData({
      inputValue3: e.detail.value
    })
  },
  // 提交
  async submit() {
    var inputValue1 = String(this.data.inputValue1);
    var inputValue2 = String(this.data.inputValue2);
    var inputValue3 = String(this.data.inputValue3);

   //TODO   /api/v2/password/update"   newPassword oldPassword
    console.log("inputValue1 = " + inputValue1);
    console.log("inputValue2 = " + inputValue2);
    console.log("inputValue3 = " + inputValue3);
    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let updatePassword = await app.guard.updatePassword(inputValue2, inputValue1);
    ft.guardRequest({
      url: updatePassword.url,
      body: updatePassword.body,
      method: updatePassword.method,
      success: function (res) {
        console.log("updatePassword success");
        wx.hideToast();
        wx.showToast({title: '修改成功'});
      },
      fail: function (res) {
        console.log("updatePassword fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
        wx.showToast({title: res.errMsg, icon: 'error'});
      }
    });
  }
})
