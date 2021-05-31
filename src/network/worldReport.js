import {request} from './request'

export function getWorldData() {  // 获取世界疫情基本数据
  return request({
    url: 'automation/modules/list?modules=FAutoGlobalStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd'
  })
}

export function getCountriesTrend() {  // 获取国家趋势
  return request({
    url: 'automation/modules/list?modules=FAutoCountryMerge'
  })
}

export function getCountryData(countrys) {  // 获取指定国家疫情趋势
  return request({
    url: 'automation/country/daily/list?countrys=' + countrys
  })
}

export function getOverseaTrend() {  // 海外疫情总趋势
  return request({
    url: 'automation/modules/list?modules=FAutoGlobalStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd'
  })
}