//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		collapse1Datas: [
			{ text: '田家元日', isShow: false },
			{ text: '正月十五夜灯', isShow: false },
			{ text: '观灯乐行', isShow: false }
		],
		text4: `<p>昨夜斗回北，今朝岁起东。</p>
<p>我年已强仕，无禄尚忧农。</p>
<p>桑野就耕父，荷锄随牧童。</p>
<p>田家占气候，共说此年丰。</p>`,
		text5: `<p>千门开锁万灯明，正月中旬动帝京。</p>
<p>三百内人连袖舞，一时天上著词声</p>`,
		text6: `<p>月色灯山满帝都，香车宝盖隘通衢。</p>
<p>身闲不睹中兴盛，羞逐乡人赛紫姑。</p>`,
		collapse2Datas: [
			{ text: '田家元日', isShow: false },
			{ text: '正月十五夜灯', isShow: false },
			{ text: '观灯乐行', isShow: false }
		],
		text2: `<p>昨夜斗回北，今朝岁起东。</p>
<p>我年已强仕，无禄尚忧农。</p>
<p>桑野就耕父，荷锄随牧童。</p>
<p>田家占气候，共说此年丰。</p>`,
		text9: `<p>千门开锁万灯明，正月中旬动帝京。</p>
<p>三百内人连袖舞，一时天上著词声</p>`,
		text11: `<p>月色灯山满帝都，香车宝盖隘通衢。</p>
<p>身闲不睹中兴盛，羞逐乡人赛紫姑。</p>`,
		collapseDatas: [
			{ text: '田家元日', isShow: false },
			{ text: '正月十五夜灯', isShow: false },
			{ text: '观灯乐行', isShow: false }
		],
		text1: `<p>昨夜斗回北，今朝岁起东。</p>
<p>我年已强仕，无禄尚忧农。</p>
<p>桑野就耕父，荷锄随牧童。</p>
<p>田家占气候，共说此年丰。</p>`,
		text3: `<p>千门开锁万灯明，正月中旬动帝京。</p>
<p>三百内人连袖舞，一时天上著词声</p>`,
		text8: `<p>月色灯山满帝都，香车宝盖隘通衢。</p>
<p>身闲不睹中兴盛，羞逐乡人赛紫姑。</p>`
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
	changeCollapse1(evt) {
		let { index } = evt.currentTarget.dataset;
		let collapse1Datas = this.data.collapse1Datas;

		for (let i = 0; i < collapse1Datas.length; i++) {
			if (collapse1Datas[i]['isShow'] && i == index) {
				collapse1Datas[i]['isShow'] = false;
			} else {
				collapse1Datas[i]['isShow'] = i == index;
			}
		}
		this.setData({ collapse1Datas });
	},
	changeCollapse2(evt) {
		let { index } = evt.currentTarget.dataset;
		let collapse2Datas = this.data.collapse2Datas;

		collapse2Datas[index]['isShow'] = !collapse2Datas[index]['isShow'];
		this.setData({ collapse2Datas });
	},
	changeCollapse(evt) {
		let { index } = evt.currentTarget.dataset;
		let collapseDatas = this.data.collapseDatas;

		collapseDatas[index]['isShow'] = !collapseDatas[index]['isShow'];
		this.setData({ collapseDatas });
	}
});
