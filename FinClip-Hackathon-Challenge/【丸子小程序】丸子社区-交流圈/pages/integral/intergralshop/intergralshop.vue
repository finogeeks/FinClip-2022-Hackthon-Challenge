<template>
	<view class="content">
		<view class="goodsbox">
			<view class="goods" v-for="(item,index) in products" :key="index">
				<view @tap="goDetail(item.id)" class="biggoods">
					<view class="goodimage">
						<image class="image" mode="aspectFill" :src="item.product.picture[0]"></image>
					</view>
					<view class="goodinfo">
						<view class="goodtitle">
							{{''+item.title.rendered+''}}
						</view>
						<view class="gooddsc">{{item.excerpt.rendered}}</view>
						<view class="goodaction">
							<view class="goodprice">
								<view class="gooddiscount" v-if="item.product.credit>0">
									{{item.product.credit}} 积分
								</view>
							</view>
							<view class="goodbtn">立即兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				products: [],
				page:1,
			}
		},
		onLoad() {
			this.getCreditShopLists();
		},
		onReachBottom() {
			if(!this.isLastPage){
				this.getCreditShopLists({
					page:this.page
				})
			}
		},
		methods: {
			getCreditShopLists: function() {
				API.getCreditShopList().then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.products = this.products.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					})
					.catch(err => {
						console.log(err)
					})
			},
			goDetail:function(id){
				uni.navigateTo({
					url:'../detail/detail?id='+id,
				})
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fff;
		padding: 0rpx 30rpx 60rpx;
	}

	.goodsbox {
		margin-top: 60rpx;
	}

	.goodsbox .goodstitle {
		width: 690rpx;
		height: 116rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.goodsbox .goodstitle image {
		width: 100%;
		height: 100%;
	}

	.goodsbox .goodstitle .goodsclass image {
		width: 100%;
		height: 100%;
	}

	.goodsbox .goodstitle .goodsclass .goodstag {
		font-size: 26rpx;
		color: #999;
		padding-left: 10rpx;
	}

	.goodsbox .goodstitle .goodsmore {
		font-size: 26rpx;
		color: #666;
	}

	.goodsbox .goodstitle .goodsmore .iconreturn {
		transform: rotate(180deg);
		display: inline-block;
		font-size: 26rpx;
	}

	.diverter-border {
		width: calc(100% - 60rpx);
		height: 1rpx;
		background: rgba(147, 177, 177, .16);
		margin: 0 auto;
	}

	.diverter-element {
		width: 100%;
		height: 20rpx;
		background: rgba(147, 177, 177, .16);
	}

	.box-shadow-main {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .12);
	}

	.viewheader {
		width: 100%;
		height: 20rpx;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .1s ease-out;
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(200px);
	}

	.biggoods {
		width: 690rpx;
		height: 586rpx;
		box-shadow: 0 2rpx 15rpx 0rpx rgba(0, 0, 0, .08);
		border-radius: 32rpx;
		margin: 40rpx 0;
		overflow: hidden;
	}

	.biggoods .goodimage {
		width: 100%;
		height: 340rpx;
	}

	.biggoods .goodimage .image {
		width: 100%;
		height: 100%;
	}

	.biggoods .goodinfo {
		padding: 0 40rpx;
	}

	.biggoods .goodinfo .goodtitle {
		font-weight: 700;
		font-size: 30rpx;
		color: #222;
		padding-top: 30rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.biggoods .goodinfo .goodtitle .goodtag {
		padding: 2rpx 16rpx;
		vertical-align: 5%;
	}

	.biggoods .goodinfo .gooddsc {
		font-size: 24rpx;
		color: #999;
		padding-top: 12rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.biggoods .goodinfo .goodaction {
		padding-top: 20rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.biggoods .goodinfo .goodaction .goodprice {
		font-weight: 700;
		font-size: 32rpx;
	}

	.biggoods .goodinfo .goodaction .goodbtn {
		width: 152rpx;
		height: 58rpx;
		background: #7289ff;
		border-radius: 44rpx;
		color: #fff;
		text-align: center;
		line-height: 58rpx;
		font-size: 26rpx;
	}

	.bannergoods {
		position: relative;
		width: 650rpx;
		height: 414rpx;
	}

	.bannergoods .goodsinfo {
		padding: 40rpx;
		padding-bottom: 0;
		width: 370rpx;
	}

	.bannergoods .goodsinfo .goodname {
		font-size: 40rpx;
		line-height: 50rpx;
		font-weight: 600;
		color: #200;
		min-height: 100rpx;
		box-sizing: initial;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.bannergoods .goodsinfo .goodname .goodtag {
		font-size: 24rpx;
		vertical-align: 14%;
	}

	.bannergoods .goodsinfo .gooddsc {
		font-size: 26rpx;
		min-height: 115rpx;
		color: #999;
		margin-top: 20rpx;
		line-height: 38rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.bannergoods .goodaction {
		padding: 0 40rpx;
		margin-top: 15rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.bannergoods .goodaction .goodprice {
		font-weight: 700;
		color: #200;
		font-size: 36rpx;
	}

	.bannergoods .goodaction .goodbtn {
		width: 200rpx;
		height: 80rpx;
		background: #93b1b1;
		border-radius: 44rpx;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}

	.bannergoods .goodimage {
		width: 136rpx;
		height: 136rpx;
		border-radius: 20rpx;
		position: absolute;
		top: 40rpx;
		right: 40rpx;
	}

	.smallgoods {
		width: 330rpx;
		height: 528rpx;
		background: #fff;
		box-shadow: 0 2rpx 14rpx 0rpx rgba(0, 0, 0, .08);
		border-radius: 20rpx;
		overflow: hidden;
	}

	.smallgoods .goodsimage {
		width: 100%;
		height: 330rpx;
	}

	.smallgoods .goodsinfo {
		padding: 0 20rpx;
	}

	.smallgoods .goodsinfo .goodsname {
		font-size: 28rpx;
		color: #222;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		padding: 28rpx 0 12rpx 0;
	}

	.smallgoods .goodsinfo .goodstag {
		font-size: 22rpx;
		color: #999;
		overflow: hidden;
		white-space: nowrap;
		padding-bottom: 20rpx;
	}

	.smallgoods .goodsinfo .goodsaction {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.smallgoods .goodsinfo .goodsaction .goodprice {
		font-weight: 700;
		color: #222;
		font-size: 30rpx;
	}

	.smallgoods .goodsinfo .goodsaction .goodbtn {
		width: 118rpx;
		height: 42rpx;
		background: #93b1b1;
		border-radius: 44rpx;
		color: #fff;
		text-align: center;
		line-height: 42rpx;
		font-size: 20rpx;
	}

	.swipergoods {
		position: relative;
		width: 460rpx;
		height: 180rpx;
	}

	.swipergoods .goodsinfo {
		padding: 20rpx;
		width: 245rpx;
	}

	.swipergoods .goodsinfo .goodname {
		font-size: 26rpx;
		line-height: 50rpx;
		font-weight: 600;
		min-height: 100rpx;
		box-sizing: initial;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.swipergoods .goodsinfo .gooddsc {
		font-size: 26rpx;
		min-height: 115rpx;
		color: #999;
		margin-top: 20rpx;
		line-height: 38rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.swipergoods .goodaction {
		width: 245rpx;
		padding: 0 20rpx;
		margin-top: 15rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.swipergoods .goodaction .goodprice {
		font-weight: 700;
		font-size: 26rpx;
	}

	.swipergoods .goodaction .goodbtn {
		width: 120rpx;
		height: 40rpx;
		background: #93b1b1;
		border-radius: 44rpx;
		color: #fff;
		text-align: center;
		line-height: 40rpx;
		font-size: 20rpx;
	}

	.swipergoods .goodimage {
		width: 148rpx;
		height: 148rpx;
		border-radius: 20rpx;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.gooddiscount {
		padding: 10rpx 20rpx;
		border-radius: 20px;
		font-weight: 400;
		font-size: 28rpx;
		background: #f8e8ac;
		color: #97793d;
		margin-top: 4px;
	}

	.goodtag {
		color: #97793d;
		background: #f8e8ac;
		border-radius: 8rpx;
		padding: 5rpx 16rpx;
		margin-right: 8rpx;
		font-size: 24rpx;
		font-weight: 400;
		vertical-align: 14%;
		font-weight: 700;
	}
</style>
