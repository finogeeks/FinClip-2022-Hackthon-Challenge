module.exports ={
  lowVersion: function () {
    wx.showModal({
      content: "亲，您的微信版本较低，将会影响小程序使用哦。",
      confirmText: "好的",
      showCancel: !1
    });
  },
  networkIsNot4gOrWifi: function () {
    wx.showModal({
      content: "亲，建议使用4G、wifi网络",
      showCancel: !1
    });
  },
  networkTurnOff: function () {
    wx.showModal({
      content: "亲，请连接网络",
      showCancel: !1
    });
  },
  audioHasNotSrc: function () {
    wx.showModal({
      title: "温馨提示",
      content: "音频内容不存在",
      showCancel: !1
    });
  },
  successDialog: function (successMsg) {
    wx.showToast({
      title: successMsg,
      icon: "success",
      duration: 2000
    });
  },
  waitDialog: function () {
    wx.showToast({
      title: '请稍等',
      icon: "loading",
      mask: true
    });
  },
  sysErrorDialog: function () {
    wx.showToast({
      title: '服务异常，麻烦反馈',
      icon: "loading",
      mask: true
    });
  },
  errDialog: function (errMsg) {
    wx.showToast({
      title: errMsg,
      icon: "error",
      duration: 2000
    });
  },
}