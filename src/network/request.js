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


function requestMethod(config, baseURL) {  // 封装请求
  const instance = axios.create({
    baseURL,  // 请求根路径
    timeout: 10000,  // 请求时间
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

let ajaxTime = 0
export function request(config) {
  return requestMethod(config, 'https://api.inews.qq.com/newsqa/v1')
}

export function viewRequest(config) {
  return requestMethod(config, '/viewRequest')
}

export function anotherRequest(config) {
  return requestMethod(config, '/inewsRequest')
}

export function rumorRequest(config) { 
  return requestMethod(config, 'https://file1.dxycdn.com/')
}

export function provinceJsonRequest(config) {  // 获取省份json文件
  return requestMethod(config, 'https://file1.dxycdn.com/')
}


export function provinceHospital(config){
  return requestMethod(config, 'https://wechat.wecity.qq.com/')
}

export function provinceMapJson(config){  // 地图json数据
  return requestMethod(config, '/provinceMapJson')
}

export function provinceNews(config) {
  return requestMethod(config, '/provinceNewsRequest')
}

export function RumourList(config) {
  return requestMethod(config, 'https://file1.dxycdn.com')
}