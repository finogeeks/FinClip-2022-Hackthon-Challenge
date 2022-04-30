// pages/me/history.js
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
    const that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    api.recent({
    }).then((res) => {
      that.setData({
        list: res.data
      })
      wx.hideLoading()
    })
  },
  goToPlay(e) {
    wx.navigateTo({
      url: '/pages/play/play?articleId='+e.currentTarget.dataset.id
    })
  },
})