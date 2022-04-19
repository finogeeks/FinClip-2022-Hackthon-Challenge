<template>
	<view class="content">
		<view class="top">
			<text @tap="onCancelButton" class="top-button-cancel">取消</text>
			<text @tap="creatForums" class="top-button-confirm">发布</text>
		</view>
		<textarea @input="onContentInput" class="content-text" maxlength="3000" placeholder="输入要发布的内容"
			:value="textinput"></textarea>
		<view class="addimage" @tap="addPictures" v-if="imagesubject==''">
			<view>
				<image src="/static/images/plus.png" mode="aspectFill"></image>
			</view>
			<view>
				<text>添加封面</text>
			</view>
		</view>
		<view class="addedimage" @tap="addPictures" v-else>
			<image class="addimages" :src="imagesubject" mode="aspectFill"></image>
		</view>
		<!-- 扩展字段  -->
		<view class="enroll-info">
			<view class="custom-panel">
				<view class="custom-item" :class="index==0?'current':''" v-for="(item,index) in custom" :key="index">
					<view class="delete" v-if="index!==0">
						<image @tap="deleteCustom(index)" src="/static/images/icon_delete_buoy.png"></image>
					</view>
					<view class="custom-content">
						<view class="count-panel current">
							<label>名称</label>
							<view class="prize-name-box">
								<input @input="inputName" :data-index="index" class="prize-name" maxlength="20"
									placeholder="请输入字段名称" placeholderStyle="color: #ccc;" :value="item.name"></input>
							</view>
						</view>
						<view class="count-panel">
							<label>内容</label>
							<view class="count-body">
								<input @input="inputValue" :data-index="index" class="prize-name" maxlength="40"
									placeholder="请输入字段内容" placeholderStyle="color: #ccc;" :value="item.value"></input>
							</view>
						</view>
					</view>
				</view>
				<view @tap="addCustom" v-if="custom.length>0" class="btn-add-panel">
					<image src="/static/images/plus.png"></image>
					<view>增加字段</view>
				</view>
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
				currentImg: '', // movable-view的图片地址
				currentIndex: 0, // 要改变顺序的图片的下标
				pointsArr: [], // 每张图片的坐标
				flag: true, // 是否是长按
				scrollTop: 0, // 滚动条距离顶部的距离
				tags: [],
				location: [],
				topic: '选择圈子',
				format: 'standard',
				custom: [{
					name: '',
					value: ''
				}]
			}
		},
		onLoad() {
			this._handleComputedImage();
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

			addPictures: function() {
				let that = this;
				this.imagesubject = [];
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));

						res.tempFilePaths.forEach(v => {
							uni.showLoading({
								title: '图片上传中...'
							})
							API.uploadMedia(v).then(data => {
								that.imagesubject.push(data.url);
								uni.hideLoading();

							}).catch(err => {
								if (err.message == "未授权登录用户,不能上传") {
									uni.hideLoading();
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
			 * 输入自定义名称
			 */
			inputName: function(t) {
				var index = t.currentTarget.dataset.index;
				this.custom[index].name = t.detail.value
			},
			/**
			 * 输入自定义内容
			 */
			inputValue: function(t) {
				var index = t.currentTarget.dataset.index;
				this.custom[index].value = t.detail.value

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

			/**
			 * 新增自定义选项
			 */
			addCustom: function() {
				let that = this;
				if (this.custom.length > 20) {
					that.$refs.uToast.show({
						title: "最多只能添加20个",
						type: 'error',
					})
				} else {
					this.custom.push({
						name: "",
						value: "",
					})
				}
			},

			/**
			 * 删除自定义字段
			 */
			deleteCustom: function(index) {
				console.log(index);
				this.custom.splice(index, 1);
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
				if (this.isAddNetDisk) {
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
				args.title = title
				args.circle = topic
				args.category = topic
				args.type = 'forums'
				args.format = this.format
				args.content = content
				args.images = images
				args.topic = tags
				args.meta.custom = this.custom

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
										duration: 2000,
									})
								}, 900)
								uni.navigateBack({
									delta: 3
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '发布失败，请稍后重试'
								})
							}
						})
						.catch(err => {
							that.$refs.uToast.show({
								title: res.message,
								type: 'success',
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
		/* #ifdef MP */
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

	/** 自定义字段  **/


	.enroll-info {
		padding-bottom: 200rpx;
	}

	.enroll-info .label {
		font-size: 30rpx;
		color: #666;
		padding: 30rpx 30rpx;
	}


	.enroll-info .custom-item {
		position: relative;
		margin: 30rpx;
		background: #fdfdfd;
		border: 2rpx solid #F1F1F1;
		border-radius: 20rpx;
	}


	.enroll-info .custom-item::after {
		content: '';
		clear: both;
	}


	.enroll-info .custom-content {
		position: relative;
	}

	.enroll-info .custom-contents {
		margin-left: 84rpx;
	}

	.enroll-info .custom-contents.current {
		margin-left: 30rpx;
	}


	.enroll-info .count-panel {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #333;
		padding: 30rpx;
	}

	.enroll-info .prize-name-box {
		font-size: 28rpx;
	}

	.enroll-info .count-body {
		font-size: 28rpx;
	}

	.enroll-info .count-panel.current {
		border-bottom: 2rpx solid #f5f5f5;
	}

	.enroll-info .count-panel label {
		font-size: 24rpx;
	}

	.enroll-info .count-body {
		display: flex;
		padding-left: 20rpx;
	}

	.btn-add-panel {
		display: flex;
		height: 70rpx;
		border-radius: 10rpx;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		width: 240rpx;
		margin: 30rpx auto 0;
		border: 2rpx rgb(134, 134, 134) solid;
		overflow: hidden;
	}

	.btn-add-panel image {
		width: 26rpx;
		height: 26rpx;
		margin: 0 10rpx 0 40rpx;
	}

	.btn-add-panel view {
		font-size: 32rpx;
		color: rgb(116, 116, 116);
	}

	.delete {
		position: absolute;
		width: 45rpx;
		height: 45rpx;
		top: -20rpx;
		left: -20rpx;
		z-index: 100;
	}

	.delete image {
		width: 100%;
		height: 100%;
	}

	.addimage {
		margin: 0 30rpx;
		width: 690rpx;
		height: 286rpx;
		background: #f9f9f9;
		text-align: center;
		padding-top: 100rpx;
		border-radius: 20rpx;
	}

	.addimage image {
		width: 40rpx;
		height: 40rpx;
	}

	.addimages {
		border-radius: 20rpx;
		margin: 0 30rpx;
		width: 690rpx;
		height: 286rpx;
	}
</style>
