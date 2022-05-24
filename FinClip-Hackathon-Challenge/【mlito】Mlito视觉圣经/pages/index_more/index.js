const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data: {
    sjc:Date.parse(new Date()),
    scrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
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
    lc8:"",
    lc9:"",
    lc10:"",
    
    lc1a:"",
    lc2a:"",
    lc3a:"",
    lc4a:"",
    lc5a:"",
    lc6a:"",
    lc7a:"",
    lc8a:"",
    lc9a:"",
    lc10a:"",

    selected: 0,
    color: "rgb(107,107,107)",
    selectedColor: "#000",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/nav/Mayrti-lite-1-1.png",
      selectedIconPath: "/images/nav/Mayrti-lite-2-1.png",
      text: "探索"
    },
    {
      pagePath: "/pages/dingyue/index",
      iconPath: "/images/nav/Mayrti-lite-1-2.png",
      selectedIconPath: "/images/nav/Mayrti-lite-2-2.png",
      text: "订阅"
    },
    {
      pagePath: "/pages/coupons/hy",
      iconPath: "/images/nav/Mayrti-lite-1-3.png",
      selectedIconPath: "/images/nav/Mayrti-lite-2-3.png",
      text: "会员"
    },
    {
      pagePath: "/pages/haowu/index",
      iconPath: "/images/nav/Mayrti-lite-1-4.png",
      selectedIconPath: "/images/nav/Mayrti-lite-2-4.png",
      text: "好物"
    },
    {
      pagePath: "/pages/my/index",
      iconPath: "/images/nav/Mayrti-lite-1-5.png",
      selectedIconPath: "/images/nav/Mayrti-lite-2-5.png",
      text: "我的"
    }],
    datasj:wx.getStorage("index_sj"),
    ybt:false

  },

fanhui() {
  wx.navigateBack()
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
      console.log("没有开通");
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

      }


    }
    
  }


 
},




  switchTab(e) {
    const data = e.currentTarget.dataset
    const url = data.path
    wx.switchTab({url})
    this.setData({
      selected: data.index
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


  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },


  onLoad: function(e) {


    console.log("xxxx",this.data.datasj);
    const app = getApp()
    console.log("dddd",e.id);

    let isIphoneX = app.globalData.isIphoneX;
    // console.log("app.globalData",app.globalData);
    this.setData({
    isIphoneX: isIphoneX,
    lbbh:e.id
    })

    if(e.id ==1){
      this.setData({
        ybt:true
      })
    }

    this.initBanners("250101"+e.id);
    this.cmsPage("250101"+e.id);

    var that = this;
    wx.getStorage({
      key: 'index_sj',
      success (res) {
      
        that.setData({
          datasj:res.data
        })

      }
    })

  },

  async cmsPage(a) {
    var that = this;
    const res = await WXAPI.cmsPage(a)
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      that.setData({
        jdata:sj.sj[0],
        lc1a:sj.sj[0].lc1?sj.sj[0].lc1.zh:'',
        lc2a:sj.sj[0].lc2?sj.sj[0].lc2.zh:'',
        lc3a:sj.sj[0].lc3?sj.sj[0].lc3.zh:'',
        lc4a:sj.sj[0].lc4?sj.sj[0].lc4.zh:'',
        lc5a:sj.sj[0].lc5?sj.sj[0].lc5.zh:'',
        lc6a:sj.sj[0].lc6?sj.sj[0].lc6.zh:'',
        lc7a:sj.sj[0].lc7?sj.sj[0].lc7.zh:'',
        lc8a:sj.sj[0].lc8?sj.sj[0].lc8.zh:'',
        lc9a:sj.sj[0].lc9?sj.sj[0].lc9.zh:'',
        lc10a:sj.sj[0].lc10?sj.sj[0].lc10.zh:'',
      })
      console.log("ccccc",that.data.jdata);
      // console.log("ccccccccccc",that.data.lc1a);

      that.data.jdata.lc1?that.lc1(1,that.data.jdata.lc1.db.link):'';
      that.data.jdata.lc2?that.lc1(2,that.data.jdata.lc2.db.link):'';
      that.data.jdata.lc3?that.lc1(3,that.data.jdata.lc3.db.link):'';
      that.data.jdata.lc4?that.lc1(4,that.data.jdata.lc4.db.link):'';
      that.data.jdata.lc5?that.lc1(5,that.data.jdata.lc5.db.link):'';

      that.data.jdata.lc6?that.lc1(6,that.data.jdata.lc6.db.link):'';
      that.data.jdata.lc7?that.lc1(7,that.data.jdata.lc7.db.link):'';
      that.data.jdata.lc8?that.lc1(8,that.data.jdata.lc8.db.link):'';
      that.data.jdata.lc9?that.lc1(9,that.data.jdata.lc9.db.link):'';
      that.data.jdata.lc10?that.lc1(10,that.data.jdata.lc10.db.link):'';
    }

  },

  async lc1(a,b) {
    console.log(a,b);
    if(b){
      var xx = await WXAPI.cmsArticles({
        keywordsLike:b,
        pageSize:20
      })

      // console.log("dd2222",xx);
    }else{
      // 最新文章
      var xx = await WXAPI.cmsArticles({
        pageSize:20
      })
      // console.log("dd",xx);
    }
    let cc = [];
    if(xx.code==0){
      cc = xx.data.result
    }
    
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
    if(a==8){
      this.setData({
        lc8: cc
      });
    }
    if(a==9){
      this.setData({
        lc9: cc
      });
    }
    if(a==10){
      this.setData({
        lc10: cc
      });
    }
    // console.log("dddddd",this.lc1);
  },

  
  zhankai(e){

    if(e.currentTarget.dataset.bh==1){
      this.setData({
        lc1: ""
      });
      let aa = this.data.lc1a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc1a: aa
      });
      console.log("xxxx",this.data.lc1a);

    }
    if(e.currentTarget.dataset.bh==2){
      this.setData({
        lc2: ""
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
        lc3: ""
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
        lc4: ""
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
        lc5: ""
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
        lc6: ""
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
        lc7: ""
      });
      let aa = this.data.lc7a;

      aa.zht = e.currentTarget.dataset.zht
      aa.zhf = e.currentTarget.dataset.zhf
      aa.zh = e.currentTarget.dataset.zh
  
      this.setData({
        lc7a: aa
      });
    }
    this.lc1(e.currentTarget.dataset.bh,e.currentTarget.dataset.id);
  },




  async initBanners(a){
    console.log("ssssss",a);
    const _data = {}
    // 读取头部轮播图
    const res1 = await WXAPI.banners({
      type: a
    })
    if (res1.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加 banner 轮播图片，自定义类型填写'+a,
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

    
  },

  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
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