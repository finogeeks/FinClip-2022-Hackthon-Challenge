const WXAPI = require('../../wxapi/main')

var a = getApp();
Array.prototype.indexOf = function(val) { 
    for (var i = 0; i < this.length; i++) { 
    if (this[i] == val) return i; 
    } 
    return -1; 
};
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};

Array.prototype.remove2 = function(val) { 
    var index = this.indexOf(val); 
    return index;
};


Page({
    data: {
        color:"d3bd55",
        category_packages:[],
        xzt_sl:0,
        imgwidth:0,
        imghright:0,
        duozhu: !1,
        isIpx: a.globalData.isIpx,
        storeId: "",
        disabledScroll: !1,
        categories: [],
        gallery: {},
        vipBanner: "https://api.mlito.com/haybirds/fad76e85-e797-4925-8999-e11960d09917.png",
        imgUrls: [],
        artworkTabs: !1,
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        packageLoaded: 1,
        defaultBanners: [],
        categories:[],
        packageId:1,
        packages:[],
        images:{},
        zxlb:[],
        tcc:false,
        tcid:0,
        spxx:"",
        lid:[],
        lmc:[],
        ldj:[],
        zj:0,
        t2:false,
        splb:[],
        yh:0,
        zxx:[],
        tc:[]
    },

    gb2(){
        this.setData({
            t2:false
        });
    },
    tc2(){
        var a1 = this.data.lid;
        if(a1.length>=1){
            this.setData({
                t2:!this.data.t2
            });
        }else{
            this.setData({
                t2:false
            });
        }
    },
    tc(e){
       let aa =  e.currentTarget.dataset.id;
       this.setData({
        tcid:aa
       });
       this.splb(this.data.tcid);
    },
    spxx(e){
       let aa =  e.currentTarget.dataset.id;
       let that = this;
       WXAPI.goodsDetail(aa).then(function(res) {
         if (res.code == 0) {
             console.log("spxx:",res.data);
             let aa = res.data.pics;
             aa = aa.length;
             that.setData({
                 spxx:res.data,
                 tcc:true,
                 gdtp:res.data.pics,
                 gdtplength:aa,
                 gdtps:res.data.pics2,
             })
             console.log("gdtp:",that.data.gdtp);
         }
       })
    },
    gbtcc(){
        let that = this;
        that.setData({
            tcc:false
        })
    },

// 加入购物车
    jrgwc(e){
        let spid = e.currentTarget.dataset.id;
        let spmc = e.currentTarget.dataset.name;
        let jg = e.currentTarget.dataset.jg;
        let szxx = e.currentTarget.dataset.zxx;
        let atc = e.currentTarget.dataset.tc;
        
        console.log(atc);
        

        let that = this;
        let lid = that.data.lid;
        let lmc = that.data.lmc;
        let ldj = that.data.ldj;
        let lzxx = that.data.zxx;
        let ltc = that.data.tc;
        

        let ljg = that.data.zj;
  
    
        
        if(lid.indexOf(spid) > -1){


            that.setData({
                tcc:false
            })

        }else{
            
            lid.push(spid);
            lmc.push(spmc);
            ldj.push(jg);
            lzxx.push(szxx);
            ltc.push(atc);

            console.log(ldj);
            var zj = 0;
            for(let x = 0; x<ldj.length;x++ ){
                zj =  parseInt(zj) + parseInt(ldj[x]);
            };

            ljg = parseInt(ljg) + parseInt(jg);

            let bb = that.data.splb;
          
            for(let a=0;a<bb.length;a++){
                    if(spid == bb[a].id){
                        bb[a].xz=true;
                    }
            }

            that.setData({
                splb:bb
            });

           

            var aa = lid.length;

            if(aa>=3){

                // zj = parseInt(zj) - (aa*100) + 100;

                // that.setData({
                //     yh:(aa*100)-100
                // });

            }else{
                that.setData({
                    yh:0
                });
            }
          
            that.setData({
                lid:lid,
                lmc:lmc,
                ldj:ldj,
                zj:zj,
                zxx:lzxx,
                tc:ltc,
                tcc:false
            });





           
        }

   

    },

    // 删除购物车
    scgwc(e){
        console.log(e);
        let spid = e.currentTarget.dataset.id;
        let spmc = e.currentTarget.dataset.name;
        let jg = e.currentTarget.dataset.jg;
        let szxx = e.currentTarget.dataset.zxx;

        let that = this;
        let lid = that.data.lid;
        let lmc = that.data.lmc;
        let ldj = that.data.ldj;
        let ljg = that.data.zj;
        let lzxx = that.data.zxx;
        let ltc = that.data.tc;

  
        
        if(lid.indexOf(spid) > -1){
        var cc =lid.remove2(spid);
           lid.remove(spid);
           lmc.remove(spmc);

        
           lzxx.splice(cc, 1);
           ltc.splice(cc, 1);
         


         ldj.splice(cc, 1);
        
         console.log(ldj);
        
         var zj = 0;
         for(let x = 0; x<ldj.length;x++ ){
                zj =  parseInt(zj) + parseInt(ldj[x]);
         };

           
           
           ljg = parseInt(ljg) - parseInt(jg);

           let bb = that.data.splb;
          
           for(let a=0;a<bb.length;a++){
                if(spid == bb[a].id){
                    bb[a].xz=false;
                }
           }

           that.setData({
               splb:bb
           });


           console.log("splb",that.data.splb);

           var aa = lid.length;


           
           



            if(aa>=3){
                // zj = parseInt(zj) - (aa*100) + 100;

                // that.setData({
                //     yh:(aa*100)-100
                // });
           
            }else{
                that.setData({
                    yh:0
                });
            }

             
            console.log("cc",cc);

            that.setData({
                lid:lid,
                lmc:lmc,
                ldj:ldj,
                zxx:lzxx,
                tc:ltc,
                zj:zj
            })

            var aa = that.data.lid.length;
            if(aa==0){
                console.log(111111111111111);
                that.setData({
                    t2:false
                })
            }

         

        }else{
            
          
           
        }
  
    },

    qk(){
        let that = this;
        let bb = that.data.splb;
          
        for(let a=0;a<bb.length;a++){
             
                 bb[a].xz=false;
           
        }

        that.setData({
            splb:bb,
            lid:[],
            lmc:[],
            ldj:[],
            t2:!that.data.t2
        });


        console.log("splb",that.data.splb);
    },

    xhl(){

        //总价
        wx.setStorageSync("zxzj",this.data.zj);
        //优惠价格
        wx.setStorageSync("zxyh",this.data.yh);
        // 选中的套餐
        wx.setStorageSync("zxzxx",this.data.zxx);
        // 套餐内容
        wx.setStorageSync("tc",this.data.tc);
        
        wx.navigateTo({
            url: "/pages/order-info2/order-info",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },

    

  
    // 图片加载
    imageLoad: function(e) {
        

        var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        image=this.data.images; 
       console.log(e.target.dataset.package);
       var ds = e.target.dataset.package;

        //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
        image[e.target.dataset.index]={
            width:$width,
            height:$height
        }


        this.setData({
            images:image
        })
        
     console.log(this.data.images);


    },

    // 初始化
    onLoad: function(o) {

        wx.loadFontFace({
            family: 'Bitstream',
            source: 'url("https://dcdn.it120.cc/2021/11/30/cc148cec-9b2a-4786-a068-7efac2428562.ttf")',
            success: console.log
          })

          
        console.log("qwewqewqewqe:",o.tab);
        var that =this;

      
        if(o.tab){
            that.setData({
                tcid:o.tab
            })
            that.fl(o.tab);
        }else{
            that.fl();
        }
        
       
            //  获取商城名称
        WXAPI.queryConfigBatch('zdydb').then(function(res) {
        if (res.code == 0) {
            console.log("qqqqqqqqqq:",res.data[0].value);
            that.setData({
                zdydb:res.data[0].value,
            })
        //   res.data.forEach(config => {
        //     wx.setStorageSync(config.key, config.value);
        //     if (config.key === 'recharge_amount_min') {
        //       that.globalData.recharge_amount_min = res.data.value;
        //     }
        //   })
          
        }
      })
      

    },






    // 获取套餐
    taoc:function(id,dd) {
        var that = this,
        taoc_old = [],
        taoc_new = [],
        ggid = "";
        console.log(dd);

        ggid = dd.properties[0].id;//套餐id
        taoc_old = dd.properties[0].childsCurGoods;//套餐规格id
        var spgg = dd.extJson;//套餐内容

        var tcbt = spgg["套餐标题"];
        var tcbtarr=tcbt.split('/'); //套餐内容标题


        var op = [];
        for(var c = 0; c < taoc_old.length; c++) {

            var xn = taoc_old[c].name; //名称

            var tcbt2 = spgg[xn+"内容"]; //内容

            var tcbt2arr = tcbt2.split('/'); 

            var aop = [];
            for(var j = 0; j < tcbt2arr.length; j++) {
                aop.push({title:tcbtarr[j],content:tcbt2arr[j]});
            }
            op.push(aop);
            
        };

        console.log("套餐内容集合:",op);


        
        var sl = taoc_old.length;//套餐规格
        
        var aaa = 0;



        var currentIndex = 0;

        getImg();
        function getImg(){
            if(currentIndex>=taoc_old.length){ 
                return;
            }

            var gid = taoc_old[currentIndex].id;

             //获取价格&套餐合并
             WXAPI.goodsPrice({
                goodsId: id,
                propertyChildIds: ggid + ":" + gid
              }).then(function(res) {

                var opto = op[aaa];

                var xn = taoc_old[aaa].name;
                
                var jj = spgg[xn+"特别说明"];

                var qk = spgg[xn+"全款"];
                
                res.data.title = xn;
                res.data.description = jj.replace(new RegExp('/n','g'),"\n");
                res.data.quankuan = qk;

                
                res.data.options = opto;
                
                taoc_new.push(res.data);
                console.log("拼接后：",taoc_new);
                aaa++;

               


                // 循环最后一个
                if(aaa == sl){
                    console.log("最后一个：",taoc_new);

                    console.log(taoc_new[0].id);

                    that.setData({
                        packageId: taoc_new[0].id,
                        packages: taoc_new
                    });

                    
                    wx.setStorageSync('xd_propertyChildIds', taoc_new[0].propertyChildIds);
                    wx.setStorageSync('xd_propertyChildIds_name', taoc_new[0].title);
                    wx.setStorageSync('xd_dingjin', taoc_new[0].price);
                    wx.setStorageSync('xd_quankuan', taoc_new[0].quankuan);

                    
                }

                currentIndex++;

                getImg();
               
                 
            })



          
        }

  
        
         
    },


    // 加载
    onReady: function() {
        // wx.setNavigationBarColor({
        //     frontColor: "#000000",
        //     backgroundColor: "#ffffff",
        //     animation: {
        //         duration: 400,
        //         timingFunc: "easeIn"
        //     }
        // });
    },


    onShow: function() {


        var that = this;
        // that.fl();
        // that.setData({
        //     tcid:0
        // })
        
    },

    
  async fl(a){
      var that = this;
     await  WXAPI.goodsCategory().then(function(res) {
        let categories = [];
        if (res.code == 0) {

          for(var i=0; i<res.data.length; i++){
            if(res.data[i].pid=="268129"){
                    categories.push(res.data[i]);
            }
          }
  
          console.log("categories:",categories);
          
          that.setData({
            zxlb: categories,
          });

          if(a){
              that.splb(a);
            }else{
            that.splb(0);
          }
          
        }
      })

  },
  async splb(a){
        var flid="";
        var that =this;
        var qbfl = that.data.zxlb;
       
        if(a == 0){
                for(var i=0; i<qbfl.length; i++){
                   
                    if(i<qbfl.length-1){
                        flid = flid + qbfl[i].id +",";
                       
                    }else{
                        flid = flid + qbfl[i].id
                    }
                    console.log("sdfdsf:",flid);
                }
           
        }else{
            flid = a
        }
                
               WXAPI.goods({
                    categoryId: flid,
                    page: 1,
                    pageSize: 100000
                }).then(function(res) {
                    if (res.code == 0) {
                     
                        let aa = that.data.lid;
                        console.log("lid",aa);
                        let bb = res.data;
                        for(let a=0;a<aa.length;a++){
                            console.log(aa[a]);
                            var cc = 0;console.log(cc);
                            for(let b=0;b<bb.length;b++){
                                console.log(cc);
                                if(cc == 0){

                                
                                    if(aa[a] == bb[b].id){
                                        // bb[b].xz=false
                                        bb[b].xz=true;
                                        cc = 1;
                                        console.log(cc);
                                    }else{
                                      
                                    }
                                }
                            }
                        }

                        that.setData({
                            splb:bb
                        });
                        console.log("splb",that.data.splb);

                    }else{
                        that.setData({
                            splb:[]
                        });
                        console.log("splb",that.data.splb);
                    }
         })
    },



    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    
    // 分享
    onShareAppMessage: function() {
        return {
            title: "haybirds儿童摄影",
            path: "/pages/zx/zx?tab="+this.data.tcid
        };
    },



    // 点击图片放大
    imgYu:function(event){
        var src = event.currentTarget.dataset.src;//获取data-src
        var imgList = this.data.gdtps;//获取data-list
        console.log(imgList);
    //     var imgLists = [];
    //     for (let i = 0; i < imgList.length; i++) {
    //       imgLists.push(imgList[i].picUrl);
    //     }

    //     console.log(      imgLists);
        
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgList // 需要预览的图片http链接列表
        })
    },


    // 分类切换
    onSwitchTab: function(a) {
        var t = a.currentTarget.dataset.categoryid,
        that = this;

        if(that.data.categoryId != t){
            
            console.log(t);
                that.setData({
                    categoryId:t
                })
            that.neijing(t);

        }
    },

    // 点击选不同套餐
    onSelectPackage: function(e) {
        var n = e.currentTarget.dataset.packageid,
        i = e.currentTarget.dataset.categoryid,
        that = this;
        that.setData({
            packageId : n
        });


        wx.setStorageSync('xd_propertyChildIds', e.currentTarget.dataset.ps);
        wx.setStorageSync('xd_propertyChildIds_name', e.currentTarget.dataset.bt);
        wx.setStorageSync('xd_dingjin', e.currentTarget.dataset.dingjin);
        wx.setStorageSync('xd_quankuan', e.currentTarget.dataset.quankuan);

        console.info("package_id", n), console.info("category_id", i);
    },

    // 下一步
    onGotUserInfo: function(a) {
        var e = this;

        wx.navigateTo({
            // url: "/pages/schedule/schedule?store_id=" + e.data.storeId,
            url: "/pages/order-info/order-info?",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });


        // console.log(a.detail.errMsg), console.log(a.detail.userInfo), console.log(a.detail.rawData), 
        // t.updateWeChatUserInfo(a.detail.userInfo).then(function(a) {
        //     console.info("userInfo updated", a), wx.navigateTo({
        //         url: "/pages/schedule/schedule?store_id=" + e.data.storeId,
        //         success: function(a) {},
        //         fail: function(a) {},
        //         complete: function(a) {}
        //     });
        // });

    }
});