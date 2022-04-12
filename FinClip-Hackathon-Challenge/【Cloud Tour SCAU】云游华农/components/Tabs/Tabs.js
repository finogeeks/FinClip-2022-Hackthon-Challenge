// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      //console.log(e.currentTarget.dataset);
      const index=e.currentTarget.dataset.index;
      this.triggerEvent("itemChange",index);
      /*
      let tabs=this.data.tabs;
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs
      })
      */
    }
  }
})
