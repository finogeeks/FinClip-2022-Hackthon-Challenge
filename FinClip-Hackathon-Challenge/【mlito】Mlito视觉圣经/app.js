const WXAPI = require('apifm-wxapi')
const CONFIG = require('config.js')
const AUTH = require('utils/auth')
App({
  onLaunch: function() {
    // 获取屏幕参数
    try {
      const res = wx.getSystemInfoSync()
      if (res.platform == 'ios') {
        this.globalData.platform = 'ios'
      } else if (res.platform == 'android') {
        this.globalData.platform = 'android'
      }
      // 导航高度
      let navHeight = res.statusBarHeight 
      // 屏幕宽度/高度，单位px
      this.globalData.screenWidth = res.screenWidth
      this.globalData.screenHeight = res.screenHeight
      // 状态栏的高度，单位px
      this.globalData.statusBarHeight = res.statusBarHeight
      // 设备像素比
      this.globalData.pixelRatio = res.pixelRatio
      // 可使用窗口宽度，单位px
      this.globalData.winWidth = res.windowWidth
      // 安卓时，胶囊距离状态栏8px，iOS距离4px
      if (res.system.indexOf('Android') !== -1) {
        this.globalData.navHeight = navHeight + 14 + 32
        this.globalData.navTitleTop = navHeight + 8
        // 视窗高度 顶部有占位栏时
        this.globalData.winHeight = res.screenHeight - navHeight - 14 - 32
        // tab主页视窗高度
        this.globalData.winHeightTab = res.windowHeight - navHeight - 14 - 32
      } else {
        this.globalData.navHeight = navHeight + 12 + 32
        this.globalData.navTitleTop = navHeight + 4
        // 视窗高度 顶部有占位栏时
        this.globalData.winHeight = res.screenHeight - navHeight - 12 - 32
        // tab主页视窗高度
        this.globalData.winHeightTab = res.windowHeight - navHeight - 12 - 32
      }
      // console.log(wx.getSystemInfoSync(), this.globalData.winHeightTab)
    } catch (e) {
      console.log(e)
    }


    const subDomain = wx.getExtConfigSync().subDomain
    if (subDomain) {
      WXAPI.init(subDomain)
    } else {
      WXAPI.init(CONFIG.subDomain)
      WXAPI.setMerchantId(CONFIG.merchantId)
    }
    
    const that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    })
    WXAPI.queryConfigBatch('mallName,WITHDRAW_MIN,ALLOW_SELF_COLLECTION,order_hx_uids,subscribe_ids,share_profile,adminUserIds,goodsDetailSkuShowType,shopMod,needIdCheck,balance_pay_pwd,shipping_address_gps,shipping_address_region_level,shopping_cart_vop_open,cps_open,recycle_open,categoryMod,hide_reputation,show_seller_number,show_goods_echarts,show_buy_dynamic,goods_search_show_type,show_3_seller,show_quan_exchange_score,show_score_exchange_growth,show_score_sign,fx_subscribe_ids,share_pic,orderPeriod_open,order_pay_user_balance,wxpay_api_url').then(res => {
      if (res.code == 0) {
        res.data.forEach(config => {
          wx.setStorageSync(config.key, config.value);
        })
        if (this.configLoadOK) {
          this.configLoadOK()
        }
      }
    })
    // ---------------检测navbar高度
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    // console.log("小程序胶囊信息",menuButtonObject)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
      
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离

      
          navHeight = "",
          bnavHeight = "";

          let modelmes = res.model;
      
          // console.log("dddd1",this.globalData.navHeight);
          // console.log("dddd2",this.globalData.navTitleTop);
          // console.log("ddd3",menuButtonObject.height);
          // console.log("ccc",menuButtonObject);
          // console.log("xxxx",modelmes);
          if(modelmes.search('iPhone 12/13 Pro Max') >= 0  || modelmes.search('iPhone XS Max') >= 0  || modelmes.search('iPhone XR') >= 0  || modelmes.search('iPhone 6/7/8') >= 0 ){
            // console.log(11111111);
            navHeight = statusBarHeight + menuButtonObject.height + menuButtonObject.height +30+ (menuButtonObject.top - statusBarHeight)*2;//导航高度
            bnavHeight = statusBarHeight + menuButtonObject.height + 10+ (menuButtonObject.top - statusBarHeight)*2;//导航高度
          }

          else if (modelmes.search('iPhone 5') >= 0) {
            // console.log(6666);
            navHeight = statusBarHeight + menuButtonObject.height + statusBarHeight +30+ (menuButtonObject.top - statusBarHeight)*2;//导航高度
            bnavHeight = statusBarHeight + menuButtonObject.height +3 +(menuButtonObject.top - statusBarHeight)*2;//导航高度
          }
          
          else if (modelmes.search('iPhone 12/13 Pro Max') >= 0 || modelmes.search('iPhone XS Max') >= 0  || modelmes.search('iPhone XR') >= 0 || modelmes.search('iPhone X') >= 0  || modelmes.search('iPhone 11') >= 0 || modelmes.search('iPhone 11 Pro Max') >= 0 || modelmes.search('iPhone 12') >= 0) {
            // console.log(22222);
            navHeight = statusBarHeight + menuButtonObject.height + statusBarHeight + 10+ (menuButtonObject.top - statusBarHeight)*2;//导航高度
            bnavHeight = statusBarHeight + menuButtonObject.height + 5 +(menuButtonObject.top - statusBarHeight)*2;//导航高度
          }
         
          else{
            // console.log(5555);

            navHeight = statusBarHeight + menuButtonObject.height + menuButtonObject.height + 30+ (menuButtonObject.top - statusBarHeight)*2;//导航高度
            bnavHeight = statusBarHeight + menuButtonObject.height + 8+(menuButtonObject.top - statusBarHeight)*2;//导航高度

          }
          
        this.globalData.bnavHeight = bnavHeight;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuButtonObject = menuButtonObject;

      },
      fail(err) {
        console.log(err);
      }
    })
  },

  onShow (e) {
    // 保存邀请人
    if (e && e.query && e.query.inviter_id) {
      wx.setStorageSync('referrer', e.query.inviter_id)
      if (e.shareTicket) {
        wx.getShareInfo({
          shareTicket: e.shareTicket,
          success: res => {
            wx.login({
              success(loginRes) {
                if (loginRes.code) {
                  WXAPI.shareGroupGetScore(
                    loginRes.code,
                    e.query.inviter_id,
                    res.encryptedData,
                    res.iv
                  ).then(_res => {
                    console.log(_res)
                  }).catch(err => {
                    console.error(err)
                  })
                } else {
                  console.error('登录失败！' + loginRes.errMsg)
                }
              }
            })
          }
        })
      }
    }
    // 自动登录
    AUTH.checkHasLogined().then(isLogined => {
      if (!isLogined) {
        AUTH.authorize().then( aaa => {
          AUTH.bindSeller()
        })
      } else {
        AUTH.bindSeller()
      }
    })
 


  
      let  that = this;
      wx.getSystemInfo({
              success:  res=>{

                let modelmes = res.model;
                if (modelmes.search('iPhone X') != -1  || modelmes.search('iPhone 11') != -1 || modelmes.search('iPhone 11 Pro Max') != -1 || modelmes.search('iPhone 12') != -1) {

                  that.globalData.isIphoneX = true
                }
         
              }
      })
},

  globalData: {
    isConnected: true,
    sdkAppID: CONFIG.sdkAppID,
    isIphoneX: false,
    tab:0,

    platform: 'ios',
    pixelRatio: 2,
    statusBarHeight: 20,
    navHeight: 64,
    navTitleTop: 26,
    winHeight: 655,
    winWidth: 750,
    screenWidth: 375,
    screenHeight: 812
  }
})