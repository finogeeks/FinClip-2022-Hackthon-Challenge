
/**
  邮箱注册
  email: 邮箱
  password: 密码
 */
async function registerByEmail(email, password){

  const data = await encryptPassword(password);

  return {
    url: '/api/v2/register/email',
    method: 'POST',
    body: {email: email, password: data["password"], forceLogin: true}
  }
}

/**
  用户名注册
  username: 用户名
  password: 密码
 */
async function registerByUserName(username, password){

  const data = await encryptPassword(password);

  return {
    url: '/api/v2/register/username',
    method: 'POST',
    body: {username: username, password: data["password"], forceLogin: true}
  }
}

/**
  账号登录
  account: 账号
  password: 密码
 */
async function loginByAccount(account, password){
  const data = await encryptPassword(password);

  return {
    url: '/api/v2/login/account',
    method: 'POST',
    body: {username: account, password: data["password"]}
  }
}

/**
  手机验证码登录
  phoneCountryCode: 国家码（例：86）
  phone: 手机号
  code: 验证码
 */
function loginByPhoneCode(phoneCountryCode, phone, code){

  return {
    url: '/api/v2/login/phone-code',
    method: 'POST',
    body: {phoneCountryCode: phoneCountryCode, phone: phone, code: code}
  }
}

/*
  邮箱登录
  email: 邮箱
  code: 验证码
 */
function loginByEmail(email, code){

  return {
    url: '/api/v2/login/email-code',
    method: 'POST',
    body: {email: email, code: code}
  }
}

/*
  LDAP登录
  username: 用户名
  password: 密码
 */
async function loginByLDAP(username, password){
  const data = await encryptPassword(password);

  return {
    url: '/api/v2/login/ldap',
    method: 'POST',
    body: {username: username, password: data["password"]}
  }
}

/*
  loginByAD
  username: 用户名
  password: 密码
 */
async function loginByAD(username, password){
  const data = await encryptPassword(password);

  return {
    url: '/api/v2/login/ad',
    method: 'POST',
    body: {username: username, password: data["password"]}
  }
}

//获取用户信息
function getCurrentUser() {
  return {
    url: '/api/v2/users/me',
    method: 'GET',
    body: {}
  }
}

/*
  登出
  appid: Authing 控制台AppId  
*/
function logout(appid) {
  return {
    url: '/api/v2/logout?app_id=' + appid,
    method: 'GET',
    body: {}
  }
}

/**
  发送手机验证码
  phoneCountryCode: 国家码（例：86）
  phone: 手机号
 */
function sendSms(phoneCountryCode, phone){
  
  return {
    url: '/api/v2/sms/send',
    method: 'POST',
    body: {phoneCountryCode: phoneCountryCode, phone: phone}
  }
}

/**
  发送邮箱登录验证码
  email: 邮箱
 */
function sendLoginEmail(email){
  
  return {
    url: '/api/v2/email/send-email',
    method: 'POST',
    body: {email: email, scene: 'VERIFY_CODE'}
  }
}

/**
  发送邮箱重置密码验证码
  email: 邮箱
 */
function sendResetPasswordEmail(email){
  
  return {
    url: '/api/v2/email/send',
    method: 'POST',
    body: {email: email, scene: 'RESET_PASSWORD'}
  }
}

/**
  发送邮箱MFA验证码
  email: 邮箱
 */
function sendMFAEmail(email){
  
  return {
    url: '/api/v2/email/send',
    method: 'POST',
    body: {email: email, scene: 'MFA_VERIFY'}
  }
}

/**
  获取自定义数据
  userId: 用户Id
 */
function getCustomUserData(userId){
  
  return {
    url: '/api/v2/udvs/get',
    method: 'POST',
    body: {targetType: 'USER', targetId: userId}
  }
}

/**
  获取自定义数据
  customData: 自定义数据，数组类型
 */
function setCustomUserData(customData){
  
  var items = new Array();
  for (var key in customData) {
    let item = {'definition':key,'value':customData[key]}
    items.push(item);
  }

  return {
    url: '/api/v2/udfs/values',
    method: 'POST',
    body: {udfs: items}
  }
}

/**
  手机号重置密码
  phone: 手机号
  code: 验证码
  newPassword: 新密码
 */
async function resetPasswordByPhone(phone, code, newPassword){

  const data = await encryptPassword(newPassword);

  return {
    url: '/api/v2/password/reset/sms',
    method: 'POST',
    body: {phone: phone, code: code, newPassword: data['password']}
  }
}

/**
  邮箱重置密码
  email: 邮箱
  code: 验证码
  newPassword: 新密码
 */
async function resetPasswordByEmail(email, code, newPassword){

  const data = await encryptPassword(newPassword);

  return {
    url: '/api/v2/password/reset/email',
    method: 'POST',
    body: {email: email, code: code, newPassword: data['password']}
  }
}

/**
  token 重置密码
  token: token
  newPassword: 新密码
 */
