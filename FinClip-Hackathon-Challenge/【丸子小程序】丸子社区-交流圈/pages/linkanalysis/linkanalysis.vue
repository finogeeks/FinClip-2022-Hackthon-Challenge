<template>
	<view class="content">
		<view class="editor-link">
			<view class="content">
				<view class="content-title">{{linktype?linktype:'添加链接'}}</view>
				<view class="content-texts">在这里，分享你发现的优质内容</view>
				<view class="content-input">
					<input @input="changeLink" maxlength="-1" placeholder="请添加链接..." :value="link"></input>
					<view @tap="deleteLink" class="delete-link" v-if="link">
						<image mode="aspectFill" src="/static/images/error.png"></image>
					</view>
				</view>
			</view>
			<view class='tips'>
				<text class="content-text">小贴士:</text>
				<text class="content-text">你可以黏贴微信公众号、B站文章、微博、抖音等产品的文章链接！</text>
			</view>
			<view @tap="anAlysis" class="add-link-btn" :class="link&&'active'">解析链接</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				linktype: '',
				link: '',
			}
		},
		onShow() {
			let that = this;
			uni.getClipboardData({
				success: function(res) {
					console.log(res);
					var data = that.confirmvideo(res.data);
					if (data) {
						that.link = data;
					}
				}
			})
		},
		methods: {

			/**
			 * 监听链接输入
			 */
			changeLink: function(e) {
				var link = e.detail.value;
				var data = this.confirmvideo(link);
				if (data) {
					this.link = link;
				}
			},

			/**
			 * 解析链接
			 */

			anAlysis: function() {
				let that=this;
				if (!this.link) {
					that.$refs.uToast.show({
						title: "请输入链接",
						type: 'error',
					})
					return;
				} else {
					uni.navigateTo({
						url: '/pages/creat/topic/topic?url=' + this.link
					})
				}

			},




			confirmvideo: function(url) {
				let miaopai = RegExp(/http\:\/\/n\.miaopai\.com\/media\/(.*?)\.htm/)
				let douyin = RegExp(/https\:\/\/v\.douyin\.com\/(.*?)\//)
				let weibo = RegExp(/https\:\/\/m\.weibo\.cn\/(.*?)\/(.*?)/)
				let weixin = RegExp(/https\:\/\/mp\.weixin\.qq\.com\/(.*?)\/(.*?)/)
				let bilibili = RegExp(/https\:\/\/www\.bilibili\.com\/read\/cv(.*?)/)
				let xiaohongshu = RegExp(/http\:\/\/xhslink\.com\/(.*?)/)
				let vuevideo = RegExp(/https\:\/\/v\.vuevideo\.net\/share\/post\/(.*?)/)
				let zhihu = RegExp(/https\:\/\/zhuanlan\.zhihu\.com\/p\/(.*?)/)
				let qutoutiao = RegExp(/http\:\/\/new\.3qtt\.cn\/(.*?)/)
				let jianshu = RegExp(/https\:\/\/www\.jianshu\.com\/p\/(.*?)/)
				let qqnews = RegExp(/https\:\/\/view\.inews\.qq\.com\/a\/(.*?)\?/)
				let biliTv = RegExp(/https\:\/\/b23\.tv\/(.*?)/)
				let douban = RegExp(/https\:\/\/www\.douban\.com\/doubanapp\/dispatch\?uri\=\/note\/(.*?)\//)
				if (miaopai.exec(url)) {
					this.sharetype = 'video';
					this.linktype = "检测到秒拍视频链接";
					return url;
				} else if (weibo.exec(url)) {
					this.sharetype = 'image';
					this.linktype = "检测到微博链接";
					return url;
				} else if (xiaohongshu.exec(url)) {
					url = url + '"';
					let xiaohongshulink = url.match(/http\:\/\/xhslink\.com\/(.*?)，/);
					console.log(xiaohongshulink);
					this.sharetype = 'image';
					this.linktype = "检测到小红书链接";
					return "http://xhslink.com/" + xiaohongshulink[1];
				} else if (vuevideo.exec(url)) {
					url = url + '"';
					let vuelink = url.match(/https\:\/\/v\.vuevideo\.net\/share\/post\/(.*?)"/);
					this.sharetype = 'video';
					this.linktype = "检测到Vuevideo链接";
					return "https://v.vuevideo.net/share/post/" + vuelink[1];
				} else if (weixin.exec(url)) {
					this.sharetype = 'link';
					this.linktype = "检测到公众号链接";
					return url;
				} else if (douyin.exec(url)) {
					let douyinlink = url.match(/https\:\/\/v\.douyin\.com\/(.*?)\//);
					let videoLink = "https://v.douyin.com/" + douyinlink[1] + "/"
					this.sharetype = 'video';
					this.linktype = "检测到抖音链接"
					return videoLink;
				} else if (bilibili.exec(url)) {
					this.sharetype = 'link';
					this.linktype = "检测到bilibili链接";
					let bilibililink = url.match(/https\:\/\/www\.bilibili\.com\/read\/cv(.*?)\?/);
					return "https://www.bilibili.com/read/cv" + bilibililink[1];
				} else if (zhihu.exec(url)) {
					this.haretype = 'link';
					this.linktype = "检测到知乎专栏链接";
					return url;
				} else if (qutoutiao.exec(url)) {
					this.sharetype = 'link';
					this.linktype = "检测到趣头条链接";
					return url;
				} else if (jianshu.exec(url)) {
					this.sharetype = 'link';
					this.linktype = "检测到简书链接"
					return url;
				} else if (biliTv.exec(url)) {
					this.sharetype = 'link',
						this.linktype = "检测到B站视频链接"
					return url;
				} else if (douban.exec(url)) {
					this.sharetype = 'link';
					this.linktype = "检测豆瓣链接";
					let doubanlink = url.match(
						/https\:\/\/www\.douban\.com\/doubanapp\/dispatch\?uri\=\/note\/(.*?)\//);
					let videoLink = "https://m.douban.com/note/" + doubanlink[1] + "/";
					return videoLink;
				} else {
					return false;
				}
			},
		}
	}
</script>

<style>
	.editor-link .content {
		padding: 10rpx 30rpx 40rpx;
	}

	.editor-link .content .content-title {
		padding-bottom: 16rpx;
		font-size: 22px;
		font-weight: bold;
		color: #333333;
	}

	.editor-link .content .content-texts {
		width: 670rpx;
		font-size: 14px;
		font-weight: normal;
		color: #666666;
		line-height: 40rpx;
	}

	.editor-link .content .content-input {
		position: relative;
		margin-top: 24rpx;
		font-size: 12px;
	}

	.editor-link .content .content-input input {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 670rpx;
		height: 88rpx;
		background: #f7f7f7;
		border-radius: 20rpx;
		padding: 0 90rpx 0 30rpx;
		font-size: 16px;
		font-weight: normal;
		color: #333333;
		line-height: 88px;
	}

	.editor-link .content .content-input .delete-link {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20rpx;
		border-radius: 50%;
		width: 64rpx;
		height: 64rpx;
	}

	.editor-link .content .content-input .delete-link image {
		width: 100%;
		height: 100%;
	}

	.editor-link .add-link-btn {
		position: fixed;
		bottom: 88rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 250rpx;
		height: 96rpx;
		background: #c2c2c2;
		border-radius: 48rpx;
		line-height: 96rpx;
		font-size: 16px;
		font-weight: normal;
		color: #ffffff;
		text-align: center;
	}

	.editor-link .add-link-btn.active {
		background: #00ABFF;
		color: #fff;
	}


	.tips {
		padding: 40rpx;
	}

	.tips .content-text {
		width: 670rpx;
		font-size: 14px;
		font-weight: normal;
		color: #666666;
		line-height: 40rpx;
	}
</style>
