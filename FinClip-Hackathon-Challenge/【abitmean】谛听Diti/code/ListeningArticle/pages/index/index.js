Page({
  data: {
    PageCur: 'search'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad: function (options) {
    if(options.PageCur){
      this.setData({
        PageCur: options.PageCur
      })
    }
  }
})