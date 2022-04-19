<template>
	<view class="content">
		<view @tap="onItemClick(notification.id)" class="item-container" v-for="(notification,index) in messageList" :key="index">
			<view style="width: 100%; height: 0.5px; background: #EDEDED"></view>
			<view class="item">
				<view class="avatar">
					<image class="item-avatar" mode="aspectFill" src="@/static/images/icon_notification_blue.png">
					</image>
					<u-badge v-if="notification.status=='未读消息'" bgColor="#f00" :offset="offset" count="1" type="green"
						class="badge">
					</u-badge>
				</view>
				<view class="item-middle">
					<text class="item-middle-name">{{notification.type}}</text>
					<rich-text :nodes="notification.title" class="item-middle-content"></rich-text>
					<text class="item-middle-time">查看详情></text>
					<text class="item-middle-time">{{notification.date}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				offset: [-2, -2],
				messageList: [],
				page: 1,
			}
		},
		onShow: function() {
			let user = app.globalData.user
			if (!user) {
				uni.showToast({
					title: '未登录,请登录',
				})
				uni.navigateTo({
					url: '/pages/login/login',
				})
			} else {
				this.getMessages({
					type: 'system',
					page: this.page,
				});
			}

		},
		methods: {
			getMessages: function(args) {
				API.getMessage(args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.messageList = this.messageList.concat(res)
					this.page = this.page + 1
				}).catch(err => {
					console.log(err);
					if (err.message == "授权登录信息错误, 无法获取用户信息") {
						uni.navigateTo({
							url: '/pages/login/login?canBack=true',
						})
					}
				})
			},
			onItemClick:function(id){
				uni.navigateTo({
					url:'/pages/message/systemmsg/systemmsg?id='+id
				})
			}
		}
	}
</script>

<style>
	.tab_container {
		position: fixed;
		width: 100%;
		height: 100rpx;
		z-index: 200;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background: #fff;
	}

	.tab_item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		flex-direction: column;
		position: relative;
	}

	.tab-item-tip {
		position: absolute;
		top: 0;
		right: 90rpx;
	}

	.top-containe-blank {
		height: 100rpx;
	}

	.tab_item_checked,
	.tab_item_normal,
	.tab_title {
		width: 100%;
		line-height: 48rpx;
		font-size: 28rpx;
		flex-grow: 1;
		padding: 24rpx 0;
		text-align: center;
		box-sizing: border-box;
		font-weight: 500;
		border-bottom: 1px solid #dce0e6;
	}

	.tab_item_checked {
		color: #333333;
	}

	.tab_item_normal {
		color: #999999;
	}

	.tab-line {
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -40rpx;
		z-index: 99;
		background: #333333;
		width: 80rpx;
		height: 6rpx;
	}

	.top-containe-blank {
		height: 100rpx;
	}
	.avatar{
		position: relative;
	}

	.item-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		box-sizing: border-box;
	}

	.item {
		position: relative;
		width: 100%;
		min-height: 216rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 0 32rpx;
		padding-top: 34rpx;
		padding-bottom: 32rpx;
		background: #FFFFFF;
	}

	.item-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.item-middle {
		width: 480rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		box-sizing: border-box;
		margin-left: 24rpx;
	}

	.item-middle-name {
		font-size: 28rpx;
		color: #576B95;
	}

	.item-middle-content {
		font-size: 28rpx;
		color: #333333;
		margin-top: 8rpx;
		font-weight: 500;
	}

	.item-middle-time {
		font-size: 24rpx;
		color: #999999;
		margin-top: 26rpx;
	}

	.item-right-text {
		position: absolute;
		width: 100rpx;
		right: 32rpx;
		line-height: 40rpx;
		text-align: center;
		align-self: center;
		font-size: 24rpx;
		color: #999999;
	}

	.item-right {
		position: absolute;
		right: 32rpx;
		width: 32rpx;
		height: 34rpx;
		align-self: center;
	}
</style>
