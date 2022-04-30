// pages/me/collect.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this;
    api.collectList({
    }).then((res) => {
      that.setData({
        list: res.data
      })
    })
  },
  goToPlay(e) {
    wx.navigateTo({
      url: '/pages/play/play?articleId='+e.currentTarget.dataset.id
    })
  }
})