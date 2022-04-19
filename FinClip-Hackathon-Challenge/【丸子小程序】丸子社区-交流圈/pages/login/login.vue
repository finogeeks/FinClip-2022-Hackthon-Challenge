<template>
	<view class="content">
		<view class="back-button" @tap="cancelLogin">
			<image src="/static/images/back.png" mode="widthFix"></image>
		</view>
		<view class="logo-bg-box">
			<view class="logo-bg-box-first">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
			<view class="logo-bg-box-second">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
		</view>
		<view class="logo-box">
			<image class="logo-item" src="@/static/logo.png"></image>
			<view class="site-name">
				{{siteInfo.name}}
			</view>
		</view>


		<view class="login-form phonelogin">
			<!-- #ifdef APP-PLUS||H5 -->
			<u-form-item label="手机 :" label-width="120">
				<u-input placeholder="请输入手机号码" v-model="rephone" />
			</u-form-item>
			<u-form-item label="验证码 :" label-width="120">
				<u-input placeholder="请输入验证码" type="number" v-model="recode" />
				<button class="codebutton" :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
					@tap="sendPhoneCode">{{codeBtn.text}}</button>
			</u-form-item>
			<button type="primary" style="border-radius: 60rpx;" @tap="phoneLogin">登录</button>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<button type="login" style="border-radius: 60rpx;" @tap="getProfile">授权登录</button>
			
			<view class="noLogin" @tap="cancelLogin">
				暂不登录，返回首页
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-TOUTIAO -->
			<button type="login" style="border-radius: 60rpx;" @tap="getTtProfile">授权登录</button>
			
			<view class="noLogin" @tap="cancelLogin">
				暂不登录，返回首页
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-BAIDU||MP-QQ -->
			<button type="login" style="border-radius: 60rpx;" @tap="getTtProfile">授权登录</button>
			
			<view class="noLogin" @tap="cancelLogin">
				暂不登录，返回首页
			</view>
			<!-- #endif -->


			<!-- 其他方式登录 -->
			<view class="login_footer_box">
				<view class="footer_head">
					<view class="hr"></view>
					<text class="footer_title">其他登录方式</text>
					<view class="hr"></view>
				</view>
				<view class="footer_content">
					<!-- #ifdef APP -->
					<view class="login_type_box">
						<image class="login_img" @tap="handleThirdLoginApp" src="/static/icon_weixin.png"></image>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="login_type_box">
						<button class="logos-btn" @tap="getProfile">
						</button>
						<image class="login_img" @tap="goLogin" src="/static/icon_weixin.png"></image>
					</view>
					<!-- #endif -->

					<!-- #ifdef MP-TOUTIAO -->
					<view class="login_type_box">
						<button class="logos-btn" @tap="getTtProfile">
						</button>
						<image class="login_img" @tap="goLogin" src="/static/toutiao.png"></image>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-BAIDU -->
					<view class="login_type_box">
						<button class="logos-btn" @tap="getProfile">
						</button>
						<image class="login_img" @tap="goLogin" src="/static/baidu.png"></image>
					</view>
					<!-- #endif -->

					<!-- #ifdef MP-QQ -->
					<view class="login_type_box">
						<button class="logos-btn" @tap="getProfile">
						</button>
						<image class="login_img" src="/static/icon_qq.png"></image>
					</view>
					<!-- #endif -->

					<view class="login_type_box">
						<image class="login_img" @tap="goLogin" src="/static/user.png"></image>
					</view>


				</view>
			</view>
			<view class="login-bottom">
				<view class="login-title-info">登录即代表您同意<text>《用户协议》</text>和<text>《隐私政策》</text></view>
			</view>


		</view>

		<u-popup v-model="show" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="账号 :">
						<u-input placeholder="请输入账号" v-model="username" />
					</u-form-item>
					<u-form-item label="密码 :">
						<u-input type="password" placeholder="请输入密码" v-model="password" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="login">登陆</button>
				<view class="links">
					<!-- #ifdef APP||H5 -->
					<view @tap="userphonelogin">手机登录</view>
					<view>|</view>
					<!-- #endif -->
					<view @tap="gotoForgetPassword">忘记密码？</view>
					<view>|</view>
					<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
				</view>
			</view>

		</u-popup>
		<u-popup v-model="passShow" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="邮箱 :">
						<u-input placeholder="请输入找回密码的邮箱" v-model="emails" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="getPassWords">找回密码</button>
				<view class="links">
					<view @tap="goLogin">立即登陆</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="registShow" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="邮箱 :" label-width="120">
						<u-input placeholder="请输入邮箱" v-model="reemail" />
					</u-form-item>
					<u-form-item label="验证码 :" label-width="120">
						<u-input placeholder="请输入验证码" v-model="recode" />
						<button class="codebutton" :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
							@tap="sendCode">{{codeBtn.text}}</button>
					</u-form-item>
					<u-form-item label="账号 :" label-width="120">
						<u-input placeholder="请输入账号" v-model="reusername" />
					</u-form-item>
					<u-form-item label="密码 :" label-width="120">
						<u-input type="password" placeholder="请输入密码" v-model="repassword" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="registra">注册</button>
				<view class="links">已有账号？<view class="link-highlight" @tap="goLogin">点此登陆</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				show: false,
				passShow: false,
				registShow: false,
				labelStyle: {
					color: "#434343",
				},
				siteInfo: "",
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				canBack: false,
				username: '',
				password: '',
				emails: '',
				reemail: '',
				recode: '',
				reusername: '',
				repassword: '',
				disableCodeBtn: false,
				captchaImg: '',
				seconds: 60,
				rephone: '',
				custom: {
					'flex-direction': 'row'
				}

			}
		},
		onLoad(options) {
			if (options) {
				this.canBack = options.canBack
			}
			this.getSiteInfo();
		},
		methods: {
			getSiteInfo: function() {
				API.getSiteInfo().then(res => {
						this.siteInfo = res
					})
					.catch(err => {
						console.log(err)
					})
			},
			userphonelogin: function() {
				this.show = false;
				this.registShow = false;
				this.passShow = false;
			},
			goLogin: function() {
				this.show = true;
				this.registShow = false;
				this.passShow = false;

			},
			cancelLogin: function() {
				uni.switchTab({
					url: '../home/home'
				})
			},
			gotoForgetPassword: function() {
				this.show = false;
				this.passShow = true;
			},
			gotoRegistration: function() {
				this.show = false;
				this.registShow = true;
			},
			login: function() {
				let that = this;
				if (this.username == '') {
					that.$refs.uToast.show({
						title: '请输入用户名',
						type: 'error',
					})
					return;
				} else if (this.password == '') {
					that.$refs.uToast.show({
						title: '请输入密码',
						type: 'error',
					})
					return;
				} else if (this.password.length < 6) {
					that.$refs.uToast.show({
						title: '密码应大于6位',
						type: 'error',
					})
					return;
				} else {
					let data = {
						login: this.username,
						password: this.password,
					}
					API.acountlogin(data).then(res => {
						console.log(res);
						let accdata = {
							userLogin: this.username,
							loginCode: this.password,
							avatarUrl: res.user.avatarUrl,
							nickName: res.user.nickName,
						};
						let account = uni.getStorageSync('account');
						console.log(account);
						if (!account) {
							let data = [];
							data.push(accdata);
							uni.setStorageSync('account', data);
						} else {
							let readsave = true
							// 过滤重复值
							if (account.length > 0) {
								for (let i = 0; i < account.length; i++) {
									if (account[i].login == res.user.login) {
										readsave = false
										break;
									}
								}
								console.log(accdata);
								if (readsave) {
									account.push(accdata);
									uni.setStorageSync('account', account);
								}
							}

						}
						getApp().globalData.user = res.user;
						uni.setStorageSync('user', res.user);
						uni.setStorageSync('_USER_OPENID', res.user.openId);
						//uni.setStorageSync('_SESSION_KEY', res.session_key);
						if (res.unionid) {
							uni.setStorageSync('_USER_UNIONID', res.unionid);
						}
						if (res.access_token) {
							uni.setStorageSync('token', res.access_token);
							uni.setStorageSync('expired_in', res.expired_in);
						}
						that.$refs.uToast.show({
							title: "登录成功",
							type: 'success',
						})
						if (this.canBack) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

					}).catch(err => {
						that.$refs.uToast.show({
							title: err.message,
							type: 'error',
						})
					})
				}
			},
			handleThirdLoginApp: function() {
				console.log("App微信拉起授权")
				var that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (res.provider.includes('weixin')) {
							console.log(343);
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log("App微信获取用户信息成功", loginRes);
									that.getApploginData(loginRes) //请求登录接口方法
								},
								fail: function(res) {
									that.$refs.uToast.show({
										title: res.errMsg,
										type: 'error',
									})
									console.log("App微信获取用户信息失败", res);
								}
							})
						}
					}
				});

			},

			getApploginData: function(data) {
				let that = this;
				uni.showLoading({
					title: '正在登录'
				})
				API.loginByWeixin(data).then(res => {
					console.log(res);
					getApp().globalData.user = res.user;
					uni.setStorageSync('user', res.user);
					uni.setStorageSync('_USER_OPENID', res.user.openId);
					//uni.setStorageSync('_SESSION_KEY', res.session_key);
					if (res.unionid) {
						uni.setStorageSync('_USER_UNIONID', res.unionid);
					}
					if (res.access_token) {
						uni.setStorageSync('token', res.access_token);
						uni.setStorageSync('expired_in', res.expired_in);
					}
					that.$refs.uToast.show({
						title: "登录成功",
						type: 'success',
					})
					uni.hideLoading();
					if (this.canBack) {
						uni.navigateBack({
							delta: 1,
						})
					} else {
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}
				})
			},

			phoneLogin: function() {
				let that = this;
				if (this.rephone == '') {
					that.$refs.uToast.show({
						title: '请输入手机号码',
						type: 'error',
					})
					return;
				} else if (this.recode == '') {
					that.$refs.uToast.show({
						title: '请输入验证码',
						type: 'error',
					})
					return;
				} else {
					let data = {
						phone: this.rephone,
						code: this.recode,
					}
					API.phoneLogin(data).then(res => {
						API.storageUser(res);
						uni.showToast({
							title: '登陆成功',
						})
						if (this.canBack) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

					}).catch(err => {
						that.$refs.uToast.show({
							title: err.message,
							type: 'error',
						})
					})
				}
			},
			isphone: function(text) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(text);
			},
			sendPhoneCode: function() {
				let that = this;
				if (this.rephone == '' || !this.isphone(this.rephone)) {
					that.$refs.uToast.show({
						title: '请输入正确的手机号码',
						type: 'error',
					})
					return;
				}

				if (this.codeBtn.waitingCode == false) {
					API.getPhoneCode({
						phone: this.rephone
					}).then(res => {
						console.log(res);
						if (res.status === 200) {
							uni.showToast({
								title: "验证码已发送"
							})
						}
					})
				}
				this.disableCodeBtn = true;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
						this.disableCodeBtn = false;
					}
				}, 1000);
			},
			getPassWords: function() {
				let that = this;
				let data = {
					login: this.emails,
				}
				API.getPassWord(data).then(res => {
					if (res.status == 200) {
						that.$refs.uToast.show({
							title: "密码邮箱已发送",
							type: 'success',
						})
					}
				}).catch(err => {
					that.$refs.uToast.show({
						title: err.message,
						type: 'error',
					})
				})
			},
			registra: function() {
				let that = this;
				if (this.reemail == '') {
					that.$refs.uToast.show({
						title: '请输入邮箱',
						type: 'error',
					})
					return;
				} else if (this.recode == '') {
					that.$refs.uToast.show({
						title: '请输入验证码',
						type: 'error',
					})
					return;
				} else if (this.repassword == '') {
					that.$refs.uToast.show({
						title: '请输入密码',
						type: 'error',
					})
					return;
				} else if (this.reusername == '') {
					that.$refs.uToast.show({
						title: '请输入用户名',
						type: 'error',
					})
					return;
				} else if (this.repassword.length < 6) {
					that.$refs.uToast.show({
						title: '密码应大于6位',
						type: 'error',
					})
					return;
				} else {
					let data = {
						login: this.reusername,
						email: this.reemail,
						code: this.recode,
						password: this.repassword,
					}
					API.getRegistra(data).then(res => {
						console.log(res);
						that.$refs.uToast.show({
							title: '注册成功',
							type: 'success',
						})
						API.storageUser(res);
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}
					}).catch(err => {
						that.$refs.uToast.show({
							title: err.message,
							type: 'error',
						})
					})
				}

			},
			isemail: function(text) {
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				return reg.test(text);
			},
			sendCode: function() {
				let that = this;
				if (this.reemail == '' || !this.isemail(this.reemail)) {
					that.$refs.uToast.show({
						title: '请输入正确的邮箱',
						type: 'error',
					})
					return;
				}

				if (this.codeBtn.waitingCode == false) {
					API.getEmailCode({
						email: this.reemail
					}).then(res => {
						console.log(res);
						if (res.status === 200) {
							that.$refs.uToast.show({
								title: '验证码已发送',
								type: 'success',
							})
						}
					})
				}
				this.disableCodeBtn = true;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
						this.disableCodeBtn = false;
					}
				}, 1000);
			},

			change: function() {
				uni.navigateTo({
					url: '/pages/mine/change/change'
				})
			},

			getTtProfile: function(e) {
				uni.showLoading({
					title: '正在登录...',
				})
				API.getTtProfile().then(res => {
						//console.log(res)
						if (this.canBack == 'true') {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}
						tt.hideLoading()
					})
					.catch(err => {
						console.log(err)
						tt.hideLoading()
					})
			},


			getProfile: function(e) {
				uni.showLoading({
					title: '正在登录!',
					mask: true
				})
				// #ifdef MP-WEIXIN
				API.getProfiles().then(res => {
						if (this.canBack == 'true') {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif
				// #ifdef MP-BAIDU || MP-QQ
				API.getUserInfos(e).then(res => {
						if (this.canBack == 'true') {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif

			},
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #0055ff;

	.content {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #000;
	}

	.logo-bg-box {
		width: 100%;
		height: 9482rpx;
		opacity: .5;
		animation: move 60s linear infinite;

		.logo-bg-box-first,
		.logo-bg-box-second {
			width: 100%;
			height: 50%;
		}

		.login-bg-item-top {
			width: 100%;
			height: 50%;
			background: url(https://wx4.sinaimg.cn/bmiddle/e448bca1ly1gz9dh4shsmj20ku1voajp.jpg);
			background-size: 100% 100%;
		}

		.login-bg-item-bottom {
			width: 100%;
			height: 50%;
			background: url(https://wx4.sinaimg.cn/bmiddle/e448bca1ly1gz9dh4shsmj20ku1voajp.jpg);
			background-size: 100% 100%;
		}

		@-webkit-keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

		@keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	
	button[type="login"] {
		background-color: #F1F1F1;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 90upx;
	}

	.logo-box {
		padding-top: 115rpx;
		position: fixed;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;

		.logo-item {
			display: block;
			width: 100rpx;
			height: 100rpx;
			box-shadow: 0 6rpx 12rpx rgba(255, 255, 255, 0.1);
			border-radius: 100%;
			margin: 0 auto 0rpx;
		}

		.site-name {
			display: block;
			color: #fff;
			text-align: center;
			margin: 20rpx auto 180rpx;
			font-size: 38rpx;
			font-weight: 700;
		}

		.login-btns {
			margin-top: 40rpx !important;
		}

		.logo-btn {
			width: 418rpx;
			height: 88rpx;
			background-color: #fff;
			box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, .08);
			border-radius: 88rpx;
			font-size: 28rpx;
			line-height: 88rpx;
			color: #93b1b1;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;
			margin-top: 250rpx;
			margin-bottom: 20rpx;

			.iconfont {
				font-size: 40rpx;
				margin-right: 20rpx;
			}

			.weixin {
				width: 10rpx;
				height: 10rpx;
				padding-left: 2rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				color: #fff;
				background-color: #0055ff;
			}
		}

		.cancel-login {
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			margin-top: 20rpx;
			z-index: 5;
		}

		.login-title-info {
			font-size: 20rpx;
			color: #fff;
			width: 500rpx;
			margin-top: 100rpx;
			text-align: center;
		}
	}



	.phonelogin {
		background: #fff;
		width: 750rpx;
		height: 800rpx;
		position: fixed;
		border-radius: 30rpx 30rpx 0 0;
		bottom: 0;
		left: 0;
	}

	.login-form {

		padding: 40rpx;

		.codebutton {
			position: absolute;
			font-size: 24upx;
			margin: 0;
			right: 0;
			top: 20rpx;
			width: 180upx;
			text-align: center;
			z-index: 200;

			&:after {
				border: none
			}

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}

	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #434343;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}

		.link-highlight {
			color: #434343;
		}
	}

	.back-button {
		position: fixed;
		top: 80rpx;
		left: 40rpx;
		z-index: 10000;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.login-bottom {
		position: absolute;
		bottom: 60rpx;
		width: 750rpx;
		text-align: center;

		.login-title-info {
			text {
				color: #0055ff;
			}
		}
	}

	.login_footer_box {
		position: fixed;
		left: 80rpx;
		right: 80rpx;
		bottom: 100rpx;
	}

	.footer_head {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.hr {
		height: 1px;
		width: 40upx;
		background-color: #EEEEEE;
		margin: 0 15px;
	}

	.footer_title {
		font-size: 12px;
		color: #c8c8c8;
	}

	.footer_content {
		display: flex;
		flex-direction: row;
		margin: 20rpx;
		justify-content: center;
	}

	.login_type_box {
		border-radius: 100%;
		margin: 0 20rpx;
	}

	.login_img {
		width: 80rpx;
		height: 80rpx;
	}

	.login_btn {
		border-radius: 30px;
		margin-top: 30px;
	}

	.logos-btn {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		opacity: 0;
	}
	.noLogin{
		padding-top:40rpx;
		text-align: center;
	}
</style>
