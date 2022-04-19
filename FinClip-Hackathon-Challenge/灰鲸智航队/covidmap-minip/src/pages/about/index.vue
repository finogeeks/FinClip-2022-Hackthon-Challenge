<template>
  <view class="about">
    <view class="logo">
      <img src="@/static/logo.png" alt="" />
      <text>灰鲸智航数字技术有限公司</text>
    </view>
    <view class="cell">
      <u-cell-group>
        <u-cell title="公司介绍" :isLink="true" arrow-direction="left" @click="goPage('/pages/about/company?type=company')"></u-cell>
        <u-cell title="服务优势" :isLink="true" arrow-direction="left" @click="goPage('/pages/about/company?type=serve')"></u-cell>
        <u-cell title="联系我们" :isLink="true" arrow-direction="left" @click="goPage('/pages/about/company?type=tel')"></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goPage(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  .cell {
    padding: 0 20rpx;
    ::v-deep .u-line {
      border-bottom: 1rpx solid rgba(225, 229, 245, 1) !important;
    }
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 480rpx;
    justify-content: center;
    img {
      width: 120rpx;
      height: 70rpx;
    }
    text {
      margin-top: 50rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #131313;
    }
  }
  ::v-deep .u-cell__body {
    padding: 28rpx 30rpx !important;
  }
}
</style>
