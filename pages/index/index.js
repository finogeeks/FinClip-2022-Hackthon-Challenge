//index.js
//获取应用实例
const utils = require('../../utils/util.js');
const app = getApp();
var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    model: 0,
    index: 0,
    navBar: {},
    selected: 0,
    selectedColor: '#ff0000',
    color: '#333333',
    list: [],
    tabBarlist: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/home@2x.png",
      selectedIconPath: "/images/home_active@2x.png",
      text: "首页"
    }, {
      pagePath: "/pages/create/locale",
      iconPath: "/images/add@2x.png",
      selectedIconPath: "/images/add_active@2x.png",
      text: "创建"
    },
    {
      pagePath: "/pages/user/index",
      iconPath: "/images/my@2x.png",
      selectedIconPath: "/images/my_active@2x.png",
      text: "我的"
    }
    ],
    isFetch:false,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.navBar.statusBarHeight = app.globalData.statusBarHeight;
    this.data.navBar.title = '抽奖大转盘';
    this.data.navBar.type = 0;
    this.setData({
      navBar: this.data.navBar,
      model: app.globalData.model,
    });



    wx.showShareMenu({
      withShareTicket: true,
    })
    this.getArticles()
    this.getPublic();

    var _t = new Date().getTime();
    if(_t < 1615478399000){ 
      this.getFind();
    }


  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tabBarTap(e) {
  
    // wx.navigateToMiniProgram({
    //   appId: 'wxe9714e742209d35f',
    //   path:'pages/index/index?$route=pages%2FproductDetail%2FproductDetail%3FbrandId%3D3662181%26goodsId%3D681993691&tra_from=adp%3Ax4j5brsb%3A%3A%3A%3A'
    // })

    const data = e.currentTarget.dataset
    const url = data.path
    wx.redirectTo({
      url: url,
    });
    this.setData({
      selected: data.index,
    })
  },
  goDemo: function () {
    /*
     0默认
     1圣诞
     2元旦
     */
    wx.navigateTo({
      url: '/pages/index/detail?skin_id=0',
    })
  },
  goPublic:function(){
    wx.navigateTo({
      url: '/newpages/jackpot/detail?id='+this.data.publicList[0].lottery_id,
    })

  },
  create: function () {
      wx.showToast({
      title:'建设中',
      icon:'none'
    })
    // wx.redirectTo({
    //   url: '/newpages/create/locale',
    // })

  },
  goUserInfo: function () {
      wx.showToast({
      title:'建设中',
      icon:'none'
    })
    // wx.redirectTo({
    //   url: '/newpages/user/index',
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: '推荐抽奖大转盘给你，来试试',
      path: 'pages/index/index',
      imageUrl: '../../images/share.png',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log('分享失败');
      }
    }
  },
  getArticles: function () {
    var getRequest = wxRequest.getRequest(Api.getDZPArticles({ app_id: 263, limit: 10 }));
    getRequest.then(res => {
      console.log(res)
      this.setData({
        list: res.data.data
      })

    })

  },

  //获取公共抽奖
  getPublic(){
    var getRequest = wxRequest.getRequest(Api.getPubliclottery());
    getRequest.then(res => {
      console.log(res);
      if(res.data.code == 200){
        this.setData({
          publicList:res.data.data,
          isFetch:true,
        })
      }
    
      })
    

  },

  //查询是否参与过 自然堂活动
  getFind(){
    var getRequest = wxRequest.getRequest(Api.getIsJoin());
    getRequest.then(res => {
      console.log(res)

      if(res.data.code==200){
        if(res.data.data.lottery_id){
          wx.redirectTo({
            url: '/pages/jackpot/detail?id='+res.data.data.lottery_id,
          })
        }
      }
    })
    
  },
  openWeb: function (e) {
    wx.navigateTo({
      url: '/tradis/h5/h5?url=' + e.currentTarget.dataset.url,
    })
  }
})