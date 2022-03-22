const WXAPI = require('../../wxapi/main')

var a = getApp();

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
        packages:[]
    },


    // 初始化
    onLoad: function(o) {

            var i = o.category_id, //分类id
                r = o.type,
                that = this;
                
            console.info("category_id:", i,"type:",r);

            
            
            //内景
            if(i != 99029){

                that.setData({
                    defaultBanners: wx.getStorageSync('njbanner')
                })

                that.neijing(i);
            }else{
                // 外景
                that.setData({
                    duozhu: 1
                });

                i = 289326;

                console.log("wjjjjjj");
                // 外景banner
                WXAPI.banners({
                    type: 'wj'
                }).then(function(res) {
                    if (res.code == 700) {
                    wx.showModal({
                        title: '提示',
                        content: '请在后台添加 banner 轮播图片，自定义类型填写 wj',
                        showCancel: false
                    })
                    } else {
                        that.setData({
                            defaultBanners: res.data
                        });
                    }
                });

                // 内容
                that.goodsmore(i);

            }

            this.setData({
                brandType: r,
                categoryId: i
            })


    },

    // 图片加载
    imageLoad: function(e) {
        var $width = e.detail.width; //获取图片真实宽度
        var $height = e.detail.height; //获取图片真实高度
        this.setData({
          imgwidth: $width,
          imgheight: $height
        })
    },

    // 获取内景内容
    neijing:function(i){
        var nj_post = "";
        var xzt_sl = "";
        var that = this;
        //内景
        nj_post = wx.getStorageSync('san_post');

        var nj_nr = [];

        for(var a = 0; a < nj_post.length; a++) { // 这里的i是代表数组的下标

            if (i == nj_post[a].id){
                nj_post[a].active = true;
                nj_nr.push(nj_post[a])
            }else{
                nj_post[a].active = false;
            }

            if (nj_post[a].id == 289310){
                xzt_sl = nj_post[a].gotScore;
            }
            
        };
        console.log("njjjjjjj");
        console.log(nj_post);
        console.log(nj_nr);

        that.setData({
            artworkTabs: nj_post,
            duozhu: 0
        })

        // 内景其他
        if(i != 289310){
            console.log("njqtttttttttt");
            that.setData({
                categories:nj_nr,
                duozhu: 0,
                color:nj_nr[0].barCode
            });
            WXAPI.goodsDetail(i).then(function(res) {
                if (res.code == 0) {
                    wx.setStorageSync('xd_goodsId', i);
                    wx.setStorageSync('xd_goods', res.data);
                    that.taoc(i,res.data);
                }
            });
        }else{
        // 小主题
            console.log("njxzttttttttttt");
            
            that.setData({
                duozhu: 1
            });

            // 内容
            that.goodsmore(i);

            // 照片
            var xzt_zp=[];
            console.log("小主题照片组数量：" + xzt_sl);
            var xzt_bendi =  wx.getStorageSync('xiaozhutiBanner');

            for(var a = 1; a <= xzt_sl; a++) { // 这里的i是代表数组的下标

                var bh = String(i) + a;
                console.log(bh);

                var a_sl = [];
                for(var b = 0; b < xzt_bendi.length; b++) { // 这里的i是代表数组的下标
                    if (bh == xzt_bendi[b].businessId){
                    
                        a_sl.push(xzt_bendi[b]);
                    }
                };

                xzt_zp.push(a_sl);

            };
            console.log(xzt_zp);
            that.setData({
                category_packages: xzt_zp
            });



    }
    },



    // 获取详情
    goodsmore:function(id){
          var that = this;
          wx.setStorageSync('xd_goodsId', id);

          WXAPI.goodsDetail(id).then(function(res) {
          
            if (res.code == 0) {

                //外景
                if(id == "289326"){
                    var njkpsl=res.data.basicInfo.gotScore;
                    // 照片
                    var xzt_zp=[],
                    njkp_banner = "";
                    console.log("wj照片组数量：" + njkpsl);
        
                    WXAPI.banners({
                        type: 'wjkp'
                    }).then(function(res) {
                        if (res.code == 0) {
                            njkp_banner = res.data;
                            console.log(njkp_banner);
                            

                                for(var a = 1; a <= njkpsl; a++) { // 这里的i是代表数组的下标
        
                                    var bh = "289326" + a;
                                    console.log(bh);
        
                                    var a_sl = [];
                                    for(var b = 0; b < njkp_banner.length; b++) { // 这里的i是代表数组的下标
                                        if (bh == njkp_banner[b].businessId){
                                        
                                            a_sl.push(njkp_banner[b]);
                                        }
                                    };
                    
                            
        
                                    xzt_zp.push(a_sl);
        
                                };
                                console.log(xzt_zp);
                                that.setData({
                                    category_packages: xzt_zp
                                });
        
        
                        }
                    });


                }

                var a = [];
                a.push(res.data);

                that.taoc(id,res.data);
                that.setData({
                    categories: a,
                    color: res.data.basicInfo.barCode
                });

                wx.setStorageSync('xd_goods',res.data);
             
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

        console.log(dd.extJson.套餐标题);

        ggid = dd.properties[0].id;//套餐id
        taoc_old = dd.properties[0].childsCurGoods;//套餐规格id
        var spgg = dd.extJson;//套餐内容

        var tcbt = spgg["套餐标题"];
        var tcbtarr=tcbt.split('/');

        console.log("转成的数组:",tcbtarr); //套餐内容标题

        var op = [];
        for(var c = 0; c < taoc_old.length; c++) {

            var xn = taoc_old[c].name; //名称
            var jj = spgg[xn+"特别说明"]; 

            var tcbt2 = spgg[xn+"内容"]; //详情内容

            var tcbt2arr = tcbt2.split('/'); //内容

            console.log("转成的数组2:",tcbt2arr);


            var aop = [];
            for(var j = 0; j < tcbt2arr.length; j++) {
                aop.push({title:tcbtarr[j],content:tcbt2arr[j]});
            }

            op.push(aop);
            
        };

        console.log("套餐内容集合:",op);

        var sl = taoc_old.length;
        
        var aaa = 0;

        for(var c = 0; c < sl; c++) { 
            
            console.log("获取价格:"+ggid + "," + taoc_old[c].id);
            
            //获取价格&套餐合并
            WXAPI.goodsPrice({
                goodsId: id,
                propertyChildIds: ggid + ":" + taoc_old[c].id
              }).then(function(res) {

                var opto = op[aaa];

                // console.log("opto",opto);
                
                var xn = taoc_old[aaa].name;
                
                var jj = spgg[xn+"特别说明"];

                var qk = spgg[xn+"全款"];
                
                res.data.title = xn;
                res.data.description = jj.replace('/n', '\n');
                res.data.quankuan = qk;

                
                res.data.options = opto;
                // console.log("taoc:",taoc_new);
                console.log(c+"价格返回:",res.data);
                
                taoc_new.push(res.data);
                aaa++;



                // 循环最后一个
                if(aaa == sl){
                    console.log("taoc_newwwwwwwwwwwwwwwwwwwwwww",taoc_new);

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
               
                 
            })

        };
        
         
    },


    // 加载
    onReady: function() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },


    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    
    // 分享
    onShareAppMessage: function() {
        return {
            title: "haybirds儿童摄影",
            path: "/pages/stores/stores"
        };
    },



    // 点击图片放大
    imgYu:function(event){
        var src = event.currentTarget.dataset.src;//获取data-src
        var imgList = event.currentTarget.dataset.list;//获取data-list
        
        var imgLists = [];
        for (let i = 0; i < imgList.length; i++) {
          imgLists.push(imgList[i].picUrl);
        }

        console.log(      imgLists);
        
        //图片预览
        wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgLists // 需要预览的图片http链接列表
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