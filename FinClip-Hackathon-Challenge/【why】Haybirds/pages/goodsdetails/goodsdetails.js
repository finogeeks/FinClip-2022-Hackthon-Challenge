const WXAPI = require('../../wxapi/main')
const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
const CONFIG = require('../../config.js')
// const AUTH = require('../../utils/auth')
const SelectSizePrefix = "选择："

let videoAd = null; // 视频激励广告


Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: false,
    selectSize: SelectSizePrefix,
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,

    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    currentPages: undefined,


    openShare: false,
    ptsp5id: 1061559, //5人团商品id
    ptsp8id: 1061562,//8人团商品id
    pt5id: 3792, //5人团商品id
    pt8id: 3793,//8人团商品id

    pingtuanSet: "", //拼团时间
    
    ctspid : "", //参团商品id
    ctptid : "", //参团id
    ctid : "", //成团id

    kt: true, //是否开团
    ct: false, //是否参团
    mian: false, //是否满员
    xq: false, //查看详情

  },

  //事件处理函数
  swiperchange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },



  onLoad(e) {
    const that = this;

    if (JSON.stringify(e) != "{}") {
      console.log(e);
   
      const scene = decodeURIComponent(e.scene) // 处理扫码进商品详情页面的逻辑


      if (scene != "undefined") {
        console.log("scene:",scene);
        e.ctspid = scene.split(',')[0]
        e.ctptid = scene.split(',')[1]
        e.ctid = scene.split(',')[2]
      }


      that.data.ctspid = e.ctspid;
      that.data.ctptid = e.ctptid;
      that.data.ctid = e.ctid;

      that.setData({
        kt:e.kt,
        ct:e.ct,
        xq:e.xq
      });

    if (that.data.ctid) {
      
      WXAPI.tuanInfo(that.data.ctid,wx.getStorageSync('token')).then(function(res) {
        if (res.code == 0) {
          console.info("拼团信息:", res.data);

           that.setData({
            pingtuanList: res.data
           });


          //进行中
          if(res.data.tuanInfo.status == 0){
            that.cxsfzai();
          }

          //无效 过时
          if(res.data.tuanInfo.status == 1){
            
            that.setData({
              pingtuanList: "",
              kt:true,
              ct:false,
              xq:false,
              mian:false
            });
          }

          //完成 满员
          if(res.data.tuanInfo.status == 2){
            that.setData({
              kt:false,
              ct:false,
              xq:false,
              mian:true
            });
            that.cxsfzai();
          }
          
        }

      })


      
    } 
    }

    

    that.data.goodsId = that.data.ptsp5id
    
  },

  onShow (){
    this.getGoodsDetail(this.data.goodsId)
  },

  //查看是否在里面
  cxsfzai(){
    var that = this;
    WXAPI.myjoinlist(that.data.ctid,wx.getStorageSync('token')).then(function(res) {
      console.info("是否在里面:", res.code);
      if (res.code != 0) {
        that.setData({
          kt:false,
          ct:true,
          xq:false,
          mian:false
        });
      }else{
        that.setData({
          kt:false,
          ct:false,
          xq:true,
          mian:false
        });
      }

    })
  },

   getGoodsDetail(goodsId) {

    const that = this;
    WXAPI.goodsDetail(goodsId).then(function(goodsDetailRes) {
      

      if (goodsDetailRes.code == 0) {
      
        var selectSizeTemp = SelectSizePrefix;
        if (goodsDetailRes.data.properties) {
          for (var i = 0; i < goodsDetailRes.data.properties.length; i++) {
            selectSizeTemp = selectSizeTemp + " " + goodsDetailRes.data.properties[i].name;
          }
          that.setData({
            hasMoreSelect: true,
            selectSize: selectSizeTemp,
            selectSizePrice: goodsDetailRes.data.basicInfo.minPrice,
            totalScoreToPay: goodsDetailRes.data.basicInfo.minScore
          });
        }
        // if (goodsDetailRes.data.basicInfo.pingtuan) {
        //   that.pingtuanList(goodsId)
        // }
        that.data.goodsDetail = goodsDetailRes.data;
  
        let _data = {
          goodsDetail: goodsDetailRes.data,
          selectSizePrice: goodsDetailRes.data.basicInfo.minPrice,
          totalScoreToPay: goodsDetailRes.data.basicInfo.minScore,
          buyNumMax: goodsDetailRes.data.basicInfo.stores,
          buyNumber: (goodsDetailRes.data.basicInfo.stores > 0) ? 1 : 0,
          currentPages: getCurrentPages()
        }

        if (goodsDetailRes.data.basicInfo.pingtuan) {


          WXAPI.pingtuanSet(goodsId).then(function(pingtuanSetRes) {
            if (pingtuanSetRes.code == 0) {
             that.setData({
              pingtuanSet: pingtuanSetRes.data
             })
              
              _data.pingtuanSet = pingtuanSetRes.data
            } 
          })

        }
        that.setData(_data);
        console.log("_data:",_data);
        WxParse.wxParse('article', 'html', goodsDetailRes.data.content, that, 5);
      }

    })
  },

  
// 去拼团
  toPingtuan: function(e) {

    let spid = e.currentTarget.dataset.spid
    let ptid = e.currentTarget.dataset.ptid
    let ctid = this.data.ctid
    console.log(spid,ptid);
    
    wx.navigateTo({
      url: "/pages/pt2/pt?spid=" + spid + "&ptid=" + ptid+ "&ctid=" + ctid
    })

  },


  // 点击分享
  onShareAppMessage: function() {

    console.log('/pages/goods-details/index?ctspid=' +  this.data.goodsId + '&ctptid=' +  this.data.ctptid + '&ctid=' +  this.data.ctid);

    let _data = {
      title: this.data.goodsDetail.basicInfo.characteristic,
      path: '/pages/goods-details/index?ctspid=' +  this.data.goodsId + '&ctptid=' +  this.data.ctptid + '&ctid=' +  this.data.ctid,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
    return _data
  },



  pingtuanList: function(goodsId) {
    var that = this;
    WXAPI.pingtuanList(goodsId).then(function(res) {
      if (res.code == 0) {
        console.log(res.data);
        
        that.setData({
          pingtuanList: res.data
        });
      }
    })
  },

  chongxin: function(){
    this.setData({
      mian: false,
      kt: true,
      ctspid : "", //参团商品id
      ctptid : "", //参团id
      ctid : ""//成团id
    })
  },


  openShareDiv () {
    this.setData({
      openShare: true
    })
  },
  closeShareDiv() {
    this.setData({
      openShare: false
    })
  },






  //生成海报界面
  toPoster: function (e) {
    wx.navigateTo({
      url: "/pages/goods-details/poster?ctspid=" + this.data.goodsId + '&ctptid=' +  this.data.ctptid + '&ctid=' +  this.data.ctid,
    })
  }


})