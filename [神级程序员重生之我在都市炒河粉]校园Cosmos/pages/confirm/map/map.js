var amapFile = require('libs/amap-wx.130');
Page({
  data:{
    markers:[{
      icon:"location",
      id:0,
      latitude:23.304068,
      longitude:113.5685,
    }],
    
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'72e5a9bfe887af8e4065bf8e1ed60012'});
    myAmapFun.getPoiAround({
      success: function(data){
        //成功回调
        console.log(data)
      },
      fail:function(e){
        console.log(e)
      }
    })

  },
})