<template>
  <view class="company">
    <text class="companyText" v-if="option.type == 'company'">灰鲸智航是一家专注于LBS的互联网科技企业，公司以“客户为中心”的价值观理念，基于LBS地图服务，为企业提供数字孪生以及数据化产品，通过数据可视化的应用工具，协助企业在数字营销、管理、运营、决策等层面提供全方面定制化的创新解决方案。灰鲸智航启用一对一的服务模式，向企业提供超大数据量及精细化分析，利用高效的管理方式增加企业运作效率，为数字经济化的企业赋能。</text>
    <text class="companyText" v-if="option.type == 'serve'">为生产、化工、制造及物流运输行业的中小型企业提供运输全过程数字化，可视化管理平台。平台通过提供运输订单查询，无车承运调度和实时轨迹监控，系统集成，运输时效管理，运输管理分析等核心功能，有效提升运输全过程运营效率及管理力度。</text>

    <view class="tel" v-if="option.type == 'tel'">
      <view class="phone">联系电话：185 1567 6583</view>
      <view>为您提供售前购买咨询</view>
      <view>工作时间周一至周五 9:00-19:00</view>
    </view>
    <view class="logo" v-if="option.type == 'tel'">
      <img src="@/static/image/code.png" alt="" />
      <text>微信扫描二维码联系我们～</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      option: '',
    };
  },
  onLoad(option) {
    this.option = option;
    if (option.type == 'company') {
      uni.setNavigationBarTitle({
        title: '公司介绍',
      });
    }
    if (option.type == 'serve') {
      uni.setNavigationBarTitle({
        title: '服务优势',
      });
    }
    if (option.type == 'tel') {
      uni.setNavigationBarTitle({
        title: '联系我们',
      });
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.company {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .companyText {
    font-size: 28rpx;
    font-weight: 400;
    color: #131313;
    line-height: 60rpx;
  }
  .tel {
    font-size: 28rpx;
    font-weight: 400;
    color: #131313;
    line-height: 50rpx;
    .phone {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }
  .logo {
    margin-top: 400rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #131313;

    img {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 30rpx;
    }
  }
}
</style>
