<template>
  <div id="countriesTable">
    <table class="table_list">
      <thead>
        <tr class="table_list_tr">
          <td class="table_thead_td thead_td_item1 thead_td_color1">地区</td>
          <td class="table_thead_td thead_td_item2 thead_td_color2">现存确诊</td>
          <td class="table_thead_td thead_td_item2 thead_td_color3">累计确诊</td>
          <td class="table_thead_td thead_td_item2 thead_td_color4">累计治愈</td>
          <td class="table_thead_td thead_td_item2 thead_td_color5">累计死亡</td>
          <td class="table_thead_td thead_td_item3 thead_td_color1">更多</td>
        </tr>
      </thead>
      <tbody>
        <tr class="table_list_tr country_tr" v-for="item in countryData" :key="item.name">
          <td>
            <div class="td_item_name">{{item.name}}</div>
          </td>
          <td>
            <div class="td_item_count">{{item.nowConfirm | setUnit(2)}}</div>
            <div class="td_item_newAdd">{{item.nowConfirmCompare | addCount}}</div>
          </td>
          <td>
            <div class="td_item_count">{{item.confirm | setUnit(2)}}</div>
            <div class="td_item_newAdd">{{item.confirmAdd | addCount}}</div>
          </td>
          <td>
            <div class="td_item_count">{{item.heal | setUnit(2)}}</div>
            <div class="td_item_newAdd">{{item.healCompare | addCount}}</div>
          </td>
          <td>
            <div class="td_item_count">{{item.dead | setUnit(2)}}</div>
            <div class="td_item_newAdd">{{item.deadCompare | addCount}}</div>
          </td>
          <td>
            <i class="iconfont icon-gengduo"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getAllCountryData} from "network/worldReport"

export default {
  name: 'countriesTable',
  data () {
    return {
      countryData: []  
    }
  },
  created () {
    getAllCountryData().then(res => {
      this.countryData = res.data.data
    })
  }
}

</script>
<style scoped>
.table_list{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  position: relative;
  table-layout : auto;
}
.table_list_tr{
  box-sizing: border-box;
  border-bottom: 1px solid rgb(236, 236, 236);
}
.table_list_tr td{
  padding: 7px 0;
}
.table_list_tr td .iconfont{
  font-size: 11px;
}
.thead_td_item1{
  width: 15% !important;
  word-wrap:break-word;
  word-break:break-all
}
.td_item_newAdd{
  font-size: 8.5px;
  margin-top: 3px;
  color: #727272;
}
.td_item_count{
  font-size: 11.5px;
}
.thead_td_item2{
  padding: 7px 3px !important;
}
.thead_td_item3{
  width: 10%;
}
.table_thead_td{
  padding: 7px 0 !important;
  font-size: 12px;
}
.thead_td_color1{
  background-color: rgba(236, 236, 236, 0.486);
}
.thead_td_color2{
  background-color: rgba(255, 228, 188, 0.486);
  color: rgb(248, 185, 91)
}
.thead_td_color3{
  background-color: rgba(255, 153, 153, 0.486);
  color: rgb(255, 110, 110);
}
.thead_td_color4{
  background-color: rgba(154, 255, 154, 0.486);
  color: rgb(67, 221, 67);
}
.thead_td_color5{
  background-color: rgba(148, 148, 148, 0.486);
  color: rgb(100, 100, 100);
}
.td_item_name{
  font-weight: 550;
  font-size: 12px;
}
.country_tr:nth-of-type(even){
  background-color: #9696960c;
}
</style>