<script>
export default {
  onLaunch: function () {
    // 友盟统计
    this.uMeng();
    // console.log('App Launch');
  },
  onShow: function () {
    // console.log('App Show');
  },
  onHide: function () {
    // console.log('App Hide');
  },
  watch: {
    $route(to, from) {
      // console.log(to, from);
    },
  },
  methods: {
    uMeng() {
      // #ifdef H5
      const script = document.createElement('script');
      script.src = 'https://s4.cnzz.com/z_stat.php?id=1280977143&web_id=1280977143';
      script.language = 'JavaScript';
      document.body.appendChild(script);
      // #endif
    },
  },
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
// 便捷css
@import './style/base.scss';
</style>
