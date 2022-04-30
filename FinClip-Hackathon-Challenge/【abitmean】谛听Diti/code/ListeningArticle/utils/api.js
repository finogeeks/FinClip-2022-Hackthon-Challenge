// api.js
const app = getApp()
const config = require('config.js')
const dialog = require('dialog.js')

const request = (url, data) => { 
  let _url = config.API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "post",
      data: data,
      header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: wx.getStorageSync("token")
      },
      success(res) {
        if(res.statusCode != 200){
          dialog.sysErrorDialog();
        }else{
          if(res.data.code === '00000'){
            resolve(res.data);
          }else{
            dialog.errDialog(res.data.msg);
            reject(res.data)
          }
        }
      },
      fail(error) {
        console.error(error);
        dialog.networkTurnOff();
        reject(error)
      }
    })
  });
}

module.exports ={
  listenText:(data) =>{
    return request('/api/listenText',data)
  },
  listenArticle:(data)=>{
    return request('/api/listenArticle',data)
  },
  listenWxArticle:(data)=>{
    return request('/api/listenWxArticle',data)
  },
  parseUrl:(data)=>{
    return request('/api/parseUrl',data)
  },
  login:(data)=>{
    return request('/api/user/login',data)
  },
  userGet:(data)=>{
    return request('/api/user/get',data)
  },
  userUpdate:(data)=>{
    return request('/api/user/update',data)
  },
  recent:(data)=>{
    return request('/api/user/recent',data)
  },
  collectGet:(data)=>{
    return request('/api/like/get',data)
  },
  collectList:(data)=>{
    return request('/api/like/list',data)
  },
  collect:(data)=>{
    return request('/api/like/collect',data)
  },
  uncollect:(data)=>{
    return request('/api/like/uncollect',data)
  },
  discovery:(data)=>{
    return request('/api/discovery/list',data)
  }
}
