<template>
  <view class="index">
    <!--  #ifdef  MP -->
    <u-navbar title="灰鲸疫情地图" leftIcon="　" :fixed="false" leftIconColor="#ffffff" bgColor="rgba(0,0,0,0)"></u-navbar>
    <!--  #endif -->

    <view class="top"></view>
    <view class="epidemic" v-if="indexData">
      <view class="title">全国疫情数据</view>
      <view class="time">截止 {{ indexData.lastUpdateTime }} 国家和省市卫健委数据统计</view>
      <view class="list">
        <view>
          <view>{{ indexData.total.input }}</view>
          <text>境外输入</text>
          <view>
            较昨日
            <text>
              <text v-if="indexData.today.input > 0">+</text>
              {{ indexData.today.input }}
            </text>
          </view>
        </view>
        <view>
          <view style="color: #ffaa64">{{ indexData.total.confirm - indexData.total.dead - indexData.total.heal }}</view>
          <text>现有确诊</text>
          <view>
            较昨日
            <text style="color: #ffaa64">
              <text style="color: #ffaa64" v-if="indexData.today.storeConfirm > 0">+</text>
              {{ indexData.today.storeConfirm }}
            </text>
          </view>
        </view>
        <view>
          <view style="color: #ff9481">{{ indexData.total.confirm }}</view>
          <text>累计确诊</text>
          <view>
            较昨日
            <text style="color: #ff9481">
              <text style="color: #ff9481" v-if="indexData.today.confirm > 0">+</text>
              {{ indexData.today.confirm }}
            </text>
          </view>
        </view>
        <view>
          <view style="color: #8184ff">{{ indexData.extData.noSymptom }}</view>
          <text>无症状感染者</text>
          <view>
            较昨日
            <text style="color: #8184ff">
              <text style="color: #8184ff" v-if="indexData.extData.incrNoSymptom > 0">+</text>
              {{ indexData.extData.incrNoSymptom }}
            </text>
          </view>
        </view>
        <view>
          <view style="color: #aeb3c0">{{ indexData.total.dead }}</view>
          <text>累计死亡</text>
          <view>
            较昨日
            <text style="color: #aeb3c0">
              <text style="color: #aeb3c0" v-if="indexData.today.dead > 0">+</text>
              {{ indexData.today.dead }}
            </text>
          </view>
        </view>
        <view>
          <view style="color: #47e2b8">{{ indexData.total.heal }}</view>
          <text>累计治愈</text>
          <view>
            较昨日
            <text style="color: #47e2b8">
              <text style="color: #47e2b8" v-if="indexData.today.heal > 0">+</text>
              {{ indexData.today.heal }}
            </text>
          </view>
        </view>
      </view>
    </view>
		<view class="epidemic-map" @click="goMap">
			<img src="@/static/map/banner.png" />
		</view>
    <view class="epidemic">
      <view class="title">
        实时疫情资讯播报
        <img src="@/static/image/bobao2x.png" />
        <img class="new" src="@/static/image/new.png" />
      </view>
      <swiper class="swiper" vertical autoplay circular>
        <swiper-item v-for="(item, index) of newsTitle" :key="index">
          <view class="announcement" v-for="(list, num) of item" :key="num" @click="goNews(list.id)">
            <view>
              <img src="@/static/image/dian@2x.png" />
              <text>{{ list.title }}</text>
            </view>
            <u-icon name="arrow-right" color="#aaaaaa"></u-icon>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="ad-bg">
      <img src="@/static/image/ad.png" alt="" />
      <text>查看详情</text>
    </view>
    <view class="epidemic" style="padding: 0">
      <view class="title" style="padding: 40rpx 0 0 28rpx">全国疫情地图</view>
      <view class="tab" style="padding: 0 0 0 28rpx">
        <text :class="tabIndex == 0 ? 'cor' : ''" @click="(tabIndex = 0), (mapIndex = '')">现有确诊</text>
        <text :class="tabIndex == 1 ? 'cor' : ''" @click="(tabIndex = 1), (mapIndex = '')">累计确诊</text>
      </view>
      <view class="mapBg">
        <view class="charts-box">
          <qiun-data-charts type="map" :opts="opts" @getIndex="getIndex" :chartData="tabIndex == 0 ? chartMapData : chartMapDataAll" background="none" />
        </view>
        <view class="box" :style="'left:' + mapIndex.event.x + 'rpx;top:' + mapIndex.event.y + 'rpx'" v-if="mapIndex.currentIndex > -1" @click="goPage(chartMapData.series[mapIndex.currentIndex].properties)">
          <view class="title">{{ chartMapData.series[mapIndex.currentIndex].properties.name }}</view>
          <view class="num">{{ tabIndex == 0 ? '现有确诊' : '累计确诊' }}：{{ tabIndex == 0 ? chartMapData.series[mapIndex.currentIndex].properties.map.num : chartMapDataAll.series[mapIndex.currentIndex].properties.map.num }}例</view>
          <view class="go">查看详情 ></view>
        </view>
      </view>
      <img class="numText" src="@/static/image/leftText.png" alt="" />
    </view>
    <view class="mapSel">
      <view class="city" @click="cityShow = true">{{ city.city }}</view>
      <img src="@/static/image/mapSelBg.png" alt="" @click="goCity" />
    </view>
    <view class="epidemic" v-if="false">
      <view class="title">昨日及今日新增阳性感染者地区</view>
    </view>
    <view class="epidemic">
      <view class="title">全国省市疫情情况</view>

      <view class="city">
        <!--  #ifdef  H5 -->
        <u-sticky offset-top="-40">
          <view class="cityTitle">
            <view>地区</view>
            <view>现有确诊</view>
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
            <view>现有确诊</view>
            <view>累计确诊</view>
            <view>死亡</view>
            <view>治愈</view>
          </view>
        </u-sticky>
        <!--  #endif -->
        <view class="cityList" v-for="(item, index) of cityList" :key="index" v-if="moreCitySHow ? index < 15 : true">
          <view>{{ item.name }}</view>
          <view>{{ item.storeConfirm }}</view>
          <view>{{ item.confirm }}</view>
          <view>{{ item.dead }}</view>
          <view>{{ item.heal }}</view>
        </view>
      </view>
      <view class="more" @click="moreCitySHow = !moreCitySHow">
        {{ moreCitySHow ? '查看更多地区' : '隐藏更多地区' }}
        <u-icon :name="moreCitySHow ? 'arrow-down' : 'arrow-up'" color="#aaaaaa"></u-icon>
      </view>
    </view>
    <view class="epidemic">
      <view class="title">实时疫情资讯</view>
      <view class="information">
        <view class="informationList" v-for="(item, index) of information" :key="index" v-if="moreTextSHow ? index < 10 : true" @click="goNews(item.id)">
          <text class="line"></text>
          <view class="titleTime">
            <img src="@/static/image/dian@2x.png" />
            {{ item.cutTime }}
            <text v-if="index == 0">最新</text>
          </view>
          <view class="detail">
            {{ item.title }}
            <view>
              查看详情
              <u-icon name="arrow-right" color="#2EC7C2"></u-icon>
            </view>
          </view>
        </view>
      </view>
      <view class="more" @click="moreTextSHow = !moreTextSHow">
        {{ moreTextSHow ? '查看更多资讯' : '隐藏更多资讯' }}
        <u-icon :name="moreTextSHow ? 'arrow-down' : 'arrow-up'" color="#aaaaaa"></u-icon>
      </view>
    </view>
    <u-picker :show="cityShow" :columns="columns" keyName="label" @confirm="changeHandler" @cancel="cityShow = false"></u-picker>
  </view>
