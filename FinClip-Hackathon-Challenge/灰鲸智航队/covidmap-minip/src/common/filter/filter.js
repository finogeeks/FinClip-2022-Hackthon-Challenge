/*
 * @Author: Jin Biao
 * @Date: 2022-03-09 13:33:02
 * @LastEditTime: 2022-03-10 14:21:04
 * @Description: filter组合套
 */
import Vue from 'vue';
import { date } from '@/common/util/util';

Vue.filter('date', (timeStamp, format = 'Y-m-d H:i') => {
  if (!timeStamp) return '';
  return date(format, timeStamp);
});

Vue.filter('friendDate', (timeStamp, format = 'Y-m-d H:i') => {
  if (!timeStamp) return '';
  return date(format, timeStamp);
});

Vue.filter('price', (price, fixed = 0) => {
  if (!price || isNaN(price)) {
    return 0;
  }
  return fixed > 0 ? parseFloat(price).toFixed(fixed) : +parseFloat(price).toFixed(2);
});
