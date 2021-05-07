import {request, viewRequest, rumorRequest} from './request'

export function getEpidemicTrend() {  // 获取国内疫情趋势
  return request({
    url: 'query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
  })
}

export function getDemosticDetail() {  // 获取国内基本数据
  return viewRequest({
    url: 'getOnsInfo?name=disease_h5'
  })
}


