//create by: 邓志锋 <280160522@qq.com> <https://www.diygw.com> DIYGW可视化设计一键生成源码
Page({
	data: {
		input: '',
		input5: '',
		input1: '',
		input2: '',
		input3: '',
		input4: '',
		textarea: '',
		radioDatas: [
			{ value: '1', label: '选项一', checked: true },
			{ value: '2', label: '选项二', checked: false },
			{ value: '3', label: '选项三', checked: false }
		],
		radio: '1',
		radioLabel: '',
		radio1Datas: [
			{ value: '1', label: '选项一', checked: true },
			{ value: '2', label: '选项二', checked: false },
			{ value: '3', label: '选项三', checked: false }
		],
		radio1: '1',
		radio1Label: '',
		checkboxDatas: [
			{ value: '1', label: '选项一', checked: true },
			{ value: '2', label: '选项二', checked: true },
			{ value: '3', label: '选项三', checked: false }
		],
		checkbox: ['1', '2'],
		checkboxLabel: `选项一,选项二`,
		checkbox1Datas: [
			{ value: '1', label: '选项一', checked: true },
			{ value: '2', label: '选项二', checked: true },
			{ value: '3', label: '选项三', checked: false }
		],
		checkbox1: ['1', '2'],
		checkbox1Label: `选项一,选项二`,
		selectDatas: [
			{ value: '1', label: '选项一', checked: false },
			{ value: '2', label: '选项二', checked: false },
			{ value: '3', label: '选项三', checked: false }
		],
		selectIndex: -1,
		select: '',
		selectLabel: '',
		selectsInitDatas: [
			{ children: [{ children: [], label: '市辖区' }], label: '北京市' },
			{
				children: [
					{ children: [], label: '广州市' },
					{ children: [], label: '深圳市' },
					{ children: [], label: '中山市' },
					{ children: [], label: '梅州市' }
				],
				label: '广东省'
			},
			{
				children: [
					{ children: [], label: '南京市' },
					{ children: [], label: '无锡市' },
					{ children: [], label: '苏州市' }
				],
				label: '江苏省'
			}
		],
		selectsDatas: [['北京市', '广东省', '江苏省'], ['市辖区']],
		selects: [0, 0],
		selectsLabel: '北京市,市辖区',
		pickerviewDatas: [
			['选项一', '选项二', '选项三'],
			['选项一', '选项二', '选项三']
		],
		pickerview: [0, 0],
		pickerviewLabel: '选项一,选项一',
		switched: true,
		date: '',
		slider: 3,
		uploadDatas: [],
		upload: '',
		rateCount: 5,
		rate: 3
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
	async init() {
		await this.getForm();
	},
	async getForm() {
		if (this.data.globalOption && this.data.globalOption.id) {
			//调用数据
			let param = {
				tableName: 'form'
			};
			param = this.$tools.extend(param, this.data.globalOption);
			//调用数据
			let data = await this.$http.get('', param, {}, 'json');
			if (data.code == 200) {
				let values = {};
				let formData = data.data;
				for (let key in formData) {
					values[key] = formData[key];
				}
				this.setData(values);
			} else {
				this.showModal(data.message);
			}
		}
	},
	async submitForm(e) {
		this.validateForm = this.Validate({});
		if (!this.validateForm.checkForm(e)) {
			let data = this.validateForm.errorList[0];
			this.showToast(data.msg, 'none');
			return false;
		} else {
			//保存数据
			let param = e.detail.value;
			let url = '';
			if (!url) {
				this.showToast('请先配置表单提交地址', 'none');
				return false;
			}

			let data = await this.$http.post('', param, {}, 'json');
			if (data.code == 200) {
				this.showToast(data.msg, 'success');
			} else {
				this.showModal(data.msg);
			}
		}
	},
	resetForm() {
		console.log('form发生了reset事件');
	},
	changeRadio(evt) {
		let value = evt.detail.value;
		let radioDatas = this.data.radioDatas;

		let radioLabel = this.data.radioLabel;
		for (var i = 0, len = radioDatas.length; i < len; ++i) {
			radioDatas[i].checked = radioDatas[i].value == value;
			if (radioDatas[i].checked) {
				radioLabel = radioDatas[i].label;
			}
		}
		this.setData({ radioLabel, radioDatas });
	},
	changeRadio1(evt) {
		let value = evt.detail.value;
		let radio1Datas = this.data.radio1Datas;

		let radio1Label = this.data.radio1Label;
		for (var i = 0, len = radio1Datas.length; i < len; ++i) {
			radio1Datas[i].checked = radio1Datas[i].value == value;
			if (radio1Datas[i].checked) {
				radio1Label = radio1Datas[i].label;
			}
		}
		this.setData({ radio1Label, radio1Datas });
	},
	changeCheckbox(evt) {
		let values = evt.detail.value;
		let checkboxDatas = this.data.checkboxDatas;
		let checkboxLabels = [];
		let checkbox = [];
		for (var i = 0, len = checkboxDatas.length; i < len; ++i) {
			const item = checkboxDatas[i];
			if (values.indexOf(item.value) >= 0) {
				item['checked'] = true;
			} else {
				item['checked'] = false;
			}
			if (item['checked']) {
				checkboxLabels.push(item['label']);
				checkbox.push(item['value']);
			}
		}
		let checkboxLabel = checkboxLabels.join(',');
		this.setData({ checkboxLabel, checkboxDatas });
	},
	changeCheckbox1(evt) {
		let values = evt.detail.value;
		let checkbox1Datas = this.data.checkbox1Datas;
		let checkbox1Labels = [];
		let checkbox1 = [];
		for (var i = 0, len = checkbox1Datas.length; i < len; ++i) {
			const item = checkbox1Datas[i];
			if (values.indexOf(item.value) >= 0) {
				item['checked'] = true;
			} else {
				item['checked'] = false;
			}
			if (item['checked']) {
				checkbox1Labels.push(item['label']);
				checkbox1.push(item['value']);
			}
		}
		let checkbox1Label = checkbox1Labels.join(',');
		this.setData({ checkbox1Label, checkbox1Datas });
	},
	changeSelect(e) {
		let selectIndex = e.detail.value;
		let selectDatas = this.data.selectDatas;
		let selectLabel = selectDatas[selectIndex].label;
		let select = selectDatas[selectIndex].value;

		this.setData({ selectLabel, selectDatas });
	},
	changeSelects(evt) {
		let selects = this.data.selects;
		let selectsDatas = this.data.selectsDatas;
		let selectsInitDatas = this.data.selectsInitDatas;
		selects[evt.detail.column] = evt.detail.value;
		if (evt.detail.column == 0) {
			selects.splice(1, 1, 0);
			selectsDatas.splice(1, 1, this.getPickerChildren(selectsInitDatas, selects[0], null));
		}
		let selectsLabels = [selectsDatas[0][selects[0]], selectsDatas[1][selects[1]]];
		let selectsLabel = selectsLabels.join(',');

		this.setData({ selects, selectsDatas, selectsLabel });
	},
	changePickerview(evt) {
		let pickerviewDatas = this.data.pickerviewDatas;
		let pickerview = this.data.pickerview;
		pickerview[evt.detail.column] = evt.detail.value;
		let pickerviewLabels = [pickerviewDatas[0][pickerview[0]], pickerviewDatas[1][pickerview[1]]];
		let pickerviewLabel = pickerviewLabels.join(',');

		this.setData({ pickerview, pickerviewDatas, pickerviewLabel });
	},
	changeSwitched(evt) {
		let checked = !evt.currentTarget.dataset.checked;
		this.setData({
			switched: checked
		});
	},
	changeDate(e) {
		this.setData({
			date: checked
		});
	},
	changeSlider(evt) {
		let slider = evt.detail.value;
		this.setData({ slider });
	},
	uploadUpload(e) {
		this.uploadImage(this, 'upload', 'uploadDatas');
	},
	delUpload(evt) {
		let { index } = evt.currentTarget.dataset;
		let Datas = this.data.uploadDatas;
		Datas.splice(index, 1);
		let upload = uploadDatas.join(',');
		this.setData({ upload, Datas });
	},
	previewUpload(e) {
		ft.previewImage({
			current: e.currentTarget.dataset.url, // 当前显示图片的http链接
			urls: this.data.uploadDatas // 需要预览的图片http链接列表
		});
	},
	changeRate(evt) {
		let rate = evt.currentTarget.dataset.index;
		if (this.data.rate == rate) {
			rate = rate - 1;
		}
		this.setData({ rate });
	}
});
