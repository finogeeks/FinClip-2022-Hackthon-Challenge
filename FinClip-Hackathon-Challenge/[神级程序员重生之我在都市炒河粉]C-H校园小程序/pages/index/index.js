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
      url: '../../images/成绩海报.png'
    },
    {
      id: 1,
      type: 'image',
      url: '../../images/活动海报.png'
    },
    {
      id: 2,
      type: 'image',
      url: '../../images/抽签海报.png'
    }
    ]
},
cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
})