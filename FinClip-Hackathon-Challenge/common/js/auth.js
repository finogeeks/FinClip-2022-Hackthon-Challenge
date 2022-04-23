import config from "./config.js";
import urls from "./urls.js";

function check(){
	// 获取token
	var token = uni.getStorageSync(config.storageCode.loginToken);
	uni.request({
		url: config.baseUrl + urls.auth.checkLogin,
		header: { 'content-type': 'application/json','Authorization':token},
		method: 'get',
		success: function (res) {
			if (res.statusCode != 200) {
				uni.showToast({ title: '网络异常', icon: 'none' });
				return;
			}
			if (res.data.errCode == config.requestCode.loginTimeOut) {
				Login();
			}
		},
		fail: function (res) {
			uni.showToast({ title: '网络异常', icon: 'none' });
			return ;
		}
	})
}
function Login(){
	let terminal = config.terminal
	switch (terminal){
		case "weixin":
		return wxMiniProgramLogin();
		case "toutiao":
		return ttMiniProgramLogin();
		default: //h5
			uni.reLaunch({
				url: '/pages/login/index'
			});
		return;
	}
}
function Logout()
{
	// 保存token
	uni.setStorageSync(config.storageCode.loginToken,'');
	uni.reLaunch({
		url: '/pages/login/index'
	});
}
function accountPasswordLogin(params)
{
	let successCallback = params.success;
	
	uni.request({
		url: config.baseUrl + urls.auth.aplogin,
		header: { 'content-type': 'application/json','Authorization':''},
		method: 'post',
		data: JSON.stringify({
			account:params.account,
			password:params.password
		}),
		success: function (res) {
			if (res.statusCode != 200) {
				uni.showToast({ title: '网络异常', icon: 'none' });
				return;
			}
			let ret = res.data;
			if (ret.errCode != config.requestCode.ok) {
				uni.showToast({ title: ret.errMsg, icon: 'none' });
				return;
			}
			// 保存token
			uni.setStorageSync(config.storageCode.loginToken,ret.data.token)
			successCallback()
		},
		fail: function (res) {
			uni.showToast({ title: '网络异常', icon: 'none' });
			return ;
		}
	})
}
function accountPasswordRegistered(params)
{
	let successCallback = params.success;
	uni.request({
		url: config.baseUrl + urls.auth.apRegistered,
		header: { 'content-type': 'application/json','Authorization':''},
		method: 'post',
		data: JSON.stringify({
			account:params.account,
			password:params.password
		}),
		success: function (res) {
			if (res.statusCode != 200) {
				uni.showToast({ title: '网络异常', icon: 'none' });
				return;
			}
			if (res.data.errCode != config.requestCode.ok) {
				uni.showToast({ title: res.data.errMsg, icon: 'none' });
				return;
			}
			successCallback()
		},
		fail: function (res) {
			uni.showToast({ title: '网络异常', icon: 'none' });
			return ;
		}
	})
}
function ttMiniProgramLogin(callback){
	uni.login({
		provider: 'toutiao',
		success: function (loginRes) {
			get({
				url:urls.auth.ttlogin + "?code="+loginRes.code,
				success:function(res){
					// 保存token
					uni.setStorageSync(config.storageCode.loginToken,res.token)
					callback()
				}
			})
		},
		fail: (res) => {
			console.log(res)
		}
	});
}

function wxMiniProgramLogin(callback){
	uni.login({
		provider: 'weixin',
		success: function (loginRes) {
			get({
				url:urls.auth.wxlogin + "?code="+loginRes.code,
				success:function(res){
					// 保存token
					uni.setStorageSync(config.storageCode.loginToken,res.token)
					callback()
				}
			})
		},
		fail: (res) => {
			console.log(res)
		}
	});
}

module.exports = {
  Login:Login,
  Logout:Logout,
  check:check,
  accountPasswordLogin:accountPasswordLogin,
  accountPasswordRegistered :accountPasswordRegistered ,
}
