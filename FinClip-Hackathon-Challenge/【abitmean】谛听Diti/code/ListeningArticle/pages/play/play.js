const app = getApp()
const dialog = require("../../utils/dialog")
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const downloadfile = require('../../utils/downloadfile.js');
const config = require('../../utils/config.js');

Page({
  data: {
    isPlay: false,
    playData: {},
    currentIndex: false,
    sliderValue: 0,
    isCollect: false,
    currentTime: '',
    durationTime: '',
    duration: 0
  },
  selfData: {
    audioManager: null,
    webSocketTask: null
  },
  onLoad: function (option) {
    const that = this
    // const data = {
    //   "title": "红米AC2100路由器刷openwrt固件-160mhz-插件全-出国-去广告-多拨",
    //   "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/CVPEWgMFlI9cu2ibVib2eZV01duIIia1NuRw40yVIxzw4BmSsWwllPCibZ3rAAWlicpOwqXD2lSCgbRBc14bj5jMAlQ/0?wx_fmt=jpe",
    //   "author": "苏飞ghostsf",
    //   "content": null,
    //   "audioUrl": "https://cdn.ananwulian.com/d73cecd3928d206e8d6c7f8b0c798b48",
    //   "trueUrl": "http://mp.weixin.qq.com/s?__biz=MzIwNDE3MTA3OQ==&mid=2247483908&idx=1&sn=453c388b493e20fe8f9835846383f716&chksm=96c5702ca1b2f93ab9d6d8447dbdd76c83799379de650a2be8aea43d7cbd5323a2f91a524dcd#rd",
    //   "officialAccount": "abitmean",
    //   "officialName": "abitmean",
    //   "mpName": "abitmean",
    //   "pulishTime": "2020-12-01"
    // }
    let data
    if (that.getOpenerEventChannel() && !util.isEmpty(that.getOpenerEventChannel())) {
      console.log(this.getOpenerEventChannel())
      that.getOpenerEventChannel().on('acceptPlayData', function (res) {
        console.log('res', res)
        data = res
      })
    } else {
      console.log('option.query', option.query)
      data = option.query
    }

    that.setData({
      playData: data
    })
    that.initAudioManager(data)

    that.selfData.webSocketTask = wx.connectSocket({
      url: 'ws://nas.ghostsf.com:21016/ws/' + data.id
    });
    
    that.selfData.webSocketTask.onOpen((res) => {
      console.log(res)
    });

    that.selfData.webSocketTask.onMessage((res) => {
      console.log(res)
    });
  },
  onUnload: function () {},
  initAudioManager: function (res) {
    const that = this
    that.selfData.audioManager = wx.getBackgroundAudioManager()
    const audioManager = that.selfData.audioManager
    audioManager.title = res.title
    audioManager.coverImgUrl = res.cover
    audioManager.epname = res.title
    const src = config.CDN_HOST + "/" + res.audioKeys.split(",")[0]
    console.log(src)
    audioManager.src = src

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
    // todo add api
    this.setData({
      isCollect: !this.data.isCollect
    })
  },
  clickDownload: function () {
    // todo 进一步研究文件下载
    downloadfile.downloadFile('video', this.data.playData.audioUrl)
  },
  clickSetting: function () {

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
  // playData 存储下来
  onShareAppMessage: function () {
    const params = 'title=' + this.data.playData.title +  '&cover=' + this.data.playData.cover 
    + '&tureUrl=' + this.data.playData.trueUrl
    + '&audioUrl=' + this.data.playData.audioUrl
    return {
      title: "听文为您阅读文章：" + this.data.playData.title,
      path: "pages/play/play?" + params,
      imageUrl: this.data.playData.cover
    };
  },
  onShareTimeline: function () {
    const params = 'title=' + this.data.playData.title +  '&cover=' + this.data.playData.cover 
    + '&tureUrl=' + this.data.playData.trueUrl
    + '&audioUrl=' + this.data.playData.audioUrl
    return {
      title: "听文为您阅读文章：" + this.data.playData.title,
      path: "pages/play/play?" + params,
      imageUrl: this.data.playData.cover
    };
  }
});