const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data: {
    vtt:false,
    aisWhite:true,
    setTime:'',
    num:0,
    showpic:null,
    hidepic:null,
    bannercd:null,
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
    // 底部
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/nav/di-nav-150-200.png",
      selectedIconPath: "/images/nav/di-nav-150-200.png",
      text: "探索"
    },
    {
      pagePath: "/pages/dingyue/index",
      iconPath: "/images/nav/di-nav-150-200.png",
      selectedIconPath: "/images/nav/di-nav-150-200.png",
      text: "订阅"
    },
    {
      pagePath: "/pages/coupons/hy",
      iconPath: "/images/nav/di-nav-150-200.png",
      selectedIconPath: "/images/nav/di-nav-150-200.png",
      text: "会员"
    },
    {
      pagePath: "/pages/haowu/index",
      iconPath: "/images/nav/di-nav-150-200.png",
      selectedIconPath: "/images/nav/di-nav-150-200.png",
      text: "好物"
    },
    {
      pagePath: "/pages/my/index",
      iconPath: "/images/nav/di-nav-150-200.png",
      selectedIconPath: "/images/nav/di-nav-150-200.png",
      text: "我的"
    }]
  },

  switchTab(e) {
    const data = e.currentTarget.dataset
    const url = data.path
    wx.switchTab({url})
    this.setData({
      selected: data.index
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
  onUnload:function(){
    this.setData({
      setTime:undefined
    })
  },

  onHide:function(){ 
		let e = this;
		clearInterval(e.data.setTime);
	},
	/**
	** 生命周期函数--监听页面卸载，当切换页面和切换底部菜单栏时也会关闭定时器。
	*/
	onUnload:function(){ 
		let e = this;
		clearInterval(e.data.setTime);
	},


  onLoad: function(e) {
    const that = this
    var num=that.data.num;

    
    var animation= wx.createAnimation({}) //创建一个动画实例
    that.setData({
      //创建一个计时器
        setTime:setInterval(function(){
          // console.log(that.data.bannercd);
          that.setData({
            num:num++
            })
            if(num>that.data.bannercd){
              num=0;
            } 
            // console.log("ddddd",that.data.num);
            //淡入
            animation.opacity(1).step({
              duration:0
            }) //描述动画

            that.setData({
              showpic:animation.export()
            }) //输出动画
            
            //淡出
            animation.opacity(0).step({
              duration:0
            })
            that.setData({
              hidepic:animation.export()
            })


      },350)
    })

    // wx.showShareMenu({
    //   withShareTicket: true,
    // })
   
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
    this.initBanners()

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
    let aa = res1.data;
    let bannercd = aa.length;
    bannercd = bannercd-1
    this.setData({
      bannercd : bannercd
    })
    this.setData(_data)
  },



  onShow: function(e){
    
    // console.log("App.globalData.navHeight", APP.globalData.navHeight)
    // console.log("App.globalData.navTop", APP.globalData.navTop)
    // console.log("App.globalData.windowHeight", APP.globalData.windowHeight)
    this.setData({
      vtt:false,
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

    // var _this = this;
    // if (typeof _this.getTabBar === 'function' &&
    //   _this.getTabBar()) {
    //   _this.getTabBar().setData({
    //     selected: 0
    //   })
    // }
    this.lc1(1);

    
  },

  async cmsPage() {
    var that = this;
    const res = await WXAPI.cmsPage("250000")
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      that.setData({
        jdata:sj.sj[0],
        lc1a:sj.sj[0].lc1.zh,
        lc2a:sj.sj[0].lc2.zh,
        // lc3a:sj.sj[0].lc3.zh,
        lc4a:sj.sj[0].lc4.zh,
        lc5a:sj.sj[0].lc5.zh,
        lc6a:sj.sj[0].lc6.zh,
        lc7a:sj.sj[0].lc7.zh,
        lc1gd:sj.sj[0].lc1.db.link,
        lc2gd:sj.sj[0].lc2.db.link,
        lc4gd:sj.sj[0].lc4.db.link,
        lc5gd:sj.sj[0].lc5.db.link,
        lc6gd:sj.sj[0].lc6.db.link,
        lc7gd:sj.sj[0].lc7.db.link,
      })
      console.log("ccccc",that.data.jdata);
      // console.log("ccccccccccc",that.data.lc1a);

      // setTimeout(function(){that.lc1(2,that.data.jdata.lc2.db.link);},2000)
      // setTimeout(function(){that.lc1(4,that.data.jdata.lc4.db.link);},4000)
      // setTimeout(function(){that.lc1(5,that.data.jdata.lc5.db.link);},5000)
      // setTimeout(function(){that.lc1(6,that.data.jdata.lc2.db.link);},6000)
      // setTimeout(function(){that.lc1(7,that.data.jdata.lc2.db.link);},10000)

      that.lc1(2,that.data.jdata.lc2.db.link);
      that.lc1(4,that.data.jdata.lc4.db.link);
      that.lc1(5,that.data.jdata.lc5.db.link);
      that.lc1(6,that.data.jdata.lc6.db.link);
      that.lc1(7,that.data.jdata.lc7.db.link);

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

    if(tag_id =="头条"){
      wx.navigateTo({
        url: `/pages/index_more_news/index?id=1`,
      })
    }else{
      wx.navigateTo({
        url: `/pages/taglist/index?id=${tag_id}`,
      })
    }

  },

myy(){
  this.setData({
    vtt:true
  })
  setTimeout(function(){
    console.log("没有开通");
    wx.switchTab({
      url: '/pages/coupons/hy',
    });
  },2000)

},
  async toxiangqing(e){
    let vip = e.currentTarget.dataset.vip;
    const tag_id = e.currentTarget.dataset.id;
    
    let res = await WXAPI.userDetail(wx.getStorageSync('token'))
    console.log(res);
    wx.vibrateShort();

    if(vip==""){
      wx.navigateTo({
        url: `/pages/xiangqing/index?id=${tag_id}`,
      })
    }else{
     
        if(!res.data.userLevel){
        // 没有开通
          this.myy()

      }else{
        //判断等级
          if(res.data.userLevel.level>=vip){
            // 等级够了
            wx.navigateTo({
              url: `/pages/xiangqing/index?id=${tag_id}`,
            })
          }else{
            // 等级不够
            console.log("等级不够");
            this.myy()
          }
      }
    }
},

  zhankai(e){

    // const tag_id = e.currentTarget.dataset.id;

    // wx.navigateTo({
    //   url: `/pages/taglist/index?id=${tag_id}`,
    // })

    if(e.currentTarget.dataset.bh==1){
      this.setData({
        lc1: "",
        lc1gd:e.currentTarget.dataset.id,
      });
      let aa = this.data.lc1a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc1a: aa,
      });
      console.log("xxxx",this.data.lc1a);

    }
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
    if(e.currentTarget.dataset.bh==6){
      this.setData({
        lc6: "",
        lc6gd:e.currentTarget.dataset.id,
      });
      let aa = this.data.lc6a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc6a: aa
      });
    }
    if(e.currentTarget.dataset.bh==7){
      this.setData({
        lc7: "",
        lc7gd:e.currentTarget.dataset.id,
      });
      let aa = this.data.lc7a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc7a: aa
      });
    }
    
    if(e.currentTarget.dataset.nr){
      console.log("ddd",e.currentTarget.dataset.bh,e.currentTarget.dataset.nr);
      this.lc1(e.currentTarget.dataset.bh,e.currentTarget.dataset.nr);
    }else{
      console.log("ddd",e.currentTarget.dataset.bh,e.currentTarget.dataset.zht);
      this.lc1(e.currentTarget.dataset.bh,e.currentTarget.dataset.zht);
    }
    
  },

  async lc1(a,b) {
    console.log(a,b);
    if(b){

      
      var xx = await WXAPI.cmsArticles({
        keywordsLike:b,
        pageSize:this.data.pageSize
      })

      // var xx = await WXAPI.mlito_shuoyou_list("tags="+b+"&per_page=6")


      // var xx = await WXAPI.mlito_shuoyou_list("tags="+b)
      // console.log("dd2222",xx);
    }else{
      
      // 最新文章
      var xx = await WXAPI.cmsArticles({
        pageSize:this.data.pageSize
        
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

    var that = this;
     // 3.当页面滚动距离scrollTop > 菜单栏距离文档顶部的距离时，菜单栏固定定位
     if (e.scrollTop > 120) {
      that.setData({
        aisWhite: false
      })
    } else {
      that.setData({
        aisWhite: true
      })
    }

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
      path: '/pages/start/start?inviter_id=' + wx.getStorageSync('uid')
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
  jdbgg(){
    wx.navigateTo({
      url: '/pages/jdbgg/index',
    })
  },
  tovip(e) {
    let id = e.currentTarget.dataset.id
    console.log("sssssssssssss",id);
    wx.setStorageSync('vipid', id );

    wx.switchTab({
      url: '/pages/coupons/hy',
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