<template>
	<view class="user-list">
		<view @tap="onUserClick(item.id)" class="user-item" v-for="(item,index) in user" :key="index">
			<image class="avatars" mode="aspectFill" :src="item.avatar"></image>
			<view class="infos">
				<view class="titles">
					<view class="nickname">
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="intro">{{item.description||'这个人太懒什么也没说..'}}</view>
			</view>
			<button class="follow-btn">{{item.status=='follow'?'+关注':'已关注'}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user-list",
		props: {
			user: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {

			};
		},
		methods:{
			onUserClick: function(id) {
				uni.navigateTo({
					url: '/pages/user/user?id='+id,
				})
			},
		}
	}
</script>
<style>
	.user-list .user-item {
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		height: 140rpx;
	}


	.user-list .user-item .avatars {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-color: #f4f3f7;
	}

	.user-list .user-item .infos {
		flex: 1;
		margin: 0 30rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.user-list .user-item .titles {
		display: flex;
		align-items: center;
	}

	.user-list .user-item .nickname {
		flex: 1;
		line-height: 50rpx;
		height: 50rpx;
		font-size: 30rpx;
		width: 100%;
		color: #252658;
		margin: 0;
		display: -webkit-box;
		overflow: hidden;
	}

	.user-list .user-item .nickname text {
		line-height: 50rpx;
		height: 50rpx;
	}


	.user-list .user-item .intro {
		height: 44rpx;
		line-height: 44rpx;
		width: 100%;
		font-size: 24rpx;
		color: #8d919b;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0;
	}

	.user-list .user-item .follow-btn,
	.user-list .user-item .unfollow-btn {
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		font-size: 26rpx;
		font-weight: 600;
		background: #7289ff;
		color: #fff;
		padding: 0;
	}

	.user-list .user-item .unfollow-btn {
		background-color: #F4F3F7;
		color: #8d919b;
		font-weight: normal;
	}
</style>
