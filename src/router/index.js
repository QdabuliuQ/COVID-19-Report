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
const DomesticReport = () => import(/* webpackChunkName: "domesticDetail" */ "views/domesticReport/DomesticReport" )  // 国内疫情
const ProvinceDetail = () => import(/* webpackChunkName: "domesticDetail" */ "views/provinceDetail/ProvinceDetail" )  // 省份疫情
const VaccineInformation = () => import(/* webpackChunkName: "vaccineDetail" */ "views/vaccineInformation/VaccineInformation" )  // 疫苗接种
const WorldReport = () => import(/* webpackChunkName: "worldDetail" */ "views/worldReport/WorldReport")  // 世界疫情报告
const ToolsBox = () => import(/* webpackChunkName: "ToolsBox" */ "views/toolsBox/ToolsBox")  // 工具箱
const NationalNews = () => import(/* webpackChunkName: "newsDetail" */ "views/toolsBox/childComps/nationalNews")  // 国内疫情速报
const RumourRanking = () => import(/* webpackChunkName: "newsDetail" */ "views/toolsBox/childComps/rumourRanking")  // 疫情问题大全
const GoOutPolicy = () => import(/* webpackChunkName: "ToolsBox" */ "views/toolsBox/childComps/goOutPolicy")  // 出行政策
const PatientRoute = () => import(/* webpackChunkName: "routeDetail" */ "views/toolsBox/childComps/patientRoute")  // 病人轨迹
const SearchInstitution = () => import(/* webpackChunkName: "institutionDetail" */ "views/toolsBox/childComps/searchInstitution")  // 核素检测机构
const InstitutionMap = () => import(/* webpackChunkName: "institutionDetail" */ "views/toolsBox/childComps/institutionMap")  // 核素检测机构地图
const PopulationTransfer = () => import(/* webpackChunkName: "routeDetail" */ "views/toolsBox/childComps/populationTransfer")  // 入口迁徙
const VaccineDetail = () => import(/* webpackChunkName: "vaccineDetail" */ "views/toolsBox/childComps/vaccineDetail")  // 世界疫苗动态
const AppointVaccine = () => import(/* webpackChunkName: "vaccineDetail" */ "views/toolsBox/childComps/appointVaccine")  // 疫苗预约

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
  { path: '/GoOutPolicy', component: GoOutPolicy },
  { path: '/PatientRoute', component: PatientRoute },
  { path: '/SearchInstitution', component: SearchInstitution },
  { path: '/InstitutionMap', component: InstitutionMap },
  { path: '/PopulationTransfer', component: PopulationTransfer },
  { path: '/VaccineDetail', component: VaccineDetail },
  { path: '/AppointVaccine', component: AppointVaccine },
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
