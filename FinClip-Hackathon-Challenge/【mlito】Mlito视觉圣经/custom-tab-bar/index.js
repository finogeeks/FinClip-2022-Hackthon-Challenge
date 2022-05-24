Component({
  data: {
    sjc:Date.parse(new Date()),
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
    }]

    // list: [{
    //   pagePath: "/pages/index/index",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "探索"
    // },
    // {
    //   pagePath: "/pages/category/category",
    //   iconPath: "/images/nav/di-nav-150-200.png",
    //   selectedIconPath: "/images/nav/di-nav-150-200.png",
    //   text: "订阅"
    // },
    // {
    //   pagePath: "/pages/coupons/index",
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
  attached() {
  },

  lifetimes: {
    attached: function(options) {
      // 在组件实例进入页面节点树时执行
      const app = getApp()

    let isIphoneX = app.globalData.isIphoneX;
    // console.log("app.globalData",app.globalData);
    this.setData({
    isIphoneX: isIphoneX
    })

    }
  },


  methods: {
    switchTab(e) {
      wx.vibrateShort();
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
  
})