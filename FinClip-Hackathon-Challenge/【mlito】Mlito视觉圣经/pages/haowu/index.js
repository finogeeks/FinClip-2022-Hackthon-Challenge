const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data: {
    sjc:Date.parse(new Date()),
    inputVal: "", // 搜索框内容
    goodsRecommend: [], // 推荐商品
    kanjiaList: [], //砍价商品列表
    pingtuanList: [], //拼团商品列表
    loadingHidden: false, // loading
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: 0,
    loadingMoreHidden: true,
    coupons: [],
    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0,
    scrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
  },

  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  more: function(e) {

      wx.navigateTo({
        url: '/pages/haowu/index_class',
      })
    
  },

  tabClick: function(e) {
    const category = this.data.categories.find(ele => {
      return ele.id == e.currentTarget.dataset.id
    })
    if (category.vopCid1 || category.vopCid2) {
      wx.navigateTo({
        url: '/pages/goods/list-vop?cid1=' + (category.vopCid1 ? category.vopCid1 : '') + '&cid2=' + (category.vopCid2 ? category.vopCid2 : ''),
      })
    } else {
      wx.setStorageSync("_categoryId", category.id)
      wx.switchTab({
        url: '/pages/category/category',
      })
    }
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
  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },
  adClick: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },
  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function(e) {
    wx.showShareMenu({
      withShareTicket: true,
    })
    const that = this
    // 读取分享链接中的邀请人编号
    if (e && e.inviter_id) {
      wx.setStorageSync('referrer', e.inviter_id)
    }
    // 读取小程序码中的邀请人编号
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene)
      if (scene) {        
        wx.setStorageSync('referrer', scene.substring(11))
      }
    }
    // 静默式授权注册/登陆
    AUTH.checkHasLogined().then(isLogined => {
      if (!isLogined) {
        AUTH.authorize().then( aaa => {
          AUTH.bindSeller()
          TOOLS.showTabBarBadge()
        })
      } else {
        AUTH.bindSeller()
        TOOLS.showTabBarBadge()
      }
    })
    this.initBanners()
    this.categories()
    WXAPI.goods({
      recommendStatus: 1
    }).then(res => {
      if (res.code === 0){
        that.setData({
          goodsRecommend: res.data
        })
      }      
    })
    that.getCoupons()
    that.getNotice()
    that.kanjiaGoods()
    that.pingtuanGoods()
    this.wxaMpLiveRooms()
    this.adPosition()
    // 读取系统参数
    this.readConfigVal()
    getApp().configLoadOK = () => {
      this.readConfigVal()
    }
  },
  readConfigVal() {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    this.setData({
      mallName:wx.getStorageSync('mallName')?wx.getStorageSync('mallName'):'',
      show_buy_dynamic: wx.getStorageSync('show_buy_dynamic')
    })
  },
  async miaoshaGoods(){
    const res = await WXAPI.goods({
      miaosha: true
    })
    if (res.code == 0) {
      res.data.forEach(ele => {
        const _now = new Date().getTime()
        if (ele.dateStart) {
          ele.dateStartInt = new Date(ele.dateStart.replace(/-/g, '/')).getTime() - _now
        }
        if (ele.dateEnd) {
          ele.dateEndInt = new Date(ele.dateEnd.replace(/-/g, '/')).getTime() -_now
        }
      })
      this.setData({
        miaoshaGoods: res.data
      })
    }
  },
  async wxaMpLiveRooms(){
    const res = await WXAPI.wxaMpLiveRooms()
    if (res.code == 0 && res.data.length > 0) {
      this.setData({
        aliveRooms: res.data
      })
    }
  },
  async initBanners(){
    const _data = {}
    // 读取头部轮播图
    const res1 = await WXAPI.banners({
      type: 'haowu'
    })
    if (res1.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加 banner 轮播图片，自定义类型填写 haowu',
        showCancel: false
      })
    } else {
      _data.banners = res1.data
    }
    this.setData(_data)
  },
  onShow: function(e){
    this.cmsPage()
    console.log("App.globalData.navHeight", APP.globalData.navHeight)
    console.log("App.globalData.navTop", APP.globalData.navTop)
    console.log("App.globalData.windowHeight", APP.globalData.windowHeight)
    this.setData({
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
      windowHeight: APP.globalData.windowHeight,
      menuButtonObject: APP.globalData.menuButtonObject //小程序胶囊信息
    })
    this.setData({
      shopInfo: wx.getStorageSync('shopInfo')
    })
    // 获取购物车数据，显示TabBarBadge
    TOOLS.showTabBarBadge()
    this.goodsDynamic()
    this.miaoshaGoods()


    var _this = this;
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 3
      })
    }
    
  },




  zhankai(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let bh = e.currentTarget.dataset.bh;
    console.log(id,bh);
    that.splb(id,bh);

    wx.navigateTo({
      url: '/pages/goods/list?categoryId=' + id,
    })

    
  },

  async cmsPage() {
    var that = this;
    const res = await WXAPI.cmsPage("2504")
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      let jdata=sj.sj[0];
      that.setData({
        jdata:jdata,
        // lc1a:sj.sj[0].lc1.zh,
        // lc7gd:sj.sj[0].lc7.db.link,
      })
      console.log("cmsPagecmsPagecmsPage",jdata);
      
      // jdata.forEach(function)

      
      jdata.ac1.forEach(function(element,index) {
        let aa = element.db.link;
        console.log(aa,index);
        that.splb(aa,index);
      });

      // this.qusp();
      // that.lc1(2,that.data.jdata.lc2.db.link);
    }
  },

  async splb(categoryId, append) {
    console.log("categoryId, append",categoryId, append);
    if (!categoryId) {
      categoryId = "";
    }
    const res = await WXAPI.goods({
      categoryId: categoryId,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })
    

    if (res.code == 404 || res.code == 700) {
      return
    }
    let aa = res.data;
    aa.forEach(function(element,index){
      if(element.tags){



        if(element.tags){
          let c = element.tags;
          c = c.split("、");
          // console.log(c);
          aa[index].tags = c;
        }
        

        if(element.characteristic){
          let b = element.characteristic;
          b = b.split(",");
          // console.log(b);
          aa[index].characteristic = b;
        }

        
      }
      
    })

    console.log("this.data.goodsthis.data.goods",aa);
    this.data.jdata.ac1[append].sp=aa;

    this.setData({
      jdata: this.data.jdata,
    });
    console.log(this.data.jdata);

  },



  async goodsDynamic(){
    const res = await WXAPI.goodsDynamic(0)
    if (res.code == 0) {
      this.setData({
        goodsDynamic: res.data
      })
    }
  },
  async categories(){
    const res = await WXAPI.goodsCategory()
    let categories = [];
    if (res.code == 0) {
      const _categories = res.data.filter(ele => {
        return ele.level == 1
      })
      categories = categories.concat(_categories)
    }
    this.setData({
      categories: categories,
      activeCategoryId: 0,
      curPage: 1
    });
    this.getGoodsList(0);
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  async getGoodsList(categoryId, append) {
    if (categoryId == 0) {
      categoryId = "";
    }
    wx.showLoading({
      "mask": true
    })
    const res = await WXAPI.goods({
      categoryId: categoryId,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })
    wx.hideLoading()
    if (res.code == 404 || res.code == 700) {
      let newData = {
        loadingMoreHidden: false
      }
      if (!append) {
        newData.goods = []
      }
      this.setData(newData);
      return
    }
    let goods = [];
    if (append) {
      goods = this.data.goods
    }
    for (var i = 0; i < res.data.length; i++) {
      goods.push(res.data[i]);
    }
    console.log("goodsgoodsgoods",goods);
    this.setData({
      loadingMoreHidden: true,
      goods: goods,
    });
  },
  getCoupons: function() {
    var that = this;
    WXAPI.coupons().then(function (res) {
      if (res.code == 0) {
        that.setData({
          coupons: res.data
        });
      }
    })
  },
  onShareAppMessage: function() {    
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + wx.getStorageSync('share_profile'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },
  getNotice: function() {
    var that = this;
    WXAPI.noticeList({pageSize: 5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        });
      }
    })
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId)
    wx.stopPullDownRefresh()
  },
  // 获取砍价商品
  async kanjiaGoods(){
    const res = await WXAPI.goods({
      kanjia: true
    });
    if (res.code == 0) {
      const kanjiaGoodsIds = []
      res.data.forEach(ele => {
        kanjiaGoodsIds.push(ele.id)
      })
      const goodsKanjiaSetRes = await WXAPI.kanjiaSet(kanjiaGoodsIds.join())
      if (goodsKanjiaSetRes.code == 0) {
        res.data.forEach(ele => {
          const _process = goodsKanjiaSetRes.data.find(_set => {
            return _set.goodsId == ele.id
          })
          if (_process) {
            ele.process = 100 * _process.numberBuy / _process.number
            ele.process = ele.process.toFixed(0)
          }
        })
        this.setData({
          kanjiaList: res.data
        })
      }
    }
  },
  goCoupons: function (e) {
    wx.navigateTo({
      url: "/pages/coupons/index"
    })
  },
  pingtuanGoods(){ // 获取团购商品列表
    const _this = this
    WXAPI.goods({
      pingtuan: true
    }).then(res => {
      if (res.code === 0) {
        _this.setData({
          pingtuanList: res.data
        })
      }
    })
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
  async adPosition() {
    let res = await WXAPI.adPosition('indexPop')
    if (res.code == 0) {
      this.setData({
        adPositionIndexPop: res.data
      })
    }
    res = await WXAPI.adPosition('index-live-pic')
    if (res.code == 0) {
      this.setData({
        adPositionIndexLivePic: res.data
      })
    }
  },
  clickAdPositionIndexLive() {
    if (!this.data.adPositionIndexLivePic || !this.data.adPositionIndexLivePic.url) {
      return
    }
    wx.navigateTo({
      url: this.data.adPositionIndexLivePic.url,
    })
  },
  closeAdPositionIndexPop() {
    this.setData({
      adPositionIndexPop: null
    })
  },
  clickAdPositionIndexPop() {
    const adPositionIndexPop = this.data.adPositionIndexPop
    this.setData({
      adPositionIndexPop: null
    })
    if (!adPositionIndexPop || !adPositionIndexPop.url) {
      return
    }
    wx.navigateTo({
      url: adPositionIndexPop.url,
    })
  }
})