<template>
	<view class="content">
		<z-paging ref="paging" @onRefresh="change()" :refresher-only='true' :use-page-scroll="userpage"
			:refresher-enabled="current==3?false:true">
			<custom-refresher slot="refresher" slot-scope="{refresherStatus}" :status="refresherStatus">
			</custom-refresher>
			<view slot="top">
				<u-navbar :is-back="false" title=" " :border-bottom="false">
					<view class="slot-wrap">
						<view class="logo">
							<image src="@/static/logo.png" mode=""></image>
						</view>
						<view class="search-wrap">
							<u-search @click="gotoSearch" height="56" :action-style="{color: '#fff'}"
								:show-action="false" :disabled="true">
							</u-search>
						</view>
					</view>

				</u-navbar>
				<!--  菜单栏  -->
				<view class="tab-bar">
					<u-tabs item-width="100" :list="navbar" :is-scroll="false" :current="current" @change="change"
						:active-item-style="activeStyle" :bar-style="barStyle" inactive-color="#8f8f8f"></u-tabs>
				</view>
			</view>
			<!-- 推荐内容 -->
			<view class="recommend" v-if="current==1">
				<view class="swiper-content">
					<u-swiper :list="swiperList" :bg-color="swiperColor" @click="navToBannerLink" height="280"
						v-if="swiperList.length>0">
					</u-swiper>
					<view class="swiper-null skeleton-fade" v-else>

					</view>
				</view>

				<!-- 圈子广场  -->
				<view class="circleList">
					<section-title title="圈子广场" rightText="查看更多" padding="30" titleColor="#434343"
						imageUrl="https://wx2.sinaimg.cn/bmiddle/e448bca1ly1gy9uextenij206c012wea.jpg"
						introColor="#828282" @clickRight="gotoCircle">
					</section-title>
					<home-circle :posts="circleList" v-if="circleList.length>0"></home-circle>
					<view class="home-circle-null skeleton-fade" v-else>

					</view>
				</view>

				<!-- 热门动态  -->
				<view class="circleList" v-if="sticky.length>0">
					<section-title title="热门动态" rightText="查看更多" padding="30" titleColor="#434343"
						imageUrl="https://wx2.sinaimg.cn/bmiddle/e448bca1ly1gy9uexyr2sj206c012mwy.jpg"
						introColor="#828282" @clickRight="gotoSticky">
					</section-title>
					<hot-recommend :posts="sticky"></hot-recommend>
				</view>
				<!-- 积分功能 -->

				<!--广告中心-->
				<view class="ad" v-if="indexAd.length>0">
					<view class="adview" v-if="indexAd.type=='unit'">
						<ad :unit-id="indexAd.code"></ad>
					</view>
					<view @tap="gotoAD(indexAd.type,indexAd.code)" class="adview" v-else>
						<view class="adtext">
							<text>广告</text>
						</view>
						<image :src="indexAd.thumbnail" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 推荐用户-->
				<view class="userList" v-if="userList.length>0">
					<section-title title="推荐用户" rightText="查看更多" padding="30" titleColor="#434343"
						imageUrl="https://wx1.sinaimg.cn/bmiddle/e448bca1ly1gy9ueyavblj206c012wea.jpg"
						introColor="#828282" @clickRight="gotoRank">
					</section-title>
					<home-user :userList="userList" @actionFollows="actionFollow"></home-user>
				</view>
				<!--最新动态-->
				<view class="toplicList">
					<section-title title="最新动态" padding="30" titleColor="#434343"
						imageUrl="https://wx3.sinaimg.cn/bmiddle/e448bca1ly1gy9uey79nhj206c012743.jpg"
						introColor="#828282" :ispostlist='true' @clickScreens='clickScrees'>
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
					<view class="toplicList" v-else>
						<view class="cell_view_bottom" v-for="(item,index) in topicList" :key="index">
							<topic-list :unitid="indexAd.code" :datas="item" :index="index" @followUserByid="followUser"></topic-list>
						</view>
					</view>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
			</view>
			<!-- 推荐内容 END-->

			<view class="articleList" v-if="current==0">
				<article-list :posts="posts" type="forums"></article-list>
				<empty-list v-if="isFollowempty"></empty-list>
				<u-loadmore :margin-top="40" :status="status" />
			</view>
			<!--资讯内容 -->
			<view class="articleList" v-if="current==2">
				<article-list :posts="posts" type="posts"></article-list>
				<empty-list v-if="posts.length==0"></empty-list>

				<u-loadmore :margin-top="40" :status="status" />
			</view>
			<view class="stickyList" v-if="current==3">
				<hg-cards :cardDatas="stickyList"></hg-cards>
			</view>
			<view class="categoryList" v-if="current==4">
				<category-list :cates="cates"></category-list>
				<empty-list v-if="cates.length==0"></empty-list>
				<u-loadmore :margin-top="40" :status="status" />
			</view>

			<view class="taglist" v-if="current==5">
				<block v-for="(item,index) in tags" :key="index">
					<tag-list :taglist="item"></tag-list>
					<empty-list v-if="tags.length==0"></empty-list>
				</block>
				<u-loadmore :margin-top="40" :status="status" />
			</view>
			<view class="taglist" v-if="current==6">
				<forum-shop :posts="posts"></forum-shop>
				<empty-list v-if="posts.length==0"></empty-list>
				<u-loadmore :margin-top="40" :status="status" />
			</view>
		</z-paging>

		<u-toast ref="uToast" />
		<u-popup v-model="showScreenPop" mode="bottom" :closeable="true">
			<view class="screen">

				<view class="screenTitle">
					排序方式
				</view>
				<view class="screenContent">
					<view class="screenItem" :class="index==screenIndex?'active':''"
						v-for="(screenItem,index) in screens" :key="index" @click="changeTopic(index)">
						<view class="screenText">{{screenItem}}</view>
					</view>
				</view>
				<view class="screenTitle">
					类型
				</view>
				<view class="screenContent">
					<view class="screenItem" :class="index==screenformatIndex?'active':''"
						v-for="(screenformatItem,index) in screensformat" :key="index" @click="changeFormate(index)">
						<view class="screenText">{{screenformatItem}}</view>
					</view>
				</view>
			</view>
		</u-popup>

		<creat :showPubModal="show" @closePub="closePub" @close="close" v-if="show"></creat>
		<u-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle" :customStyle='customStyle'
			:z-index='10000'></u-back-top>
		<!-- 资讯内容 END-->
		<!-- 底部菜单  -->
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
	import API from '@/api/api.js';
	import config from '@/api/config.js';
	import ZPagingMixin from '@/components/z-paging/js/z-paging-mixin'
	let app = getApp();
	export default {
		mixins: [ZPagingMixin],
		data() {
			return {
				isWaterFull: config.isWaterFull,
				list: config.tabbar,
				barStyle: {
					'background': '#6c8ff1',
				},
				raScale: 2,
				iconSize: "10",
				keyword: '',
				active: 'home',
				animate: 'rubberBand',
				swiperColor: 'rgba(0,0,0,0)',
				swiperList: [],
				circleList: [],
				shopList: [],
				sticky: [],
				userList: [],
				indexAd: [],
				userpage: true,
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
				isLoading: true,
				showScreenPop: false,
				screenIndex: 0,
				screenformatIndex: 0,
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				topicList:[],
				stickyList: [],
				current: 1,
				page: 1,
				isLastPage: false,
				status: "loading",
				screens: ['最新动态', '点赞数量', '评论数量', '收藏数量', '浏览数量'],
				screensformat: ['全部', '图文', '视频', '语音', '转载'],
				navbar: [{
						name: '关注'
					},
					{
						name: '推荐'
					},
					{
						name: '资讯'
					},
					{
						name: '头条'
					},
					{
						name: '专题'
					},
					{
						name: '话题'
					},
					// #ifdef MP-WEIXIN
					{
						name: '商城'
					}
					// #endif

				],
				topicload: true,
				posts: [],
				cates: [],
				tags: [],
				show: false,
				isFollowempty: false,
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#fff'
				},
				customStyle: {
					background: '#2979ff'
				}
			}
		},
		onLoad() {
			setTimeout(() => {
				this.getBanner();
				this.getCircleLists({
					'custom': 'sticky'
				});
				this.getSticyPosts();
				this.getSticyList();
				this.getUserList();
				this.getIndexAds();
				this.getTopicList();
			}, 1000)

		},
		onShow() {
			this.active = 'home';
			this.animate = 'rubberBand';
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.userpage = true;
			this.user = user;
		},
		onReachBottom() {
			if (!this.isLastPage && !this.topicload) {
				console.log('loading');
				switch (this.current) {
					case 0:
						this.getFollowList({
							page: this.page
						});
						break;
					case 1:
						if (this.screenIndex == 0) {
							let format = "";
							if (this.screenformatIndex == 0) {
								this.getTopicList({
									page: this.page
								});
							} else {
								switch (this.screenformatIndex) {
									case 1:
										format = 'standard';
										this.getTopicList({
											page: this.page,
											format: format
										});
										break;
									case 2:
										format = 'video';
										this.getTopicList({
											page: this.page,
											format: format
										});
										break;
									case 3:
										format = 'audio';
										this.getTopicList({
											page: this.page,
											format: format
										});
										break;
									case 4:
										format = 'quote';
										this.getTopicList({
											page: this.page,
											format: format
										});
										break;
								}
							}

						} else {
							this.getcustomTopicList(this.screenIndex, {
								page: this.page
							})
						}

						break;
					case 2:
						this.getPostList({
							page: this.page
						});
						break;
					case 4:
						this.getCategories({
							page: this.page
						});
						break;
					case 5:
						this.getTags({
							page: this.page,
							hide_empty: true
						});
						break;
						// #ifdef MP-WEIXIN
					case 6:
						this.getShopList({
							page: this.page
						});
						break;
						// #endif
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			change: function(e) {
				if (e) {
					this.current = e;
				} else if (e == 0) {
					this.current = 0;
				}
				this.isLoading = true;
				this.swiperList = [];
				this.circleList = [];
				this.sticky = [];
				this.userList = [];
				this.indexAd = [];
				this.topicList=[];
				this.page = 1;
				this.topicload = true;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.isLastPage = false;
				this.isFollowempty = false;
				this.status = "loading";
				this.posts = [];
				this.cates = [];
				this.tags = [];
				switch (this.current) {
					case 0:
						this.getFollowList();
						break;
					case 1:
						this.getTopicList();
						this.getBanner();
						this.getCircleLists({
							'custom': 'sticky'
						});
						this.getSticyPosts();
						this.getSticyList();
						this.getUserList();
						this.getIndexAds();
						break;
					case 2:
						this.getPostList();
						break;
					case 4:
						this.getCategories();
						break;
					case 5:
						this.getTags({
							hide_empty: true
						});
						break;
						// #ifdef MP-WEIXIN
					case 6:
						this.getShopList();
						break;
						// #endif
				}
				setTimeout(() => {
					this.$refs.paging.endRefresh()
				}, 600);

			},

			clickScrees: function() {
				console.log(1);
				this.showScreenPop = true;
			},

			getShopList: function(res) {
				API.getShopList(res).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					})
					.catch(err => {
						console.log(err)
					})
			},

			navToBannerLink: function(index) {
				let url = this.swiperList[index].url;
				let type = this.swiperList[index].type;
				if (type == 'page') {
					wx.navigateTo({
						url: url,
					})
				} else if (type == 'app') {
					let urls = url.split("|");
					let appid = urls[0];
					let path = urls[1] || 'pages/index/index';
					uni.navigateToMiniProgram({
						appId: appid,
						path: path,
					})
				}
			},
			gotoSticky: function() {
				uni.navigateTo({
					url: '../sticky/sticky'
				})
			},
			gotoSearch: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},

			gotoRank: function() {
				uni.navigateTo({
					url: '../rank/rank'
				})
			},
			actionFollow: function(e) {
				let data = {}
				let that = this;
				let id = e.id // 关注的用户id
				let action = e.status // 关注动作：follow 取关动作 disfollow
				let index = e.index
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
						title: "匿名用户不能关注",
						type: 'error',
					})
					return;
				}
				API.updateFollow(data).then(res => {
						if (res.message == "取关成功") {
							that.userList[index].status = 'follow'
						} else if (res.message == "关注成功") {
							that.userList[index].status = 'disfollow'
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
											title: "取消登录",
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

			gotoCircle: function() {
				uni.switchTab({
					url: '../circle/circle'
				})
			},

			getFollowList: function(args) {
				let that = this;
				API.getFollowForums(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false;
					})
					.catch(err => {
						console.log(err)
						if (err.message == "您没有关注任何人") {
							this.isFollowempty = true;
							this.status = "nomore";
						}
						if (err.message == "未授权登录用户,无法获取关注数据" || err.message == "未授权登录用户无法获取关注数据") {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否前往登陆?',
								success: function(res) {
									if (res.cancel) {
										that.$refs.uToast.show({
											title: "取消登录",
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

			getPostList: function(args) {
				console.log(1);
				API.getPostsList(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					})
					.catch(err => {
						console.log(err)
					})
			},
			getCategories: function(args) {
				API.getCategories(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.page = this.page + 1
						this.cates = this.cates.concat(res)
						this.isLoading = false;

					})
					.catch(err => {

					})
			},

			getBanner: function() {
				API.getBanner().then(res => {
						if (res.status === 200) {
							this.swiperList = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
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
				this.active = 'home';
				this.animate = 'rubberBand';
			},
			close:function(){
				this.show = false;
			},
			getSticyList: function() {
				API.getStickyList().then(res => {
					console.log(res);
					this.sticky = res;
					this.isLoading = false;
				}).catch(err => {
					console.log(err)
				})
			},
			getSticyPosts: function() {
				API.getStickyPosts().then(res => {
					console.log(res);
					this.stickyList = res
				}).catch(err => {
					console.log(err)
				})
			},
			getCircleLists: function(args) {
				API.getCircleList(args).then(res => {
						this.circleList = res
					})
					.catch(err => {
						console.log(err)
					})
			},
			getUserList: function() {
				API.getUserList().then(res => {
					this.userList = res
				}).catch(err => {
					console.log(err)
				})
			},
			getIndexAds: function() {
				API.indexAdsense().then(res => {
						if (res.status == 200) {
							this.indexAd = res.data
						}

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
			getTags: function(args) {
				API.getTopicsTags(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"
						}
						this.page = this.page + 1
						this.tags = this.tags.concat(res)
						this.isLoading = false;
					})
					.catch(err => {})
			},
			changeTopic: function(index) {
				this.page = 1;
				this.topicload = true;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.isLastPage = false;
				this.status = "loading";
				this.topicList=[];
				this.posts = [];
				this.isLoading = true;
				this.screenIndex = index;
				if (index == 0) {
					this.getTopicList();
				} else {
					this.getcustomTopicList(index, {});
				}
				this.showScreenPop = false;

			},

			changeFormate: function(index) {
				this.page = 1;
				this.topicload = true;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.isLastPage = false;
				this.status = "loading";
				this.posts = [];
				this.topicList=[];
				this.isLoading = true;
				this.screenformatIndex = index;
				if (this.screenformatIndex == 0) {
					this.getTopicList({
						page: this.page
					});
				} else {
					let format = "";
					switch (this.screenformatIndex) {
						case 1:
							format = 'standard';
							this.getTopicList({
								page: this.page,
								format: format
							});
							break;
						case 2:
							format = 'video';
							this.getTopicList({
								page: this.page,
								format: format
							});
							break;
						case 3:
							format = 'audio';
							this.getTopicList({
								page: this.page,
								format: format
							});
							break;
						case 4:
							format = 'quote';
							this.getTopicList({
								page: this.page,
								format: format
							});
							break;
					}
				}
				this.showScreenPop = false;

			},


			getcustomTopicList: function(index, args) {
				let type = ""
				switch (index) {
					case 1:
						type = 'likes';
						break;
					case 2:
						type = 'comment';
						break;
					case 3:
						type = 'favs';
						break;
					case 4:
						type = 'views';
						break;
				}
				API.getcustomTopicList(type, args).then(res => {
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
						this.isLoading = false;
					})
					.catch(err => {})
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
						this.isLoading = false;
					})
					.catch(err => {})
			},
			
			followUser:function(e){
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
							that.topicList[e.index].author.status='follow';
						} else if (res.message == "关注成功") {
							that.topicList[e.index].author.status='disfollow';
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
						}else{
							that.$refs.uToast.show({
								title: err.message,
								type: 'error',
							})
							that.status = "nomore"
						}
					})
			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function(res) {
				return {
					title: this.title,
					path: '/pages/home/home',
					imageUrl: this.cover,
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
					title: this.title,
					query: '',
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

				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.page++;
				this.topicload = false;
			}

		},
	}
</script>

<style lang="scss" scoped>
	.swiper-null {
		width: 690rpx;
		height: 280rpx;
		background-color: #f3f3f3;
	}

	.home-circle-null {
		width: 720rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		height: 466rpx;
		background-color: #f3f3f3;
	}

	.tab-bar {
		position: fixed;
		z-index: 99;
		width: 100%;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;

		.logo {
			margin: 0rpx 30rpx;
			width: 56rpx;
			height: 56rpx;
			border-radius: 100%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}

		.search-wrap {
			margin-right: 30rpx;
			flex: 1;
		}

		.right-item {
			margin: 0 12rpx;
			position: relative;
			color: #ffffff;
			display: flex;
		}

	}



	.swiper-content {
		margin: 100rpx 30rpx 30rpx 30rpx;
	}

	.ad {
		padding: 10rpx 30rpx;

		.adview {
			position: relative;

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
	}

	.toplicList {
		padding-top: 30rpx;

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

	.articleList {
		padding-top: 40rpx;
	}

	.stickyList {
		padding-top: 40rpx;
	}

	.categoryList {
		padding-top: 80rpx;
	}

	.taglist {
		padding: 80rpx 30rpx;
	}

	.screen {
		padding-bottom: 300rpx;

		.screenTitle {
			padding: 20rpx 30rpx;
			font-size: 35rpx;
			color: #007AFF;
			font-weight: bold;
		}


		.screenContent {
			padding: 0rpx 30rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;

			.screenItem {
				margin-top: 20rpx;
				margin-right: 20rpx;
				background: #F4F3F7;
				padding: 20rpx;
				border-radius: 5rpx;

			}

			.active {

				background: #007AFF;
				color: #fff;
			}

		}
	}
</style>
