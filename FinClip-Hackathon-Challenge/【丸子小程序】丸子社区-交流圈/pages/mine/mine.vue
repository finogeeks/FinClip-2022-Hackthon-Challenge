<template>
	<view class="content">
		<view class="top-header">
			<view class="user-background" :style="userBannerStyle">
				<image class="banner" mode="aspectFill" :src="user.background" style="height: 496rpx"></image>
				<view class="gradient"></view>
			</view>
		</view>
		<view class="own-header">
			<view class="header-top" v-if="user">
				<navigator class="own-header-img-div" url="/page/personalCenter/personalCenter">
					<image mode="aspectFill" class="own-header-img" lazyLoad="true" :src="user&&user.avatarUrl">
					</image>
				</navigator>
				<view class="header-middle">
					<view class="own-header-r-t text-overflow">{{''+(user&&user.nickName||'正在加载')+''}}</view>
					<view class="header-label">
						<image mode="aspectFill" class="data-v-53537ef4" :src="honour.icon"></image>
						{{''+honour.title?honour.title:'初始会员'+''}}
					</view>
				</view>
				<navigator class="header-right" url="/pages/mine/editme/editme">个人资料<text class="iconfont"></text>
				</navigator>
			</view>
			<navigator class="header-top" url="/page/login/login" v-else>
				<image mode="aspectFill" class="own-header-img-div" lazyLoad="true"
					src="/image/avatar_icon_default_show.png">
				</image>
				<view class="header-middle2">注册/登录</view>
			</navigator>
			<view class="header-bottom">
				<navigator class="header-bottom-li" :url="'/pages/mine/mypost/mypost?id='+user.userId">
					<view class="own-header-num">{{account.forums||0}}</view>
					<view class="own-header-text">动态</view>
				</navigator>
				<navigator class="header-bottom-li" :url="'/pages/mine/myfans/myfans?id='+user.userId">
					<view class="own-header-num">{{social.fans||0}}</view>
					<view class="own-header-text">粉丝</view>
				</navigator>
				<navigator class="header-bottom-li" :url="'/pages/mine/myfollow/myfollow?id='+user.userId">
					<view class="own-header-num">{{social.following||0}}</view>
					<view class="own-header-text">关注</view>
				</navigator>
				<navigator class="header-bottom-li" url="/pages/integral/integral">
					<view class="own-header-num">{{credit.credits||0}}</view>
					<view class="own-header-text">积分</view>
				</navigator>
			</view>
		</view>

		<view class="jifen">
			<view class="tab border-box" hover-class="hover-class" hover-stay-time="50" @tap="gotoMyCircle(board_id)">
				<view class="icon">
					<image src="/static/images/menu1.png"></image>
				</view>
				<view class="title">我的圈子</view>
				<view class="cont">我创建的圈子</view>
			</view>
			<view class="tab border-box" hover-class="hover-class" hover-stay-time="50" @click="sign">
				<view class="icon">
					<image src="/static/images/menu4.png"></image>
				</view>
				<view class="title">每日签到</view>
				<view class="cont">签到获取积分</view>
			</view>
			<view class="tab border-box" hover-class="hover-class" hover-stay-time="50" @click="linkAnalysis">
				<view class="icon">
					<image src="/static/images/menu7.png"></image>
				</view>
				<view class="title">快速发布</view>
				<view class="cont">更快捷的发布</view>
			</view>
		</view>

		<view class="menu">
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="gotoExchan">
				<view class="u-row-left">
					<image src="/static/images/icon1.png"></image>
					<view class="name">我的订单</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="likeClick">
				<view class="u-row-left">
					<image src="/static/images/icon2.png"></image>
					<view class="name">我的点赞</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="favClick">
				<view class="u-row-left">
					<image src="/static/images/icon3.png"></image>
					<view class="name">我的收藏</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>

		</view>

		<view class="menu" v-if="user.role=='administrator'">
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="gotoAudtiCircle">
				<view class="u-row-left">
					<image src="/static/images/icon4.png"></image>
					<view class="name">审核圈子</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="gotoAudtiPosts">
				<view class="u-row-left">
					<image src="/static/images/icon5.png"></image>
					<view class="name">审核内容</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>


		</view>


		<view class="menu">
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="gotoAbout">
				<view class="u-row-left">
					<image src="/static/images/icon6.png"></image>
					<view class="name">关于我们</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="gotoPrivacy">
				<view class="u-row-left">
					<image src="/static/images/icon7.png"></image>
					<view class="name">隐私协议</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50">
				<!-- #ifdef MP -->
				<button class="contact" type="default" open-type="contact"></button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS ||H5 -->
				<button class="contact" @tap="showContact"></button>
				<!-- #endif -->
				<view class="u-row-left">
					<image src="/static/images/icon8.png"></image>
					<view class="name">联系客服</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="changeAcount">
				<view class="u-row-left">
					<image src="/static/images/icon9.png"></image>
					<view class="name">切换账号</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex-item" hover-class="hover-class1" hover-stay-time="50" @click="bindLogout">
				<view class="u-row-left">
					<image src="/static/images/icon10.png"></image>
					<view class="name">退出账号</view>
				</view>
				<view class="u-row-right">
					<view class="u-light-color"></view>
					<view class="arror-right"></view>
				</view>
			</view>


		</view>

		<u-popup v-model="showcontact" mode="center" :mask="true" :closeable="true" border-radius="20">
			<view class="kefu-justify-center">
				<view class="title">
					关注我们
				</view>
				<view class="image">
					<image src="http://uploadfile.yunnangateway.com/s2/c19/2020/0225/20200225112817823.png"
						mode="widthFix"></image>
				</view>
				<view class="save" @tap="save">
					保存图片
				</view>
			</view>
		</u-popup>


		<creat :showPubModal="show" @closePub="closePub" @close="close" v-if="show"></creat>
		<!--底部菜单 -->
		<lb-tabbar v-model="active" :raisede-scale="raScale" :animate="animate" active-color="#434343"
			@change="handleChange" :safe-area-inset-bottom="true">
			<lb-tabbar-item v-for="item in list" :key="item.name" :name="item.name"
				:icon="active === item.name ? item.selectedIconPath : item.iconPath" :dot="item.dot" :info="item.info"
				:raisede="item.raisede" icon-prefix="iconfont">
				{{ item.text }}
			</lb-tabbar-item>
		</lb-tabbar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				list: config.tabbar,
				barStyle: {
					'background': '#6c8ff1',
				},
				raScale: 2,
				iconSize: "10",
				keyword: '',
				active: 'mine',
				animate: 'rubberBand',
				userBannerStyle: "",
				user: [],
				account: [],
				social: [],
				credit: [],
				subscribe: [],
				honour: [],
				board_id:'',
				privacyid: 245, //隐私政策页面id
				about: 243, //关于我们页面id
				vesion: 848, //版本说明页面id
				showcontact: false,
				show:false,
				isAdmin:false,
			}
		},
		onShow: function() {
			this.active = 'mine';
			this.animate = 'rubberBand';
			let user = app.globalData.user
			if (!user) {
				user = '';
				uni.navigateTo({
					url: '/pages/login/login',
				})
			} else {
				this.getUserMineInfo()
			}
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
		methods: {
			handleChange: function(e) {
				console.log(e);
				if (e.name == 'creat') {
					this.show = true;
				} else {
					uni.switchTab({
						url: '/pages/' + e.name + '/' + e.name
					})
				}

			},
			gotoAudtiCircle:function(){
				uni.navigateTo({
					url:'/pages/circle/auditcircle/auditcircle'
				})
			},
			gotoAudtiPosts:function(){
				uni.navigateTo({
					url:'/pages/auditPost/auditPost'
				})
			},
			  loginOut: function () {
			    uni.removeStorageSync('user')
			    uni.removeStorageSync('token')
			    uni.removeStorageSync('expired_in')
			  },
			closePub: function() {
				this.show = false;
				this.active = 'mine';
				this.animate = 'rubberBand';
			},
			close:function(){
				this.show = false;
			},
			likeClick: function() {
				uni.navigateTo({
					url: 'mylike/mylike'
				})
			},
			favClick: function() {
				uni.navigateTo({
					url: 'myfav/myfav'
				})
			},
			
			gotoPrivacy: function() {
				uni.navigateTo({
					url: '../page/page?id=' + this.privacyid
				})
			},
			gotoMyCircle:function(id){
				uni.navigateTo({
					url: './mycircle/mycircle?id=' + id
				})
			},
			
			gotoExchan:function(){
				uni.navigateTo({
					url:'/pages/integral/exchanges/exchanges'
				})
			},

			gotoAbout: function() {
				uni.navigateTo({
					url: '../page/page?id=' + this.about
				})
			},
			
			sign: function() {
				let that=this;
				API.updateCredit({
						action: "sign"
					}).then(res => {
						this.getUserMineInfo()
						that.$refs.uToast.show({
							title:res.message,
							type: 'success',
						})
						if (res.status == 201) {
							uni.navigateTo({
								url: '/pages/credits/rank'
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			save: function() {
				uni.downloadFile({
					url: 'http://uploadfile.yunnangateway.com/s2/c19/2020/0225/20200225112817823.png',
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePaths,
								success: function() {
									that.$refs.uToast.show({
										title:'保存成功',
										type: 'success',
									})
								}
							});
						}
					}
				});
			},
			linkAnalysis:function(){
				uni.navigateTo({
					url:'../linkanalysis/linkanalysis'
				})
			},

			getUserMineInfo: function() {
				let that = this;
				API.checkUser().then(res => {
					console.log(res);
						if (res.status == 200) {
							API.getMineInfo().then(res => {
									console.log(res);
									that.user = res.user;
										
									if(res.user.role=='administrator'){
										that.isAdmin=true;
									}
									that.account = res.account;
									that.social = res.social;
									that.credit = res.credit;
									that.subscribe = res.subscribe;
									that.honour = res.honour;
									that.board_id=res.board_id;
								})
								.catch(err => {
									console.log(err)
								})
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否注销授权?',
								success: function(res) {
									if (res.cancel) {
										that.$refs.uToast.show({
											title:'取消注销',
											type: 'error',
										})
									} else {
										that.bindLogout()
									}
								},
								fail: function(err) {
									console.log(err)
								}
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			changeAcount:function(){
				uni.navigateTo({
					url:'change/change?isAdmin='+this.isAdmin
				})
			},

			showContact: function() {
				// #ifdef APP-PLUS || H5
				this.showcontact = true;
				// #endif

			},

			gotoMyposts: function(id) {
				uni.navigateTo({
					url: 'mypost/mypost?id=' + id,
				})
			},
			bindLogout: function() {
				let that=this;
				API.Loginout()
				that.$refs.uToast.show({
					title:'正在注销',
					type: 'info',
				})
				this.user = ""
				uni.removeStorageSync('videoAdLogs')
				uni.reLaunch({
					url: "/pages/login/login"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-header {
		padding: 100rpx;
	}

	.user-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		.banner {
			width: 100%;
		}

		.gradient {
			position: absolute;
			height: 126rpx;
			width: 100%;
			left: 0;
			bottom: 0;
			background-image: linear-gradient(to bottom, transparent, #fff);
		}
	}

	.own-header {
		position: relative;
		display: flex;
		justify-content: center;
		flex-flow: column nowrap;
		margin: 130rpx 20rpx 20rpx;
		border-radius: 16rpx;
		background-color: #fff;
		box-shadow: 0px 2rpx 24rpx 0px rgba(149, 149, 149, 0.2);

		.header-top {
			height: 186rpx;
			padding: 0 32rpx 0 54rpx;
			display: flex;

			.own-header-img-div,
			.own-header-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
			}

			.own-header-img-div {
				margin-top: 20rpx;
			}

			.header-middle {
				-webkit-box-flex: 1;
				flex: 1;
				padding-left: 28rpx;

				.own-header-r-t {
					color: #434343;
					font-size: 34rpx;
					line-height: 48rpx;
					margin-top: 30rpx;
					width: 340rpx;
					height: 50rpx;
					overflow: hidden;
				}

				.header-label {
					width: 156rpx;
					height: 42rpx;
					display: flex;
					background-color: #fff6d4;
					border-radius: 21rpx;
					text-align: center;
					color: #4a4a4a;
					font-size: 22rpx;
					margin-top: 10rpx;
					margin-left: 10rpx;
					line-height: 42rpx;

					image {
						width: 27rpx;
						height: 27rpx;
						margin: 7rpx 8rpx 0 16rpx;
					}
				}
			}

			.header-middle2 {
				-webkit-box-flex: 1;
				flex: 1;
				padding-left: 28rpx;
				line-height: 166rpx;
				color: #fff;
				font-size: 34rpx;
				font-weight: 700;
			}

			.header-right {
				margin-top: 20rpx;
				width: 172rpx;
				height: 54rpx;
				border-radius: 27rpx;
				background-color: #fff6d5;
				text-align: center;
				line-height: 54rpx;
				text-align: center;
				color: #000;
				font-size: 24rpx;
				margin-top: 50rpx;
			}
		}


		.header-bottom {
			height: 120rpx;
			display: flex;

			.header-bottom-li {
				-webkit-box-flex: 1;
				flex: 1;
				text-align: center;
				height: 120rpx;
			}

			.own-header-num {
				color: #434343;
				font-size: 36rpx;
				font-weight: 700;
				line-height: 50rpx;
			}

			.own-header-text {
				color: #434343;
				font-size: 24rpx;
			}
		}
	}

	.jifen {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 10rpx;

		.tab {
			position: relative;
			background-color: #FFFFFF;
			width: 260rpx;
			margin-right: 10rpx;
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			padding: 40rpx 0rpx;
			justify-content: center;
			align-items: center;

			.title {
				font-weight: 550;
				padding-top: 10rpx;
			}

			.icon {
				width: 40px;
				height: 40px;
				border-radius: 40px;

				image {
					width: 40px;
					height: 40px;
					border-radius: 40px;
				}
			}

			.cont {
				padding-top: 14rpx;
				font-size: 24rpx;
				color: #c0c4cc;
			}
		}

		.border-box {
			box-shadow: 0 0px 20px rgba(231, 231, 231, 0.6);
			border-radius: 8px;
		}
	}

	.menu {
		margin: 20rpx;
		box-shadow: 0 0px 20px rgba(231, 231, 231, 0.6);
		border-radius: 8px;

		.u-flex-item {
			padding: 30rpx !important;
			justify-content: space-between;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;

			.contact {
				position: absolute;
				width: 100%;
				height: 120rpx;
				top: 0;
				left: 0;
				opacity: 0;
			}

			.u-row-left {
				image {
					width: 45rpx;
					height: 45rpx;
					padding-right: 20rpx;
				}

				.name {
					font-size: 28rpx;
				}

				display: flex;
				flex-direction: row;
				align-items: center;

				justify-content: flex-start;
			}

			.u-row-right {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;

				.arror-right {
					width: 7px;
					height: 7px;
					border-top: 1px solid #a9acb3;
					border-right: 1px solid #a9acb3;
					-webkit-transform: rotate(45deg);
					transform: rotate(45deg);
				}
			}
		}
	}

	.kefu-justify-center {
		flex-grow: 1;
		flex-direction: column;
		display: flex;
		width: 500rpx;
		height: 700rpx;
		text-align: center;

		.title {
			padding: 20rpx 30rpx;
			font-size: 30rpx;
		}

		.image {
			width: 400rpx;
			margin: 0 auto;

			image {
				width: 400rpx;
			}
		}

		.save {
			width: 200rpx;
			margin: 20rpx auto;
			padding: 20rpx 30rpx;
			border: 1px solid #00aa7f;
			background: #00aa7f;
			border-radius: 5px;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>
