<template>
	<view class="content">
		<scroll-view class="circle-list" :scrollX="true">
			<view class="circle-main">
				<view class="circle-item" v-for="(item,index) in posts" :key="index">
					<view class="circle-content" v-if="item.posts.length>0">
						<view @tap="gotoCircle(item.id)" class="circle-title">{{item.name}}</view>
						<view class="circle-card">
							<view @tap="gotoDetail(article.id)" class="circle-card-item" v-for="(article,articleIndex) in item.posts"
								:key="articleIndex">
								<view class="circle-card-item-image">
									<image class="card-img" mode="aspectFill" :src="article.meta.thumbnail"></image>
								</view>
								<view class="circle-card-item-info">
									<view class="info-title">
										{{article.title.rendered}}
									</view>
									<view class="info-desc">
										{{article.excerpt.rendered}}
									</view>
								</view>
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
		name: "home-circle",
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
		methods: {
			gotoCircle: function(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/circle/list/list?id=' + id,
				})

			},
				
			gotoDetail:function(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id+'&type=forums',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 466rpx;
		overflow: hidden;
		white-space: nowrap;
		background-color: #e6eff9;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;


	}

	.circle-list {
		padding-right: 30rpx;

		.circle-main {
			display: flex;
			align-items: stretch;

			.circle-item {
				margin: 30rpx 0rpx 0rpx 30rpx;


				.circle-title {
					margin-bottom: 20rpx;
					font-weight: 700;
					font-size: 28rpx;
				}

				.circle-desc {
					margin-bottom: 10rpx;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
					white-space: nowrap !important;
					color: #565656;
					font-size: 24rpx;
					width: 490rpx;
				}

				.circle-card {
					width: 490rpx;
					min-height: 346rpx;
					border-radius: 10rpx;
					background-color: #fff;
					padding: 20rpx;



					.circle-card-item {
						align-items: center;
						display: flex;
						margin-bottom: 35rpx;

						&:last-child {
							margin-bottom: 0rpx;
						}

						.circle-card-item-image {
							display: flex;

							.card-img {
								width: 80rpx;
								height: 80rpx;
								border-radius: 10rpx;
								background-color: #d8d8d8;
							}
						}

						.circle-card-item-info {
							flex: 1;
							-webkit-box-flex: 1;
							-moz-box-flex: 1;
							line-height: 1.5 !important;
							padding-left: 20rpx !important;
							padding-right: 20rpx !important;
							width: 0 !important;

							.info-title {
								font-weight: 700;
								font-size: 28rpx;
								display: block;
								overflow: hidden !important;
								text-overflow: ellipsis !important;
								white-space: nowrap !important;
							}

							.info-desc {
								display: block;
								overflow: hidden !important;
								text-overflow: ellipsis !important;
								white-space: nowrap !important;
								color: #808080;
								font-size: 24rpx;
								padding-top: 5rpx;

							}
						}
					}

				}
			}
		}

	}
</style>
