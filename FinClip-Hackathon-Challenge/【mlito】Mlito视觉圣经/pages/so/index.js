const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data:
  {
    scrollTop: 0,
    bnavHeight:APP.globalData.bnavHeight,
    navHeight:APP.globalData.navHeight,
    bHeight:0,
    imgUrls:"",
    gb:"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-nav-150-50-off.svg",
    sw:true,
    ss:false,
    jdata:"",
    jdata2:"",
    jdata1:"",
    jdata1s:"",
    ssq:true,
    ssq1:false,
    ssq2:false,
    ssq3:false,
    jdata2s:"",
    aisWhite:false,
    xlys:"none",
    couponPwd:"",
    jcontent:"",
    topbj:undefined,
    bjcolor:undefined,
    ssbt:undefined,
    content: {
        "topbj":"https://www.mlito.com/wp-content/uploads/15.png",
        "bjcolor":"#f1f1f1",
        "main":[
          {'img':'https://www.mlito.com/wp-content/uploads/mlito-lite-so-110-110.svg','id':'品牌'},
          {'img':'https://www.mlito.com/wp-content/uploads/mlito-lite-so-110-110.svg','id':'品牌'},
          {'img':'https://www.mlito.com/wp-content/uploads/mlito-lite-so-110-110.svg','id':'品牌'},
          {'img':'https://www.mlito.com/wp-content/uploads/mlito-lite-so-110-110.svg','id':'品牌'},
          {'img':'https://www.mlito.com/wp-content/uploads/mlito-lite-so-110-110.svg','id':'品牌'},
        ],
        "admain":[
          {"img":"https://www.mlito.com/wp-content/uploads/mlito-lite-xiala-750-200.svg","id":"品牌"}
        ],
        "wu":{
          "sj1":"推荐的生态",
          "sj2":"推荐的灵感",
          "sj3":"推荐的生态",
        }
      }
  },

  async goSearch(){

    this.ddx(this.data.couponPwd);
    this.splbss(this.data.couponPwd);
    this.cmsPagexss(this.data.couponPwd);
    
  },

  async ddx(a) {

    let axbjcolor=false;
    let axtopbj=false;
    let axssbt=false;
    let log0ys=false;


    let sc = a;
    sc = sc.toLowerCase()
    const res = await WXAPI.cmsPage(sc)
    console.log("ddx",res);
    if (res.code == 0) {
     
      this.setData({
        ss:false,
        ssq:false,
        ssq1:true,
        jcontent:res.data,
      })
     
      if(res.data.extJson.bjcolor){
          axbjcolor=res.data.extJson.bjcolor
      }else{
        axbjcolor=undefined
      }
      if(res.data.extJson.topbj){
          axtopbj=res.data.extJson.topbj
      }else{
        axtopbj=undefined
      }


      if(res.data.extJson.logoys){
        log0ys=true
      }else{
        log0ys=false
      }



      if(res.data.extJson.ssbt){
          axssbt=res.data.extJson.ssbt;
           axssbt =JSON.parse(res.data.info.content);
           axssbt = axssbt.sj
      }else{
        axssbt=undefined
      }


      this.setData({
        bjcolor:axbjcolor,
        topbj:axtopbj,
        ssbt:axssbt,
        log0ys:log0ys,
        aisWhite:log0ys
      })
      console.log("topbjtopbjtopbj",this.data.topbj);

      console.log("jcontentjcontent",this.data.jcontent);
    }else{
      this.setData({
        bjcolor:axbjcolor,
        topbj:axtopbj,
        ssbt:axssbt,
        log0ys:log0ys,
        aisWhite:log0ys,



        ss:true,
        ssq:true,
        ssq1:false,
      })

      console.log("topbjtopbj",this.data.topbj);
    }

  },

    
  async splbss(categoryId) {
    const res = await WXAPI.goods({
      nameLike:categoryId,
      page: 1,
      pageSize: 20
    })
    if (res.code == 404 || res.code == 700) {
      this.setData({
        ssq3:false
      });
      return
    }
    let aa = res.data;
    aa.forEach(function(element,index){
      if(element.tags){

        if(element.tags){
          let c = element.tags;
          c = c.split("、");
          // console.log(c);
          aa[index].tags = c;
        }
        
        if(element.characteristic){
          let b = element.characteristic;
          b = b.split(",");
          // console.log(b);
          aa[index].characteristic = b;
        }

      }
      
    })
    this.setData({
      jdata: aa,
      ssq3:true
    });
    console.log(this.data.jdata);
  },

  async cmsPagexss(a) {
    console.log();
    var that = this;
    const res = await WXAPI.cmsArticles({
      keywordsLike:a,
      pageSize:20
    })
    

    console.log("sdfsdfs",res);
    if (res.code == 0) {
      that.setData({
        ssq2:true,
        jdata2s:res.data.result,
       
      })
      console.log("ccccc",that.data.jdata2s);

    }else{
      that.setData({
        ssq2:false
      })
    }

  },





  onLoad: function(e) {
    
    const that = this

    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight - APP.globalData.bnavHeight,
                topbj:that.data.content[0],
            }); 
        } 
    })

    that.splb("270997");
    that.cmsPagex();
    that.cmsPagex1();

  },


  onPageScroll(e) {
    console.log(e);
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })

    var that = this;
     // 3.当页面滚动距离scrollTop > 菜单栏距离文档顶部的距离时，菜单栏固定定位
     if (e.scrollTop > 20) {
       console.log(222222);
     
      that.setData({
        xlys:"#fff",
        aisWhite: false,
      })
  
    } else {
      console.log(11111);
      that.setData({
        xlys:"none",
        aisWhite: false,
      })

      if(that.data.log0ys){
        that.setData({
          aisWhite: true,
        })
       }

    }

  },


  async cmsPagex() {
    console.log(234324234324);
    var that = this;
    const res = await WXAPI.cmsArticles({
      keywordsLike:"推荐的灵感",
      pageSize:20
    })
    

    console.log("sdfsdfs",res);
    if (res.code == 0) {

      that.setData({
        jdata2:res.data.result,
      })
      console.log("ccccc",that.data.jdata2);

    }

  },


  async cmsPagex1() {
    console.log(1111);
    var that = this;
    const res = await WXAPI.cmsArticles({
      keywordsLike:"推荐的生态",
      pageSize:20
    })
    

    console.log("sdfsdfs",res);
    if (res.code == 0) {

   

      that.setData({
        jdata1:res.data.result,
      })
      console.log("cccccxxxxx",that.data.jdata1);

  
    }

  },


  toDetailsTap: function(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id
    const supplytype = e.currentTarget.dataset.supplytype
    const yyId = e.currentTarget.dataset.yyid
    if (supplytype == 'cps_jd') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-jd?id=${id}`,
      })
    } else if (supplytype == 'vop_jd') {
      wx.navigateTo({
        url: `/pages/goods-details/vop?id=${yyId}&goodsId=${id}`,
      })
    } else if (supplytype == 'cps_pdd') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-pdd?id=${id}`,
      })
    } else if (supplytype == 'cps_taobao') {
      wx.navigateTo({
        url: `/packageCps/pages/goods-details/cps-taobao?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/goods-details/index?id=${id}`,
      })
    }
  },

  
  async splb(categoryId, append) {
    if (!categoryId) {
      categoryId = "";
    }
    const res = await WXAPI.goods({
      // categoryId: categoryId,
      recommendStatus:1,
      page: 1,
      pageSize: 20
    })
    

    if (res.code == 404 || res.code == 700) {
      return
    }

    console.log("res.data111111",res.data);

    let aa = res.data;
    aa.forEach(function(element,index){
      if(element.tags){

        if(element.tags){
          let c = element.tags;
          c = c.split("、");
          // console.log(c);
          aa[index].tags = c;
        }
        

        if(element.characteristic){
          let b = element.characteristic;
          b = b.split(",");
          // console.log(b);
          aa[index].characteristic = b;
        }

        
      }
      
    })

   


    this.setData({
      jdata: aa,
    });
    console.log(this.data.jdata);

  },


  tovip(e) {
    let id = e.currentTarget.dataset.id
    console.log("sssssssssssss",id);
    wx.setStorageSync('vipid', id );
  
    wx.switchTab({
      url: '/pages/coupons/hy',
    })
  },

  xginp(e){
    this.setData({
      couponPwd: e.detail.value
    })
    console.log("pwdCouponChange",this.data.couponPwd);
  },



  



  bindchange(e) {
    wx.vibrateShort();
    this.setData({
         swiperIndex: e.detail.current
    })
  },

  switchTab(e) {
    const data = e.currentTarget.dataset
    const url = data.path
    wx.switchTab({url})
    this.setData({
      selected: data.index
    })
  },

  feilei(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      topbj: this.data.content[e.currentTarget.dataset.id]
    })
  },




  fanhui() {
    console.log(11111);
    wx.navigateBack()
  },

  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },

  index_more: function(e) {
    wx.vibrateShort();

    const index_more_id = e.currentTarget.dataset.id;
    wx.setStorage({
      key:"index_sj",
      data:e.currentTarget.dataset.sj
    })

if(index_more_id ==1){
  wx.navigateTo({
    url: `/pages/index_more_news/index?id=${index_more_id}`,
  })
}else{
  wx.navigateTo({
    url: `/pages/index_more/index?id=${index_more_id}`,
  })
}
 
    // console.log(index_more_id);
  },






  onShow: function(e){
    this.setData({
      navHeight: APP.globalData.navHeight,
      navTop: APP.globalData.navTop,
      windowHeight: APP.globalData.windowHeight,
      menuButtonObject: APP.globalData.menuButtonObject //小程序胶囊信息
    })
    console.log("navHeight",this.data.navHeight);

    console.log("bnavHeight",this.data.bnavHeight);


    var _this = this;
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 0
      })
    }
    _this.cmsPage()
    
  },

  async cmsPage() {
  
    const res = await WXAPI.cmsPage("252222")
    if (res.code == 0) {
      let sj =JSON.parse(res.data.info.content);
      this.setData({
        content:sj.sj[0]
      })
      console.log("contentcontent",this.data.content);
    }
  },



  async toxiangqing(e){
    let vip = e.currentTarget.dataset.vip;
    const tag_id = e.currentTarget.dataset.id;
    
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
        wx.switchTab({
          url: '/pages/coupons/hy',
        });
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
          wx.switchTab({
            url: '/pages/coupons/hy',
          });

        }


      }
      
    }




    
  },

  sptoliebiao(e){

 

    wx.vibrateShort();

    

    wx.switchTab({
      url: '/pages/haowu/index',
    })
    
 
    
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
    });
    
  },



  onShareAppMessage: function() {    
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + wx.getStorageSync('share_profile'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },



  goNotice(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/notice/show?id=' + id,
    })
  },


})