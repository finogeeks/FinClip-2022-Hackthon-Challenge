//create by: 邓志锋 <280160522@qq.com> <http://www.diygw.com>
require('./page-extend');
App({
	globalData: {
		userInfo: null,
		tabBar: ['/pages/index', '/pages/compoment', '/pages/page/page', '/pages/about'],
		homePage: '/pages/index',
		pages: [
			'/pages/index',
			'/pages/page/page',
			'/pages/app/index',
			'/pages/app/shop',
			'/pages/zsff/zsff',
			'/pages/zsff/zsfflb',
			'/pages/zsff/zsffsq',
			'/pages/zsff/zsffgl',
			'/pages/layout',
			'/pages/button',
			'/pages/avatar',
			'/pages/tag',
			'/pages/title',
			'/pages/grid',
			'/pages/list',
			'/pages/image',
			'/pages/swiper',
			'/pages/timeline',
			'/pages/steps',
			'/pages/modal',
			'/pages/tab',
			'/pages/about',
			'/pages/buttons',
			'/pages/rate',
			'/pages/progress',
			'/pages/notice',
			'/pages/absolute',
			'/pages/collapse',
			'/pages/audio',
			'/pages/cubes',
			'/pages/compoment',
			'/pages/swipers',
			'/pages/forms',
			'/pages/floatbar'
		]
	},
	onLaunch() {
		ft.getSystemInfo({
			success: (e) => {
				this.globalData.StatusBar = e.statusBarHeight;
				let capsule = ft.getMenuButtonBoundingClientRect();
				this.globalData.WindowWidth = e.windowWidth;
				this.globalData.PixelRatio = 750 / e.windowWidth;
				if (capsule) {
					this.globalData.Custom = capsule;
					this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					this.globalData.CustomBar = e.statusBarHeight + 50;
				}
			}
		});
	},
	onShow() {},
	onHide() {}
});
