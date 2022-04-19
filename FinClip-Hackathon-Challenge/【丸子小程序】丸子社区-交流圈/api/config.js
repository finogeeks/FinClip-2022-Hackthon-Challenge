module.exports = {
	h5link:'https://cxcat.com/h5/',
	isWaterFull:false,//是否开启瀑布流 true：开启，false：关闭
	tabbar: [{
		pagePath: "/pages/tabbar/index/index",
		iconPath: "/static/images/tabbar/tab_index_normal.png",
		selectedIconPath: "/static/images/tabbar/tab_index_active.png",
		text: "首页",
		name: "home"
	}, {
		pagePath: "/pages/tabbar/circle/circle",
		iconPath: "/static/images/tabbar/tab_nearby_normal.png",
		selectedIconPath: "/static/images/tabbar/tab_nearby_active.gif",
		text: "圈子",
		name: "circle"
	}, {
		pagePath: "/pages/creat/creat",
		iconPath: "/static/images/tabbar/plus.png",
		selectedIconPath: "/static/images/tabbar/plus.png",
		scale: 4,
		text: "",
		name:"creat",
		raisede: true
	}, {
		pagePath: "/pages/tabbar/message/message",
		iconPath: "/static/images/tabbar/tab_message_normal.png",
		selectedIconPath: "/static/images/tabbar/tab_message_active.png",
		text: "消息",
		name: "message"
	}, {
		pagePath: "/pages/tabbar/mine/mine",
		iconPath: "/static/images/tabbar/tab_user_normal.png",
		selectedIconPath: "/static/images/tabbar/tab_user_active.png",
		text: "我的",
		name: "mine"
	}]

}
