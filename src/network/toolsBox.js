import {request, RumourList, anotherRequest, institutions, Transfer, vaccineData, vaccineNewsList} from './request'

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

export function getPatientsRoutes() {  // 获取病例轨迹
  return anotherRequest({
    url: '/api/travelFront',
  })
}

export function getInstitutions(region, page_index, page_size) {  // 获取机构
  return institutions({
    url: '/place_cloud/search/region',
    params: {
      region,
      table_id: '60b6f7c0b4a02d60289a3d22',
      orderby: 'id',
      page_index,
      page_size,
      key: 'YNVBZ-FRJK3-BPX36-3XHBZ-U7WFQ-KBFMJ'
    }
  })
}

export function getTransfer(id,type,date) {  // 迁徙路线
  return Transfer({
    url: 'app/qianxi/city',
    params: {
      dt: 'city',
      id,
      type,
      date,
      '_': '1623658817945',
    }
  })
}

export function getCityQushi(id,type,startDate) {  // 获取迁入迁出趋势数据
  return Transfer({
    url: 'app/qianxi/history',
    params: {
      dt: 'city',
      id,
      type,
      startDate,
      '_': '1623739834118',

    }
  })
}

export function getVaccineData(appid,schemaid,schemakey,size='',sort,order) {  // 获取疫苗信息
  return vaccineData({
    url: 'cache/wuji_public/object',
    params: {
      appid,
      schemaid,
      schemakey,
      size,
      sort,
      order,
    }
  })
}

export function getVaccineNews() {  // 获取疫苗动态
  return vaccineNewsList({
    url: 'share/topic_news?id=TWF202011100035496L'
  })
}