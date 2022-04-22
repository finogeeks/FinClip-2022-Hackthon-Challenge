// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
  },
  // 事件处理函数
  bindViewTap() {
    ft.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {

    this.setData({
      motto: 'guard'
    })
  }
})
