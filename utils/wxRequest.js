
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
// Promise.prototype.finally = function (callback) {
//   let P = this.constructor;
//   return this.then(
//     value => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => { throw reason })
//   );
// };
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',
      'X-Token': wx.getStorageSync('token'),
      'source': 3
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/json",
      'X-Token': wx.getStorageSync('token'),
      'source': 3
    },
  })
}

/**
 * 微信请求put方法封装
 * url
 * data 以对象的格式传入
 */
function putRequest(url, data) {
  var putRequest = wxPromisify(wx.request)
  return putRequest({
    url: url,
    method: 'put',
    data: data,
    header: {
      "content-type": "application/json",
      'X-Token': wx.getStorageSync('token'),
      'source': 3
    },
  })
}

/**
 * 微信请求delete方法封装
 * url
 * data 以对象的格式传入
 */
function deleteRequest(url, data) {
  var deleteRequest = wxPromisify(wx.request)
  return deleteRequest({
    url: url,
    method: 'delete',
    data: data,
    header: {
      "content-type": "application/json",
      'X-Token': wx.getStorageSync('token'),
      'source': 3
    },
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  putRequest: putRequest,
  deleteRequest: deleteRequest
}