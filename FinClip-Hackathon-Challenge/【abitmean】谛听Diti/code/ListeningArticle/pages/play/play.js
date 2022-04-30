const app = getApp()
const dialog = require("../../utils/dialog")
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const downloadfile = require('../../utils/downloadfile.js');
const config = require('../../utils/config.js');

Page({
  data: {
    isPlay: false,
    currentIndex: false,
    sliderValue: 0,
    isCollect: false,
    currentTime: '',
    durationTime: '',
    duration: 0,
    playData: {},
    voiceLanguages: [
      {key:'zh-CN',name:'中国内地'}, 
      // {key:"zh-HK",name:"中国香港"}, 
      // {key:"zh-TW",name:"中国台湾"}
    ],
    voiceNames: [
      {key: 'zh-CN-XiaochenNeural',name:'普通话-女1'}, 
      {key: 'zh-CN-XiaohanNeural',name:'普通话-女2'}, 
      {key: 'zh-CN-YunxiNeural',name:'普通话-男1'}, 
      {key: 'zh-CN-YunyangNeural',name:'普通话-男2'}
    ],
    showSetting: false
  },
  selfData: {
    audioManager: null,
    webSocketTask: null
  },
  onLoad: function (option) {
    const that = this
    let data = {}

    wx.showLoading({
      title: '请稍候...',
    })
      // option.articleId = '626b4253e4b043cf166c81cf'
    // if (that.getOpenerEventChannel() && !util.isEmpty(that.getOpenerEventChannel())) {
    // todo 更好的选择判断
    if(option.articleId) {
      api.listenArticle({
        articleId: option.articleId
      }).then((resData) => {
        data = resData.data
        // 设置 初始化数据
        that.setData({
          playData: data
        })
        that.initAudioManager(data)
        // 设置ws
        that.initWebSocket()

        // todo 调整api接口 获取文章收藏状态
        api.collectGet({
          articleId: data.id,
          userId: data.userId
        }).then((res) => {
          that.setData({
            isCollect: res.data? true:false
          })
        })

        wx.hideLoading()
      });
    } else {
      that.getOpenerEventChannel().on('playText', function (res) {
        console.log('playText', res)
        api.listenText({
          text: res
        }).then((resData) => {
          data.content = res
          data.title = res.substring(0,10)
          data.author = '谛听Diti'
          data.audioKey = resData.data
          data.cover = '../../images/diti-logo.png'
          data.pulishTime = util.getNowDate()
          // 设置 初始化数据
          that.setData({
            playData: data
          })
          that.initAudioManager(data)
          // 设置ws
          // that.initWebSocket()
          wx.hideLoading()
        });
      })
    }
  },
  onUnload: function () {},
  // 初始化设置websocket
  initWebSocket: function() {
    const that = this
    that.selfData.webSocketTask = wx.connectSocket({
      url: config.WS_BASE_URL + that.data.playData.id
    });
    that.selfData.webSocketTask.onOpen((res) => {
      console.log('onOpen:', res)
    });
    that.selfData.webSocketTask.onMessage((res) => {
      console.log('onMessage:', res)
      const resDataJson = JSON.parse(res.data)
      // 更新
      that.setData({
        playData: resDataJson
      })
      // that.initAudioManager(resDataJson)
      that.selfData.audioManager.src = config.CDN_HOST + "/" + resDataJson.audioKey
      console.log(that.selfData.audioManager)
    });
  },
  // 初始化audio
  initAudioManager: function (res) {
    console.log('res', res)
    const that = this
    const audioManager = wx.getBackgroundAudioManager()
    that.selfData.audioManager = audioManager
    audioManager.title = res.title
    audioManager.singer = res.author
    audioManager.coverImgUrl = res.cover
    audioManager.epname = res.title
    const src = config.CDN_HOST + "/" + res.audioKey
    audioManager.src = src

    console.log('initAudioManager', audioManager)

    // on event callback
    audioManager.onPlay(function () {
      console.log('onPlay')
      that.setData({
        isPlay: true,
        duration: audioManager.duration,
        currentTime: util.formatSecondTime(audioManager.currentTime),
        durationTime: util.formatSecondTime(audioManager.duration)
      })
    })
    audioManager.onPause(function () {
      console.log('onPause')
      that.setData({
        isPlay: false
      })
    })
    audioManager.onError(function (e) {
      console.log('onError:', e)
      dialog.errDialog(e.detail.value)
    })
    audioManager.onEnded(function () {
      console.log('onSeeked')
      that.setData({
        isPlay: false
      })
    })
    audioManager.onStop(function () {
      console.log('onStop')
      that.setData({
        isPlay: false
      })
    })
    audioManager.onWaiting(function () {
      console.log('onWaiting')
    })
    audioManager.onNext(function () {
      console.log('onNext')
      that.handlePlayNext()
    })
    audioManager.onPrev(function () {
      console.log('onPrev')
      that.handlePlayPrev()
    })
    audioManager.onTimeUpdate(function () {
      that.setData({
        currentTime: util.formatSecondTime(audioManager.currentTime),
        sliderValue: audioManager.currentTime
      })
    })
  },
  handlePlay: function () {
    const audioManager = this.selfData.audioManager
    audioManager ? this.data.isPlay ? audioManager.pause() : audioManager.play() : this.initAudioManager();
  },
  handlePlayPrev: function () {

  },
  handlePlayNext: function () {

  },
  onSliderStartDrag: function () {
    this.selfData.audioManager.pause()
  },
  onSliderChange: function (t) {
    console.log('onSliderChange:', t.detail.value)
    const audioManager = this.selfData.audioManager
    audioManager.seek(t.detail.value)
    audioManager.play()
  },
  clickCollect: function () {
    const that = this
    if(this.data.isCollect){
      api.uncollect({
        articleId: that.data.playData.id
      }).then((resData) => {
        dialog.successDialog('取消收藏成功')
      });
    }else{
      api.collect({
        articleId: that.data.playData.id
      }).then((resData) => {
        dialog.successDialog('收藏成功')
      });
    }

    this.setData({
      isCollect: !this.data.isCollect
    })
  },
  clickDownload: function () {
    downloadfile.downloadFile('DitiAudioFile', config.CDN_HOST + "/" + this.data.playData.audioKey)
  },
  clickSetting: function () {
    this.setData({
      showSetting: true
    })
  },
  hideModal(e) {
    this.setData({
      showSetting: false
    })
  },
  clickLink: function () {
    wx.navigateTo({
      url: "../web/web?url=" + this.data.playData.url
    });
  },
  clickBack: function () {
    wx.redirectTo({
      url: "../index/index"
    });
  },
  // 分享微信聊天
  onShareAppMessage: function () {
    return {
      title: "谛听Diti为您阅读文章：" + this.data.playData.title,
      path: "pages/play/play?articleId=" + this.data.playData.id,
      imageUrl: this.data.playData.cover
    };
  },
  // 分享朋友圈
  onShareTimeline: function () {
    return {
      title: "谛听Diti为您阅读文章：" + this.data.playData.title,
      path: "pages/play/play?articleId=" + this.data.playData.id,
      imageUrl: this.data.playData.cover
    };
  }
});