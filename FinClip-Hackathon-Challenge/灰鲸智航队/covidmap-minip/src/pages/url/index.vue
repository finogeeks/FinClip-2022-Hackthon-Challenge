<template>
  <view>
    <web-view v-if="urlData" :src="urlData" :update-title="false"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      option: '',
      urlData: '',
    };
  },
  methods: {},
  onLoad(option) {
    this.option = option;
    if (option.type == 1) {
      this.urlData = `https://demo-getm.cdgwin.com/mapNew?id=1&type=${option.type}&car=${option.car}&startingTime=${option.startingTime}&endTime=${option.endTime}`;
      uni.setNavigationBarTitle({
        title: '车辆实时定位',
      });
    } else {
      this.urlData = `https://demo-getm.cdgwin.com/mapNew?id=0&type=${option.type}&car=${option.car}&startingTime=${option.startingTime}&endTime=${option.endTime}`;
      uni.setNavigationBarTitle({
        title: '车辆轨迹查询',
      });
    }
    console.log(this.urlData);
  },
};
</script>
