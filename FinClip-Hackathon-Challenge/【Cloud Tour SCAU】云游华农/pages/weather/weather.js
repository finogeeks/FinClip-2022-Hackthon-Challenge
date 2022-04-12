const app = getApp()

Page({
  data: {
    dataTime:"",
    realtime: {},
    today: {},
    tomorrow: {},
    temp:0,
    airColor:"",
    airRate:"",
    aqi:0,
    pm2p5:"",
    wind:"",
    windDir:"",
    weatherNow:"",
    isTrue:false
  },
  //事件处理函数
  onLoad: function () {
    var self = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/3d',
      data:{
        location:"101280106",
         key:"8faefcc64a0a423295b9b9a4f8892541"
       },
      success(res){
        console.log(res.data);
        let data=res.data.daily;
        let today = data[0];
        let tomorrow = data[1];
        //计算一天平均温度
        let temp=Math.floor((parseInt(today.tempMax)+parseInt(today.tempMin))/2);
        let time=new Date();
        let hour=time.getHours();
        let weatherNow,wind,windDir;
        if(hour<20){
          weatherNow=today.textDay;
          wind =today.windScaleDay.split("-")[0];
          windDir=today.windDirDay;
          // console.log(weatherNow);
       }else{
         weatherNow=today.textNight;
         wind =today.windScaleNight.split("-")[0];
         windDir=today.windDirNight;
       }
       //获取当前温度
       let nowTemp = wx.getStorageSync('nowTemp').temp;
        self.setData({
          weatherNow,
          wind,
          windDir,
          today,
          tomorrow,
          temp:nowTemp||temp,
          //赋值后做一次判断！！！
          isTrue:true
        })
      }
    }),
    wx.request({
      url: 'https://devapi.qweather.com/v7/air/now',
      data:{
        location:"113.353668,23.155365",
        key:"8ee529547b7e48729b8bfe67f23c94ce"
      },
      success(res){
        let data=res.data.now;
        // console.log(data);
         // 判断空气质量
        let aqi = data.aqi;
        let airRate,airColor,pm2p5=data.pm2p5;
        if (aqi > 250) {
          airRate = "严重污染";
          airColor = "purple";
        } else if (aqi > 100) {
          airRate = "污染";
          airColor = "red";
        } else if (aqi > 50) {
         airRate = "良";
          airColor = "yellow";
        } else {
           airRate = "优";
           airColor = "green";
        }
        self.setData({
          pm2p5,
          aqi,
          airColor,
          airRate
        })
      }
    })
  }
})
