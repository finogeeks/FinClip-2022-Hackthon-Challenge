<template>
	<view class="content">
		<view class="top">
			<text @tap="onCancelButton" class="top-button-cancel">取消</text>
			<text @tap="creatForums" class="top-button-confirm">发布</text>
		</view>
		<textarea @input="onContentInput" class="content-text" maxlength="3000" placeholder="输入要发布的内容"
			:value="textinput"></textarea>
		<view class="video" @tap="upVideo" v-if="video==''">
			<view class="image">
				<image src="/static/images/edit_page_play_record.png" mode="aspectFill"></image>
			</view>
			<view class="text">
				<text>上传视频</text>
			</view>
		</view>
		<view class="videoplay" v-if="video">
			<video class="videos" :src="video" controls></video>
			<view class="videofeture" @tap="addImage">
				<text>上传封面></text>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/icon_publish_shop.png"></image>
				<text class="bottom-item-text">是否显示</text>
				<switch class="tui-fr" style="zoom:0.7;" color="#007aff" checked="anonymity" @change="changeSwitch" />
			</view>
			<view class="bottom-divider" style="width: 670rpx;height: 0.5px;background: #EDEDED;"></view>
			<view @tap="onTopicClick" class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/activity_page_circle.png"></image>
				<text class="bottom-item-text">{{topic==null?'选择圈子':topic}}</text>
				<image class="bottom-item-arrow" src="@/static/images/icon_small_return.png"></image>
			</view>
			<view class="bottom-divider" style="width: 670rpx;height: 0.5px;background: #EDEDED;"></view>
			<view @tap="onLocationClick" class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/icon_publish_location.png"></image>
				<text class="bottom-item-text">{{location.name?location.name:'所在位置'}}</text>
				<image class="bottom-item-arrow" src="@/static/images/icon_small_return.png"></image>
			</view>
			<view class="bottom-divider" style="width: 670rpx;height: 0.5px;background: #EDEDED;"></view>
			<view @tap="onTagClick" class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/icon_publish_tag.png"></image>
				<view class="bottom-item-text" v-if="tags==null||tags.length==0">动态标签</view>
				<view class="address-tag-all-view" v-else>
					<view class="tag-view" v-for="(tag,index) in tags" :key="index">
						<image class="tag-image" src="@/static/images/topic.png"></image>
						<text class="tag-text">{{tag}}</text>
					</view>
				</view>
				<image class="bottom-item-arrow" src="@/static/images/icon_small_return.png"></image>
			</view>
			<view class="bottom-divider" style="width: 670rpx;height: 0.5px;background: #EDEDED;"></view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				edittype: false,
				anonymity: true,
				imagesubject: [],
				textinput: '',
				currentImg: [],
				imageWitdh: 0,
				x: 0, // movable-view的坐标
				y: 0,
				areaHeight: 0, // movable-area的高度
				hidden: true, // movable-view是否隐藏
				currentImg: '', // movable-view的图片地址
				currentIndex: 0, // 要改变顺序的图片的下标
				pointsArr: [], // 每张图片的坐标
				flag: true, // 是否是长按
				scrollTop: 0, // 滚动条距离顶部的距离
				tags: [],
				location: [],
				topic: '选择圈子',
				format: 'video',
				videoDuration: 60,
				video: '',
			}
		},
		onLoad() {},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop;
		},

		methods: {
			onContentInput: function(t) {
				this.textinput = t.detail.value;
			},

			upVideo: function() {
				var t = this;
				uni.chooseVideo({
					sourceType: ["album", "camera"],
					compressed: !0,
					success: function(a) {
						uni.showLoading({
							title: '正在上传',
						})
						let filePath = a.tempFilePath,
							o = a.duration,
							n = a.size;
						if (o > t.videoDuration) {
							that.$refs.uToast.show({
								title: "暂不支持60秒以上视频",
								type: 'error',
							})
							return;
						}
						if (n > 40971520) {
							that.$refs.uToast.show({
								title: "暂不支持40M以上视频",
								type: 'error',
							})
							return;
						}
						t.uploadVideoToMedia(filePath);

					},
					fail: function(a) {}
				});
			},


			uploadVideoToMedia: function(file) {
				let t = this
				API.uploadMedia(file).then(res => {
						console.log(res.url);
						t.video = res.url;

						uni.hideLoading()
						t.$refs.uToast.show({
							title: "视频添加成功",
							type: 'success',
						})
					})
					.catch(err => {
						if (err.message == "未授权登录用户,不能上传") {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否前往登陆?',
								success: function(res) {
									if (res.cancel) {
									t.$refs.uToast.show({
										title: "取消登录",
										type: 'success',
									})
									} else {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}
								},
								fail: function(err) {
									console.log(err)
								}
							})
						}
						uni.hideLoading()
						t.$refs.uToast.show({
							title: "视频添加失败",
							type: 'error',
						})
					})
			},

			addImage: function() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						uni.showLoading({
							title: '图片上传中...'
						})
						API.upLoadImage(res.tempFilePaths[0]).then(data => {
							console.log(data.url);
							uni.hideLoading();
							if (data.status == 200) {
								that.$refs.uToast.show({
									title: "上传成功",
									type: 'success',
								})
								that.imagesubject.push(data.url);


							}
						}).catch(err => {
							if (err.message == "未授权登录用户,不能上传") {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}
						})
					}
				});
			},

			onTopicClick: function() {
				uni.navigateTo({
					url: '../circle/circle'
				})
			},

			onLocationClick: function() {
				var t = this;
				uni.chooseLocation({
					success: function(a) {
						console.log(a)
						t.location = {
							latitude: a.latitude,
							longitude: a.longitude,
							address: a.address,
							name: a.name
						}
					}
				});
			},

			onTagClick: function() {
				uni.navigateTo({
					url: '../tag/tag'
				})
			},

			creatForums: function() {
				let that = this;
				let content = this.textinput
				let images = this.imagesubject
				let type = this.type;
				let topic = this.topic;
				let title = this.title;
				let tags = "";
				let args = {}

				if (this.imagesubject.length == 0) {
					that.$refs.uToast.show({
						title: '请选择封面',
						type: 'error',
					})
					return;
				}
				if (this.tags.length > 1) {
					tags = this.tags.join(',');
				} else {
					tags = this.tags[0];
				}
				args.meta = {}
				args.meta.custom = this.custom
				if (this.isAddNetDisk) {
					if (this.NetDiskLink[0].link == "") {
						that.$refs.uToast.show({
							title: '请输入链接',
							type: 'error',
						})
						return
					} else {
						args.meta.NetDisk = this.NetDiskLink
					}
				}


				if (!this.anonymity) {
					args.meta.anonymity = 1
				}

				if (content == '' || content == null) {
					that.$refs.uToast.show({
						title: '内容不能为空',
						type: 'error',
					})
					return
				}
				if (title == '' || title == null) {
					title = content.slice(0, 20);
				}
				if (topic == '' || topic == null) {
					that.$refs.uToast.show({
						title: '请选择分类',
						type: 'error',
					})
					return
				}

				if (this.location) {
					args.longitude = this.location.longitude;
					args.latitude = this.location.latitude;
					args.location = this.location.address
				}
				if (this.video) {
					args.video = this.video
				}
				args.title = title
				args.circle = topic
				args.category = topic
				args.type = 'forums'
				args.format = this.format
				args.content = content
				args.images = images
				args.topic = tags

				if (!this.user) {
					uni.navigateTo({
						url: "../../login/login"
					})
				} else {
					uni.showLoading({
						title: "正在发布",
						mask: true,
					})
					API.addForums(type, args).then(res => {
							if (res.status === 200) {
								uni.hideLoading();
								setTimeout(function() {
									that.$refs.uToast.show({
										title: res.message,
										type: 'success',
									})
								}, 900)
								uni.navigateBack({
									delta: 3
								})
							} else {
								that.$refs.uToast.show({
									title: '发布失败，请稍后重试',
									type: 'error',
								})
							}
						})
						.catch(err => {
							that.$refs.uToast.show({
								title: res.message,
								type: 'error',
							})
							if (err.message == "未授权登录用户不能发布内容") {
								uni.navigateTo({
									url: '../../login/login'
								})
							}
							uni.hideLoading();
						})
				}
			}
		}
	}
