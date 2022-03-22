const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')

var t = getApp(),
a = require("../../utils/util.js"),
e = require("../../nitro.js"),
n = (require("../../configs.js")),
o = function(t, e) {
    return t.forEach(function(t) {
        t.packages = [], t.gallery = [], e.forEach(function(e) {
            e.category && e.category.id == t.id && (t.packages.push(e), t.gallery = a.shuffle(t.gallery.concat(e.gallery)).slice(0, 15));
        }), t.hasSubItems = t.title.indexOf("小主题") > -1, t.title.includes("小主题") ? (t.mp_info = n.theme, 
        t.is_themes = !0) : t.title.toLowerCase().includes("look") ? t.mp_info = n.look : t.title.toLowerCase().includes("face") ? t.mp_info = n.face : t.title.toLowerCase().includes("baby") && (t.mp_info = n.baby);
    }), console.info("processPackages", t), t.filter(function(t) {
        return t.publish;
    });
};

Page({
    data: {
        isIpx: t.globalData.isIpx,
        storeId: "",
        disabledScroll: !1,
        imgwidth: 0,
        imgheight: 0,
        categories:[],
        themeGroups:[],
        gallery: {},
        defaultBanners: [],
        artworkTabs: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        packageLoaded: 1
    },




    
    onLoad: function(e) {
        const that = this;
        var n = e.store_id || "a13e5bca9835edf92bb4aa50",
        o = e.type;
        t.globalData.ts = + new Date(),

        // 内景banner
        WXAPI.banners({
            type: 'nj'
        }).then(function(res) {
            if (res.code == 700) {
            wx.showModal({
                title: '提示',
                content: '请在后台添加 banner 轮播图片，自定义类型填写 nj',
                showCancel: false
            })
            } else {
                wx.setStorageSync('njbanner', res.data);
                that.setData({
                    defaultBanners: res.data
                });
            }
        }).catch(function(e) {
            wx.showToast({
            title: res.msg,
            icon: 'none'
            })
        })


        var categories_json = [];
        var categories_bannerjson = [];
        var xzt_banner = [];

       

        // 小主题banner
        WXAPI.banners({
            type: 'x'
        }).then(function(res) {
        
            if (res.code == 0) {
                xzt_banner = res.data;
                wx.setStorageSync('xiaozhutiBanner', res.data);
       
                    console.log("xxxxxx000",res.data);

                        // for(var i = 0; i <= xzt_banner.length; i++) { 
                        //     xzt_banner=xzt_banner.filter(i=>i.remark)
                        // };

                        // console.log("xzt_banner",xzt_banner);

                        var result = [];
                        for(var i=0,len=xzt_banner.length;i<len;i+=6){
                            result.push(xzt_banner.slice(i,i+6));
                        }

                        console.log("xxxxxx",result);

                        that.setData({
                            themeGroups: result
                        });

                        

            }
        });
        

        // 另外3个banner
        WXAPI.banners({
            type: 'njkp'
        }).then(function(res) {
            if (res.code == 0) {
                categories_bannerjson = res.data

                    // 获取内景分类
                    WXAPI.goods({
                        categoryId: '99030',
                        page: 1,
                        pageSize: 100000
                    }).then(function(res) {
                        console.log("获取内景分类",res);
                        if (res.code == 0) {
                            categories_json = res.data;
                            that.setData({
                                artworkTabs:res.data
                            });
                            for(var i = 0; i < categories_json.length; i++) { // 这里的i是代表数组的下标
                                var id = categories_json[i].id;
                                var nbanner = [];
                                if(id == 289310){
                                    categories_json[i].hasSubItems=true;
                                    // xzt_shuliang = categories_json[i].gotScore;
                                }
                                for(var a = 0; a < categories_bannerjson.length; a++) { // 这里的i是代表数组的下标
                                    var id = categories_json[i].id;
                                    
                                    if (id == categories_bannerjson[a].businessId){
                                        nbanner.push(categories_bannerjson[a])
                                    }
                                    
                                };
                                categories_json[i].bannerlist=nbanner;
                            };
                            console.log(categories_json);
                            wx.setStorageSync('san_post', categories_json);
                            that.setData({
                                categories:categories_json
                            });

                        }
                    })



              }
        })


      
        
        //  this.setData({
        //     storeId: n,
        //     brandType: "kids",

        //     artworkTabs:[{
        //         category_id: "285562b2cd03b6e447a1e402",
        //         category_title: "FACE",
        //         category_slogan: "纯白·纯净",
        //         className: "face",
        //         color: "#f04a8c"
        //     }, {
        //         category_id: "6aed59ed35e06b8f0077e6f1",
        //         category_title: "LOOK",
        //         category_slogan: "型·时尚",
        //         className: "look",
        //         color: "#50239e"
        //     }, {
        //         category_id: "8eef6d6bfa87801f885129a2",
        //         category_title: "BABY",
        //         category_slogan: "亲密·爱",
        //         className: "baby",
        //         color: "#d3bd55"
        //     }, {
        //         category_id: "8c6fd56e8d8ff8d5a2731162",
        //         category_title: "THEME",
        //         category_slogan: "小主题",
        //         className: "theme",
        //         color: "#96d1b7"
        //     } ],
        //     // artworkTabs: (a.config("artworkTabs_" + o) || []).map(function(t) {
        //     //     return t.active = !1, t;
        //     // }),
        //     campaign: t.globalData.campaign || !1,
        //     showCampaignSplash: !!t.globalData.campaign
        // }),
        
        
        t.globalData.campaign && t.campaignEventLog("view_splash"), this.initData(n);
    },

    imageLoad: function(e) {
        var $width = e.detail.width; //获取图片真实宽度
        var $height = e.detail.height; //获取图片真实高度
        this.setData({
          imgwidth: $width,
          imgheight: $height
        })
      },

    onReady: function() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
            // ,animation: {
            //     duration: 400,
            //     timingFunc: "easeIn"
            // }
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
            path: "/pages/artworks/artworks"
        };
    },

    // 点击幻灯片
    gotoBannerLink: function(t) {
        var a = t.currentTarget.dataset.link;
        console.info("open link", a), a && (a.includes("https://mp.weixin.qq.com") || a.includes("haybirds.cn")) && wx.navigateTo({
            url: "/pages/webview/webview?link=" + a
        });
    },


    tapCampaignSplash: function() {
        t.campaignEventLog("click_splash"), console.log("tapCampaignSplash"), this.setData({
            showCampaignSplash: !1
        });
    },
    initData: function(n) {
        var i = this, r = n || e.getStore()._id;
        // console.info("initData start", +new Date() - t.globalData.ts)
        // ,e.fetchMPConfigs().then(function(t) {
        //     var a = t.banners || [];
        //     i.setData({
        //         banners: a
        //     });
        // })

        // e.fetchProducts(r).then(function(n) {
        //     var r = o(n.categories, n.items), c = r.find(function(t) {
        //         return t.is_themes;
        //     }).packages.map(function(t) {
        //         return {
        //             title: t.title,
        //             id: t._id,
        //             cover: t.gallery.length && t.gallery[0].url.raw,
        //             category_id: t.category._id
        //         };
        //     }), s = a.chunkArray(c.filter(function(t) {
        //         return t.cover;
        //     }), 6);
        //     console.info("themeGroups>>>", s), i.setData({
        //         store: e.getStore(),
        //         packageLoaded: !0,
        //         categories: r,
        //         themeGroups: s
        //     }), wx.setNavigationBarTitle({
        //         title: "" + i.data.store.name
        //     }), wx.hideLoading(), console.info("hideLoading", +new Date() - t.globalData.ts);
        // });
    },
    onPreviewSlides: function(t) {
        t.currentTarget.dataset.url;
        var a = t.currentTarget.dataset.category;
        t.currentTarget.dataset.package;
        wx.navigateTo({
            url: "/pages/product-detail/product-detail?category_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    loadThemePhotos: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log("e.currentTarget.dataset", t.currentTarget.dataset), wx.navigateTo({
            url: "/pages/themes/themes?category_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    loadMorePhotos: function(t) {
        var a = t.currentTarget.dataset.category;
        t.currentTarget.dataset.package;
        wx.navigateTo({
            url: "/pages/product-detail/product-detail?category_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    gotoProductDetail: function(t) {
        // var a = t.currentTarget.dataset.categoryid;
        // wx.navigateTo({
        //     url: "/pages/product-detail/product-detail?category_id=" + a + "&type=nj",
        //     success: function(t) {},
        //     fail: function(t) {},
        //     complete: function(t) {}
        // });
    },
    onSwitchTab: function(t) {
        wx.navigateTo({
            url: "/pages/product-detail/product-detail?category_id=" + a + "&type=nj",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
        
        var a = t.currentTarget.dataset.categoryid;
        wx.navigateTo({
            url: "/pages/product-detail/product-detail?category_id=" + a + "&type=nj",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },

    gotozx: function() {
        wx.navigateTo({
            url: "/pages/zx/zx",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },

});