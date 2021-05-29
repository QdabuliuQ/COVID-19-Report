<template>
  <div id="VaccineDetailTable">
    <table class="detail_table">
      <thead>
        <th>国家(地区)</th>
        <th>疫苗信息</th>
        <th>累计接种</th>
        <th>每百人接种</th>
        <th>最新日期</th>
      </thead>
      <tbody class="vaccine_table_tbody">
        <tr v-for="item,index in vaccineData" :key="index">
          <td class="vaccine_th1">{{item.country}}</td>
          <td class="vaccine_th2">{{item.vaccinations}}</td>
          <td class="vaccine_th3">{{item.total_vaccinations | setUnit}}剂</td>
          <td class="vaccine_th3">{{item.total_vaccinations_per_hundred}}剂</td>
          <td class="vaccine_th3">{{item.date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getVaccineAllData} from 'network/vaccineInformation'

export default {
  name: 'VaccineDetailTable',
  data () {
    return {
      vaccineData: []
    }
  },
  created () {
    getVaccineAllData().then(res =>{
      this.vaccineData = res.data.data.VaccineSituationData
    })
  }
}

</script>
<style scoped>
.detail_table{
  width: 100%;
  text-align: center;
}
.detail_table thead{
  background-color: #1d99d331;
}
.detail_table thead th{
  padding: 7px 5px;
  color: var(--color);
  font-size: 11px;
}
.vaccine_th1{
  width: 60px;
}
.vaccine_th2{
  max-width: 100px;
  word-break: keep-all;
  word-wrap: break-word;
}
.vaccine_table_tbody td{
  padding: 7px 0;
  box-sizing: border-box;
  font-size: 11.5px;
}
.vaccine_th3{
  width: 80px !important;
}
.vaccine_table_tbody tr:nth-of-type(even){
  background-color: #00aeff0c;
}
</style>