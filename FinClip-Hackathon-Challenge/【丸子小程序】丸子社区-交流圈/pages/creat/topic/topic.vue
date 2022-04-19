<template>
	<view class="content">
		<view class="top">
			<text @tap="onCancelButton" class="top-button-cancel">取消</text>
			<text @tap="creatForums" class="top-button-confirm">发布</text>
		</view>
		<textarea @input="onContentInput" class="content-text" maxlength="3000" placeholder="输入要发布的内容"
			:value="textinput" v-if="format!=='quote'"></textarea>
		<view class="image-drag-container" v-if="format!=='quote'">
			<movable-area class="movable-area" :style="'min-height:'+imageWitdh+'px;height:'+areaHeight+'px'">
				<view class="image-choose-container">
					<view class="image-item" :style="'width:'+imageWitdh+'px;height:'+imageWitdh+'px'"
						v-for="(item,index) in imagesubject" :key="index" @longpress='handleLongTap' :data-url="item"
						:data-index="index" @touchend='handleTouchEnd' @touchmove='handleTouchMove'>
						<image :src="item" mode="aspectFill" @tap="handlePreview(index)"></image>
						<view class="close" @tap="onPictureDelete(index)">X</view>
					</view>
					<view class="add-button" :style="'width:'+imageWitdh+'px;height:'+imageWitdh+'px'"
						v-if="imagesubject.length >= 0 &&imagesubject.length < 9" @tap="addPictures">+
					</view>
					<view :style="'width:'+imageWitdh+'px'" class="image-item image-item-temp"
						v-if="imagesubject.length%3==1"></view>
				</view>
				<movable-view class="movable-view" :style="'width:'+imageWitdh+'px;height:'+imageWitdh+'px'"
					:hidden="hiddens" :x="x" :y="y" direction="all" damping="5000" friction="1">
					<image :src="currentImg" mode="aspectFill" v-if="currentImg.length>0"></image>
				</movable-view>
			</movable-area>
		</view>
		<view class="bottom" :style="format=='quote'?'padding-top:80rpx':''">
			<view class="bottom-divider" style="width: 670rpx;height: 0.5px;background: #EDEDED;"></view>
			<view @tap="onTopicClick" class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/activity_page_circle.png"></image>
				<text class="bottom-item-text">{{topic==''?'选择圈子':topic}}</text>
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
			<view class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/icon_publish_shop.png"></image>
				<text class="bottom-item-text">是否显示</text>
				<switch class="tui-fr" style="zoom:0.7;" color="#007aff" :checked="anonymity" @change="changeSwitch" />
			</view>
			<view class="bottom-item">
				<image class="bottom-item-icon" src="@/static/images/icon_publish_shop.png"></image>
				<text class="bottom-item-text">添加网盘</text>
				<switch class="tui-fr" style="zoom:0.7;" color="#007aff" :checked="network" @change="changeNetWork" />
			</view>
		</view>
		<view class="jz-big-video-edit-container" v-if="addNetWork">
			<view class="jz-big-video-edit-content" style="padding-bottom:80rpx;">
				<input @input="onEditNetDiskLink" class="jz-big-video-edit-input" cursorSpacing="295rpx" maxlength="200"
					placeholder="请输入网盘链接" :value="NetDiskLink[0].link"></input>
				<input @input="onEditNetDiskPsw" class="jz-big-video-edit-input" cursorSpacing="295rpx" maxlength="10"
					placeholder="请输入提取码" :value="NetDiskLink[0].psw"></input>
				<text class="jz-big-video-edit-input-tip">1.目前仅支持百度网盘链接；</text>
				<text @tap="onConfirmDiskButton" class="jz-big-video-edit-button">确定</text>
			</view>
			<image @tap="colseNetDisk" class="jz-big-video-edit-delete" src="/static/images/icon_delete_buoy.png">
			</image>
		</view>
		<u-parse :show-with-animation="true" :html="textinput" ref="article" :tag-style="tagStyle"
			v-if="format=='quote'"></u-parse>
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
				network: false,
				addNetWork: false,
				imagesubject: [],
				textinput: '',
				currentImg: [],
				imageWitdh: 0,
				NetDiskLink: [{
					link: '',
					psw: '',
				}],
				x: 0, // movable-view的坐标
				y: 0,
				areaHeight: 0, // movable-area的高度
				hiddens: true, // movable-view是否隐藏
				currentImg: '', // movable-view的图片地址
				currentIndex: 0, // 要改变顺序的图片的下标
				pointsArr: [], // 每张图片的坐标
				flag: true, // 是否是长按
				scrollTop: 0, // 滚动条距离顶部的距离
				tags: [],
				location: [],
				topic: '',
				format: 'standard',
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				}
			}
		},
		onLoad(options) {
			this._handleComputedImage();
			if (options.url) {
				this.jumpAnalysis({
					url: options.url
				});
			}
			if (options.topic) {
				this.topicids = options.topicid;
				this.topic = options.topic;
			}
		},
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
			_handleComputedImage: function(e) {
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				const width = windowWidth - 16;
				this.imageWitdh = (width - 16) / 3;
			},
			_handleComputedArea: function(e) {
				let that = this;
				uni.createSelectorQuery().selectAll('.image-drag-container').boundingClientRect(function(rect) {
					that.areaHeight = rect[0].height + 30;
				}).exec()
			},

			onContentInput: function(t) {
				this.textinput = t.detail.value;
			},


			onPictureDelete: function(index) {
				this.imagesubject.splice(index, 1);
			},

			addPictures: function() {
				let that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));

						res.tempFilePaths.forEach(v => {
							uni.showLoading({
								title: '图片上传中...'
							})
							API.uploadMedia(v).then(data => {
								console.log(data);
								that.imagesubject.push(data.url);
								uni.hideLoading();
								that._handleComputedArea();

							}).catch(err => {
								console.log(err);
								if (err.message == "未授权登录用户,不能上传") {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}
							})
						})

					}
				});
			},

			/**
			 * 网盘链接监听
			 */
			onEditNetDiskLink: function(t) {
				let NetDiskLink = t.detail.value;
				this.NetDiskLink[0].link = NetDiskLink;
			},
			/**
			 * 网盘提取码监听
			 */
			onEditNetDiskPsw: function(t) {
				let NetDiskPsw = t.detail.value;
				this.NetDiskLink[0].psw = NetDiskPsw;
			},


			/* 解析链接 */

			jumpAnalysis: function(data) {
				let that = this;
				API.getShareLink(data).then(res => {
					if (res.status === 200) {
						this.analyzeRes = true
						this.title = res.title

						if (res.type == "video") {
							this.video = res.video;
							this.imagesubject.push(res.thumbnail);
							this.textinput = res.content
							this.format = 'video'
							this.type = 'forums'
							this.videopath = res.video1
							this.mediaType = 1;
							setTimeout(that._handleComputedArea(), 5000);
						}
						if (res.type == "forum") {
							console.log(13423);
							if(res.source=="minredbook")
							{
								let images=[];
								for(let i=0;i<res.thumbnail.length;i++){
									images.push('https:'+res.thumbnail[i].url)
								}
								this.imagesubject =images
								this.thumbnail = images[0]
							}else{
								this.imagesubject = res.thumbnail
								this.thumbnail = res.thumbnail[0]
								
							}
							
							this.textinput =res.title+res.content;
							this.type = 'forums'
							this.format = "standard"
							this.areaHeight = 300;
						}
						if (res.type == "post") {
							this.title = res.title
							this.textinput = res.content
							this.type = 'forums'
							this.format = "quote"
						}


					}
					uni.hideLoading()
				})


			},

			onTopicClick: function() {
				uni.navigateTo({
					url: '../circle/circle'
				})
			},
			changeSwitch: function(e) {
				this.anonymity = e.detail.value;
			},
			// 计算每张图片的坐标
			_handleComputedPoints(e) {
				let that = this;
				var query = uni.createSelectorQuery();
				var nodesRef = query.selectAll(".image-item");
				nodesRef.fields({
					dataset: true,
					rect: true
				}, (result) => {
					that.pointsArr = result
				}).exec()
			},

			// 长按图片
			handleLongTap: function(e) {
				// 计算每张图片的坐标
				console.log(e);
				this._handleComputedPoints();
				this.currentImg = e.currentTarget.dataset.url;
				this.currentIndex = e.currentTarget.dataset.index;
				this.hiddens = false;
				this.flag = true;
				this.x = e.currentTarget.offsetLeft;
				this.y = e.currentTarget.offsetTop;
			},

			// 移动的过程中
			handleTouchMove: function(e) {
				let x = e.touches[0].pageX;
				let y = e.touches[0].pageY;
				// 首先先获得当前image-choose-container距离顶部的距离
				let that = this;
				uni.createSelectorQuery().selectAll('.image-choose-container').boundingClientRect(function(rect) {
					let top = rect[0].top;
					y = y - that.scrollTop - top;
					that.x = x;
					that.y = y;

				}).exec()
			},

			// 移动结束的时候
			handleTouchEnd: function(e) {
				if (!this.flag) {
					// 非长按情况下
					return;
				}
				let x = e.changedTouches[0].pageX;
				let y = e.changedTouches[0].pageY - this.scrollTop;
				const pointsArr = this.pointsArr;
				let data = this.imagesubject;
				for (var j = 0; j < pointsArr.length; j++) {
					const item = pointsArr[j];
					if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
						const endIndex = item.dataset.index;
						const beginIndex = this.currentIndex;
						//临时保存移动的目标数据
						let temp = data[beginIndex];
						//将移动目标的下标值替换为被移动目标的下标值
						data[beginIndex] = data[endIndex];
						//将被移动目标的下标值替换为beginIndex
						data[endIndex] = temp;
					}
				}
				this.imagesubject = data;
				this.hiddens = true;
				this.flag = false;
				this.currentImg = '';
			},

			changeNetWork: function(e) {
				this.network = e.detail.value;
				this.addNetWork = true;
				uni.getClipboardData({
					success: (option) => {

						var reg = /链接：(.*)/;
						var link = reg.exec(option.data)[1].trim();
						var reg1 = /提取码：(.*)/;
						var key = reg1.exec(option.data)[1].trim();
						if (link != null) {
							uni.showModal({
								title: '检测到网盘链接',
								content: '是否直接导入',
								showCancel: true, //是否显示取消按钮
								cancelText: "取消", //默认是“取消”
								confirmText: "导入", //默认是“确定”
								success: function(res) {
									if (res.cancel) {
										//点击取消,默认隐藏弹框
									} else {
										//点击确定
										this.NetDiskLink = [{
											link: link,
											psw: key,
										}]
									}
								},
								fail: function(res) {}, //接口调用失败的回调函数
								complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
							})
						}
					},
				})
			},


			colseNetDisk: function(e) {
				this.addNetWork = false;
				this.network = false;
			},

			onConfirmDiskButton: function() {
				this.addNetWork = false;
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
			handlePreview: function(index) {
				uni.previewImage({
					urls: this.imagesubject,
					current: index
				})
			},

			creatForums: function() {
				console.log(12);
				let that = this;
				let content = this.textinput
				let images = this.imagesubject
				let type = this.type;
				let topic = this.topic;
				let title = this.title;
				let tags = "";
				let args = {}

				if (this.tags.length > 1) {
					tags = this.tags.join(',');
				} else {
					tags = this.tags[0];
				}
				args.meta = {}
				args.meta.custom = this.custom
				if (this.network) {
					if (this.NetDiskLink[0].link == "") {
						uni.showModal({
							title: '提示',
							content: '链接不能为空'
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
					uni.showModal({
						title: '提示',
						content: '内容不能为空'
					})
					return
				}
				if (title == '' || title == null) {
					title = content.slice(0, 20);
				}
				if (topic == '' || topic == null) {
					uni.showModal({
						title: '提示',
						content: '请选择分类'
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
								that.$refs.uToast.show({
									title: res.message,
									type: 'success',
								})
								setTimeout(function() {
									uni.navigateBack({
										delta: 3
									})
								}, 3000)

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

	.jz-big-video-edit-bg {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.jz-big-video-edit-bg-hidden {
		opacity: 0;
		transform: scale3d(1, 1, 0);
	}

	.jz-big-video-edit-container {
		position: fixed;
		z-index: 1000;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		box-sizing: border-box;
		background: #FFFFFF;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		box-shadow: 24rpx 24rpx 24rpx 24rpx rgba(0, 0, 0, .08);
	}

	.jz-big-video-edit-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 62rpx 32rpx;
		padding-bottom: 20rpx;
	}

	.jz-big-video-edit-input {
		width: 100%;
		height: 96rpx;
		line-height: 56rpx;
		font-size: 28rpx;
		color: #333333;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		background: #F8F8F8;
		margin-top: 40rpx;
	}

	.jz-big-video-edit-input-tip {
		width: 100%;
		line-height: 36rpx;
		font-size: 24rpx;
		color: #2F78FF;
		margin-top: 26rpx;
	}

	.jz-big-video-edit-button {
		width: 686rpx;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		background: #2F78FF;
		text-align: center;
		border-radius: 8rpx;
		margin-top: 44rpx;
	}

	.jz-big-video-edit-delete {
		position: absolute;
		top: 0rpx;
		right: 10rpx;
		width: 80rpx;
		height: 80rpx;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
	}
</style>
