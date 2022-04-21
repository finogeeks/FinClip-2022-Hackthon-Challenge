Page({

  /**
   * 页面的初始数据
   */
  data: {
         index: null,
    picker: ['2021-2022学年 第1学期', '2020-2021学年 第2学期', '2020-2021学年 第1学期'],

  },
PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
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
  submit(){
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        wx.navigateTo({
          url: '/pages/index/inq/inq',
        });
          
      }
    });
      
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