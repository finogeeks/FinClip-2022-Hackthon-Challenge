//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		stepsDatas: [
			{ text: `开始`, icon: 'diy-icon-title', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `等待`, icon: 'diy-icon-title', successIcon: 'diy-icon-emoji', textClazz: 'text-green' },
			{ text: `错误`, icon: 'diy-icon-title', successIcon: 'diy-icon-close', textClazz: 'text-green' },
			{ text: `完成`, icon: 'diy-icon-title', successIcon: 'diy-icon-check', textClazz: 'text-green' }
		],
		stepsIndex: 0,
		steps1Datas: [
			{ text: `开始`, icon: 'diy-icon-title', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `等待`, icon: 'diy-icon-title', successIcon: 'diy-icon-emoji', textClazz: 'text-green' },
			{ text: `错误`, icon: 'diy-icon-title', successIcon: 'diy-icon-close', textClazz: 'text-green' },
			{ text: `完成`, icon: 'diy-icon-title', successIcon: 'diy-icon-check', textClazz: 'text-green' }
		],
		steps1Index: 0,
		steps3Datas: [
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `等待`, icon: '', successIcon: 'diy-icon-emoji', textClazz: 'text-green' },
			{ text: `错误`, icon: '', successIcon: 'diy-icon-close', textClazz: 'text-green' },
			{ text: `完成`, icon: '', successIcon: 'diy-icon-check', textClazz: 'text-green' }
		],
		steps3Index: 0,
		steps2Datas: [
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `等待`, icon: '', successIcon: 'diy-icon-emoji', textClazz: 'text-green' },
			{ text: `错误`, icon: '', successIcon: 'diy-icon-close', textClazz: 'text-green' },
			{ text: `完成`, icon: '', successIcon: 'diy-icon-check', textClazz: 'text-green' },
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' },
			{ text: `开始`, icon: '', successIcon: 'diy-icon-usefullfill', textClazz: 'text-green' }
		],
		steps2Index: 0
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
	changeSteps(evt) {
		let { type } = evt.currentTarget.dataset;
		let stepsIndex = this.data.stepsIndex;
		if (type == 'prev') {
			if (stepsIndex > -1) {
				stepsIndex = stepsIndex - 1;
				this.setData({ stepsIndex });
			} else {
				this.showToast('已经是初始位置', 'none');
			}
		} else {
			if (stepsIndex < this.data.stepsDatas.length - 1) {
				stepsIndex = stepsIndex + 1;
				this.setData({ stepsIndex });
			} else {
				this.showToast('已经是最后一个', 'none');
			}
		}
	},
	changeSteps1(evt) {
		let { type } = evt.currentTarget.dataset;
		let steps1Index = this.data.steps1Index;
		if (type == 'prev') {
			if (steps1Index > -1) {
				steps1Index = steps1Index - 1;
				this.setData({ steps1Index });
			} else {
				this.showToast('已经是初始位置', 'none');
			}
		} else {
			if (steps1Index < this.data.steps1Datas.length - 1) {
				steps1Index = steps1Index + 1;
				this.setData({ steps1Index });
			} else {
				this.showToast('已经是最后一个', 'none');
			}
		}
	},
	changeSteps3(evt) {
		let { type } = evt.currentTarget.dataset;
		let steps3Index = this.data.steps3Index;
		if (type == 'prev') {
			if (steps3Index > -1) {
				steps3Index = steps3Index - 1;
				this.setData({ steps3Index });
			} else {
				this.showToast('已经是初始位置', 'none');
			}
		} else {
			if (steps3Index < this.data.steps3Datas.length - 1) {
				steps3Index = steps3Index + 1;
				this.setData({ steps3Index });
			} else {
				this.showToast('已经是最后一个', 'none');
			}
		}
	},
	changeSteps2(evt) {
		let { type } = evt.currentTarget.dataset;
		let steps2Index = this.data.steps2Index;
		if (type == 'prev') {
			if (steps2Index > -1) {
				steps2Index = steps2Index - 1;
				this.setData({ steps2Index });
			} else {
				this.showToast('已经是初始位置', 'none');
			}
		} else {
			if (steps2Index < this.data.steps2Datas.length - 1) {
				steps2Index = steps2Index + 1;
				this.setData({ steps2Index });
			} else {
				this.showToast('已经是最后一个', 'none');
			}
		}
	}
});
