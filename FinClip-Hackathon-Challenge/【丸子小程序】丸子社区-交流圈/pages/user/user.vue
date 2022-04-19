<template>
	<view class="content">
		<view class="back-button" @tap="back">
			<image src="/static/images/back.png" mode="widthFix"></image>
		</view>
		<view class="user-info">
			<image class="bac-image" mode="aspectFill"
				:src="userInfo.background?userInfo.background:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3743065438,1005749236&fm=26&gp=0.jpg'">
			</image>
			<view class="top-view">
				<view class="user-info">
					<view class="user-name limit-text-widht">{{userInfo.nickName}}</view>
					<image class="gender-icon"
						:src="userInfo.gender==1?'/static/images/male.png':'/static/images/female.png'"></image>
					<view class="line"></view>
					<view class="location-view limit-text-widht">{{honour}}</view>
					<view class="head-view">
						<image bindtap="avatarTap" class="avatar-image" mode="aspectFill" :src="userInfo.avatarUrl">
						</image>
					</view>
				</view>
				<view class="prestige-view">
					<view @tap="onClickCllRelation" class="top-item-view">
						<view class="number-text">{{userInfo.following}}</view>
						<view class="item-text">关注</view>
					</view>
					<view @tap="onClickCllRelation" class="top-item-view">
						<view class="number-text">{{userInfo.fans}}</view>
						<view class="item-text">粉丝</view>
					</view>
					<view @tap="onClickCllRelation" class="top-item-view">
						<view class="number-text">{{userInfo.forums}}</view>
						<view class="item-text">帖子</view>
					</view>
					<view @tap="onClickCllblack" class="top-item-view">
						
						<view class="item-text">拉黑用户</view>
					</view>
				</view>
				<view class="introduce-view">
					<text class="introduce-text-spreads">个性签名：{{userInfo.description}}</text>
				</view>
				<view class="bottom-state-view">
					<button open-type="share" class="sharebutton"></button>
					<view class="small-btn btn-text" id="share">分享</view>
					<block v-if="!isFollow">
						<view @tap="actionFollow('follow')" class="big-btn-view big-btn-view-a btn-text">关注</view>
						<navigator :url="'/pages/message/detail/detail?userid='+userInfo.userId+'&type=1'"
							class="small-btn small-btn-a btn-text">私聊</navigator>
					</block>
					<block v-else>
						<navigator :url="'/pages/message/detail/detail?userid='+userInfo.userId+'&type=1'"
							class="big-btn-view big-btn-view-a btn-text">私聊</navigator>
						<view @tap="actionFollow('disfollow')" class="small-btn btn-text">取关</view>
					</block>
				</view>
			</view>
		</view>
		<view class="toplicList">
			<section-title title="最新动态"  padding="30" titleColor="#434343"
				imageUrl="https://imgs.bestwehotel.com/images/inn/1coj2mCDCH" introColor="#828282">
			</section-title>
			<view class="wfw" v-if="isWaterFull">
				<view class="wf_left">
					<helang-waterfall :unitid="indexAd.code" v-for="(item,index) in leftList" :key="index"
						:params="item" tag="left" :index="index" @height="onHeight"></helang-waterfall>
				</view>
				<view class="wf_right">
					<helang-waterfall :unitid="indexAd.code" v-for="(item,index) in rightList" :key="index"
						:params="item" @height="onHeight" tag="right" :index="index"></helang-waterfall>
				</view>
			</view>
			<view class="toplicLists" v-else>
				<view class="cell_view_bottom" v-for="(item,index) in topicList" :key="index">
					<topic-list :unitid="indexAd.code" :datas="item" :index="index" @followUserByid="followUser"></topic-list>
				</view>
			</view>
			<u-loadmore :margin-top="40" :margin-bottom="80" :status="status" />
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	import config from '@/api/config.js';
	var app = getApp();
	export default {
		data() {
			return {
				isWaterFull: config.isWaterFull,
				userInfo: [],
				topicList:[],
				page: 1,
				isFollow: false,
				id: '',
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				current: 1,
				honour:'',
				isLastPage: false,
				status: "loading",
				listAd:''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getUserinfoById({
				id: this.id
			});
			// #ifdef MP
			this.getListAds();
			// #endif
			this.getUserArticle({
				author: this.id,
				page: this.page,
				custom: 'anonymity'
			});
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getUserArticle({
					author: this.id,
					page: this.page,
					custom: 'anonymity'
				})
			}
		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1,
				})
			},
			actionFollow: function(status) {
				let data = {}
				let that = this;
				data.id = this.id
				data.action = status
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
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
										uni.showToast({
											title: '取消登陆',
											icon: 'success',
											duration: 900
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
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
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
			getUserArticle: function(args) {
				API.getUserForum(args).then(res => {
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
			},
			getUserinfoById: function(data) {
				API.getUserById(data).then(res => {
						console.log(res)
						// wx.setStorageSync('user', res)
						this.userInfo = res;
						this.honour=res.honour.title
						this.isFollow = res.status;
					})
					.catch(err => {
						console.log(err)
					})

			},
			onClickCllblack:function(){
				uni.showToast({
					title:'拉黑成功'
				})
			}


		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
	}


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

	.user-info {
		.bac-image {
			width: 100%;
			height: 540rpx;
			z-index: 0;
		}

		.top-view {
			position: absolute;
			z-index: 1000;
			display: flex;
			flex-direction: column;
			width: 690rpx;
			margin-left: 30rpx;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
			background-color: #fff;
			padding: 40rpx;
			margin-top: -180rpx;
			border-radius: 12rpx;


			.bottom-state-view {
				margin-top: 24rpx;
				display: flex;
				flex-direction: row;
				width: 610rpx;
				position: relative;

				.sharebutton {
					position: absolute;
					top: 0;
					left: 0;
					width: 120rpx;
					height: 50rpx;
					opacity: 0;
				}

				.sharebutton {
					position: absolute;
					top: 0;
					left: 0;
					width: 120rpx;
					height: 50rpx;
					opacity: 0;
				}

				.btn-text {
					color: #333;
					font-weight: bold;
					font-size: 26rpx;
					line-height: 56rpx;
				}

				.big-btn-view {
					text-align: center;
					width: 462rpx;
					margin-left: 18rpx;
					height: 56rpx;
					border-radius: 28rpx;
					background-color: #7289ff;
					color: #fff;
				}

				.big-btn-view-a {
					width: 314rpx;
					margin-right: 18rpx;
					margin-left: 18rpx;
					border-radius: 28rpx;
					text-align: center;
					height: 56rpx;
					background-color: #7289ff;
					color: #fff;
				}

				.big-btn-view-b {
					text-align: center;
					width: 310rpx;
					margin-right: 18rpx;
					height: 52rpx;
					border: 2rpx solid #7289ff;
					color: #7289ff;
					background-color: #fff;
					margin-left: 18rpx;
					border-radius: 28rpx;
				}

				.small-btn-a {
					background-color: #7289ff !important;
					color: #fff;
				}

				.small-btn {
					width: 130rpx;
					height: 56rpx;
					border-radius: 28rpx;
					text-align: center;
					background-color: #efefef;
				}
			}

			.prestige-view {
				margin-top: 25rpx;
				display: flex;

				.top-item-view {
					display: flex;
					align-items: flex-end;
					margin-right: 48rpx;

					.number-text {
						font-size: 32rpx;
						line-height: 1;
						color: #333;
						font-weight: bold;
					}

					.item-text {
						margin-left: 20rpx;
						font-size: 20rpx;
						color: #8c8c8c;
						font-weight: 400;
					}
				}
			}

			.introduce-view {
				margin-top: 24rpx;
				display: flex;
				align-items: flex-end;

				.introduce-text-spreads {
					width: 566rpx;
					font-size: 24rpx;
					line-height: 36rpx;
					color: #8c8c8c;
					font-weight: 400;
				}
			}

			.user-info {
				display: flex;
				align-items: flex-end;

				.user-name {
					font-size: 42rpx;
					line-height: 52rpx;
					color: #333;
					font-weight: bold;
					max-width: 300rpx;
				}

				.gender-icon {
					margin-bottom: 10rpx;
					height: 24rpx;
					width: 24rpx;
					margin-left: 20rpx;
				}

				.line {
					margin-bottom: 10rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;
					width: 2rpx;
					height: 24rpx;
					background-color: #efefef;
				}

				.location-view {
					margin-bottom: 10rpx;
					font-size: 24rpx;
					width: 140rpx;
					font-weight: 400;
					color: #333;
				}

				.head-view {
					display: flex;
					position: absolute;
					margin-left: 470rpx;
					margin-bottom: 8rpx;
				}

				.auth-icon {
					margin-top: 105rpx;
					margin-left: 105rpx;
					width: 38rpx;
					height: 38rpx;
					position: absolute;
				}

				.avatar-image {
					width: 140rpx;
					height: 140rpx;
					overflow: hidden;
					border-radius: 100%;
					border: 10rpx solid #fff;
				}

				.limit-text-widht {
					display: -webkit-box;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}
		}
	}

	.text {
		padding: 0 30rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.toplicList {
		padding-top: 180rpx;

		.wfw {
			margin: 20rpx;

			.wf_left,
			.wf_right {
				display: inline-block;
				vertical-align: top;
				width: 50%;
			}
		}
	}
</style>
