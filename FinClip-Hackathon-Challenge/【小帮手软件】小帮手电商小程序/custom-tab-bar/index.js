Component({
	"data": {
		"basePath": "/static/",
		"color": "#C0C4CC", // 未选中颜色
		"layout": "nolive",
		"theme": "",
		"selectedColor": "",
		"selected": 0,
		"list": {
			"nolive": [{
				"pagePath": "/pages/index/index",
				"iconPath": "home",
				"text": "首页"
			}, {
				"pagePath": "/pages/category/category",
				"iconPath": "cate",
				"text": "分类"
			}, {
				"pagePath": "/pages/cart/cart",
				"iconPath": "cart",
				"text": "购物车"
			}, {
				"pagePath": "/pages/user/user",
				"iconPath": "user",
				"text": "我的"
			}],
			"live": [{
				"pagePath": "/pages/index/index",
				"iconPath": "home",
				"text": "首页"
			}, {
				"pagePath": "/pages/category/category",
				"iconPath": "cate",
				"text": "分类"
			}, {
				"pagePath": "/pages/live/live",
				"iconPath": "live",
				"text": "直播"
			}, {
				"pagePath": "/pages/cart/cart",
				"iconPath": "cart",
				"text": "购物车"
			}, {
				"pagePath": "/pages/user/user",
				"iconPath": "user",
				"text": "我的"
			}]
		}
	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			wx.switchTab({
				url
			})
		}
	}
})
