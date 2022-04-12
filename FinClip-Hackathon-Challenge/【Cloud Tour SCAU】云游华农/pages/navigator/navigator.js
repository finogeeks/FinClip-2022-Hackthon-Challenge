Page({
  data: {
  items:["华南农业大学图书馆","华农大正门","红满堂","东区运动场","华南农业大学行政楼","校史展览馆","华南农业大学树木园","竹铭书屋","真维斯学生活动中心","农业工程实验楼","艺术学院音乐楼"],
  markers:[
    { iconPath:'cloud://ykf-1gf4ci0r28637c7c.796b-ykf-1gf4ci0r28637c7c-1305480306/flag.png',
      id: 0,
      latitude:23.155865,
      longitude:113.353793,
      width:50,
      height:50
    },
    {
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:1,
      latitude:23.1573936,
      longitude:113.3453468,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"农业工程实验楼",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-30,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:2,
      latitude:23.152564,
      longitude:113.35728,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"华农大正门",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-23,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:3,
      latitude:23.156448,
      longitude:113.351884,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"红满堂",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-14,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:4,
      latitude:23.153962,
      longitude:113.359933,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"树木园",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-14,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:5,
      latitude:23.161158,
      longitude:113.366739,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"真维斯",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-14,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:6,
      latitude:23.16156622,
      longitude:113.352427,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"音乐楼",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-14,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:7,
      latitude:23.157286,
      longitude:113.349511,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"校史展览馆",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-23,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:8,
      latitude:23.1575,
      longitude:113.353635,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"图书馆",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-14,
      }
    },{
      iconPath:'https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/c38e88e7-bdf8-4083-a5b4-edfb01ce6ac4.png',
      id:9,
      latitude:23.154149,
      longitude:113.364512,
      width:45,
      height:35,
      label:{
        fontSize:8,
        content:"东区运动场",
        bgColor:"#fff",
        color:"#000",
        padding:5,
        borderRadius:5,
        anchorX:-23,
      }
    }
  ]
  },
  getMap(e){
    wx.showToast({
      title: '暂不兼容',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
    console.log(e);
    let latitude=e.target.dataset.latitude;
    let longitude=e.target.dataset.longitude;
    let pos=e.target.dataset.text;
    this.setMap(latitude,longitude,pos);
  },
  setMap(latitude,longitude,pos){
    let plugin = requirePlugin('routePlan');
    let key = '7EGBZ-TS4KX-JXS43-ZC5TU-3PDLJ-6RB6I'; 
    let referer = '云游华农';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': pos,
        'latitude':Number(latitude),
        'longitude': Number(longitude)
    });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint+'&themeColor='+'#14c453'
    });
  },
  onLoad: function (options) {
  
   }
  
})

