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


const DomesticReport = () => import( "views/domesticReport/DomesticReport" )  // 国内疫情
const ProvinceDetail = () => import( "views/provinceDetail/ProvinceDetail" )  // 省份疫情
const VaccineInformation = () => import( "views/vaccineInformation/VaccineInformation" )  // 疫苗接种

const routes = [
  { path: '/', redirect: '/DomesticReport' },
  { 
    path: '/DomesticReport', 
    component: DomesticReport, 
  },
  { path: '/ProvinceDetail/:cityName&:tableIndex', name: 'ProvinceDetail', component: ProvinceDetail },
  { path: '/VaccineInformation', component: VaccineInformation }
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
