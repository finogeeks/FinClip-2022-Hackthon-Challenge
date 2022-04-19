<template>
	<view class="content">
		<view class="formPost">
			<u-form :model="form" ref="uForm" label-position="top">
				<u-form-item label="反馈内容">
					<u-input v-model="form.content" type="textarea" placeholder="请输入反馈内容"/>
				</u-form-item>
				<u-form-item label="联系人">
					<u-input v-model="form.name" placeholder="请输入联系人"/>
				</u-form-item>
				<u-form-item label="微信号">
					<u-input v-model="form.weixin" placeholder="请输入微信号" />
				</u-form-item>
				<u-form-item label="手机号码">
					<u-input v-model="form.phone" placeholder="请输入手机号码"/>
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
				user:'',
				form: {
					content: '',
					name: '',
					weixin: '',
					phone: ''
				},

			}
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		methods: {
			submit: function() {
				let args = {}
				let meta = {}
				args.content = this.form.content
				meta.contact = this.form.name
				meta.weixin = this.form.weixin
				meta.telphone = this.form.phone
				args.meta = meta
				if (!this.user) {
					wx.navigateTo({
						url: '../login/login'
					})
				} else {
					API.addBooks(args).then(res => {
							//console.log( res )
							if (res.status === 200) {
								this.content="";
								this.contact="";
								this.weixin="";
								this.telphone= "";
								uni.showToast({
									title: '留言成功!',
									icon: 'success',
									duration: 900
								})
								setTimeout(function() {
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}, 900)
								
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
