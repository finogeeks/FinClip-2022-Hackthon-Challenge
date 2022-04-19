<template>
  <view class="lb-tabbar">
    <view :class="[
        'lb-tabbar-content',
        fixed ? 'lb-tabbar--fixed' : ''
      ]"
      :style="{
        backgroundColor: bgColor,
        paddingBottom: `${safeAreaHeight}px`
      }">
      <view v-if="border"
        class="lb-tabbar-border"
        :style="{
          backgroundColor: borderColor,
          top: raisedeHeight + 'px'
        }">
      </view>
      <slot></slot>
    </view>
    <view v-if="placeholder"
      class="lb-tabbar-placeholder"
      :style="{
        height: `${tabbarHeight}px`
      }">
    </view>
  </view>
</template>

<script>
const SAFE_AREA_INSET_BOTTOM = 5
import { getPx } from './utils'
export default {
  props: {
    value: [String, Number],
    height: {
      type: String,
      default: '126rpx'
    },
    iconSize: {
      type: String,
      default: '44rpx'
    },
    textSize: {
      type: String,
      default: '26rpx'
    },
    textTop: {
      type: String,
      default: '5rpx'
    },
    dotColor: {
      type: String,
      default: '#F56C6C'
    },
    fixed: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    animate: String,
    closeAnimateOnRaisede: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#DCDFE6'
    },
    bgColor: {
      type: String,
      default: '#FFF'
    },
    inactiveColor: {
      type: String,
      default: '#909399'
    },
    activeColor: {
      type: String,
      default: '#409EFF'
    },
    inactiveTextColor: String,
    activeTextColor: String,
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    hideTabbar: {
      type: Boolean,
      default: true
    },
    raisedeScale: {
      type: Number,
      default: 2.5
    }
  },
  data () {
    return {
      active: this.value,
      activeItem: {},
      tabbarItems: [],
      hasRaisede: false,
      isIphoneX: false
    }
  },
  computed: {
    tabbarItemsLength () {
      return this.tabbarItems.length
    },
    safeAreaHeight () {
      return this.isIphoneX && this.safeAreaInsetBottom ? SAFE_AREA_INSET_BOTTOM : 0 // 苹果X等机型安全区高度
    },
    iconHeight () {
      return getPx(this.iconSize)
    },
    raisedeHeight () {
      return this.hasRaisede ? this.iconHeight * this.raisedeScale / 2 : 0 // 凸起高度
    },
    tabbarHeight () {
      const height = getPx(this.height) // 默认高度
      const raisedeHeight = this.hasRaisede ? this.iconHeight * this.raisedeScale / 2 : 0 // 凸起高度
      const tabbarHeight = height + this.safeAreaHeight + raisedeHeight // 整体高度
      return tabbarHeight
    }
  },
  provide () {
    return {
      tabbar: this
    }
  },
  created () {
    if (this.hideTabbar) {
      uni.hideTabBar()
    }
    const res = uni.getSystemInfoSync()
    const { model, statusBarHeight } = res
    if (
      (model.indexOf('iPhone') > -1 && statusBarHeight > 20) ||
      model.indexOf('iPhone X') > -1 ||
      model.indexOf('iPhone 1') > -1
    ) {
      this.isIphoneX = true
    }
    this.getTabbarHeight()
  },
  methods: {
    getTabbarHeight () {
      return this.tabbarHeight
    }
  },
  watch: {
    value (newVal) {
      this.active = newVal
    },
    active (newVal) {
      this.activeItem = this.tabbarItems.find(item => item.name === newVal)
      this.$emit('input', newVal)
      this.$emit('change', this.activeItem)
    },
    tabbarItemsLength () {
      this.hasRaisede = !!this.tabbarItems.find(item => item.raisede)
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
