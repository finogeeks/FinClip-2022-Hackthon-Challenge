//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		rateCount: 5,
		rate: 3,
		rate6Count: 5,
		rate6: 3,
		rate5Count: 7,
		rate5: 7,
		rate4Count: 5,
		rate4: 3,
		rate3Count: 5,
		rate3: 3
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
	},
	changeRate6(evt) {
		let rate6 = evt.currentTarget.dataset.index;
		if (this.data.rate6 == rate6) {
			rate6 = rate6 - 1;
		}
		this.setData({ rate6 });
	},
	changeRate5(evt) {
		let rate5 = evt.currentTarget.dataset.index;
		if (this.data.rate5 == rate5) {
			rate5 = rate5 - 1;
		}
		this.setData({ rate5 });
	},
	changeRate4(evt) {
		let rate4 = evt.currentTarget.dataset.index;
		if (this.data.rate4 == rate4) {
			rate4 = rate4 - 1;
		}
		this.setData({ rate4 });
	},
	changeRate3(evt) {
		let rate3 = evt.currentTarget.dataset.index;
		if (this.data.rate3 == rate3) {
			rate3 = rate3 - 1;
		}
		this.setData({ rate3 });
	}
});
