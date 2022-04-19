const Qrcodeicu = require('../../utils/qrcodeicu-miniapp-sdk.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    ft.showLoading({
      title: '处理中',
    })

    const sdk = new Qrcodeicu();
            
    sdk.init({
        qrcodeIcuEndPoint: "https://fxl.ink/portal",
        renderEndPoint: "https://k8s.qrcode.icu/render",
        appId: "a0205f01a6144bf0984ce832a60e70f9",
        key: "d80b54922f7c4bb69f0f2ac198359945"
    });
    sdk.render("de8b986d-ca1c-4d5e-b7a6-f479516ed87c", "5b90dc39-e979-4a15-8c5a-dcd6c0e698c7")
        .addTextParam("店铺名称", "凡泰旗舰店")
        .addTextParam("商品名称", options.title)
        .addImageFileBase64ByUrl("商品图片", options.productImage+"?x-oss-process=image/resize,m_fill,w_560,h_620,limit_0/auto-orient,1/quality,q_90")
        .fetch()
        .then((data) => {
          this.setData({
            posterUrl: data.url
          });
          
          ft.hideLoading();
        });
  },

  onSavePosterClick:function(){
    ft.downloadFile({
      url: this.data.posterUrl, 
      success(res) {
        console.log(res.tempFilePath);
        ft.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) { 
            console.log(res);
          }
        })
      }
    });
  }
,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})