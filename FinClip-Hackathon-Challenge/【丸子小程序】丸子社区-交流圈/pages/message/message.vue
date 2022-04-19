<template>
	<view class="content">
		<u-navbar :is-back="false" title=" " :border-bottom="false">
			<view class="slot-wrap">
				<view class="menu-container">
					<view @tap="onMenuItem(index)" class="menu-item" v-for="(menu,index) in menus" :key="index">
						<image class="menu-icon" :src="menu.icon"></image>
						<text class="menu-title">{{menu.text}}</text>
						<u-badge bgColor="#f00" :offset="offset" type="green" :count="menu.num" class="badge">
						</u-badge>
					</view>

				</view>
			</view>

		</u-navbar>
		<dcp-scroller :isLoading="isLoading" @refresh="change">
			<view class="message">
				<section-title title="私信列表" padding="30" titleColor="#434343"
					imageUrl="https://imgs.bestwehotel.com/images/inn/1coj2mCDCH" introColor="#828282"
					@clickRight="back">
				</section-title>
				<message-list :messageList="messageList"></message-list>
			</view>
			<empty-list v-if="messageList.length==0"></empty-list>
		</dcp-scroller>
		<u-loadmore :margin-bottom="40" :status="status" />
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
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				offset: [-2, -2],
				menus: [{
					icon: "/static/images/msfavs.png",
					text: "收藏",
					num: 0,
					url: "/pages/message/fav/fav"
				}, {
					icon: "/static/images/msnoti.png",
					text: "评论",
					num: 0,
					url: "/pages/message/comment/comment"
				}, {
					icon: "/static/images/mslike.png",
					text: "点赞",
					num: 0,
					url: "/pages/message/like/like"
				}, {
					icon: "/static/images/msmess.png",
					text: "通知",
					num: 0,
					url: "/pages/message/notice/notice"
				}],
				list: config.tabbar,
				barStyle: {
					'background': '#6c8ff1',
				},
				raScale: 2,
				iconSize: "10",
				isLoading: false,
				keyword: '',
				active: 'message',
				animate: 'rubberBand',
				messageList: [],
				page: 1,
				status: "loading",
				show: false,
			}
		},
		onShow() {
			this.active = 'message';
			this.animate = 'rubberBand';
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
			this.getMessages({
				type: 'private',
				page: this.page,
			});
			this.getMessageNum();
		},
		methods: {
			change: function() {
				this.messageList = [];
				this.page = 1;
				this.status = "loading";
				this.getMessages({
					type: 'private',
					page: this.page,
				});
				this.getMessageNum();
			},
			getMessages: function(args) {
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return
				}
				API.getMessage(args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.messageList = this.messageList.concat(res)
					this.page = this.page + 1
				}).catch(err => {
					console.log(err);
					if (err.message == "授权登录信息错误, 无法获取用户信息") {
						uni.navigateTo({
							url: '/pages/login/login?canBack=true',
						})
					}
				})
			},
			getMessageNum: function() {
				let openid = uni.getStorageSync('_USER_OPENID');
				if (openid) {
					let args = {
						'openid': openid
					}
					API.getMessageNum(args).then(res => {
						console.log(res);
						this.menus[0].num = res.favs;
						this.menus[1].num = res.comments;
						this.menus[2].num = res.likes;
						this.menus[3].num = res.system;
					});
				}

			},

			handleChange: function(e) {
				console.log('/pages/' + e.name + '/' + e.name);
				if (e.name == 'creat') {
					this.show = true;
				} else {
					uni.switchTab({
						url: '/pages/' + e.name + '/' + e.name
					})
				}

			},
			closePub: function() {
				this.show = false;
				this.active = 'message';
				this.animate = 'rubberBand';
			},
			close:function(){
				this.show = false;
			},
			onMenuItem: function(e) {
				switch (e) {
					case 0:
						uni.navigateTo({
							url: 'personmsg/personmsg?type=fav'
						});
						break;
					case 1:
						uni.navigateTo({
							url: 'personmsg/personmsg?type=comment'
						});
						break;
					case 2:
						uni.navigateTo({
							url: 'personmsg/personmsg?type=like'
						});
						break;
					case 3:
						uni.navigateTo({
							url: 'notice/notice'
						})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 50rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		position: fixed;
		z-index: 100;

		.menu-item {
			position: relative;
			width: 88rpx;
			height: 146rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}

		.menu-icon {
			width: 66rpx;
			height: 66rpx;
			border-radius: 15rpx;
		}

		.menu-title {
			line-height: 40rpx;
			font-size: 28rpx;
			color: #999999;
			margin-top: 16rpx;
		}

		.menu-num {
			position: absolute;
			right: 10rpx;
			top: 20rpx;
			text-align: center;
		}
	}

	.message {
		margin-top: 160rpx;

	}
</style>
