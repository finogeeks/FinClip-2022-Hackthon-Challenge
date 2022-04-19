/*
 * @Author: Jin Biao
 * @Date: 2021-03-06 14:30:56
 * @Title: 环境文件
 */

// 当前环境设置
let baseUrl = '';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // 开发环境 http://106.75.75.35:9121/
  // #ifdef  MP
  baseUrl = 'https://test-covidmap.cdgwin.com/';
  // #endif
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境 10.9.62.197
  baseUrl = 'https://covidmap.cdgwin.com/';
}

const config = {
  baseUrl: baseUrl, //域名
  systemInfo: '', //系统信息
  mapData: {
    key: '', //地图key
    sk: '',
  },
  share: {
    title: '标题', //分享标题
    desc: '详情', //分享详情
    link: '', // 分享链接
    imgUrl: '', // 分享图
  },
};
export default Object.assign({}, config);
