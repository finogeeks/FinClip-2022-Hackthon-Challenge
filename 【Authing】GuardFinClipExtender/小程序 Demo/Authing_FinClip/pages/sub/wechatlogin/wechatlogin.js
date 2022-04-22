const app = getApp()

Page({
  data: {
    token:'',
  },

  login() {
    wx.login({
      timeout:10000,
      success: (result) => {
        this.setData({
            token: result.token
        })
          
      },
      fail: (error) => {
        this.setData({
            token: error.errMsg
        })
      },
      complete: () => {}
    });
  }
})
