// pages/component/movableView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },
  /**
   * 组件的初始数据
   */
  data: {
    x: 0,
    y: 0
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    // 当前页面刷新
    refrash: function (e) {
    wx.navigateTo({
        url: '/pages/confirm/edi/edi',
      });
        
    }
  },
  attached: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          x: res.windowWidth,
          y: res.windowHeight
        })
      },
    })
  }
})