<template>
  <view class="index" v-if="cityData">
    <!--  #ifdef  MP -->
    <u-navbar titleWidth="750rpx" title="省市疫情实时动态" :fixed="false" leftIconColor="#ffffff" bgColor="rgba(0,0,0,0)" :autoBack="true"></u-navbar>
    <!--  #endif -->
    <view class="top"></view>
    <view class="epidemic">
      <view class="title">
        <view @click="cityShow = true">
          <img src="@/static/image/mapCity.png" />
          <text>{{ city }}</text>
        </view>
        疫情数据
      </view>
      <view class="time">截止 {{ cityData.lastUpdateTime }} 国家和省市卫健委数据统计</view>
      <view class="list">
        <view>
          <view style="color: #ff9481">{{ cityData.total.confirm }}</view>
          <text>累计确诊</text>
          <view>
            昨日
            <text style="color: #ff9481">+{{ cityData.today.confirm }}</text>
          </view>
        </view>
        <view>
          <view style="color: #aeb3c0">{{ cityData.total.dead }}</view>
          <text>累计死亡</text>
          <view>
            昨日
            <text style="color: #aeb3c0">+{{ cityData.today.dead }}</text>
          </view>
        </view>
        <view>
          <view style="color: #47e2b8">{{ cityData.total.heal }}</view>
          <text>累计治愈</text>
          <view>
            昨日
            <text style="color: #47e2b8">+{{ cityData.today.heal }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="epidemic">
      <view class="title">{{ city }} 疫情地图</view>
      <view class="mapBg">
        <view class="charts-box" v-if="!cityShow">
          <qiun-data-charts type="map" @getIndex="getIndex" :opts="{ extra: { map: { mercator: true, borderColor: '#F0986E' } }, dataLabel: cityId == '460000' ? false : true, fontSize: '8' }" :chartData="cityMapData" background="none" />
        </view>
        <view class="box" :style="'left:' + mapIndex.event.x + 'rpx;top:' + mapIndex.event.y + 'rpx'" v-if="mapIndex.currentIndex > -1">
          <view class="title">{{ cityMapData.series[mapIndex.currentIndex].properties.name }}</view>
          <view class="num">累计确诊：{{ cityMapData.series[mapIndex.currentIndex].properties.map ? cityMapData.series[mapIndex.currentIndex].properties.map.num : '0' }}例</view>
        </view>
      </view>
      <img class="numText" src="@/static/image/leftText.png" alt="" />
    </view>

    <view class="epidemic">
      <view class="title">{{ city }} 疫情情况</view>
      <view class="city">
        <!--  #ifdef  H5 -->
        <u-sticky offset-top="-40">
          <view class="cityTitle">
            <view>地区</view>
            <view>新增确诊</view>
            <view>累计确诊</view>
            <view>死亡</view>
            <view>治愈</view>
          </view>
        </u-sticky>
        <!--  #endif -->

        <!--  #ifdef MP -->
        <u-sticky offset-top="80">
          <view class="cityTitle">
            <view>地区</view>
            <view>新增确诊</view>
            <view>累计确诊</view>
            <view>死亡</view>
            <view>治愈</view>
          </view>
        </u-sticky>
        <!--  #endif -->

        <view class="cityList" v-for="(item, index) of cityList" :key="index">
          <view>{{ item.name }}</view>
          <view>+{{ item.storeConfirm > 0 ? item.storeConfirm : '0' }}</view>
          <view>{{ item.confirm }}</view>
          <view>{{ item.dead }}</view>
          <view>{{ item.heal }}</view>
        </view>
      </view>
      <view class="more" v-if="false">
        查看更多地区
        <u-icon name="arrow-down" color="#aaaaaa"></u-icon>
      </view>
    </view>
    <u-picker :show="cityShow" zIndex="9999" :columns="columns" keyName="label" @confirm="changeHandler" @cancel="cityShow = false"></u-picker>
  </view>
</template>

<script>
import http from '@/api/api';
import { getDateTime } from '@/common/util/util';

export default {
  data() {
    return {
      option: '',
      cityData: '',
      cityMapData: {
        categories: [],
        series: [],
      },
      cityList: [],
      cityShow: false,
      columns: [
        [
          {
            label: '北京',
            id: 110000,
          },
          {
            label: '天津市',
            id: 120000,
          },
          {
            label: '河北省',
            id: 130000,
          },
          {
            label: '山西省',
            id: 140000,
          },
          {
            label: '内蒙古自治区',
            id: 150000,
          },
          {
            label: '辽宁省',
            id: 210000,
          },
          {
            label: '吉林省',
            id: 220000,
          },
          {
            label: '黑龙江省',
            id: 230000,
          },
          {
            label: '上海市',
            id: 310000,
          },
          {
            label: '江苏省',
            id: 320000,
          },
          {
            label: '浙江省',
            id: 330000,
          },
          {
            label: '安徽省',
            id: 340000,
          },
          {
            label: '福建省',
            id: 350000,
          },
          {
            label: '江西省',
            id: 360000,
          },
          {
            label: '山东省',
            id: 370000,
          },

          {
            label: '河南省',
            id: 410000,
          },
          {
            label: '湖北省',
            id: 420000,
          },
          {
            label: '湖南省',
            id: 430000,
          },
          {
            label: '广东省',
            id: 440000,
          },
          {
            label: '广西壮族自治区',
            id: 450000,
          },
          {
            label: '海南省',
            id: 460000,
          },
          {
            label: '重庆市',
            id: 500000,
          },
          {
            label: '四川省',
            id: 510000,
          },
          {
            label: '贵州省',
            id: 520000,
          },
          {
            label: '云南省',
            id: 530000,
          },
          {
            label: '西藏自治区',
            id: 540000,
          },
          {
            label: '陕西省',
            id: 610000,
          },
          {
            label: '甘肃省',
            id: 620000,
          },
          {
            label: '青海省',
            id: 630000,
          },

          {
            label: '宁夏回族自治区',
            id: 640000,
          },
          {
            label: '新疆维吾尔自治区',
            id: 650000,
          },
          {
            label: '台湾省',
            id: 710000,
          },
          {
            label: '香港特别行政区',
            id: 810000,
          },
          {
            label: '澳门特别行政区',
            id: 820000,
          },
        ],
      ],
      city: '',
      cityId: '',
      mapCity: '',
      mapIndex: '',
    };
  },
  onLoad(option) {
    var _self = this;
    this.option = option;
    this.city = option.city;
    this.cityId = option.id;
    this.getList();
  },
  methods: {
    getIndex(e) {
      this.mapIndex = e;
    },
    changeHandler(val) {
      this.cityShow = false;
      this.city = val.value[0].label;
      this.cityId = val.value[0].id;
      this.getList();
      let item = {
        city: val.value[0].label,
        id: val.value[0].id,
      };
      uni.setStorageSync('map', JSON.stringify(item));
    },
    corGet(num) {
      let numNew = Number(num);
      // 判定数量给与色值
      if (numNew > 10000) {
        return '#6A280D';
      } else if (numNew > 1000 && numNew <= 9999) {
        return '#BC481F';
      } else if (numNew > 500 && numNew <= 999) {
        return '#EB6F35';
      } else if (numNew > 100 && numNew <= 499) {
        return '#F0986E';
      } else if (numNew > 10 && numNew <= 99) {
        return '#F4C2A8';
      } else if (numNew > 1 && numNew <= 9) {
        return '#F4C3A9';
      } else {
        return '#F6E2D6';
      }
    },

    getList() {
      http.ChinaEpidemicDataInquiry({ areaId: this.cityId }).then(res => {
        if (!res.status.success) {
          uni.showModal({
            title: this.option.city + '-当前城市没有疫情数据',
            content: '当前城市没有疫情数据，请返回选择其他城市',
            success: function (res) {
              uni.navigateBack({
                delta: 1,
              });
            },
          });
        }
        res.body.lastUpdateTime = getDateTime(res.body.lastUpdateTime);
        this.cityData = res.body;
        this.cityList = [];
        // 全国省市列表数据
        res.body.children.forEach(item => {
          if (item.total.confirm == 0 && item.total.confirm == 0 && item.total.dead == 0 && item.total.heal == 0) {
          } else {
            this.cityList.push({
              name: item.name,
              storeConfirm: item.today.confirm,
              confirm: item.total.confirm,
              dead: item.total.dead,
              heal: item.total.heal,
            });
          }
        });

        http.FeatureCollectionInquiry({ id: this.cityId }).then(map => {
          if (map.body.featureListStr == '请求失败') {
            uni.showModal({
              title: this.option.city + '-当前城市没有数据',
              content: '当前城市没有数据，请返回选择其他城市',
              success: function (res) {
                uni.navigateBack({
                  delta: 1,
                });
              },
            });
            return;
          }
          let featureListStr = JSON.parse(map.body.featureListStr);
          console.log(featureListStr);
          for (let list of featureListStr.features) {
            // 获取疫情数量处理到地图上
            res.body.children.forEach(item => {
              // 全国地图 - 现有确诊
              if (item.id == list.properties.adcode) {
                list.properties.confirm = item.total.confirm;
                list.properties.map = {
                  name: item.name,
                  num: list.properties.confirm,
                };
                list.color = this.corGet(list.properties.confirm);
              } else {
                list.color = this.corGet(list.properties.confirm);
              }
            });
          }

          this.cityMapData.series = featureListStr.features;
        });
      });
    },
  },
};
</script>

<style>
page {
  background: #f7f8fa;
}
</style>
<style lang="scss" scoped>
::v-deep .u-navbar__content__title {
  color: #fff !important;
}
::v-deep .u-popup__content {
  z-index: 9999;
}
.index {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-size: contain;
  padding: 0 40rpx 80rpx 40rpx;
  background: url('https://cdgwin-prod.cn-bj.ufileos.com/gwin-platform/gwin-cloud/banner@2x.png') no-repeat;
	background: url('@/static/image/banner@2x.png') no-repeat;
  background-size: contain;
  .top {
    width: 100%;
    /*  #ifdef  H5 */
    // margin-top: 340rpx;
		margin-top: 200rpx;
    /*  #endif  */

    /*  #ifdef  MP */
    margin-top: 170rpx;
    /*  #endif  */
  }
  .numText {
    width: 138rpx;
    height: 184rpx;
    position: absolute;
    left: 30rpx;
    top: 100rpx;
  }
  .swiper {
    height: 180rpx;
  }
  .announcement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #444444;
    padding: 10rpx 0;

    view {
      display: flex;
      align-items: center;
    }
    img {
      width: 32rpx;
      height: 32rpx;
      margin-right: 20rpx;
    }
  }
  .mapBg {
    .box {
      min-width: 224rpx;
      max-width: 260rpx;
      height: 120rpx;
      background: #000000;
      border-radius: 20rpx;
      opacity: 0.6;
      position: absolute;
      top: 0;
      right: 0;
      padding: 20rpx;
      box-sizing: border-box;

      .title {
        font-size: 26rpx;
        font-weight: 500;
        color: #ffffff;
      }
      .num {
        font-size: 22rpx;
        font-weight: 400;
        color: #ffffff;
        padding-bottom: 7rpx;
        margin-bottom: 7rpx;
      }
    }
  }

  .charts-box {
    width: 100%;
    height: 300px;
    z-index: 1;
  }
  .epidemic {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 40rpx 80rpx 0rpx rgba(0, 10, 62, 0.05);
    border-radius: 20rpx;
    margin-top: 40rpx;
    padding: 30rpx;
    box-sizing: border-box;
    position: relative;
    .information {
      .informationList {
        margin-top: 40rpx;
        position: relative;
        .line::after {
          content: '';
          display: block;
          background-color: #eaf9f8;
          width: 4rpx;
          height: 122%;
          position: absolute;
          position: absolute;
          top: 2rpx;
          left: 14rpx;
        }
        .detail {
          display: flex;
          flex-direction: column;
          background: #f8f8f8;
          border-radius: 8rpx;
          padding: 20rpx;
          box-sizing: border-box;
          margin-left: 60rpx;
          margin-top: 10rpx;
          > view {
            margin-top: 20rpx;
            display: flex;
            align-items: center;
            font-size: 24rpx;
            font-weight: 400;
            color: #2ec7c2;
            text-align: center;
            padding-top: 10rpx;
          }
        }
        .titleTime {
          display: flex;
          align-items: center;
          img {
            width: 32rpx;
            height: 32rpx;
            margin-right: 30rpx;
            z-index: 99;
          }
          font-size: 28rpx;
          font-weight: 400;
          color: #aaaaaa;
          > text {
            width: 70rpx;
            height: 32rpx;
            background: linear-gradient(90deg, #64e5e0 0%, #29c5c1 100%);
            border-radius: 8rpx;
            font-size: 18rpx;
            font-weight: 500;
            color: #ffffff;
            text-align: center;
            margin-left: 20rpx;
          }
        }
      }
    }
    .more {
      display: flex;
      font-size: 28rpx;
      font-weight: 400;
      color: #aaaaaa;
      justify-content: center;
      padding-top: 40rpx;
    }
    .city {
      .cityTitle {
        background: #ffffff;
        font-size: 24rpx;
        font-weight: 500;
        color: #333333;
        display: flex;
        justify-content: space-around;
        padding: 20rpx 0;
        view {
          width: 20%;
          display: flex;
          justify-content: center;
        }
        view:nth-child(2) {
          color: #ff7c7c;
        }
        view:nth-child(3) {
          color: #ffaa64;
        }
        view:nth-child(4) {
          color: #aaaaaa;
        }
        view:nth-child(5) {
          color: #47e2b8;
        }
      }
      .cityList {
        font-size: 24rpx;
        font-weight: 500;
        color: #333333;
        display: flex;
        justify-content: space-around;
        height: 68rpx;
        background: #f8f8f8;
        border-radius: 34rpx;
        margin-bottom: 20rpx;
        view {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        view:nth-child(2) {
          color: #ff7c7c;
        }
        view:nth-child(3) {
          color: #ffaa64;
        }
        view:nth-child(4) {
          color: #aaaaaa;
        }
        view:nth-child(5) {
          color: #47e2b8;
        }
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > view {
        width: 192rpx;
        height: 192rpx;
        background: #ffffff;
        box-shadow: 0px 40rpx 80rpx 0rpx rgba(0, 10, 62, 0.05);
        border-radius: 20rpx;
        padding: 0 20rpx;
        margin-top: 30rpx;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        > view:nth-child(1) {
          margin-top: 10rpx;
          font-size: 40rpx;
          font-weight: bold;
          color: #75c1ff;
          padding: 14rpx 0;
        }
        text {
          font-size: 24rpx;
          font-weight: 500;
          color: #3b4664;
        }
        > view:nth-child(3) {
          margin-top: 8rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #aeb3c0;
          text {
            color: #75c1ff;
          }
        }
      }
    }
    .title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1a2234;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      .new {
        position: absolute;
        right: -30rpx;
        top: -32rpx;
        width: 88rpx;
        height: 88rpx;
      }
      > view {
        display: flex;
        align-items: center;
        img {
          width: 28rpx;
          height: 40rpx;
        }
        text {
          font-size: 32rpx;
          font-weight: 600;
          color: #46d5d0;
          padding: 0 12rpx;
        }
      }
    }
    .time {
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
