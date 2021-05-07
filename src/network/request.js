import axios from 'axios'  // 导入axios
import { Toast } from 'vant';  // 导入加载动画

function startLoading() {
  ajaxTime ++
  Toast.loading({
    message: '加载中...',	//加载的时候显示的文字
    duration:0,						//展示时长(ms)，值为 0 时，toast 不会消失
    overlay:true, 				//是否显示遮罩层
    forbidClick: true			//是否禁止背景点击
  })
}

function exitLoading() {
  ajaxTime --
  if (ajaxTime == 0) {
    Toast.clear()
  }
}

let ajaxTime = 0
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.inews.qq.com/newsqa/v1',  // 请求根路径
    timeout: 5000,  // 请求时间
  })
  instance.interceptors.request.use(config => {
    startLoading()
    return config
  })

  instance.interceptors.response.use(config => {
    exitLoading()
    return config
  })
  return instance(config) // 返回 实例对象
}

export function viewRequest(config) {
  const instance = axios.create({
    baseURL: '/viewRequest',  // 请求根路径
    timeout: 5000,  // 请求时间
  })

  instance.interceptors.request.use(config => {
    startLoading()
    return config
  })

  instance.interceptors.response.use(config => {
    exitLoading()
    return config
  })
  return instance(config) // 返回 实例对象
}

export function anotherRequest(config) {
  const instance = axios.create({
    baseURL: '/inewsRequest',  // 请求根路径
    timeout: 5000,  // 请求时间
  })
  instance.interceptors.request.use(config => {
    startLoading()
    return config
  })

  instance.interceptors.response.use(config => {
    exitLoading()
    return config
  })
  return instance(config) // 返回 实例对象
}

export function rumorRequest(config) { 
  const instance = axios.create({
    baseURL: 'https://file1.dxycdn.com/',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    startLoading()
    return config
  })

  instance.interceptors.response.use(config => {
    exitLoading()
    return config
  })
  return instance(config) // 返回 实例对象
}