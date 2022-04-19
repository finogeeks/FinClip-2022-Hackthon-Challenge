<template>
	<view class="content">
		<view class="formPost">
			<u-form :model="form" ref="uForm" label-position="top">
				<u-form-item label="投诉内容">
					<u-checkbox-group :wrap="true" @change="checkboxGroupChange">
						<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list"
							:key="index" :name="item.name">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="联系人(选填)">
					<u-input v-model="form.name" placeholder="请输入联系人" />
				</u-form-item>
				<u-form-item label="微信号(选填)">
					<u-input v-model="form.weixin" placeholder="请输入微信号" />
				</u-form-item>
				<u-form-item label="手机号码(选填)">
					<u-input v-model="form.phone" placeholder="请输入手机号码" />
				</u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
		</view>

	</view>
</template>

<script>
	var app = getApp();
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				user: '',
				form: {
					content: '',
					name: '',
					weixin: '',
					phone: ''
				},
				content: '',
				id: 0,
				title: '',
				link:'',
				list: [{
						name: '广告内容',
						checked: false,
						disabled: false
					},
					{
						name: '政治敏感',
						checked: false,
						disabled: false
					},
					{
						name: '色情低俗',
						checked: false,
						disabled: false
					},
					{
						name: '违法违规',
						checked: false,
						disabled: false
					},
					{
						name: '搬运抄袭',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
						checked: false,
						disabled: false
					},
				]

			}
		},
		onLoad(options) {
			console.log(options)
			this.title = options.title;
			this.id = options.id;
			this.link=options.link
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		methods: {
			checkboxChange(e) {
				console.log(e);
			},
			checkboxGroupChange(e) {
				this.content = e.toString();
				console.log(this.content)
			},
			submit: function() {
				let args = {}
				let meta = {}
				let content = this.title + '(' + this.id + ')' + '涉及' + this.content+this.link;
				args.content = content
				meta.contact = this.form.name
				meta.weixin = this.form.weixin
				meta.telphone = this.form.phone
				args.meta = meta
				if (!this.user) {
					wx.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.showLoading({
						title:'正在提交'
					})
					API.addBooks(args).then(res => {
							//console.log( res )
							if (res.status === 200) {
								this.content = "";
								this.contact = "";
								this.weixin = "";
								this.telphone = "";
								uni.showToast({
									title: '反馈成功!',
									icon: 'success',
									duration: 900
								})
								setTimeout(function() {
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}, 900)
								uni.hideLoading();

							} else {
								uni.showModal({
									title: '提示',
									content: '留言失败，请稍后重试'
								})
							}
						})
						.catch(err => {
							console.log(err)
							uni.showModal({
								title: '提示',
								content: '留言失败，请稍后重试'
							})
						})
				}
			}
		}
	}
</script>

<style>
	.formPost {
		padding: 0 30rpx;
	}
</style>
