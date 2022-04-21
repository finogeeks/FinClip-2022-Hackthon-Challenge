Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '活动报名',
        name: 'registration',
        color: 'cyan',
        icon: 'edit'
      },
      {
        title: '活动签到',
        name: 'sign-in',
        color: 'blue',
        icon: 'text'
      },
      {
        title: '成绩查询',
        name: 'inquiry',
        color: 'purple',
        icon: 'font'
      },
      {
        title: '课表 ',
        name: 'class-schedule',
        color: 'mauve',
        icon: 'calendar'
      },
      {
        title: '社团介绍',
        name: 'Community',
        color: 'pink',
        icon: 'friendfill'
      },
      {
        title: '今天来抽签',
        name: 'random-draw',
        color: 'brown',
        icon: 'tagfill'
      }
    ],
    swiperList: [{
      id: 0,
      type: 'image',
      name:"score",
      url: '../../images/cjhb.png',
      urls:'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxMDYzNjMyMA==&hid=2&sn=45ad606fd780a5aea5ff9f2b1ac4de64&scene=18#wechat_redirect'
    },
    {
      id: 1,
      type: 'image',
      name:'activ',
      url: '../../images/hdhb.png',
      urls:'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxMDYzNjMyMA==&hid=2&sn=45ad606fd780a5aea5ff9f2b1ac4de64&scene=18#wechat_redirect'
    },
    {
      id: 2,
      type: 'image',
      name:"inq",
      url: '../../images/cqhb.png',
      urls:'https://jujubefoxx.github.io/WhatDoWeHaveToEat-/'
    }
    ]
},
cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  
  swiperp(e){
    console.log(e)
    var url=e.currentTarget.dataset.urls
      wx.navigateTo({
        url: url,
        success: (result) => {
          console.log("success")
        }
      });
        
  }
})