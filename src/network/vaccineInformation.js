import {request, provinceMapJson} from './request'

export function getWorldVaccineData() {
  return request({
    url: 'automation/modules/list?modules=VaccineTopData'
  })
}

export function getWorldJson(){  // 获取地图json
  return provinceMapJson({
    url: 'news/images/inews/2020/feiyan/area/world_geo_306.json'
  })
}

export function getVaccineData() {  // 获取全球疫苗信息
  return request({
    url: '/automation/modules/list?modules=VaccineSituationData'
  })
}

export function getVaccineChina() {  // 中国近两个月疫苗接种趋势
  return request({
    url: '/automation/modules/list?modules=ChinaVaccineTrendData'
  })
}

export function getVaccineCountries() {  // 世界各国疫苗接种情况
  return request({
    url: 'automation/modules/list?modules=VaccineTrendData'
  })
}

export function getVaccineAllData() {  // 世界各国疫苗信息
  return request({
    url: 'automation/modules/list?modules=VaccineSituationData'
  })
}