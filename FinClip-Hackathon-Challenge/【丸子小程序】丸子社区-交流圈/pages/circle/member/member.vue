<template>
	<view class="content">

		<!--圈主信息-->
		<view class="section-title">圈主</view>
		<view class="section-list-wrapper line">
			<view @tap="onUserClick(boardmaster.id)" class="section-item-wrapper">
				<view class="avatar-wrapper">
					<image class="avatar" mode="aspectFill" :src="boardmaster.avatar">
					</image>
				</view>
				<view class="text-content">
					<view class="name">
						<label class="span">{{boardmaster.name}}</label>
						<image class="img" src="/static/images/mine/pro.png">
						</image>
					</view>
					<view class="detail" v-if="boardmaster.description">{{boardmaster.description}}</view>

				</view>
				<view class="concern">
					<view @tap="onUserClick(boardmaster.id)" class="button selected">主页</view>
				</view>
			</view>
		</view>
		<!--圈内用户-->
		<view class="section-title">圈内用户</view>
		<view class="section-list-wrapper" v-if="memberList.length>0">
			<view @tap="onUserClick(item.userId)" class="section-item-wrapper" v-for="(item,index) in memberList"
				:key="index">
				<view class="avatar-wrapper">
					<image class="avatar" mode="aspectFill" :src="item.avatarUrl">
					</image>
				</view>
				<view class="text-content">
					<view class="name">
						<label class="span">{{item.nickName}}</label>
					</view>
					<view class="detail" v-if="item.description">{{item.description}}</view>
				</view>
				<view class="concern">
					<view @tap="onUserClick(item.userId)" class="button selected">主页</view>
				</view>
			</view>
		</view>
		<view>
			<button class="empty-wrapper" openType="share" v-if="memberList.length==0">
				<image class="icon" src="/image/not-follow.png"></image>
				<view class="share">暂无圈友加入，快点击进行邀请吧</view>
			</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				id: '',
				mempage: 1,
				isLastPage: false,
				boardmaster: {avatar:
					"https://thirdwx.qlogo.cn/mmopen/vi_32/REArBGMMcqh7OS9gLX0ybeiaDqOq1lg7sib0Xr1v7D1bMKmRgtOFoCr1WNGROOcVY75LtrhdEIyq1AGEGYqXdcbQ/132",
					description: "这个家伙太懒，连个签名都没有",
					gender: 2,
					id: 1,
					name: "管理员",
				},
				memberList: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getCircleByIDs(options.id);
			this.getMenmberList(options.id, {
				page: this.mempage,
				per_page: 20
			});
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getMenmberList(this.id, {
					page: this.mempage,
					per_page: 20
				});
			}
		},
		methods: {
			getCircleByIDs: function(id) {
				API.getCircleByID(id).then(res => {
						this.boardmaster = res.boardmaster;
					})
					.catch(err => {
						console.log(err)
					})
			},
			onUserClick:function(id){
				uni.navigateTo({
					url:'/pages/user/user?id='+id
				})
			},
			getMenmberList: function(id, data) {
				let that = this;
				API.getMemberlist(id, data).then(res => {
						if (res.length < 20) {
							this.isLastPage = true;
							this.status = "nomore"
						}
						this.memberList = this.memberList.concat(res);
						this.mempage = this.mempage + 1;
					})
					.catch(err => {
						console.log(err)
					})
			},

		}
	}
</script>

<style>
	.circle-members-wrapper {
		width: 100%;
		height: 100%;
	}


	.section-title {
		padding-top: 24rpx;
		margin: 0 32rpx;
		color: #979797;
		font-size: 28rpx;
	}

	.section-list-wrapper {
		margin: 0 32rpx 0rpx;
		padding: 0 0 20rpx;
	}

	.section-list-wrapper.line {
		border-bottom: 2rpx solid #f1f1f1;
	}

	.section-list-wrapper .section-item-wrapper {
		background-color: #fff;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		padding: 20rpx 0;
	}

	.section-list-wrapper .section-item-wrapper .avatar-wrapper {
		-webkit-box-flex: 0;
		flex: 0 0 90rpx;
		height: 90rpx;
		position: relative;
	}

	.section-list-wrapper .section-item-wrapper .avatar-wrapper .avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.section-list-wrapper .section-item-wrapper .avatar-wrapper .certified {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 36rpx;
		height: 36rpx;
	}

	.section-list-wrapper .section-item-wrapper .text-content {
		-webkit-box-flex: 1;
		flex: 1;
		margin: 0 24rpx;
		overflow: hidden;
	}

	.section-list-wrapper .section-item-wrapper .text-content .name {
		height: 40rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.section-list-wrapper .section-item-wrapper .text-content .name .span {
		color: #3e3e3f;
		font-size: 28rpx;
		font-weight: 500;
		max-width: 50vw;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.section-list-wrapper .section-item-wrapper .text-content .name .img {
		width: 56rpx;
		height: 26rpx;
		margin-left: 5rpx;
	}

	.section-list-wrapper .section-item-wrapper .text-content .detail {
		margin-top: 6rpx;
		color: #5a5a5a;
		font-size: 24rpx;
		height: 32rpx;
		line-height: 32rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.section-list-wrapper .section-item-wrapper .concern {
		-webkit-box-flex: 0;
		flex: 0 0 116rpx;
	}

	.section-list-wrapper .section-item-wrapper .concern .button {
		background-color: #ff4a4a;
		width: 112rpx;
		height: 42rpx;
		line-height: 42rpx;
		border: 2rpx solid #ff4a4a;
		color: #fff;
		font-size: 24rpx;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		border-radius: 23rpx;
	}

	.section-list-wrapper .section-item-wrapper .concern .button .icon {
		width: 20rpx;
		height: 20rpx;
	}

	.section-list-wrapper .section-item-wrapper .concern .button .text {
		margin-left: 8rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.section-list-wrapper .section-item-wrapper .concern .button.selected {
		background-color: #fff;
		border: 2rpx solid #979797;
		color: #979797;
		text-align: center;
	}

	.section-list-wrapper .section-item-wrapper .more {
		-webkit-box-flex: 0;
		flex: 0 0 116rpx;
	}

	.section-list-wrapper .section-item-wrapper .more .button {
		width: 100%;
		height: 60rpx;
		display: flex;
		-webkit-box-pack: end;
		justify-content: flex-end;
		-webkit-box-align: center;
		align-items: center;
	}

	.section-list-wrapper .section-item-wrapper .more .button .icon {
		width: 32rpx;
		height: 32rpx;
	}

	.empty-wrapper {
		margin: 0;
		padding: 0;
		height: 500rpx;
		background-color: initial;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
	}

	.empty-wrapper:after {
		border: none;
	}

	.empty-wrapper .icon {
		width: 141rpx;
		height: 146rpx;
		margin-bottom: 24rpx;
	}

	.empty-wrapper .share {
		color: #979797;
		font-size: 28rpx;
	}
</style>
