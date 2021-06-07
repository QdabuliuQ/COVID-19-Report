<template>
  <div id="VaccineDetailTable">
    <div class="table_thead">
      <div class="thead_items1">国家(地区)</div>
      <div class="thead_items1">疫苗信息</div>
      <div class="thead_items1">累计接种</div>
      <div class="thead_items1">每百人接种</div>
      <div class="thead_items1">最新日期</div>
      <div style="clear:both"></div>
    </div>
    <table class="detail_table">
      <tbody class="vaccine_table_tbody">
        <tr class="vaccine_table_tr" v-for="(item, index) in vaccineData" :key="index">
          <td class="vaccine_td_item vaccine_th1">{{ item.country }}</td>
          <td class="vaccine_td_item vaccine_th2">{{ item.vaccinations }}</td>
          <td class="vaccine_td_item vaccine_th3">{{ item.total_vaccinations | setUnit }}剂</td>
          <td class="vaccine_td_item vaccine_th3">
            {{ item.total_vaccinations_per_hundred }}剂
          </td>
          <td class="vaccine_td_item vaccine_th3">{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getVaccineAllData } from "network/vaccineInformation";

export default {
  name: "VaccineDetailTable",
  data() {
    return {
      vaccineData: [],
    };
  },
  created() {
    getVaccineAllData().then((res) => {
      this.vaccineData = res.data.data.VaccineSituationData;
      this.$nextTick(() => {
        let theadDom = document.getElementsByClassName('thead_items1')
        let theadTrDomItem = document.getElementsByClassName('vaccine_table_tr')[0].getElementsByClassName('vaccine_td_item')
        console.log();
        for (let i = 0; i < theadTrDomItem.length; i++) {
          theadDom[i].style.width = (window.getComputedStyle(theadTrDomItem[i])).width
          theadDom[i].style.height = '85px'
          if (i != theadTrDomItem.length - 1) {
            theadDom[i].style.marginRight = '1.6px'
          }
        }
      })
    });
  },
};
</script>
<style scoped>
.detail_table {
  width: 100%;
  text-align: center;
}
.detail_table thead th {
  padding: 7px 5px;
  color: var(--color);
  font-size: 11px;
}
.vaccine_th1 {
  width: 60px;
}
.vaccine_th2 {
  max-width: 100px;
  word-break: keep-all;
  word-wrap: break-word;
}
.vaccine_table_tbody td {
  padding: 7px 0;
  box-sizing: border-box;
  font-size: 11.5px;
}
.vaccine_th3 {
  width: 80px !important;
}
.vaccine_table_tbody tr:nth-of-type(even) {
  background-color: #00aeff0c;
}
.table_thead{
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.thead_items1{
  float: left;
  text-align: center;
  background-color: #4db4e4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 5px;
  box-sizing:border-box;
}
</style>