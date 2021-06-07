import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决路由重复点击保存问题
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 路由懒加载
const DomesticReport = () => import( "views/domesticReport/DomesticReport" )  // 国内疫情
const ProvinceDetail = () => import( "views/provinceDetail/ProvinceDetail" )  // 省份疫情
const VaccineInformation = () => import( "views/vaccineInformation/VaccineInformation" )  // 疫苗接种
const WorldReport = () => import("views/worldReport/WorldReport")  // 世界疫情报告
const ToolsBox = () => import("views/toolsBox/ToolsBox")  // 世界疫情报告
const NationalNews = () => import("views/toolsBox/childComps/nationalNews")  // 国内疫情速报
const RumourRanking = () => import("views/toolsBox/childComps/rumourRanking")  // 疫情问题大全

const routes = [
  { path: '/', redirect: '/DomesticReport' },
  { 
    path: '/DomesticReport', 
    component: DomesticReport, 
  },
  { path: '/ProvinceDetail/:cityName&:tableIndex', name: 'ProvinceDetail', component: ProvinceDetail },
  { path: '/VaccineInformation', component: VaccineInformation },
  { path: '/WorldReport', component: WorldReport },
  { 
    path: '/ToolsBox', 
    component: ToolsBox,
  },
  { path: '/NationalNews', component: NationalNews },
  { path: '/RumourRanking', component: RumourRanking },
]

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
      } else {
          return {
              x: 0,
              y: 0
          }
      }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
