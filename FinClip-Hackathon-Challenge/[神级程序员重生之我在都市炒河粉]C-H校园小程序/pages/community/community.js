Page({

  /**
   * 页面的初始数据
   */
  data: {
    firends:[
      {"name":"Esc","icon":'../../images/comm-pe/Esc.jpg',"url":''},
      {"name":"lorin","icon":"../../images/comm-pe/Lorin.jpg","url":""},
      {"name":"空木蓮華","icon":"../../images/comm-pe/bg.jpg","url":""},
      {"name":"🍌蕉🍌","icon":"../../images/comm-pe/hzfh.jpg","url":""},
      {"name":"(´･_･`)","icon":"../../images/comm-pe/yhj.jpg","url":""},
      {"name":"陈意外","icon":"../../images/comm-pe/pig.jpg","url":""},
      {"name":"zhazha-","icon":"../../images/comm-pe/zha.jpg","url":""},
      {"name":"杨春卷","icon":"../../images/comm-pe/cjm.jpg","url":""},
      
    ],

  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
   ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

})