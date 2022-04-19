<template>
	<view class="contents">
		<view class="detailTop">
			<view class="detailInfo">
				<view class="info">
					<view class="top">
						<view class="title">{{''+category+''}}</view>
						<view class="seriesRemark">{{''+description+''}}</view>
					</view>
				</view>
				<view class="playNum">
					<view class="playNumL">共有<text class="mL10">{{count+'篇文章'}}</text>
					</view>
					<view class="playNumR">
						最近更新：<text class="mL10">{{date}}</text>
					</view>
				</view>
			</view>
			<view class="detailTopBj">
				<image mode="aspectFill" :src="cover"></image>
			</view>
		</view>
		<view class="main">
			<view class="content">
				<view class="list">
					<article-list :posts="posts" type="posts"></article-list>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	import config from '@/api/config.js'
	export default {
		data() {
			return {
				id: '',
				description: '',
				cover: '',
				category: '',
				count: '',
				page: 1,
				posts: [],
				status: "loading",
				date: ''
			}
		},
		onLoad(options) {
			this.getCategoryByIDs(options.id);
			this.id=options.id;
			this.getPostsList({
				categories:options.id,
				page: this.page
			})
		},
		onReachBottom() {
			if(!this.isLastPage){
				this.getPostsList({
					categories:this.id,
					page:this.page
				})
			}
		},
		methods: {
			getCategoryByIDs: function(id) {
				API.getCategoryByID(id).then(res => {
						this.cover = res.cover
						this.category = res.name
						this.description = res.description
						this.count = res.count
						this.date = res.date
						uni.setNavigationBarTitle({
							title: res.name
						})
					})
					.catch(err => {
						console.log(err)
					})
			},
			getPostsList: function(args) {
				API.getPostsList(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					}).then(res => {
						this.getTags({
							per_page: 1,
							page: this.page
						})
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>

<style>
	.detailTop {
		width: 750rpx;
		height: 448rpx;
		-webkit-box-align: start;
		align-items: flex-start;
		-webkit-box-pack: start;
		justify-content: flex-start;
		-webkit-box-orient: vertical;
		flex-direction: column;
		box-sizing: border-box;
		padding: 20rpx 32rpx 80rpx;
		position: relative;
	}

	.detailTop,
	.detailTop .detailTopBj {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-direction: normal;
	}

	.detailTop .detailTopBj {
		position: absolute;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-orient: horizontal;
		flex-direction: row;
	}

	.detailTop .detailTopBj image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.detailTop .detailTopBj image::after {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		content: "";
		background: rgba(0, 0, 0, .5);
	}

	.detailTop .detailInfo {
		width: 100%;
		color: #fff;
	}

	.detailTop .detailInfo,
	.detailTop .detailInfo .info {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: start;
		align-items: flex-start;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.detailTop .detailInfo .info .top .title {
		font-size: 40rpx;
		font-weight: 700;
		margin-bottom: 30rpx;
	}

	.detailTop .detailInfo .info .top .seriesRemark {
		font-size: 28rpx;
	}

	.detailTop .detailInfo .playNum {
		-webkit-box-pack: justify;
		justify-content: space-between;
		width: 100%;
		font-size: 28rpx;
	}

	.detailTop .detailInfo .playNum,
	.detailTop .detailInfo .playNum .playNumR {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
	}

	.detailTop .detailInfo .playNum .playNumR,
	.detailTop .detailInfo .playNum .playNumR .item {
		-webkit-box-pack: start;
		justify-content: flex-start;
	}

	.detailTop .detailInfo .playNum .playNumR .item {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		font-size: 24rpx;
		color: #fff;
	}

	.detailTop .detailInfo .playNum .playNumR .item .itemIcon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 12rpx;
	}


	.main {
		margin-top: -60rpx;
	}

	.main::after {
		content: "";
		display: block;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.content {
		background: #f7f7f7;
		border-radius: 32rpx 32rpx 0 0;
		margin-bottom: 35rpx;
		overflow: hidden;
	}

	.content .list {
		padding: 32rpx 0rpx;
	}
</style>
