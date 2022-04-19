/*
 * @Author: Jin Biao
 * @Date: 2022-03-09 13:33:02
 * @LastEditTime: 2022-03-14 16:44:45
 * @Description: util组合套
 */

let _debounceTimeout = null,
  _throttleRunning = false;

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
  clearTimeout(_debounceTimeout);
  _debounceTimeout = setTimeout(() => {
    fn();
  }, delay);
};

/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
  if (_throttleRunning) {
    return;
  }
  _throttleRunning = true;
  fn();
  setTimeout(() => {
    _throttleRunning = false;
  }, delay);
};

// 浏览器判断是否微信
export const isWechat = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //console.log('是微信客户端')
    return true;
  } else {
    //console.log('不是微信客户端')
    return false;
  }
};

/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options = {}) => {
  const token = uni.getStorageSync('uniIdToken');
  if (token) {
    return true;
  }
  if (options.nav !== false) {
    uni.navigateTo({
      url: '/pages/auth/login',
    });
  }
  return false;
};

/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object}
 */
export const prePage = (preIndex = 1) => {
  const pages = getCurrentPages();
  const prePage = pages[pages.length - (preIndex + 1)];

  return prePage.$vm;
};

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳
 * @return {String}
 */
export const getDateTime = (timeStamp, format = 'Y-m-d H:i') => {
  if ('' + timeStamp.length <= 10) {
    timeStamp = +timeStamp * 1000;
  } else {
    timeStamp = +timeStamp;
  }
  let _date = new Date(timeStamp),
    Y = _date.getFullYear(),
    m = _date.getMonth() + 1,
    d = _date.getDate(),
    H = _date.getHours(),
    i = _date.getMinutes(),
    s = _date.getSeconds();

  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  H = H < 10 ? '0' + H : H;
  i = i < 10 ? '0' + i : i;
  s = s < 10 ? '0' + s : s;

  return format.replace(/[YmdHis]/g, key => {
    return { Y, m, d, H, i, s }[key];
  });
};
