
<template>
  <div id="worldReport">
    <div class="report_top_container">
      <div class="top_container_imgBox">
        <img src="https://img.coolcr.cn/2021/05/29/f2e71a252333b.jpg" alt="">
      </div>
      <div class="top_container_textBox">
        <div class="textBox_title">新型冠状病毒</div>
        <div class="textBox_title2">全球疫情实时追踪</div>
        <div class="textBox_title3">数据来源：WHO和霍普金斯大学网站</div>
      </div>
    </div>
    <div class="report_center_container">
      <report-table></report-table>
      <content-split :text="'海外多国累计趋势'"></content-split>
      <countries-trend></countries-trend>
      <content-split :text="'印度疫情趋势图'"></content-split>
      <serious-country></serious-country>
      <content-split :text="'海外疫情趋势图'"></content-split>
      <oversea-trend></oversea-trend>
    </div>
  </div>
</template>

<script>
import reportTable from './childComps/reportTable'  // 基本数据表格
import countriesTrend from './childComps/countriesTrend'  // 主要国家疫情趋势
import seriousCountry from './childComps/seriousCountry'  // 严重国家的疫情趋势
import overseaTrend from './childComps/overseaTrend'  // 海外趋势

export default {
  name: 'WorldReport',
  components: {
    reportTable,
    countriesTrend,
    seriousCountry,
    overseaTrend
  }
}

</script>
<style scoped>
#worldReport{
  width: 100%;
  margin-bottom: calc(1.2rem + var(--marginB));
}
.report_top_container{
  width: 100%;
  position: relative;
}
.top_container_imgBox img{
  width: 100%;
}
.top_container_textBox{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.textBox_title {
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 3px;
}
.textBox_title2 {
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.textBox_title3 {
  font-size: 12px;
  color: rgb(221, 221, 221);
  letter-spacing: 1px;
}
.report_center_container{
  margin-top: -25px;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}
</style>