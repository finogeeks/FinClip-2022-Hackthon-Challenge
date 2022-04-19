/*                                                                             
 *                                                                               
 *  WordPress 小程序资讯版 - UI ： 波波 / Pluigns : 艾码汇 / Marking : M主题@爱折腾的Kit
 *  一款基于 WordPress 网站后端的，采用 WordPress REST API 定制的小程序，做好看的微信小程序
 *  const API_HOST = '此处填写网站域名，需要带上协议'
 */
/*-----------------------------------------------------------*/

const API_HOST = 'https://mall.guqule.com' // 更换为你的网站域名, 需要有 https 协议
const Auth = require('@/api/auth')

const Upload = require('@/api/upload')

const API = {}

API.getHost = function() {
	return API_HOST
}

API.request = function(url, method = "GET", data = {}, args = {
	token: true
}) {

	return new Promise(function(resolve, reject) {

		if (args.isCusUrl == true) {

		} else {
			url = API_HOST + url;
		}
		if (args.token) {
			const token = API.token();
			if (token) {
				if (url.indexOf("?") > 0) {
					url = url + '&access_token=' + token;
				} else {
					url = url + '?access_token=' + token;
				}
			} else {
				console.warn('[提示]', '部分数据需要授权，检测出当前访问用户未授权登录小程序');
			}
		}

		//console.log( url );
		//console.log( data );

		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				// #ifdef APP-PLUS||H5
				'Content-Type': 'application/json; charset=UTF-8',
				// #endif

			},
			success: function(res) {
				//console.log( res );
				if (res.statusCode == 200) {
					resolve(res.data);
				} else if (res.data.code === "rest_post_invalid_page_number") {} else {
					if (res.data.message) {} else {
						uni.showToast({
							title: '请求数据出错',
							icon: 'loading',
							duration: 1000
						});
					}
					console.log(res.data);
					reject(res.data);
				}

			},
			fail: function(err) {
				console.log(err);
				reject(err);
			}
		})
	});

}

API.get = function(url, data = {}, args = {
	token: false
}) {
	return API.request(url, "GET", data, args);
}

API.post = function(url, data, args = {
	token: true
}) {
	return API.request(url, "POST", data, args);
}


API.put = function(url, data, args = {
	token: true
}) {
	return API.request(url, "PUT", data, args);
}
API.delete = function(url, data, args = {
	token: true
}) {
	return API.request(url, "DELETE", data, args);
}

API.getUser = function() {
	if (Auth.check()) {
		return Auth.user();
	} else {
		return '';
	}
}

API.login = function() {
	return new Promise(function(resolve, reject) {
		if (Auth.check()) {
			resolve(Auth.user());
		} else {
			Auth.login().then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			})
		}
	});
}

API.logout = function() {
	if (Auth.logout()) {
		getApp().globalData.user = '';
	} else {
		uni.showToast({
			title: '注销失败!',
			icon: 'loading',
			duration: 1000,
		})
	}
}

API.getProfiles = function() {
	return new Promise(function(resolve, reject) {
		Auth.getUserInfo().then(data => {
				API.post('/wp-json/mp/v2/user/login', data, {
					token: false
				}).then(res => {
					console.log(res);
					API.storageUser(res);
					resolve(res.user);
				}, err => {
					reject(err);
				});
			})
			.catch(err => {
				//console.log( err );
				reject(err);
			})
	});
}



API.getUserInfos = function(e) {
	return new Promise(function(resolve, reject) {
		Auth.getUserInfoByButton(e).then(data => {
				// #ifdef MP-WEIXIN
				var url = '/wp-json/mp/v2/user/login';
				// #endif
				// #ifdef MP-BAIDU
				var url = '/wp-json/mp/v2/baidu/login';
				// #endif
				// #ifdef MP-QQ
				var url = '/wp-json/mp/v2/tencent/login';
				// #endif
				// #ifdef MP-TOUTIAO
				var url = '/wp-json/mp/v2/toutiao/login';
				// #endif
				API.post(url, data, {
					token: false
				}).then(res => {
					API.storageUser(res);
					console.log(res);
					resolve(res.user);
				}, err => {
					reject(err);
				});
			})
			.catch(err => {
				reject(err);
			})
	});
}

