<template>
	<view class="content">
		<view class="commentlist_wrap">
			<block v-if="commentList.length==0">
				<view class="empty-comment">
					<h3 class="empty-comment-title">全部评论</h3>
					<view class="sofa"></view>
					<p class="empty-comment-des">暂无评论，快来抢沙发吧</p>
				</view>
			</block>
			<block v-else>
				<view class="comlist_title">
					<h2 class="title">全部评论</h2>
					<view class="classification" v-if="showButton">
						<view @tap="showRecommendList" class="newest" :class="isNewest?'active':''">最新</view>
						<view @tap="showNewestList" class="newest" :class="isNewest?'':'active'">热门</view>
					</view>
				</view>
				<view  class="comment-item" v-for="(item,index) in commentList" :key="index">
					<view @tap="gotouser(item.author.id)" class="comment-user flex relative">
						<view class="comment-user-avatar relative">
							<image class="comment-user-avatar-img" mode="aspectFill" :src="item.author.avatar">
							</image>
						</view>
						<view class="comment-user-profile">
							<view class="flex">
								<view class="bold">{{item.author.name}}</view>
							</view>
							<view class="comment-user-items flex gray-99">
								<view class="comment-user-item">{{item.author.honour.title}}</view>
							</view>
						</view>
					</view>
					<view class="comment-content" @tap="replyComment(item)">{{item.content}}
					</view>
					<view class="comment-footer"> {{item.date}}
						<view @tap="tapcommentlike(item.id,index)" class="comment-thumb"
							:class="item.islike?'active':''">
							<image class="comment-thumb-icon iconfont icon-like" src="/static/images/likes_icon_click.png"
								v-if="item.islike"></image>
							<image class="comment-thumb-icon iconfont icon-like" src="/static/images/likes_icon_nor.png"
								wx:else></image>
							<view class="comment-thumb-num" v-if="item.likes">{{item.likes}}</view>
						</view>
					</view>
					<view class="reply-list" v-if="item.reply.length">
						<view  class="reply-item flex relative"
							v-for="(reply,rindex) in item.reply" :key="rindex">
							<view @tap="gotouser(reply.author.id)" class="reply-user-avatar">
								<image class="reply-user-avatar-img" mode="aspectFill" :src="reply.author.avatar">
								</image>
							</view>
							<view class="grow-1 reply-item-content">
								<view @tap="gotouser(reply.author.id)" class="reply-header flex relative">
									<view class="ellipsis">{{reply.author.name}}</view>
									
									<view class="flex-s-0">{{reply.author.honour.title}}</view>
								</view>
								<view class="reply-content" @tap="replyComment(reply)">
									{{reply.content}}
								</view>
								<view class="reply-footer">
									<text>{{reply.time}}</text>
								</view>
								<view class="reply-list1" :class="reply.islike?'':'hiddenAlls'"
									v-if="reply.reply.length>0">
									<view @tap="gotoComment(reply1.id)" class="reply-item flex relative"
										v-for="(reply1,rindex1) in reply.reply" :key="rindex1">
										<view @tap="gotouser(reply1.author.id)" class="reply-user-avatar">
											<image class="reply-user-avatar-img" mode="aspectFill"
												:src="reply1.author.avatar"></image>
										</view>
										<view class="grow-1 reply-item-content">
											<view @tap="gotouser(reply1.author.id)" class="reply-header1 flex relative">
												<view class="ellipsis">{{reply1.author.name}}</view>
												
												<view class="flex-s-0">{{reply1.author.honour.title}}</view>
											</view>
											<view class="reply-content">
												{{reply1.content}}
											</view>
											<view class="reply-footer">
												<text>{{reply1.time}}</text>
											</view>
										</view>
									</view>
									<view @tap="gotoComment(reply.id)" class="reply-more" v-if="reply.reply.length==10">
										查看更多评论</view>
								</view>
								<view @tap="changeStatus(index,rindex)" v-if="reply.reply.length>0"
									class="information-more">
									{{reply.islike?'收起':'展开更多'}}
								</view>
							</view>
						</view>
						<view @tap="onTapMoreReply(index)" class="reply-more" v-if="item.reply.length==10">查看更多评论</view>

					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		props: {
			commentList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			commentCountTotal: {
				type: Number,
				default: 0
			},
			showButton:{
				type: Boolean,
				default: true,
			},
			isNewest: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {

			};
		},
		methods: {
			replyComment: function(data) {
				let datas = {
					data: data
				};
				this.$emit('reply', datas);
			},
			deleteComment(id) {
				this.$emit('deleteCommentByUser', id)
			},
			tapcommentlike(id, index) {
				let data = {
					id: id,
					index:index
				}
				this.$emit('tapLikes', data)
			},
			showRecommendList: function() {

				this.$emit('showRecommendList')
			},

			showNewestList: function() {
				this.$emit('showNewestList')
			},
			
			changeStatus:function(index,sindex){
				let data={
					id:index,
					sid:sindex
				}
				this.$emit('changeCommentStatus',data)
			},
			
			gotoComment:function(id){
				uni.navigateTo({
					url:'/pages/comment/comment?id='+id
				})
			},
			
			gotouser:function(id){
				uni.navigateTo({
					url:'/pages/user/user?id='+id
				})
			}
			
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.commentlist_wrap {
		

		.empty-comment {
			width: 100%;
			padding: 46rpx 32rpx 80rpx;
			box-sizing: border-box;

			.empty-comment-title {
				font-size: 36rpx;
				color: #222;
				font-weight: 600;
			}

			.sofa {
				width: 260rpx;
				height: 260rpx;
				margin: 24px auto 0;
				background: url("@/static/images/no-comment.png") no-repeat 50%/260rpx;
			}

			.empty-comment-des {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #999;
				margin: 0 auto;
			}
		}

		.comlist_title {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;
			margin-top: 48rpx;
			margin-bottom: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 36rpx;
				font-weight: 700;
				color: #222;
			}

			.classification {
				display: flex;
				background-color: rgba(0, 0, 0, .03);
				border-radius: 30rpx;

				.newest {
					width: 88rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
					font-size: 24rpx;
					color: #666;
				}

				.active {
					border: 1px solid #f0f0f0;
					color: #222;
					font-weight: 700;
					background-color: #fff;
					box-sizing: border-box;
					line-height: 56rpx;
				}
			}
		}
	}

	.comment-reply {
		margin: 30rpx;
		width: 100%;
		min-height: 600rpx;

		.comment-reply-item {
			margin-bottom: 20rpx;

			.comment-header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.comment-header-left {
					display: flex;
					align-items: center;

					.comment-avatar {
						display: inline-block;
						width: 60rpx;
						height: 60rpx;
						border-radius: 100%;
						margin-right: 20rpx;
					}

					.comment-user-date {
						display: flex;
						flex-direction: column;

						text:first-child {
							font-size: 30rpx;
							font-weight: bold;
							color: #3a3a3a;
						}

						text:last-child {
							font-size: 22rpx;
							color: #a8a8a8;
						}
					}
				}

				.comment-header-right {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						vertical-align: bottom;
					}

					text {
						font-size: 28rpx;
						line-height: 30rpx;
						padding-left: 10rpx;
						color: #7d7d7d;
					}

					.deleteComment {
						padding-left: 20rpx;
					}

					.comment-vote-btn {
						position: relative;
						display: flex;
						align-items: center;

						&:first-child {
							margin-right: 34rpx;
						}

						text {
							display: inline-block;
							font-size: 24rpx;
							color: #a8a8a8;
							border: 10rpx solid transparent;
							border-right: 0;
						}

						image {
							display: inline-block;
							width: 20rpx;
							height: 18rpx;
							border: 10rpx solid transparent;
						}
					}

					.vote-count-actived {
						color: #f13b03 !important;
					}
				}

			}

			.comment-content {
				position: relative;
				margin: 10rpx 20rpx 30rpx 80rpx;
				font-size: 30rpx;
				color: #3a3a3a;
			}

		}

		.replay-content {
			margin-left: 80rpx;

			.comment-avatar {
				width: 50rpx !important;
				height: 50rpx !important;
			}

		}
	}
	
	.comment-item {
	  padding: 20rpx 32rpx;
	  position: relative;
	}
	
	.comment-item::after {
	  background-color: hsla(0,0%,90%,.3);
	  bottom: -1rpx;
	  content: "";
	  height: 2rpx;
	  position: absolute;
	  right: 0;
	  width: 620rpx;
	}
	
	.comment-item:last-child::after {
	  display: none;
	}
	
	.comment-user {
	  padding-top: 24rpx;
	}
	
	.comment-user-avatar,.reply-user-avatar {
	  border-radius: 50%;
	  flex-shrink: 0;
	  height: 80rpx;
	  overflow: hidden;
	  width: 80rpx;
	}
	
	.reply-user-avatar {
	  align-self: flex-start;
	  height: 40rpx;
	  margin-right: 20rpx;
	  width: 40rpx;
	}
	
	.comment-user-avatar-img,.reply-user-avatar-img {
	  border-radius: 50%;
	  height: 100%;
	  width: 100%;
	}
	
	.unlock-heart-icon {
	  bottom: 0;
	  height: 28rpx;
	  position: absolute;
	  right: 0;
	  width: 28rpx;
	  z-index: 100;
	}
	
	.raduis-none {
	  border-radius: 0;
	}
	
	.blur {
	  filter: blur(20rpx);
	}
	
	.comment-user-profile {
	  color: #1a1a1a;
	  flex-grow: 1;
	  margin-left: 24rpx;
	}
	
	.comment-user-items {
	  margin-top: 6rpx;
	}
	
	.comment-user-item {
	  font-size: 24rpx;
	  margin-left: 22rpx;
	  position: relative;
	}
	
	.comment-user-item::before {
	  background-color: #666;
	  border-radius: 50%;
	  content: "";
	  height: 4rpx;
	  left: -13rpx;
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  width: 4rpx;
	}
	
	.comment-user-item:first-child {
	  margin-left: 0;
	}
	
	.comment-user-item:first-child::before {
	  display: none;
	}
	
	.comment-content {
	  margin-left: 104rpx;
	  padding: 24rpx 0 4rpx;
	  word-break: break-all;
	}
	
	.comment-footer,.reply-footer {
	  align-items: center;
	  color: #999;
	  display: flex;
	  font-size: 24rpx;
	}
	
	.comment-footer {
	  height: 64rpx;
	  margin-left: 104rpx;
	  padding-right: 4rpx;
	}
	
	.reply-footer {
	  padding: 8rpx 0 10rpx;
	}
	
	.comment-thumb,.reply-thumb {
	  align-items: center;
	  display: flex;
	  margin-left: auto;
	  padding-left: 24rpx;
	}
	
	.reply-thumb {
	  padding-right: 24rpx;
	}
	
	.comment-thumb.active,.reply-thumb.active {
	  color: #00b49c;
	}
	
	.comment-thumb-icon,.reply-thumb-icon {
	  font-size: 48rpx;
	}
	
	
	
	.comment-thumb-num,.reply-thumb-num {
	  margin-left: 10rpx;
	}
	
	.reply-list {
	  background-color: #f8f8f8;
	  border-radius: 16rpx;
	  display: flex;
	  flex-direction: column;
	  margin-left: 100rpx;
	  margin-top: 20rpx;
	  padding: 12rpx 0;
	}
	
	.reply-list1 {
	  background-color: #f8f8f87c;
	  border-radius: 16rpx;
	  display: flex;
	  flex-direction: column;
	  margin-left: 10rpx;
	  padding: 12rpx 0;
	}
	
	.reply-item {
	  padding: 20rpx 0 0 20rpx;
	}
	
	.reply-item+.reply-item::after {
	  background-color: hsla(0,0%,90%,.3);
	  content: "";
	  height: 2rpx;
	  position: absolute;
	  right: 0;
	  top: -1rpx;
	  width: calc(100% - 20rpx);
	}
	
	.reply-item-content {
	  max-width: 506rpx;
	}
	
	.reply-header {
	  color: #1f1f1f;
	  padding-right: 24rpx;
	  font-size: 32rpx;
	  font-weight: 500;
	}
	.reply-header1 {
	  color: #696969;
	  padding-right: 24rpx;
	  font-size: 28rpx;
	  font-weight: 500;
	}
	
	.reply-header::after {
	  bottom: 0;
	  content: "";
	  display: block;
	  left: -20rpx;
	  position: absolute;
	  right: 0;
	  top: 0;
	}
	
	.reply-content {
	  color: #323232;
	  padding: 8rpx 24rpx 0 0;
	  word-break: break-all;
	  font-size: 28rpx;
	}
	
	.reply-content-nickname {
	  display: inline-block;
	  white-space: nowrap;
	}
	
	.reply-more,.reply-target {
	  color: #1f1f1f;
	  font-weight: 700;
	}
	
	.reply-more {
	  align-self: flex-start;
	  box-sizing: border-box;
	  font-size: 24rpx;
	  padding: 10rpx 24rpx 12rpx 80rpx;
	  width: 100%;
	}
	
	.flex {
	  align-items: center;
	  display: flex;
	}
	
	.relative {
	  position: relative;
	}
	
	.gray-99 {
	  color: #999;
	}
	
	.bold {
	  font-weight: 700;
	}
	
	.flex-s-0 {
	  font-size: 24rpx;
	  padding-left: 10rpx;
	  color:#999;
	  flex-shrink: 0;
	}
	
	.icon-like {
	    width: 28rpx;
	    height: 28rpx;
	}
	.information-more {
	    margin-top: 40rpx;
	    line-height: 100rpx;
	    color: #7d7d7d;
	    font-size: 26rpx;
	    text-align: center;
	    position: relative;
	}
	
	
	.hiddenAll>.product-msg {
	  height: 150rpx;
	  overflow: hidden;
	}
	
	.hiddenAlls{
	  height: 150rpx;
	  overflow: hidden;
	}
	
</style>
