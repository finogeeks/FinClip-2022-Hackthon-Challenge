<template>
	<view class="content">
		<view class="list">
			<view class="item-row" @tap="gotoCategory(item.id)" v-for="(item,index) in cates" :key="index">
				<view class="box">
					<view class="top" :style="'background-image:url('+item.cover+')'">
						<view class="mask"></view>
					</view>
					<view class="bottom">
						<view class="title">
							{{item.name}}
						</view>
						<view class="description">
							{{item.description}}
						</view>
						<view class="time">
							{{item.count}} 篇动态
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "circle-list",
		props: {
			cates: {
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
		methods:{
			gotoCategory:function(id){
				uni.navigateTo({
					url:'../../pages/circle/list/list?id='+id
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.list {
		margin-top:30rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 0 21rpx;

		.item-row {
			border-radius: 12rpx;
			margin: 12rpx 11rpx 24rpx;

			.box {
				border-radius: 12rpx;
				overflow: hidden;
				height: 428rpx;
				width: 332rpx;
				box-shadow: 0 12rpx 24rpx 0 rgba(0, 0, 0, .08);
				position: relative;

				.top {
					width: 332rpx;
					height: 210rpx;
					background-size: cover;
					background-repeat: no-repeat;
					background-position: top;

				}

				.bottom {
					width: 100%;
					height: 268rpx;
					padding: 0 24rpx 24rpx;
					background-color: transparent;
					margin-top: 20rpx;

					.title {
						color: #333;
						font-weight: 700;
						font-size: 30rpx;
						height: 44rpx;
						line-height: 44rpx;
						margin-top: 16rpx;
						margin-bottom: 12rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.description {
						color: #bebebe;
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						line-height: 40rpx;
						min-height: 80rpx;
						-webkit-align-self: flex-start;
						align-self: flex-start;
					}

					.time {
						line-height: 32rpx;
						color: #bebebe;
						font-size: 22rpx;
						-webkit-align-self: flex-start;
						align-self: flex-start;
						margin-top: 12rpx;
					}
				}
			}
		}
	}
</style>
