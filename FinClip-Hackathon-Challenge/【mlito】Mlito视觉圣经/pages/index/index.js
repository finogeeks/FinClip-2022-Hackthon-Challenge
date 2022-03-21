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
    imgUrls2: [
      {
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-1.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-1.svg',
        wz:["话题","家居","设计","时尚","摄影","绘画","艺术","乐活","玩物","城市","文化","专题","展览","策划","视频","人物","事件","行业","趋势","其他"],
        fwz:["地图","指南","头条","发现","宇宙"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-2.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-2.svg',
        wz:["杂志","别致","灵感","家居","平面","工业","交互","建筑","乐活","城市","时尚","潮流","玩物","出行","艺术","摄影","绘画","书法","文化","历史"],
        fwz:["指南","头条","发现","宇宙","生态"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-3.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-3.svg',
        wz:["空间","全球","国家","城市","建筑","景胜","遗址","地理","自然","时间","物质","生物","动物","植物","微生物","探索","未知","世界","神话","太空"],
        fwz:["头条","发现","宇宙","生态","星球"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-4.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-4.svg',
        wz:["生态体","话题","百科","策划","专题","生态","广场","家居","设计","时尚","潮流","摄影","玩物","出行","乐活","绘画","艺术","城市","文化","历史"],
        fwz:["发现","宇宙","生态","星球","宝藏"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-5.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-5.svg',
        wz:["广场","品牌","公司","机构","组织","协会","人物","名人","设计师","艺术家","画家","书法家","文人","时尚人","明星","模特","达人","网红","找创造","招聘"],
        fwz:["宇宙","生态","星球","宝藏","好物"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-6.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-6.svg',
        wz:["图书","知识","软件","规范","工具","配色","中国","日本","搭配","渐变","尺寸","城市","文化","工业","摄影","素材","壁纸","品牌","艺术","绘画"],
        fwz:["生态","星球","宝藏","好物","会员"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-7.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-7.svg',
        wz:["精选","分类","品牌","家居","设计","时尚","摄影","绘画","艺术","乐活","玩物","女装","男装","儿童","美妆","珠宝","饰品","数码","家电","宠物"],
        fwz:["星球","宝藏","好物","会员","地图"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-8.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-8.svg',
        wz:["开通","提升版","个人版","品牌","机构","特权","阅读","下载","专属","稀有","收藏","-","-","-","-","-","-","-","-","-"],
        fwz:["宝藏","好物","会员","地图","指南"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-9.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-9.svg',
        wz:["头条","发现","宇宙","生态","星球","宝藏","好物","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间"],
        fwz:["好物","会员","地图","指南","头条"],
      },
{
        tp1:'https://www.mlito.com/wp-content/uploads/lite-tansuo-logo-10.svg',
        tp2:'https://www.mlito.com/wp-content/uploads/lite-tansuo-ad-10.svg',
        wz:["空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间","空间"],
        fwz:["会员","地图","指南","头条","发现"],
      },
      ],
      swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
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
                clientHeight: res.windowHeight - APP.globalData.bnavHeight
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
    const res = await WXAPI.cmsPage("250101")
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      this.setData({
        imgUrls:sj.sj
      })
      console.log(this.data.imgUrls);
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
    wx.navigateTo({
      url: `/pages/taglist/index?id=${tag_id}`,
    });
    
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