const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')
import Poster from 'wxa-plugin-canvas/poster/poster'

const APP = getApp()


let col1H = 0;
let col2H = 0;


Page({
  data: {
    vtt:false,
    sjc:Date.parse(new Date()),
    scrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
    lc1:"",
    f2hh:1000,
    page:0,

    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],

    ddl:false,
    my:false,
    type:undefined,
    listfootimg:undefined,
    listfoota:undefined,
    tag1:"",
    tag2:""

  },

fanhui() {
  wx.navigateBack()
},
tovip(e) {
  let id = e.currentTarget.dataset.id
  console.log("sssssssssssss",id);
  wx.setStorageSync('vipid', id );

  wx.switchTab({
    url: '/pages/coupons/hy',
  })
},

async tooliebiao(e){


  let tag_id = e.currentTarget.dataset.id;
  let type = e.currentTarget.dataset.type;
  let index = e.currentTarget.dataset.index;


  if(type=="d1"){
    this.setData({
      tag1 : tag_id
    })
    // 顶部点击
    this.tagxx(this.data.top[index],"d1");
    tag_id = this.data.topa[index];
    
  }else if(type=="d2"){
    this.setData({
      tag2 : tag_id
    })
    // 左侧点击
    this.tagxx(this.data.r[index]);
    tag_id = this.data.ra[index];
    

  }else{
    // 文章点击
    tag_id = e.currentTarget.dataset.id;
    this.tagxx(this.data.tagname);
  }



  this.setData({
    tagname : tag_id,
    page:0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    ddl:false,
    my:false,
    type:type,
  })
  
 
  
  this.loadImages();
},






  onLoad: function(e) {
    const app = getApp()
  

    let that  = this;
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene) // 处理扫码进商品详情页面的逻辑
      
        e.id = scene.split(',')[0]
        let efxz = scene.split(',')[1]
        console.log("efxz",e.id,efxz);

        that.setData({
          wzid:e.id,
          fxz:efxz,
        })
 
    }

    that.setData({
      tagname : e.id,
      mrid: e.id,
      tag1: e.id,
      tag2: e.id
    })






    
    console.log("dddd",e.id);

    let isIphoneX = app.globalData.isIphoneX;
    // console.log("app.globalData",app.globalData);
    that.setData({
    isIphoneX: isIphoneX
    })


    that.tagxx(that.data.tagname)
    // this.lc1(this.data.tagname);



    
    wx.getSystemInfo({
      success: (res) => {
      let ww = res.windowWidth;
      let wh = res.windowHeight;
      let imgWidth = ww * 0.48;
      let scrollH = wh;
      that.setData({
      scrollH: scrollH,
      imgWidth: imgWidth
      });
      //加载首组图片
      that.loadImages();
      }
    })

  },


  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW; //比例计算
    let imgHeight = oImgH * scale; //自适应高度
    let images = this.data.images;
    let imageObj = null;
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    

    if(imageObj != null){
        imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        //判断当前图片添加到左列还是右列
        if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
        } else {
        col2H += imgHeight;
        col2.push(imageObj);
        }
        let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
        };
        //当前这组图片已加载完毕，则清空图片临时加载区域的内容
        if (!loadingCount) {
        data.images = [];
        }
        this.setData(data);
    }

    },



    async loadImages() {

      this.setData({
        page : this.data.page+1
      })
      
      let res = await WXAPI.cmsArticles({
        page:this.data.page,
        keywordsLike:this.data.tagname,
        pageSize:35
      })
  
      if(res.data){

        this.setData({
          lc1:res.data.result,
          images:res.data.result,
        })

        console.log("lcsj",this.data.lc1);

        let images= this.data.lc1;
    
      
  
        let baseId = "img-" + (+new Date());
        for (let i = 0; i < images.length; i++) {
          images[i].ids = images[i].id;
          images[i].id = baseId + "-" + i;
          
        }
        this.setData({
        loadingCount: images.length,
        images: images
        });

        if(images.length<10){
          this.setData({
            ddl:true
          })
        }


      }else{
console.log(111111111);
        if(this.data.page>1){
          console.log(333333);
          this.setData({
            ddl:true,
            my:false,
          })
        }else{
          console.log(2222222);
          this.setData({
            my:true,
            ddl:false,
          })
        }

        return
      }

      
    },  
    


