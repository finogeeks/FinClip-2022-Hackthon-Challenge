const app = getApp()
const api = require('../../utils/api.js')
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },
  attached() {
    const that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    api.discovery({
    }).then((res) => {
      that.setData({
        list: res.data,
        listCur: res.data[0]
      })
      wx.hideLoading()
    })
    // let list = [{}];
    // for (let i = 0; i < 10; i++) {
    //   list[i] = {};
    //   list[i].date = '日期'+String.fromCharCode(65 + i);
    //   list[i].id = i
    //   var alist = []
    //   var a = {}
    //   for (let j = 0; j < 8; j++) {
    //     a.id = j
    //     a.author = '莫甘娜莫甘娜莫甘娜莫甘娜莫甘娜莫甘娜'
    //     a.cover = 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'
    //     a.title = '凯尔，你被自己的光芒变的盲目！凯尔，你被自己的光芒变的盲目！'
    //     alist[j] = a
    //   }
    //   list[i].alist = alist
    // }
    // console.log(list)
  },
  methods: {
    tabSelect(e) {
      console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    goToPlay(e) {
      wx.navigateTo({
        url: '/pages/play/play?articleId='+e.currentTarget.dataset.id
      })
    },
    VerticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().select("#main-" + i);
          view.fields({
            size: true
          }, data => {
            console.log('view', data)
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;     
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  }
})