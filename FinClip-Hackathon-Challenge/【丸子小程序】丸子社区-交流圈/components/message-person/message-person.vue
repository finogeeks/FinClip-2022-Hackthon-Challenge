<template>
	<view class="content">
		<view class="list-item" v-for="(item,index) in posts" :key="index">
			<view class="fanpai-flex">
				<view @tap="tapHeadTo(item.author.id)" class="left">
					<image class="head" mode="aspectFill" :src="item.author.avatar"></image>
				</view>
				<view @tap="tapNavigateTo(item.post.id,item.post.type)" class="center">
					<view class="intro">
						{{item.author.name}}
					</view>
					<text class="time">{{item.time}}</text>-<text class="time">回复《{{item.post.title}}》</text>
					<view style="padding-top:20rpx;">
						<rich-text :nodes="item.content" class="inject"></rich-text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "message-person",
		props: {
			posts: {
				type: Array,
				default: function() {
					return [];
				},
			}
		},
		data() {
			return {

			};
		},
		methods: {
			tapHeadTo: function(id) {
				uni.navigateTo({
					url: '/pages/user/user?id=' + id
				})
			},
			tapNavigateTo: function(id, type) {
				if (type == 'post') {
					type = 'posts'
				}
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=' + type
				})
			}
		}
	}
</script>

<style>
	.content {
		padding: 30rpx;
	}

	.content .list-item {
		display: flex;
		min-height: 140rpx;
		box-sizing: border-box;
		padding: 20rpx 0 20rpx 0;
		border-bottom: 1rpx solid #ebebeb;
	}


	.content .list-item .left {
		flex: 0 1 76rpx;
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		position: relative;
	}

	.content .list-item .left .head {
		width: 76rpx;
		height: 76rpx;
		display: block;
		border-radius: 50%;
		background: url(https://mat1.gtimg.com/news/viewtop/pro/anonymous.png) #fff 0 0 no-repeat;
		background-size: 76rpx 76rpx;
	}

	.content .list-item .left .tips {
		font-size: 20rpx;
		left: 54rpx;
		top: -8rpx;
		line-height: 27rpx;
		height: 27rpx;
		min-width: 27rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		display: inline-block;
		background: #fd4655;
		color: #fff;
		padding: 0 8rpx;
		position: absolute;
	}

	.content .list-item .center {
		flex-grow: 1;
		box-sizing: border-box;
		padding-left: 25rpx;
	}

	.content .list-item .intro {
		font-size: 30rpx;
		color: #b1b1b1;
	}

	.content .list-item .time {
		font-size: 24rpx;
		color: #b1b1b1;
	}

	.content .list-item .inject {
		color: #434343;
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-bottom: 15rpx;
	}

	.fanpai-flex {
		display: flex;
	}
</style>
