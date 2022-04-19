<template>
	<view class="content">
		<block v-if="orderList.length>0">
			<view class="exchange modal-detail section" v-for="(item,index) in orderList" :key="index">
				<view class="flex-between mb-30">
					<text>订单号：{{item.trade_id}}</text>
					<text v-if="item.status=='paid'">待发货</text>
					<text v-else-if="item.status=='wait'">待支付</text>
					<text v-else-if="item.status=='shipped'">待收货</text>
					<text v-else-if="item.status=='received'">已收货</text>
				</view>
				<navigator class="flex-between mb-30" :url="'/pages/shop/detail?id='+item.product_id">
					<image mode="aspectFill" :src="item.product_image"></image>
					<view class="flex-column-center">
						<view class="modal-title line-2">{{item.product_title}}</view>
						<view class="modal-title line-2">{{item.address}}</view>
					</view>
				</navigator>
				<view class="text-right mb-30">
					<text class="mr-20">共{{item.count}}件</text>
					<text>共支付 <text class="ft-36">{{item.price}}</text> 积分</text>
				</view>
				<view class="flex-between flex-row-center">
					<text class="timestamp">{{item.date}}</text>
					<button @tap="handleSeeProduct" class="btn-secondary" v-if="item.status=='wait'">立即支付</button>
					<text v-else-if="item.status=='paid'">还未发货，请耐心等待</text>
					<button @tap="handleCheckExpress(item.express)" class="btn-secondary"
						v-else-if="item.status=='shipped'">查看物流</button>
					<button @tap="item.commented?'':'tapcomment'" class="btn-secondary"
						v-else-if="item.status=='received'">交易完成</button>
					<button @tap="action(item.id,'received','edit',index)" class="btn-secondary" v-if="item.status=='shipped'">确定收货</button>
				</view>
			</view>
		</block>
		<block v-if="orderList.length==0">
			<empty-list :text="emptyText"></empty-list>
		</block>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				orderList: [],
				page:1,
				emptyText:'暂无订单信息'
			}
		},
		onLoad() {
			this.getOrderLists();
		},
		onReachBottom() {
			if(!this.isLastPage){
				this.getOrderLists({
					page:this.page
				})
			}
		},
		methods: {
			getOrderLists: function() {
				API.getOrderLists().then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.orderList = this.orderList.concat(res.orders)
						this.page = this.page + 1
						this.isLoading = false
					})
					.catch(err => {
						console.log(err)
					})
			},
			handleCheckExpress: function(id) {
				uni.navigateTo({
					url: '../express/express?id=' + id
				})
			},
			
			action : function (id,status,action,index) {
			  let that = this;
			  uni.showModal({
			    title: '确定收获',
				content:'请确定已经收到货，方可操作',
			    success: function (res) {
			      if (res.confirm) {
			        let args = {
			          action: action,
			          id: id,
			          status: status
			        }
			        API.setOrder(args).then(res => {
			          if (res.status == 200 && action == 'delete') {
			            wx.showToast({
			              title: '删除成功',
			            })
			            that.orderList.splice(index, 1);
			          }
			          if (res.status == 200 && action == 'edit') {
			            uni.showToast({
			              title: '已确定收货',
			            })
			            that.orderList[index].status = 'received';
			          }
			        })
			      } else {
			
			      }
			    }
			  })
			
			}
		}
	}
</script>

