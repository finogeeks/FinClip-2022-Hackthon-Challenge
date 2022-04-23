<!-- 蓝色简洁登录页面 -->
<template>
	<view class="login-bg">
		<image class="img-a" src="../../static/image/bg1.png"></image>
		<view class="t-login">
			<view :class="{'t-b':type===1,'t-r':type===2}">{{operationName}}</view>
			<form class="cl">
				<view class="t-a">
					<image src="../../static/image/user.png"></image>
					<input type="text" name="phone" placeholder="请输入手机号码" maxlength="11" v-model="phone" />
				</view>
				<view class="t-a">
					<image src="../../static/image/pwd.png"></image>
					<input type="password" name="code" maxlength="6" placeholder="请输入密码" v-model="pwd" />
				</view>
				<!-- <view class="t-c" @tap="forgotPwd()">忘记密码</view> -->
				<button :class="{'b-l':type===1,'b-r':type===2}" @tap="submit()">{{operationName}}</button>
			</form>
		</view>
		<view class="cardBox" v-if="type == 1">
			<view>
				还没有登录账号？
				<text class="txt" @tap="toReg()">立刻注册</text>
			</view>
		</view>
		<view class="cardBox" v-if="type == 2">
			<view>
				返回登录？
				<text class="txt" @tap="backLogin()">返回</text>
			</view>
		</view>
		<image class="img-b" src="../../static/image/bg2.png"></image>
	</view>
</template>
<script>
	import authServer from '../../common/js/auth.js';
	import config from '../../common/js/config.js';
	// import commonServer from '../../lib/common/server.js';
	export default {
		/**
		 * 2020年12月9日  李新雷编写（练习）  适用所有app登录
		 * vue版本简洁又美观的登录页面（个人感觉插件市场的登录都不太好看，哈哈 O(∩_∩)O）
		 * 如果需要注册（注册可以设计在登录按钮下方），直接复制该页面稍微改动即可
		 */
		data() {
			return {
				phone: '', //手机号码
				pwd: '' ,//密码
				
				type: 1, // 1登录；2注册
				operationName: '登 录',
			};
		},
		onLoad() {
			
		},
		methods: {
			//当前登录按钮操作
			submit() {
				var that = this;
				var reg = /^[a-zA-Z\d]{6,11}/;//正则
				if(!reg.test(that.phone)){
					uni.showToast({ title: '请输入6-11位数字或字母密码', icon: 'none' });
					return;
				}
				// if (!that.phone) {
				// 	uni.showToast({ title: '请输入手机号', icon: 'none' });
				// 	return;
				// }
				// if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
				// 	uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				// 	return;
				// }
				if (!that.pwd) {
					uni.showToast({ title: '请输入密码', icon: 'none' });
					return;
				}
				if (this.type == 1) {
					this.login()
				} else {
					this.reg()
				}
			},
			reg() {
				var that = this;
				authServer.accountPasswordRegistered({
					account:that.phone,
					password:that.pwd,
					success:function(){
						uni.showToast({ title: '注册成功！', icon: 'none' });
						
						that.backLogin();
					}
				})	
			},
			login() {
				var that = this;
				authServer.accountPasswordLogin({
					account:that.phone,
					password:that.pwd,
					success:function(){
						uni.showToast({ title: '登录成功！', icon: 'none' });
						
						// 保存账号
						uni.setStorageSync(config.storageCode.UserId,that.phone)
						
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				})	
			},
			//忘记密码
			forgotPwd() {
				uni.showToast({ title: '忘记密码', icon: 'none' });
			},
			//立刻注册
			toReg() {
				this.type = 2;
				this.operationName = '注 册';
			},
			backLogin() {
				this.type = 1;
				this.operationName = '登 录';
			}
		}
	};
</script>
<style>
.img-a {
	width: 100%;
}
.img-b {
	width: 100%;
	height: 45px;
	bottom: 0;
	position: absolute;
}
.login-bg {
	height: 100vh;
	background: linear-gradient(to bottom, #b2cdff, #2dccdc);
}

.t-login {
	width: 580rpx;
	padding: 55rpx;
	margin: 0 auto;
	font-size: 28rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	position: relative;
	margin-top: -300rpx;
	box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
	z-index: 9;
}
.t-login button {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
}
.t-login .b-l{
	background: linear-gradient(to right, #83cbff, #1cb8e6);
}
.t-login .b-r{    
	background: linear-gradient(to right, #83ffee, #1ce6d3)
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f6f6f6;
	border: 1px solid #f6f6f6;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	padding-right: 20rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #91d3e6;
	font-weight: bold;
	margin: 0 0 50rpx 20rpx;
}
.t-login .t-r {
	text-align: left;
	font-size: 46rpx;
	color: #91e6bb;
	font-weight: bold;
	margin: 0 0 50rpx 20rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-c {
	text-align: right;
	color: #c0c0c0;
	margin: -20rpx 30rpx 40rpx 0;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
.cardBox {
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	flex-direction: row;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	padding: 5px;
	background: #ffffff;
	opacity: 0.9;
	-webkit-border-radius: 20rpx;
	border-radius: 0 0 20rpx 20rpx;
	height: 70rpx;
	width: 600rpx;
	margin: 0 auto;
	position: relative;
	text-align: center;
	line-height: 70rpx;
	color: #aaa;
	font-size: 28rpx;
}
.cardBox .txt {
	color: #fe519f;
}
</style>
