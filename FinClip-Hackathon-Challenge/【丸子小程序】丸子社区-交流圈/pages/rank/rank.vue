<template>
	<view class="content">
		<view class="listData">
			<view class="topPart">
				<view class="topThree" :class="rankList.length<3?'theSecond1':''">
					<view class="topThreeBox" :class="index==0?'theFirst':index==1?'theSecond':'theThird'"
						v-for="(item,index) in rankList" :key="index" v-if="index<3" @tap="gotoUser(item.id)">
						<view class="avatarBox">
							<image mode="aspectFill" :src="item.avatar"></image>
						</view>
						<view class="name">{{item.name}}</view>
						<view class="heatNum">
							<text>积分： {{item.credits}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomPart">
			<block v-for="(item,index) in rankList" :key="index" v-if="index>=3">
				<view class="listItem"  @tap="gotoUser(item.id)">
					<view class="leftPart">
						<view class="ranking">{{index}}</view>
						<image class="idolAvatar" :src="item.avatar"></image>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="rightPart">
						<view class="heatNum">
							<view class="heatLogo"></view>{{item.credits}}
						</view>
					</view>
				</view>
				<view class="divideLine"></view>
			</block>
		</view>
	</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				rankList: [],
				page: 1,
				isLastPage: false,
			}
		},
		onLoad() {
			this.getCreditsRank({
				per_page: 20
			})
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getCreditsRank({
					per_page: 20,
					page: this.page
				})
			}
		},
		methods: {
			getCreditsRank: function(data) {
				API.creditRank(data).then(res => {
						//console.log(res)
						if (res.length < 20) {
							this.isLastPage = true
						}
						this.page = this.page + 1
						this.rankList = this.rankList.concat(res)

					})
					.catch(err => {
						console.log(err)
					})
			},
			gotoUser:function(id){
				uni.navigateTo({
					url:'../user/user?id='+id
				})
			}
		}
	}
</script>

<style>
	.listData {
		margin: 0 auto;
		width: 710rpx;
		height: auto;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		box-shadow: 0 -2rpx 28px 0 rgba(63, 152, 255, .23);
	}


	.listData .topPart {
		position: relative;
		padding-top: 20rpx;
		width: 710rpx;
		height: 400rpx;
		background: url(https://ohudong.cztv.com/1/257934/images/listTopImg.png) no-repeat 50%;
		background-size: 100% 100%;
	}


	.listData .topThree {
		margin: 0 36rpx;
		width: 638rpx;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: flex-end;
	}

	.listData .topThree,
	.listData .topThreeBox {
		height: 324rpx;
		display: flex;
	}

	.listData .topThreeBox {
		width: 200rpx;
		flex-flow: column nowrap;
		justify-content: flex-end;
		align-items: center;
	}


	.listData .theFirst {
		transform: translateX(216rpx);
	}

	.listData .theSecond {
		transform: translateX(-220rpx);
	}

	.listData .theSecond .avatarBox {
		margin-left: -14rpx;
		width: 146rpx;
		height: 148rpx;
		background: url(https://ohudong.cztv.com/1/260986/images/top2Bg.png) no-repeat 50%;
		background-size: 143rpx 145rpx;
	}

	.listData .theSecond image,
	.listData .theThird image {
		margin-top: 28rpx;
		margin-left: 26rpx;
		width: 116rpx;
		height: 116rpx;
		border-radius: 100%;
		background: url(https://ohudong.cztv.com/1/257934/images/defaultAvatar.png) no-repeat 50%;
		background-size: 116rpx 116rpx;
	}

	.listData .theFirst .avatarBox {
		margin-left: -14rpx;
		width: 186rpx;
		height: 184rpx;
		background: url(https://ohudong.cztv.com/1/260986/images/top1Bg.png) no-repeat 50%;
		background-size: 183rpx 181rpx;
	}

	.listData .theFirst image {
		margin-top: 24rpx;
		margin-left: 26rpx;
		width: 156rpx;
		height: 156rpx;
		border-radius: 100%;
		background: url(https://ohudong.cztv.com/1/257934/images/defaultAvatar.png) no-repeat 50%;
		background-size: 156rpx 156rpx;
	}

	.listData .theThird .avatarBox {
		margin-left: -14rpx;
		width: 146rpx;
		height: 148rpx;
		background: url(https://ohudong.cztv.com/1/260986/images/top3Bg.png) no-repeat 50%;
		background-size: 143rpx 145rpx;
	}

	.listData .topThreeBox .name {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-weight: 700;
		text-align: center;
	}

	.listData .topThreeBox .heatNum,
	.listData .topThreeBox .name {
		line-height: 28rpx;
		color: #fff;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 200rpx;
		overflow: hidden;
	}

	.listData .topThreeBox .heatNum {
		margin-bottom: 20rpx;
		font-size: 20rpx;
		text-align: center;
		margin-top: 10rpx;
	}

	.listData .topThreeBox .heatNum text {
		opacity: .7;
	}


	/* 底部列表 **/


	.bottomPart {
		width: 710rpx;
		min-height: 600rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}


	.listItem {
		width: 710rpx;
		height: 96rpx;
		justify-content: space-between;
	}

	.leftPart,
	.listItem,
	.rightPart {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}



	.rightPart {
		padding-right: 20rpx;
		justify-content: flex-end;
	}

	.ranking {
		width: 90rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #333;
		text-align: center;
	}

	.listItem .name {
		font-size: 28rpx;
		color: #333;
		font-weight: 400;
	}


	.horizontal {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.vote {
		margin: 0;
		padding: 0;
		width: 110rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-weight: 700;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		background: linear-gradient(90deg, #ff607c, #ff717f 17%, #ffaf89 78%, #ffc58c);
	}

	.vote:after {
		border: none;
	}



	.idolInfo {
		display: inline-block;
		vertical-align: top;
		padding-top: 18rpx;
		padding-bottom: 16rpx;
		width: 190rpx;
		height: 62rpx;
	}

	.idolInfo .name {
		line-height: 34rpx;
		font-size: 24rpx;
	}

	.idolInfo .heatNum,
	.idolInfo .name {
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.idolInfo .heatNum {
		line-height: 28rpx;
		opacity: .7;
		font-size: 20rpx;
	}

	.idolBox .deleteIdol {
		position: absolute;
		top: -25rpx;
		right: -25rpx;
		width: 88rpx;
		height: 88rpx;
		background: url(https://ohudong.cztv.com/1/257934/images/removeIdol.png) no-repeat 50%;
		background-size: 28rpx 28rpx;
		z-index: 9;
	}


	.idolBox .idolAvatar {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.idolAvatar {
		margin-right: 14rpx;
		width: 56rpx;
		height: 56rpx;
		line-height: 56rpx;
		background: #eef5ff;
		border-radius: 50%;
	}


	.bottomPart .heatNum {
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
		text-align: right;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
	}


	.heatLogo {
		margin-right: 4rpx;
		width: 16rpx;
		height: 22rpx;
		background: url(https://ohudong.cztv.com/1/257934/images/heatNumLogo.png) no-repeat 0;
		background-size: 100% 100%;
	}

	.bottomPart .vote,
	.searchList .vote {
		margin-left: 30rpx;
		background: #68adff;
	}
</style>
