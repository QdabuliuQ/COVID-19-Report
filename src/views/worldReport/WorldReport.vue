
<template>
  <div id="worldReport">
    <div class="report_top_container">
      <div class="top_container_imgBox">
        <img src="https://www.picbed.cn/images/2021/06/08/1622190733.jpg" alt="">
      </div>
      <div class="top_container_textBox">
        <div class="textBox_title">新型冠状病毒</div>
        <div class="textBox_title2">全球疫情实时追踪</div>
        <div class="textBox_title3">数据来源：WHO和霍普金斯大学网站</div>
      </div>
    </div>
    <div class="report_center_container">
      <report-table></report-table>
      <content-split :text="'全球疫情信息分布情况'"></content-split>
      <world-map></world-map>
      <content-split :text="'印度疫情趋势图'"></content-split>
      <serious-country ref="serious_country"></serious-country>
      <content-split :text="'海外多国累计趋势'"></content-split>
      <countries-trend ref="countries_trend"></countries-trend>
      <content-split :text="'海外疫情趋势图'"></content-split>
      <oversea-trend ref="oversea_trend"></oversea-trend>
      <content-split :text="'海外各国详情信息'"></content-split>
      <countries-table></countries-table>
    </div>
  </div>
</template>

<script>
import reportTable from './childComps/reportTable'  // 基本数据表格
import worldMap from './childComps/worldMap'  // 世界地图组件
import countriesTrend from './childComps/countriesTrend'  // 主要国家疫情趋势
import seriousCountry from './childComps/seriousCountry'  // 严重国家的疫情趋势
import overseaTrend from './childComps/overseaTrend'  // 海外趋势
import countriesTable from './childComps/countriesTable'  // 各国详情信息

export default {
  name: 'WorldReport',
  data () {
    return {
      countries_trend_load: false,  // 判断是否加载图表
      serious_country_load: false,
      oversea_trend_load: false
    }
  },
  components: {
    worldMap,
    reportTable,
    countriesTrend,
    seriousCountry,
    overseaTrend,
    countriesTable
  },
  methods: {
    loadCountriesTrendLoad() {

    },

    listenScroll() {
      if (!this.serious_country_load) {
        let toTop = this.$refs.serious_country.$el.getBoundingClientRect().top
          if (toTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
          this.$refs.serious_country.setChartsOption(0)  // 加载图表
          this.serious_country_load = true  // 修改判断条件
        }
        
      } else if (!this.countries_trend_load) {
        let toTop = this.$refs.countries_trend.$el.getBoundingClientRect().top
          if (toTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
          this.$refs.countries_trend.setCharts()  // 加载图表
          this.countries_trend_load = true  // 修改判断条件
        }
      } else if (!this.oversea_trend_load) {
        let toTop = this.$refs.oversea_trend.$el.getBoundingClientRect().top
          if (toTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
          this.$refs.oversea_trend.setChartsOption2()  // 加载图表
          this.oversea_trend_load = true  // 修改判断条件
        }
      }
    }
  },
  activated () {
    if (!this.serious_country_load) {
      if (this.$refs.serious_country.$el.getBoundingClientRect().top <= window.innerHeight) {
        this.$refs.serious_country.setChartsOption()  // 加载图表
        this.serious_country_load = true  // 修改判断条件
      }
    }
    document.addEventListener('scroll', this.listenScroll)
  },
  deactivated () {
    document.removeEventListener('scroll', this.listenScroll)
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
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.textBox_title3 {
  font-size: 12px;
  color: rgb(221, 221, 221);
  letter-spacing: 1px;
}
.report_center_container{
  padding: 0 15px;
  position: relative;
  z-index: 1;
  margin-top: -25px;
}
</style>