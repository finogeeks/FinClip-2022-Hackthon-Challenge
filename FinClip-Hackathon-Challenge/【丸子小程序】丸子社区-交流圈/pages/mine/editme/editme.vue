<template>
	<view class="content">
		<view class="header">
			<view @tap="addImage" class="background">
				<view class="mask">
				</view>
				<image :src="background" mode=""></image>
			</view>
			<view class="photo" @tap="uploadImage">
				<image :src="userImage" mode="aspectFill" class="avatar"></image>
				<view class="upload">
					<image class="img" src="@/static/images/camera.png"></image>
				</view>
			</view>
		</view>
		<view class="forms">
			<view class="form-item">
				<view class="label">昵称<label class="count void ">{{'（'+(nicksName?nicksName.length:0)+'/20）'}}</label>
				</view>
				<view class="box">
					<input class="text" maxlength="20" placeholder="请输入昵称" v-if="!popupShow"
						v-model="nicksName"></input>
				</view>
			</view>
			<view class="form-item">
				<view class="label">生日<label class="count"></label>
				</view>
				<view class="box">
					<picker class="text" @change="bindDateChange" mode="date" :value="birth">
						<view class="info-text">{{birth}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="label">性别<label class="count"></label>
				</view>
				<view class="box">
					<picker @change="pickSex" :value="gender" class="text" :range="columns">
						<view>
							{{columns[gender]==""?"请输入性别":""}}{{columns[gender]}}
						</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="label">简介<label class="count">{{'（'+(description?description.length:0)+'/120）'}}</label>
				</view>
				<view class="box">
					<textarea :autoHeight="true" class="area high" :holdKeyboard="false" maxlength="120"
						placeholder="请输入..." v-if="!popupShow" v-model="description"></textarea>
					<view :class="!description?'gray':''" v-else>
						<rich-text :nodes="descText"></rich-text>
					</view>
				</view>
			</view>

		</view>
		<view class="submit">
			<button @tap="saveInfo" class="btn" :disabled="!nicksName">保存</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js'
	var app = getApp();
	export default {
		data() {
			return {
				popupShow: false,
				nicksName: '',
				descText: '',
				description: '',
				userImage: '',
				birth: '1970-01-01',
				columns: ["未知", "男", "女"],
				gender: 0,
				background: ''
			}
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				uni.showToast({
					title: '未登录,请登录',
				})
				uni.navigateTo({
					url: '/pages/login/login',
				})
			} else {
				this.getUserMineInfo();

			}
		},
		methods: {
			uploadImage: function() {
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
						API.uploadMedia(res.tempFilePaths[0]).then(data => {
							console.log(data.url);
							uni.hideLoading();
							that.$refs.uToast.show({
								title: '上传成功',
								type: 'success',
							})
							that.userImage = data.url;

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
						API.uploadMedia(res.tempFilePaths[0]).then(data => {
							console.log(data.url);
							that.$refs.uToast.show({
								title: '上传成功',
								type: 'success',
							})
							uni.hideLoading();
							that.background = data.url;

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

			getUserMineInfo: function() {
				API.getMineInfo().then(res => {
						let user = res.user;
						this.userImage = user.avatarUrl;
						this.description = user.description;
						this.nicksName = user.nickName;
						this.birth = user.birthday ? user.birthday : '1970-01-01';
						this.gender = user.gender ? user.gender : 0;
						this.background = user.background;
					})
					.catch(err => {
						console.log(err)
					})

			},

			bindDateChange: function(a) {
				this.birth = a.detail.value
			},
			pickSex: function(e) {
				this.gender = e.detail.value;
			},
			saveInfo: function() {
				let that = this;
				let args = {
					description: this.description,
					nickname: this.nicksName,
					avatar: this.userImage,
					birthday: this.birth,
					gender: this.gender,
					background: this.background

				}
				API.updataUsers(args).then(res => {
					console.log(args);
					console.log(res);
					uni.setStorageSync('user', res.user);
					if (res.access_token) {
						that.$refs.uToast.show({
							title: '用户信息更新成功',
							type: 'success',
						})
						uni.setStorageSync('token', res.access_token);
						uni.setStorageSync('expired_in', Date.now() + parseInt(res.expired_in, 10) * 100000 -
							60000);
						uni.navigateBack({
							delta: 1,
						})
					}
				})


			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		text-align: center;
		margin-bottom: 20rpx;
		position: relative;

		.background {
			wdith: 100%;
			height: 478rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}

			.mask {
				width: 100%;
				height: 478rpx;
				position: absolute;
				top: 0;
				left: 0;
				background-color: #383838;
				opacity: 0.5;
				z-index: 100;
			}
		}

		.photo {
			width: 200rpx;
			height: 200rpx;
			margin: auto;
			top: 180rpx;
			left: 275rpx;
			position: absolute;
			z-index: 1000;

			.avatar {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				margin-bottom: 10rpx;
				background-size: cover;
				border: 10rpx solid #fff;
			}

			.upload {
				width: 48rpx;
				height: 48rpx;
				padding: 10rpx;
				background: #3e3e3f;
				border-radius: 50%;
				position: absolute;
				right: 0;
				bottom: 0;

				.img {
					width: 100%;
					height: 100%;

				}
			}
		}

	}

	.forms {
		padding: 0 30rpx;

		.form-item {
			width: 100%;

			.label {
				margin: 28rpx 0 10rpx;
				color: #4a4a4a;

				.count {
					font-size: 24rpx;
					color: #999;
				}
			}

			.box {
				width: 100%;
				padding: 4rpx 0;
				position: relative;
				z-index: 1;

				.text {
					display: block;
				}

				.area {
					width: calc(100% - 60rpx);
					height: 80rpx;
					line-height: 40rpx;
					display: block;
					background: #f8f8f9;
					border-radius: 12rpx;
					padding: 20rpx 30rpx;
					border: 0;
					font-size: 32rpx;
					vertical-align: middle;
				}

				.high {
					min-height: 300rpx;
					max-height: 560rpx;
					margin-bottom: 40rpx;
					overflow: hidden;
				}

				.text {

					width: calc(100% - 60rpx);
					height: 100rpx;
					line-height: 100rpx;
					background: #f8f8f9;
					border-radius: 12rpx;
					padding: 0 30rpx;
					font-weight: 400;
					font-size: 32rpx;

				}

				.gray {
					color: #888;
				}

			}

		}
	}

	.submit {
		width: 100%;
		background-color: #fff;
		padding: 20rpx 50rpx;
		box-sizing: border-box;
		z-index: 9;

		.btn {
			width: 80%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 50rpx;
			background: #3e3e3f;
			color: #fff;
			font-size: 32rpx;
		}
	}
</style>
