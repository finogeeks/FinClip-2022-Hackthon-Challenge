Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submit(){
    wx.showToast({
      title: '修改成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success:function(result){
        wx.reLaunch({
        url: '/pages/my/my',
      });
      }  
    });
      
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
})