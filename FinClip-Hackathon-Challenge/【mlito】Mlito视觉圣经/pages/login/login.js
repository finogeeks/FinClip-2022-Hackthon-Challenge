const WXAPI = require('apifm-wxapi')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iyhh:undefined,
    imm:undefined
  },
  yhh: function (e) {
    this.setData({
      iyhh: e.detail.value
    })
  },
  mm: function (e) {
    this.setData({
      imm: e.detail.value
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  jlogin: function() {
    console.log(21342343243);
    console.log(this.data.iyhm ,this.data.imm);

    if(!this.data.iyhh || !this.data.imm){
      wx.showToast({
        title: "请输入正确的用户名密码",
        icon: 'none'
      })
      return
    }

    this.qulogin();

  },


  
  updateUserInfo(e) {
    console.log(66666666);
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料',
      success: res => {
        this._updateUserInfo(res.userInfo)
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: err => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  async qulogin() {
    const postData = {
      deviceId:"fc",
      deviceName:"fc",
      username: this.data.iyhh,
      pwd: this.data.imm,
      
    }
    const res = await WXAPI.login_username(postData)
    console.log("ddddd:",res);
    if (res.code != 0) {
      this.quzc()
      return
    }else{
      wx.showToast({
        title: '登陆成功',
      })
  
      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('uid', res.data.uid)
      // 回到原来的地方放
      // app.navigateToLogin = true
      // wx.switchTab({
      //   url: '/pages/my/index'
      // })



      wx.switchTab({
        url: '/pages/my/index',
        success: function (res) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onShow();
          
          console.log('跳转到index页面成功')// success
        },
        fail: function (res) {
          console.log('跳转到index页面失败')  // fail
        },
        complete: function (res) {
          console.log('跳转到index页面完成') // complete
        }
      })



      // wx.navigateBack();
    }






  },

  async quzc() {
    const postData = {

      username: this.data.iyhh,
      pwd: this.data.imm,
      
    }
    const res = await WXAPI.register_username(postData)
    console.log("ddddd:",res);
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      return
    }else{
  this.qulogin()
    }

  },


  


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindGetUserInfo: function(e) {
    if (!e.detail.userInfo) {
      return;
    }
    if (app.globalData.isConnected) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.login();
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  login: function() {
    const that = this;
    const token = wx.getStorageSync('token');
    if (token) {
      WXAPI.checkToken(token).then(function(res) {
        if (res.code != 0) {
          wx.removeStorageSync('token')
          that.login();
        } else {
          // 回到原来的地方放
          app.navigateToLogin = false
          wx.navigateBack();
        }
      })
      return;
    }
    wx.login({
      
      success: function(res) {
        WXAPI.login(res.code).then(function(res) {
          console.log("999999:",res);
          if (res.code == 10000) {
            // 去注册
            that.registerUser();
            return;
          }
          if (res.code != 0) {
            // 登录错误
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '无法登录，请重试',
              showCancel: false
            })
            return;
          }
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          // 回到原来的地方放
          app.navigateToLogin = false
          wx.navigateBack();
        })
      }
    })
  },
  registerUser: function() {
    let that = this;
    wx.login({
      success: function(res) {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function(res) {
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            let referrer = '' // 推荐人
            let referrer_storge = wx.getStorageSync('referrer');
            if (referrer_storge) {
              referrer = referrer_storge;
            }
            // 下面开始调用注册接口
            WXAPI.register( {
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              referrer: referrer
            }).then(function(res) {
              wx.hideLoading();
              that.login();
            })
          }
        })
      }
    })
  }
})