</template>

<script>
import mapdata from './mapdata.json';
import http from '@/api/api';
import { getDateTime } from '@/common/util/util';

export default {
  data() {
    return {
      opts: {
        extra: { map: { mercator: true, borderColor: '#FCB99D' } },
        fontSize: '6',
      },
      moreTextSHow: true,
      moreCitySHow: true,
      city: {},
      cityShow: false,
      chartMapData: {
        categories: [],
        series: [],
      },
      chartMapDataAll: {
        categories: [],
        series: [],
      },
      information: [],
      indexData: '',
      cityList: [],
      mapdataNew: [],
      tabIndex: 0,
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
      newsTitle: [],
      mapCity: '',
      mapIndex: '',
    };
  },
  onLoad() {
    this.getList();
    this.getNews();
  },
  onShow() {
    const val = uni.getStorageSync('map');
    if (!val) {
      let item = {
        city: '北京',
        id: 110000,
      };
      uni.setStorageSync('map', JSON.stringify(item));
      this.city = item;
    } else {
      this.city = JSON.parse(val);
    }
  },
  methods: {
    goPage(val) {
      // console.log(val);
      this.city.city = val.name;
      this.city.id = val.adcode;

      let item = {
        city: val.name,
        id: val.adcode,
      };
      uni.setStorageSync('map', JSON.stringify(item));

      this.goCity();
    },
    getIndex(e) {
      this.mapIndex = e;
    },
    goNews(id) {
      uni.navigateTo({
        url: '/pages/index/detail?id=' + id,
      });
    },
    getNews() {
      http.InformationDataListInquiry({}).then(res => {
        res.body.infoList.forEach(info => {
          info.cutTime = getDateTime(info.cutTime);
        });
        this.information = res.body.infoList;
        for (var i = 0; i < this.information.length; i += 3) {
          this.newsTitle.push(this.information.slice(i, i + 3));
        }
      });
    },
    goCity() {
      uni.navigateTo({
        url: '/pages/index/city?id=' + this.city.id + '&&city=' + this.city.city,
      });
    },
    changeHandler(val) {
      this.cityShow = false;
      let item = {
        city: val.value[0].label,
        id: val.value[0].id,
      };
      this.city = item;
      uni.setStorageSync('map', JSON.stringify(item));

      uni.navigateTo({
        url: '/pages/index/city?id=' + val.value[0].id + '&&city=' + val.value[0].label,
      });
    },
    corGet(num) {
      let numNew = Number(num);
      // 判定数量给与色值
      if (numNew > 10000) {
        return '#8B0000';
      } else if (numNew > 1000 && numNew <= 9999) {
        return '#8B2323';
      } else if (numNew > 500 && numNew <= 999) {
        return '#fd0808';
      } else if (numNew > 100 && numNew <= 499) {
        return '#fe9365';
      } else if (numNew > 10 && numNew <= 99) {
        return '#fdc1a5';
      } else if (numNew > 1 && numNew <= 9) {
        return '#fae1d5';
      } else {
        return '#ffffff';
      }
    },
    getList() {
      http.ChinaEpidemicDataInquiry({ areaId: 0 }).then(res => {
        res.body.lastUpdateTime = getDateTime(res.body.lastUpdateTime);
        this.indexData = res.body;

        // 全国省市
        res.body.children.forEach(item => {
          this.cityList.push({
            name: item.name,
            storeConfirm: item.total.confirm - item.total.dead - item.total.heal,
            confirm: item.total.confirm,
            dead: item.total.dead,
            heal: item.total.heal,
          });
        });

        let existing = JSON.parse(JSON.stringify(mapdata.features));
        let cumulative = JSON.parse(JSON.stringify(mapdata.features));

        res.body.children.forEach(item => {
          for (let list of existing) {
            // 全国地图 - 现有确诊
            if (item.id == list.properties.adcode) {
              list.properties.confirm = item.total.confirm - item.total.dead - item.total.heal;
              list.color = this.corGet(list.properties.confirm);
              list.properties.map = {
                name: item.name,
                num: list.properties.confirm,
              };
            }
          }
          for (let list of cumulative) {
            // 全国地图 - 累计确诊
            if (item.id == list.properties.adcode) {
              list.properties.confirm = item.total.confirm;
              list.color = this.corGet(item.total.confirm);
              list.properties.map = {
                name: item.name,
                num: list.properties.confirm,
              };
            }
          }
        });
        this.chartMapData.series = existing;
        this.chartMapDataAll.series = cumulative;
      });
    },
		goMap() {
			//	#ifdef H5
			uni.navigateTo({
				url: '/pages/map/index'
			})
			//#endif
			//	#ifdef MP-WEIXIN
			uni.navigateTo({
				url: '/pages/map/url'
			})
			// #endif
		}
  }
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
  font-weight: bold !important;
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
  // background: url('@/static/image/banner@2x.png') no-repeat;
  background-size: contain;
  .top {
    width: 100%;
    /*  #ifdef  H5 */
    margin-top: 200rpx;
    // margin-top: 340rpx;
    /*  #endif  */

    /*  #ifdef  MP */
    margin-top: 170rpx;
    /*  #endif  */
  }
  .ad-bg {
    width: 100%;
    height: 194rpx;
    background: #fff;
    box-shadow: 0px 40px 80px 0px rgba(0, 10, 62, 0.05);
    border-radius: 20px;
    position: relative;
    margin-top: 28rpx;

    img {
      width: 100%;
      height: 100%;
    }
    text {
      position: absolute;
      width: 152rpx;
      height: 48rpx;
      background: linear-gradient(90deg, #64e5e0 0%, #29c5c1 100%);
      border-radius: 25rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #ffffff;
      left: 210rpx;
      bottom: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mapSel {
    width: 100%;
    box-sizing: border-box;
    margin-top: 28rpx;
    position: relative;
    .city {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      position: absolute;
      left: 36rpx;

      width: 240rpx;
      padding: 20rpx 30rpx;
      /*  #ifdef  H5 */
      top: 66rpx;
      /*  #endif  */

      /*  #ifdef  MP */
      top: 70rpx;
      /*  #endif  */
    }
    img {
      display: flex;
      /*  #ifdef  H5 */
      width: 100%;
      /*  #endif  */

      /*  #ifdef  MP */
      width: 675rpx;
      height: 160rpx;
      /*  #endif  */
    }
  }
  .swiper {
    height: 170rpx;
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
      display: flex;
      width: 32rpx;
      height: 32rpx;
      margin-right: 20rpx;
    }
    text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /*autoprefixer: on */
    }
  }
  .mapBg {
    position: relative;
    .box {
      min-width: 224rpx;
      max-width: 260rpx;
      height: 172rpx;
      background: #000000;
      border-radius: 20rpx;
      opacity: 0.6;
      position: absolute;
      top: 0;
      right: 0;
      padding: 20rpx;
      box-sizing: border-box;
      z-index: 99999;

      .title {
        font-size: 26rpx;
        font-weight: 500;
        color: #ffffff;
      }
      .num {
        font-size: 22rpx;
        font-weight: 400;
        color: #ffffff;
        border-bottom: 2rpx solid #979797;
        padding-bottom: 7rpx;
        margin-bottom: 7rpx;
      }
      .go {
        font-size: 22rpx;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .charts-box {
    width: 100%;
    height: 640rpx;
  }
	.epidemic-map {
		width: 100%;
		height: 160rpx;
		margin-top: 28rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		box-shadow: 0px 40rpx 80rpx 0rpx rgba(0, 10, 62, 0.05);
		img {
			width: 100%;
			height: 100%;
		}
	}
  .epidemic {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 40rpx 80rpx 0rpx rgba(0, 10, 62, 0.05);
    border-radius: 20rpx;
    margin-top: 28rpx;
    padding: 40rpx 28rpx;
    box-sizing: border-box;
    position: relative;
    .numText {
      width: 138rpx;
      height: 184rpx;
      position: absolute;
      left: 60rpx;
      bottom: 40rpx;
    }
    .tab {
      display: flex;
      text {
        width: 152rpx;
        height: 48rpx;
        background: #fff;
        border-radius: 25rpx;
        border: 2rpx solid #47d5d1;
        font-size: 24rpx;
        font-weight: 500;
        color: #47d5d1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20rpx;
      }
      .cor {
        background: linear-gradient(90deg, #64e5e0 0%, #29c5c1 100%) !important;
        color: #fff !important;
      }
    }
    .information {
      .informationList {
        margin-top: 22rpx;
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
            display: flex;
            align-items: center;
            justify-content: center;
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
        font-size: 24rpx;
        font-weight: 500;
        color: #333333;
        display: flex;
        justify-content: space-around;
        padding: 20rpx 0;
        background: #ffffff;
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
        width: 196rpx;
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
        position: absolute !important;
        right: -30rpx !important;
        top: -40rpx !important;
        width: 88rpx !important;
        height: 88rpx !important;
      }
      img {
        width: 50rpx;
        height: 44rpx;
        position: relative;
        top: 4rpx;
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
