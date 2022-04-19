<template>
	<view class="content">
		<view class="top-container">
			<button class="top-button" open-type='contact'></button>
			<image class="top-icon" src="/static/images/icon_notification_blue.png"></image>
			<text class="top-text">联系管理员，获取更多圈子建议和意见</text>
			<image class="top-icon-arrow" src="/static/images/icon_small_enter_blue.png"></image>
		</view>

		<!-- 表单内容 -->
		<view class="content-container" style="padding-bottom: 142rpx;">
			<view @tap="uploadImage" class="logo-container">
				<image class="logo-add" src="/static/images/icon_camera_black.png" v-if="imagesubject==null"></image>
				<block v-else>
					<image class="logo-image" mode="aspectFill" :src="imagesubject"></image>
					<image class="logo-camera" src="/static/images/icon_camera.png"></image>
				</block>
			</view>
			<view class="item">
				<text class="item-title">圈子名称</text>
				<input @input="onInputChange" :data-type="1" class="item-input" focus="true" :maxlength="nameMaxLength"
					placeholder="请输入圈子名称" :value="circleName"></input>
				<text class="item-tip">{{nameLength}}/{{nameMaxLength}}</text>
			</view>
			<view class="item-divider" style="width: 100%;height: 0.5px;background: #EDEDED;"></view>
			<view class="item">
				<text class="item-title">圈子简介</text>
				<textarea @input="onInputChange" :data-type="2" class="item-area" :maxlength="descMaxLength"
					placeholder="请输入圈子简介" :value="circleDesc"></textarea>
				<text class="item-tip">{{descLength}}/{{descMaxLength}}</text>
			</view>

			<view class="item-divider" style="width: 100%;height: 0.5px;background: #EDEDED;"></view>
			<view class="item-h">
				<text class="item-title">选择父分类</text>
				<picker @change="bindPickerChange" mode="selector" :value="index" :range="cats" range-key="name">
					<view class="picker">
						{{cats[index].name}}>
					</view>
				</picker>
			</view>
			<view class="item-divider" style="width: 100%;height: 0.5px;background: #EDEDED;"></view>
			<text
				class="bottom-tip-text">请认真仔细阅读《圈主协议》，若所见圈子内涉及时政，色情，暴力，无资质荐股，推币等违法内容传播，官方将立即永久封停圈子和账号，请各用户自觉遵守国家法律和平台规则。</text>
		</view>
		<view class="bottom">
			<image @tap="onProtocolChange" class="bottom-radio"
				:src="protocolChecked?'/static/images/icon_agree_protocol_pressed.png':'/static/images/icon_agree_protocol_default.png'">
			</image>
			<text class="bottom-radio-text">我已阅读同意</text>
			<text @tap="onProtocolClick" class="bottom-radio-text" style="color: #2F78FF">《圈主协议》 </text>
			<text @tap="creatCircle" class="bottom-button" style="background-color: #2F78FF;">确定</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				imagesubject: null,
				nameMaxLength: 100,
				descMaxLength: 100,
				nameLength: 0,
				descLength: 0,
				index: 0,
				cats: [{
					name: '请选择分类'
				}],
				circleDesc: '',
				circleName: '',
				name: '',
				parent:0,
				protocolChecked: false,
			}
		},
		onLoad() {
			this.getCircleLists({
				parent: 0,
			});
		},
		methods: {
			uploadImage: function() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							title: '图片上传中...'
						})
						API.upLoadImage(res.tempFilePaths[0]).then(data => {
							uni.hideLoading();
							if (data.status == 200) {
								that.$refs.uToast.show({
									title: '上传成功',
									type: 'success',
								})
								that.imagesubject = data.url;


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
			/**查看圈主协议 */
			onProtocolClick: function() {
				uni.navigateTo({
					url: '/pages/circle/Protocol/Protocol',
				})
			},
			/**同意圈主协议 */
			onProtocolChange: function() {
				this.protocolChecked = !this.protocolChecked
			},
			getCircleLists: function(args) {
				API.getCircleList(args).then(res => {
						this.parent = res[0].id;
						this.cats = res;
					})
					.catch(err => {
						console.log(err)
					})
			},

			creatCircle: function(data) {
				let that = this;
				if (!this.protocolChecked) {
					that.$refs.uToast.show({
						title: '请阅读并确定圈主协议',
						type: 'error',
					})
					return
				}
				if (this.imagesubject == null) {
					that.$refs.uToast.show({
						title: '请上传封面',
						type: 'error',
					})
					return
				}
				if (this.circleName == "") {
					that.$refs.uToast.show({
						title: '请输入圈子名称',
						type: 'error',
					})
					return
				}
				if (this.circleDesc == "") {
					that.$refs.uToast.show({
						title: '请输入圈子描述',
						type: 'error',
					})
					return
				}
				uni.showLoading({
					title: '创建圈子中'
				});
				let datas = {
					name: this.circleName,
					parent: this.parent,
					cover: this.imagesubject,
					description: this.circleDesc,
				}
				API.creatCircles(datas).then(res => {
					uni.hideLoading({
						success: (res) => {
							that.$refs.uToast.show({
								title: res.message,
								type: 'success',
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 3
								})
							}, 3000)
						},
					})


				}).catch(err => {
					uni.hideLoading();
					that.$refs.uToast.show({
						title: '您已创建过圈子了',
						type: 'success',
					})
				})


			},
			/**选择圈子分类 */
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value;
				this.parent = this.cats[e.detail.value].id;

			},
			onInputChange: function(t) {
				var a = t.currentTarget.dataset.type,
					o = t.detail.value;
				if (1 == a) {
					this.circleName = o;
					this.nameLength = o.length;
				} else if (2 == a) {
					this.circleDesc = o;
					this.descLength = o.length;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-container {
		position: relative;
		width: 100%;
		height: 72rpx;
		background: #F2F8FF;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding: 0 32rpx;

		.top-button {
			width: 100%;
			height: 72rpx;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}

		.top-icon {
			width: 32rpx;
			height: 32rpx;
		}

		.top-text {
			line-height: 28rpx;
			font-size: 24rpx;
			color: #2F86F6;
			margin-left: 16rpx;
		}

		.top-icon-arrow {
			position: absolute;
			right: 32rpx;
			width: 28rpx;
			height: 28rpx;
		}
	}

	.content-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;

		.logo-container {
			position: relative;
			width: 200rpx;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			background: #F7F7F7;
			border-radius: 24rpx;
			margin-top: 40rpx;
			margin-bottom: 54rpx;
		}

		.logo-add {
			width: 64rpx;
			height: 64rpx;
		}

		.logo-image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 24rpx;
		}

		.logo-camera {
			position: absolute;
			right: -20rpx;
			bottom: -20rpx;
			width: 72rpx;
			height: 72rpx;
		}
	}

	.item {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		box-sizing: border-box;
		padding-top: 34rpx;
		padding-right: 32rpx;

		.item-title {
			font-size: 32rpx;
			color: #111111;
			font-weight: 500;
		}

		.item-input {
			width: 100%;
			height: 94rpx;
			line-height: 94rpx;
			font-size: 32rpx;
			color: #333333;
		}

		.item-tip {
			position: absolute;
			top: 36rpx;
			right: 32rpx;
			font-size: 24rpx;
			color: #AAAAAA;
		}

	}


	.item-area {
		width: 100%;
		height: 250rpx;
		font-size: 32rpx;
		color: #333333;
		box-sizing: border-box;
		padding: 32rpx 0;
	}

	.bottom-tip-text {
		width: 100%;
		font-size: 24rpx;
		color: #999999;
		padding-right: 32rpx;
		box-sizing: border-box;
		margin-top: 32rpx;
	}


	.item-h {
		width: 100%;
		height: 112rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding-right: 32rpx;

		.item-title {
			font-size: 32rpx;
			color: #111111;
			font-weight: 500;
		}
	}

	.item-h-high {
		position: relative;
		height: 144rpx;
	}


	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 32rpx;
		background: #FFFFFF;
		box-shadow: 0px -1px 4px 0px rgba(197, 202, 213, 0.25);
	}

	.bottom-radio {
		width: 68rpx;
		height: 68rpx;
		padding: 22rpx 22rpx;
		box-sizing: border-box;
		margin-left: -17rpx;
		margin-right: -17rpx;
	}

	.bottom-radio-text {
		height: 68rpx;
		line-height: 68rpx;
		font-size: 24rpx;
		color: #999999;
		margin-left: 7rpx;
	}

	.bottom-button {
		position: absolute;
		right: 32rpx;
		width: 176rpx;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		background: rgba(47, 120, 255, 1);
		border-radius: 4rpx;
		text-align: center;
	}

	.picker {
		color: #353535;
		font-size: 28rpx;
	}
</style>
