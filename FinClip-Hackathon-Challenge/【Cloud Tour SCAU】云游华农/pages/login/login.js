Page({
  data: {
    hasUserInfo:false,
  },
  onLoad:function(){
    
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.switchTab({
          url: '../homepage/homepage',
        })
        wx.setStorageSync('userInfo', res.userInfo);
      },
      fail: res=>{
        wx.showModal({
          title:'警告',
          showCancel:false,
          content:'您点击了拒绝授权，将无法进入小程序，请授权以进入！',
          confirmText:'返回授权',
          success:function(res){
            if(res.confirm){
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    })
  }
})