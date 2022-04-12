Page({

  /**
   * 页面的初始数据
   */
  data: {
    realHeight:"",
    isTrue:[],
    id:1,
    isTrue1:false,isTrue2:false,isTrue3:false,isTrue4:false,isTrue5:false,isTrue6:false,isTrue7:false,isTrue8:false,isTrue9:false,isTrue10:false,isTrue11:false,isTrue12:false,isTrue13:false,isTrue14:false,isTrue15:false,isTrue16:false,isTrue17:false,isTrue18:false,isTrue19:false,isTrue20:false,isTrue21:false,isTrue22:false,isTrue23:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var i = 0
    for(i=0;i<23;i++){
      this.data.isTrue.push(false)
    }
  },
  clickMe(e){
    let query = wx.createSelectorQuery();
    let height;
    var id = parseInt(e.currentTarget.dataset.id);
    if(this.data.isTrue){
    query.selectAll('.intro-in').boundingClientRect(rect=>{
      height = rect[id-1].height+40;
      this.setData({
        realHeight:height+"px"
      })
    }).exec();
    if(this.data.id==id&&this.data.isTrue[id-1]){
      this.data.isTrue.splice(id-1,1,false)
    }else{
    this.data.isTrue.splice(this.data.id-1,1,false)
    switch(this.data.id){
      case 1:this.setData({isTrue1:false});break;
      case 2:this.setData({isTrue2:false});break;
      case 3:this.setData({isTrue3:false});break;
      case 4:this.setData({isTrue4:false});break;
      case 5:this.setData({isTrue5:false});break;
      case 6:this.setData({isTrue6:false});break;
      case 7:this.setData({isTrue7:false});break;
      case 8:this.setData({isTrue8:false});break;
      case 9:this.setData({isTrue9:false});break;
      case 10:this.setData({isTrue10:false});break;
      case 11:this.setData({isTrue11:false});break;
      case 12:this.setData({isTrue12:false});break;
      case 13:this.setData({isTrue13:false});break;
      case 14:this.setData({isTrue14:false});break;
      case 15:this.setData({isTrue15:false});break;
      case 16:this.setData({isTrue16:false});break;
      case 17:this.setData({isTrue17:false});break;
      case 18:this.setData({isTrue18:false});break;
      case 19:this.setData({isTrue19:false});break;
      case 20:this.setData({isTrue20:false});break;
      case 21:this.setData({isTrue21:false});break;
      case 22:this.setData({isTrue22:false});break;
      case 23:this.setData({isTrue23:false});break;
    }
    this.setData({
      id:id
    })
    this.data.isTrue.splice(id-1,1,true)
    }
    switch(id){
      case 1:this.setData({isTrue1:this.data.isTrue[id-1]});break;
      case 2:this.setData({isTrue2:this.data.isTrue[id-1]});break;
      case 3:this.setData({isTrue3:this.data.isTrue[id-1]});break;
      case 4:this.setData({isTrue4:this.data.isTrue[id-1]});break;
      case 5:this.setData({isTrue5:this.data.isTrue[id-1]});break;
      case 6:this.setData({isTrue6:this.data.isTrue[id-1]});break;
      case 7:this.setData({isTrue7:this.data.isTrue[id-1]});break;
      case 8:this.setData({isTrue8:this.data.isTrue[id-1]});break;
      case 9:this.setData({isTrue9:this.data.isTrue[id-1]});break;
      case 10:this.setData({isTrue10:this.data.isTrue[id-1]});break;
      case 11:this.setData({isTrue11:this.data.isTrue[id-1]});break;
      case 12:this.setData({isTrue12:this.data.isTrue[id-1]});break;
      case 13:this.setData({isTrue13:this.data.isTrue[id-1]});break;
      case 14:this.setData({isTrue14:this.data.isTrue[id-1]});break;
      case 15:this.setData({isTrue15:this.data.isTrue[id-1]});break;
      case 16:this.setData({isTrue16:this.data.isTrue[id-1]});break;
      case 17:this.setData({isTrue17:this.data.isTrue[id-1]});break;
      case 18:this.setData({isTrue18:this.data.isTrue[id-1]});break;
      case 19:this.setData({isTrue19:this.data.isTrue[id-1]});break;
      case 20:this.setData({isTrue20:this.data.isTrue[id-1]});break;
      case 21:this.setData({isTrue21:this.data.isTrue[id-1]});break;
      case 22:this.setData({isTrue22:this.data.isTrue[id-1]});break;
      case 23:this.setData({isTrue23:this.data.isTrue[id-1]});break;
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


