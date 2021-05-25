import {provinceHospital, provinceMapJson, request, provinceNews} from './request'

export function getCityHospital(province){  // 获取城市医院
  return provinceHospital({
    url: 'api/THPneumoniaService/getHospitalCityByProvince',
    method: 'post',
    data: {
      args: {
        req: {
          province
        }
      },
      context: {channel: "AAEEviDRbllNrToqonqBmrER"},
      func: "getHospitalCityByProvince",
      service: "THPneumoniaOuterService"
    }
  })
}

export function getProvinceData(province) {  // 获取城市两个月数据
  return request({
    url: '/query/pubished/daily/list',
    method: 'get',
    params: {
      province
    }
  })
}

export function getCityJson(cityName){  // 获取城市json数据
  return provinceMapJson({
    url: 'news/feiyanarea/' + cityName+'.json',
  })
}

export function getProvinceNews(province_code, page_size) {  // 省市疫情资讯
  return provinceNews({
    url: '/news/v1/province/news/list?province_code='+province_code+'&page_size='+page_size,
  })
}