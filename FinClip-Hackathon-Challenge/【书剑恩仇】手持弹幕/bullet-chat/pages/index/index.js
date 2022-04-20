// index.js
Page({
  data: {
    lock: false,
    timer: null,
    text: ['请', '输', '入', '内', '容'],
    textValue: '请输入内容',
    toolsVisable: true,
    colorfulVisable: false,
    currentTextColor: '#FFFFFF',
    currentBgColor: '#000000',
    currentEffects: 'normal',
    speedsReset: false,
    oldSpeed: 'speed-two',
    currentSpeeds: 'speed-two',
    currentSizes: 550,
    colors: ['#FFFFFF', '#000000', '#A0D911', '#1990FF', '#2F54EB', '#EB2F95', '#722ED1', '#F9541C'],
    effects: [
      {
        title: '正常',
        effect: 'normal',
      }, 
      // {
      //   title: '像素',
      //   effect: 2,
      // }, 
      {
        title: '阴影',
        effect: 'shodow',
      }, 
      {
        title: '描边',
        effect: 'border',
      }, 
    ],
    speeds: [
      {
        title: '静止',
        speed: 'speed-normal'
      }, 
      {
        title: '0.5倍',
        speed: 'speed-one'
      }, 
      {
        title: '正常',
        speed: 'speed-two'
      }, 
      {
        title: '1.5倍',
        speed: 'speed-three'
      }, 
      {
        title: '2倍',
        speed: 'speed-four'
      }, 
    ],
    // 24, 48, 64, 72, 500
    sizes: [
      {
        title: 24,
        size: 120,
      },
      {
        title: 48,
        size: 200,
      },
      {
        title: 64,
        size: 350,
      },
      {
        title: 72,
        size: 400,
      },
      {
        title: '满屏',
        size: 550,
      }
    ],
  },
  handleLockClick() {
    this.setData({
      lock: !this.data.lock
    })
  },
  handleColorfulClick() {
    this.setData({
      colorfulVisable: true
    })
  },
  handleSave() {
    this.setData({
      colorfulVisable: false
    })
  },
  handleTextColorClick(e) {
    const { color } = e.currentTarget.dataset;
    this.setData({
      currentTextColor: color,
    })
  },
  handleBgColorClick(e) {
    const { color } = e.currentTarget.dataset;
    this.setData({
      currentBgColor: color,
    })
  },
  handleEffectClick(e) {
    const { effect } = e.currentTarget.dataset;
    this.setData({
      currentEffects: effect,
    })
  },
  handleSizeClick(e) {
    const { size } = e.currentTarget.dataset;
    this.setData({
      currentSizes: size,
    })
    this.handleReset();
  },
  handleSpeedClick(e) {
    const { speed } = e.currentTarget.dataset;
    this.setData({
      currentSpeeds: speed,
      oldSpeed: speed
    })
  },
  handleInputChange(e) {
    this.setData({
      textValue: e.detail.value,
      text: (e.detail.value).split(''),
    })
    this.handleReset();
  },
  handleReset() {
    clearTimeout(this.data.timer);
    const timer = setTimeout(() => {
      this.setData({
        currentSpeeds: this.data.oldSpeed,
        speedsReset: false,
      })
    }, 1000);
    this.setData({
      speedsReset: true,
      currentSpeeds: '',
      timer: timer
    })
  },
})
