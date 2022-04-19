/*
|-------------------------------------------------------------------------------
| 基于token验证机制的小程序授权模块
|-------------------------------------------------------------------------------
*/

const Auth = {}

/**
 * 获取当前登陆用户的openid
 * @return {string}
 */
Auth.openid = function() {
	const openid = uni.getStorageSync('_USER_OPENID')
	if (openid) {
		return openid
	} else if (Auth.user()) {
		return Auth.user().openid
	} else {
		return ''
	}
}

/**
 * 获取当前登陆用户信息
 * @return {object}
 */
Auth.user = function() {
	return uni.getStorageSync('user');
}

/**
 * 获取token
 * @return {string}
 */
Auth.token = function() {
	return uni.getStorageSync('token');
}

/**
 * 判断token还是否在有效期内
 * @return {boolean}
 */
Auth.check = function() {
	if (Auth.user() && Auth.token() && Date.now() < uni.getStorageSync('expired_in')) {
		console.log('access_token过期时间：', (uni.getStorageSync('expired_in') - Date.now()) / 1000, '秒');
		return true;
	} else {
		return false;
	}
}

/**
 * 登录
 * @return {Promise} 登录信息
 */
// #ifdef MP-BAIDU
Auth.login = function() {
	return new Promise(function(resolve, reject) {
		if (swan.canIUse('getLoginCode')) {
			swan.getLoginCode({
				success: function(res) {
					resolve(res);
				},
				fail: function(err) {
					reject(err);
				}
			});
		} else {
			swan.login({
				success: function(res) {
					resolve(res);
				},
				fail: function(err) {
					reject(err);
				}
			});
		}
	});
}
// #endif

// #ifdef MP-WEIXIN||MP-QQ||MP-TOUTIAO

/**
 * 登录
 * @return {Promise} 登录信息
 */
Auth.login = function() {
	return new Promise(function(resolve, reject) {
		uni.login({
			success: function(res) {
				resolve(res);
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}
// #endif




/**
 * 注销
 * @return {boolean}
 */
Auth.logout = function() {
	uni.removeStorageSync('user')
	uni.removeStorageSync('token')
	uni.removeStorageSync('expired_in')
	return true
}

/**
 * 通过 uni.getUserProfile 获取 encryptedData, iv
 * @return {object}
 */
Auth.getUserProfile = function() {
	return new Promise(function(resolve, reject) {
		uni.getUserProfile({
			desc: "用于完善会员基本信息",
			success: function(res) {
				let args = {}
				args.iv = encodeURIComponent(res.iv);
				args.encryptedData = encodeURIComponent(res.encryptedData);
				resolve(args);
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}

/**
 * 获取授权登录加密数据
 * @return {Promise} 授权信息
 */
Auth.getUserInfo = function() {
	return new Promise(function(resolve, reject) {
		Auth.getUserProfile().then(data => {
				let args = {}
				args.iv = data.iv;
				args.encryptedData = data.encryptedData;
				Auth.login().then(res => {
						console.log(res);
						args.code = res.code
						resolve(args);
					})
					.catch(err => {
						reject(err);
					})
			})
			.catch(err => {
				console.log(err)
				uni.hideLoading()
			})
	});
}

Auth.getTtUserInfo = function(){
    return new Promise(function(resolve, reject) {
		Auth.login().then(data => {
			let args = {}
			args.code = data.code;
			uni.getUserInfo({
                withCredentials:true,
				success: function (res) {
					//console.log(res);
					args.iv = encodeURIComponent(res.iv);
					args.encryptedData = encodeURIComponent(res.encryptedData);
					resolve(args);
				},
				fail: function (err) {
					reject(err);
				}
			});
		})
    });
}



Auth.getUserProfiles = function(e) {
	return new Promise(function(resolve, reject) {
		console.log(e);
		if (e.detail.encryptedData && e.detail.iv) {
			let args = {}
			args.iv = encodeURIComponent(e.detail.iv)
			args.encryptedData = encodeURIComponent(e.detail.encryptedData)
			resolve(args);
		} else {
			uni.getSystemInfo({
				success: p => {
					reject(e)
					uni.hideLoading()
					if (p.platform == 'devtools') {
						uni.showModal({
							title: '温馨提示',
							content: '当前为开发工具环境,请使用手机预览调试'
						})
					}
				}
			})
		}
	});
}

Auth.getUserInfoByButton = function(e) {
	return new Promise(function(resolve, reject) {
		Auth.getUserProfiles(e).then(ret => {
				let args = {}
				args.iv = ret.iv;
				args.encryptedData = ret.encryptedData;
				Auth.login().then(res => {
						args.code = res.code
						resolve(args);
					})
					.catch(err => {
						reject(err);
					})
			})
			.catch(err => {
				console.log(err)
				uni.hideLoading()
			})
	});
}

module.exports = Auth
