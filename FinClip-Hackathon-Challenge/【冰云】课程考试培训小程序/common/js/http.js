import config from "./config.js";
import urls from "./urls.js";
import auth from "./auth.js";
//网络请求
const uploadFile = (params) => {
	
	let url = params.url;
	let filePath = params.filePath;
	let successCallback = params.success;
	let errorCallback = params.fail;
	let completeCallback = params.complete;
	
	// 获取token
	var token = uni.getStorageSync(config.storageCode.loginToken)
	console.log(filePath)
	uni.uploadFile({
		url: config.baseUrl + url,
		filePath: filePath,
		name: "file",
		//header: { 'content-type': 'application/json' },
		header: {'content-type': 'multipart/form-data','Authorization':token},
		success: function (res) {
			if (res.statusCode != 200) {
				uni.showToast({
				  title: '网络请求错误',
				  icon: 'none',
				})
				return;
			}
			let data = JSON.parse(res.data);
			var ok = checkCode(data.ErrorCode,data.Message,function(){
				uploadFile(params)
			})
			if (ok) {
				successCallback(data.Data)
			}
			
		},
		fail: function (res) {
			console.log("文件上传失败")
			console.log(res)
			errorCallback(res);
			uni.hideLoading();
			uni.showToast({
				title: '网络请求错误',
				icon: 'none',
			})
		},
		complete: function (res) {
			uni.hideLoading();
			// if (res.errMsg != 'request:ok') {
			// 	uni.hideLoading();
			// 	uni.showToast({
			// 		title: '网络请求错误',
			// 		icon: 'none',
			// 	})
			// }
		}
	})
}
//网络请求
const wxRequest = (method,params) => {
	
	let url = params.url;
	let data = JSON.stringify(params.data);
	let successCallback = params.success;
	console.log(successCallback);
	// 获取token
	var token = uni.getStorageSync(config.storageCode.loginToken)
	uni.request({
		url: config.baseUrl + url,
		data: data,
		//header: { 'content-type': 'application/json' },
		header: { 'content-type': 'application/json','Authorization':token},
		method: method,
		success: function (res) {
			if (res.statusCode != 200) {
				uni.showToast({
				  title: '网络请求错误',
				  icon: 'none',
				})
				return;
			}
			if (res.data.errCode == config.requestCode.loginTimeOut) {
				return auth.Login();
			}
			if (res.data.errCode != config.requestCode.ok) {
				uni.showToast({
				  title: res.data.errMsg,
				  icon: 'none',
				})
				return;
			}
			successCallback(res.data.data)
		},
		fail: function (res) {
			uni.showToast({
				title: '网络请求错误',
				icon: 'none',
			})
		}
	})
}
const post = (params,isSync) => {
	if (isSync) {
		async function request () {
		    await wxRequest('POST',params);
		}
	} else {
		wxRequest('POST',params);
	}
}

const get = (params) => {
	wxRequest('GET',params);
}

module.exports = {
  post: post,
  get: get,
  uploadFile:uploadFile
}
