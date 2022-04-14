//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		tabsDatas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabsIndex: 0,
		tabs1Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs1Index: 0,
		tabs4Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs4Index: 0,
		tabs11Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs11Index: 0,
		tabs5Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs5Index: 0,
		tabs2Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs2Index: 0,
		tabs3Datas: [{ text: `关注` }, { text: `推荐` }, { text: `热榜` }, { text: `搞笑` }, { text: `视频` }, { text: `科技` }, { text: `音乐` }],
		tabs3Index: 0,
		tabs7Datas: [{ text: `关注` }, { text: `推荐` }],
		tabs7Index: 0,
		tabs10Datas: [{ text: `整体导航背景` }, { text: `推荐` }],
		tabs10Index: 0,
		tabs8Datas: [{ text: `标题在下方` }, { text: `推荐` }],
		tabs8Index: 0,
		tabs6Datas: [{ text: `标题左边` }, { text: `推荐` }],
		tabs6Index: 0,
		tabs9Datas: [{ text: `标题右边` }, { text: `推荐` }],
		tabs9Index: 0
	},
	onLoad(option) {
		if (option) {
			this.setData({
				globalOption: option
			});
		}
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.init();
	},
	async init() {},
	changeTabs(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabsIndex) return;
		this.setData({
			tabsIndex: index
		});
	},
	changeTabs1(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs1Index) return;
		this.setData({
			tabs1Index: index
		});
	},
	changeTabs4(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs4Index) return;
		this.setData({
			tabs4Index: index
		});
	},
	changeTabs11(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs11Index) return;
		this.setData({
			tabs11Index: index
		});
	},
	changeTabs5(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs5Index) return;
		this.setData({
			tabs5Index: index
		});
	},
	changeTabs2(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs2Index) return;
		this.setData({
			tabs2Index: index
		});
	},
	changeTabs3(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs3Index) return;
		this.setData({
			tabs3Index: index
		});
	},
	changeTabs7(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs7Index) return;
		this.setData({
			tabs7Index: index
		});
	},
	changeTabs10(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs10Index) return;
		this.setData({
			tabs10Index: index
		});
	},
	changeTabs8(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs8Index) return;
		this.setData({
			tabs8Index: index
		});
	},
	changeTabs6(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs6Index) return;
		this.setData({
			tabs6Index: index
		});
	},
	changeTabs9(evt) {
		let { index } = evt.currentTarget.dataset;
		if (index == this.data.tabs9Index) return;
		this.setData({
			tabs9Index: index
		});
	}
});
