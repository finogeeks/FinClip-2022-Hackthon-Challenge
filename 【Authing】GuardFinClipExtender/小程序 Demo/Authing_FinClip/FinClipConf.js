module.exports = {
  extApi:[
    {
      name: 'guardRequest', //使用 guardRequest 可以调用 Authing 原生 API
      params: {
        url: '',
        body: {},
        method: '',
      }
    },
    {
      name: 'encryptPassword',  //密码加密，调用密码相关 API 时需要先调用此方法密码加密
      params: {
        password: '',
      }
    },
  ]
}