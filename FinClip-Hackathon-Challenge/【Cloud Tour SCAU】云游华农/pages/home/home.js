// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    code:'',
    isHide:true,
    type:"",
    picture:'',
    userInfo:'',
    timer:"",
    isNight:false,
    islogin:false,
    name:'点击头像登录',
    src:'https://img0.baidu.com/it/u=3395262931,3869119893&fm=26&fmt=auto',
    timeout:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    //第一次进入个人页面会加载700ms的加载框


    let user=wx.getStorageSync('userInfo')
    wx.login({
      success:res=>{
        console.log("用户的code:"+res.code);
      }
    })
    let isNight=false
    let timer = ''
    let time=new Date();
    console.log(time);
    let hour=time.getHours();
    if(hour>=0&&hour<=5){
      timer="🌘 夜深了，小宝贝早点休息噢~";
      isNight=true;
    }else if(hour>5&&hour<12){
      timer="🌞 早上好呀！小可爱~";
    }else if(hour==12){
      timer="🌞 中午好呀！小可爱~";
    }else if(hour>12&&hour<19){
      timer="🌞 下午好呀！小可爱~";
    }else{
      timer="🌜 晚上好呀！小可爱~";
      isNight=true;
    }
    console.log(isNight)
        this.setData({
          userInfo:user,
          timer,
          isNight:isNight
        })
   
  },
  getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息', 
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            islogin:true
          });
          wx.switchTab({
            url: '../home/home',
          })
          wx.setStorageSync('userInfo', res.userInfo);
        },
        fail: res=>{
          // wx.showModal({
          //   title:'警告',
          //   showCancel:false,
          //   content:'您点击了拒绝授权，将无法享受登录的便利',
          //   confirmText:'关闭',
          //   success:function(res){
          //     if(res.confirm){
          //       console.log('用户点击了“返回授权”');
          //     }
          //   }
          // });
        }
      })
  },
 debounced(fn,delay) {
   let timeout = this.data.timeout
   let that = this;
    return function(){
     console.log(timeout)
    let self = this;
    let args = arguments;
    timeout && clearTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(function (){
      that.setData({
        timeout:null
      })
    },delay)
    that.setData({
      timeout:timeout
    })
    //立刻执行
    if(callNow)  fn.apply(self,args);
  }
},
loginClick(){
  this.debounced(this.getUserProfile,1000)()
},
})