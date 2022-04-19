import App from './App';

import uView from 'uview-ui';
Vue.use(uView);

// vconsole调试
// import VConsole from 'vconsole'
// new VConsole()


// #ifndef VUE3
import Vue from 'vue';
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
