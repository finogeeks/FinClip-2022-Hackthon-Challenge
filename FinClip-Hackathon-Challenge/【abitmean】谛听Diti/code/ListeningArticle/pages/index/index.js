const app = getApp()
const dialog = require("../../utils/dialog")
const config = require("../../utils/config")
const api = require('../../utils/api.js')

Page({
  data: {
    inputValue: '',
    showMore: false,
    parseOK: false,
    inputFoucs: true
  },
  selfData: {
    inputValue: '',
    isUrl: true,
    openid: '',
    articleId: ''
  },
  onLoad: function (option) {
    console.log(option)
    const that = this
    const apiThat = api

    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+config.APPID+'&secret='+config.APPSecret+'&js_code='+res.code+'&grant_type=authorization_code',
            success (res) {
              console.log(res.data)
              that.selfData.openid = res.data.openid


              wx.getUserInfo({
                success: function(res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女

                  apiThat.login({
                    wxOpenId: that.selfData.openid,
                    nickName: nickName,
                    avatar: avatarUrl,
                    registerType: 0
                  }).then((resData) => {
                    console.log(resData)
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  searchInput: function (e) {
    this.selfData.inputValue = e.detail.value
    this.parseSearch()
  },
  isLink: function (t) {
    var e = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#*]*[\w\-\@?^=%&/~\+#*])?/;
    return new RegExp(e).test(t);
  },
  parseSearch: function () {
    if(this.isLink(this.selfData.inputValue)){
      this.setData.isUrl = true;
      api.parseUrl({url: this.selfData.inputValue}).then((res) => {
        console.log(res)
        this.setData({
          inputValue: res.data.title,
          parseOK: true,
          inputFocus: false
        })

        this.selfData.articleId = res.data.id
      })
    }else{
      this.selfData.isUrl = false;
    }
  },
  handleSearch: function () {
    wx.showLoading({
      title: '请稍候...',
    })
    if(this.selfData.isUrl){
      api.listenArticle({
        articleId: this.selfData.articleId
      }).then((resData) => {
        console.log(resData)
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/play/play',
          success: function(res) {
            res.eventChannel.emit('acceptPlayData', resData.data)
          }
        })
      }).catch(
        res => {
          wx.hideLoading()
          this.clearAll()
        }
      );
    }else{
      // todo listenText
      api.listenText({
        url: this.selfData.inputValue
      }).then((resData) => {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/play/play',
          success: function(res) {
            res.eventChannel.emit('acceptPlayData', resData.data)
          }
        })
      }).catch(
        res => {
          wx.hideLoading()
          this.clearAll()
        }
      );({
        url: this.selfData.inputValue
      }).then((resData) => {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/play/play',
          success: function(res) {
            res.eventChannel.emit('acceptPlayData', resData.data)
          }
        })
      }).catch(
        res => {
          wx.hideLoading()
          this.clearAll()
        }
      );({
        url: this.selfData.inputValue
      }).then((resData) => {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/play/play',
          success: function(res) {
            res.eventChannel.emit('acceptPlayData', resData.data)
          }
        })
      }).catch(
        res => {
          wx.hideLoading()
          this.clearAll()
        }
      );
    }

  },
  handleMore: function () {
    this.setData({
      showMore: true
    })
  },
  clearAll: function () {
    this.setData({
      inputValue: '',
      parseOK: false,
      inputFoucs: true
    })
    this.selfData.inputValue = ''
  }
})