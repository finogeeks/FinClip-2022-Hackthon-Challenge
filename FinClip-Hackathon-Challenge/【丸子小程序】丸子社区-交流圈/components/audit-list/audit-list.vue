<template>
	<view class="detail">
		<view class="content" v-for="(item,index) in posts" :key="index">
			<view class="user-info">
				<view @tap="userTap(item.author.id)" class="user-info-view">
					<navigator class="user-avatar-view" hover-class="none" :url="'/pages/user/user?id='+item.author.id">
						<image class="user-avatar-image" compression="avatar" mode="aspectFill"
							:src="item.author.avatar"></image>
					</navigator>
					<navigator class="user-view" hover-class="none" :url="'/pages/user/user?id='+item.author.id">
						<text class="user-nick-text">{{item.author.name}}</text>
						<view class="user-loaction-view">
							<text class="user-loaction-text">{{item.author.description}}</text>
						</view>
					</navigator>
					<view @tap="actionFollow(index,item.id)" class="follow-view">审核</view>
				</view>
			</view>
			<view class="excert" @tap="showContents(item.content.rendered)">
				{{item.excerpt.rendered}}
			</view>
			<view class="image-list">
				<forum-image :gallary="item.gallery" :isPlay="isplay" :videoUrl="video" :isVideo="isvideo">
				</forum-image>

			</view>
			<view class="card_footer">
				<view class="related-subject"v-if="item.circle.length>0">
					<text>圈子：{{item.circle[0].name}}</text>
				</view>
				<view class="upvote">
					<image mode="aspectFill"
						src="/static/images/edit6@2x.png">
					</image>
					<text class="islike">{{item.time}}</text>
				</view>
			</view>
			<view class="line">
				
			</view>
		</view>
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
		<u-popup v-model="showConent" mode="center" width="680rpx" height="800rpx" :closeable="true" border-radius="20">
			<view class="contents">
				<scroll-view scroll-y="true" style="height: 800rpx;" >
					<view class="contetTitle">
						<text>内容预览</text>
					</view>
				<u-parse :show-with-animation="true" :html="content" ref="article" :tag-style="tagStyle"></u-parse>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "audit-list",
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
				show: false,
				isvideo: false,
				isplay: false,
				video: '',
				showConent:false,
				content:'',
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				},
				list: [{
						value: '1',
						label: '通过'
					},
					{
						value: '2',
						label: '删除'
					}
				],
			};
		},
		methods: {
			userTap: function(id) {
				uni.navigateTo({
					url: '@/pages/user/user',
				})
			},
			actionFollow: function(index, id) {
				this.index = index;
				this.id = id;
				this.show = true;
			},
			confirm: function(e) {
				let data = {
					'data': e,
					'index': this.index,
					'id': this.id
				};
				this.$emit('comfirmed', data);

			},
			showContents:function(content){
				this.content=content;
				this.showConent=true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contetTitle{
		text-align: center;
		font-size:36rpx;
		font-weight:600;
		padding:20rpx 0rpx;
	}
	.detail{
		background: #fff;
	}
	.contents{
		background: #fff;
		padding:30rpx;
	}
	.line{
		width:100%;
		height:20rpx;
		background: #F0F0F0;
		margin:20rpx 0rpx;
	}
	.excert {
		padding: 10rpx 30rpx;
	}

	.card_footer {
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #3a3a3a;
		display: flex;
		align-items: center;
	}

	.related-subject {
		display: inline-block;
		padding: 10rpx 20rpx;
		background: #F2F2F2;
		border-radius: 22rpx;
		font-size: 24rpx;
		color: #A8A8A8;
		line-height: 24rpx;
		position: relative;
		flex-shrink: 0;
	}

	.related-subject text {
		display: inline-block;
		max-width: 208rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		margin-left: 32rpx;
	}

	.related-subject::before {
		content: "";
		display: inline-block;
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: url("https://cloud-minapp-16269.cloud.ifanrusercontent.com/v3.2.0-icon-testing-label.svg");
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.related-subject::after {
		content: "";
		display: inline-block;
		margin-left: 8rpx;
		width: 16rpx;
		height: 16rpx;
		vertical-align: center;
		background: url("https://cloud-minapp-16269.cloud.ifanrusercontent.com/1fyB1kaaFJPgBFbK.svg");
		background-size: contain;
		background-repeat: no-repeat;
		opacity: 0.7;
	}

	.upvote {
		position: relative;
		display: inline-flex;
		align-items: center;
		margin-left: auto;
	}

	.upvote image {
		width: 28rpx;
		height: 28rpx;
		margin-right: 18rpx;
	}

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
			right: 30rpx;
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
</style>
