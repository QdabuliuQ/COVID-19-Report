import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Swipe, SwipeItem } from 'vant';  // 导入轮播图
Vue.use(Swipe);
Vue.use(SwipeItem);

import ContentSplit from "components/private/contentSplit/index.js"  // 引入分割线组件
Vue.use(ContentSplit)

import 'vant/lib/index.css'  // 引入vantCss文件

import 'assets/css/base.css'  // 导入全局样式
import 'assets/icon/common.css'  // 导入全局字体图标

import 'lib-flexible'  // 导入lib-flexible

import * as echarts from 'echarts'  // 导入echarts
Vue.prototype.$echarts = echarts
import 'assets/js/china.js'  // 导入china.js配合地图显示

Vue.config.productionTip = false

Vue.prototype.fGetChartFontSize = () => {
  // 获取像素比
  const dpr = window.devicePixelRatio;
  let fontSize = 14;
  if (dpr == 2) {
    fontSize = 19;
  } else if (dpr == 3) {
    fontSize = 30;
  } else if (dpr > 3) {
    fontSize = 30;
  }
  return fontSize;
},

Vue.filter('addCount', function(val) { 
  if (val > 0) {
    return '较昨日+' + val
  } else if (val == 0) {
    return '较昨日无新增'
  } else {
    return '较昨日' + val
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
