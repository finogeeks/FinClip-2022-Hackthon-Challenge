<template>
	<view class="container">
		<!-- 搜索栏-->
		<view class="nav-box">
			<view class="search-box">
				<image class="icon" src="@/static/images/search-line.png"></image>
				<input @confirm="onSearchConfirm" @input="onSearchInput" class="input" confirmType="search"
					name="keyword" placeholder="输入名称搜索圈子" type="text" :value="keyword"></input>
			</view>
			<view @tap="onSearchConfirm" class="add-box">搜索</view>
		</view>
		<!-- 搜索栏-->
		<!-- 圈子列表-->
		<view class="set-heigth">
			<view class="containers" v-if="keyword==''">
				<view class="nav-left">
					<scroll-view scrollY class="nav-left-box" :scrollWithAnimation="true">
						<view @tap="switchRightTab(item.id,index)" class="nav-left-items"
							:class="curIndex==index?'active':''" v-for="(item,index) in circleList" :key="index">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="nav-right">
					<scroll-view scrollY class="right-items" @scrolltolower="loadmore">
						<view class="area-club" data-id="item.id" v-for="(cat,index) in subcats" :key="index" v-if="cat.id!==adminCircle||user.role=='administrator'">

							<view>
								<image class="image" mode="aspectFill" :src="cat.cover"></image>
							</view>
							<view class="area-club-info">
								<view class="area-club-name">
									{{cat.name}}
								</view>
								<view class="area-club-creater" style="color:#333">
									<text>{{cat.count}}条动态</text>
									<view class="shu"></view>
									<text>{{cat.followers}}人讨论</text>
								</view>
								<view class="description">简介：{{cat.description}}</view>
							</view>
							<view @tap="onItemClick(cat.name,cat.id)" class="choice-box" :data-id="cat.id"
								:data-name="cat.name">
								选择
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- 圈子列表-->
			<!-- 搜索列表-->
			<view v-else>
				<view class="nav-right">
					<scroll-view scrollY class="right-items">
						<view @tap="routeClubDetail" class="area-club" data-id="item.id" v-for="(item,index) in subcats"
							:key="index">
							<view>
								<image class="image" mode="aspectFill" :src="item.cover"></image>
							</view>
							<view class="area-club-info" style="width:450rpx">
								<view class="area-club-name">
									{{item.name}}
								</view>
								<view class="area-club-creater" style="color:#333">
									<text>{{item.count}}条动态</text>
									<view class="shu"></view>
									<text>{{item.follows}}人讨论</text>
								</view>
								<view class="description">简介：{{item.description}}</view>
							</view>
							<view @tap="onItemClick(item.name,item.id)" class="choice-box">
								选择
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				cats: [],
				circleList: [],
				keyword: '',
				subcats: [],
				curIndex: 0,
				page: 1,
				adminCircle:43,
				user:'',
			}
		},
		onLoad() {
			this.getCircleLists({
				parent: 0,
				per_page: 100,
			});
		},
		onShow() {
			this.getUserMineInfo()
		},
		methods: {
			getCircleLists: function(args) {
				API.getCircleList(args).then(res => {
						this.circleList = res;
						this.parent = res[0].id;
						this.getSubCieclelist({
							parent: res[0].id
						})
					})
					.catch(err => {
						console.log(err)
					})
			},
			getUserMineInfo: function() {
				let that = this;
				API.checkUser().then(res => {
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
										uni.navigateTo({
											url:'/pages/login/login'
										})
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
			getSubCieclelist: function(args) {
				API.getCircleList(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"
						}
						this.page = this.page + 1
						this.subcats = this.subcats.concat(res)
					})
					.catch(err => {})
			},
			/** 切换菜单  */
			switchRightTab: function(id, index) {
				this.parent = id;
				this.curIndex = index;
				this.page = 1;
				this.subcats = [];
				this.isLastPage = false;
				this.getSubCieclelist({
					parent: id
				})
			},
			/**
			 * 选择分类
			 */

			onItemClick: function(name, id) {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.topic = name;
				prevPage.$vm.topicid = id;
				uni.navigateBack({
					delta: 1
				})

			},
			loadmore: function(e) {
				if (!this.isLastPage) {
					this.getSubCieclelist({
						parent: this.parent,
						page: this.page,
					})
				}
			},
			/** 触发搜索 */
			onSearchConfirm: function(e) {
				this.subcats = [];
				this.getSubCieclelist({
					search: this.keyword,
					per_page: 100,
				})
			},

			/** 监听输入 */
			onSearchInput: function(e) {
				this.keyword = e.detail.value;
			},
		},
	}
