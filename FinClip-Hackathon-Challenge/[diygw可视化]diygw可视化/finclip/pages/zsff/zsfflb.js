//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		search: '',
		rateCount: 5,
		rate: 5
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
	changeRate(evt) {
		let rate = evt.currentTarget.dataset.index;
		if (this.data.rate == rate) {
			rate = rate - 1;
		}
		this.setData({ rate });
	}
});
