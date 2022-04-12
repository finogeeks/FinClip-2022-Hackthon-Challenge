Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:"02085283652"
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.photo,
    })
  },
  getMap() {
        // 经纬度
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success (res) {
            wx.openLocation({
              latitude:23.155365,
              longitude:113.35366,
              scale: 15
            })
          }
         })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})