// 分类信息
  async tagxx(a,x) {
    console.log("sdf",a);

    var that = this;

    let resxx = await WXAPI.cmsPage(a)
    console.log("tagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxx111",resxx);
    if(resxx.data){
      console.log("tagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxx222",resxx.data);

      that.setData({
        // listfootimg:resxx.data.extJson.listfootimg,
        listfoota:resxx.data.extJson.listfoota,
      })
      console.log(that.data.listfootimg,that.data.listfoota);
    }


    if(that.data.type == "d1" || x== "d1" ){
          // 判断是否顶级点击
  
           let b = a;
           let ba = a+"a";
           console.log("x1",b);
           console.log("x12",ba);
           
           
     
           let r =  that.data.tagxx.extJson[b];
           r = r.split("、");
      
           let ra =  that.data.tagxx.extJson[ba];
           ra = ra.split("、");
           console.log(r);
           console.log(ra);
            that.setData({
              r:r,
              ra:ra
            })

    }

    else if( that.data.type == undefined){
      // 判断是否第一次进去的
      
      let res = await WXAPI.cmsPage(a)

      if(res.data){
        console.log("tagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxxtagxx",res.data);

        that.setData({
          tagxx:res.data,
        })


       
        var top = "";
        var topa = "";

        console.log("res.data.extJson['top']",res.data.extJson['top']);
        if(res.data.extJson['top']){
            top =  res.data.extJson['top'];
            
            if(top.indexOf("、")!=-1){
              top = top.split("、");
            }

            that.setData({
              top:top
            })

            console.log("xxxxxxxxaaaaa",that.data.top);
            let b = that.data.top[0];
            console.log("xxxxxxxx",b);
            console.log("res.data.extJson[b]res.data.extJson[b]",res.data.extJson[b]);
            if(res.data.extJson[b]){
              
              let r =  res.data.extJson[b];
              if(r.indexOf("、")!=-1){
              r = r.split("、");
              }
              that.setData({
                r:r
              })
            
          }

        }
        
      
        console.log("res.data.extJson['topa']",res.data.extJson['topa']);

        if(res.data.extJson['topa']){

          topa =  res.data.extJson['topa'];

          if(topa.indexOf("、")!=-1){
            topa = topa.split("、");
          }
            that.setData({
              topa:topa,
            })

            
            let ba = top[0]+"a";

            if(res.data.extJson[ba]){
              let ra =  res.data.extJson[ba];
              if(ra.indexOf("、")!=-1){
              ra = ra.split("、");
              }
              
                that.setData({
                  ra:ra
                })
            
            }

            
          
        }

     

        
    }

}else{
  // 左侧点击
       
    }
   
  },




  async lc1(a) {

    let res = await WXAPI.cmsArticles({
      page:this.data.page,
      // keywordsLike:a,
      pageSize:35
    })

    if(res.data){
      this.setData({
        lc1:res.data.result,
      })
      // console.log("lcsj",this.data.lc1);
    }
    


  },




  
  toliebiao(e){

    let tag_id = e.currentTarget.dataset.id;
    if(tag_id.indexOf("http") == 0){
      let site = tag_id.lastIndexOf("\/");
      tag_id = tag_id.substring(site + 1, tag_id.length);
    }

    wx.vibrateShort();

    
    console.log(tag_id);
    wx.navigateTo({
      url: `/pages/taglist/index?id=${tag_id}`,
    })

  },

  myy(){
    this.setData({
      vtt:true
    })
    setTimeout(function(){
      console.log("没有开通");
      wx.switchTab({
        url: '/pages/coupons/hy',
      });
    },2000)
  
  },

  
  async toxiangqing(e){
    let vip = e.currentTarget.dataset.vip;
    const tag_id = e.currentTarget.dataset.ids;
    
    let res = await WXAPI.userDetail(wx.getStorageSync('token'))
    console.log(res);
    wx.vibrateShort();

    if(vip==""){
      wx.navigateTo({
        url: `/pages/xiangqing/index?id=${tag_id}`,
      })
    }else{

    

      if(!res.data.userLevel){
        // 没有开通
        console.log("没有开通");
        this.myy()
      }else{
        //判断等级
        if(res.data.userLevel.level>=vip){
          // 等级够了
          wx.navigateTo({
            url: `/pages/xiangqing/index?id=${tag_id}`,
          })
        }else{
          // 等级不够
          console.log("等级不够");
          this.myy()
        }


      }
      
    }




    
  },




  onShow: function(e){
    this.setData({
      vtt:false,
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
      windowHeight: APP.globalData.windowHeight,
      menuButtonObject: APP.globalData.menuButtonObject, //小程序胶囊信息
      f2hh:APP.globalData.windowHeight-APP.globalData.navHeight-50
    })

    var _this = this;
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 0
      })
    }

    
  },


  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },



  onShareAppMessage: function() {    
    return {
      title: '"' + this.data.tagname + '" ' + wx.getStorageSync('share_profile'),
      path: '/pages/taglist/index?id=' + this.data.tagname
    }
  },


  goSearch(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  goNotice(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/notice/show?id=' + id,
    })
  },















  

  closePop() {
    this.setData({
      posterShow: false
    })
  },
  async drawSharePic() {
    const _this = this
    console.log("_this.data.xx.info.id",_this.data.tagname + ',' + wx.getStorageSync('uid'));
    const qrcodeRes = await WXAPI.wxaQrcode({
      scene: _this.data.tagname + ',' + wx.getStorageSync('uid'),
      page: 'pages/taglist/index',
      is_hyaline: true,
      autoColor: true,
      expireHours: 1
    })
    if (qrcodeRes.code != 0) {
      wx.showToast({
        title: qrcodeRes.msg,
        icon: 'none'
      })
      return
    }
    console.log("qrcodeRes",qrcodeRes);
    const qrcode = qrcodeRes.data
    const pic = _this.data.col1[0].pic
    wx.getImageInfo({
      src: pic,
      success(res) {
        const height = 490 * res.height / res.width
        _this.drawSharePicDone(height, qrcode)
      },
      fail(e) {
        console.error(e)
      }
    })
  },
  drawSharePicDone(picHeight, qrcode) {
    console.log("picHeight, qrcode",picHeight, qrcode);
    const _this = this
    const _baseHeight = 74 + (picHeight + 120)
    this.setData({
      posterConfig: {
        width: 750,
        height: picHeight + 660,
        backgroundColor: '#fff',
        debug: false,
        blocks: [{
          x: 76,
          y: 74,
          width: 604,
          height: picHeight + 120,
          borderWidth: 2,
          borderColor: '#c2aa85',
          borderRadius: 8
        }],
        images: [{
            x: 133,
            y: 133,
            url: _this.data.col1[0].pic, // 商品图片
            width: 490,
            height: picHeight
          },
          {
            x: 76,
            y: _baseHeight + 199,
            url: qrcode, // 二维码
            width: 222,
            height: 222
          }
        ],
        texts: [{
            x: 375,
            y: _baseHeight + 80,
            width: 650,
            lineNum: 2,
            text: _this.data.tagname,
            textAlign: 'center',
            fontSize: 40,
            color: '#333'
          },
          // {
          //   x: 375,
          //   y: _baseHeight + 180,
          //   text: '￥' + _this.data.goodsDetail.basicInfo.minPrice,
          //   textAlign: 'center',
          //   fontSize: 50,
          //   color: '#e64340'
          // },
          {
            x: 352,
            y: _baseHeight + 320,
            text: '长按识别小程序码',
            fontSize: 28,
            color: '#999'
          }
        ],
      }
    }, () => {
      Poster.create();
    });
  },
  onPosterSuccess(e) {
    console.log('success:', e)
    this.setData({
      posterImg: e.detail,
      showposterImg: true
    })
  },
  onPosterFail(e) {
    console.error('fail:', e)
  },
  savePosterPic() {
    const _this = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImg,
      success: (res) => {
        wx.showModal({
          content: '已保存到手机相册',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#333'
        })
      },
      complete: () => {
        _this.setData({
          showposterImg: false
        })
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


})