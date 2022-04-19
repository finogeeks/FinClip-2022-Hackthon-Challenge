<template>
  <view class="detail">
    <view class="title">{{ detail.title }}</view>
    <view class="time">截止 {{ detail.cutTime }} 来源：{{ detail.infoSource || '无' }}</view>
    <view class="text" v-html="detail.content"></view>
  </view>
</template>

<script>
import { getDateTime } from '@/common/util/util';
import http from '@/api/api.js';
export default {
  data() {
    return {
      option: '',
      detail: {},
    };
  },
  onLoad(option) {
    http.InformationDataDetailInquiry({ id: option.id }).then(res => {
      res.body.cutTime = getDateTime(res.body.cutTime);
      this.detail = res.body;
    });
  },
};
</script>

<style>
::v-deep text {
  white-space: pre-line !important;
}
::v-deep div {
  white-space: pre-line !important;
}
</style>
<style lang="scss" scoped>
.detail {
  padding: 40rpx;
  width: 100%;
  box-sizing: border-box;
  .title {
    font-size: 40rpx;
    font-weight: 500;
    color: #131313;
    margin-bottom: 20rpx;
  }
  .time {
    font-size: 28rpx;
    font-weight: 400;
    color: #aaaaaa;
    margin-bottom: 40rpx;
  }
  .text {
    font-size: 28rpx;
    font-weight: 400;
    color: #000000;
    line-height: 50rpx;
    width: 100%;
  }
}
</style>
