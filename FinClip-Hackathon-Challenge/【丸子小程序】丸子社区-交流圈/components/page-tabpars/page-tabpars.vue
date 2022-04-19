<template>
  <lb-tabbar ref="tabbar"
    :value="active"
    :animate="animate">
    <lb-tabbar-item v-for="item in tabbars"
      :key="item.name"
      :name="item.name"
      :icon="item.icon"
      :dot="item.dot"
      :info="item.info"
      :raisede="item.raisede"
      icon-prefix="iconfont"
      @click="handleTabbarItemClick">
      {{ item.text }}
    </lb-tabbar-item>
  </lb-tabbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['active', 'animate', 'tabbars']),
  },
  methods: {
    ...mapMutations(['SET_ACTIVE']),
    handleTabbarItemClick (e) {
      console.log('click::', e)
      const name = e.name
      if (name === 'plus') {
        uni.showToast({
          title: '发布',
          icon: 'none'
        })
      } else {
        const tabbar = this.tabbars.find(item => item.name === name)
        uni.switchTab({
          url: tabbar.path,
          success: () => {
            // 切换后重新设置，因为不在在触发页面的created生命周期
            this.SET_ACTIVE(name)
          }
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
