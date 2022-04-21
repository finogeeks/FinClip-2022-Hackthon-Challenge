
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#90a0c0", "#bdacdb", "#faadc3", "#85b892", "#699fd0", "#ff9038", "#c18d70", "#b99c9e"],
    wlist: [
     //上课长度全部默认为两节课
      { "xqj": 1, "sksj": 1, "skcd":2, "kcxx": "高等数学 教学楼0218 1~16周"},
      
      { "xqj": 1, "sksj": 8, "skcd": 2, "kcxx":"大学英语 教学楼0318 1~16周"},

      { "xqj": 2, "sksj": 3, "skcd": 2, "kcxx": "计算机基础 教学楼0210 1~16周" },
      { "xqj": 2, "sksj": 6, "skcd": 2, "kcxx": "C语言 教学楼0402 1~16周" },
      
      { "xqj": 3, "sksj": 3, "skcd": 2, "kcxx": "C语言实验课 实验楼0216 4~12周" },
      { "xqj": 3, "sksj": 6, "skcd": 2, "kcxx": "数据结构 教学楼0306 1~16周" },

      { "xqj": 4, "sksj": 1, "skcd": 2, "kcxx": "高等数学 教学楼0218 1~16周" },

      { "xqj": 4, "sksj": 6, "skcd": 2, "kcxx": "乒乓球 体育馆一楼 1~16周" },
      { "xqj": 4, "sksj": 8, "skcd": 2, "kcxx": "数据结构实验课 实验楼0216 4~16周" },
      { "xqj": 4, "sksj": 10, "skcd": 2, "kcxx": "选修课 综实楼0504 1~16周" },

      { "xqj": 5, "sksj": 3, "skcd": 2, "kcxx": "软件工程 教学楼0403 1~16周" },
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ukcxx = wx.getStorageSync('kcxx');
    var skcd = wx.getStorageSync('skcd');
    this.setData({ kcxx: kcxx });
    this.setData({ skcd: skcd});
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
