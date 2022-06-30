const app = getApp();
const dialog = require("../../utils/dialog")
const api = require('../../utils/api.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    user: null,
  },
  attached() {
    const that = this
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    api.userGet({
    }).then((res) => {
      that.setData({
        user: res.data
      })
      wx.hideLoading()
    })
  },
  ready() {
  },
  methods: {
    showQrcode() {
      wx.previewImage({
        urls: ['https://cdn.ghostsf.com/me-wx.jpeg'],
        current: 'https://cdn.ghostsf.com/me-wx.jpeg' // 当前显示图片的http链接      
      })
    },
    goToHistory(event) {
      wx.navigateTo({
        url: '/pages/me/history'
      })
    },
    goToCollect(event) {
      wx.navigateTo({
        url: '/pages/me/collect'
      })
    },
    userComplete() {
      // 需要用户点击并授权之后才能获取和完善用户信息
      wx.getUserProfile({
        desc: '用于完善用户基本信息',
        success: (res) => {
          console.log(res)
          api.updateUser({
            nickName: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl,
            gender: res.userInfo.gender
          }).then((res) => {
            dialog.successDialog('更新成功')
            api.userGet({
            }).then((res) => {
              that.setData({
                user: res.data
              })
              wx.hideLoading()
            })
          })
        }
      })
    }
    // goToSubscribe() {
    //   // 请求消息订阅的权限
    //   wx.requestSubscribeMessage({
    //     tmplIds: ['gcm5blboAoAEBicRiojCPlLqnHCxOB1SD0ALKB9No1M'],
    //     success(res) {
    //       if (res['gcm5blboAoAEBicRiojCPlLqnHCxOB1SD0ALKB9No1M'] != 'accept') {
    //         wx.showModal({
    //           title: '温馨提示',
    //           content: '请允许我们向您发送订阅消息，这样才能及时收到通知',
    //           showCancel: false,
    //           success: function (res) {
    //             wx.openSetting({
    //               success: (res) => {
    //                 console.log(res);
    //               },
    //             });
    //           }
    //         });
    //       } else {
    //         // 订阅次数+1
    //         var openid = AV.User.current().attributes.authData.lc_weapp.openid;
    //         const query = new AV.Query('Member').equalTo('openid', openid);
    //         query.first().then((member) => {
    //           if (member) {
    //             member.set('msgCount', member.get('msgCount') + 1);
    //             member.save().then(()=>{
    //               wx.showToast({
    //                 title: '订阅成功',
    //                 icon: 'success'
    //               });
    //               wx.redirectTo({
    //                 url: './index?PageCur=me'
    //               })
    //             });
    //           }
    //         });
    //       }
    //     }
    //   })

    // }
  }
})