const app = getApp()
var that = ''

Page({
  data: {
     isShow:false,
     image:'https://img0.baidu.com/it/u=3245091159,1620794632&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
     base64Img:'',
     token:'',
     result:"",
     flower:"",
     text:"",
     isTrue:null,
     hasImg:null
  },
  //选择图片按钮
  imgSelect(){
    this.setData({
      isShow:false
    })
    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:(res)=>{
        const tempFilePaths = res.tempFilePaths[0]
        this.getB64ByUrl(tempFilePaths)
        this.setData({
          image:tempFilePaths
        })
      }
    })
  },
  //植物识别
  plant(){
    if(!this.data.base64Img){
      this.setData({
        isShow:true
      })
      return
    }
    this.getToken()
  },
  //图片转为base64
  getB64ByUrl(url){
    wx.getFileSystemManager().readFile({
      filePath:url,
      encoding:'base64',
      success:(res)=>{
        this.setData({
          base64Img:res.data
        })
      }
    })
  },
  //获取token
  getToken(){
    wx.showLoading({
      title: '识别中...',
    })
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=aThOHaMdpLN1rcnkcnjR4bLM&client_secret=EzrNCd0uT5CbsWoPMd1nq5jFYxdeQhkh',
      success:(res)=>{
         const token = res.data.access_token
        this.getResult(token)
      }
    })
  },
  //获取识别结果
  getResult(token){
   wx.request({
     url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?baike_num=4&access_token=' + token,
     method:'post',
     data:{
      image:this.data.base64Img
     },
     header:{
       'Content-Type':'application/x-www-form-urlencoded'
     },
     success:(res)=>{
       console.log(res);
       let content=res.data.result[0];
       let isTrue,hasImg;
       if(res.data.result.length==1){
         isTrue=false;
         wx.showModal({
           content:"😐 未识别到植物",
           confirmColor: '#49d393',
           showCancel:false,
         })
       }else{
        isTrue=true;
       }
       console.log(Boolean(content.baike_info.image_url))
       if(Boolean(content.baike_info.image_url)){
         hasImg=true;
       }else{
         hasImg=false;
       }
       this.setData({
         result:content.name,
         text:content.baike_info.description,
         flower:content.baike_info.image_url,
         isTrue,
         hasImg
       })
     },
     complete:()=>{
       wx.hideLoading()
     }
   })
  },

  resultFilter(arr){
    arr.forEach((item)=>{
      item.score = (item.score.toFixed(4)*100).toFixed(2) + '%'
    })
    return arr
    },
   // 生命周期函数--监听页面加载
  onLoad: function (options) {
   that = this
  },
})