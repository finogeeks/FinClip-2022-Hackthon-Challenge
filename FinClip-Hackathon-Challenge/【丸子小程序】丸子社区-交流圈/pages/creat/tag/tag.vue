<template>
	<view>
		<view class="container" style="padding-bottom:200rpx">
			<!-- 搜索栏 -->
			<view class="searchBar">
				<view class="tit-seabox-bar tit-start-search">
					<icon color="#CCCCCC" size="32rpx" type="search"></icon>
					<input @confirm="searchTag" placeholder="请添加标签" placeholderStyle="color: #ccc;" type="text"
						@input="addtag" :value="searchStr"></input>
					<icon @tap="activityClear" size="28rpx" type="clear" v-if="searchStr"></icon>
				</view>
				<view @tap="searchTag" class="activity-seabtn">添加</view>
			</view>
			<!-- 搜索栏 -->
			<!-- 不添加话题 -->
			<view class="line"></view>
			<view @tap="select-topic" class="no-topic">
				<image class="icon" src="https://res.paquapp.com/paquwxapp/images/publish_no_topic.png"></image>
				<view class="title">不添加话题</view>
			</view>
			<!-- 不添加话题 -->
			<!-- 标签列表 -->
			<view @tap="addTags(item.name)" class="topic" v-for="(item,index) in tags" :key="index">
				<view class="main">#{{item.name}}</view>
				<view class="sub">{{item.count}}篇动态</view>
			</view>
			<view class="noData" v-if="tags.length===0">
				<image class="noData-img" src="https://res.paquapp.com/paquwxapp/image/data-null.png"></image>
				<view class="noDataTxt">暂无数据</view>
			</view>
			<!-- 标签列表 -->
		</view>

		<!-- 底部标签列表 -->
		<view class="btnbottom">
			<view class="tag-all-view">
				<view class="tag-view" v-for="(tag,index) in userSelectedTags" :key="index">
					<image class="tag-image" src="@/static/images/topic.png"></image>
					<text class="tag-text">{{tag}}</text>
					<image @tap="removeTag(index)" class="tag-delete" src="@/static/images/icon_delete_buoy.png">
					</image>
				</view>
			</view>
			<button @tap="save" class="issue resetBtn" hoverClass="primary-button-hover"
				type="primaryOrange">确定</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				searchStr: '',
				userSelectedTags: [],
				tags: [],
				page: 1,
				isLastPage: false,
				isLoading: false,

			}
		},
		onLoad(options) {
			if (options.tags) {
				var a = JSON.parse(options.tags);
				this.userSelectedTags = a;
			};

			this.getTagList({
				per_page: 20,
			});
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getTagList({
					page: this.page,
					per_page: 20,
				});
			}
		},
		methods: {

			getTagList: function(args) {
				API.getTopicsTags(args).then(res => {
						if (res.length < 20) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.tags = this.tags.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					})
					.catch(err => {
						console.log(err)
					})
			},

			addTags: function(name) {
				console.log(name);
				let that=this;
				let readsave = true
				// 过滤重复值
				if (this.userSelectedTags.length > 0) {
					for (let i = 0; i < this.userSelectedTags.length; i++) {
						if (this.userSelectedTags[i] == name) {
							readsave = false
							that.$refs.uToast.show({
								title: "已添加该标签",
								type: 'error',
							})
							break;
						}
					}

				}
				if (readsave) {
					this.userSelectedTags.unshift(name);
				}
			},

			/**
			 * 添加标签 
			 * */
			searchTag: function() {
				let that=this;
				if (this.userSelectedTags.length > 8) {
					that.$refs.uToast.show({
						title: "最多只能添加8个标签",
						type: 'error',
					})
					return
				}
				if (this.searchStr > 10) {
					that.$refs.uToast.show({
						title: "标签应小于10个字",
						type: 'error',
					})
					return
				}
				let readsave = true
				// 过滤重复值
				if (this.userSelectedTags.length > 0) {
					for (let i = 0; i < this.userSelectedTags.length; i++) {
						if (this.userSelectedTags[i] == this.searchStr) {
							readsave = false
							break;
						}
					}

				}
				if (readsave) {
					this.userSelectedTags.unshift(this.searchStr);
					this.searchInput = '';
				}
			},
			/**
			 * 删除标签
			 */
			removeTag: function(index) {
				this.userSelectedTags.splice(index, 1);
			},


			addtag: function(e) {
				this.searchStr = e.detail.value;
			},


			/**
			 * 保存
			 */
			save: function() {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				 console.log(prevPage)
				prevPage.$vm.tags = this.userSelectedTags;
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	/**搜索栏 **/
	.searchBar {
		background: #fff;
		padding-left: 30rpx;
		padding-right: 30rpx;
		overflow: hidden;
		padding-top: 16rpx;
		padding-bottom: 16rpx;
		position: fixed;
		width: 750rpx;
	}

	.searchBar,
	.tit-seabox-bar {
		height: 68rpx;
		display: flex;
		align-items: center;
	}

	.searchBar .tit-seabox-bar {
		width: 100%;
		border-radius: 34rpx;
		background: #f7f7f7;
	}

	.searchBar .tit-seabox-bar.tit-start-search {
		width: calc(100% - 90rpx);
	}

	.searchBar .tit-seabox-bar icon {
		margin-right: 10rpx;
		margin-left: 20rpx;
	}

	input {
		height: 68rpx;
		line-height: 68rpx;
		font-size: 28rpx;
		width: 100%;
		margin-right: 32rpx;
	}

	.searchBar .activity-seabtn {
		font-size: 28rpx;
		width: 160rpx;
		height: 58rpx;
		line-height: 58rpx;
		text-align: center;
		background-color: #007AFF;
		color: #fff;
		border-radius: 30rpx;
		margin-left: 20rpx;
	}

	/**搜索栏 **/

	/**  不添加话题 **/
	.line {
		width: 100%;
		height: 1rpx;
		background: #e5e5e5;
	}

	.no-topic {
		margin-left: 30rpx;
		height: 100rpx;
		display: flex;
		padding-top: 120rpx;
		padding-bottom: 40rpx;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.no-topic .icon {
		width: 36rpx;
		height: 36rpx;
		display: block;
		margin-right: 10rpx;
	}

	.no-topic .title {
		flex: 1;
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
	}

	/**  不添加话题 **/

	/** 标签列表 */


	.topic {
		line-height: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.topic:last-child {
		border-bottom: 0;
	}

	.topic .main {
		font-size: 32rpx;
		color: #333;
		font-weight: 400;
		line-height: 100rpx;
	}


	.topic .sub {
		font-weight: 400;
		line-height: 100rpx;
		font-size: 24rpx;
		color: #999;
	}

	.noData {
		height: 540rpx;
		margin-top: 150rpx;
	}

	.noData .noData-img {
		width: 400rpx;
		height: 400rpx;
		display: block;
		margin: 0 auto 10rpx;
	}

	.noData .noDataTxt {
		text-align: center;
		color: #999;
		font-size: 28rpx;
	}

	/** 底部标签列表*/
	.btnbottom {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		background: #fff;
		border-top: 1rpx solid #f7f7f7;
	}

	.issue {
		margin: 30rpx auto;
		width: 90%;
		color: #fff;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 12rpx;
		border: 2rpx solid rgba(187, 203, 223, 0.5);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		background: #7289ff !important;
	}


	.tag-all-view {
		padding: 20rpx;
		display: flex;
		position: relative;
		flex: row;
		align-items: center;
		flex-wrap: wrap;
	}


	.tag-all-view .tag-view {
		position: relative;
		margin-top: 20rpx;
		margin-right: 14rpx;
		height: 46rpx;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
		background-color: #f5f5f5;
	}

	.tag-all-view .tag-text {
		font-size: 22rpx;
		line-height: 22rpx;
		color: #8c8c8c;
		font-weight: 400;
		margin-right: 15rpx;
		white-space: nowrap;
	}

	.tag-all-view .tag-image {
		width: 22rpx;
		height: 22rpx;
		margin: 0rpx 12rpx 0rpx 15rpx;
	}

	.tag-all-view .tag-delete {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		top: -15rpx;
		right: -15rpx;
	}
</style>
