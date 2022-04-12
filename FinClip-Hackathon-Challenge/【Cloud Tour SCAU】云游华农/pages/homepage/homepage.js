Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:{
      time:'',
      temp:'',
      icon:''
    },
    imgUrls: [
      'https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/9062b0bab5bfaf23a539bea4f1fc778.png?sign=6c1cc58f19a659f5fc028a496108f829&t=1649750484',
      'https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/02b9044821c1947cfb1af54f9c86512.png?sign=1c0c5576065dc8636aaa0319182118b0&t=1649750525',
      'https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/88e22255d545fcd54892b6ed0acd6d2.png?sign=4407a24544654d3f55b2b23282d7db8b&t=1649750536',
      'https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/be11955f657fcd7b220f2fd9c41b22b.jpg?sign=93aa30f54c808266f21bec3d5e495014&t=1649750551',
      'https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/e57238aa757fe7153a7cfb8ec5589b2.jpg?sign=2a8cf0bb8fe574d9ab798cf8f36bf626&t=1649750567'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?location=101280106&key=b3ca41b600074402a355733007806080',
      success(res){
        // 实时温度观察时间
       let obsDate = res.data.now.obsTime.split('T')[0]
       let obsTime = res.data.now.obsTime.split('T')[1].split('+')[0]
       res.data.now.obsTime = obsDate+' '+obsTime
       that.setData({
         now:res.data.now
       })
       wx.setStorageSync('nowTemp', res.data.now);
       console.log(res.data.now)
      }
    })
  },
  onpicture:function(){
     wx.navigateTo({
       url: '../pictures/pictures',
     })
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

