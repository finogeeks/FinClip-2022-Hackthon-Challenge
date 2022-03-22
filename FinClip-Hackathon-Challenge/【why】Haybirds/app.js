const WXAPI = require('./wxapi/main.js')
const CONFIG = require('config.js')

const AUTH = require('utils/auth')
  

var t = require("./configs.js");

App({
    navigateToLogin: false,
    onLaunch: function() {

      


      if (wx.getExtConfig) {
        wx.getExtConfig({
          success (res) {
            console.log("extConfig:",res.extConfig)
          }
        })
      }

      const subDomain = wx.getExtConfigSync().subDomain
      const componentAppid = wx.getExtConfigSync().componentAppid
      console.log("componentAppid11111",componentAppid);
      if (componentAppid) {
        wx.setStorageSync('appid', wx.getAccountInfoSync().miniProgram.appId)
        wx.setStorageSync('componentAppid', componentAppid)
      }
      if (subDomain) {
        WXAPI.init(subDomain)
      } else {
        WXAPI.init(CONFIG.subDomain)
        WXAPI.setMerchantId(CONFIG.merchantId)
      }

    const that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
    //  获取接口和后台权限
    WXAPI.vipLevel().then(res => {
      that.globalData.vipLevel = res.data
    })
    //  获取商城名称
    WXAPI.queryConfigBatch('mallName,recharge_amount_min,ALLOW_SELF_COLLECTION,RECHARGE_OPEN').then(function(res) {
      if (res.code == 0) {
        res.data.forEach(config => {
          wx.setStorageSync(config.key, config.value);
          if (config.key === 'recharge_amount_min') {
            that.globalData.recharge_amount_min = res.data.value;
          }
        })
        
      }
    })
    WXAPI.scoreRules({
      code: 'goodReputation'
    }).then(function(res) {
      if (res.code == 0) {        
        that.globalData.order_reputation_score = res.data[0].score;
      }
    })
        var t = this;
        wx.getSystemInfo({
            success: function(o) {
                t.globalData.isIpx = !(o.model.indexOf("iPhone X") < 0), t.globalData.systemInfo = o;
            },
            fail: function(t) {},
            complete: function(t) {}
        }), this.checkUpdate();
    },
    checkUpdate: function() {
        if (wx.getUpdateManager) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(t) {
                console.log("更新提示:"+t.hasUpdate);
            }), t.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(o) {
                        o.confirm && t.applyUpdate();
                    }
                });
            }), t.onUpdateFailed(function() {});
        } else console.error("The SDK is too old to support wx.getUpdateManager()");
    },
    onHide: function() {},
    onShow: function(e) {

          // 自动登录



        console.log('app.js --- onShow')    
        this.globalData.launchOption = e
        // 保存邀请人
        if (e && e.query && e.query.inviter_id) {
          wx.setStorageSync('referrer', e.query.inviter_id)
          if (e.shareTicket) {
            // 通过分享链接进来
            wx.getShareInfo({
              shareTicket: e.shareTicket,
              success: res => {
                // console.error(res)
                // console.error({
                //   referrer: e.query.inviter_id,
                //   encryptedData: res.encryptedData,
                //   iv: res.iv
                // })
                WXAPI.shareGroupGetScore(
                  e.query.inviter_id,
                  res.encryptedData,
                  res.iv
                )
              }
            })
          }
        }
        // this.navigateToLogin = false
        this.checkLoginStatus()

          // 自动登录
    // AUTH.checkHasLogined().then(isLogined => {
    //   console.log("isLogined:",isLogined);
    //   if (!isLogined) {
    //     console.log(111111);
    //     AUTH.login()
    //   } else {
    //     console.log(22222);
    //     AUTH.bindSeller()
    //   }
    // })


    },
    globalData: {
        isConnected: true,
        launchOption: undefined,
        vipLevel: 0,


        userInfo: null,
        code: "",
        userId: "",
        token: "",
        cart: {
            storeId: null,
            store: null,
            inventory: null,
            shipping_address: {}
        },
        tenantId: "5a747495ce615177009f6400",
        appId: t.appId,
        BASE_URL: "https://api.it120.cc/haybirds",
        stores: [],
        isIpx: !1,
        systemInfo: {}
    },
    markAsDebug: function(t) {
        var o = !!t;
        o ? (this.globalData.BASE_URL = "https://api.it120.cc/haybirds-test", this.globalData.isTestEnv = !0, 
        wx.setStorageSync("is_test_env", o), wx.removeStorageSync("token"), wx.removeStorageSync("userId"), 
        wx.removeStorageSync("userInfo")) : (wx.clearStorageSync(), this.globalData.BASE_URL = "https://api.it120.cc/haybirds", 
        this.globalData.isTestEnv = !1), wx.showModal({
            title: "已切换至**" + (o ? "测试" : "生产") + "**环境",
            content: "需重启微信，再次登录后才能生效",
            showCancel: !1,
            confirmText: "知道了",
            success: function() {
                wx.reLaunch({
                    url: "/pages/stores/stores"
                });
            }
        });
    },
    login: function(t) {
        console.info("app.login()");
        var o = this;
        wx.login({
            success: function(e) {
                var n = e.code;
                console.info("wx.login() code >", n), o.globalData.code = n;
                try {
                    var a = wx.getStorageSync("token"), i = wx.getStorageSync("uid"), s = wx.getStorageSync("userInfo");
                    console.log("check token", a), console.log("check uid", i), console.log("check userInfo", s), 
                    a && i ? (o.globalData.token = a, o.globalData.userId = i
                        // , o.refreshUserProfile(function() {
                        // "function" == typeof t && t(e);
                        // })
                        ,console.log("bbbbbbbbbbb"+i, a)
                    )
                    : (wx.removeStorageSync("token"), wx.removeStorageSync("uid")
                     ,o.navigateToLogin = false,o.goLoginPageTimeOut(),console.log("bbbbbbbbbbb2222222"+i, a)
                     );
                } catch (t) {
                    o.goLoginPageTimeOut(),console.log("dddddddddddddddddd"+i, a)
                }
            },
            fail: function(t) {
                console.info("app.login() failed", t);
            },
            complete: function(t) {
                console.info("app.login() complete", t);
            }
        });
    },
    refreshUserProfile: function(t) {
        var o = this;
        this.getRequest(this.globalData.BASE_URL + "/auth/profile", {}).then(function(e) {
            console.log("userInfo", e), o.globalData.userInfo = e, wx.setStorageSync("userInfo", e), 
            t && "function" == typeof t && t();
        });
    },
    navigateLogin: function() {
        wx.redirectTo({
            url: "/pages/login/login",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    showErrorMsg: function(t, o) {
        wx.showModal({
            title: t,
            content: o || "",
            showCancel: !1,
            confirmText: "知道了"
        });
    },
    getRequest: function(o, e) {
        var n = this;
        return new Promise(function(a, i) {
            wx.showNavigationBarLoading(), wx.request({
                url: o,
                data: e,
                method: "GET",
                header: {
                    "X-Tenant-Id": n.globalData.tenantId,
                    "X-API-Token": n.globalData.token,
                    "X-MP-Id": t.appId
                },
                success: function(t) {
                    // 401 == t.statusCode ? (wx.removeStorageSync("token"), wx.removeStorageSync("userId"), 
                    // n.globalData.token = "", wx.reLaunch({
                    //     url: "/pages/stores/stores"
                    // })) :
                    
                    200 == t.statusCode || 204 == t.statusCode ? a(t.data) : (console.error(t), 
                    console.error("error", t));
                },
                fail: function(t) {},
                complete: function(t) {
                    function o(o) {
                        return t.apply(this, arguments);
                    }
                    return o.toString = function() {
                        return t.toString();
                    }, o;
                }(function(t) {
                    "function" == typeof complete && complete(t), wx.hideNavigationBarLoading();
                })
            });
        });
    },
    postRequest: function(o, e) {
        var n = this;
        return new Promise(function(a, i) {
            wx.showNavigationBarLoading(), wx.request({
                url: o,
                data: e,
                method: "POST",
                header: {
                    "X-Tenant-Id": n.globalData.tenantId,
                    "X-API-Token": n.globalData.token,
                    "X-MP-Id": t.appId
                },
                success: function(t) {
                    401 == t.statusCode ? (n.globalData.token = "", wx.reLaunch({
                        url: "/pages/stores/stores"
                    })) : 200 == t.statusCode ? a(t.data) : (console.error("error", t), i(t.data));
                },
                fail: function(t) {},
                complete: function(t) {
                    function o(o) {
                        return t.apply(this, arguments);
                    }
                    return o.toString = function() {
                        return t.toString();
                    }, o;
                }(function(t) {
                    "function" == typeof complete && complete(t), wx.hideNavigationBarLoading();
                })
            });
        });
    },
    patchRequest: function(o, e) {
        var n = this;
        return new Promise(function(a, i) {
            wx.showNavigationBarLoading(), wx.request({
                url: o,
                data: e,
                method: "PUT",
                header: {
                    "X-Tenant-Id": n.globalData.tenantId,
                    "X-API-Token": n.globalData.token,
                    "X-MP-Id": t.appId
                },
                success: function(t) {
                    401 == t.statusCode ? (n.globalData.token = "", wx.reLaunch({
                        url: "/pages/stores/stores"
                    })) : 200 == t.statusCode ? a(t.data) : (console.error("error", t), i(t.data));
                },
                fail: function(t) {
                    console.error("fail", t);
                },
                complete: function(t) {
                    function o(o) {
                        return t.apply(this, arguments);
                    }
                    return o.toString = function() {
                        return t.toString();
                    }, o;
                }(function(t) {
                    "function" == typeof complete && complete(t), wx.hideNavigationBarLoading();
                })
            });
        });
    },
    campaignEventLog: function(t) {
        return;
    },
    
    //jsjjl新增
    goLoginPageTimeOut: function() {

      // console.log(this.navigateToLogin);
      
      //   if (this.navigateToLogin){
      //     console.log("qqqqqqqqqqqqq");
      //   return
      //   }

        console.log("this.navigateToLogin");
        wx.removeStorageSync('token')
        // this.navigateToLogin = true
        setTimeout(function() {
          console.log("this.cvsdfdfsf");
        wx.navigateTo({
            url: "/pages/login/login"
        })
        }, 1000)
    },

    goStartIndexPage: function() {
        setTimeout(function() {
        wx.redirectTo({
            url: "/pages/start/start"
        })
        }, 1000)
    },  

    checkLoginStatus(){ // 检测登录状态
      console.log("检测登录状态");
      
      
        const _this = this
        const token = wx.getStorageSync('token');

   

        if (!token) {
          _this.goLoginPageTimeOut()
          return
        }
        // console.log("userInfo",wx.getStorageSync('userInfo'));
        
        // if(!wx.getStorageSync('userInfo')){
        //   wx.navigateTo({
        //       url: "/pages/login/login"
        //   })
        // }

        // https://wx.qlogo.cn/mmopen/vi_32/GQUXw0QOTS9cNUibRlO51h9jE9d7MZySChbETavmjIRknoS591ibW3WfdR2H4FltUju7QHcdFea4MiaS8sA3ma1CA/132
        // https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKsicwnqRU9bCwS4n1giaiapLLtAeQ68pNZzThfjibRGlTIwlLbia75ZPDcaLlJm9gicc8BqtRLibt8gNfxg/132

        // if(wx.getStorageSync('userInfo').avatarUrl == "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epCic4ltiabot0iaeWCzmpxqSyk31A9m5zxeOUUuUYegYf42pA02ObA6hibOiam7c7MrQ0EFdqRVVXavRA/132"){
        //   console.log("qwqwqwqqw2");
          
        //   wx.removeStorageSync('token')
        //   _this.goLoginPageTimeOut()
        //   return
        // }


        WXAPI.checkToken(token).then(function (res) {
          if (res.code != 0) {
            wx.removeStorageSync('token')
            _this.goLoginPageTimeOut()
            return
          }
        })

        // wx.checkSession({
        //   fail() {
        //     _this.goLoginPageTimeOut()
        //     return
        //   }
        // })
        // 已经处于登录状态，检测是否强制需要手机号码
        // if (CONFIG.requireBindMobile) {
        //   WXAPI.userDetail(token).then(function (res) {
        //     if (res.code == 0) {
        //       if (!res.data.base.mobile) {
        //         wx.navigateTo({
        //           url: "/pages/authorize/bindmobile"
        //         })
        //       }
        //     }
        //   })
        // }    
    }
});