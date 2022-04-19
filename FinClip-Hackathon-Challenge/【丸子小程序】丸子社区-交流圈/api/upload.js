/*
|-------------------------------------------------------------------------------
| 云存储小程序直传模块
|-------------------------------------------------------------------------------
*/

const API = {}

/**
 * 上传文件至七牛云存储
 * @param	{Files}
 * @return {Promise}
 */
API.qiniu = function(filePath, options = {}) {
	return new Promise(function (resolve, reject) {
		let files = filePath.split('//')[1]
		let index = filePath.lastIndexOf("/")
		let random = Math.floor((Math.random()*100)+1)
		let type = files.substr(index + 1)
		let url = options.upload_domain
		let path = options.upload_path
		let domain = options.domain
		let data = {}
		data.token = options.signature
		if (!options.shouldUseQiniuFileName) {
			data.key = `${path}${random}.${type}`
		}
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'file',
			formData: data,
			success: function (res) {
				try {
					let data = JSON.parse(res.data)
					data.url = domain + '/' + data.key;
					resolve(data)
				}
				catch (e) {
					reject(e)
				}
			},
			fail: function (err) {
				reject(err)
			}
		})
	})
}

 /**
 * 上传文件至阿里云 OSS
 * @param	{Files}
 * @return {Promise}
 */
API.aliyun = function(filePath, options = {}) {
	return new Promise(function (resolve, reject) {
		let url = options.upload_domain
		let domain = options.domain
    	let index = filePath.lastIndexOf("/")
    	let data = {
			"name": filePath,
			"key": options.upload_path + "${filename}",
			"policy": options.policy,
			"OSSAccessKeyId": options.accesskey,
			"success_action_status": options.success_action_status,
    		"signature": options.signature
    	}
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'file',
			formData: data,
			success: function (res) {
				console.log(res)
				//resolve(res)
				if( res.statusCode === 200 ) {
					try {
						let data = {}
						data.url = domain + options.upload_path + filePath.substr(index + 1)
						resolve(data)
					}
					catch (e) {
						reject(e)
					}
				}
			},
			fail: function (err) {
				console.log(err)
				reject(err)
			}
		})

	})
}

 /**
 * 上传文件至腾讯云  COS
 * @param	{Files}
 * @return {Promise}
 */
API.tencent = function(filePath, options = {}) {
	return new Promise(function (resolve, reject) {
		let url = options.upload_domain
    	let domain = options.domain
		let index = filePath.lastIndexOf("/")
		let data = {
    		"key": options.upload_path + "${filename}",
    		"success_action_status": 200,
			"policy": options.policy,
			"q-sign-algorithm": options.algorithm,
			"q-ak": options.accesskey,
			"q-key-time": options.token_time,
    		"q-signature": options.signature
		}
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'file',
			formData: data,
			success: function (res) {
				console.log(res)
				//resolve(res)
				if( res.statusCode === 200 ) {
					try {
						let data = {}
						data.url = domain + options.upload_path + filePath.substr(index + 1)
						resolve(data)
					}
					catch (e) {
						reject(e)
					}
				}
			},
			fail: function (err) {
				console.log(err)
				reject(err)
			}
		})
	})
}

module.exports = API