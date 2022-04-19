//app.js
App({
  require: function ($uri) { return require($uri) },
  onLaunch: function () {
    console.log('version:', this.globalData.version);


  },
  globalData: {
    version: "1.0.0"
  }
})