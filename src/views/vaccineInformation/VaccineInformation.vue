<template>
  <div id="VaccineInformation">
    <div class="vac_top_container">
      <div class="vac_top_bgImg">
        <img src="https://z3.ax1x.com/2021/06/17/2znZOf.png" alt="">
      </div>
      <div class="vac_top_textBox">
        <div class="textBox_title">全球新冠疫苗</div>
        <div class="textBox_title2">接种情况实时追踪</div>
        <div class="textBox_title3">数据来源：ourworldindata，WHO等官方数据</div>
      </div>
    </div>
    <div class="vac_center_container">
      <vaccine-table></vaccine-table>
      <content-split
        :text="'全球疫苗疫情接种分布图'"
      ></content-split>
      <vaccine-map></vaccine-map>
      <content-split
        :text="'国内累计接种趋势图'"
      ></content-split>
      <vaccine-nation-tend></vaccine-nation-tend>
      <content-split
        :text="'世界主要国家接种情况'"
      ></content-split>
      <vaccine-countries ref="vaccine_countries"></vaccine-countries>
      <content-split
        :text="'世界各国疫苗信息'"
      ></content-split>
      <vaccine-detail-table></vaccine-detail-table>
    </div>
  </div>
</template>

<script>
import VaccineTable from './childComps/VaccineTable'  // 疫情表格
import VaccineMap from './childComps/VaccineMap'  // 地图组件
import VaccineNationTend from './childComps/VaccineNationTend'  // 国内疫苗趋势
import VaccineCountries from './childComps/VaccineCountries'  // 世界各国疫苗趋势
import VaccineDetailTable from './childComps/VaccineDetailTable'  // 世界疫苗信息

export default {
  name: 'VaccineInformation',
  data () {
    return {
      vaccine_countries_load: false,
    }
  },
  components: {
    VaccineTable,
    VaccineMap,
    VaccineNationTend,
    VaccineCountries,
    VaccineDetailTable
  },
  methods: {
    listenScroll() {
      let chartToTop = this.$refs.vaccine_countries.$el.getBoundingClientRect().top
      if (!this.vaccine_countries_load) {
        if (chartToTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
          this.$refs.vaccine_countries.loadChart(0)
          this.vaccine_countries_load = true
        }
      }
    }
  },
  activated () {
    document.addEventListener('scroll', this.listenScroll)
  },

  deactivated () {
    document.removeEventListener('scroll', this.listenScroll)
  }
}

</script>
<style scoped>
#VaccineInformation{
  width: 100%;
  margin-bottom: calc(45px + var(--marginB));
  background-color: #fff;
}
.vac_top_container{
  width: 100%;
  position: relative;
}
.vac_top_bgImg{
  width: 100%;
}
.vac_top_bgImg img{
  width: 100%;
}
.vac_top_textBox{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.textBox_title{
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 3px;
}
.textBox_title2{
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 3px;
}
.textBox_title3{
  font-size: 13px;
  color: rgba(255, 255, 255, 0.63);
}
.vac_center_container{
  margin-top: -25px;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}
</style>