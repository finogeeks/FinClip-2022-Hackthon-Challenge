<template>
	<view class="waterpull">
		<view class="wf-item">
			<view class="wf-content">
				<image @tap="gotoDetail(params.id)" :src="params.meta.thumbnail" mode="widthFix" @load="emitHeight"
					@error="emitHeight"></image>
				<view class="vicon" v-if="params.format=='video'"></view>
				<view class="infow">
					<view class="title" @tap="gotoDetail(params.id)">
						{{params.title.rendered}}
					</view>
					<view class="user">
						<view class="author" @tap="gotoUser(params.author.id)">
							<view class="avatar">
								<image class="img" :src="params.author.avatar"></image>
							</view>
							<view class="name">{{params.author.name}}</view>
						</view>
						<view class="likes">
							<view class="image">
								<image class="img" src="@/static/images/like.png" mode="widthFix"></image>
							</view>
							<view class="number">
								{{params.likes}}
							</view>
						</view>
						<view class="menu" @tap="onMenu" v-if="edit">
							<image src="/static/images/album-more-gray.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<view class="wf-item" v-if="index%9==0&&tag=='left'&&index!=0">
			<view class="wf-itemw">
				<ad-custom :unit-id="unitid"></ad-custom>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view class="wf-item" v-if="index%16==0&&tag=='right'">
			<view class="wf-itemw">
				<ad-custom :unit-id="unitid"></ad-custom>
			</view>
		</view>
		<!-- #endif -->
		<u-popup v-model="show" mode="bottom">
			<view class="menu-button">
				<view @tap="deletePost(params.id,index,tag)" class="menu-item">
					删除
				</view>
				<view @tap="cancel" class="menu-item">
					取消
				</view>
			</view>
		</u-popup>
	</view>


</template>

<script>
	export default {
		name: "helang-waterfall",
		props: {
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			unitid: {
				type: String | Number,
				default: ''
			},
			edit: {
				type: Boolean,
				default: false
			},
			tag: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				show: false,
			};
		},
		methods: {
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.wf-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height, this.$props.tag);
				}).exec();
			},
			gotoDetail: function(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + "&type=forums"
				})
			},
			gotoUser: function(id) {
				uni.navigateTo({
					url: '/pages/user/user?id=' + id
				})
			},
			deletePost: function(id, index,tag) {
				let data = {
					id: id,
					index: index,
					tag:tag,
				}
				this.$emit('deletePosts', data);
				this.show=false;
			},
			onMenu: function() {
				this.show = true;
			},
			cancel: function() {
				this.show = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item {
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: cover;
		box-sizing: border-box;
		height: auto;
		overflow: hidden;
		padding: 0rpx 10rpx 32rpx;
		width: 100%;

		.wf-itemw {
			border-radius: 14rpx;
			box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, .1);
			display: block;
			overflow: hidden;
		}

		.wf-content {
			position: relative;
			border-radius: 14rpx;
			box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, .1);
			display: block;
			overflow: hidden;

			image {
				display: block;
				width: 100%;
				// 默认设置一个图片的大约值
				height: 350rpx;
			}

			.vicon {
				background: url(https://s1.st.meishij.net/p2/20181206/20181206143142_460.png) 0rpx 0rpx no-repeat;
				background-size: 40rpx 80rpx;
				display: block;
				height: 40rpx;
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				width: 40rpx;
			}

			.infow {
				background: #fff;
				padding-bottom: 24rpx;

				.title {
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					color: #333;
					display: -webkit-box;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
					max-height: 196rpx;
					overflow: hidden;
					padding: 20rpx 30rpx 0rpx;
					position: relative;
					text-overflow: ellipsis;
				}

				.user {
					height: 36rpx;
					margin: 40rpx 30rpx 0rpx;
					position: relative;
					display: flex;
					justify-content: space-between;

					.author {
						font-size: 0rpx;

						.avatar {
							border-radius: 18rpx;
							box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, .1);
							display: inline-block;
							height: 36rpx;
							overflow: hidden;
							vertical-align: top;
							width: 36rpx;

							image {
								display: block;
								height: 36rpx;
								width: 36rpx;
							}

						}

						.name {
							color: #666;
							display: inline-block;
							font-size: 24rpx;
							height: 36rpx;
							width: 180rpx;
							line-height: 36rpx;
							overflow: hidden;
							padding-left: 10rpx;
							text-overflow: ellipsis;
							vertical-align: top;
							white-space: nowrap;
						}
					}

					.likes {

						display: flex;
						justify-content: flex-start;

						.image {
							width: 36rpx;
							height: 36rpx;

							image {
								display: block;
								height: 36rpx !important;
								width: 36rpx !important;
							}

						}

						.number {
							color: #666;
							display: inline-block;
							font-size: 24rpx;
							color: #999;
							height: 36rpx;
							line-height: 36rpx;
							overflow: hidden;
							padding-left: 5rpx;
							text-overflow: ellipsis;
							vertical-align: top;
							white-space: nowrap;
						}
					}

					.menu {
						image {
							width: 40rpx;
							position: absolute;
							right: -30rpx;
							top: -3rpx;
						}
					}
				}
			}
		}




	}

	.menu-button {
		text-align: center;

		.menu-item {
			padding: 30rpx 0rpx;
			border-bottom: #F9f9f9 1rpx solid;
		}
	}
</style>
