//app.js

import io from "./utils/index.js";

var hex_md5 = require("./utils/md5.js");
var Base64 = require("./utils/base64.js");
App({

  onLaunch: function (ops) {
    
  const version = wx.getSystemInfoSync().SDKVersion;
  console.log(version);


  },
  onShow:function(){
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.system);
   
        this.globalData.brand = res.brand;
        this.globalData.model2 = res.model;
        this.globalData.dev = res.system;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;

        this.globalData.statusBarHeight = res.statusBarHeight * 2
        if (res.system.indexOf("Android") != -1) {
          console.log('安卓');
          this.globalData.device = 2;
        }
        if (res.system.indexOf("iOS") != -1) {
          console.log('IOS');
          this.globalData.device = 1;
        }
        if (res.model.indexOf("iPhone X") != -1 || res.model.indexOf("iPhone 11") != -1 || res.model.indexOf("iPhone 12") != -1) {
          this.globalData.model = 1;
        }
        this.getUUID()
      }
    });
  },
  getToken() {
    return new Promise((resolve, reject) => {
      wx.login({   // 获取code
        success: res => {
          if (res.code) {
         
            wx.request({ // 获取openid
              url: this.globalData.api + '/Users/',
              method: 'GET',
              header: {
                'source': 3
              },
              data: {
                code: res.code
              },
              success: res => {
                if (res.data.code == 200) {
                  //console.log('res===', res.data)
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.setStorageSync('session_key', res.data.data.session_key);
                  // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                  wx.getUserInfo({
                    lang: 'zh_CN',
                    withCredentials: true,
                    success: res => {
                      // 保存用户信息到storage
                      // try {
                      //   wx.setStorageSync('username', res.userInfo.nickName);
                      //   wx.setStorageSync('avatar', res.userInfo.avatarUrl);
                      // } catch (e) { }
                      // 注册用户并获取token
                      wx.request({
                        url: this.globalData.api + '/Users/',
                        method: 'POST',
                        data: {
                          'username': wx.getStorageSync('username'),
                          'avatar': wx.getStorageSync('avatar'),
                          'openid': wx.getStorageSync('openid'),
                          'session_key': wx.getStorageSync('session_key'),
                        },
                        success: res => {
                          if (res.data.code == 200) {
                            wx.setStorageSync('token', res.data.data.token);
                            var base = new Base64();
                            var result2 = base.decode(res.data.data.token);
                            wx.setStorageSync('uid', result2.split(',')[0]);
                            resolve(res)
                          }
                        }
                      })
                    },
                    fail(res) {
                      wx.showModal({
                        title: '用户未授权！',
                        content: '如需正常参与抽奖,请打开关于抽奖小工具->设置->允许使用用户头像昵称等公开信息',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            //console.log('确定了');
                            wx.openSetting({

                              success: function success(res) {

                                console.log('openSetting success', res.authSetting);

                              }

                            });
                          }
                        }
                      })
                    }
                  })
                }
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
            reject('error');
          }
        }
      })
    })
  },

  pay: function (event, obj, price) {
    //console.log(event);
    //console.log(obj);
    var shopList = obj.data.list;
    var data = [];
    shopList.forEach((v, i) => {
      var o = {};
      o.goods_id = v.goods_id;
      o.num = v.num;
      data.push(o);
    })
    //var price = event.currentTarget.dataset.price;

    var _this = this;
    wx.showLoading({
      title: '请求支付中',
    });
    wx.request({
      url: this.globalData.api + 'orderpay.html',
      header: {
        'X-Token': wx.getStorageSync('token'),
        'source': 3
      },
      data: data,
      method: 'post',
      success: (res) => {
        if (res.data.code == 200) {
          var param = res.data.data;
          wx.requestPayment({
            'timeStamp': param.timeStamp,
            'nonceStr': param.nonceStr,
            'package': param.package,
            'signType': 'MD5',
            'paySign': param.paySign,
            'success': (respon) => {
              _this.checkOrder(event, obj, res);
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                image: '/images/error.png',
                duration: 2000
              })

            }
          })

        }
        wx.hideLoading();
      }
    });
  },
  checkOrder: function (event, obj, res) {
    wx.showLoading({
      title: '加载中请等待',
      mask: true
    })
    var _this = this;
    wx.request({
      url: this.globalData.api + '/order/' + res.data.data.order_id,
      header: {
        'X-Token': wx.getStorageSync('token'),
        'source': 3
      },

      success: (rt) => {
        if (rt.data.code == 200) {
          if (rt.data.data.result == 1) {
            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            });
            obj.setData({
              order_id: res.data.data.order_id
            })
            obj.goSubmit(event);
          }
          else {
            this.globalData.cknum++;
            if (this.globalData.cknum < 20) {
              setTimeout(() => {
                _this.checkOrder(event, obj, res);
              }, 1000 * _this.globalData.cknum);

            }
            else {
              this.globalData.cknum = 0;
            }
          }
        }
      }
    });

  },
  checkJoinGameOpen: function () {
    wx.request({
      url: this.globalData.api + '/setting/open_recommend.html',
      success: res => {
        if (res.data.code == 200) {
          if (res.data.data.open_recommend == 1) {
            this.globalData.isCanJoinGame = true;
          }
        }
      }
    })
  },
  getUUID: function () {
    var xsl_uuid = wx.getStorageSync('xsl_uuid');
    if (!xsl_uuid) {
      wx.request({
        url: 'https://wxa.chouchoujiang.com/juliang.php?s=YxBox/ip',
        success: res => {
          xsl_uuid = hex_md5.hex_md5(res.data.data.ip + '/' + this.globalData.model2 + '/' + this.globalData.dev);
          wx.setStorageSync('xsl_uuid', xsl_uuid);
        }
      });
    }

  },
  click_count: function (url) {
    wx.request({
      url: url,
    })
  },
  subString1: function (str, len) {
    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
    // 当字符串字节长度小于指定的字节长度时
    if (str.replace(regexp, "aa").length <= len) {
      return str;
    }
    // 假设指定长度内都是中文
    var m = Math.floor(len / 2);
    for (var i = m, j = str.length; i < j; i++) {
      // 当截取字符串字节长度满足指定的字节长度
      if (str.substring(0, i).replace(regexp, "aa").length >= len) {
        return str.substring(0, i) + '…';
      }
    }
    return str;
  },

  subString2: function (str, len) {
    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
    // 当字符串字节长度小于指定的字节长度时
    var strArr = str.split('');
    var arr = [];
    var str2 = '';
    var len2 = 0;
    strArr.forEach((v, i) => {
      str2 += v;
      if (v.replace(regexp, "aa").length == 2) {
        len2 = len2 + 2;
      }
      else {
        len2++;
      }
      if (len2 >= len) {
        //console.log(str2);
        arr.push(str2);
        len2 = 0;
        str2 = '';

      }
      else if (len2 < len && (i == strArr.length - 1)) {
        //console.log(str2);
        arr.push(str2);
      }

    })

    return arr;

  },
  subStringLength: function (str) {
    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
    // 当字符串字节长度小于指定的字节长度时
    return str.replace(regexp, "aa").length;
  },
  //域名更换
  // cgdomain:function(){
  //   wx.request({
  //     url: 'https://wxa.chouchoujiang.com/cjxgj.json',
  //     success:res=>{
  //       if(res.data.is_old==1){
  //         this.globalData.api= 'https://api-lottery.veyvip.com/v2.5/';
  //         this.globalData.socket=io('wss://api-lotterytools.veyvip.com', { autoConnect: false });
  //       }
  //       this.checkJoinGameOpen();
  //     }
  //   })
  // },

  getuserinfo: function (callback,self) {
   

    wx.login({   // 获取code
      success: res => {
        if (res.code) {
          wx.request({ // 获取openid
            url: this.globalData.api + '/Users/',
            method: 'GET',
            header: {
              'source': 3
            },
            data: {
              code: res.code
            },
            success: res => {
         
              if (res.data.code == 200) {
                //console.log('res===', res.data)
                wx.setStorageSync('openid', res.data.data.openid);
                wx.setStorageSync('session_key', res.data.data.session_key);
                wx.uma.setOpenid(res.data.data.openid); 
                this.fetchUserinfo(callback,self);

              }
            }
          })
        }
      }
    })
  },
  getUserProfile:function(callback,self){
 
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang:'zh_CN',
      success: res => {
        wx.setStorageSync('username',  res.userInfo.nickName);
        wx.setStorageSync('avatar',  res.userInfo.avatarUrl);
        this.getuserinfo(callback,self);
      },
      fail:res=>{
       
        wx.showToast({
          title:'未同意将匿名登录，后续可进入我的同步资料',
          icon:'none',
          duration:2000,
        });
        wx.setStorageSync('username', '匿名用户');
        wx.setStorageSync('avatar',  'https://static.2719.cn/Uploads/lottery/2104/606c26ef6ea63.jpg');

        this.getuserinfo(callback,self);

      }
    })

  },
  fetchUserinfo: function (callback,self) {
    // 注册用户并获取token
    wx.request({
      url: this.globalData.api + 'Users/',
      method: 'POST',
      header: {
        'source': 3
      },
      data: {
        'username': wx.getStorageSync('username'),
        'avatar': wx.getStorageSync('avatar'),
        'openid': wx.getStorageSync('openid'),
        'session_key': wx.getStorageSync('session_key'),
      },
      success: res => {
        if (res.data.code == 200) {
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('newUser', new Date().getTime());
          wx.setStorageSync('pay', res.data.data.pay);
          wx.setStorageSync('diy_skin', res.data.data.diy_skin);
          debugger
          var base = new Base64();
          var result2 = base.decode(res.data.data.token);
          wx.setStorageSync('uid', result2.split(',')[0]);
          if(callback){
            if(self){
              callback(self);
            }
            else{
              callback();
            }
            
          }
        }
      }
    })
  },
  //解密手机号
  decryptPhone: function (e, type) {
    var data = {};
    data.iv = e.detail.iv;
    data.encryptedData = e.detail.encryptedData;
    wx.checkSession({
      success: res => {
        // session_key 未过期，并且在本生命周期一直有效
        wx.request({
          url: this.globalData.api + 'decryptPhone',
          method: 'post',
          data: data,
          header: {
            'Content-Type': 'application/json',
            'X-Token': wx.getStorageSync('token'),
            'source': 3
          },
          success: res => {
            if (res.data.code == 200) {
              var pages = getCurrentPages();
              var len = pages.length;
              wx.setStorageSync('createTel',  res.data.data.phone)
              pages[len - 1].data.createTel = res.data.data.phone;
              pages[len - 1].setData({
                createTel: res.data.data.phone,
                isGetPhone: false,
              });
              if (type) {
                pages[len - 1].submit(pages[len - 1].data.temp_e);
              }
            }
            else if (res.data.code == 400) {
              wx.showToast({
                title: '登录授权已过期，正在重新获取',
                icon: 'none'
              })
              var pages = getCurrentPages();
              var len = pages.length;
              pages[len - 1].setData({
                isGetPhone: false,
              });
              wx.navigateTo({
                url: '/pages/auth/getuserinfo',
              })
         
            }
            else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                success: res => {
                  setTimeout(() => {
                    this.decryptPhone(e, type)
                  }, 1000 * 10)
                }
              })
            }
          },
          fail: res => {
            var pages = getCurrentPages();
            var len = pages.length;
            pages[len - 1].setData({
              isGetPhone: false,
            });
            wx.showToast({
              title: '网络链接失败',
              icon: 'none'
            })
          }
        })

      },
      fail: res => {
        wx.showToast({
          title: '登录信息已过期，重新登录',
          icon:'none'
        })
        // session_key 已经失效，需要重新执行登录流程
        wx.login({   // 获取code
          success: res => {
            if (res.code) {
              wx.request({
                url: this.globalData.api + 'Users/',
                data: { code: res.code },
                header: {
                  'Content-Type': 'application/json',
                  'X-Token': wx.getStorageSync('token'),
                  'source': 3
                },
                success: res => {
                  if (res.data.code == 200) {
                    console.log('res===', res.data)
                    wx.setStorageSync('openid', res.data.data.openid);
                    wx.setStorageSync('session_key', res.data.data.session_key);
                    var data = {
                      'username': wx.getStorageSync('username'),
                      'avatar': wx.getStorageSync('avatar'),
                      'openid': res.data.data.openid,
                      'session_key': res.data.data.session_key
                    };
                    wx.request({
                      url: this.globalData.api + 'Users/',
                      method: 'post',
                      data: data,
                      header: {
                        'Content-Type': 'application/json',
                        'X-Token': wx.getStorageSync('token'),
                        'source': 3
                      },
                      success: res => {
                        if (res.data.code == 200) {
                          wx.showToast({
                            title: '登录成功，请重试',
                            icon:'none'
                          })
                          var pages = getCurrentPages();
                          var len = pages.length;
                          pages[len - 1].setData({
                            isGetPhone: false,
                          });

                          
                        }
                      }
                    })

                  } else {
                    var pages = getCurrentPages();
                    var len = pages.length;
                    pages[len - 1].setData({
                      isGetPhone: false,
                    });

                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none'
                    })
                  }

                },
                fail: res => {
                  wx.showToast({
                    title: '网络链接失败',
                    icon: 'none'
                  })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
            }
          }
        })


      }
    })
  },
  globalData: {
    userInfo: null,
    // api: 'https://dev.chouchoujiang.com/v2.5/',
    // socket: io('wss://wss.chouchoujiang.com', { autoConnect: false }),//dev配置
    
    api: 'https://api.chouchoujiang.com/v2.5/',
    socket: io('wss://wss.chouchoujiang.com', { autoConnect: false }),//线上配置
    headers: {},
    group_id: 'xxx',
    isconnect: false,
    cknum: 0, //支付轮询订单次数
    canfollow: false, //是否可显示公众号关注
    device: 0, //操作系统 0 默认 1 iso 2 Android
    model: 0,
    statusBarHeight: 0,
    isCanJoinGame: false,//是否可以显示参与推荐广告
    brand:'', //手机品牌
    model2: '',//手机名称
    dev: '',//手机操作系统
    d1fm: 'https://r.d1fm.com/r.gif',
    windowHeight: '',
    windowWidth:'',
    ftoken: '', //是否通过用户分享链接进来
  },
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },
})