API.getTtProfile = function() {
	return new Promise(function(resolve, reject) {
		Auth.getTtUserInfo().then(data => {
				API.post('/wp-json/mp/v2/toutiao/login', data, {
					token: false
				}).then(res => {
					API.storageUser(res);
					console.log(res);
					resolve(res.user);
				}, err => {
					reject(err);
				});
			})
			.catch(err => {
				reject(err);
			})
	});
}

API.bloginfo = function() {
	return new Promise(function(resolve, reject) {
		API.get('/wp-json/mp/v2/setting').then(res => {
			//console.log( res )
			uni.setStorageSync('bloginfo', res);
			resolve(res);
		}, err => {
			reject(err);
		});
	});
}

API.token = function() {
	if (Auth.token() && Date.now() < uni.getStorageSync('expired_in')) {
		return Auth.token();
	} else {
		return '';
	}
}

API.storageUser = function(res) {

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
}

API.guard = function(fn) {
	const self = this
	return function() {
		if (API.getUser()) {
			return fn.apply(self, arguments)
		} else {
			return API.getProfile().then(res => {
				console.log('登录成功', res);
				return fn.apply(self, arguments)
			}, err => {
				console.log('登录失败', err);
				return err
			})
		}
	}
}

API.template = function() {
	return new Promise(function(resolve, reject) {
		API.get('/wp-json/mp/v2/subscribe/templates').then(res => {
			if (res.status == 200) {
				uni.setStorageSync('templates', res.data);
			}
			resolve(res);
		}, err => {
			reject(err);
		});
	});
}





/**
 * 上传文件至媒体库
 * @param	{Files} 
 * @return {Promise}
 */
API.upload = function(url, files = "", args = {
	token: true
}) {
	return new Promise(function(resolve, reject) {
		url = API_HOST + url;
		if (args.token) {
			const token = API.token();
			if (token) {
				if (url.indexOf("?") > 0) {
					url = url + '&access_token=' + token;
				} else {
					url = url + '?access_token=' + token;
				}
			} else {
				console.warn('[提示]', '需要授权才能上传图片，检测出当前访问用户未授权登录小程序');
				uni.showModal({
					title: '温馨提示',
					content: '上传图片需要授权登录',
					success: function(res) {
						if (res.confirm) {
							API.getUserInfo()
						}
					}
				})
			}
		} else {
			console.warn('[提示]', '需要授权才能上传图片');
			uni.showModal({
				title: '温馨提示',
				content: '上传图片需要授权登录'
			})
		}
		console.log(files);
		uni.uploadFile({
			url: url,
			filePath: files,
			name: 'media',
			success: function(res) {
				if (res.statusCode == 200) {
					console.log(res);
					// #ifdef MP-BAIDU
					let data = res.data;
					// #endif
					// #ifndef MP-BAIDU
					let data = JSON.parse(res.data);
					// #endif
					if (data.status == 200) {
						console.log("上传成功")
						resolve(data);
					} else if (data.status == 500) {
						console.log(data.message)
						reject(data)
					} else if (data.status == 400) {
						console.log(data.message)
						reject(data)
					}
				} else {
					console.log("上传失败")
					uni.navigateTo({
						url: '/pages/login/login'
					})

					reject(res.data)
				}
			},
			fail: function(err) {
				console.log(err)
				reject(err)
			}
		})
	})
}


API.media = function(filePath, data = {}) {
	return new Promise(function(resolve, reject) {
		API.get('/wp-json/mp/v2/media', data, {
				token: true
			}).then(res => {
				if (res.status == 200) {
					console.log(res);
					if (res.option == 'qiniu') {
						Upload.qiniu(filePath, res.data).then(success => {
								resolve(success)
							})
							.catch(fail => {
								reject(fail)
							})
					} else if (res.option == 'aliyun') {
						Upload.aliyun(filePath, res.data).then(success => {
								resolve(success)
							})
							.catch(fail => {
								reject(fail)
							})
					} else if (res.option == 'tencent') {
						Upload.tencent(filePath, res.data).then(success => {
								resolve(success)
							})
							.catch(fail => {
								reject(fail)
							})
					} else {
						API.upload('/wp-json/mp/v2/media', filePath, {
								token: true
							}).then(success => {
								resolve(success)
							})
							.catch(fail => {
								reject(fail)
							})
					}
				} else {
					reject(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

module.exports = API
