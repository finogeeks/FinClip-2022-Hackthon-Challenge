const WXAPI = require('apifm-wxapi')


const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')
import Poster from 'wxa-plugin-canvas/poster/poster'
const APP = getApp()

Page({
  data: {
    sjc:Date.parse(new Date()),
    topNum: 100,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
    xx:"",
    lcsj:"",
    xgcp:"",
    info:""
  },


  toliebiao(e){
    wx.vibrateShort();
    const tag_id = e.currentTarget.dataset.id;
    if(tag_id.indexOf("http")==0){
      wx.navigateTo({
        url: `/pages/h5/index?id=${tag_id}`,
      })
    }else{
      wx.navigateTo({
        url: `/pages/taglist/index?id=${tag_id}`,
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

  onLoad: function(e) {
    console.log("onLoad:",e);
    // 加载
    if(e.id){
      console.log("id:",e.id);
      this.setData({
        wzid:e.id
      })
    }





    const that = this;

    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene) // 处理扫码进商品详情页面的逻辑
      
        e.id = scene.split(',')[0]
        let efxz = scene.split(',')[1]
        console.log("efxz",e.id,efxz);

        that.setData({
          wzid:e.id,
          fxz:efxz,
        })
 
    }


    // that.initBanners()

    that.adPosition2(e.id);

  },

       toshangping(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/pages/goods-details/index?id=${id}`,
        })

      },

  toxiangqing(e){
    wx.vibrateShort();
    let tag_id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: `/pages/xiangqing/index?id=${tag_id}`,
    })
  },
  
  jdbgg(){
    wx.navigateTo({
      url: '/pages/jdbgg/index',
    })
  },


  async adPosition2(a) {
    let res = await WXAPI.cmsArticleDetailV2(a);
    // let keywords = res.data.info.keywords;
    
    let keywords = res.data.info.tags;
    keywords = keywords.split("、");

    let info = res.data.info.content;
    info = info.replace(/\<img/g, "<img style='max-width: 100%;width:auto;height:auto;margin:10px 0;float:left;display:block '")
    

    this.setData({
      xx:res.data,
      info:info,
      keywords:keywords,
      tbtag:keywords[0]
    })

 
 
    console.log("xx",this.data.xx);
    if(this.data.xx.extJson["自定义广告ID"]){
      this.ad(this.data.xx.extJson["自定义广告ID"]);
    }else{
      this.ad("默认广告不要删除");
    }

    this.tag(this.data.tbtag);
    this.lc1(keywords[0]);

    

  },

  async ad(a) {
    console.log(a);

    let res = await WXAPI.cmsPage(a)
    
    this.setData({
      ad:res.data.extJson,
    })
    console.log("ad",this.data.ad);
  },

  async tag(a) {

    let res = await WXAPI.cmsPage(a)

    if(res.data){
      this.setData({
        topbj:res.data.extJson.topimg,
        tagid:a,
      })
      console.log("tag",this.data.xx);
    }
   
  },

  async lc1(a) {
    let res = await WXAPI.cmsArticles({
      keywordsLike:a,
      pageSize:20
    })

      if(res.data.result){
        this.setData({
          lcsj:res.data.result,
        })
        console.log("lcsj",this.data.lcsj);
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

  // async toxiangqing(e){


    
  //   wx.vibrateShort();

  //   const tag_id = e.currentTarget.dataset.ids;

  //   wx.navigateTo({
  //     url: `/pages/xiangqing/index?id=${tag_id}`,
  //   })

  // },

 




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
      // title: '"' + wx.getStorageSync('mallName') + '" ' + wx.getStorageSync('share_profile'),
      // wx.getStorageSync('uid')
      path: '/pages/xiangqing/index?id=' + this.data.wzid
    }
  },













  closePop() {
    this.setData({
      posterShow: false
    })
  },
  async drawSharePic() {
    const _this = this
    console.log("_this.data.xx.info.id",_this.data.xx.info.id + ',' + wx.getStorageSync('uid'));
    const qrcodeRes = await WXAPI.wxaQrcode({
      scene: _this.data.xx.info.id + ',' + wx.getStorageSync('uid'),
      page: 'pages/xiangqing/index',
      is_hyaline: true,
      autoColor: true,
      expireHours: 1
    })
    if (qrcodeRes.code != 0) {
      wx.showToast({
        title: qrcodeRes.msg,
        icon: 'none'
      })
      return
    }
    console.log("qrcodeRes",qrcodeRes);
    const qrcode = qrcodeRes.data
    const pic = _this.data.xx.info.pic
    wx.getImageInfo({
      src: pic,
      success(res) {
        const height = 490 * res.height / res.width
        _this.drawSharePicDone(height, qrcode)
      },
      fail(e) {
        console.error(e)
      }
    })
  },
  drawSharePicDone(picHeight, qrcode) {
    console.log("picHeight, qrcode",picHeight, qrcode);
    const _this = this
    const _baseHeight = 74 + (picHeight + 120)
    this.setData({
      posterConfig: {
        width: 750,
        height: picHeight + 660,
        backgroundColor: '#fff',
        debug: false,
        blocks: [{
          x: 76,
          y: 74,
          width: 604,
          height: picHeight + 120,
          borderWidth: 2,
          borderColor: '#c2aa85',
          borderRadius: 8
        }],
        images: [{
            x: 133,
            y: 133,
            url: _this.data.xx.info.pic, // 商品图片
            width: 490,
            height: picHeight
          },
          {
            x: 76,
            y: _baseHeight + 199,
            url: qrcode, // 二维码
            width: 222,
            height: 222
          }
        ],
        texts: [{
            x: 375,
            y: _baseHeight + 80,
            width: 650,
            lineNum: 2,
            text: _this.data.xx.info.title,
            textAlign: 'center',
            fontSize: 40,
            color: '#333'
          },
          // {
          //   x: 375,
          //   y: _baseHeight + 180,
          //   text: '￥' + _this.data.goodsDetail.basicInfo.minPrice,
          //   textAlign: 'center',
          //   fontSize: 50,
          //   color: '#e64340'
          // },
          {
            x: 352,
            y: _baseHeight + 320,
            text: '长按识别小程序码',
            fontSize: 28,
            color: '#999'
          }
        ],
      }
    }, () => {
      Poster.create();
    });
  },
  onPosterSuccess(e) {
    console.log('success:', e)
    this.setData({
      posterImg: e.detail,
      showposterImg: true
    })
  },
  onPosterFail(e) {
    console.error('fail:', e)
  },
  savePosterPic() {
    const _this = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImg,
      success: (res) => {
        wx.showModal({
          content: '已保存到手机相册',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#333'
        })
      },
      complete: () => {
        _this.setData({
          showposterImg: false
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },



})