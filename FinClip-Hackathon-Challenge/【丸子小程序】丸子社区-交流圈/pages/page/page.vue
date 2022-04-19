<template>
	<view class="content">
		<view id="entry-content" class="entry-content clearfix">
			<u-parse :show-with-animation="true" :html="content" ref="article" :tag-style="tagStyle">
			</u-parse>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				content: '',
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					p: 'padding-top:20rpx',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				}
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getPageByID(options.id);
			}
		},
		methods: {

			getPageByID: function(id) {
				API.getPageByID(id).then(res => {
						this.content = res.content.rendered
						uni.setNavigationBarTitle({
							title: res.title.rendered
						})

					})
					.catch(err => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.entry-content {
		clear: both;
		color: #404246;
		margin: 0;
		padding: 0 30rpx;
		font-size: 36rpx;
		line-height: 70rpx;
		text-align: justify;
		word-wrap: break-word;
		word-break: normal;
		font-family: Impact, Haettenschweiler, ‘Arial Narrow Bold’, sans-serif;

		video {
			width: 100% !important;
		}

		image {
			width: 100% !important;
		}

	}
</style>
