// navbar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navHeight: {
      type: Number,
      value: 20
    },
    navTitleTop: {
      type: Number,
      value: 26
    },
    navTitle: { // 导航标题 可以为空
      type: String,
      value: ''
    },
    navTitleColor: { // 导航标题颜色 默认黑色
      type: String,
      value: '#000'
    },
    isWhite: { // 是否为白底
      type: String,
      value: 'false'
    },
    noArrow: { // 取消返回箭头
      type: String,
      value: 'false'
    },
    isArrowWhite: {//白色箭头
      type: String,
      value: 'false'
    },
    isNavHome: { // 返回首页
      type: String,
      value: 'false'
    },
    navColor: { // 导航栏背景色 默认白色
      type: String
    },
    backPath: { // 返回页面路径
      type: String,
      default: ''
    },
    backDelta: { // 返回页面层数
      type: Number,
      default: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sjc:Date.parse(new Date()),
    navHeight: 0,
    navTitleTop: 0
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    // 获取顶部导航高度
    this.setData({
      navHeight: app.globalData.navHeight,
      navTitleTop: app.globalData.navTitleTop
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    shouye:function(){
      wx.vibrateShort(); 
      wx.redirectTo({
        url: '/pages/start/start'
      })
    },
    search:function(){
      wx.vibrateShort(); 
      wx.navigateTo({
        url: '/pages/so/index'
      })
    },
    nav:function(){
      wx.vibrateShort(); 
      wx.navigateTo({
        url: '/pages/xl/index'
      })
    },

    // 回到首页
    navHome:function(){
      wx.vibrateShort();
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    // 回到顶部
    toTop: function () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
      this.triggerEvent('scrollEvent', {}) // 可绑定点击标题栏时的事件
    },
    // 返回上一页
    navBack: function () {
      wx.vibrateShort(); 
      if (this.properties.backPath === '') {
        wx.navigateBack({
          delta: this.properties.backDelta
        })
      } else {
        wx.redirectTo({
          url: this.properties.backPath
        })
      }
      this.triggerEvent('backEvent', {}) // 可绑定点击返回时的事件
    }
  }
})