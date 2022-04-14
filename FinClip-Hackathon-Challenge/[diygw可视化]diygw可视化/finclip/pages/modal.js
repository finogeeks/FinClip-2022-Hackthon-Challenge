//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		modal: '',
		modal1: '',
		modal2: '',
		modal3: ''
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
	async init() {}
});
