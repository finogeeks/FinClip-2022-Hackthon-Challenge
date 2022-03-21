const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data: {
    sjc:Date.parse(new Date()),
    jdata:{
      top:{
        ysj:{
          nr:"https://www.mlito.com/wp-content/uploads/lite-topic-50-50.svg",link:"/pages/index_more/index?1221"
        },
        lj:[
          {nr:"宇宙",link:"/pages/index_more/index?1221"},
          {nr:"头条",link:"头条"},
          {nr:"头条",link:"头条"},
        ]
      },
      lc1:{
          db:{
            nr:"最新 NEW",link:"#全部"
          },
          lj:[
            {nr:"头条",link:"头条"},
            {nr:"头条",link:"头条"},
            {nr:"头条",link:"头条"},
          ]
      },
      gg:[
        {
          nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""
        },
        {
          nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""
        },
        {
          nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""
        },
        {
          nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""
        },
        {
          nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""
        }
      ],
      lc2:{
        db:{
          nr:"会员中心 Member Center",link:""
        },
        lj:[
          {nr:"头条2",link:"头条2"},
          {nr:"头条2",link:"头条2"},
          {nr:"头条2",link:"头条2"},
        ],
        zh:[
          {nr:"头条22",link:"头条22"},
          {nr:"头条22",link:"头条22"},
          {nr:"头条22",link:"头条22"},
        ]
      },
      lc3:{
        db:[
          {nr:"提升版",link:""},
          {nr:"个人生态版",link:""},
          {nr:"品牌生态版",link:""},
        ],
        lj:[
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-1.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-2.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-3.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-4.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-5.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-6.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-7.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-8.svg",link:""},
          {nr:"https://www.mlito.com/wp-content/uploads/lite-vip-100-100-all.svg",link:""}
        ],
        zh:[
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
        ]
      },
      lc4:{
        db:{
          nr:"宇宙 The Universe",link:""
        },
        lj:[
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
        ],
        zh:[
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
        ]
      },
      lc5:{
        db:{
          nr:"宇宙 The Universe",link:""
        },
        lj:[
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
        ],
        zh:[
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
        ]
      },
      lc6:{
        db:{
          nr:"宇宙 The Universe",link:""
        },
        lj:[
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
        ],
        zh:[
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
        ],
        dbxq:{
          nr:"精选星球",link:""
        },
        xq:[
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
        ],
      },
      lc7:{
        db:{
          nr:"宇宙 The Universe",link:""
        },
        lj:[
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
          {nr:"空间",link:"空间"},
        ],
        zh:[
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
          {nr:"全球",link:"全球"},
        ],
        dbxq:{
          nr:"精选星球",link:""
        },
        xq:[
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
          {nr:"https://dcdn.it120.cc/2020/04/09/9fa0368e-960b-4313-ac17-0263ab08e0ac.jpeg",link:""},
        ]
      },
    },
    lc1:"",
    lc2:"",
    lc3:"",
    lc4:"",
    lc5:"",
    lc6:"",
    lc7:"",
    
    lc1a:"",
    lc2a:"",
    lc3a:"",
    lc4a:"",
    lc5a:"",
    lc6a:"",
    lc7a:"",
    
    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,

    dyid:"",
    // // 底部
    // list: [{
    //   pagePath: "/pages/index/index",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "探索"
    // },
    // {
    //   pagePath: "/pages/dingyue/index",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "订阅"
    // },
    // {
    //   pagePath: "/pages/coupons/hy",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "会员"
    // },
    // {
    //   pagePath: "/pages/haowu/index",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "好物"
    // },
    // {
    //   pagePath: "/pages/my/index",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "我的"
    // }]
  },

  // switchTab(e) {
  //   const data = e.currentTarget.dataset
  //   const url = data.path
  //   wx.switchTab({url})
  //   this.setData({
  //     selected: data.index
  //   })
  // },

  // tabClick: function(e) {
  //   const category = this.data.categories.find(ele => {
  //     return ele.id == e.currentTarget.dataset.id
  //   })
  //   if (category.vopCid1 || category.vopCid2) {
  //     wx.navigateTo({
  //       url: '/pages/goods/list-vop?cid1=' + (category.vopCid1 ? category.vopCid1 : '') + '&cid2=' + (category.vopCid2 ? category.vopCid2 : ''),
  //     })
  //   } else {
  //     wx.setStorageSync("_categoryId", category.id)
  //     wx.switchTab({
  //       url: '/pages/category/category',
  //     })
  //   }
  // },
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
    let url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: `/pages/dingyue_list/index?id=${url}`,
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
    // wx.showShareMenu({
    //   withShareTicket: true,
    // })
    let that = this
    // 读取分享链接中的邀请人编号
    // if (e && e.inviter_id) {
    //   wx.setStorageSync('referrer', e.inviter_id)
    // }
    // // 读取小程序码中的邀请人编号
    // if (e && e.scene) {
    //   const scene = decodeURIComponent(e.scene)
    //   if (scene) {        
    //     wx.setStorageSync('referrer', scene.substring(11))
    //   }
    // }
    // // 静默式授权注册/登陆
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (!isLogined) {
    //     AUTH.authorize().then( aaa => {
    //       AUTH.bindSeller()
    //       TOOLS.showTabBarBadge()
    //     })
    //   } else {
    //     AUTH.bindSeller()
    //     TOOLS.showTabBarBadge()
    //   }
    // })
    that.initBanners()

    if(e.id) {
      that.setData({
              dyid: e.id
      })
    }
    

    // this.categories()
    // WXAPI.goods({
    //   recommendStatus: 1
    // }).then(res => {
    //   if (res.code === 0){
    //     that.setData({
    //       goodsRecommend: res.data
    //     })
    //   }      
    // })
    // that.getCoupons()
    // that.getNotice()
    // that.kanjiaGoods()
    // that.pingtuanGoods()
    // this.wxaMpLiveRooms()
    // this.adPosition()
    // 读取系统参数
    // this.readConfigVal()
    // getApp().configLoadOK = () => {
    //   this.readConfigVal()
    // }
  },
  // readConfigVal() {
  //   wx.setNavigationBarTitle({
  //     title: wx.getStorageSync('mallName')
  //   })
  //   this.setData({
  //     mallName:wx.getStorageSync('mallName')?wx.getStorageSync('mallName'):'',
  //     show_buy_dynamic: wx.getStorageSync('show_buy_dynamic')
  //   })
  // },
  // async miaoshaGoods(){
  //   const res = await WXAPI.goods({
  //     miaosha: true
  //   })
  //   if (res.code == 0) {
  //     res.data.forEach(ele => {
  //       const _now = new Date().getTime()
  //       if (ele.dateStart) {
  //         ele.dateStartInt = new Date(ele.dateStart.replace(/-/g, '/')).getTime() - _now
  //       }
  //       if (ele.dateEnd) {
  //         ele.dateEndInt = new Date(ele.dateEnd.replace(/-/g, '/')).getTime() -_now
  //       }
  //     })
  //     this.setData({
  //       miaoshaGoods: res.data
  //     })
  //   }
  // },
  // async wxaMpLiveRooms(){
  //   const res = await WXAPI.wxaMpLiveRooms()
  //   if (res.code == 0 && res.data.length > 0) {
  //     this.setData({
  //       aliveRooms: res.data
  //     })
  //   }
  // },
  async initBanners(){
    const _data = {}
    // 读取头部轮播图
    const res1 = await WXAPI.banners({
      type: this.data.dyid
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
    
    // console.log("App.globalData.navHeight", APP.globalData.navHeight)
    // console.log("App.globalData.navTop", APP.globalData.navTop)
    // console.log("App.globalData.windowHeight", APP.globalData.windowHeight)
    this.setData({
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
      windowHeight: APP.globalData.windowHeight,
      menuButtonObject: APP.globalData.menuButtonObject //小程序胶囊信息
    })
    this.cmsPage()
    // this.setData({
    //   shopInfo: wx.getStorageSync('shopInfo')
    // })

    // 获取购物车数据，显示TabBarBadge
    // TOOLS.showTabBarBadge()
    // this.goodsDynamic()
    // this.miaoshaGoods()

    var _this = this;
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected:1
      })
    }
    // this.lc1(1);



    
  },

  async cmsPage() {
    var that = this;
    const res = await WXAPI.cmsPage(that.data.dyid)
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      that.setData({
        jdata:sj.sj[0],
        lc1a:sj.sj[0].lc1.fk,
        lc2a:sj.sj[0].lc2.zh,
      })
      console.log("ccccc",that.data.jdata);
      // console.log("ccccccccccc",that.data.lc1a);

      // setTimeout(function(){that.lc1(2,that.data.jdata.lc2.db.link);},2000)
      // setTimeout(function(){that.lc1(4,that.data.jdata.lc4.db.link);},4000)
      // setTimeout(function(){that.lc1(5,that.data.jdata.lc5.db.link);},5000)
      // setTimeout(function(){that.lc1(6,that.data.jdata.lc2.db.link);},6000)
      // setTimeout(function(){that.lc1(7,that.data.jdata.lc2.db.link);},10000)

      that.lc1(2,that.data.jdata.lc2.db.link);
      that.lc1(3,that.data.jdata.lc3.db.link);
      that.lc1(4,that.data.jdata.lc4.db.link);
      that.lc1(5,that.data.jdata.lc5.db.link);


    }

  },

  toliebiao(e){

    let tag_id = e.currentTarget.dataset.id;
    if(tag_id.indexOf("http") == 0){
      let site = tag_id.lastIndexOf("\/");
      tag_id = tag_id.substring(site + 1, tag_id.length);
    }

    wx.vibrateShort();

    
    console.log(tag_id);
    
    wx.navigateTo({
      url: `/pages/taglist/index?id=${tag_id}`,
    })
  },


  toxiangqing(e){
    wx.vibrateShort();

    const tag_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/xiangqing/index?id=${tag_id}`,
    })
  },

  zhankai(e){

    // const tag_id = e.currentTarget.dataset.id;

    // wx.navigateTo({
    //   url: `/pages/taglist/index?id=${tag_id}`,
    // })


    if(e.currentTarget.dataset.bh==2){
      this.setData({
        lc2: "",
        lc2gd:e.currentTarget.dataset.id,
      });

      let aa = this.data.lc2a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc2a: aa
      });
    }

    if(e.currentTarget.dataset.bh==3){
      this.setData({
        lc3: "",
        lc3gd:e.currentTarget.dataset.id,
      });

      let aa = this.data.lc3a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc3a: aa
      });
    }

    if(e.currentTarget.dataset.bh==4){
      this.setData({
        lc4: "",
        lc4gd:e.currentTarget.dataset.id,
      });
      let aa = this.data.lc4a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc4a: aa
      });
    }

    if(e.currentTarget.dataset.bh==5){
      this.setData({
        lc5: "",
        lc5gd:e.currentTarget.dataset.id,
      });
      let aa = this.data.lc5a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc5a: aa
      });
    }

   
    this.lc1(e.currentTarget.dataset.bh,e.currentTarget.dataset.nr);
  },

  async lc1(a,b) {
    console.log(a,b);
    if(b){

      
      var xx = await WXAPI.cmsArticles({
        categoryId:b
      })

      // var xx = await WXAPI.mlito_shuoyou_list("tags="+b+"&per_page=6")


      // var xx = await WXAPI.mlito_shuoyou_list("tags="+b)
      // console.log("dd2222",xx);
    }else{
      
      // 最新文章
      var xx = await WXAPI.cmsArticles({
        
      })
      // var xx = await WXAPI.mlito_shuoyou_list("per_page=20")
      // var xx = await WXAPI.mlito_shuoyou_list("")
      // console.log("dd",xx);
    }
    let cc = [];
    if(xx.code==0){
      cc = xx.data.result
    }
    
    // xx.forEach((e,index) => {
    //   let a = e.featured_media_src_url;
    //   if(a.indexOf(".svg") != -1 ){
    //     e.svg=true;
    //   }else{
    //     e.svg=false;
    //   }
    //   cc.push(e);
    // });
    
    if(a==1){
      this.setData({
        lc1: cc
      });
    }
    if(a==2){
      this.setData({
        lc2: cc
      });
    }
    if(a==3){
      this.setData({
        lc3: cc
      });
    }
    if(a==4){
      this.setData({
        lc4: cc
      });
    }
    if(a==5){
      this.setData({
        lc5: cc
      });
    }
    if(a==6){
      this.setData({
        lc6: cc
      });
    }
    if(a==7){
      this.setData({
        lc7: cc
      });
    }
    // console.log("dddddd",this.lc1);
  },



  // async goodsDynamic(){
  //   const res = await WXAPI.goodsDynamic(0)
  //   if (res.code == 0) {
  //     this.setData({
  //       goodsDynamic: res.data
  //     })
  //   }
  // },
  // async categories(){
  //   const res = await WXAPI.goodsCategory()
  //   let categories = [];
  //   if (res.code == 0) {
  //     const _categories = res.data.filter(ele => {
  //       return ele.level == 1
  //     })
  //     categories = categories.concat(_categories)
  //   }
  //   this.setData({
  //     categories: categories,
  //     activeCategoryId: 0,
  //     curPage: 1
  //   });
  //   this.getGoodsList(0);
  // },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },


  // async getGoodsList(categoryId, append) {
  //   if (categoryId == 0) {
  //     categoryId = "";
  //   }
  //   wx.showLoading({
  //     "mask": true
  //   })
  //   const res = await WXAPI.goods({
  //     categoryId: categoryId,
  //     page: this.data.curPage,
  //     pageSize: this.data.pageSize
  //   })
  //   wx.hideLoading()
  //   if (res.code == 404 || res.code == 700) {
  //     let newData = {
  //       loadingMoreHidden: false
  //     }
  //     if (!append) {
  //       newData.goods = []
  //     }
  //     this.setData(newData);
  //     return
  //   }
  //   let goods = [];
  //   if (append) {
  //     goods = this.data.goods
  //   }
  //   for (var i = 0; i < res.data.length; i++) {
  //     goods.push(res.data[i]);
  //   }
  //   this.setData({
  //     loadingMoreHidden: true,
  //     goods: goods,
  //   });
  // },
  // getCoupons: function() {
  //   var that = this;
  //   WXAPI.coupons().then(function (res) {
  //     if (res.code == 0) {
  //       that.setData({
  //         coupons: res.data
  //       });
  //     }
  //   })
  // },


 
  onShareAppMessage: function() {    
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + wx.getStorageSync('share_profile'),
      path: '/pages/dingyue/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },


  // getNotice: function() {
  //   var that = this;
  //   WXAPI.noticeList({pageSize: 5}).then(function (res) {
  //     if (res.code == 0) {
  //       that.setData({
  //         noticeList: res.data
  //       });
  //     }
  //   })
  // },
  // onReachBottom: function() {
  //   this.setData({
  //     curPage: this.data.curPage + 1
  //   });
  //   this.getGoodsList(this.data.activeCategoryId, true)
  // },
  // onPullDownRefresh: function() {
  //   this.setData({
  //     curPage: 1
  //   });
  //   this.getGoodsList(this.data.activeCategoryId)
  //   wx.stopPullDownRefresh()
  // },
  // 获取砍价商品
  // async kanjiaGoods(){
  //   const res = await WXAPI.goods({
  //     kanjia: true
  //   });
  //   if (res.code == 0) {
  //     const kanjiaGoodsIds = []
  //     res.data.forEach(ele => {
  //       kanjiaGoodsIds.push(ele.id)
  //     })
  //     const goodsKanjiaSetRes = await WXAPI.kanjiaSet(kanjiaGoodsIds.join())
  //     if (goodsKanjiaSetRes.code == 0) {
  //       res.data.forEach(ele => {
  //         const _process = goodsKanjiaSetRes.data.find(_set => {
  //           return _set.goodsId == ele.id
  //         })
  //         if (_process) {
  //           ele.process = 100 * _process.numberBuy / _process.number
  //           ele.process = ele.process.toFixed(0)
  //         }
  //       })
  //       this.setData({
  //         kanjiaList: res.data
  //       })
  //     }
  //   }
  // },
  // goCoupons: function (e) {
  //   wx.switchTab({
  //     url: "/pages/coupons/index"
  //   })
  // },
  // pingtuanGoods(){ // 获取团购商品列表
  //   const _this = this
  //   WXAPI.goods({
  //     pingtuan: true
  //   }).then(res => {
  //     if (res.code === 0) {
  //       _this.setData({
  //         pingtuanList: res.data
  //       })
  //     }
  //   })
  // },
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



  // async adPosition() {
  //   let res = await WXAPI.adPosition('indexPop')
  //   if (res.code == 0) {
  //     this.setData({
  //       adPositionIndexPop: res.data
  //     })
  //   }
  //   res = await WXAPI.adPosition('index-live-pic')
  //   if (res.code == 0) {
  //     this.setData({
  //       adPositionIndexLivePic: res.data
  //     })
  //   }
  // },
  // clickAdPositionIndexLive() {
  //   if (!this.data.adPositionIndexLivePic || !this.data.adPositionIndexLivePic.url) {
  //     return
  //   }
  //   wx.navigateTo({
  //     url: this.data.adPositionIndexLivePic.url,
  //   })
  // },
  // closeAdPositionIndexPop() {
  //   this.setData({
  //     adPositionIndexPop: null
  //   })
  // },
  // clickAdPositionIndexPop() {
  //   const adPositionIndexPop = this.data.adPositionIndexPop
  //   this.setData({
  //     adPositionIndexPop: null
  //   })
  //   if (!adPositionIndexPop || !adPositionIndexPop.url) {
  //     return
  //   }
  //   wx.navigateTo({
  //     url: adPositionIndexPop.url,
  //   })
  // }
})