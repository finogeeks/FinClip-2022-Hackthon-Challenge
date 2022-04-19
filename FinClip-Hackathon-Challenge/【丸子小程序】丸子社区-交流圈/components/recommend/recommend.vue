<template>
	<view class="recommend_wrap">
		<view class="rec_tit">相关推荐</view>
		<block v-for="(newsInfo,index) in recommendList" :key="index">
			<view @tap="gotoDetail(newsInfo.id,newsInfo.type)" class="newsItem">
				<view class="newsItem_left">
					<view class="title">{{newsInfo.title.rendered}}</view>
					<view class="time">
						<span class="fb_time_span fb_time">{{newsInfo.time}}</span>
						<span class="fb_time_span fb_comment_count">{{newsInfo.comments}}评论</span>
					</view>
				</view>
				<view class="newsItem_right">
					<image class="newsItem_right_image" :src="newsInfo.meta.thumbnail"></image>
				</view>
			</view>
		</block>
	</view>

</template>

<script>
	export default {
		name: "recommend",
		props: {
			recommendList: {
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
		methods: {

			gotoDetail: function(id,type) {
				console.log(id);
				if(type=='post'){
					type='posts'
				}
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id+'&type='+type
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recommend_wrap {
		width: 100%;
		padding-bottom: 40rpx;

		.rec_tit {
			width: 100%;
			padding: 40rpx 0 16rpx 32rpx;
			box-sizing: border-box;
			font-size: 36rpx;
			font-weight: 700;
			color: #222;
		}
	}

	.newsItem {
		width: 100%;
		height: 192rpx;
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		box-sizing: border-box;
		position: relative;

		&::before {
			content: "";
			display: block;
			width: 686rpx;
			height: 1px;
			position: absolute;
			left: 32rpx;
			bottom: 0rpx;
			background-color: #eee;
			transform: scaleY(.5);
		}

		.newsItem_left {
			flex: 1;
			height: 144rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.title {
				width: 100%;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #222;
				line-height: 48rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.time {
				width: 100%;

				.fb_time_span {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: #999;
					line-height: 36rpx;
					display: inline-block;
				}

				.fb_time {
					margin-right: 24rpx;
				}

			}
		}

		.newsItem_right {
			width: 224rpx;
			height: 144rpx;
			border-radius: 8rpx;
			margin-left: 24rpx;

			.newsItem_right_image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
				background: #f5f5f5;
			}
		}


	}
</style>
