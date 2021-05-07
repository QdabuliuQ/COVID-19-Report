import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isGetDemosticDetail: false,
    demosticDetail: null,  // 中国目前所有数据
    chinaTrendDetail: null,  // 中国疫情趋势数据
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
