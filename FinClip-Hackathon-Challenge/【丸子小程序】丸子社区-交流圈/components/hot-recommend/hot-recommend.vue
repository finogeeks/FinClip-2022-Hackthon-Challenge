<template>
	<view class="content">
		<scroll-view class="hot-recommend-scroll" :scrollX="true">
			<view class="scroll-wrap">
				<view @tap="gotoDetail(item.id)" class="hot-recommend-product-item" v-for="(item,index) in posts" :key="index">
					<image class="img" mode="aspectFill" :src="item.meta.thumbnail"></image>
					<view class="content">
						<view class="category-tag">
							{{item.circle[0].name}}
						</view>
						<view class="title">{{item.title.rendered}}</view>
					</view>
				</view>
				<view @tap="gotoSticky" class="hot-recommend-product-item more-recommend-wrap">
					<view class="more-recommend">
						<view class="more-text">更多推荐</view>
						<view class="more-bt">点击查看</view>
					</view>
				</view>

			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "hot-recommend",
		props: {
			posts: {
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
			gotoDetail:function(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id+'&type=forums',
				})
			},
			gotoSticky: function() {
				uni.navigateTo({
					url: '../sticky/sticky'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.hot-recommend-scroll {
		width: 100%;
		white-space: nowrap;
		margin-top:20rpx;
		margin-bottom:30rpx;

		.scroll-wrap {
			margin:0rpx 30rpx;
			white-space: nowrap;
			font-size: 0;

			.hot-recommend-product-item {
				position: relative;
				width: 286rpx;
				height: 376rpx;
				margin-right: 20rpx;
				border-radius: 16rpx;
				display: inline-block;
				overflow: hidden;

				.img {
					width: 286rpx;
					height: 376rpx;
					background-color: #f4f4f4;
					background-image: url(https://appstatic.bestwehotel.com/wehotelminiprogram/images/pic_default_140.jpg);
					background-repeat: no-repeat;
					background-position: 50%;
				}

				.content {
					position: absolute;
					left: 0rpx;
					bottom:0rpx;
					background-color: #f9f9f9;
					opacity: 0.9;
					margin:20rpx 10rpx;
					padding:20rpx;
					border-radius: 10rpx;

					.category-tag {
						position: absolute;
						top: -26rpx;
						left: 20rpx;
						padding: 0 10rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						color: #fff;
						background: rgba(0, 0, 0, .6);
						border-radius: 8rpx;
					}

					.title {
						margin-top: 10rpx;
						height: 80rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						font-weight: 700;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: pre-wrap !important;
					}
				}
			}
			.more-recommend-wrap {
			    position: absolute;
			    width: 286rpx;
			    height: 376rpx;
			    border-right: 20rpx solid transparent;
				.more-recommend {
				    width: 100%;
				    height: 100%;
				    background: url(https://appstatic.bestwehotel.com/wehotelminiprogram/images/qly/more-recommend-bg.png) no-repeat;
				    background-size: 100%;
				    border-radius: 16rpx;
				    overflow: hidden;
				    -webkit-box-orient: vertical;
				    -webkit-box-direction: normal;
				    flex-direction: column;
				    display: -ms-flexbox;
				    display: flex;
				    -webkit-box-pack: center;
				    -ms-flex-pack: center;
				    justify-content: center;
				    -webkit-box-align: center;
				    -ms-flex-align: center;
				    align-items: center;
					.more-text {
					    color: #fff;
					    font-size: 28rpx;
					    margin-bottom: 20rpx;
					}
					.more-bt {
					    width: 160rpx;
					    height: 60rpx;
					    background: #fff;
					    border-radius: 39rpx;
					    color: #78cde9;
					    font-size: 24rpx;
					    display: -ms-flexbox;
					    display: flex;
					    -webkit-box-pack: center;
					    -ms-flex-pack: center;
					    justify-content: center;
					    -webkit-box-align: center;
					    -ms-flex-align: center;
					    align-items: center;
					}
				}
				
			}
		}
	}
</style>
