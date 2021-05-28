<template>
  <div id="VaccineInformation">
    <div class="vac_top_container">
      <div class="vac_top_bgImg">
        <img src="https://img.coolcr.cn/2021/05/26/0328b3ac79b3f.png" alt="">
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
      <vaccine-countries></vaccine-countries>
    </div>
  </div>
</template>

<script>
import VaccineTable from './childComps/VaccineTable'  // 疫情表格
import VaccineMap from './childComps/VaccineMap'  // 地图组件
import VaccineNationTend from './childComps/VaccineNationTend'  // 国内疫苗趋势
import VaccineCountries from './childComps/VaccineCountries'  // 世界各国疫苗趋势

export default {
  name: 'VaccineInformation',
  data () {
    return {
    }
  },
  components: {
    VaccineTable,
    VaccineMap,
    VaccineNationTend,
    VaccineCountries
  }
}

</script>
<style scoped>
#VaccineInformation{
  width: 100%;
  margin-bottom: calc(45px + var(--marginB));
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
  font-weight: 550;
  letter-spacing: 2px;
  margin-bottom: 3px;
}
.textBox_title2{
  font-size: 17px;
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