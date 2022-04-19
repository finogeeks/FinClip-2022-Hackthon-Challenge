<template>
	<view class="content">
		<view class="msg-body">
			<view class="dialog-list" v-if="messageList.length>0">
				<view @tap="onDialogItemClick(item)" v-for="(item,index) in messageList" :key="index" class="dialog-item">
					<view class="item-head">
						<image class="icon" :lazyLoad="true" mode="aspectFill"
							:src="item.user.avatar?item.user.avatar:'@/static/images/msg-dialog-icon-1@2x.png'"></image>
					</view>
					<view class="item-body">
						<view class="info">
							<view class="name"> {{item.user.name}}</view>
							<view class="time">{{item.date}}</view>
						</view>
						<view class="content">
							<rich-text :nodes="item.content||'你有一条新的通知消息待查收~'" class="desc"></rich-text>
							<view class="red-dot" v-if="item.status==='未读消息'">{{item.status}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "message-list",
		props: {
			messageList: {
				type: Array,
				default: function() {
					return [];
				},
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onDialogItemClick: function(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/message/detail/detail?userid=' + item.user.id + '&name=' + item.user.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-list {
		padding-bottom: 120rpx;

		.dialog-item {
			display: flex;
			align-items: center;
			height: 140rpx;
			padding: 0 32rpx;
			border: none;
			background: none;

			.item-head {
				position: relative;
				width: 90rpx;
				height: 90rpx;

				.icon {
					border-radius: 50%;
					display: block;
					width: 90rpx;
					height: 90rpx;
					margin-right: 30rpx;
				}
			}

			.red-dot {
				display: block;
				height: 32rpx;
				line-height: 32rpx;
				background-color: #ff6d6d;
				border-radius: 16rpx;
				font-size: 20rpx;
				color: #fff;
				padding: 0 12rpx;
			}

			.item-body {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-left: 30rpx;
				text-align: left;

				.info {
					height: 50rpx;
					line-height: 50rpx;
					width: 100%;
					display: flex;
					align-items: center;
					margin: 0;
				}

				.name {
					font-size: 30rpx;
					color: #252628;
					width: 300rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.time {
					flex: 1;
					color: #b7b5c2;
					font-size: 22rpx;
					text-align: right;
				}

				.content {
					height: 44rpx;
					line-height: 44rpx;
					width: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin: 0;
				}

				.desc {
					flex: 1;
					height: 100%;
					font-size: 24rpx;
					color: #8d919b;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}


			}
		}
	}
</style>