<style>
	.exchange {
		font-size: 24rpx;
		color: #8a95a9;
	}

	.exchange .modal-detail image {
		width: 160rpx;
		height: 160rpx;
	}

	.exchange .modal-title {
		width: 440rpx;
	}

	.exchange .text-right {
		font-size: 26rpx;
		color: #000;
	}

	.exchange .timestamp {
		color: #b3b3b3;
	}

	.exchange .btn-secondary {
		margin: 0;
	}

	.deliver-mask-hd {
		border-bottom: 1rpx solid #d2d3d5;
		padding: 30rpx 0 30rpx 0;
		font-size: 30rpx;
	}

	.deliver-mask-hd>text {
		line-height: 1.2;
	}

	.deliver-mask-hd button {
		height: 44rpx;
		padding: 5px;
		line-height: 22rpx;
		margin: 0;
	}

	.deliver-mask-hd button.copy-btn {
		width: 150rpx;
		height: 50rpx;
		line-height: 26rpx;
		font-size: 22rpx;
	}

	.deliver-mask-content {
		padding: 30rpx 0 30rpx 0;
		font-size: 24rpx;
		line-height: 1.5;
	}

	.deliver-mask-content .flex-between {
		font-size: 28rpx;
	}

	.deliver-mask-content view {
		margin-bottom: 15rpx;
	}

	.deliver-mask-content .btn-block {
		margin: 50rpx auto 0;
	}

	.icon-copy {
		width: 22rpx;
		height: 25rpx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAZCAYAAAA14t7uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhFRjMzMTA3N0ZDODExRTk5NEUwRTIwOEQxNzZEQkUyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhFRjMzMTA4N0ZDODExRTk5NEUwRTIwOEQxNzZEQkUyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEVGMzMxMDU3RkM4MTFFOTk0RTBFMjA4RDE3NkRCRTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEVGMzMxMDY3RkM4MTFFOTk0RTBFMjA4RDE3NkRCRTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ZkwtzAAAAyklEQVR42mL8//8/AzKYPn06I5CaAsQpQMzGQDp4DsTJLFgk3IA4i4F8IAnEc7EZLAwiVFVVGVxcXEg2FehjsOFMDDQCNDOYBeh0T1CYQMMGDm7fvg3G+AAXFxeDo6Mjg5ycHFYXYxhKLPj27RvD/v37sbsYZmhmZiZZEQUynK5hPGrwqMGjBuMrhKhhyIkTJ9CF/lLF4PPnz6MLrWahks8rkNhPgXglVQwGloyddI08UHUtCa0EyQEvcCW3FFySRABQeCZjkwAIMAAIXTFK/vV7pwAAAABJRU5ErkJggg==);
	}

	.modal-container {
		font-size: 30rpx;
	}

	.mt--100 {
		margin-top: -100rpx;
	}

	.modal-addr {
		height: 100rpx;
		line-height: 100rpx;
		border: 1rpx solid #8a95a9;
		border-radius: 4px;
		color: #8a95a9;
	}

	.modal-addr .line-1 {
		padding-right: 40rpx;
		font-size: 28rpx;
	}

	.modal-addr button {
		background: none;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 10rpx;
	}

	.icon-arrow-gray {
		top: 35rpx;
		right: 40rpx;
	}

	.icon-address {
		margin-right: 10rpx;
		vertical-align: -3rpx;
	}

	.modal-detail {
		padding: 30rpx;
	}

	.modal-detail image {
		width: 180rpx;
		height: 180rpx;
		margin-right: 30rpx;
		border-radius: 8rpx;
		display: block;
	}

	.modal-detail .price {
		color: #d2656d;
	}

	.modal-detail .price text {
		font-size: 48rpx;
	}

	.modal-title {
		width: 480rpx;
		height: 90rpx;
		font-size: 30rpx;
		line-height: 1.5;
		color: #000;
	}

	.modal-remarks {
		align-items: center;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.flex-label {
		display: inline-block;
		width: 160rpx;
	}

	.modal-remarks input {
		flex: 1;
	}


	.section {
		width: 690rpx;
		margin: 40rpx auto;
		background: #fff;
		border-radius: 8rpx;
		box-shadow: 0 0 10rpx rgba(125, 125, 125, 0.1);
	}

	.section .section {
		width: 100%;
	}

	.section-hd {
		line-height: 1;
		font-size: 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #565656;
	}

	.section-hd-tt {
		font-weight: bold;
	}

	.section-hd-link {
		padding: 20rpx 0;
		font-size: 30rpx;
		color: #d2656d;
		display: flex;
		align-items: center;
	}


	.flex-between {
		display: flex;
		justify-content: space-between;
	}

	.flex-column-center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mb-30 {
		margin-bottom: 30rpx;
	}

	.mr-20 {
		margin-right: 20rpx !important;
	}

	.flex-row-center {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.line-2,
	.line-3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.line-2 {
		-webkit-line-clamp: 2;
	}

	.ft-36 {
		font-size: 36rpx;
	}

	.btn-secondary {
		width: 170rpx;
		height: 66rpx;
		padding: 0;
		margin: 0;
		line-height: 66rpx;
		font-size: 28rpx;
		text-align: center;
		border-radius: 8rpx;
		border: 2rpx solid #8a95a9;
		color: #8a95a9;
		background: #fff;
	}


	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.5);
		transition: opacity 0.3s;
	}

	.mask-dark {
		background: #000;
	}

	.mask-container {
		width: 600rpx;
		padding: 30rpx;
		background: #fff;
		border-radius: 6px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.mask-close {
		position: absolute;
		left: 50%;
		bottom: -115rpx;
		transform: translate(-50%, 0);
		padding: 0;
		background: none;
	}


	.btn-block {
		width: 100%;
		max-width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		margin: 30rpx auto;
	}


	.jz-comment-dialog-bg {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.jz-comment-dialog-bg-hidden {
		opacity: 0;
		transform: scale3d(1, 1, 0);
	}

	.jz-comment-dialog-container {
		position: fixed;
		z-index: 10;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		box-sizing: border-box;
		background: #F8F8F8;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	.jz-comment-dialog-top {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		margin-top: 42rpx;
		margin-bottom: 20rpx;
		padding: 0 48rpx;
	}

	.jz-comment-dialog-tip {
		font-size: 24rpx;
		color: #999999;
	}

	.jz-comment-dialog-text {
		font-size: 24rpx;
		color: #666666;
	}

	.jz-comment-dialog-textarea {
		width: 710rpx;
		height: 80rpx;
		line-height: 48rpx;
		text-align: left;
		padding: 0 28rpx;
		font-size: 32rpx;
		color: #333333;
		margin-top: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
	}

	.jz-comment-dialog-input {
		width: 710rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
		padding: 0 28rpx;
		font-size: 32rpx;
		color: #333333;
		margin-top: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin: 0 20rpx;
	}

	.jz-comment-dialog-bottom {
		width: 100%;
		height: 126rpx;
		padding: 0 42rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.jz-comment-dialog-bottom-left {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
	}

	.jz-comment-dialog-emoji {
		width: 78rpx;
		height: 64rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
		padding-left: 14rpx;
		padding-right: 20rpx;
	}

	.jz-comment-dialog-emoji-show {
		background: #FFFFFF;
	}

	.jz-comment-dialog-pic {
		width: 78rpx;
		height: 64rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
		padding-left: 14rpx;
		padding-right: 20rpx;
	}

	.jz-comment-dialog-image {
		width: 106rpx;
		height: 106rpx;
		margin-left: 14rpx;
		border-radius: 10rpx;
	}

	.jz-comment-dialog-confirm {
		width: 112rpx;
		height: 56rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		border-radius: 28rpx;
		background: #2F78FF;
		text-align: center;
		line-height: 56rpx;
	}

	.jz-comment-emoji-scroll {
		width: 100%;
	}

	.jz-comment-emoji-content {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.jz-comment-emoji-text {
		width: 125rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 52rpx;
	}


	/*图片列表*/

	.imgs-list {
		white-space: nowrap;
		padding: 20rpx;
		box-sizing: border-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		overflow-y: hidden;
		z-index: 20;
		align-items: flex-start;
	}

	.imgs-list::-webkit-scrollbar {
		display: none;
	}

	.imgs-list .imgs-item {
		display: inline-block;
		width: 210rpx;
		height: 210rpx;
		background: no-repeat center/cover;
		margin: 0 7rpx;
		border-radius: 16rpx;
		position: relative;
		overflow: hidden;
	}

	.imgs-item.imgs-bg {
		background: #f0f0f0;
	}

	.imgs-list .imgs-item image {
		width: 210rpx;
		height: 210rpx;
	}

	.imgs-list .imgs-item.add {
		position: relative;
		border: 1px solid #f9f9f9;
		background: #f9f9f9;
		border-radius: 16rpx;
		box-sizing: border-box;
	}

	.imgs-list .imgs-item.add::after {
		content: "";
		display: block;
		height: 81rpx;
		width: 2rpx;
		background: #ccc;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.imgs-list .imgs-item.add::before {
		content: "";
		display: block;
		height: 2rpx;
		width: 81rpx;
		background: #ccc;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.image-ctrl {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		height: 40rpx;
		background: rgba(0, 0, 0, 0.3);
		z-index: 100;
		border-radius: 0 0 16rpx 16rpx;
		overflow: hidden;
	}

	.image-ctrl .prev,
	.image-ctrl .next {
		width: 60rpx;
		height: 40rpx;
	}

	.image-ctrl .prev {
		background: url('https://yit-prod.oss-cn-hangzhou.aliyuncs.com/xcx/icon/house/hs_icon_80.png') no-repeat center/ 17rpx auto;
	}

	.image-ctrl .next {
		background: url('https://yit-prod.oss-cn-hangzhou.aliyuncs.com/xcx/icon/house/hs_icon_81.png') no-repeat center/ 17rpx auto;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
	}

	.flex-center {
		display: flex;
		justify-content: center;
	}

	.flex-middle {
		display: flex;
		align-items: center;
	}
</style>