async function resetPasswordByFirstTimeLoginToken(token, newPassword){

  const data = await encryptPassword(newPassword);

  return {
    url: '/api/v2/users/password/reset-by-first-login-token',
    method: 'POST',
    body: {token: token, newPassword: data['password']}
  }
}

/**
  更新用户资料
  object: 资料对象
 */
function updateProfile(object){

  return {
    url: '/api/v2/users/profile/update',
    method: 'POST',
    body: object
  }
}

/**
  修改密码
  oldPassword: 旧密码
  newPassword: 新密码
 */
async function updatePassword(newPassword, oldPassword){

  const data = await encryptPassword(newPassword);
  const data2 = await encryptPassword(oldPassword);

  return {
    url: '/api/v2/password/update',
    method: 'POST',
    body: {newPassword: data['password'], oldPassword: data2['password']}
  }
}

/**
  绑定手机号
  phoneCountryCode: 国家码
  phone: 手机号
  code: 验证码
 */
function bindPhone(phoneCountryCode, phone, phoneCode){

  return {
    url: '/api/v2/users/phone/bind',
    method: 'POST',
    body: {phoneCountryCode: phoneCountryCode, phone: phone, phoneCode: phoneCode}
  }
}

/**
  解绑手机号
 */
function unbindPhone(){

  return {
    url: '/api/v2/users/phone/unbind',
    method: 'POST',
    body: {}
  }
}

/**
  绑定邮箱
  email: 邮箱
  code: 验证码
 */
function bindEmail(email, emailCode){

  return {
    url: '/api/v2/users/email/bind',
    method: 'POST',
    body: {email: email, emailCode: emailCode}
  }
}

/**
  解绑邮箱
 */
function unbindEmail(){

  return {
    url: '/api/v2/users/email/unbind',
    method: 'POST',
    body: {}
  }
}

/**
  更新token
 */
function updateIdToken(){

  return {
    url: '/api/v2/users/refresh-token',
    method: 'POST',
    body: {}
  }
}

/**
  获取安全级别
 */
function getSecurityLevel(){

  return {
    url: '/api/v2/users/me/security-level',
    method: 'GET',
    body: {}
  }
}

/**
  获取当前用户能够访问的应用
  page: 页码
  limit: 条数
 */
function listApplications(page,limit){

  let pageStr = page.toString();
  let limitStr = limit.toString();
  return {
    url: '/api/v2/users/me/applications/allowed?page='+ pageStr + '&limit=' + limitStr,
    method: 'GET',
    body: {}
  }
}

/**
  获取用户所在组织机构
  userId: 用户Id
 */
function listOrgs(userId){

  return {
    url: '/api/v2/users/' + userId + '/orgs',
    method: 'GET',
    body: {}
  }
}

/**
  获取角色
  namespace 权限分组 ID，用来过滤角色数据。如果传null，则返回用户所有角色
 */
function listRoles(namespace){

  var space = '';
  if (namespace != null) {
    space = '?namespace=' + namespace;
  }

  return {
    url: '/api/v2/users/me/roles' + namespace,
    method: 'GET',
    body: {}
  }
}

/**
  删除账户
 */
function deleteAccount(){

  return {
    url: '/api/v2/users/delete',
    method: 'DELETE',
    body: {}
  }
}

/**
  密码加密
*/
async function encryptPassword(password){
  return new Promise((resolve,reject)=>{
    ft.encryptPassword({
      password: password,
      success: function(data){
        resolve(data)
      },
      fail:function(err){
        resolve(err)
      }
    })
  })
}

module.exports = {
  registerByEmail,        //邮箱注册
  registerByUserName,     //用户名注册
  loginByAccount,         //账户登录
  loginByPhoneCode,       //手机号登录
  loginByEmail,           //邮箱登录
  loginByLDAP,            //LDAP 登录
  loginByAD,              //AD 登录
  getCurrentUser,         //获取用户信息
  logout,                 //退出登录
  sendSms,                //发送验证码
  sendLoginEmail,         //邮箱登录验证码
  sendResetPasswordEmail, //重置密码邮箱验证码
  sendMFAEmail,           //MFA 邮件验证码
  getCustomUserData,      //获取自定义数据
  setCustomUserData,      //设置自定义数据
  resetPasswordByPhone,   //手机号重置密码
  resetPasswordByEmail,   //邮箱重置密码
  resetPasswordByFirstTimeLoginToken,   //Token 重置密码
  updateProfile,          //更新资料
  updatePassword,         //更新密码
  bindPhone,              //绑定手机号
  unbindPhone,            //解绑手机号
  bindEmail,              //绑定邮箱
  unbindEmail,            //解绑邮箱
  updateIdToken,          //更新 IdToken
  getSecurityLevel,       //获取安全等级
  listApplications,       //获取当前用户能够访问的应用
  listOrgs,               //获取用户所在组织机构
  listRoles,              //获取角色
  deleteAccount           //删除账户
}
