import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DomesticReport = () => import( "views/domesticReport/DomesticReport" )

const routes = [
  { path: '/', redirect: '/DomesticReport' },
  { path: '/DomesticReport', component: DomesticReport }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
