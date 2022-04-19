<template>
	<view class="content">
		<!-- #ifndef MP-BAIDU -->
		<view class="back-button" @tap="back">
			<image src="/static/images/back.png" mode="widthFix"></image>
		</view>
		<!-- #endif -->
		<!-- 圈子顶部信息 -->
		<view class="info-banner-wrapper" style="height:494rpx;">
			<image class="banner" :style="userBannerStyle" mode="aspectFill" :src="cover"></image>
			<view class="banner-cover"></view>
			<view class="info-wrapper">
				<view class="base-wrapper">
					<image class="avatar" mode="aspectFill" :src="cover"></image>
					<view class="text-wrapper">
						<view class="name">{{category}}</view>
						<view @tap="showIntrofun" class="detail-wrapper" v-if="description">
							<view class="introduction">
								<label class="introduction-title">简介</label>
								<label class="introduction-detail">{{description}}</label>
							</view>
							<image class="arrow img" src="/image/common-arrow-right-white.png"></image>
						</view>
					</view>
				</view>
				<view class="other-wrapper">
					<view class="count">{{followers+'成员 · '+count+'条内容'}}</view>
					<view class="controls">
						<view @tap="quitCircle" class="join-button already" v-if="isCircle">
							<label class="text">已关注</label>
						</view>
						<view @tap="joinCircle" class="join-button" v-else>
							<label class="text">+关注</label>
						</view>
						<!-- #ifdef MP -->
						<button class="share-button" openType="share">
							<image class="icon img" src="@/static/images/common-share-white.png"></image>
						</button>
						<!-- #endif -->
						<!-- #ifdef APP -->
						<button class="share-button" @tap="shareFunction">
							<image class="icon img" src="@/static/images/common-share-white.png"></image>
						</button>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<button class="share-button" @click="clickShare">
							<image class="icon img" src="@/static/images/common-share-white.png"></image>
						</button>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>


		<!-- 圈子成员 -->
		<view class="member-info-wrapper">
			<view class="member-wrapper owner">
				<view @tap="membersDidClick" class="member-title">圈子成员<view class="count">
						<label class="text">查看更多</label>
						<image class="icon" src="@/static/images/more.png"></image>
					</view>
				</view>
				<view class="member-list-wrapper">
					<view  class="member-item-wrapper">
						<image class="avatar" mode="aspectFill" src="@/static/images/avatar_icon_default_show.png"
							v-if="!boardmaster">
						</image>
						<image @tap="onUserClick(boardmaster.userId)" class="avatar" mode="aspectFill" :src="boardmaster.avatar" v-else></image>
						<view class="name" v-if="boardmaster">{{boardmaster.name}}</view>
						<view class="name" v-else>
							管理员
						</view>
						<view class="quanzhu-icon">
							<image src="@/static/images/dingyue.png"></image>
						</view>
					</view>
					<view @tap="onUserClick(member.userId)" class="member-item-wrapper" v-for="(member,memberIndex) in memberList"
						v-if="memberIndex<3" :key="memberIndex">
						<image class="avatar" mode="aspectFill" :src="member.avatarUrl"></image>
						<view class="name">{{member.nickName}}</view>
					</view>
					<!-- #ifdef MP -->
					<button class="member-invite-wrapper" openType="share">
						<view class="text">邀请</view>
						<view class="text">圈友</view>
					</button>
					<!-- #endif -->
					<!-- #ifdef APP -->
					<button class="member-invite-wrapper" @tap="shareFunction">
						<view class="text">邀请</view>
						<view class="text">圈友</view>
					</button>
					<!-- #endif -->
					
				</view>
			</view>
		</view>
		<!-- 圈子成员 -->

		<view class="dynamic-header">
			<text>动态</text>
			<view class="selOpitions">
				<view @tap="onHandleClick(index)"
					:class="swithBarIndex==index?'selOpitions-selected':'selOpitions-item'"
					v-for="(item,index) in tabData" :key="index">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<view class="toplicList">
			<view class="wfw" v-if="isWaterFull">
				<view class="wf_left">
					<helang-waterfall :unitid="listAd.code" v-for="(item,index) in leftList" :key="index"
						:params="item" tag="left" :index="index" @height="onHeight"></helang-waterfall>
				</view>
				<view class="wf_right">
					<helang-waterfall :unitid="listAd.code" v-for="(item,index) in rightList" :key="index"
						:params="item" @height="onHeight" tag="right" :index="index"></helang-waterfall>
				</view>
			</view>
			<view class="toplicList" v-else>
				<view class="cell_view_bottom" v-for="(item,index) in topicList" :key="index">
					<topic-list :unitid="listAd.code" :datas="item" :index="index" @followUserByid="followUser"></topic-list>
				</view>
			</view>
			<u-loadmore :margin-top="40" :margin-bottom="80" :status="status" />
		</view>
		<view class="sticky-btn flex-center" @tap="gotoPost" v-if="isCircle">
			<text>+</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	import appShare, {
		closeShare
	} from '@/api/appShare.js';
	import config from '@/api/config.js';
	let app = getApp();
	export default {
		data() {
			return {
				isWaterFull: config.isWaterFull,
				title: "圈子详情",
				count: '',
				category: '',
				color: '',
				isCircle: false,
				description: '',
				followers: [],
				cover: '',
				boardmaster: false,
				memberList: [],
				swithBarIndex: 0,
				tabData: ["最新动态", "热门动态"],
				page: 1,
				status: "loading",
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				topicList:[],
				userBannerStyle: '',
				isshare:false,
				link:'',
				listAd:""

			}
		},
		onLoad(options) {
			if (options.isshare == 1) {
				this.isshare = true;
			}
			// #ifdef MP
			this.getListAds();
			// #endif
			this.id = options.id;
			this.getCircleByIDs(options.id);
			this.getMenmberList(options.id, {
				page: 1
			});
			this.getTopicList({
				circle: this.id,
				page: this.page
			});
		},
		

		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		onPageScroll: function(t) {
			var e = t.scrollTop > 0;
			if (!e) {
				var n = 1 + Math.abs(t.scrollTop) / 150;
				this.userBannerStyle = "position: fixed; transform-origin: top center; transform: scale(".concat(
					n, ")")
			} else {
				this.userBannerStyle = ""
			}
		},
		onReachBottom() {
			if (!this.isLastPage) {
				if (this.swithBarIndex == 0) {
					this.getTopicList({
						circle: this.id,
						page: this.page
					})
				} else {
					this.getStickyLists({
						circle: this.id,
						page: this.page
					})
				}
			}
		},
		methods: {
			shareFunction:function() {
				console.log(333);
				let shareData = {
					shareUrl: config.h5link+'#/pages/circle/list/list?id='+ this.id + '&isshare=1',
					shareTitle: this.category,
					shareContent: this.description,
					shareImg: this.cover,
					appId: config.appId, // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath: '/pages/circle/list/list?id='+ this.id + '&isshare=1',
					appWebUrl: config.h5link+'#pages/circle/list/list?id='+ this.id + '&isshare=1',
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
			
			clickShare:function(){
				console.log(1)
				let that = this;
				let link=''
				if(config.h5link!==''){
					link=config.h5link+'#/pages/circle/list/list?id='+ this.id + '&isshare=1';
				}else{
					link=this.link
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
			back: function() {

				if (this.isshare) {
					uni.reLaunch({
						url: '/pages/home/home'
					})
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}

			},
			membersDidClick: function() {
				uni.navigateTo({
					url: '../member/member?id=' + this.id
				})
			},
			getCircleByIDs: function(id) {
				API.getCircleByID(id).then(res => {
						this.count = res.count;
						this.category = res.name;
						if (res.color) {
							this.color = res.color;
						}
						this.isCircle = res.isCircle;
						//  args.subcates = res.subcate
						this.description = res.description;
						this.followers = res.followers;
						this.cover = res.cover;
						this.link=res.link;
						this.boardmaster = res.boardmaster;
						this.circleloading = false;
						uni.setNavigationBarTitle({
							title: res.name
						})
						let circlehistory = {}
						circlehistory.name = res.name
						circlehistory.id = res.id
						circlehistory.cover = res.cover
						// 调用 API 从本地缓存中获取阅读记录并记录
						let logs = uni.getStorageSync('circlehistory') || []
						let readsave = true
						// 过滤重复值
						if (logs.length > 0) {
							for (let i = 0; i < logs.length; i++) {
								if (logs[i].id == res.id) {
									logs.splice(i, 1);
								}
							}
						}
						if (readsave) {
							logs.unshift(circlehistory)
						}
						// 如果超过指定数量
						if (logs.length > 9) {
							logs.pop(); // 去除最后一个
						}
						uni.setStorageSync('circlehistory', logs)
					})
					.catch(err => {
						console.log(err)
					})
			},

			gotoPost: function(e) {
				uni.navigateTo({
					url: '/pages/creat/topic/topic?topic=' + this.category + '&topicid=' + this.id,
				})

			},
			
			getListAds: function() {
				
				API.listAdsense().then(res => {
						if (res.status == 200) {
							this.listAd = res.data
						}
			
					})
					.catch(err => {
						console.log(err)
					})
			},


			/**
			 * 关注圈子
			 */

			joinCircle: function() {
				var that = this;
				let args = [];
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				API.joinCircles(this.id).then(res => {
					if (res.status == 200) {
						this.isCircle = true;
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})
					} else {
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})

					}
				}).catch(err => {
					if (err.message == "授权信息有误") {
						uni.showModal({
							title: '温馨提示',
							content: '检测出授权已过期, 是否前往登陆?',
							success: function(res) {
								if (res.cancel) {
									that.$refs.uToast.show({
										title: '取消登录',
										type: 'info',
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

			/**
			 * 取消关注圈子
			 */

			quitCircle: function() {
				var that = this;
				let args = [];
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				API.quitCircles(this.id).then(res => {
					if (res.status == 200) {

						this.isCircle = false;
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})
					} else {
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})
					}
				}).catch(err => {
					if (err.message == "授权信息有误") {
						uni.showModal({
							title: '温馨提示',
							content: '检测出授权已过期, 是否前往登陆?',
							success: function(res) {
								if (res.cancel) {
									that.$refs.uToast.show({
										title: '取消登录',
										type: 'info',
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


			/** 切换菜单 */

			onHandleClick: function(index) {
				this.swithBarIndex = index;
				this.isLastPage = false;
				this.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.topicList=[];
				if (index == 0) {
					this.getTopicList({
						circle: this.id,
						page: this.page
					})
				} else {
					this.getStickyLists({
						circle: this.id,
						page: this.page
					})
				}
			},

			getMenmberList: function(id, data) {
				let that = this;
				API.getMemberlist(id, data).then(res => {
						this.memberList = res;
					})
					.catch(err => {
						console.log(err)
					})
			},
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			getTopicList: function(args) {
				API.getTopicList(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"

						}
						if (this.isWaterFull) {
							this.addList(res);
						}
						else{
							this.topicList = this.topicList.concat(res)
							this.page = this.page + 1
							this.topicload = false;
						}
					})
					.catch(err => {})
			},
			getStickyLists: function(args) {
				API.getStickyList(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"

						}
						this.addList(res);
					})
					.catch(err => {})
			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function(res) {
				return {
					title: this.category,
					path: '/pages/circle/list/list?id=' + this.id + '&isshare=1',
					imageUrl: this.cover,
					success: (res) => {
						console.log("转发成功", res);
					},
					fail: (res) => {
						console.log("转发失败", res);
					}
				}
			},
			onUserClick:function(id){
				uni.navigateTo({
					url:'/pages/user/user?id='+id
				})
			},
			onShareTimeline: function(res) {
				return {
					title: this.category,
					query: 'id=' + this.id,
					imageUrl: this.cover //图片地址
				}
			},
			addList(res) {
				// 获取到的数据，请注意数据结构
				console.log(res);

				if (!res || res.length < 1) {

					return;
				}

				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;

				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;

				let [left, right] = [
					[],
					[]
				];


				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}

				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						//console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						//console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++;
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if (this.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.page++;
				this.topicload = false;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.back-button {
		position: fixed;
		top: 80rpx;
		left: 40rpx;
		z-index: 10000;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.info-banner-wrapper {
		position: relative;
		width: 100%;

		.banner {
			position: fixed;
			width: 750rpx;
			height: 494rpx;
			z-index: -10;
		}

		.banner-cover {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .88));
		}

		.info-wrapper {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 20rpx;

			.base-wrapper {
				display: flex;
				-webkit-box-align: center;
				align-items: center;

				.avatar {
					margin-left: 32rpx;
					-webkit-box-flex: 0;
					flex: 0 0 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}

				.text-wrapper {
					margin: 0 32rpx 0 20rpx;
					-webkit-box-flex: 1;
					flex: 1;
					width: 0;

					.name {
						color: #fff;
						font-size: 34rpx;
						font-weight: 500;
						line-height: 50rpx;
					}

					.detail-wrapper {
						display: flex;
						-webkit-box-align: center;
						align-items: center;

						.introduction {
							width: 0;
							-webkit-box-flex: 1;
							flex: 1;
							color: #fff;
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							word-wrap: break-word;
							white-space: normal;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;

							.introduction-title {
								border: 2rpx solid #fff;
								border-radius: 4rpx;
								padding: 0rpx 6rpx;
								color: #fff;
								font-size: 22rpx;
								line-height: 26rpx;
								display: inline-block;
								margin-right: 20rpx;
							}

							.introduction-detail {
								margin-left: 4rpx;
								color: #fff;
								font-size: 26rpx;
								line-height: 36rpx;
							}
						}

						.arrow {
							margin-left: 4rpx;
							margin-bottom: 16rpx;
							-webkit-box-flex: 0;
							flex: 0 0 16rpx;
							height: 16rpx;
							align-self: flex-end;
						}

					}

				}
			}


			.other-wrapper {
				margin-top: 24rpx;
				margin-bottom: 34rpx;
				display: flex;
				-webkit-box-align: center;
				align-items: center;

				.count {
					margin-left: 32rpx;
					color: hsla(0, 0%, 100%, .8);
					font-size: 26rpx;
				}

				.controls {
					margin: 0 32rpx 0 auto;
					display: flex;
					-webkit-box-align: center;
					align-items: center;

					.join-button {
						background-color: #f8f8f8;
						width: 168rpx;
						height: 56rpx;
						line-height: 56rpx;
						border-radius: 30rpx;
						display: flex;
						-webkit-box-pack: center;
						justify-content: center;
						-webkit-box-align: center;
						align-items: center;

						.icon {
							width: 20rpx;
							height: 20rpx;
							margin-right: 8rpx;
						}

						.text {
							color: #434343;
							font-size: 28rpx;
							font-weight: 500;
						}

						.already {
							background-color: #9f9f9f;

							.text {
								color: #fff;
							}
						}


					}

					.share-button {
						margin: 0 0 0 24rpx;
						padding: 0;
						width: 84rpx;
						height: 52rpx;
						border: 2rpx solid hsla(0, 0%, 100%, .9);
						background-color: hsla(0, 0%, 100%, .25);
						border-radius: 30rpx;
						display: flex;
						-webkit-box-pack: center;
						justify-content: center;
						-webkit-box-align: center;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;
						}

						&::after {
							border: none;
						}
					}
				}

			}


		}
	}

	.member-info-wrapper {
		z-index: 100;
		background-color: #fff;
		position: absolute;
		left: 0;
		top: 494rpx;
		width: 100%;
		margin-top: -24rpx;
		border-radius: 24rpx 24rpx 0 0;

		.member-wrapper {
			.member-title {
				display: flex;
				margin: 28rpx 36rpx 0;
				color: #3e3e3f;
				font-size: 28rpx;
				font-weight: 500;

				.count {
					margin-left: auto;
					display: flex;
					-webkit-box-align: center;
					align-items: center;

					.text {
						color: #979797;
						font-size: 22rpx;
					}

					.icon {
						margin-left: 6rpx;
						width: 18rpx;
						height: 18rpx;
					}
				}
			}

			.member-list-wrapper {
				margin: 26rpx 12rpx 0;
				display: flex;
				-webkit-box-align: center;
				align-items: center;
				min-height: 134rpx;

				.quanzhu-icon {
					image {
						display: inline-block;
						width: 32rpx;
						height: 32rpx;
						margin-left: 16rpx;
						background: center no-repeat;
						background-size: contain;
						margin-left: 16rpx;
						vertical-align: middle;
						position: absolute;
						bottom: 40rpx;
						right: 10rpx;
						border: 1px solid white;
						border-radius: 50%;
					}
				}

				.member-item-wrapper {
					margin-left: calc((100vw - 660rpx - 24rpx) / 4);
					width: 132rpx;
					display: flex;
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					flex-direction: column;
					-webkit-box-pack: center;
					justify-content: center;
					-webkit-box-align: center;
					align-items: center;
					position: relative;

					&:first-child {
						margin-left: 0;
					}

					.avatar {
						width: 92rpx;
						height: 92rpx;
						border-radius: 50%;
					}

					.name {
						margin-top: 12rpx;
						color: #979797;
						font-size: 22rpx;
						line-height: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						text-align: center;
						max-width: 100%;
					}
				}

				.member-invite-wrapper {
					align-self: flex-start;
					width: 100rpx;
					height: 100rpx;
					background-color: #fbfbfb;
					border: 2rpx solid #eee;
					border-radius: 62rpx;
					display: flex;
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					flex-direction: column;
					-webkit-box-pack: center;
					justify-content: center;
					-webkit-box-align: center;
					align-items: center;


					&:after {
						border: none;
					}

					.text {
						color: #979797;
						font-size: 22rpx;
						line-height: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						text-align: center;
					}


				}
			}

		}
	}

	.dynamic-header {
		z-index: 100;
		width: 100%;
		background-color: #fff;
		display: flex;
		border-top: 16rpx solid #f7f8fa;
		padding: 230rpx 30rpx 30rpx;
		box-sizing: border-box;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-align: center;
		align-items: center;
		flex-direction: row;
		font-size: 36rpx;
		font-weight: 500;
		color: #000;
		line-height: 50rpx;

		.selOpitions {
			background: #eef0f0;
			border-radius: 32rpx;
			display: -ms-flexbox;
			display: flex;
			flex-direction: row;
			-ms-flex-pack: justify;
			justify-content: space-between;
			-ms-flex-align: center;
			align-items: center;
			font-size: 20rpx;
			font-weight: 400;
		}

		.selOpitions-item,
		.selOpitions-selected {
			min-width: 70rpx;
			padding: 0 15rpx;
			text-align: center;
		}

		.selOpitions-selected {
			margin: 4rpx;
			background: #fff;
			box-shadow: 0 1rpx 2rpx 0 rgba(0, 0, 0, .1);
			border-radius: 32rpx;
			color: #888;
		}
	}

	.toplicList {
		z-index: 100;
		background: #fff;

		.wfw {
			padding: 20rpx;

			.wf_left,
			.wf_right {
				display: inline-block;
				vertical-align: top;
				width: 50%;
			}
		}
	}

	/** 底部发布 */


	.sticky-btn {
		width: 80rpx;
		height: 80rpx;
		background: #6c8ff1;
		border-radius: 80rpx;
		position: fixed;
		right: 30rpx;
		bottom: 95rpx;
		margin-left: -105rpx;
		color: #fff;
		box-shadow: 0 0 20rpx rgba(125, 125, 125, 0.2);

		text {
			font-size: 50rpx;
			font-weight: bold;
			line-height: 80rpx;
			margin-bottom: 5rpx;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
