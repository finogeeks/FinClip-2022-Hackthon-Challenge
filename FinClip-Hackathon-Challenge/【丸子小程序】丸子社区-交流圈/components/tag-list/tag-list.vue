<template>
	<view class="content">
		<view class="columns">
			<view class="info" @tap="gotoTag(taglist.id,taglist.name)">
				<view class="title">
					{{taglist.name}}
				</view>
				<view class="right">
					<view class="follow-num">
						{{taglist.count}}篇文章
					</view>
				</view>
			</view>
			<view class="summary">
				{{taglist.description?taglist.description:'该标签暂未设置描述'}}
			</view>
		</view>
		<scroll-view scrollX class="pending-scroll-view">
			<view class="pending-cards">
				<view @tap="goDetail(sticky.id)" class="pending-card" v-for="(sticky,index) in taglist.posts"
					:key="index">
					<view class="pending-date-label">
						<view class="date-label-title">热门推荐</view>
						<view class="date-label-date">{{sticky.time}}</view>
					</view>
					<image class="pending-thumb" mode="aspectFill" :src="sticky.meta.thumbnail"></image>
					<view class="pending-article">
						<view class="pending-title text-truncate">{{sticky.title.rendered}}</view>
						<view class="pending-reserve-info">
							<view class="reserve-info-count">{{sticky.meta.views}} 人查看</view>
							<view class="reserve-info-button">
								<view>{{sticky.likes}}喜欢</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "tag-list",
		props: {
			taglist: {
				type: Object,
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
			goDetail: function(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=forums'
				})
			},
			gotoTag:function(id,name){
				uni.navigateTo({
					url:'/pages/tag/tag?id='+id+'&name='+name
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.columns {
		padding-top: 32px;
		position: relative;

		.info {
			height: 24px;
			font-size: 0;
			position: relative;

			.title {
				display: inline-block;
				vertical-align: top;
				height: 24px;
				line-height: 24px;
				font-size: 22px;
				font-weight: 700;
				color: #000;
				max-width: calc(100vw - 220px);
				margin-right: 15px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.right {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				position: absolute;
				right: 0;
				top: 2px;
				height: 20px;

				.follow-num {
					height: 12px;
					line-height: 12px;
					font-size: 12px;
					color: #969696;
				}
			}
		}

		.summary {
			display: block;
			line-height: 12px;
			font-size: 12px;
			color: #969696;
			margin-top: 12px;
		}
	}

	.pending-scroll-view {
		white-space: nowrap;
		overflow-x: scroll;
		margin: 26rpx 0rpx;

		.pending-card {
			position: relative;
			overflow: hidden;
			display: inline-block;
			margin-right: 20rpx;
			width: 324rpx;
			border-radius: 18rpx;
			box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, 0.04);
			border: 1rpx solid rgba(236, 236, 236, 1);
			vertical-align: bottom;

			.pending-date-label {
				position: absolute;
				left: 10rpx;
				top: 10rpx;
				padding: 12rpx;
				padding-bottom: 8rpx;
				border-radius: 12rpx;
				background: rgba(0, 0, 0, 0.6);
				z-index: 1;

				.date-label-title {
					font-size: 18rpx;
					color: rgba(255, 255, 255, 0.6);
				}

				.date-label-date {
					margin: 0 4rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: white;
				}
			}

			.pending-thumb {
				display: block;
				width: 100%;
				height: 240rpx;
			}

			.pending-article {
				position: relative;
				padding: 20rpx;
				background: white;
				line-height: 1;

				.pending-title {
					font-size: 28rpx;
					color: #121212;
					font-weight: bold;
					line-height: 36rpx;
				}

				.text-truncate {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.pending-reserve-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-flow: row nowrap;
					margin-top: 18rpx;
					font-size: 24rpx;
					color: #7d7d7d;

					.reserve-info-button {
						padding: 10rpx 20rpx;
						border-radius: 28rpx;
						background-color: #6c8ff1;
						color: #fff;
						box-shadow: 0 4rpx 12rpx 0 rgba(255, 229, 68, 0.5);
					}
				}
			}

		}
	}
</style>
