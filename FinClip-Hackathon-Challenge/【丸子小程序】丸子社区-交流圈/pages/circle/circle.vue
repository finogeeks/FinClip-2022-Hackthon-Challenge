<template>
	<view class="content">
		<u-navbar :is-back="false" title=" " :border-bottom="false">
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search @click="gotoSearch" height="56" :action-style="{color: '#fff'}" :show-action="false"
						:disabled="true">
					</u-search>
				</view>
			</view>

		</u-navbar>
		<view @tap="addNewCircle" class="set-content">
			<view class="add-club-btn">
				<view class="add-first-tips">
					<image src="https://www.hualigs.cn/image/615d59eb7bc59.jpg">
					</image>添加圈子
				</view>
				<view class="add-section-tips">
					快点创建专属于你的圈子
				</view>
			</view>
		</view>

		<view class="circle">
			<view class="tab-bar">
				<u-tabs item-width="100" :list="navbar" :is-scroll="false" :current="current" @change="change"
					:active-item-style="activeStyle" :bar-style="barStyle" inactive-color="#8f8f8f"></u-tabs>
			</view>
		</view>
		<view class="circle-list">
			<view class="containers" v-if="current===0">
				<view class="nav-left">
					<scroll-view scrollY class="nav-left-box" :scrollWithAnimation="true">
						<view @tap="switchRightTab(item.id,index)" class="nav-left-items"
							:class="curIndex==index?'active':''" v-for="(item,index) in circleList" :key="index">
							{{item.name}}
						</view>
						<view class="nav-left-items"></view>
						<view class="nav-left-items"></view>
						<view class="nav-left-items"></view>
					</scroll-view>
				</view>
				<view class="nav-right">
					<scroll-view scrollY class="right-items" @scrolltolower="loadmore">
						<view class="area-club" v-for="(item,index) in subcate" :key="index" v-if="subcate.length>0">
							<view>
								<image @tap="routeClubDetail(item.id)" class="image" mode="aspectFill"
									:src="item.cover"></image>
							</view>
							<view class="area-club-info" @tap="routeClubDetail(item.id)">
								<view class="area-club-name">{{item.name}}</view>
								<view class="area-club-creater">
									<text>简介：</text>{{item.description}}
								</view>
								<view class="area-club-creater" style="color:#A0A9B9">动态:
									<text style="margin-right:14rpx;color:#6F768C">{{item.count}}</text>
									成员:<text style="margin-right:14rpx;color:#6F768C">{{item.followers}}</text>
								</view>
							</view>
							<button @click="item.isCircle?quitCircle(item.id,index):joinCircle(item.id,index)"
								class="add-focus pos-a" :class="item.isCircle?'focused':''">
								<image class="add-icon" src="/static/images/plus.png" v-if="!item.isCircle"></image>
								{{item.isCircle?'已关注':'关注'}}
							</button>
						</view>
						<view class="area-club"></view>
					</scroll-view>
				</view>
			</view>
			<view class="follow-cicle" v-if="current===1">
				<empty-list v-if="myCircle.length==0&&isLastMyCirclePage" text="暂无关注的圈子"></empty-list>
				<view class="recommend-section">
					<view @tap="routeClubDetail(item.id)" class="item-list" v-for="(item,index) in myCircle"
						:key="index">
						<view>
							<image class="image" mode="aspectFill" :src="item.cover"></image>
						</view>
						<view class="club-name">{{item.name}}</view>
						<view class="club-er">
							{{item.count}}动态
						</view>
					</view>
				</view>
			</view>
		</view>

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
	let app = getApp();
	export default {
		data() {
			return {
				list: config.tabbar,
				circleList: [],
				subcate: [],
				current: 0,
				curIndex: 0,
				barStyle: {
					'background': '#6c8ff1',
				},
				raScale: 2,
				iconSize: "10",
				keyword: '',
				active: 'circle',
				animate: 'rubberBand',
				navbar: [{
						name: '圈子'
					},
					{
						name: '关注'
					}
				],
				barStyle: {
					'background': '#6c8ff1',
				},
				activeStyle: {
					'font-size': '36rpx',
					'color': '#434343',
					'font-weight': '700',
					'background-image': "url('https://s3.bmp.ovh/imgs/2021/09/6872cdb5f2c28f97.png')",
					'position': 'relative',
					'background-size': '34rpx',
					'background-position': '50%',
					'background-repeat': 'no-repeat',
				},
				show: false,
				myCirclepage: 1,
				myCircle: [],
				isLastMyCirclePage: false

			}
		},
		onLoad() {
			this.getCircleLists({
				parent: 0,
				per_page: 100,
			});
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
			this.active = 'circle';
			this.animate = 'rubberBand';
		},
		onReachBottom() {
			if (!this.isLastMyCirclePage && this.current == 1) {
				this.getCircleByMine({
					page: this.myCirclepage
				})
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

			gotoSearch: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},

			addNewCircle: function() {
				uni.navigateTo({
					url: './creat/creat'
				})
			},
			/**
			 * 
			 * 切换圈子子列表
			 */
			switchRightTab: function(id, index) {
				this.page = 1;
				this.subcate = [];
				this.curIndex = index;
				this.isLastPage = false;
				this.getSubCieclelist({
					parent: id
				})
			},
			closePub: function() {
				this.show = false;
				this.active = 'circle';
				this.animate = 'rubberBand';
			},
			close:function(){
				this.show = false;
			},
			routeClubDetail: function(id) {
				uni.navigateTo({
					url: '/pages/circle/list/list?id=' + id
				})
			},

			/**
			 * 关注圈子
			 */

			joinCircle: function(id, index) {
				var that = this;
				console.log(id, index);
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				API.joinCircles(id).then(res => {
					if (res.status == 200) {
						that.subcate[index].isCircle = true;
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})
					} else {
						that.$refs.uToast.show({
							title: res.message,
							type: 'error',
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

			quitCircle: function(id, index) {
				var that = this;
				let args = [];
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				API.quitCircles(id).then(res => {
					if (res.status == 200) {

						that.subcate[index].isCircle = false;
						that.$refs.uToast.show({
							title: res.message,
							type: 'success',
						})
					} else {
						that.$refs.uToast.show({
							title: res.message,
							type: 'error',
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

			change: function(e) {
				this.current = e;
				this.myCircle = [];
				this.myCirclepage = 1;
				this.isLastMyCirclePage = false;
				if (e == 1) {
					this.getCircleByMine();
				}
			},

			loadmore: function(e) {
				if (!this.isLastPage) {
					this.getSubCieclelist({
						parent: this.parent,
						page: this.page
					})
				}
			},

			getCircleLists: function(args) {
				API.getCircleList(args).then(res => {
						this.circleList = res;
						this.getSubCieclelist({
							parent: res[0].id
						})
					})
					.catch(err => {
						console.log(err)
					})
			},
			getSubCieclelist: function(args) {
				API.getCircleList(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"
						}
						this.page = this.page + 1;
						this.subcate = this.subcate.concat(res);
					})
					.catch(err => {})
			},
			getCircleByMine: function(args) {
				let that = this;
				API.getCircleByMines(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastMyCirclePage = true;
							this.status = "nomore"
						}
						this.myCirclepage = this.myCirclepage + 1;
						this.myCircle = this.myCircle.concat(res)

					})
					.catch(err => {
						if (err.message == '授权信息有误' || err.message == "Token 认证错误,未授权用户") {
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
			}
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	.tab-bar {
		z-index: 99;
		width: 50%;
		margin: 0 auto;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;

		.search-wrap {
			margin: 0rpx 30rpx;
			flex: 1;
		}

		.right-item {
			margin: 0 12rpx;
			position: relative;
			color: #ffffff;
			display: flex;
		}

	}

	.set-content {
		overflow: hidden;

		.add-club-btn {
			background: url('https://mall.guqule.com/wp-content/uploads/2020/08/1430865ccfff499dbb3e3a9f68307729.png') center center no-repeat;
			background-size: 100% 100%;
			height: 178rpx;
			width: 678rpx;
			margin: 0 auto;
			padding-top: 40rpx;
			box-sizing: border-box;
			margin-top: 20rpx;
			text-align: center;
		}

		.set-heigth {
			position: relative;
			width: 100%;
			flex: 1;
		}

		.add-first-tips {
			font-size: 32rpx;
			color: #fff;

			image {
				width: 28rpx;
				height: 28rpx;
				display: inline-block;
				vertical-align: middle;
				margin-top: -6rpx;
				margin-right: 8rpx;
			}
		}

		.add-section-tips {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.50);
			letter-spacing: 0;
		}

	}

	/* #ifndef MP-BAIDU */
	.circle-list {
		position: relative;
		width: 100%;
		flex: 1;
	}

	/* #endif */


	.circle-list .containers {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		color: #939393;
		display: flex;
	}


	.circle-list .nav-left {
		width: 18%;
		background: #f3f6fa;
		text-align: center;
		position: relative;
	}

	.circle-list .nav-left .nav-left-items {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.circle-list .nav-left .nav-left-items.active {
		background-color: #DFE4ED;
		color: #363A3E;
		font-weight: bold;
	}

	.circle-list .nav-right {
		flex: 1;
		box-sizing: border-box;
		background: #fff;
		padding-top: 0rpx;
		display: flex;
	}

	.nav-right .nav-right-items {
		float: left;
		width: 160rpx;
		height: 64rpx;
		text-align: center;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		color: #333;
		line-height: 64rpx;
		background-color: #f7f7f7;
	}

	.nav-right .nav-right-items image {
		width: 60px;
		height: 60px;
		margin-top: 15px;
	}

	.nav-right .nav-right-items text {
		display: block;
		margin-top: 15px;
		font-size: 14px;
		color: black;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}


	.nav-right .right-items {
		position: absolute;
		height: 100%;
	}

	.nav-right .right-items .item-lists:nth-child(3n-1) {
		margin: 0 24rpx 24rpx 24rpx;
	}

	.nav-right .right-items .item-lists:nth-child(3n-2) {
		margin: 0 0rpx 24rpx 24rpx;
	}

	.nav-right .right-items .item-lists:nth-child(3n) {
		margin: 0 0rpx 24rpx 0rpx;
	}


	.nav-right .right-items .loading {
		text-align: center;
	}

	.nav-right .right-items .loading image {
		width: 80rpx;
		height: 80rpx;
		margin: 80rpx 0rpx;
		margin-left: -18%;
	}


	.nav-right .right-items .area-club {
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.nav-right .right-items .area-club:last-child {
		margin-bottom: 200rpx !important;
	}

	.nav-right .right-items .area-club .image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		margin-left: 30rpx;
		margin-right: 16rpx;
	}

	.nav-right .right-items .area-club-name {
		font-size: 28rpx;
		color: #363A3E;
		width: 320rpx;
		white-space: nowrap;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-right .right-items .area-club-creater {
		font-size: 24rpx;
		color: #666;
		margin: 6rpx 0;
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-right .right-items .area-club-creater text {
		font-size: 24rpx;
		color: #A0A9B9;
	}


	button {
		margin: 0;
		padding: 0;
		line-height: normal;
		background-color: transparent;
	}

	button::after {
		content: none;
	}

	.nav-right .right-items .add-focus {
		width: 120rpx;
		height: 50rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		font-size: 24rpx;
		color: #363a3e;
		background: #f3f6fa;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right .right-items .focused {
		font-size: 24rpx;
		background-color: #f3f6fa;
		color: #a0a9b9;
	}

	.nav-right .right-items .pos-a {
		position: absolute;
		right: 154rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.nav-right .right-items .add-icon {
		width: 20rpx !important;
		height: 20rpx !important;
		display: inline-block;
		vertical-align: middle;
		margin-top: 0 !important;
		margin-right: 4rpx;
	}


	.follow-cicle {
		position: relative;
		padding-bottom: 200rpx;

		.recommend-section {
			flex-wrap: wrap;
			box-sizing: border-box;
			background-color: white;

			.club-name {
				font-family: PingFangSC-Regular;
				font-size: 26rpx;
				color: #333;
				text-align: center;
				width: 150rpx;
				height: 70rpx;
				margin: 0 auto;
				margin-top: 16rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 1.4;
			}

			.club-er {
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #999;
				text-align: center;
				margin-top: 10rpx;
				width: 214rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.item-list {
				width: 214rpx;
				height: 330rpx;
				background: #fff;
				box-sizing: border-box;
				margin-bottom: 32rpx;
				box-shadow: 0 1rpx 12rpx 0 rgba(0, 0, 0, 0.10);
				border-radius: 12rpx;
				display: inline-block;

				&:nth-child(3n-2) {
					margin-left: 32rpx;
				}

				&:nth-child(3n-1) {
					margin: 0 22rpx;
				}

				&:nth-child(1) {
					margin-top: 22rpx;
				}

				.image {
					width: 136rpx;
					height: 136rpx;
					border-radius: 50%;
					margin: 0 40rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
</style>


<style>
	page {
		background-color: white !important;
		height: 100% !important;
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>
