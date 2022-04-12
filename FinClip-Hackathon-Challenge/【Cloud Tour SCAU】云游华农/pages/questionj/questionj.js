// pages/questionj/questionj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   dui1:[],
   dui:0,
   d1:false,
   d2:false,
   d3:false,
   d4:false,
   d5:false,
   d6:false,
   d7:false,
   d8:false,
   d9:false,
   d10:false,
   tupian:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      dui1:getApp().globalData.dui1,
      dui:getApp().globalData.dui
     })
     this.setData({
       d1:this.data.dui1[0],
       d2:this.data.dui1[1],
       d3:this.data.dui1[2],
       d4:this.data.dui1[3],
       d5:this.data.dui1[4],
       d6:this.data.dui1[5],
       d7:this.data.dui1[6],
       d8:this.data.dui1[7],
       d9:this.data.dui1[8],
       d10:this.data.dui1[9]
     })
     console.log(this.data.dui1)
     console.log(this.data.dui)
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
    wx.redirectTo({
      url: '../questionb/questionb'
    })
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