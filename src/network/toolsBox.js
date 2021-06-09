import {request, RumourList, anotherRequest} from './request'

export function getNationalNews() {  // 获取国内日报
  return request({
    url: 'automation/modules/list?modules=FAutoNewsArticleList'
  })
}

export function getAllRumour() {  // 获取谣言大全
  return RumourList({
    url: '/2020/0130/454/3393874921745912507-115.json?t=27002936'
  })
}

export function getCityList () {  // 获取城市列表
  return anotherRequest({
    url: '/api/trackmap/citylist?'
  })
}

export function getCityPolicy(city_id) {  // 城市政策
  return anotherRequest({
    url: '/api/trackmap/citypolicy',
    params: {
      city_id
    }
  })
}