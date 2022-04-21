Page({

  /**
   * 页面的初始数据
   */
  data: {
        date: '2022-04-14',
        date1: '2022-04-14',
    imgList: [],
    time: '00:00',
    time1: '00:00',
    picker:['仅管理员查看','管理员及成员查看','所有人查看']

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  EndTimeChange(e) {
    this.setData({
      time1: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showModals(e){
    this.setData({
      modalName:e.currentTarget.value
    })
  },
  submit(){
       wx.showToast({
      title: '提交成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        wx.navigateTo({
          url: '/pages/index/activ/activ',
        });}
      }) 
      },
  DelImg(e) {
    wx.showModal({
      title: '朋友',
      content: '确定要删除这个封面吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
   DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  EndDateChange(e) {
    this.setData({
      date1: e.detail.value
    })
  },
   textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
textareaBInput(e){
this.setData({
      textareaBValue: e.detail.value
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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