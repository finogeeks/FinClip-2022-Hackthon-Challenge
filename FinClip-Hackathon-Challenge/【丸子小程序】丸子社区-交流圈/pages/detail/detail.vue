<template>
	<view class="content">
		<view class="showloading" v-if="loading">
			<image class="loadicon image" src="@/static/images/loading.svg"></image>
			<view class="loadtext">
				<text class="text">加载中，请稍后</text>
			</view>
		</view>
		<view class="topic-detail" v-if="!loading">
			<view class="detail-header half-pixel-bottom-border" :class="topshow&&'detail-header-show'"
				v-if="type=='posts'" @tap='gotoCate(detail.categories[0].id)'>
				<image :src="detail.categories[0].cover"></image>
				<view class="detail-header-name">
					<text>{{detail.categories[0].name}}</text>
					<span class="g-text-overflow">{{detail.categories[0].description}}</span>
				</view>
				<view class="detail-header-btn half-pixel-border">去看看</view>
			</view>
			<view class="article-info" v-if="type=='posts'">
				<view class="article-detail-author">
					<text @tap="userTap(detail.author.id)">{{detail.author.name}}</text>
					<view></view>
					<span>{{detail.time}}</span>
					<view></view>
					<span>{{detail.meta.views}} 浏览</span>
				</view>
				<view class="article-detail-title article-wrap">{{detail.title.rendered}}</view>
			</view>
			<view class="user-info" v-if="type=='forums'">
				<forum-user :author="detail.author" :isFollow="isFollow" @actionFollows="actionFollow" :ids="detail.id"
					:title="detail.title.rendered" :link="detail.link">
				</forum-user>
			</view>

			<view :class="videoAds?'container':''" id="entry-content" class="entry-content clearfix">
				<u-parse :show-with-animation="true" :html="content" ref="article" :tag-style="tagStyle"></u-parse>
			</view>
			<view class="image-list" v-if="type=='forums'&&detail.format != 'quote'">
				<forum-image :gallary="detail.gallery" :isPlay="isplay" :videoUrl="video" :isVideo="isvideo">
				</forum-image>

			</view>
			<view class="videoplay" v-if="audio">
				<view class="video" @tap="playRecord">
					<view class="image">
						<image src="/static/images/edit_page_play_record.png" mode="aspectFill"></image>
					</view>
					<view class="text">
						<text>{{playText}}</text>
					</view>
				</view>
			</view>

			<view class="pd-lr-15 module-item" :class="hiddenAll?'hiddenAll':''" v-if="isCustom">
				<view class="detail-title">扩展信息</view>
				<view class="product-msg">
					<view class="msg-item" v-for="(item,index) in detail.meta.custom" :key="index">
						<text class="gray-dot"></text>
						<text class="item-value">{{item.name}}</text>
						<text class="item-value">{{item.value}}</text>
					</view>
				</view>
				<view @tap="changeHiddenStatus" class="information-more">{{hiddenAll?'展开更多':'收起'}}</view>
			</view>
			<view class="address-tag-all-view" v-if="type=='forums'">
				<view @tap="openmap(detail.meta.latitude,detail.meta.longitude)" class="address-view"
					v-if="detail.meta.location">
					<image class="address-image" mode="widthFix" src="/static/images/loc_icon_show.png"></image>
					<text class="address-text">{{detail.meta.location}}</text>
				</view>
				<view @tap="gotoTags(tag.id,tag.name)" class="tag-view" v-for="(tag,index) in detail.topic"
					:key="index">
					<image class="tag-image" src="/static/images/topic.png"></image>
					<text class="tag-text">{{tag.name}}</text>
				</view>
			</view>
			<view class="subScribeButton" v-if="is_subscribe">
				<button class="cu-btn round bg-green" @tap="wxParseCreditPay(detail.subscribe.expenses)">使用
					{{detail.subscribe.expenses}}
					积分查看完整内容</button>
			</view>

			<view class="subScribeButton" v-if="videoAds">
				<button class="cu-btn round bg-green" @tap="bindReadMore">观看视频阅读更多...</button>
			</view>
			<view class="netDisk-card" v-if="detail.meta.NetDisk">
				<view class="title">网盘资源</view>
				<view class="netDisk-card-text">
					<view class="netDisk-card-inline netDisk-card-strong">
						<text :user-select="true">链接：</text>
					</view>
					<view class="netDisk-card-inline" @tap="bindCopyLink(detail.meta.NetDisk[0].link)">
						<text class="wxParseIconFonts vicon-link netDisk-card-copy-text">点击这里复制网盘链接</text>
					</view>
				</view>
				<view class="netDisk-card-text">
					<view class="netDisk-card-inline netDisk-card-strong">
						<text :user-select="true">密码：</text>
					</view>
					<view v-if="!isVideoAds" class="netDisk-card-inline"
						@tap="bindCopyCode(detail.meta.NetDisk[0].psw)">
						<text :user-select="true">{{detail.meta.NetDisk[0].psw}}</text>
						<text class="netDisk-card-copy-text">(点击复制密码)</text>
					</view>
					<view v-else class="netDisk-card-inline">
						<text>********</text>
					</view>
				</view>
				<view v-if="isVideoAds" class="flex flex-wrap justify-start">
					<view class="subScribeButton" style="padding:20rpx;">
						<!-- #ifdef MP -->
						<button class="cu-btn round bg-green" @tap="bindReadMore">观看视频, 获取网盘密码</button>
						<!-- #endif -->
						<!-- #ifdef APP||H5 --><button class="cu-btn round bg-green" @tap="rewardedVideoAd">观看视频,
							获取网盘密码</button>

						<!-- #endif -->

					</view>
				</view>
			</view>
		</view>



		<view class="item_container">

			<view>
				<text class="item_desc">- 没有更多了，分享一下吧！-</text>
			</view>

			<!-- #ifdef MP -->
			<view class="item_share_container">
				<button class="item_friend_container" data-from="bottom" openType="share">
					<text class="text">分享好友</text>
					<image class="image" src="http://mat1.gtimg.com/www/js/news/icon_pinglun_weixin.png"></image>
				</button>
				<button @tap="getLinks" class="item_friend_container" style="margin-left:30rpx;">
					<text class="text">分享链接</text>
					<image class="image" src="http://mat1.gtimg.com/www/js/news/icon_pinglun_pyq.png"></image>
				</button>
			</view>
			<!-- #endif -->

			<!-- #ifdef APP -->
			<view class="item_share_container">
				<button class="item_friend_container" data-from="bottom" @click="share">
					<text class="text">分享好友</text>
					<image class="image" src="http://mat1.gtimg.com/www/js/news/icon_pinglun_weixin.png"></image>
				</button>
				<button @tap="getLinks" class="item_friend_container" style="margin-left:30rpx;">
					<text class="text">分享链接</text>
					<image class="image" src="http://mat1.gtimg.com/www/js/news/icon_pinglun_pyq.png"></image>
				</button>
			</view>
			<!-- #endif -->

		</view>
		<!-- </view> -->

		<view class="ad" v-if="advert.code">
			<view class="adview" v-if="advert.type=='unit'">
				<ad :unit-id="advert.code"></ad>
			</view>
			<view @tap="gotoAD(advert.type,advert.code)" class="adview" v-else>
				<view class="adtext">
					<text>广告</text>
				</view>
				<image :src="advert.thumbnail" mode="aspectFill"></image>
			</view>
		</view>


		<view class="entry-page">
			<view @tap="gotoDetail(detail.prev_post.id)" class="entry-page-prev" v-if="detail.prev_post"
				:style="'background-image: url('+detail.prev_post.thumbnail+'); display:block;'">
				<view class="title">
					<text>{{detail.prev_post.title.rendered}}</text>
				</view>
				<view class="entry-page-info">
					<view class="pull-left">
						上一篇
					</view>
					<view class="pull-right">
						{{detail.prev_post.views}} 浏览
					</view>
				</view>
			</view>
			<view@tap="gotoDetail(detail.next_post.id)" class="entry-page-next" v-if="detail.next_post"
				:style="'background-image: url('+detail.next_post.thumbnail+'); display:block;'">
				<view class="title">
					<text>{{detail.next_post.title.rendered}}</text>
				</view>
				<view class="entry-page-info">
					<view class="pull-left">
						下一篇
					</view>
					<view class="pull-right">
						{{detail.next_post.views}} 浏览
					</view>
				</view>
		</view>
	</view>

	<view class="s-tags" v-if="detail.tags">
		<view @tap="gotoTag(item.id)" class="s-tag" v-for="(item,index) in detail.tags" :key="index">#{{item.name}}
		</view>
	</view>

	<recommend :recommendList="recommendList" v-if="recommendList.length>0"></recommend>
	<view class="comment">
		<comment :commentList="commentList" :userInfo="user" :commentCountTotal="detail.comments" @reply="reply"
			@tapLikes="tapcommentLike" @showRecommendList="showRecommend" :isNewest="isNewest"
			@showNewestList="showNewest" @deleteCommentByUser="deleteComment" @changeCommentStatus="changeCommentsHiddenStatus" :showButton="showButton"></comment>
	</view>



	<view :class="!isInput?'comment-submit is-show':'comment-dialog is-hide'">
		<view class="comment-submit-left">
			<view @tap="tapComment" class="comment-submit-btn">写评论...</view>
		</view>
		<view class="comment-submit-right">
			<view @tap="anchor" class="comment-submit-icon">
				<view class="comment-submit-image comment-comment"></view>
				<view v-if="detail.comments>0">{{detail.comments}}</view>
				<view v-else>评论</view>
			</view>
			<view @tap="tapFav" class="comment-submit-icon" v-if="detail.isfav===false">
				<view class="comment-submit-image comment-star"></view>
				<view>收藏</view>
			</view>
			<view @tap="tapFav" class="comment-submit-icon" v-else>
				<view class="comment-submit-image comment-nostar-active"></view>
				<view>取消收藏</view>
			</view>
			<view @tap="tapLike" class="comment-submit-icon">
				<view
					:class="detail.islike===false?'comment-submit-image comment-zan-2':'comment-submit-image comment-zan-active-2'">
				</view>
				<view v-if="favourSum>0">{{favourSumFormat}}</view>
				<view v-else>点赞</view>
			</view>
		</view>
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
	</view>
