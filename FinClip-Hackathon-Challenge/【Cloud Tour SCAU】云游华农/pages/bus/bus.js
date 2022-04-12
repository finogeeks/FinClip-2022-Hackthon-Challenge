// pages/bus/bus.js
Page({

  /**
   * 页面的初始数据
   */
// 初始数据
data: {
  longitude:"113.353668",
  latitude:"23.154365",
  scale:"14",
  polyline: [{
    points: [{
      latitude:23.15324561079688,
      longitude:113.35176273702623,
    },
    {
      latitude:23.15455760920987,
      longitude:113.35165544866564,
    },
    {
      latitude:23.154799291727414,
      longitude:113.3521167886162,
    },
    {
      latitude:23.15488314066197,
      longitude:113.35265859483721,
    },
    {
      latitude:23.15478942714342,
      longitude:113.35322185873034,
    },
    {
      latitude:23.154675984375373,
      longitude:113.3536295545006,
    },
    {
      latitude:23.154636525998768,
      longitude:113.35398360609057,
    },
    {
      latitude:23.15467598437643,
      longitude:113.35453614114763,
    },
    {
      latitude:23.15465132289241,
      longitude:113.35566266893389,
    },
    {
      latitude:23.15464639059506,
      longitude:113.35722907899859,
    },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },
    // {
    //   latitude:,
    //   longitude:,
    // },

  ],
    color: "#fff",//线的填充颜色
    width: 3,
    arrowLine: false,//是否展示线的箭头方向
    borderWidth: 1, //线的边框宽度
    borderColor:"#42a5f5"
  }]
},

mapLine(){
 this.setData({
   latitude: "23.155365",
   longitude:"113.353668",
   scale:"15"
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