</script>

<style>
	.top {
		position: fixed;
		/* #ifdef H5 */
		top: 88rpx;
		/* #endif */
		/* #ifdef MP|| APP */
		top: 0;
		/* #endif */
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 32rpx;
		background: #FFFFFF;
		z-index: 100;
		margin-top: 2rpx;
	}

	.top .top-button-cancel {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #999999;
		padding-right: 32rpx;
	}

	.top .top-button-confirm {
		font-size: 28rpx;
		color: #fff;
		padding: 10rpx 30rpx;
		background: #007aff;
		border-radius: 10rpx;
	}

	/** 内容输入 */
	.content-text {
		margin-top: 88rpx;
		width: 100%;
		height: 304rpx;
		padding: 32rpx 32rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #333333;
	}

	.anonymity {
		font-size: 28rpx;
		position: absolute;
		right: 20rpx;
		top: 330rpx;
		z-index: 99;
		color: #8c8c8c;
		display: flex;
		align-content: center;
	}

	.anonymity .anonymity-text {
		padding-right: 20rpx;
	}

	.image-drag-container {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.movable-area {
		width: 100%;
	}

	.image-choose-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.image-choose-container>view {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(248, 248, 248, 1);
		border-radius: 12rpx;
		box-sizing: border-box;
		overflow: hidden;
		font-size: 58rpx;
		color: #626262;
	}

	.image-choose-container .image-item-temp {
		height: 0;
		background: transparent;
	}

	.image-choose-container>view image {
		width: 100%;
		height: 100%;
	}

	.image-choose-container>view .close {
		position: absolute;
		top: 0;
		right: 0;
		width: 32rpx;
		height: 32rpx;
		font-size: 12rpx;
		text-align: center;
		line-height: 32rpx;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
	}

	.movable-view {
		border: 8rpx solid rgba(239, 130, 0, 1);
		border-radius: 12rpx;
		box-sizing: border-box;
	}

	.movable-view image {
		width: 100%;
		height: 100%;
	}

	.tiptis {
		font-size: 22rpx;
		padding-left: 20rpx;
		color: rgb(109, 109, 109);
	}

	/*** 底部菜单  */

	.bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		box-sizing: border-box;
		margin-top: 40rpx;
	}


	.bottom .bottom-item {
		position: relative;
		width: 100%;
		height: 98rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding: 0 40rpx;
	}

	.bottom .bottom-item-icon {
		width: 24rpx;
		height: 24rpx;
		margin-right: 16rpx;
	}


	.bottom .bottom-item-text {
		max-width: 600rpx;
		line-height: 36rpx;
		font-size: 26rpx;
		color: #666666;
	}

	.bottom .bottom-item-text-selected {
		color: #576B95;
	}

	.bottom .tui-fr {
		position: absolute;
		right: 40rpx;
	}

	.bottom .bottom-item-arrow {
		position: absolute;
		right: 40rpx;
		width: 24rpx;
		height: 24rpx;
	}


	.bottom .address-tag-all-view {
		padding: 20rpx;
		display: flex;
		position: relative;
		flex: row;
		align-items: center;
		flex-wrap: wrap;
	}


	.bottom .tag-view {
		position: relative;
		margin-right: 14rpx;
		height: 46rpx;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
		background-color: #f5f5f5;
	}

	.bottom .tag-text {
		font-size: 22rpx;
		line-height: 22rpx;
		color: #8c8c8c;
		font-weight: 400;
		margin-right: 15rpx;
		white-space: nowrap;
	}

	.bottom .tag-image {
		width: 22rpx;
		height: 22rpx;
		margin: 0rpx 12rpx 0rpx 15rpx;
	}


	.bottom .media-shop {
		position: relative;
		width: 690rpx;
		height: 144rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		border-radius: 8rpx;
		background: #EFEFEF;
		margin-bottom: 30rpx;
		padding: 24rpx 24rpx;
	}

	.bottom .shop-image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 8rpx;
	}

	.bottom .shop-text-container {
		width: 490rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		box-sizing: border-box;
		margin-left: 20rpx;
	}

	.bottom .shop-text1 {
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.bottom .shop-text2 {
		font-size: 20rpx;
		color: #ee2727;
		margin-top: 8rpx;
	}

	.video {
		display: flex;
		flex-direction: row;
		margin: 30rpx;
		box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, .1);
		border-radius: 20rpx;
		align-items: center;
		justify-content: flex-start;
		padding: 20rpx 60rpx;
	}

	.video .image {
		width: 90rpx;
		height: 90rpx;
	}

	.video .image image {
		width: 90rpx;
		height: 90rpx;

	}

	.video .text {
		padding-left: 20rpx;
	}

	.videoplay {
		padding: 20rpx;
	}

	.videoplay .videos {
		width: 100%;
		height: 386rpx;
	}

	.videofeture {
		width: 200rpx;
		height: 60rpx;
		text-align: center;
		background: #f2f2f2;
		color: #434343;
	}

	.videofeture text {
		line-height: 60rpx;
	}
</style>
