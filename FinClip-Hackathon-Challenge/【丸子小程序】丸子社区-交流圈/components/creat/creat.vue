<template>
	<view class="content">
		<view class="pub_page_modal" :class="showPubModal?'show':'hide'">
			<view class="fabu-btn-con">
				<view class="fabu-btn-wrap">
					<view @tap="gotoTopic" class="fabu-btn fabu-btn2">
						<view class="fabu-btn-img">
							<image src="../../static/images/finder.png"></image>
						</view>
						<view class="fabu-btn-text">
							<view class="fabu-btn-text1">动态</view>
							<view class="fabu-btn-text2">见证你的精彩瞬间</view>
						</view>
					</view>
					<view @tap="gotoVideo" class="fabu-btn fabu-btn2">
						<view class="fabu-btn-img">
							<image src="../../static/images/finder1.png"></image>
						</view>
						<view class="fabu-btn-text">
							<view class="fabu-btn-text1">视频</view>
							<view class="fabu-btn-text2">世间美好与你相遇</view>
						</view>
					</view>
					<view @tap="gotoVoice" class="fabu-btn fabu-btn2">
						<view class="fabu-btn-img">
							<image src="../../static/images/finder3.png"></image>
						</view>
						<view class="fabu-btn-text">
							<view class="fabu-btn-text1">语音</view>
							<view class="fabu-btn-text2">世间美好与你相遇</view>
						</view>
					</view>
					<view @tap="gotoCustom" class="fabu-btn">
						<view class="fabu-btn-img">
							<image src="../../static/images/finder4.png"></image>
						</view>
						<view class="fabu-btn-text">
							<view class="fabu-btn-text1">自定义</view>
							<view class="fabu-btn-text2">世间美好与你相遇</view>
						</view>
					</view>
				</view>
				<view @tap="closePubModal" class="close-modal">
					<image src="https://i3.lis99.com/static1/miniImg/activityProject/image/quanzi/del-icon.png"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "creat",
		props: {
			showPubModal: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {

			};
		},
		methods: {
			closePubModal: function(data) {
				this.$emit("closePub", data)
			},

			gotoTopic: function() {
				uni.navigateTo({
					url: '/pages/creat/topic/topic'
				})
				this.$emit("close")
			},
			gotoVideo: function() {
				uni.navigateTo({
					url: '/pages/creat/video/video'
				})
				this.$emit("close")
			},
			gotoVoice: function() {
				uni.navigateTo({
					url: '/pages/creat/voice/voice'
				})
				this.$emit("close")
			},
			gotoCustom: function() {
				uni.navigateTo({
					url: '/pages/creat/custom/custom'
				})
				this.$emit("close")
			}
		}
	}
</script>

<style>
	.pub_page_modal {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: url(https://i3.lis99.com/static1/miniImg/activityProject/image/quanzi/blur-modal.png) no-repeat;
		background-size: 100% 100%;
		z-index: 100;
		backdrop-filter: blur(20rpx);
	}

	.show {
		opacity: 1;
		z-index: 1000000;
	}

	.hide,
	.show {
		transition: all .4s;
	}

	.hide {
		opacity: 0;
		z-index: 0;
	}

	.btn {
		text-align: left;
	}

	.fabu-btn-con {
		width: 100%;
		padding-bottom: 120rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1000;

	}

	.fabu-btn-wrap {
		width: 500rpx;
		margin: auto;
		z-index: 1000;
	}

	.fabu-btn2 {
		margin-bottom: 34rpx;
	}

	.fabu-btn {
		color: #fff;
		width: 500rpx;
		padding: 24rpx;
		background: #7289ff;
		border-radius: 68rpx;
		display: flex;
		align-items: center;
	}

	.newyear {
		background: #bc2105;
	}

	.fabu-btn-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
		margin-right: 40rpx;
	}

	.fabu-btn-img image {
		width: 100%;
		height: 100%;
		border-radius: 100%;
		display: block;
	}

	.fabu-btn-text1 {
		font-size: 34rpx;
		font-weight: 700;
		color: #fff;
		line-height: 34rpx;
		text-align: left;
	}

	.fabu-btn-text2 {
		font-size: 26rpx;
		color: #fff;
		line-height: 26rpx;
		padding-top: 12rpx;
	}

	.close-modal {
		width: 60rpx;
		height: 60rpx;
		background: #f8f8f8;
		border-radius: 100%;
		margin: 80rpx auto 0;
		display: flex;
	}

	.close-modal image {
		width: 100%;
		height: 100%;
	}

	.cha {
		width: 5rpx;
		height: 30rpx;
		border-radius: 4rpx;
		background: #fecd33;
		position: relative;
	}

	.cha1 {
		transform: rotate(50deg);
		top: 15rpx;
		left: 25rpx;
	}

	.cha2 {
		transform: rotate(-50deg);
		top: 18rpx;
		left: 25rpx;
	}
</style>
