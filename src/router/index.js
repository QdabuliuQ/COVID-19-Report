import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DomesticReport = () => import( "views/domesticReport/DomesticReport" )  // 国内疫情
const ProvinceDetail = () => import( "views/provinceDetail/ProvinceDetail" )  // 省份疫情

const routes = [
  { path: '/', redirect: '/DomesticReport' },
  { 
    path: '/DomesticReport', 
    component: DomesticReport, 
  },
  { path: '/ProvinceDetail/:cityName&:tableIndex', name: 'ProvinceDetail', component: ProvinceDetail }
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
