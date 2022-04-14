const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    music: {
      type: String,
      value: ''
    },
    poster: {
      type: String,
      value: ''
    },
    author: {
      type: String,
      value: ''
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    loop: {
      type: Boolean,
      value: false
    },
    sizeClz: {
      type: String,
      value: "",
    },
    avatarType: {
      type: String,
      value: "icon",
    },
    icon: {
      type: String,
      value: "diy-icon-musicfill",
    },
    text: {
      type: String,
      value: "♪",
    },
    backgroundClazz: {
      type: String,
      value: "",
    },
    avatarBackgroundColor: {
      type: String,
      value: "",
    },
    avatarColor: {
      type: String,
      value: "",
    },
    isTitle: {
      type: [Boolean, String],
      value: false,
    },
    isTitle: {
      type: [Boolean, String],
      value: false,
    },
    isSilder: {
      type: [Boolean, String],
      value: false,
    },
    activeColor: {
      type: String,
      value: "",
    }
  },
  data: {
    _audioContext:null,
    h5Play: true,
    isPlaying: false,
    isPlayEnd: false,
    position: 0,
    currentTime: 0,
    currentTimeStr:'',
    durationStr:'',
    duration: 100
  },
  lifetimes: {
    attached() {
        this.createAudio()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTime(){
        let  innerAudioContext = this.data._audioContext
        let currentTime = innerAudioContext.currentTime || 0;
        let duration = innerAudioContext.duration || 100;
        let position = parseInt((currentTime / duration * 100).toString())
        let currentTimeStr = this.getMinuteTime(currentTime)
        let durationStr = this.getMinuteTime(duration)
        this.setData({currentTimeStr,durationStr,currentTime,duration,position})
    },
    createAudio() {
      let thiz = this
      let innerAudioContext = thiz.data._audioContext = ft.createInnerAudioContext();
      innerAudioContext.autoplay = thiz.data.autoplay;
      innerAudioContext.loop = thiz.data.loop;
      innerAudioContext.src = thiz.data.music;
      innerAudioContext.onPlay(() => {
        let isPlaying = true
        this.setData({isPlaying})
        console.log('开始播放');
      });
      innerAudioContext.onTimeUpdate((e) => {
          this.changeTime()
      });
      innerAudioContext.onSeeked((e) => {
           this.changeTime()
      });
      innerAudioContext.onEnded(() => {
        let currentTime = 0;
        let isPlayEnd = true;
        let isPlaying = this.data.loop;
        this.setData({isPlaying,currentTime,isPlayEnd})
      });
      innerAudioContext.onError((res) => {
        let isPlaying = false;
        this.setData({isPlaying})
      });
      return innerAudioContext;
    },
    onchange(e) {
        let currentTime =  e.detail.value / 100 * this.data.duration
        this.data._audioContext.seek(currentTime);
    },
    play() {
      if (this.data.isPlaying) {
        this.pause();
        return;
      }
      let isPlaying = true;
      this.data._audioContext.play();
      let isPlayEnd = false;
      this.setData({isPlaying,isPlayEnd})
    },
    pause() {
      this.data._audioContext.pause();
      let  isPlaying = false;
      this.setData({isPlaying})
    },
    stop() {
      this.data._audioContext.stop();
      let  isPlaying = false;
      this.setData({isPlaying})
    },
    // 秒转换分秒
    getMinuteTime(result) {
      const h =
          Math.floor(result / 3600) < 10 ?
              '0' + Math.floor(result / 3600) :
              Math.floor(result / 3600);
      const m =
          Math.floor((result / 60) % 60) < 10 ?
              '0' + Math.floor((result / 60) % 60) :
              Math.floor((result / 60) % 60);
      const s =
          Math.floor(result % 60) < 10 ?
              '0' + Math.floor(result % 60) :
              Math.floor(result % 60);
      if (h === '00') return m + ':' + s;
      return h + ':' + m + ':' + s;
    }
  }
})