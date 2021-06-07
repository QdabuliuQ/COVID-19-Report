import {request, RumourList} from './request'

export function getNationalNews() {  // 获取国内日报
  return request({
    url: 'automation/modules/list?modules=FAutoNewsArticleList'
  })
}

export function getAllRumour() {  // 获取问题大全
  return RumourList({
    url: '/2020/0130/454/3393874921745912507-115.json?t=27002936'
  })
}