</script>

<style>
	page {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}


	.containers {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		color: #949494;
		display: flex;
	}

	/** 搜索栏  **/


	.nav-box {
		width: 100%;
		height: 90rpx;
		justify-content: center;
		line-height: 90rpx;
		position: relative;
	}

	.nav-box,
	.search-box {
		display: flex;
		align-items: center;
	}

	.nav-box .search-box {
		width: 560rpx;
		height: 60rpx;
		background: #f5f5f5;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
	}

	.nav-box .search-box .icon {
		width: 38rpx;
		height: 38rpx;
		margin: 0 15rpx 0 20rpx;
	}

	.nav-box .search-box .input {
		width: 448rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}

	.nav-box .placeholder {
		margin-top: 4rpx;
		font-size: 24rpx;
		color: #949494;
	}


	.nav-box .add-box {
		margin-left: 20rpx;
		width: 110rpx;
		height: 60rpx;
		color: #434343;
		background: #f9f9f9;
		border-radius: 10rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/** 搜索栏  **/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}


	/** 圈子列表 **/

	/* #ifndef MP-BAIDU */
	.set-heigth {
		position: relative;
		width: 100%;
		flex: 1;
	}

	/* #endif */


	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	.nav-left {
		width: 160rpx;
		text-align: center;
		background: #f3f6fa;
		position: relative;
		border-right: 1px solid #f5f5f5;
	}

	.nav-left .nav-left-items {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 24rpx;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.nav-left-items:last-child {
		margin-bottom: 20rpx !important;
	}

	.nav-left .nav-left-items.active {
		color: #333;
		background-color: #DFE4ED;
		font-weight: 700;
		position: relative;
	}

	.nav-left .nav-left-items.active:after {
		content: "";
		display: block;
		width: 6rpx;
		height: 20rpx;
		background: #333;
		border-radius: 6rpx;
		position: absolute;
		left: 8rpx;
		top: 50%;
		transform: translateY(-50%);
		transition: all .4s ease;
	}

	.nav-right {
		flex: 1;
		box-sizing: border-box;
		background: #fff;
		padding-top: 0rpx;
		display: flex;
	}

	.nav-right .right-items {
		position: absolute;
		height: 100%;
	}

	.nav-right .right-items .item-lists:nth-child(3n-1) {
		margin: 0 24rpx 24rpx;
	}

	.nav-right .right-items .item-lists:nth-child(3n-2) {
		margin: 0 0rpx 24rpx 24rpx;
	}

	.nav-right .right-items .item-lists:nth-child(3n) {
		margin: 0 0rpx 24rpx;
	}

	.nav_left_box {
		position: absolute;
		height: 100%;
	}

	.nav-right .right-items .area-club {
		width: 100%;
		height: 160rpx;
		display: flex;
		margin-top: 40rpx;
		position: relative;
	}

	.nav-right .right-items .area-club:last-child {
		margin-bottom: 50rpx !important;
	}

	.nav-right .right-items .area-club .image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		margin-left: 30rpx;
		margin-right: 16rpx;
	}


	.nav-right .right-items .area-club-info {
		height: 160rpx;
	}

	.nav-right .right-items .area-club-name {
		font-size: 28rpx;
		color: #333;
		width: 300rpx;
		white-space: nowrap;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		align-items: center;
	}

	.nav-right .right-items .area-club-name image {
		width: 38rpx;
		height: 38rpx;
		margin-right: 8rpx;
	}

	.nav-right .right-items .area-club-creater {
		height: 50rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #333;
	}

	.nav-right .right-items .shu {
		width: 3rpx;
		height: 18rpx;
		background: #333;
		margin: 0 10rpx;
	}

	.nav-right .right-items .description {
		font-size: 24rpx;
		color: #949494;
		margin: 6rpx 0;
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	.loading {
		text-align: center;
	}

	.loading image {
		width: 80rpx;
		height: 80rpx;
		margin: 80rpx 0rpx 80rpx -18%;
	}

	.empty-view {
		margin-left: -200rpx;
	}

	.choice-box {
		margin-left: 20rpx;
		margin-top: 30rpx;
		width: 100rpx;
		height: 60rpx;
		color: #434343;
		background: #f9f9f9;
		border-radius: 60rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
