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
		offsetTop: {
      type:Number,
      value: 0
    },
    index: {
      type: String,
      value: ""
    },
    enable: {
      type: Boolean,
      value: true
    },
    className: {
      type: String,
      value: ""
    },
    bgColor: {
      type: String,
      value: "#ffffff"
    },
    zIndex: {
      type: String,
      value: "999999"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
      fixed: false,
      height: "auto",
      stickyTop: 0,
      elClass: '',
      left: 0,
      width: "auto"
  },
  lifetimes: {
    attached() {
       this.setData({
         elClass:getCurrentPages()[0].$tools.guid()
       })
       this.initObserver();
    }
  },
  ready: function () {
      this.observeContent()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initObserver() {
      if (!this.data.enable)
        return;
      let stickyTop = this.data.offsetTop != 0 ? this.data.offsetTop : 0;
      this.setData({
        stickyTop
      })
			let thiz = this
      this.getRect("." + this.data.elClass).then((res) => {
				let width = res.width;
        let height = res.height;
        let left = res.left;
				this.setData({
					width,
					height,
					left
				})
        thiz.observeContent();
      });
    },
    getRect(selector) {
      return new Promise((resolve) => {
        const query = ft.createSelectorQuery().in(this);
        query.select(selector).boundingClientRect((rect) => {
          resolve(rect);
        }).exec();
      });
    },
    observeContent() {
      this.disconnectObserver("contentObserver");
      const contentObserver = ft.createIntersectionObserver(this,{
        thresholds: [0.95, 0.98, 1]
      });
      contentObserver.relativeToViewport({
          top: -this.data.stickyTop
      });
      contentObserver.observe("." + this.data.elClass, (res) => {
        this.setFixed(res.boundingClientRect.top);
      });
      this.contentObserver = contentObserver;
    },
    setFixed(top) {
      const fixed = top < this.data.stickyTop;
      this.setData({fixed})
    },
    disconnectObserver(observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    }
  }
})