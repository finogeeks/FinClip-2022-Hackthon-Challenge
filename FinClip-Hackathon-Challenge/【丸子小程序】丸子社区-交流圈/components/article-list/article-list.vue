<template>
	<view class="articleList">
		<view class="item" v-for="(item,index) in posts" :key="index">
			<view @tap="gotoDetail(item.id,type)" class="normal-post" v-if="item.format=='standard'">
	
				<view class="title">
					{{item.title.rendered}}
				</view>
				<view class="info">
					<view class="left">
						<text class="text">{{item.comments}}评论</text>
						<text class="text">{{item.meta.views}}浏览</text>
					</view>
					<view class="righr">
						<text class="text">{{item.time}}</text>
					</view>
				</view>
				<view class="cover">
					<image class="image" :src="item.meta.thumbnail" mode="aspectFill"></image>
				</view>
			</view>
			<view @tap="gotoDetail(item.id,type)" class="video-post" v-if="item.format=='video'">
				<view class="inner">
					<image :src="item.meta.thumbnail" mode="aspectFill" class="cover"></image>
					<view class="title">
						{{item.title.rendered}}
					</view>
					<view class="summary">
						{{item.excerpt.rendered}}
					</view>
					<view class="media">
						<image class="image" src="https://s1.st.meishij.net/p2/20181206/20181206143142_460.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view @tap="gotoDetail(item.id,type)" class="gallery-post" v-if="item.format=='gallery'">
				<view class="title">
					{{item.title.rendered}}
				</view>
				<view class="image-content">
					<view class="image-multiple">
						<view class="image" v-for="(img,idx) in item.gallery" :key="idx" v-if="idx<3">
							<image class="image" :src="img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="info">
					<view class="left">
						<text class="text">{{item.likes}}喜欢</text>
						<text class="text">{{item.comments}}评论</text>
						<text class="text">{{item.meta.views}}浏览</text>
					</view>
					<view class="righr">
						<text class="time">{{item.time}}</text>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		name:"article-list",
		props: {
			posts: {
				type: Array,
				default: function() {
					return [];
				}
			},
			type:{
				type:String,
				default:'',
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoDetail: function(id,type) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id+'&type='+type
				})
			},
			gotoAD: function(type, code) {
				if (type == "app") {
					let urls = code.split("|");
					let appid = urls[0];
					let path = urls[1] || 'pages/index/index';
					uni.navigateToMiniProgram({
						appId: appid,
						path: path,
					})
				} else if (type === 'picture') {
					uni.navigateTo({
						url: code,
					})
				} else if (type === 'site') {
					uni.navigateTo({
						url: '/pages/view/view?url=' + code
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.articleList {
		padding-bottom: 60rpx;

		.item {
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #f5f5f5;

			.normal-post {
				display: block;
				box-sizing: content-box;
				padding-top: 40rpx;
				padding-right: 220rpx;
				min-height: 220rpx;
				position: relative;

				.title {
					padding-top: 10rpx;
					line-height: 52rpx;
					font-size: 36rpx;
					min-height: 150rpx;
					color: #000;
					white-space: normal;
					word-break: normal;
					word-wrap: break-word;
					-webkit-hyphens: auto;
					-ms-hyphens: auto;
					hyphens: auto;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.info {
					margin-top: 30rpx;
					height: 38rpx;
					display: flex;
					justify-content: space-between;

					.text {
						display: inline-block;
						vertical-align: top;
						height: 32rpx;
						line-height: 32rpx;
						font-size: 24rpx;
						color: #969696;
						margin-right: 20rpx;
					}
				}

				.cover {
					position: absolute;
					width: 200rpx;
					height: 200rpx;
					right: 0;
					top: 46rpx;
					-o-object-fit: cover;
					object-fit: cover;


					.image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 4px;
					}
				}
			}

			.video-post {
				display: block;
				padding-top: 40rpx;
				position: relative;

				.inner {
					width: 100%;
					border-radius: 4px;
					background: #f5f5f5;
					overflow: hidden;
					position: relative;

					.cover {
						display: block;
						width: 100%;
						height: 400rpx;

						image {
							width: 100%;
							height: 400rpx;
						}
					}

					.title {
						padding: 16px 20px 12px;
						line-height: 23px;
						font-size: 17px;
						color: #000;
						font-weight: 700;
					}

					.summary {
						padding: 0 20px 16px;
						line-height: 18px;
						font-size: 12px;
						color: #000;
					}

					.media {
						position: absolute;
						right: 20rpx;
						height: 80rpx;
						width: 80rpx;
						top: 280rpx;
						border-radius: 4px;

						.image {
							width: 80rpx;
							height: 80rpx;
						}
					}
				}
			}

			.gallery-post {
				padding-top: 40rpx;

				.title {
					padding-top: 10rpx;
					line-height: 52rpx;
					font-size: 36rpx;
					min-height: 150rpx;
					color: #000;
					white-space: normal;
					word-break: normal;
					word-wrap: break-word;
					-webkit-hyphens: auto;
					-ms-hyphens: auto;
					hyphens: auto;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.image-content {
					display: flex;
					flex-direction: column;

					.image-multiple {
						flex: 1;
						display: flex;
						flex-wrap: nowrap;

						.image {
							width: 212rpx;
							height: 212rpx;
							margin: 10rpx;
							position: relative;
							border-radius: 4px;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}

				.info {
					margin-top: 30rpx;
					height: 38rpx;
					display: flex;
					justify-content: space-between;

					.text {
						display: inline-block;
						vertical-align: top;
						height: 32rpx;
						line-height: 32rpx;
						font-size: 24rpx;
						color: #969696;
						margin-right: 20rpx;
					}
				}

			}
		}
	}

	.adview {
		position: relative;

		.adtext {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			padding: 5rpx 20rpx;
			background: #333;
			color: #fff;
			font-size: 24rpx;
		}

		.image {
			width: 690rpx;
			height: 200rpx;
		}
	}
</style>
