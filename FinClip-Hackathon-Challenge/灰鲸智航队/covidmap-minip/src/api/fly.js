/*
 * @Author: Jin Biao
 * @Date: 2022-03-09 10:47:45
 * @Description: 用于请求api   flyio同axios
 * flyio组件官网https://wendux.github.io/dist/#/doc/flyio/wx
 */

import base from './base.js';
import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();
const host = base.baseUrl;

//添加请求拦截器
fly.interceptors.request.use(request => {
  request.headers['token'] = uni.getStorageSync('xxx');
  request.headers['uid'] = uni.getStorageSync('xxx');
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    //只将请求结果的data字段返回

    return response.data;
  },
  err => {
    //发生网络错误后
    uni.showLoading({
      title: '您的网络不稳定，请刷新再试',
    });
    if (err) {
      return '您的网络不稳定，请稍后再试';
    }
  }
);

//设置超时
fly.config.timeout = 15000;
//设置请求基地址
fly.config.baseURL = host;

export default fly;
