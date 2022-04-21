import cards from '../../api/article'
Page({
  data: {
        TabCur: 0,
    scrollLeft:0,
    iconList: [{
      icon: 'locationfill',
      color: 'green',
      badge: 120,
      name: '学校地图',
      url:'map'
    }, {
      icon: 'peoplelist',
      color: 'orange',
      badge: 1,
      name: '通讯录',
   url:'phonetext'
    }, {
      icon: 'searchlist',
      color: 'yellow',
      badge: 0,
      name: '问答',
      url:'qa'
    }, {
      icon: 'newshot',
      color: 'olive',
      badge: 22,
      name: '新生指南',
      url:'freshman'
    }],
    ties:[{"name":"全部",},{"name":"失物招领"},{"name":"表白墙"},{"name":"Q&A"},{"name":"其他"}],
    cards:cards,
    num:0

  },
  refrash:function(){
    this.setData({
      num:this.data.num+1
    })
  },
tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
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
})