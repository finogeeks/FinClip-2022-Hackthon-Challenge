const app = getApp()
const dialog = require("../../utils/dialog")
const config = require("../../utils/config")
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    inputValue: '',
    showMore: false,
    parseOK: false,
    inputFoucs: true,
    inputValue: '',
    isUrl: true,
    openid: '',
    articleId: ''
  },
  attached() {
    const that = this
    const apiThat = api

    apiThat.login({
      wxOpenId: 'finclip-' + util.uuid(),
      registerType: 0
    }).then((res) => {
      wx.setStorageSync('token', res.data.token);
    })

    // wx.login({
    //   success (res) {
    //     console.log('wx.login', res)
    //     if (res.code) {
    //       wx.request({
    //         url: config.API_BASE_URL  + '/api/user/getWxUser/' + res.code,
    //         method: 'GET',
    //         header: {
    //           Accept: "application/json",
    //           "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //         success (res) {
    //           res = res.data
    //           console.log(res)
    //           console.log('openid', res.data.openid)
    //           that.data.openid = res.data.openid
    //           apiThat.login({
    //             wxOpenId: that.data.openid,
    //             registerType: 0
    //           }).then((res) => {
    //             wx.setStorageSync('token', res.data.token);
    //           })
    //         }
    //       })
    //     } else {
    //       console.error('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  methods: {
    searchInput: function (e) {
      this.data.inputValue = e.detail.value
      this.parseSearch()
    },
    isLink: function (t) {
      var e = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#*]*[\w\-\@?^=%&/~\+#*])?/;
      return new RegExp(e).test(t);
    },
    parseSearch: function () {
      if(this.isLink(this.data.inputValue)){
        this.data.isUrl = true;
        api.parseUrl({url: this.data.inputValue}).then((res) => {
          this.setData({
            inputValue: res.data.title,
            parseOK: true,
            inputFocus: false
          })
  
          this.data.articleId = res.data.id
        })
      }else{
        this.data.isUrl = false;
      }
    },
    handleSearch: function () {
      const that = this
      if(that.data.isUrl) {
        wx.navigateTo({
          url: '/pages/play/play?articleId='+that.data.articleId
        })
      }else{
        const inputValue = that.data.inputValue
        wx.navigateTo({
          url: '/pages/play/play',
          success: function(res) {
            res.eventChannel.emit('playText', inputValue)
          }
        })
      }
      that.clearAll()
    },
    handleMore: function () {
      this.setData({
        showMore: true
      })
    },
    // 清空功能的触发
    clearAll: function () {
      this.setData({
        inputValue: '',
        parseOK: false,
        inputFoucs: true
      })
      this.data.inputValue = ''
    }
  }
})