//一些注释  
// runs =1 客户端弹框 
// runs =2 客户端 开始滚动
// runs =3 客户端 停止 显示中奖名单
// runs =0 客户端关闭弹窗
var Base64 = require("../../utils/base64.js");

var app = getApp();
var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js');

const Animation = require('Animation.js');
const Circle = require('Circle.js');
var utils = require('../../utils/util.js');

const skinCanvas = require('../../utils/skin-canvas.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    accept: {},
    activity_type: 0,
    // addlist: [], //用户地址列表
    animationData: {},
    animationCicleData: {},
    applets: {},
    AuthAddress: false, //授权框显示开关
    canfollow: false, //是否显示公众号关注
    // checkAdd: {},
    copy_content: '', //复制内容
    copy_title: '', //复制提示
    cover: '', //封面图
    detail: '', //详情
    duijiang: '',
    duijiang_wx_img: '',
    duijiang_wx_account: '',
    duijiang_phone: '',
    free_ad: 0, //是否免广告
    gamelist: [],
    have_address: 0, //是否填写收货地址
    have_address_id: 0,
    have_address_info: null,
    intersitialAd: '',
    is_group: 0, //是否群抽奖 默认公开抽奖
    iscanZAN: false, //是否可赞赏
    isCreator: '', //是否是创建者
    isError: false, //是否是网络问题
    isfetched: false, //是否异步成功
    isFirstClose: 0, //是否是第一次关闭中奖提示弹窗
    isFirstShow: true, //第一次弹框
    isJoin: '', //是否参与
    isSHowJockpot: false, //显示奖池 弹框
    isSHowmodalPassword: false,
    isSHowmodalTel: false, //是否显示电话输入框
    isShowWin: 0, //是否显示中奖弹框
    joinGameList: [], //推荐游戏列表
    joinUsers: [], //参与用户
    lid: null, //详情id
    list: [], //奖项列表
    live_id: '', //现场抽奖版本id
    loadNum: 0, //网络加载次数
    loadTimer: '', //网络加载计时器
    lotteryTime: '', //开奖时间
    MaxAwaitNum: 10,
    model: 0, //手机型号
    navBar: {}, //自定义导航对象
    offline_desc: '', //下架说明
    offset: 0, //当前页码
    openPrize: false,
    order_id: 0, //订单号
    pageIn: 'detail', //广告标识页
    panimagePath: '',
    password2: '', //验证面
    pointImg: '../../images/panPoint.png',
    pool_open: 0,
    prize: '', //中奖名次
    prize_desc: '', //奖品介绍
    prize_img: [], //奖品图片
    prize_info: {}, //中奖信息
    prize_psw: '', //密码
    prizeDetail: {}, //奖项详情
    prizeing: false, // 中奖球
    prizeYao: false,
    shareImg: '', //生成的分享图
    show_psw: false, //创建者是否显示口令
    showJoinGame: false, //显示参与后游戏推荐
    showMorePrize: false, //显示参与更多抽奖
    showPC: false,
    showQueue: false, //是否显示排队弹框
    showRefresh: false, //是否显示刷新按钮
    showyaoqing: 'false', //显示邀请框
    socketOpen: false, //
    sponsor_phone: '', //创建者手机号
    status: '', //活动状态 0等待开奖 1 开奖中 2已结束
    // showAddList: false,
    // showAddress: '',
    // showtipsUser: {},
    // showzjtips: false,
    taste_icon: '',
    timer: null,
    title: '', //标题
    token: '',
    touch: { x: 0, y: 0, isPressed: false },
    turnWheel: {
      rewardNames: [], //转盘奖品名称数组 
      colors: ["#e9e0ff", "#7021e8", "#ffcab3"], //转盘奖品区块对应背景颜色 
      fontColor: ["#7021e8", "#ffffff", "#E5302F"],
      outsideRadius: 192, //转盘外圆的半径 
      textRadius: 155, //转盘奖品位置距离圆心的距离 
      insideRadius: 5, //转盘内圆的半径 
      startAngle: 0, //开始角度  
      bRotate: false //false:停止;ture:旋转 
    },
    type: 5,
    uid: '',
    users: [], // 刚加的 修复bug users
    users: [], //参与用户
    wheelImg: '../../images/wheel.png',
    win_num: 0, //中奖人数
    winUser: [], //中奖用户

    isRun: false,
    userTimer: 0,

    winStatus: 1,
    isStart: false,
    skin_id: 0,

    isFIrstCanvas: 0,

    
    innerAudioContext:'', //圣诞音乐
    musicPlay:false, //圣诞音乐播放中
    device:'',
    skins:[{name:'默认',value:'0'},{name:'圣诞',value:'1'},{name:'春节',value:'3'},{name:'七夕',value:'4'},{name:'中秋',value:'5'},{name:'元旦',value:'6'}], //标准皮肤,{name:'元旦',value:'2'}
  },




  drawWheelCanvas: function () {
    var that = this;
    if (this.data.skin_id == 1||this.data.skin_id == 3) {
      this.setData({
        'turnWheel.colors': ["#f6eced", "#f1cbb3", "#f5f6eb"],
        'turnWheel.fontColor': ["#ce1c33", "#ce1c33", "#ce1c33"],
      })
    }
    else if (this.data.skin_id == 4 || this.data.skin_id == 5) {
      this.setData({
        'turnWheel.colors': ["#eaeef9", "#ffffff", "#f4ece7"],
        'turnWheel.fontColor': ["#c64e6a", "#c64e6a", "#c64e6a"],
      })
    }
    else if(this.data.skin_id == 6){
      this.setData({
        'turnWheel.colors':["#f8e6b2", "#f3b39c", "#e9fde5"],
        'turnWheel.fontColor': ["#de4333", "#de4333", "#de4333"],
      })
    }
    else if(this.data.skin_id == 2){
      this.setData({
        'turnWheel.colors': ["#f9f5ec", "#e9dcac", "#f5f8dc"],
        'turnWheel.fontColor': ["#8f6d07", "#8f6d07", "#8f6d07"],
      })
    }
    else if (this.data.skin_id == 0) {
      this.setData({
        'turnWheel.colors': ["#e9e0ff", "#7021e8", "#ffcab3"],
        'turnWheel.fontColor': ["#7021e8", "#ffffff", "#E5302F"],
      })
    }

    clearInterval(this.data.canvansTimer);

    // 获取canvas画板，相当于layer？？
    var ctx = wx.createCanvasContext('wheelCanvas');
    //    var canvas = ($("#wheelCanvas")).get()[0]; // 注意，jQuery获取的是包装过的对象，不是DOM对象,可以进行转换

    // 计算每块占的角度，弧度制
    var baseAngle = Math.PI * 2 / (this.data.turnWheel.rewardNames.length);
    // 获取上下文
    // var ctx = canvas.getContext("2d");

    var canvasW = this.data.cw; // 画板的高度
    var canvasH = this.data.ch; // 画板的宽度
    //在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, canvasW, canvasH);

    //strokeStyle 绘制颜色
    ctx.strokeStyle = "#630aec"; //  
    if (this.data.skin_id == 1||this.data.skin_id == 3) {
      ctx.strokeStyle = "#ffffff";
    }
    if (this.data.skin_id == 2||this.data.skin_id == 4 || this.data.skin_id == 5||this.data.skin_id ==6) {
      ctx.strokeStyle = "#ffffff";
    }
    //font 画布上文本内容的当前字体属性
    ctx.setFontSize(12);

    //注意，开始画的位置是从0°角的位置开始画的。也就是水平向右的方向。
    //画具体内容
    for (var index = 0; index < this.data.turnWheel.rewardNames.length; index++) {
      // 当前的角度
      var angle = this.data.turnWheel.startAngle + index * baseAngle - Math.PI / 2;
      // 填充颜色
      ctx.fillStyle = this.data.turnWheel.colors[index % 3];
      if (index == this.data.turnWheel.rewardNames.length - 1) {
        if ([index % 3] == 0) {
          ctx.fillStyle = this.data.turnWheel.colors[1];
        }
        else {
          ctx.fillStyle = this.data.turnWheel.colors[index % 3];
        }

      }

      // 开始画内容
      // ---------基本的背景颜色----------
      ctx.beginPath();
      /*
       * 画圆弧，和IOS的Quartz2D类似
       * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
       * x :圆的中心点x
       * y :圆的中心点x
       * sAngle,eAngle :起始角度、结束角度
       * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
       * */
      ctx.arc(canvasW * 0.5, canvasH * 0.5, this.data.turnWheel.outsideRadius, angle, angle + baseAngle, false);
      ctx.arc(canvasW * 0.5, canvasH * 0.5, this.data.turnWheel.insideRadius, angle + baseAngle, angle, true);
      ctx.stroke();
      ctx.fill();
      //保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
      ctx.save();

      /*----绘制奖品内容----重点----*/
      // 字体颜色
      ctx.fillStyle = this.data.turnWheel.fontColor[index % 3];
      if (index == this.data.turnWheel.rewardNames.length - 1) {
        if ([index % 3] == 0) {
          ctx.fillStyle = this.data.turnWheel.fontColor[1];
        }
        else {
          ctx.fillStyle = this.data.turnWheel.fontColor[index % 3];
        }

      }
      var rewardName = this.data.turnWheel.rewardNames[index];
      var line_height = 17;
      // translate方法重新映射画布上的 (0,0) 位置
      // context.translate(x,y);
      // 见PPT图片，
      var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.data.turnWheel.textRadius;
      var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.data.turnWheel.textRadius;
      ctx.translate(translateX, translateY);

      // rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
      // angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90° + 垂直的角度90°
      ctx.rotate(angle + baseAngle / 2 + Math.PI / 2 + Math.PI / 2);

      /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
      // canvas 的 measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
      // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色. fillStyle 属性以另一种颜色/渐变来渲染文本
      /*
       * context.fillText(text,x,y,maxWidth);
       * 注意！！！y是文字的最底部的值，并不是top的值！！！
       * */
      // if (rewardName.indexOf("M") > 0) {
      //   //查询是否包含字段 流量包
      //   var rewardNames = rewardName.split("M");
      //   for (var j = 0; j < rewardNames.length; j++) {
      //     ctx.font = (j == 0) ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
      //     if (j == 0) {
      //       ctx.fillText(rewardNames[j] + "M", -ctx.measureText(rewardNames[j] + "M").width / 2, j * line_height);
      //     } else {
      //       ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
      //     }
      //   }
      // } else if (rewardName.indexOf("M") == -1 && rewardName.length > 6) {//奖品名称长度超过一定范围
      //   rewardName = rewardName.substring(0, 6) + "||" + rewardName.substring(6);
      //   var rewardNames = rewardName.split("||");
      //   for (var j = 0; j < rewardNames.length; j++) {
      //     ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
      //   }
      // } else {
      //在画布上绘制填色的文本。文本的默认颜色是黑色

      ctx.setTextAlign = "center";
      if (this.data.turnWheel.rewardNames.length <= 4) {
        ctx.setFontSize(18)
      }
      else if (this.data.turnWheel.rewardNames.length == 5) {
        ctx.setFontSize(16)
      }
      else if (this.data.turnWheel.rewardNames.length == 6) {
        ctx.setFontSize(14)
      }
      else if (this.data.turnWheel.rewardNames.length > 6) {
        ctx.setFontSize(12)
      }

      ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
      // }

      //添加对应图标
      // if (rewardName.indexOf("Q币") > 0) {

      //   // 注意，这里要等到img加载完成才能绘制
      //   // imgQb.onload = function () {
      //   //   ctx.drawImage(imgQb, -15, 10);
      //   // };
      //   ctx.drawImage('../../images/qb.png', -15, 10);

      // } else if (rewardName.indexOf("谢谢参与") >= 0) {
      //   // imgSorry.onload = function () {
      //   //   ctx.drawImage(imgSorry, -15, 10);
      //   // };

      // }
      //还原画板的状态到上一个save()状态之前
      ctx.restore();

      /*----绘制奖品结束----*/
    }
    ctx.drawImage('../../images/panMask.png', this.data.cw / 2 - this.data.turnWheel.outsideRadius, this.data.ch / 2 - this.data.turnWheel.outsideRadius, this.data.turnWheel.outsideRadius * 2, this.data.turnWheel.outsideRadius * 2); //绘制阴影
    ctx.save()
    ctx.beginPath();
    ctx.draw(false, () => {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'wheelCanvas',
          success: (res) => {
            var tempFilePath = res.tempFilePath;
            that.setData({
              panimagePath: tempFilePath,
              wheelImg: tempFilePath,
            });
            wx.hideLoading();

          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 1000)

    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
      device:app.globalData.device,
    })
    this.data.navBar.statusBarHeight = app.globalData.statusBarHeight;
    this.data.navBar.title = '演示案例';
    var pages = getCurrentPages();
    var le = pages.length;
    if (le < 2) {
      this.data.navBar.type = 1;
    } else {
      this.data.navBar.type = 2;
    }
    this.setData({
      navBar: this.data.navBar,
    })
    this.setData({
      canfollow: app.globalData.canfollow,
      model: app.globalData.model,
      skin_id: options.skin_id || 0
    })

    var _this = this;
    //  console.log(options);
    var scene = decodeURIComponent(options.scene);
    if (scene != 'undefined') {
      this.setData({
        lid: scene,
        //lid:49,
      })
    } else {
      this.setData({
        lid: options.id
        //lid:49,
      })
    }

    let token = wx.getStorageSync('token');
    let uid = wx.getStorageSync('uid');









    //不允许分享
    wx.hideShareMenu();

    var t = setTimeout(() => {
      this.openPrize();
    }, 1000)



    wx.getSystemInfo({
      success: res => {
        console.log(res.windowWidth)
        this.setData({
          cw: res.windowWidth,
          ch: res.windowWidth * (542 / 750),

        });

        this.setData({
          'turnWheel.outsideRadius': this.data.ch / 2 - 5,
          'turnWheel.textRadius': this.data.ch / 2 - 50,
        })
      },
    });

    this.getPrizeDetail();
    this.innerAudioContext = wx.createInnerAudioContext()// 创建圣诞音乐对象

    // 圣诞皮肤下雪
    var canvas;
    var $;
    var w;
    var h;
    // 圣诞皮肤下雪
    if (this.data.skin_id == 1 || this.data.skin_id == 3) {
      if(this.data.device == 1){
        skinCanvas.runSnow(this, this.data.skin_id);
      }
      else{
        if(this.data.skin_id==1){
          this.innerAudioContext.src = 'https://static.2719.cn/Uploads/sd-music.mp3';
        }
        else if(this.data.skin_id==3){
          this.innerAudioContext.src = 'https://static.2719.cn/Uploads/chunjie1.mp3';
        }
        this.setData({
          musicPlay:true
        });

      }
      

    }
    else if (this.data.skin_id == 2 || this.data.skin_id == 6) {
      // this.runYanhua();
      if(this.data.device == 1){
        skinCanvas.runYanhua(this, this.data.skin_id);
      }
      else{
        this.innerAudioContext.src = 'https://static.2719.cn/Uploads/happyNewYear.mp3';
        this.setData({
          musicPlay:true
        });
      }
      
    }
    else if(this.data.skin_id == 4){
      this.innerAudioContext.src = 'https://static.2719.cn/Uploads/qx.mp3';
      this.setData({
        musicPlay:true
      });
    }

    else if(this.data.skin_id == 5){
      this.innerAudioContext.src = 'https://static.2719.cn/Uploads/zq.mp3';
      this.setData({
        musicPlay:true
      });
    }

    if(this.innerAudioContext && this.data.skin_id != 0) {
      this.innerAudioContext.play();
    
    }



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isFirstShow) {
      this.setData({
        showRefresh: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.userTimer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('ShareInfo');
    app.globalData.socket.emit('leaveroom', this.data.lid);

    clearInterval(this.data.userTimer);

    this.innerAudioContext.destroy();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let token = wx.getStorageSync('token');
    let uid = wx.getStorageSync('uid');
    this.setData({
      users: [],
      offset: 0,
    })

    // this.checkQueue();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  musicHander:function(){
    this.setData({
      musicPlay:!this.data.musicPlay,
    });
    if(this.data.musicPlay){
      this.innerAudioContext.play()
    }
    else{
      this.innerAudioContext.pause()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var username = wx.getStorageSync('username');
    var title = this.data.title;
    if (this.data.activity_type == 2) {
      title = username + '邀请您参与[' + this.data.list[0].name.replace(/\s/g, '') + ']抽奖';
    }
    if (this.data.is_group == 1) {

    } else {
      wx.showShareMenu({
        withShareTicket: true
      });
    }
    this.setData({
      showyaoqing: false,
    })
    var _this = this;
    return {
      title: title,
      path: '/pages/jackpot/detail?id=' + this.data.lid,
      imageUrl: this.data.shareImg,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log('分享失败');
      }
    }
  },



  getPrizeDetail(lid) {
    var _this = this;
    var res = {};
    res.data = { "code": 200, "msg": "", "data": { "id": "281192", "title": "", "is_advanced": "1", "is_fission": "", "introduction": "本页面仅作为演示之用，不兑奖！", "password": "", "is_join": "1", "cover": "..\/..\/images\/detailbg.png", "uid": "1889282", "type": "5", "is_group": "1", "group_ids": "", "lotnum_start": "0", "lotnum_end": "0", "prize_time": "", "prize_num": "", "count_join_num": "10086", "status": "0", "is_publish": "1", "is_show": "1", "order_id": "0", "activity_type": "3", "live_id": "1001", "sponsor_phone": "18912608450", "img_qrcode": "", "img_share": "", "copy_title": "\u5fae\u4fe1\u641c\u7d22", "copy_content": "\u62bd\u5956\u5927\u8f6c\u76d8", "prize_desc": "", "prize_img": ["https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fbefb1acf.jpg?x-oss-process=style\/img_jpg_yasuo", "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fbefc48ca.jpg?x-oss-process=style\/img_jpg_yasuo"], "applets": { "name": "\u62bd\u5956\u5927\u8f6c\u76d8", "path_title": "", "appid": "", "path": "" }, "source": "3", "create_time": "1568078856", "tags": "", "offline_desc": "", "is_home": "0", "skin": "", "need_score": "0", "gzh_account": "", "gzh_name": "", "is_gzh": "0", "layer_title": "", "layer_copy": "", "watch_video": "0", "pool_open": "1", "pool_endtime": "0", "duijiang": "2", "duijiang_phone": "18888888888", "duijiang_wx_account": "choujiangdazhuanpan", "duijiang_wx_img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76f8073dca8.jpg", "free_ad": 0, "isCreator": 1, "lists": [{ "id": "608528", "title": "\u4e00\u7b49\u5956", "name": "iPhone XS", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fadc36beb.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "1", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [{ "id": "14737252", "username": "\u6d6e\u6c89\u6620\u6708\u8272", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/O64LlficnzzvsWaicdnsxCLKtv34TGA7nWUsHw4iagbkBdZeTkd7Ng68CCQicp0PBCemjEFo7QJIBTpO3XQxSUHovQ\/132", "create_time": "2019-09-10 11:05" }, { "id": "14737230", "username": "\u749f\u65e0\u67d3", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/smIOwOtBb8Xk0ckXPKqU3Dj31Kr08cOPH7KjyPjQsmiaN7u2y7EU26ypP1226rmnMibOvK6ZQqT6u4JR9MEicclvg\/132", "create_time": "2019-09-10 11:05" }, { "id": "14737202", "username": "\u5929\u8d4b\u5409\u8fd0", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/8iaUIfCF3MxWFB8H8W7g01KfZ5rRAHicsP8kSC7cia26YR5IYIhnicLqueWD2R5AFn185niabHhOXUJDbqwmticXx5dA\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737201", "username": "Cc\ud83e\udd68\u00b2\u2070\u00b9\u2079", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83erbhOo5J9kwCHSUDZZHgLQZKuyFgr2xDiazWKLd0FpTBvgHlEKxppI8ibGxI7zicL4Lm8naFAEoPc9icw\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737200", "username": "\ud83d\udc1b", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/1b1BeJfo6fDFONpg2U5DkVTHJxFv8ZZWpp8AaVKELU8qZj7RW8Tf5sAjk1FGZxH4WBibSGCLQIobNCuAtUibsYUw\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737199", "username": "Cc\ud83e\udd68\u00b2\u2070\u00b9\u2079", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83epolTDWq2Eia0WGANy7VacRG7bwWWfiaWEjjPYHbiaPQLt9qofnDJhUGPS7wnbHCNibX80AxlxmHuD6gg\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737198", "username": "Cc\ud83e\udd68\u00b2\u2070\u00b9\u2079", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKDvs1WZqEVZU28XN7iauK72HYQyIHVDHFrVZAqpQWWCgYIOvHE1HzheqtC5JQcQbozIugmia8dlPTg\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737197", "username": "\u00a0A\u4e9a\u9759", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/nPJlEXI4VWxKiafI336aSKEgib4vh08KljLPib22Bq7iaHtsUtMhcU2librbvt6ic4SqqKPaYAoiaJRmkrJiaMiaficghN9g\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737196", "username": "\u5b81\u831c", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/A90QLcVZU8y6f2TIgwnQttXf66MDV79RZUkaKEhEmicecHNVty1cibjyfWIxmSBsqAnDQ6JEhTSGyg9Xkrmb9yZw\/132", "create_time": "2019-09-10 11:03" }, { "id": "14737195", "username": "\u5929\u8d4b\u5409\u8fd0", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKibGtIdiaibXCvCLHx3SpQ1M9IuwPbPOUtlqgOBU8kNkalbqwyriaaC2qhN2Uw8z29uyobulRhRFY73w\/132", "create_time": "2019-09-10 11:03" }] }, { "id": "608529", "title": "\u4e8c\u7b49\u5956", "name": "iPhone 8", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fae376882.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "2", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608530", "title": "\u4e09\u7b49\u5956", "name": "\u5c0f\u7c73\u7b14\u8bb0\u672c", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76faea3fbb3.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "3", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608531", "title": "\u56db\u7b49\u5956", "name": "\u5c0f\u7c73\u624b\u673a", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76faf698ab3.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "4", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608532", "title": "\u4e94\u7b49\u5956", "name": "\u5c0f\u7c73\u952e\u76d8", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fafe4922f.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "5", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608533", "title": "\u516d\u7b49\u5956", "name": "\u5c0f\u7c73\u65e0\u7ebf\u9f20\u6807", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fb08f3c68.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "6", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608534", "title": "\u4e03\u7b49\u5956", "name": "\u5c0f\u7c73\u9f20\u6807\u57ab", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fb36c6d65.png", "num": "1", "pernum": "1", "hasnum": "0", "sort": "7", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }, { "id": "608535", "title": "\u5e78\u8fd0\u5956", "name": "1\u5143\u73b0\u91d1\u7ea2\u5305", "img": "https:\/\/static.2719.cn\/Uploads\/lottery\/190910\/5d76fb3ea157d.png", "num": "999", "pernum": "13", "hasnum": "0", "sort": "8", "status": "1", "prize": null, "prize_time": null, "goods_id": "0", "goods_price": null, "type": "0", "amount": "0", "score": "0", "fake": "0", "jump": "0", "jump_info": "", "users": [] }], "win_num": 0, "user_list": [], "sponsor": { "username": "  ", "avatar": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83ersSriaJhicRV0hC1PngT0LUEf0JGvBohibvohS5dBibqicAS5vS02w78h8Fd6lE3qCn1acsAsvZjE6Z6A\/132", "phone": "18912608450", "qrcode_url": null }, "is_first": 0, "prize": "", "prize_info": [], "isJoin": 0, "lottery_code": "", "have_address": 0, "have_address_info": "", "isShow": null } };
    if (res.data.code == 200) {

      wx.stopPullDownRefresh();
      clearInterval(this.data.loadTimer);

      this.setData({
        showRefresh: false,
        isfetched: true,
        isFirstShow: false,
        list: res.data.data.lists,
        title: res.data.data.title,
        prizetitle: res.data.data.title,
        isJoin: res.data.data.isJoin,
        isCreator: res.data.data.isCreator,
        prize: res.data.data.prize,
        status: res.data.data.status,
        is_group: res.data.data.is_group,
        isadvanced: res.data.data.is_advanced == '0' ? false : true,
        isCreateCanJoin: res.data.data.is_join == '0' ? false : true, //创建者是否可参与抽奖
        cover: res.data.data.cover,
        order_id: res.data.data.order_id,
        lotteryTime: res.data.data.prize_time,
        isShowWin: res.data.data.is_first,
        sponsor_phone: res.data.data.sponsor_phone,
        copy_title: res.data.data.copy_title,
        copy_content: res.data.data.copy_content,
        prize_desc: res.data.data.prize_desc,
        prize_img: res.data.data.prize_img,
        users: res.data.data.user_list,
        count: res.data.data.count_join_num,
        offline_desc: res.data.data.offline_desc,
        activity_type: res.data.data.activity_type,
        live_id: res.data.data.live_id,
        prize_info: res.data.data.prize_info,
        lottery_code: res.data.data.lottery_code,

        free_ad: res.data.data.free_ad,
        pool_open: res.data.data.pool_open,

        win_num: res.data.data.win_num,

        duijiang: res.data.data.duijiang,
        duijiang_wx_img: res.data.data.duijiang_wx_img,
        duijiang_wx_account: res.data.data.duijiang_wx_account,
        duijiang_phone: res.data.data.duijiang_phone,
      });
      if (res.data.data.have_address_info != undefined) {
        this.setData({
          have_address_info: res.data.data.have_address_info,
        })
      }
      if (res.data.data.have_address != undefined) {
        this.setData({
          have_address: res.data.data.have_address,
        })
      }
      if (res.data.data.status > 0) {
        this.setData({
          isfirst: false,
        })
      }
      if (res.data.data.applets.name != undefined) {
        this.setData({
          applets: res.data.data.applets
        })
      }
      if (res.data.data.have_address_id != undefined) {
        this.setData({
          have_address_id: res.data.data.have_address_id,
        })
      }
      //判断如果存在订单手机号为空的情况下 需要补充手机号
      if ((this.data.order_id != 0 && this.data.order_id != null) && this.data.sponsor_phone == "" && this.data.isCreator == 1 && this.data.activity_type != 3) {
        // console.log('没有填写手机号');
        this.setData({
          isSHowmodalTel: true,
        })
      }
      this.data.list.forEach((v, i) => {
        v.page = 1;
        v.fetch = false;
      });
      this.setData({
        list: this.data.list,
      })
      if (res.data.data.sponsor.phone != undefined) {
        this.setData({
          createTel: res.data.data.sponsor.phone, //发起人手机号
        })
      }
      if (res.data.data.sponsor.qrcode_url != undefined) {
        this.setData({
          createEwm: res.data.data.sponsor.qrcode_url, //发起人二维码
        })

      }
      if (res.data.data.sponsor.avatar != undefined) {
        this.setData({
          avatar: res.data.data.sponsor.avatar,
        })

      }
      if (res.data.data.sponsor.username != undefined) {
        this.setData({
          username: res.data.data.sponsor.username
        })

      }
      this.setData({
        prize_psw: res.data.data.password, //抽奖口令
        createDes: res.data.data.introduction, //抽奖介绍   
        cover: res.data.data.cover,
      })

      //未中奖第一次打开 显示弹框
      var noWin = wx.getStorageSync('nw' + this.data.lid);
      if (noWin == "" && this.data.status == 2) {
        this.setData({
          isShowWin: true,
        });


      } else if (noWin != "" && this.data.status == 2) {
        if (this.data.isCreator == 0 && this.data.activity_type != 3 && this.data.free_ad != 1) {

        }


        
      } else if (this.data.status == 0) {
      
      }


      this.showdetail(this.data.lid);
      //this.comingPrize();
      this.getJoinGameList();

      var arr = [];
      var arr2 = [];
      this.data.list.forEach((v, i) => {
        arr.push(v.title);
        v.users.forEach((vv, ii) => {
          vv.detail_name = v.name;
          vv.detail_title = v.title;
          arr2.push(vv);
        })
      });
      this.data.turnWheel.rewardNames = arr;
      this.setData({
        turnWheel: this.data.turnWheel,
        winUser: arr2,
      })
      this.drawWheelCanvas();

      // if (this.data.winUser.length > 2) {
      //   this.data.userTimer=setInterval(()=>{
      //     console.log('Timer');
      //     this.cgAnimate(this.data.winUser.length);
      //   }, 1000 * this.data.winUser.length)

      // }



    }

  },

  //开始抽奖
  startPrize(type) {
    if (this.data.isStart) {
      wx.showToast({
        title: '点击太快了，稍等片刻',
        icon: 'none'
      })
      return false;
    }
    this.data.isStart = true;
    // if (this.data.isRun){
    //   wx.showToast({
    //     title: '您已参与',
    //     icon:'none',
    //   })
    //   return false;
    // }
    const animation = wx.createAnimation({


    });
    this.animation = animation;
    var slicePrizes = this.data.turnWheel.rewardNames;
    var prizeIndex = Math.round(Math.random() * (this.data.list.length - 1));
    var angle = 360 / (this.data.turnWheel.rewardNames.length);
    // 计算奖品角度
    var degrees = utils.getRandom(prizeIndex * angle + angle, prizeIndex * angle);
    this.animation.rotate(0).step({ timingFunction: 'step-start' });
    this.animation.rotate(3600 - degrees).step({ timingFunction: 'ease-in-out', duration: 4 * 1000 });
    this.setData({
      animationCicleData: this.animation.export()
    });
    this.data.prize_info = {
      detail_title: this.data.list[prizeIndex].title + '(演示)',
      detail_name: this.data.list[prizeIndex].name + '（演示）',
      detail_img: this.data.list[prizeIndex].img,
    },
      setTimeout(() => {
        this.setData({
          isShowWin: 1,
          winStatus: 1,
          status: 1,
          prize_info: this.data.prize_info,
          isRun: true,
        });
        setTimeout(() => {
          this.setData({
            winStatus: 2,
          });
        }, 100)
        this.data.isStart = false;
      }, 4500)







  },
  closeJockpot: function () {
    this.setData({
      isSHowJockpot: false,
    })
  },
  closePanWinBox: function () {
    this.setData({
      isShowWin: 0,
    })
  },
  //发送中奖者
  fatchWinUsers() {

  },

  //公众号抽奖

  makeGZH() {
  
    this.setData({
      showyaoqing: false,
      showGZH: true,
    });

    // wx.showModal({
    //   title: '提示',
    //   content: '公众号抽奖需要先关联我方抽奖小工具,然后在公众号管理后台插入小程序卡片，添加此路径“pages/share/share?id=' + this.data.lid + '”即可发布抽奖。需要关联服务请绑定appid:wx25bd16dee2ab6c5d,等待我方审核,请耐心等待',
    // })
  },
  makeGroup() {
 
  },
  closeModalGZH: function () {
    this.setData({
      showGZH: false,
      showPC: false
    });
  },
  copy: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copytxt,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },


  //邀请参与者
  yaoqing() {
    this.setData({
      showyaoqing: true,
    })


  },
  hideyaoqing() {
    this.setData({
      showyaoqing: false,
    })
  },
  setLottery(e) {
    //  console.log(e);

    if (this.data.pool_open == 1) {
      wx.showToast({
        title: '活动正在进行中，请先暂停抽奖再编辑',
        icon: 'none'
      })
      return false;
    }

    var url = '/pages/create/index?id=' + e.currentTarget.dataset.id + '&isJoin=' + this.data.isJoin + '&activity_type=' + this.data.activity_type;
    if (this.data.activity_type == 3) {
      url += '&live_id=' + this.data.live_id
    }
    wx.navigateTo({
      url: url,
    });
  },
  showdetail(token) {
    wx.request({
      url: app.globalData.api + '/Lists/' + this.data.lid + '/hide',
      header: {
        'X-Token': wx.getStorageSync('token'),
      },
      method: 'PUT',
      data: {
        is_show: 1
      },
      success: res => {

      }
    })
  },
  zanshangKG() {
    var pay = wx.getStorageSync('pay');
    if (pay != undefined) {
      this.setData({
        iscanZAN: pay,
      })
    }
  },



  //去赞赏
  gozanshang(e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/praise/index?id=' + this.data.lid,
    })

  },


  //通知客户端 
  pushCS(obj) {
    ///Lists/:id / send /
    app.globalData.socket.emit('messagev2', {
      "obj": this.data.lid,
      "data": obj
    });
  },
  getAddress: function (e) {
    var url = '/pages/user/addedit?id=' + this.data.lid;
    // console.log(this.data.lotteryTime);
    if (this.data.lotteryTime) {
      url = url + '&t=' + new Date(this.data.lotteryTime.replace(/\-/g, '/')).getTime();
    }
    //console.log(url);

    if (e.currentTarget.dataset.type == 2) {
      url = url + '&type=2';
    }
    wx.navigateTo({
      url: url
    })

  },
  passwordInput: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },
  telInput: function (e) {
    this.setData({
      sponsor_phone: e.detail.value
    })
  },
  queryPassword: function (e) {
    if (this.data.password2 != this.data.prize_psw) {
      wx.showToast({
        title: '口令错误',
        icon: 'none',
      })
    } else {
      this.setData({
        isSHowmodalPassword: false,
      })
      wx.setStorageSync('prize_psw' + this.data.lid, this.data.prize_psw);
      this.joinPrize(e);
    }
  },
  postTel: function (e) {
    if (this.data.sponsor_phone == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
      })
      return false;
    }
    wx.request({
      url: app.globalData.api + '/lists/' + this.data.lid + '/contact.html',
      header: {
        'X-Token': wx.getStorageSync('token'),
      },
      method: 'put',
      data: {
        phone: this.data.sponsor_phone,
      },
      success: res2 => {
        if (res2.data.code == 200) {
          wx.showToast({
            title: '提交成功',
          })
          this.setData({
            isSHowmodalTel: false,
          })
        } else {
          wx.showToast({
            title: res2.data.msg,
            icon: 'none',
          })

        }

      }
    })
  },
  showEwm: function () {
    wx.previewImage({
      urls: [this.data.createEwm],
    })
  },
  viewPirzeImg: function () {
    wx.previewImage({
      urls: [this.data.cover],
    })
  },
  goAllJoin: function (e) {
    wx.navigateTo({
      url: '/pages/join/list?id=' + this.data.lid,
    })
  },
  goAllWin: function (e) {
    console.log('=========gowin')

    wx.navigateTo({
      url: '/pages/component/pages/win/list',
    })
  },
  creatPirze: function (e) {
    if (this.data.isCreator == 1) {
    
  
    } else {
   
    }
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  close_modelWin: function (e) {
    this.getPrizeDetail(this.data.lid);
    this.setData({
      isShowWin: 0,
      isFirstClose: 1,
    });
    if (this.data.isCreator == 0 && this.data.activity_type != 3 && this.data.free_ad != 1) {
      try {
        this.intersitialAd.show()
          .catch(err => console.log(err.errMsg));
      } catch (e) {
        console.log('暂不支持插屏广告')

      }
    }
  
  },
  playGame: function (e) {
    //阿拉丁自定义统计 
    var time = new Date().getTime();
    var newUser = wx.getStorageSync('newUser');
    var isNew = '0';
    if (newUser != '') {
      if (time < parseInt(newUser) + 60 * 60 * 24 * 1000) {
        isNew = '1';
      } else {
        isNew = '0';
      }
    } else {
      isNew = '0';
    }
    //导流到抽奖活动
    wx.navigateToMiniProgram({
      appId: 'wx6beb73643e10be53',
      path: 'pages/index/index?cj_form=cjxgj&ald_media_id=6313&ald_link_key=676ccada21dafe41',
      success: res => {
        this.clickCount(e);
        //阿拉丁自定义统计 
        if (e.currentTarget.dataset.playtype == 1) {
        
        } else if (e.currentTarget.dataset.playtype == 2) {
          if (this.data.isFirstClose == 1) {
          
          } else {
          
          }

        } else if (e.currentTarget.dataset.playtype == 3) {
         
        } else if (e.currentTarget.dataset.playtype == 4) {
         
        } else if (e.currentTarget.dataset.playtype == 5) {
         
        } else if (e.currentTarget.dataset.playtype == 6) {
          if (this.data.isFirstClose == 1) {
          
          } else {
           
          }

        } else if (e.currentTarget.dataset.playtype == 7) {
         
        }
      }
    })

  },
  playGame2: function (e) {
    var time = new Date().getTime();
    var newUser = wx.getStorageSync('newUser');
    var isNew = '0';
    if (newUser != '') {
      if (time < parseInt(newUser) + 60 * 60 * 24 * 1000) {
        isNew = '1';
      } else {
        isNew = '0';
      }
    } else {
      isNew = '0';
    }
    //导流到红包游戏
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.appid,
      path: e.currentTarget.dataset.path,
      success: res => {
        //查看观看过的广告list 
        var ADHadList = [];
        if (wx.getStorageSync('ADHadList') != '') {
          var ADHadList = wx.getStorageSync('ADHadList');
        }
        if (ADHadList.indexOf(e.currentTarget.dataset.appid) == -1) {
          ADHadList.push(e.currentTarget.dataset.appid);
        }

        wx.setStorageSync('ADHadList', ADHadList);
        //this.clickCount(e);
        if (e.currentTarget.dataset.playtype == 4) {
         
        } else if (e.currentTarget.dataset.playtype == 1) {
         
        } else if (e.currentTarget.dataset.playtype == 2) {
         
        } else if (e.currentTarget.dataset.playtype == 6) {
          if (this.data.isFirstClose == 1) {
           
          } else {
           
          }

        }
      }
    })

  },
  clickCount: function (e) {
    var url = app.globalData.d1fm + '?xsl_uuid=' + wx.getStorageSync('xsl_uuid') + '&xsl_origin=cjxgj' + '&xsl_to=wx6beb73643e10be53&xsl_openid=' + wx.getStorageSync('openid') + '&xsl_action=click&xsl_position=nowin&xsl_self_appid=wx25bd16dee2ab6c5d';
    app.click_count(url);

  },
  ckeckpsw: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        show_psw: true,
      })
    } else {
      this.setData({
        show_psw: false,
      })
    }
  },
  closeModalPassword: function (e) {
    this.setData({
      isSHowmodalPassword: false,
    })
  },
  closeModalTel: function (e) {
    // this.setData({
    //   isSHowmodalTel: false,
    // })
  },
  showUserInfo: function () {
   
    this.setData({
      showUserCard: !this.data.showUserCard,
    })
  },



  getJoinGameList: function () {
    var getRequest = wxRequest.getRequest(Api.getJoinGameList());
    getRequest
      .then(res => {

        if (res.data.code == 200) {
          this.data.joinGameList = res.data.data;
          for (let item in this.data.joinGameList) {

            //console.log(this.data.joinGameList[item]);
            var tempArr = this.data.joinGameList[item].slice(0);
            var j = 0;
            this.data.joinGameList[item].forEach((v, i) => {


              if (wx.getStorageSync('ADHadList') != '') {

                var ADHadList = wx.getStorageSync('ADHadList');
                if (ADHadList.indexOf(v.appid) != -1 && v.permanent == '0') {
                  tempArr.splice(i - j, 1);
                  j++;
                }
              }
            });


            this.data.joinGameList[item] = tempArr;
          }
          // this.data.joinGameList.forEach((v, i) => {
          //   this.data.joinGameList[i].path = encodeURIComponent(v.path);
          // })
          this.setData({
            joinGameList: this.data.joinGameList,
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }, reject => {
        wx.hideLoading();
        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
      })
  },
  joinGameHide: function () {
    this.setData({
      showJoinGame: false,
      showMorePrize: false,
    })
  },
  //浏览用户二维码
  showEWM: function () {
    wx.previewImage({
      urls: [this.data.createEwm],
    })
  },
  //跳转小程序埋点统计
  miniOpen: function (e) {
    var url = app.globalData.d1fm + '?xsl_uuid=' + wx.getStorageSync('xsl_uuid') + '&xsl_origin=cjxgj' + '&xsl_from=181026151255' + '&xsl_to=' + e.currentTarget.dataset.boxid + '&xsl_third_appid=' + e.currentTarget.dataset.thirid + '&xsl_third_path=' + e.currentTarget.dataset.thirdpath + '&xsl_openid=' + wx.getStorageSync('openid') + '&xsl_action=click&xsl_position=join&xsl_self_appid=wx25bd16dee2ab6c5d';
    app.click_count(url);
   
  },
  takePhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  copyBtn: function (e) {



    wx.setClipboardData({
      data: e.currentTarget.dataset.msg,
      success: res => {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  goHome: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  //奖项分页
  scrollTolower: function (e) {
    var obj = {
      lid: this.data.lid,
      id: e.currentTarget.id,
      p: this.data.list[e.currentTarget.dataset.index].page + 1
    }
    if (this.data.list[e.currentTarget.dataset.index].fetch == false) {
      wx.showLoading();
      var getRequest = wxRequest.getRequest(Api.getWinListByPage(obj));
      getRequest
        .then(res => {
          wx.hideLoading();
          if (res.data.code == 200) {
            if (res.data.data.length > 0) {
              this.data.list[e.currentTarget.dataset.index].users = this.data.list[e.currentTarget.dataset.index].users.concat(res.data.data);
              this.data.list[e.currentTarget.dataset.index].page++;
              this.setData({
                list: this.data.list,
              })
            } else {
              wx.showToast({
                title: '没有了',
                icon: 'none',
              })
              this.data.list[e.currentTarget.dataset.index].fetch = true;
              this.setData({
                list: this.data.list,
              });
            }
          } else {
            wx.showToast({
              title: '没有了',
              icon: 'none',
            })
            this.data.list[e.currentTarget.dataset.index].fetch = true;
            this.setData({
              list: this.data.list,
            });
          }
        }, reject => {
          wx.hideLoading();
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        })
    } else {


    }


  },
  openPrize: function () {
    var _this = this;
    this.setData({
      openPrize: true,
    });
    var u = setTimeout(() => {
      _this.setData({
        prizeYao: true,
      })
    }, 1500)
  },
  showTip: function (e) {
    wx.showModal({
      title: '免责声明',
      content: e.currentTarget.dataset.des,

      showCancel: false,
      confirmText: '关闭'
    })
  },
  showCover: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },

  getProduct: function (e) {

    wx.navigateToMiniProgram({
      appId: 'wx6beb73643e10be53',
      path: 'pages/autolottery/detail?id=346464&ald_media_id=6313&ald_link_key=b8a20986910fe61f',

    })
  },
  getuserinfo: function (res) {
    //  console.log(res.detail);
    if (res.detail.userInfo != undefined) {
      // console.log('has');
      // var token = wx.getStorageSync('token');
      // var openid = wx.getStorageSync('openid');
      try {

        wx.setStorageSync('username', res.detail.userInfo.nickName);
        wx.setStorageSync('avatar', res.detail.userInfo.avatarUrl);
      } catch (e) {

      }

      // 注册用户并获取token
      // if (openid == '') {
      wx.login({ // 获取code
        success: res => {
          if (res.code) {
            wx.request({
              url: app.globalData.api + 'Users/',
              data: {
                code: res.code
              },
              header: {
                'Content-Type': 'application/json',
                'X-Token': wx.getStorageSync('token'),
                'source': 1
              },
              success: res => {
                if (res.data.code == 200) {
                  //   console.log('res===', res.data)
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.setStorageSync('session_key', res.data.data.session_key);
                  this.fetchUserinfo();
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }

              },
              fail: res => {
                wx.showToast({
                  title: '网络连接失败',
                  icon: 'none'
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
          }
        }
      })
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
      })
    }

  },
  fetchUserinfo: function () {
    // 注册用户并获取token
    var data = {
      'username': wx.getStorageSync('username'),
      'avatar': wx.getStorageSync('avatar'),
      'openid': wx.getStorageSync('openid'),
      'session_key': wx.getStorageSync('session_key')
    };
    wx.request({
      url: app.globalData.api + 'Users/',
      method: 'post',
      data: data,
      header: {
        'Content-Type': 'application/json',
        'X-Token': wx.getStorageSync('token'),
        'source': 1
      },
      success: res => {
        if (res.data.code == 200) {
          wx.setStorageSync('token', res.data.data.token);
          this.setData({
            token: res.data.data.token,
          })
          wx.setStorageSync('newUser', new Date().getTime());
          wx.setStorageSync('pay', res.data.data.pay)
          var base = new Base64();
          var result2 = base.decode(res.data.data.token);
          wx.setStorageSync('uid', result2.split(',')[0]);
          this.getPrizeDetail(this.data.lid);

          this.zanshangKG();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: res => {

        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        })

      }
    })
  },

  poolOpen: function (e) {
    var data = {
      list_id: this.data.lid,
      pool_open: e.currentTarget.dataset.status
    };
    var postRequest = wxRequest.postRequest(Api.poolDraw(), data);
    postRequest
      .then(res => {
        if (res.data.code == 200) {
          this.setData({
            pool_open: e.currentTarget.dataset.status
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

      }, reject => {
        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
      })
  },

  // 接收子组件的函数
  onEWMPath: function (e) {
    this.setData({
      ewm: e.detail.ewm,
    });
    wx.previewImage({
      urls: [this.data.ewm],
    })
  },
  onImagePath: function (e) {
    this.setData({
      imagePath: e.detail.imagePath,
    });
  },
  onHideYaoqing: function () {
    this.setData({
      showyaoqing: false
    })
  },
  onHBHeight: function (e) {
    this.setData({
      HB_height: e.detail.HB_height
    })
  },
  onJoinHBHeight: function (e) {
    this.setData({
      JoinHB_height: e.detail.JoinHB_height
    })
  },
  onShareBg: function (e) {
    this.setData({
      shareImg: e.detail.shareImg
    })
  },
  //接收子组件函数




  //大转盘 中奖人滚动

  // cgAnimate: function (rd) {

  //   const animation = wx.createAnimation({

  //     timingFunction: 'linear',
  //   });
  //   this.animation = animation;
  //   wx.createSelectorQuery().select('#WinUserBox').boundingClientRect((rect) => {
  //     this.animation.translate(0, 0).step({ timingFunction:'step-start'});
  //     this.animation.translate(0, (-rect.height / 2) * rd).step({ duration: rd * 1000 });
  //     this.setData({
  //       animationData: this.animation.export()
  //     });
  //     // 节点的高度
  //   }).exec();
  // },
  //显示联系创建者
  showCreater: function () {
    wx.redirectTo({
      url: '/pages/public/ticketedit?duijiang=2&duijiang_wx_img=' + encodeURIComponent(this.data.duijiang_wx_img) + '&duijiang_wx_account=' + this.data.duijiang_wx_account + '&duijiang_phone=' + this.data.duijiang_phone + '&isshow=true',
    })
  },
  create: function () {
    wx.redirectTo({
      url: '/newpages/create/locale',
    })
  },
  // 截获竖向滑动
  catchTouchMove: function (res) {
    return false
  },

    /*
  显示皮肤选择
  */
 checkSkinHander: function () {
  this.setData({
    tempSkin: this.data.skin_id,
    showCheckSkin: 1,
  });
},
/*
皮肤选择
*/
checkSkin: function (e) {
  this.setData({
    showCheckSkin: 1,
    tempSkin: e.currentTarget.dataset.skin
  })

},
/*
关闭皮肤选择
*/
hideSkinHander:function(){
this.setData({
  showCheckSkin: 0,
})
},
/*
确认皮肤选择
*/
configSkinHander: function () {
  if (this.data.tempSkin == this.data.skin_id) {
    this.setData({
      showCheckSkin: 0,
    });
    return false;
  }
  else {
    this.setData({
      skin_id: this.data.tempSkin,
      showCheckSkin: 0,
    });
    wx.redirectTo({
      url: '/pages/index/detail?skin_id='+ this.data.skin_id,
    })
  }
}
})