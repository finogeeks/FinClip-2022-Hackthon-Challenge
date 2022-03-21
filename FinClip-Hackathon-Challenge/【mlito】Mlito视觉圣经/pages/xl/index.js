const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data:
  {
    scrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
    bHeight:0,
    imgUrls:"",
    gb:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-150-50-off.svg",
    content: [
      {
        topbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-450.png",
        btbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-100-1.svg",
        top9:[],
        top91:[],
        main:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"}
        ],
        footermain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"}
        ],
        admain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-200.svg",id:"品牌"}
        ]
      },
      {
        topbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-450-2.png",
        btbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-100-2.svg",
        main:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"}
        ],
        footermain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"}
        ],
        admain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-200.svg",id:"品牌"}
        ]
      },
      {
        topbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-450-3.png",
        btbj:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-100-3.svg",
        main:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-230-230.svg",id:"品牌"}
        ],
        footermain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"},
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-170-50-1.svg",id:"品牌"}
        ],
        admain:[
          {img:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-200.svg",id:"品牌"}
        ]
      }
      ],
      topbj:"",
      dqxx:0
  },

  bindchange(e) {
    wx.vibrateShort();
    this.setData({
         swiperIndex: e.detail.current
    })
  },

  switchTab(e) {
    
    const data = e.currentTarget.dataset
    const url = data.path
    wx.switchTab({url})
    this.setData({
      selected: data.index
    })
  },

  feilei(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      dqxx:e.currentTarget.dataset.id,
      topbj: this.data.content[e.currentTarget.dataset.id],
      top91:this.data.top9[e.currentTarget.dataset.id].img,
    })
  },


  toDetailsTap: function(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id
    const supplytype = e.currentTarget.dataset.supplytype
    const yyId = e.currentTarget.dataset.yyid
    if (supplytype == 'cps_jd') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-jd?id=${id}`,
      })
    } else if (supplytype == 'vop_jd') {
      wx.navigateTo({
        url: `/pages/goods-details/vop?id=${yyId}&goodsId=${id}`,
      })
    } else if (supplytype == 'cps_pdd') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-pdd?id=${id}`,
      })
    } else if (supplytype == 'cps_taobao') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-taobao?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/goods-details/index?id=${id}`,
      })
    }
  },

  fanhui() {
    wx.navigateBack()
  },
  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },

  index_more: function(e) {
    wx.vibrateShort();

    const index_more_id = e.currentTarget.dataset.id;
    wx.setStorage({
      key:"index_sj",
      data:e.currentTarget.dataset.sj
    })

if(index_more_id ==1){
  wx.navigateTo({
    url: `/pages/index_more_news/index?id=${index_more_id}`,
  })
}else{
  wx.navigateTo({
    url: `/pages/index_more/index?id=${index_more_id}`,
  })
}
 
    // console.log(index_more_id);
  },


  onLoad: function(e) {
    
    const that = this
    this.initBanners()


    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight - APP.globalData.bnavHeight,
                topbj:that.data.content[0],
            }); 
        } 
    })

  },

  async initBanners(){
    const _data = {}
    // 读取头部轮播图
    const res1 = await WXAPI.banners({
      type: 'index'
    })
    if (res1.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加 banner 轮播图片，自定义类型填写 index',
        showCancel: false
      })
    } else {
      _data.banners = res1.data
    }
    this.setData(_data)
  },



  onShow: function(e){
    this.setData({
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
      windowHeight: APP.globalData.windowHeight,
      menuButtonObject: APP.globalData.menuButtonObject //小程序胶囊信息
    })

    var _this = this;
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 0
      })
    }
    _this.cmsPage()
    
  },

  async cmsPage() {
    
    const res = await WXAPI.cmsPage("251111")
    if (res.code == 0) {
      
      let sj =JSON.parse(res.data.info.content);
      console.log("sjsjsj",sj);
      this.setData({
        content:sj.sj,
        top9:sj.sj[0].tag9,
        top91:sj.sj[0].tag9[0].img
      })
      this.setData({
        topbj:this.data.content[0]
      })
      console.log(this.data.content);
      console.log(this.data.topbj);
    }

  },



  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },


  toliebiao(e){

    let tag_id = e.currentTarget.dataset.id;
    if(tag_id.indexOf("http") == 0){
      let site = tag_id.lastIndexOf("\/");
      tag_id = tag_id.substring(site + 1, tag_id.length);
    }

    wx.vibrateShort();

    
    console.log(tag_id);

    if(this.data.dqxx ==2){
      wx.switchTab({
        url: `/pages/haowu/index`,
      });
    }else{
wx.navigateTo({
      url: `/pages/taglist/index?id=${tag_id}`,
    });
    }
    
    
  },



  onShareAppMessage: function() {    
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + wx.getStorageSync('share_profile'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },


  goSearch(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  goNotice(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/notice/show?id=' + id,
    })
  },


})