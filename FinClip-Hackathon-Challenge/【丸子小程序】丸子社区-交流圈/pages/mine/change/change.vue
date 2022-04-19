<template>
	<view class="content">
		<view class="account">
			<view v-for="(item,index) in account" :key="index" class="account-item">
				<view class="image" @tap="select(item.userLogin,item.loginCode)">
					<image :src="item.avatarUrl"></image>
				</view>
				<view class="name" @tap="select(item.userLogin,item.loginCode)">
					<view>昵称：{{item.nickName}}</view>
					<view>登陆名：{{item.userLogin}}</view>
				</view>
				<view class="delete-image">
					<image @tap="deleteItem(index)" src="/static/images/icon_delete_buoy.png" mode="widthFix"></image>

				</view>
			</view>
			<view @tap="addAccont" class="account-item">
				<view class="image">
					<image src="/static/images/msnoti.png"></image>
				</view>
				<view class="name">
					<view>还没有账号？</view>
					<view>立即登陆</view>
				</view>
			</view>
			<view @tap="deleteAccont" class="account-item">
				<view class="image">
					<image src="/static/images/icon_delete_buoy.png"></image>
				</view>
				<view class="name">
					<view>清除所有账号？</view>
					<view>立即清除</view>
				</view>
			</view>
			<view @click="importAcount" class="bbPuser account-item" v-if="isAdmin=='true'&&!isAdd">
				<view class="image">
					<image src="/static/images/msmess.png"></image>
				</view>
				<view class="name">
					<view>是否导入马甲账号？</view>
					<view>立即导入</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				account: [],
				isAdmin: false,
				isAdd: false,
			}
		},
		onLoad(options) {
			if (options) {
				this.isAdmin = options.isAdmin;
			}


		},
		onShow() {
			let account = uni.getStorageSync('account');
			let isAdd=uni.getStorageSync('isAdd');
			console.log(account);
			this.account = account;
		},
		methods: {
			addAccont: function() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			deleteItem: function(index) {
				let that = this;
				uni.showModal({
					title: '是否删除该账号',
					content: '删除后需要重新登录添加',
					success: function(res) {
						if (res.confirm) {
							that.account.splice(index, 1);
							uni.setStorageSync('account', that.account);
						}
					}
				})

			},
			importAcount: function() {
				API.getBbpUserInfo().then(res => {
					let account = uni.getStorageSync('account');
					console.log(res);
					if (!account) {
						let data = [];
						for(let i=0;i<res.length;i++){
							data.push(res[i]);
						}
						uni.setStorageSync('account', data);
						uni.setStorageSync('isAdd', true);
						this.isAdd=true;
						this.account = data;
					} else {
						for(let i=0;i<res.length;i++){
							account.push(res[i]);
						}
						uni.setStorageSync('account', account);
						uni.setStorageSync('isAdd', true);
						console.log(account);
						this.account = account;
						this.isAdd=true;
					}

				})
			},
			deleteAccont:function(){
			  let that=this;
				uni.showModal({
					title: '是否删除所有账号',
					content: '删除后需要重新登录添加',
					success: function(res) {
						if (res.confirm) {
							that.account=[];
							uni.setStorageSync('account', []);
						}
					}
				})
			},
			select: function(username, password) {
				let that = this;
				let data = {
					'login': username,
					'password': password,
				}
				API.acountlogin(data).then(res => {
					console.log(res);
					getApp().globalData.user = res.user;
					uni.setStorageSync('user', res.user);
					uni.setStorageSync('_USER_OPENID', res.user.openId);
					//uni.setStorageSync('_SESSION_KEY', res.session_key);
					if (res.unionid) {
						uni.setStorageSync('_USER_UNIONID', res.unionid);
					}
					if (res.access_token) {
						uni.setStorageSync('token', res.access_token);
						uni.setStorageSync('expired_in', res.expired_in);
					}
					that.$refs.uToast.show({
						title: '登录成功',
						type: 'success',
					})
					if (this.canBack) {
						uni.navigateBack({
							delta: 1,
						})
					} else {
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}

				}).catch(err => {
					that.$refs.uToast.show({
						title: err.message,
						type: 'error',
					})
				})
			},
		}
	}
</script>

<style>
	.account-item {
		border-radius: 20rpx;
		position: relative;
		display: flex;
		margin: 30rpx;
		box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, .1);
	}

	.delete-image {
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}

	.delete-image image {
		width: 45rpx;
		height: 45rpx;
	}

	.image {
		width: 150rpx;
		height: 150rpx;
	}

	.image image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin: 20rpx;
	}

	.name {
		padding: 20rpx;
		font-size: 32rpx;
		color: #434343;
	}
</style>
