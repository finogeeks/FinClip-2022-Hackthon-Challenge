<template>
	<view class="content">
		<view class="user-info-view">
			<navigator class="user-avatar-view" hover-class="none" :url="'/pages/user/user?id='+author.id">
				<image class="user-avatar-image" compression="avatar" mode="aspectFill" :src="author.avatar"></image>
			</navigator>
			<navigator class="user-view" hover-class="none" :url="'/pages/user/user?id='+author.id">
				<text class="user-nick-text">{{author.name}}</text>
				<view class="user-loaction-view">
					<text class="user-loaction-text">{{author.description}}</text>
				</view>
			</navigator>

			<view @tap="actionFollow(author.id,'follow')" class="follow-view" v-if="!isFollow">关注</view>
			<view @tap="actionFollow(author.id,'disfollow')" class="follow-view"
				style="border-color: #efefef;color: #ccc;background-color: #efefef;" v-if="isFollow">
				已关注</view>
			<view class="menu" @tap="onMenu">
				<image src="/static/images/album-more-gray.png" mode="widthFix"></image>

			</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view  class="menu-button">
				<view @tap="gotoComPlain(ids,title,link)" class="menu-item">
					投诉
				</view>
				<view @tap="blockUser(author.id)" class="menu-item">
					屏蔽该用户
				</view>
				<view @tap="gotoFeedBack" class="menu-item">
					反馈
				</view>
				<view @tap="cancel" class="menu-item">
					取消
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		name: "forum-user",
		props: {
			author: {
				type: Object,
				default: function() {
					return [];
				}
			},
			ids:{
				type: Number,
				default: 0,
			},
			title:{
				type: String,
				default: '',
			},
				
			link:{
				type: String,
				default: '',
			},
			isFollow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				show: false,
			};
		},
		methods: {
			blockUser:function(userId){
				let data = {}
				let that = this;
				let action ='blacking'// 关注动作：follow 取关动作 disfollow
				data.id = userId
				data.action = action
				API.updateFollow(data).then(res => {
						console.log(res);
						uni.showToast({
							title:res.message,
						})
						this.show=false;
					})
					.catch(err => {
						uni.showToast({
							title:'你不能屏蔽自己'
						})
						this.show=false;
						if (err.message == "授权信息有误") {
							uni.showToast({
								title:'未登录'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url: '/pages/login/login',
								})
							},2000)
							return;
						}
					})
				
			},
			actionFollow: function(id, status) {
				let data = {
					id: id,
					status,
					status
				}
				this.$emit('actionFollows', data)
			},
			userTap: function(id) {
				uni.navigateTo({
					url: '/pages/user/user?id='+id,
				})
			},
			onMenu: function() {
				this.show = true;
			},
			cancel:function(){
				this.show=false;
			},
			gotoFeedBack:function(){
				uni.navigateTo({
					url:'/pages/feedback/feedback'
				})
			},
			gotoComPlain:function(id,title,link){
				uni.navigateTo({
					url:'/pages/feedback/complain/complain?id='+id+'&title='+title+'&link='+link
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info-view {
		display: flex;
		width: 100%;
		align-items: center;
		position: relative;

		.user-avatar-view {
			margin: 20rpx 22rpx 20rpx 30rpx;
			position: relative;
			display: flex;

			.user-avatar-image {
				height: 70rpx;
				width: 70rpx;
				overflow: hidden;
				border-radius: 35rpx;
			}
		}

		.user-view {
			display: flex;
			flex-direction: column;
			width: calc(100% - 70rpx - 52rpx - 30rpx - 116rpx);
			position: relative;

			.user-nick-text {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
				width: 100%;
				display: -webkit-box;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}

			.user-loaction-view {
				display: flex;
				margin-top: 0rpx;
				align-items: center;

				.user-loaction-image {
					width: 22rpx;
					height: 22rpx;
					margin-right: 8rpx;
				}

				.user-loaction-text {
					font-size: 20rpx;
					font-weight: 400;
					color: #ccc;
					width: calc(100% - 30rpx);
					display: -webkit-box;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}


		}

		.follow-view {
			position: absolute;
			right: 90rpx;
			top: calc(100% - 20rpx - 35rpx - 25rpx);
			width: calc(116rpx - 4rpx);
			height: calc(50rpx - 4rpx);
			border-width: 2rpx;
			border-color: #5b96fe;
			border-style: solid;
			border-radius: calc((50rpx - 4rpx) / 2);
			font-size: 26rpx;
			color: #5b96fe;
			display: flex;
			align-items: center;
			justify-content: center;
		}


	}

	.menu {
		image {
			width: 40rpx;
			position: absolute;
			right: 30rpx;
			top: 35rpx;
		}
	}

	.menu-button {
		text-align: center;

		.menu-item {
			padding: 30rpx 0rpx;
			border-bottom:#F9f9f9 1rpx solid;
		}
	}
</style>
