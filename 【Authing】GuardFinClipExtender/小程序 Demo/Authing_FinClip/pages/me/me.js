// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [
        {
          title: '昵称',
          page: 'nickname'
        }, 
        {
          title: '姓名',
          page: 'name'
        }, 
        {
          title: '用户名',
          page: 'username'
        }, 
        {
          title: '手机号',
          page: 'phone'
        }, 
        {
          title: '邮箱',
          page: 'email'
        }
      ],
      photo:'',
      userInfoItems: [],
      idToken: ''
  },
  methods: {
    async handleRegisterByEmail(){
        let register = await app.guard.registerByEmail('123@.com','123456');
        console.log(register);
        ft.guardRequest({
          url: register.url,
          body: register.body,
          method: register.method,
          success: function (res) {
            console.log("registerByEmail success");
            wx.hideToast();
          },
          fail: function (res) {
            console.log("registerByEmail fail");
            console.log(JSON.stringify(res["errMsg"]));
            wx.hideToast();
          }
        });
    }
  },
  onLoad: function () {
      
    //this.methods.handleRegisterByEmail()
  },
  onShow() {
    // var _this = this
    // ft.getCurrentUser({
    //   success: function (res) {
    //       _this.setData({
    //         photo:res.photo,
    //         userInfoItems:[
    //           res.nickname,
    //           res.name,
    //           res.username,
    //           res.phone_number,
    //           res.email
    //         ]
    //       })
    //       console.log("调用getUserInfo success");
    //       console.log(JSON.stringify(res));
    //   },
    //   fail: function (res) {
    //       console.log("调用getUserInfo fail");
    //       console.log(JSON.stringify(res["errMsg"]));
    //   }
    // })

    var _this = this

    wx.showToast({title: '加载中', icon: 'loading', duration: 10000});

    let getUser = app.guard.getCurrentUser();
    ft.guardRequest({
      url: getUser.url,
      body: getUser.body,
      method: getUser.method,
      success: function (res) {
        _this.setData({
            photo:res.data.photo,
            userInfoItems:[
              res.data.nickname,
              res.data.name,
              res.data.username,
              res.data.phone,
              res.data.email
            ]
        })

        console.log("getCurrentUser success");
        wx.hideToast();
      },
      fail: function (res) {
        console.log("getCurrentUser fail");
        console.log(JSON.stringify(res["errMsg"]));
        wx.hideToast();
      }
    });
  },
  // idToken
  getIdToken() {
    var _this = this
    ft.getIdToken({
      success: function (res) {
        console.log("getIdToken call succeeded");
        console.log(res)
         _this.setData({
            idToken:res.idToken
          })
      },
      fail: function (res) {
          console.log("getIdToken call failed");
          console.log(res)
      }
    })
  }
  
})
