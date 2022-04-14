const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      value: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      value: false
    },
    isExtend: {
      type: [Boolean, String],
      value: false
    },
    isHome: {
      type: [Boolean, String],
      value: false
    },
    isExtendRadious: {
      type: [Boolean, String],
      value: true
    },
    extendHeight:{
      type:Number,
      value:0
    },
    isBack: {
      type: [Boolean, String],
      value: false
    },
    backdelta:{
      type:Number,
      value:0
    },
	backUrl:{
		type: String,
		default: ''
	},
    bgImage: {
      type: String,
      value: ''
    },
    bgCustom:{
      type: String,
      value: ''
    },
    color:{
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  lifetimes: {
    attached() {
      if(this.data.isExtendRadious===null){
        this.setData({
          isExtendRadious:true
         })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
        if(this.data.backUrl){
    	   ft.redirectTo({
    		 url: this.data.backUrl
    	   })
    	}else if(this.data.backdelta){
    	  ft.navigateBack({
    		delta: this.data.backdelta
    	  });
    	}else{
    	  ft.navigateBack();
    	} 
    },
    BackHome() {
      if(getApp().globalData.homePage){
        ft.reLaunch({
            url: getApp().globalData.homePage
        });
      }else{
        ft.showToast({
          icon:'none',
          title:"请先设置首页地址"
        })
      }
    }
  }
})