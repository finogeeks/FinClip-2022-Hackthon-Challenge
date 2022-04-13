Page({

  /**
   * 页面的初始数据
   */
  data: {
        TabCur: 0,
    scrollLeft:0,
    iconList: [{
      icon: 'locationfill',
      color: 'green',
      badge: 120,
      name: '学校地图'
    }, {
      icon: 'peoplelist',
      color: 'orange',
      badge: 1,
      name: '通讯录'
    }, {
      icon: 'searchlist',
      color: 'yellow',
      badge: 0,
      name: '问答'
    }, {
      icon: 'newshot',
      color: 'olive',
      badge: 22,
      name: '新生指南'
    }],
    ties:[{"name":"全部"},{"name":"失物招领"},{"name":"表白墙"},{"name":"Q&A"},{"name":"其他"}],
    cards:[
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      },
      {
        img:"../../images/tie/back.jpg",
        rank:"史诗",
        pic:"比较是偷走幸福的小偷",
        aimg:"../../images/comm-pe/Esc.jpg",
        aut:"Esc",
        time:"2022/4/1",
        look:20,
        good:20,
        content:20
      }
    ]

  },tabSelect(e) {
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