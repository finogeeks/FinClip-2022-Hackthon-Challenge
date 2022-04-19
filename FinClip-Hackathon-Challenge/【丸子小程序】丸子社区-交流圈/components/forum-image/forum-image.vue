<template>
	<view class="content">
		<image class="image"  :class="gallary.length==4?'four-picture':''+''+gallary.length==1?'one-picture':''"
			mode="aspectFill" :src="item" v-for="(item,index) in gallary" :key="index" v-if="!isPlay"
			@tap="isVideo?videoplay(videoUrl):handlePreview(gallary,index)"></image>
		<video class="video" v-if="isPlay" :src="playUrl":autoplay="true"  controls></video>
		<image class="videoPng" @tap="videoplay(videoUrl)" src="/static/images/edit_page_play_record.png" mode="aspectFill"
			v-if="isVideo&&!isPlay"></image>
	</view>
</template>

<script>
	export default {
		name: "forum-image",
		props: {
			gallary: {
				type: Array,
				default: function() {
					return [];
				}
			},
			isVideo: {
				type: Boolean,
				default: false
			},
			videoUrl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				playUrl: '',
				isPlay: false,
			};
		},
		methods: {
			videoplay: function(url) {
				console.log(1)
				let that = this;
				uni.request({
					url: 'https://mall.guqule.com/mp/video.php',
					data: {
						url: url,
					},
					method: 'get',
					success: function(res) {
						console.log(res);
						if (res.data.status == 200) {
							that.playUrl = res.data.url,
							that.isPlay = true
						}
					}
				})

			},
			handlePreview:function(gallary,index){
				uni.previewImage({
					urls:gallary,
					current:index
				})
			},
			
		}
	}
</script>

<style>
	.one-picture {
		position: relative;
		width: 100% !important;
		height: 420rpx !important;
	}
	
	.video{
		position: relative;
		width: 100% !important;
		height: 420rpx !important;
	}

	.content {
		position: relative;
		margin: 0 25rpx;
	}

	.videoPng {
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		top: 140rpx;
		right: 285rpx;
	}

	.image {
		position: relative;
		width: 225rpx;
		height: 225rpx;
		margin: 0 5rpx;
		margin-bottom: 10rpx;
		border-radius: 16rpx;
	}
</style>