</template>

<script>
	import API from '@/api/api.js';
	import appShare, {
		closeShare
	} from '@/api/appShare.js';
	import config from '@/api/config.js';
	var app = getApp();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	let videoAd = null;
	var adReward = null;
	export default {
		data() {
			return {
				isCustom: false,
				playurl: '',
				loading: true,
				isvideo: false,
				isplay: false,
				advert: [],
				videoAds: false,
				video: '',
				isVideoAds: false,
				user: '',
				type: '',
				count: 0,
				audio: false,
				detail: [],
				playText: '播放录音',
				content: '',
				isFocus: true,
				topshow: true,
				placeholder: '写评论...',
				recommendList: [],
				commentList: [],
				page: 1,
				hiddenAll: false,
				isLike: false,
				isFav: false,
				isComments: false,
				favourSum: 0,
				isFollow: false,
				isInput: false,
				isPublish: false,
				isNewest: true,
				is_subscribe: false,
				commentContent: '',
				isCommentLoad: false,
				showButton:true,
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.type = options.type;
			this.getPostsDetail(options.type, options.id);
			this.getRelatePosts(options.type, options.id);
			this.getPostsComments({
				id: options.id,
				page: this.page,
				orderby: 'comment_date',
			});
			// #ifdef MP
			this.getDetailAds();
			this.onLoadRewardedVideoAd();
			// #endif
		},


		onReachBottom() {

			if (!this.isLastPage && this.isNewest && isCommentLoad) {
				this.getPostsComments({
					id: this.id,
					page: this.page,
					orderby: 'comment_date',
				});
			}
			if (!this.isLastPage && !this.isNewest && isCommentLoad) {
				this.getPostsComments({
					id: this.id,
					page: this.page,
					orderby: 'likes',
				});
			}
		},

		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},

		onPageScroll: function(e) {
			if (e.scrollTop < 10) {
				this.topshow = true;
			} else {
				this.topshow = false;
			}
		},
		methods: {
			share() {
				let shareData = {
					shareUrl: config.h5link + '#/pages/detail/detail?id=' + this.id + '&type=' + this.type,
					shareTitle: this.detail.title.rendered,
					shareContent: this.detail.excerpt.rendered,
					shareImg: this.detail.meta.thumbnail,
					appId: config.appId, // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath: '/pages/detail/detail?id=' + this.detail.id + "&type=" + this.type,
					appWebUrl: config.h5link + '#/pages/detail/detail?id=' + this.id + '&type=' + this.type,
				};
				// 调用
				let shareObj = appShare(shareData, res => {
					console.log("分享成功回调", res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				}, 5000);
			},
			rewardedVideoAd: function() {
				let that = this;
				if (adReward) {
					outLine('正在加载激励视频广告');
					return;
				}
				console.log('#视频激励广告#');
				adReward = plus.ad.createRewardedVideoAd({
					adpid: '1439410168'
				}); // 注意替换为自己申请的adpid，此广告位标识仅在HBuilderX标准基座中有效  
				adReward.onLoad(function() {
					console.log('加载成功')
					adReward.show();
				});
				adReward.onError(function(e) {
					console.log('加载失败: ' + JSON.stringify(e));
					adReward.destroy();
					adReward = null;
				});
				adReward.onClose(function(e) {
					if (e.isEnded) {
						console.log('激励视频播放完成');
						that.isVideoAds = false;
						plus.nativeUI.toast('激励视频播放完成');
					} else {
						console.log('激励视频未播放完成关闭!')
					}
					adReward.destroy();
					adReward = null;
				});
				adReward.load();
			},
			getLinks: function() {
				let that = this;
				let link = ''
				if (config.h5link !== '') {
					link = config.h5link + '#/pages/detail/detail?id=' + this.id + '&type=' + this.type;
				} else {
					link = this.detail.link
				}
				uni.setClipboardData({
					data: link,
					success: function() {
						that.$refs.uToast.show({
							title: '链接已复制',
							type: 'success',
						})
					}
				})
			},

			actionFollow: function(e) {
				let data = {}
				let that = this;
				let id = e.id // 关注的用户id
				let action = e.status // 关注动作：follow 取关动作 disfollow
				data.id = id
				data.action = action
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				if (id == 0) {
					that.$refs.uToast.show({
						title: '匿名用户不能关注',
						type: 'error',
					})
					return;
				}
				API.updateFollow(data).then(res => {
						if (res.message == "取关成功") {
							that.isFollow = false;
						} else if (res.message == "关注成功") {
							that.isFollow = true;
						}
					})
					.catch(err => {
						if (err.message == "授权信息有误") {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否前往登陆?',
								success: function(res) {
									if (res.cancel) {
										that.$refs.uToast.show({
											title: '取消登录',
											type: 'error',
										})
										that.status = "nomore"
									} else {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}
								},
								fail: function(err) {
									console.log(err)
								}
							})
						}
					})

			},

			deleteComment: function(id) {
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除评论？',
					success: function(res) {
						if (res.cancel) {
							that.$refs.uToast.show({
								title: '取消删除',
								type: 'error',
							})
						} else {
							API.deleteComment(id).then(res => {
									if (res.status == 200) {
										that.page = 1;
										that.commentContent = "";
										that.commentList = [];
										that.isCommentLoad = false;
										that.isFocus = false;
										that.isComments = false;
										that.getPostsComments({
											id: that.id,
											page: that.page,
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
								})
						}
					},
				})
			},

			getDetailAds: function() {
				API.detailAdsense().then(res => {
						if (res.status === 200) {
							this.advert = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getPostsDetail: function(type, id) {
				let that = this;
				API.getPostsbyID(type, id).then(res => {
						this.detail = res;
						uni.setNavigationBarTitle({
							title: res.title.rendered
						})
						this.loading = false;
						let videoAdLogs = uni.getStorageSync('videoAdLogs') || [];
						if (videoAdLogs.indexOf(this.id) > -1) {
							this.videoAds = false;
						} else {
							this.videoAds = res.we_video_ad;
							this.isVideoAds = true;
						}
						if (res.format == 'video') {
							this.video = res.media.video;
							this.isvideo = true;
						}
						if (res.author.status === 'disfollow') {
							this.isFollow = true;
						}
						if (type == 'forums' && res.format != 'quote') {
							this.content = res.content.rendered.replace(/<img.*\/>/ig, "")

						} else {
							this.content = res.content.rendered

						}
						if (res.format == 'audio') {
							this.audio = true;
						} else {
							this.audio = false;
						}
						if (res.meta.hasOwnProperty('custom')) {
							this.isCustom = true;
						}
						if (res.hasOwnProperty("subscribe")) {
							if (!res.subscribe.is_subscribe) {
								this.is_subscribe = false;
							} else {
								this.is_subscribe = res.subscribe.is_subscribe;
							}

						}


						//阅读浏览历史记录
						let logs = uni.getStorageSync('readLogs') || []
						let isLogs = true
						if (logs.length > 0) {
							for (let i = 0; i < logs.length; i++) {
								if (logs[i].id == res.id) {
									isLogs = false
									break
								}
							}
						}
						if (isLogs) {
							logs.unshift(res)

						}
						if (logs.length > 50) {
							logs.pop();
						}
						uni.setStorageSync('readLogs', logs)
						//阅读浏览历史结束
					})
					.catch(err => {
						console.log(err);
					})
			},

			bindReadMore: function() {
				let that = this
				uni.getSystemInfo({
					success: function(e) {
						if (e.platform == 'devtools') {
							console.log("开发工具不支持显示激励视频")
							that.isVideoAds = false;
							that.videoAds = false

						} else if (videoAd) {
							videoAd.show().catch(() => {
								videoAd.load().then(() => videoAd.show())
									.catch(err => {
										console.log('激励视频广告显示错误', err)
									})
							})

						}
					}
				})
			},
			onLoadRewardedVideoAd: function() {
				let that = this
				let datetime = Date.now()
				let expired = uni.getStorageSync('vd_expire')
				let videoAdLogs = uni.getStorageSync('videoAdLogs') || []
				API.videoAdsense().then(res => {
						if (res.status === 200) {
							if (uni.createRewardedVideoAd) {
								videoAd = uni.createRewardedVideoAd({
									adUnitId: res.data.code
								})
								videoAd.onLoad(() => {
									console.log('onLoad Video Ad')
								})
								videoAd.onError((err) => {
									console.log(err)
								})
								videoAd.onClose((res) => {
									if (res && res.isEnded) {
										that.isVideoAds = false;
										that.videoAds = false;
									}
									if (!expired) {
										uni.setStorageSync('vd_expire', datetime +
											86400 * 1000)
									} else if (expired < datetime) {
										videoAdLogs = []
										uni.removeStorageSync('videoAdLogs')
										uni.setStorageSync('vd_expire', datetime +
											86400 * 1000)
									}
									if (videoAdLogs.indexOf(that.data.id) == -1) {
										videoAdLogs.unshift(that.data.id)
									}
									uni.setStorageSync('videoAdLogs', videoAdLogs)
								})
							} else {
								this.isVideoAds = false

							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id + "&type=" + this.type
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
			openmap: function(lat, lng) {
				uni.openLocation({
					latitude: parseFloat(lat),
					longitude: parseFloat(lng),
					success: function(e) {
						console.log(e);
					},
					fail: function(e) {
						console.log(e);
					}
				});
			},
			getRelatePosts: function(type, id) {
				API.getRelatePosts(type, id).then(res => {
					this.recommendList = res;
				})

			},
			gotoCate: function(id) {
				console.log(id);
				uni.navigateTo({
					url: '../category/category?id=' + id
				})
			},


			getPostsComments: function(args) {
				API.getComments(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
						}
						this.commentList = this.commentList.concat(res);
						this.page = this.page + 1;
						this.isCommentLoad = true;
					})
					.catch(err => {
						console.log(err)
					})
			},
			tapLike: function() {
				let that = this;
				if (this.user == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					let detail = this.detail
					let count = detail.likes
					API.like({
							id: detail.id
						}).then(res => {
							if (res.status === 200) {
								that.$refs.uToast.show({
									title: '点赞+1',
									type: 'success',
								})
								detail.islike = true
								detail.likes = count + 1
								this.detail = detail

							} else if (res.status === 202) {
								that.$refs.uToast.show({
									title: '点赞-1',
									type: 'error',
								})
								detail.islike = false
								detail.likes = count - 1
								this.detail = detail
							} else {
								if (res.message) {
									uni.showModal({
										title: '温馨提示',
										content: err.message
									})
								} else {
									that.$refs.uToast.show({
										title: '点赞失败',
										type: 'error',
									})
								}
							}
						})
						.catch(err => {
							console.log(err)
							if (err.message) {
								uni.showModal({
									title: '温馨提示',
									content: err.message
								})
							}
						})
				}
			},
			
			changeCommentsHiddenStatus: function (e) {
			    let id = parseInt(e.id);
			    let sid = parseInt(e.sid);
			    this.commentList[id].reply[sid].islike = !this.commentList[id].reply[sid].islike;
			  },
			
			tapFav: function() {
				let that = this;
				if (this.user == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					let detail = this.detail
					let count = detail.likes
					API.fav({
							id: detail.id
						}).then(res => {
							if (res.status === 200) {
								that.$refs.uToast.show({
									title: '收藏+1',
									type: 'success',
								})
								detail.isfav = true
								detail.favs = count + 1
								this.detail = detail

							} else if (res.status === 202) {
								that.$refs.uToast.show({
									title: '收藏-1',
									type: 'error',
								})
								detail.isfav = false
								detail.favs = count - 1
								this.detail = detail
							} else {
								if (res.message) {
									uni.showModal({
										title: '温馨提示',
										content: err.message
									})
								} else {
									that.$refs.uToast.show({
										title: '收藏失败',
										type: 'error',
									})
								}
							}
						})
						.catch(err => {
							console.log(err)
							if (err.message) {
								uni.showModal({
									title: '温馨提示',
									content: err.message
								})
							}
						})
				}
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

			bindCopy: function(code) {
				wx.setClipboardData({
					data: code,
					success: function(res) {
						wx.getClipboardData()
					}
				})
			},

			Copylink: function(link) {
				this.bindCopy(link)
			},

			bindCopyLink: function(link) {
				this.bindCopy(link)
			},

			bindCopyCode: function(code) {
				this.bindCopy(code)
			},

			gotoTags: function(id, name) {
				uni.navigateTo({
					url: '/pages/tag/tag?id=' + id + '&name=' + name,
				})
			},

			showRecommend: function() {
				this.isNewest = true,
					this.page = 1,
					this.commentList = [],
					this.getPostsComments({
						id: this.id,
						page: this.page,
						orderby: 'likes',
					})
			},
			userTap: function(id) {
				uni.navigateTo({
					url: '@/pages/user/user',
				})
			},

			showNewest: function() {
				this.isNewest = false,
					this.page = 1,
					this.commentList = [],
					this.getPostsComments({
						id: this.id,
						page: this.page,
						orderby: 'comment_date',
					})
			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function(res) {
				return {
					title: this.detail.title.rendered,
					path: '/pages/detail/detail?id=' + this.detail.id + "&type=" + this.type,
					imageUrl: this.detail.meta.thumbnail,
					success: (res) => {
						console.log("转发成功", res);
					},
					fail: (res) => {
						console.log("转发失败", res);
					}

				}
			},
			onShareTimeline: function(res) {
				return {
					title: this.detail.title.rendered,
					query: 'id=' + this.detail.id + "&type=" + this.data.type,
					imageUrl: this.detail.meta.thumbnail //图片地址
				}
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
			},

			playRecord: function() {
				console.log(this.detail.media.audio);
				if (this.detail.media.audio) {
					innerAudioContext.src = this.detail.media.audio;
					innerAudioContext.play();
					innerAudioContext.onPlay(() => {
						this.playText = "正在播放"
					})
					innerAudioContext.onEnded(() => {
						this.playText = "播放录音"
					})
				}
			},

			wxParseCreditPay: function(credits) {
				let args = {}
				let that = this
				let credit = credits
				args.id = this.id
				args.payment = 'credit'
				args.expenses = credit
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return

				}
				uni.showModal({
					title: '温馨提示',
					content: '确认使用 ' + credit + ' 积分阅读本篇文章?',
					cancelColor: '#D0104C',
					confirmColor: '#D0104C',
					confirmText: '确认',
					success: response => {
						if (response.confirm) {
							API.creditSubscribe(args).then(res => {
									if (res.status == 200) {
										that.getPostsDetail(that.type,that.id)
										that.$refs.uToast.show({
											title: res.message,
											type: 'success',
										})
									}
								})
								.catch(err => {
									if (err.data.status = 403) {
										that.$refs.uToast.show({
											title: err.message,
											type: 'error',
										})
									} else {
										that.$refs.uToast.show({
											title: '未知错误',
											type: 'error',
										})
									}
								})
						} else {
							that.$refs.uToast.show({
								title: '取消成功',
								type: 'success',
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.showloading {
		background: #fff;
		position: fixed;
		text-align: center;
		transition: .3s;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;

		.load {
			opacity: 1;
			transition: .3s;
			top: 0;
		}

		.loadtext {
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				font-size: 28rpx;
				opacity: .5;
			}
		}

		.loadicon {
			width: 100rpx;
			height: 100rpx;
			animation: turn .4s linear infinite;
			position: relative;
			z-index: 10;
			opacity: .6;

			&::before {
				content: "";
				position: absolute;
				border-radius: 50%;
				border-width: 10rpx;
				border-style: solid;
				width: 80rpx;
				height: 80rpx;
				transform: scale(-.7);
				left: 0rpx;
				top: 0rpx;
				z-index: 5;
			}
		}
	}

	@-webkit-keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(1turn);
		}
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(1turn);
		}
	}

	.topic-detail {

		.detail-header {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: fixed;
			left: 0;
			top: -100rpx;
			z-index: 3;
			width: 100vw;
			height: 100rpx;
			padding: 0 54rpx;
			background-color: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(4rpx);
			transition: transform 0.5s;

			image {
				flex: 0 0 auto;
				width: 60rpx;
				height: 60rpx;
				margin-right: 16rpx;
				border-radius: 8rpx;
			}

			.detail-header-name {
				flex: 1 1 auto;
				overflow: hidden;

				text {
					display: block;
					font-size: 32rpx;
					font-weight: bold;
					color: #3b3b3b;
					line-height: 40rpx;
				}

				span {
					display: block;
					font-size: 24rpx;
					font-weight: normal;
					color: #ababab;
					line-height: 28rpx;
				}

				.g-text-overflow {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.detail-header-btn {
				&::before {
					border-radius: 32rpx;
					border-color: #3b3b3b;
				}

				flex: 0 0 auto;
				width: 128rpx;
				height: 60rpx;
				font-size: 24rpx;
				text-align: center;
				line-height: 60rpx;
				font-weight: normal;
				color: #3b3b3b;
				border-radius: 16rpx;

			}


			.half-pixel-border {
				position: relative;

				&::before {
					content: '';
					position: absolute;
					box-sizing: border-box;
					left: 0;
					top: 0;
					width: 200%;
					height: 200%;
					border-radius: inherit;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5);
					border: 1px solid rgba(0, 0, 0, 0.1);
				}

			}

		}

		.half-pixel-bottom-border {
			position: relative;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background-color: #c2c2c2;
				transform: scaleY(0.4);
				transform-origin: 50% 100%;
			}
		}

		.detail-header-show {
			transform: translate3d(0, 100%, 0);
		}
	}

	.article-info {
		background: #fff;
		padding-top: 40rpx;
		border-radius: 15rpx;

		.article-detail-author {
			display: flex;
			padding: 68rpx 30rpx 68rpx 30rpx;
			font-size: 24rpx;
			line-height: 1;

			text {
				font-weight: bold;
			}

			view {
				width: 2rpx;
				height: 22rpx;
				margin: 0 18rpx;
				background-color: #ABABAB;
			}

			span {
				color: #ababab;
			}
		}

		.article-detail-title {
			margin-bottom: 98rpx;
			font-size: 54rpx;
			color: #3b3b3b;
			line-height: 87rpx;
			font-family: 'zaker-title';
		}

		.article-wrap {
			padding: 0 30rpx;
		}


	}

	.entry-content {
		clear: both;
		color: #404246;
		margin: 0;
		padding: 0 30rpx;
		font-size: 36rpx;
		line-height: 70rpx;
		text-align: justify;
		word-wrap: break-word;
		word-break: normal;
		font-family: Impact, Haettenschweiler, ‘Arial Narrow Bold’, sans-serif;

		video {
			width: 100% !important;
		}

		image {
			width: 100% !important;
		}

	}


	.comment-submit {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 166rpx;
		padding: 24rpx 18rpx 46rpx 24rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background: #fff;
		box-shadow: 0 2px 10px 0 rgba(155, 161, 168, .3);
		z-index: 99;

		.comment-submit-btn {
			max-width: 384rpx;
			min-width: 384rpx;
			height: 80rpx;
			background: rgba(187, 194, 202, .2);
			border-radius: 40rpx;
			padding: 18rpx 30rpx 17rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			color: rgba(47, 47, 47, .5);
		}
	}

	.comment-dialog {
		position: fixed;
		flex-direction: column;
	}

	.is-show {
		display: flex;
	}

	.is-hide {
		display: none;
	}

	.comment-submit-icon,
	.comment-submit-right {
		display: flex;
	}

	.comment-submit-icon {
		flex-direction: column;
		align-items: center;
		width: 96rpx;
		height: 96rpx;
		margin-right: 6rpx;
	}

	.comment-submit-icon:last-child {
		margin-right: 0;
	}

	.comment-submit-icon .comment-submit-image {
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		margin-top: 11rpx;
	}

	.comment-submit-icon .comment-zan-2 {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-zan-2.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-zan-active-2 {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-zan-active-2.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-star {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-star.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-nostar-active {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-nostar-active.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-comment {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-comment.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon view {
		margin-top: 6rpx;
		font-size: 24rpx;
		color: #6c788e;
		line-height: 33rpx;
	}

	.container {
		height: 600rpx;
		overflow: hidden;
		position: relative;
	}


	/**
	*  文章底部分享
	*/

	.item_container {
		height: auto;
		width: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 40rpx;

		.item_desc {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #888;
			letter-spacing: 0;
		}

		.item_share_container {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 34rpx;
			margin-bottom: 100rpx;

			.item_friend_container {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				background: #fff;
				box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.10);
				border-radius: 40rpx;
				background-color: rgba(0, 0, 0, 0);
				padding-left: 20rpx;
				padding-right: 20rpx;

				.text {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #222;
					letter-spacing: 0;
				}

				.image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 20rpx;
				}

			}
		}

		button {
			background: none;
			display: block;
			margin: 0;
			padding: 0;

			&::after {
				border: 0;
				background: none;
			}
		}

	}

	.subScribeButton {
		text-align: center;
		margin: 30rpx 120rpx;

		button {
			font-size: 28rpx;
			background-color: #39b54a;
			color: #fff;
		}
	}

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

	.entry-page {
		margin: 30rpx;
		overflow: hidden;

		.entry-page-prev {
			position: relative;
			width: 100%;
			padding: 60rpx 15rpx 10rpx;
			color: #fff;
			background-size: cover;
			background-position: 50%;
			border-radius: 4px;
			overflow: hidden;

			&:before {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, .5);
				content: "";
			}

			.title {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				color: #fff;
				font-size: 28rpx;

				text {
					display: block;
					padding: 30rpx 30rpx;
					height: 80rpx;
					line-height: 50rpx;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					-webkit-line-clamp: 1;
				}
			}

			.entry-page-info {
				padding: 30rpx 10rpx;
				display: flex;
				justify-content: space-between;
				position: relative;
				font-size: 24rpx;
				line-height: 32rpx;
				overflow: hidden;
			}
		}

		.entry-page-next {
			position: relative;
			width: 100%;
			margin-top: 30rpx;
			padding: 60rpx 15rpx 10rpx;
			color: #fff;
			background-size: cover;
			background-position: 50%;
			border-radius: 4px;
			overflow: hidden;

			&:before {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, .5);
				content: "";
			}

			.title {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				color: #fff;
				font-size: 28rpx;

				text {
					display: block;
					padding: 30rpx 30rpx;
					height: 80rpx;
					line-height: 50rpx;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					-webkit-line-clamp: 1;
				}
			}

			.entry-page-info {
				padding: 30rpx 10rpx;
				display: flex;
				justify-content: space-between;
				position: relative;
				font-size: 24rpx;
				line-height: 32rpx;
				overflow: hidden;
			}
		}
	}

	.s-tags {
		margin: 30rpx;
	}

	.s-tag {
		display: inline-block;
		margin: 0 7px 12px 0;
		padding: 2px 12px;
		border-radius: 32px;
		background-color: #edf1f7;
		line-height: 1.8;
		font-size: 14px;
		font-weight: 700;
		color: #5a91e1;
		text-transform: uppercase;
	}

	.adview {
		position: relative;
		padding: 30rpx;

		.adtext {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			padding: 5rpx 20rpx;
			background: #333;
			color: #fff;
			font-size: 24rpx;
		}

		image {
			width: 690rpx;
			height: 200rpx;
		}
	}

	.netDisk-card {
		.title {
			font-size: 34rpx;
			font-weight: bold;
			padding: 40rpx 0rpx;
		}

		height: auto;
		display: block;
		overflow: visible;
		margin: 30rpx;
		padding-top: 40rpx;
		background-color: #fff;

		.netDisk-card-text {
			color: #666;
			font-size: 1.2em;
			line-height: 1.75;
			letter-spacing: 2rpx;
			padding-bottom: 40rpx;

			.netDisk-card-strong {
				font-weight: bolder;
			}

			.netDisk-card-inline {
				display: inline;
			}

			.netDisk-card-copy-text {
				color: #21759b;
				margin-left: 20rpx;
			}
		}
	}


	.video {
		display: flex;
		flex-direction: row;
		margin: 30rpx;
		box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, .1);
		border-radius: 20rpx;
		align-items: center;
		justify-content: flex-start;
		padding: 20rpx 60rpx;
	}

	.video .image {
		width: 90rpx;
		height: 90rpx;
	}

	.video .image image {
		width: 90rpx;
		height: 90rpx;

	}

	.video .text {
		padding-left: 20rpx;
	}

	.videoplay {
		padding: 20rpx;
	}

	.videoplay .videos {
		width: 100%;
		height: 386rpx;
	}

	.videofeture {
		width: 200rpx;
		height: 60rpx;
		text-align: center;
		background: #f2f2f2;
		color: #434343;
	}

	.videofeture text {
		line-height: 60rpx;
	}

	.comment {
		padding-bottom: 300rpx;
	}

	/** 地址 标签 */
	.address-tag-all-view {
		padding: 0rpx 20rpx 0rpx 20rpx;
		display: flex;
		position: relative;
		flex: row;
		align-items: center;
		flex-wrap: wrap;
	}

	.address-view {
		height: 46rpx;
		display: flex;
		flex: row;
		position: relative;
		align-items: center;
		border-radius: 12rpx;
		background-color: #f5f5f5;
		overflow: hidden;
		white-space: nowrap;
		margin: 14rpx 14rpx 14rpx 0rpx;
	}

	.address-image {
		position: absolute;
		left: 0;
		top: calc((100% - 22rpx) / 2);
		width: 22rpx;
		height: 22rpx;
		margin: 0rpx 12rpx 0rpx 15rpx;
	}

	.address-text {
		font-size: 22rpx;
		line-height: 22rpx;
		color: #8c8c8c;
		font-weight: 400;
		margin-right: 15rpx;
		margin-left: 49rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tag-view {
		margin: 20rpx 20rpx 20rpx 0rpx;
		height: 46rpx;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
		background-color: #f5f5f5;
	}

	.tag-text {
		font-size: 22rpx;
		line-height: 22rpx;
		color: #8c8c8c;
		font-weight: 400;
		margin-right: 15rpx;
		white-space: nowrap;
	}

	.tag-image {
		width: 22rpx;
		height: 22rpx;
		margin: 0rpx 12rpx 0rpx 15rpx;
	}


	.pd-lr-15 {
		padding: 0 30rpx;
	}

	.module-item {
		background: #fff;
		margin-bottom: 20rpx;
		position: relative;
		border-top: 20rpx solid #f9f9f9;
		border-bottom: 20rpx solid #f9f9f9;
	}


	.detail-title {
		padding-top: 40rpx;
		font-size: 36rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #222121;
	}


	.hiddenAll>.product-msg {
		height: 150rpx;
		overflow: hidden;
	}

	.product-msg {
		margin-top: 40rpx;
	}

	.msg-item {
		line-height: 28rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.msg-item:not(:last-child) {
		margin-bottom: 30rpx;
	}

	.msg-item .item-value {
		color: #222121;
		font-size: 28rpx;
	}

	.msg-item .item-value:nth-child(2) {
		flex-grow: 0;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: keep-all;
		max-width: 100%;
		width: 152rpx;
	}

	.msg-item .item-value:last-child {
		flex-grow: 2;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: keep-all;
		max-width: 100%;
		margin-left: 20rpx;
	}

	.msg-item .gray-dot {
		width: 10rpx;
		height: 10rpx;
		background-color: #B1B1B1;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.information-more {
		margin-top: 40rpx;
		line-height: 100rpx;
		color: #7d7d7d;
		font-size: 26rpx;
		text-align: center;
		position: relative;
	}

	.information-more:after {
		content: " ";
		display: block;
		position: absolute;
		top: 0;
		left: -30rpx;
		right: -30rpx;
		z-index: 2;
		height: 1rpx;
		transform: scaleY(0.5);
		background-color: #E6E6E6;
	}

	/** 地址 标签 */
</style>
