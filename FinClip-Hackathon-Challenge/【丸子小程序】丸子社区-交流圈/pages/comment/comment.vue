<template>
	<view class="content">
		<view class="comment-item" v-if="maincomment!==''">
			<view @tap="gotouser(maincomment.author.id)" class="comment-user flex relative">
				<view class="comment-user-avatar relative">
					<image class="comment-user-avatar-img" mode="aspectFill" :src="maincomment.author.avatar">
					</image>
				</view>
				<view class="comment-user-profile">
					<view class="flex">
						<view class="bold">{{maincomment.author.name}}
						</view>
					</view>
					<view class="comment-user-items flex gray-99">
						<view class="comment-user-item">{{maincomment.author.honour.title}}</view>
					</view>
				</view>
			</view>
			<view class="comment-content" @tap="replyComment(maincomment)">{{maincomment.content}}</view>
			<view class="comment-footer"> {{maincomment.date}}
				<view @tap="tapcommentlike(maincomment.id)" class="comment-thumb"
					:class="maincomment.islike?'active':''">
					<image class="comment-thumb-icon iconfont icon-like" src="/static/images/likes_icon_click.png"
						v-if="maincomment.islike"></image>
					<image class="comment-thumb-icon iconfont icon-like" src="/static/images/likes_icon_nor.png" v-else>
					</image>
					<view class="comment-thumb-num" v-if="maincomment.likes">{{maincomment.likes}}</view>
				</view>
			</view>
		</view>
		<view class="comments" v-if="commentList.length>0">
			<comment :commentList="commentList" :showButton="showButton" @reply="reply" @tapLikes="tapcommentLike"
				@showRecommendList="showRecommend" :isNewest="isNewest" @showNewestList="showNewest"
				@deleteCommentByUser="deleteComment" @changeCommentStatus="changeCommentsHiddenStatus"></comment>
		</view>
		<u-popup v-model="isComments" mode="bottom" border-radius="14" height="800rpx" z-index="10" @close="outComment">
			<view class="textareacontent">
				<view class="textheaders">
					<view @tap="outComment" class="cancel">取消</view>
					<view class="publish" @tap="addComment">发布</view>
				</view>
				<view class="textareaBox">
					<textarea class="textareaInput" maxlength="140" :show-confirm-bar="false" name="content"
						@input="bindInput" :placeholder="placeholder" placeholder-class="placeholder-text"
						:value="commentContent" />
					<view class="textCount">{{count}}/140</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				maincomment: '',
				commentList: [],
				page: 1,
				isNewest: true,
				showButton: false,
				content: '',
				isFocus: true,
				topshow: true,
				placeholder: '写评论...',
				isComments: false,
				count:0,
				id:0,
			}
		},
		onLoad: function(options) {
			this.getCommentDetail(options.id)
			this.getReplayList(options.id, {
				per_page: 10
			});
			this.id=options.id;
		},
		onReachBottom:function() {
			if (!this.isLastPage) {
			      this.getReplayList(this.id, {
			        page: this.page,
			        per_page: 10
			      });
			    }
		},
		methods: {
			getCommentDetail: function(id) {
				API.getCommentDetailById(id).then(res => {
					console.log(res);
					this.maincomment = res
				})
			},
			getReplayList: function(id, args) {
				API.getReplayLists(id, args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
					}
					console.log(res);
					this.commentList = this.commentList.concat(res);
					this.page = this.page + 1;
					this.isCommentLoad = true;

				})
			},
			reply: function(e) {
				console.log(e);
				let parent = e.data.id
				let reply = e.data.author.name
				this.isFocus = true,
					this.isComments = true,
					this.parent = parent,
					this.placeholder = " @" + reply + ":"

			},
			tapcommentLike: function(e) {
				let that = this
				let id = e.id
				let index = e.index
				API.markComment({
						id: id
					}).then(res => {
						if (res.status == 200) {
							that.commentList[index].islike = true
							that.commentList[index].likes += 1

						} else if (res.status == 202) {
							that.commentList[index].islike = false
							that.commentList[index].likes -= 1
						}
					})
					.catch(err => {
						that.$refs.uToast.show({
							title: err.message,
							type: 'error',
						})
					})


			},
			changeCommentsHiddenStatus: function(e) {
				let id = parseInt(e.id);
				let sid = parseInt(e.sid);
				this.commentList[id].reply[sid].islike = !this.commentList[id].reply[sid].islike;
			},
			tapComment: function() {
				this.isComments = true;
			},
			outComment: function() {
				this.isComments = false;
				this.parent = 0;
				this.placeholder = '写点评论...'
			},

			bindInput: function(e) {
				this.commentContent = e.detail.value;
				this.count = this.commentContent.length;
			},


			addComment: function() {
				let args = {}
				let that = this;
				if (!this.user) {
					uni.showModal({
						title: '温馨提示',
						content: '必须登录才能发表评论, 是否前往登陆',
						success: function(res) {
							if (res.confirm) {
								wx.navigateTo({
									url: '/pages/login/login'
								})
							}
						},
						fail: function(err) {
							console.log(err)
						}
					})
					return
				}
				args.id = this.id
				args.parent = this.parent
				args.content = this.commentContent
				if (this.commentContent.length === 0) {
					that.$refs.uToast.show({
						title: 评论不能为空,
						type: 'error',
					})
					return
				}
				API.addComment(args).then(res => {
						if (res.status == 200) {
							this.page = 1;
							this.commentContent = "";
							this.commentList = [];
							this.isCommentLoad = false;
							this.isFocus = false;
							this.isComments = false;
							this.getPostsComments({
								id: this.id,
								page: this.page,
								orderby: 'comment_date',
							})
							setTimeout(function() {
								that.$refs.uToast.show({
									title: res.message,
									type: 'success',
								})
							}, 900)
						} else if (res.status === 500) {
							that.$refs.uToast.show({
								title: res.message,
								type: 'error',
							})
						}
					})
					.catch(err => {
						console.log(err)
						if (err.message) {
							that.$refs.uToast.show({
								title: res.message,
								type: 'error',
							})
						} else {
							that.$refs.uToast.show({
								title: '未知错误',
								type: 'error',
							})

						}
					})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.textareacontent {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		background-color: #fff;
		z-index: 10;

		.textheaders {
			width: 100%;
			height: 96rpx;
			border-bottom: 1rpx solid #eaeaea;
			display: flex;
			justify-content: space-between;

			.cancel {
				color: #333;
				font-size: 32rpx;
				line-height: 96rpx;
				margin-left: 32rpx;
			}

			.publish {
				color: #3ec382;
				font-size: 32rpx;
				line-height: 96rpx;
				margin-right: 32rpx;
			}
		}

		.textareaBox {
			height: 360rpx;
			position: relative;

			.textCount {
				position: absolute;
				font-size: 26rpx;
				color: #999;
				right: 32rpx;
				top: 4rpx;
			}

			.textareaInput {
				margin: 30rpx;
			}
		}
	}

	.comment-item {
		padding: 20rpx 32rpx;
		position: relative;
	}

	.comment-item::after {
		background-color: hsla(0, 0%, 90%, .3);
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

	.comment-user-avatar,
	.reply-user-avatar {
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

	.comment-user-avatar-img,
	.reply-user-avatar-img {
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

	.comment-footer,
	.reply-footer {
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

	.comment-thumb,
	.reply-thumb {
		align-items: center;
		display: flex;
		margin-left: auto;
		padding-left: 24rpx;
	}

	.reply-thumb {
		padding-right: 24rpx;
	}

	.comment-thumb.active,
	.reply-thumb.active {
		color: #00b49c;
	}

	.comment-thumb-icon,
	.reply-thumb-icon {
		font-size: 48rpx;
	}



	.comment-thumb-num,
	.reply-thumb-num {
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
		background-color: hsla(0, 0%, 90%, .3);
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

	.reply-more,
	.reply-target {
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
		color: #999;
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

	.hiddenAlls {
		height: 150rpx;
		overflow: hidden;
	}
</style>
