import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isGetDemosticDetail: false,
    demosticDetail: null, // 中国目前所有数据
    chinaTrendDetail: null, // 中国疫情趋势数据
    worldData: {},  // 世界疫情基本数据
    indexSet: 0,  // 判断是否设置数据
    allCountryData: null,  // 世界各国疫情信息
  },
  mutations: {},
  actions: {},
  modules: {},
})