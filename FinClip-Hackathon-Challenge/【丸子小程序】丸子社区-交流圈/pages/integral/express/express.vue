<template>
	<view class="content">
		<view class='logistics'>
			<view class='logisticsCon'>
				<view class='company acea-row row-between-wrapper'>
					<view class='picTxt acea-row row-between-wrapper'>
						<view class='iconfont icon-wuliu'></view>
						<view class='text'>
							<view>
								<text class='name line1' v-if="express.status==0">在途</text>
								<text class='name line1' v-else-if="express.status==1">揽件</text>
								<text class='name line1' v-else-if="express.status==2">疑难</text>
								<text class='name line1' v-else-if="express.status==3">签收</text>
								<text class='name line1' v-else-if="express.status==4">退签或异常签收</text>
								<text class='name line1' v-else-if="express.status==5">派件</text>
								<text class='name line1' v-else-if="express.status==6">退回</text>
							</view>
							<view class='express line1'>
								<text class='name'>快递单号：</text> {{id}}
							</view>
						</view>
					</view>
					<view class='copy' bindtap='copyOrderId'>复制单号</view>
				</view>
				<view class='item' v-for="(item,index) in context" :key="index">
					<view class='circular' :class="index === 0 ? 'on':''"></view>
					<view class='text' :class="index===0 ? 'on-font on':''">
						<view>{{item.desc}}</view>
						<view class='data' :class="index===0 ? 'on-font on':''">{{item.time}}</view>
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
				context: [],
				express: [],
				id:''

			}
		},
		onLoad(options) {
			this.id=options.id;
			this.getExpress(options.id);
		},
		methods: {

			getExpress: function(id) {
				let that = this;
				let args = {
					num: id,
				}
				API.getExpresss(args).then(res => {
					this.express = res.msg;
					this.context = this.context.concat(res.msg.context.map(function(item) {
						item.time = that.getDateTime(item.time * 1000, 'Y年M月D日 h:m:s');
						return item;
					}))

				})

			},
			
			getDateTime: function (number, format) {
			  let time = new Date(number)
			  let newArr = []
			  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
			  newArr.push(time.getFullYear())
			  newArr.push(this.formatNumber(time.getMonth() + 1))
			  newArr.push(this.formatNumber(time.getDate()))
			
			  newArr.push(this.formatNumber(time.getHours()))
			  newArr.push(this.formatNumber(time.getMinutes()))
			  newArr.push(this.formatNumber(time.getSeconds()))
			
			  for (let i in newArr) {
			    format = format.replace(formatArr[i], newArr[i])
			  }
			  return format;
			}

		}
	}
</script>

<style>
	.logistics .header {
		padding: 23rpx 30rpx;
		background-color: #fff;
		height: 166rpx;
		box-sizing: border-box;
	}

	.logistics .header .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.logistics .header .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.logistics .header .text {
		width: 540rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.logistics .header .text .name {
		width: 365rpx;
		color: #282828;
	}

	.logistics .header .text .money {
		text-align: right;
	}

	.logistics .logisticsCon {
		background-color: #fff;
		margin: 12rpx 0;
	}

	.logistics .logisticsCon .company {
		height: 120rpx;
		margin: 0 0 45rpx 30rpx;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.logistics .logisticsCon .company .picTxt {
		width: 520rpx;
	}

	.logistics .logisticsCon .company .picTxt .iconfont {
		width: 50rpx;
		height: 50rpx;
		background-color: #666;
		text-align: center;
		line-height: 50rpx;
		color: #fff;
		font-size: 35rpx;
	}

	.logistics .logisticsCon .company .picTxt .text {
		width: 450rpx;
		font-size: 26rpx;
		color: #282828;
	}

	.logistics .logisticsCon .company .picTxt .text .name {
		color: #999;
	}

	.logistics .logisticsCon .company .picTxt .text .express {
		margin-top: 5rpx;
	}

	.logistics .logisticsCon .company .copy {
		font-size: 20rpx;
		width: 106rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 3rpx;
		border: 1rpx solid #999;
	}

	.logistics .logisticsCon .item {
		padding: 0 40rpx;
		position: relative;
	}

	.logistics .logisticsCon .item .circular {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		position: absolute;
		top: -1rpx;
		left: 31.5rpx;
		background-color: #ddd;
	}

	.logistics .logisticsCon .item .circular.on {
		background-color: #e93323;
	}

	.logistics .logisticsCon .item .text.on-font {
		color: #e93323;
	}

	.logistics .logisticsCon .item .text .data.on-font {
		color: #e93323;
	}

	.logistics .logisticsCon .item .text {
		font-size: 26rpx;
		color: #666;
		width: 615rpx;
		border-left: 1rpx solid #e6e6e6;
		padding: 0 0 60rpx 38rpx;
	}

	.logistics .logisticsCon .item .text.on {
		border-left-color: #f8c1bd;
	}

	.logistics .logisticsCon .item .text .data {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.logistics .logisticsCon .item .text .data .time {
		margin-left: 15rpx;
	}


	.acea-row {
		display: flex;
		flex-wrap: wrap;
	}

	.acea-row.row-top {
		align-items: flex-start;
	}

	.acea-row.row-middle {
		align-items: center;
	}

	.acea-row.row-bottom {
		align-items: flex-end;
	}

	.acea-row.row-left {
		justify-content: flex-start;
	}

	.acea-row.row-center {
		justify-content: center;
	}

	.acea-row.row-right {
		justify-content: flex-end;
	}

	.acea-row.row-between {
		justify-content: space-between;
	}

	.acea-row.row-around {
		justify-content: space-around;
	}

	.acea-row.row-column {
		flex-direction: column;
	}

	.acea-row.row-column-between {
		flex-direction: column;
		justify-content: space-between;
	}

	.acea-row.row-column-around {
		flex-direction: column;
		justify-content: space-around;
	}

	.acea-row.row-center-wrapper {
		align-items: center;
		justify-content: center;
	}

	.acea-row.row-between-wrapper {
		align-items: center;
		justify-content: space-between;
	}
</style>
