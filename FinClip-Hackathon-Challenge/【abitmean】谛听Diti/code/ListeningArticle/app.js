//app.js
App({
  require: function ($uri) { return require($uri) },
  onLaunch: function () {
    console.log('version:', this.globalData.version);
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

  },
  globalData: {
    version: "1.0.0"
  }
})