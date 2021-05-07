<template>
  <div id="DomesticReport">
    <div class="report_top_bgcImg">
      <div class="top_bgcImg_container">
        <div class="bgcImg_container_firstTitle">新型冠状病毒</div>
        <div class="bgcImg_container_secondTitle">疫情实时大数据报告</div>
        <div class="bgcImg_container_resource">数据来源：国家及各地卫健委每日信息发布</div>
      </div>
      <img src="https://img.coolcr.cn/2021/05/05/6da62c2601d05.png" alt="">
    </div>
    <div v-if="demosticList" class="report_container">
      <!-- 疫情信息汇总表格 -->
      <report-table></report-table>
      <div class="pushTime">统计截至：{{demosticList.lastUpdateTime}}</div>
      <content-split :text='"中国疫情分布图"'></content-split>
      <!-- 中国地图 -->
      <demostic-map></demostic-map>
      <content-split :text='"中国疫情趋势图表"'></content-split>
      <!-- 疫情趋势 -->
      <demostic-trend></demostic-trend>
    </div>
  </div>
</template>

<script>
import reportTable from './childComps/reportTable'
import demosticMap from './childComps/demosticMap'  // 地图组件
import demosticTrend from './childComps/demosticTrend'  // 图表组件

import {getDemosticDetail} from 'network/demosticReport'  // 网络请求

export default {
  name: 'DomesticReport',
  data () {
    return {
      pushTime: '',
      demosticList: null
    }
  },
  methods: {

    DemosticDetail() {
      if (!this.$store.state.demosticDetail) {  // 判断本地是否储存了数据
        // 发起网络请求
        getDemosticDetail().then(res => {
          if (typeof(res.data.data) == 'string') {
            let result = JSON.parse(res.data.data)
            this.demosticList = result
            this.$store.state.demosticDetail = result  // 保存数据到store
          }
        })
      } else {
        this.demosticList = this.$store.state.demosticDetail  
      }
    }
  },
  components: {
    reportTable,
    demosticMap,
    demosticTrend
  },
  created () {
    this.DemosticDetail()
  }
}

</script>
<style scoped>
.report_top_bgcImg{
  width: 100%;
  position: relative;
  z-index: 0;
}
.report_top_bgcImg img{
  width: 100%;
}
.top_bgcImg_container{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #Fff;
}
.bgcImg_container_firstTitle{
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 3px;
}
.bgcImg_container_secondTitle{
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.bgcImg_container_resource{
  font-size: 12px;
  color: rgb(221, 221, 221);
  letter-spacing: 0.5px;
}
.report_container{
  margin-top: -25px;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}
.pushTime{
  margin-top: 8px;
  text-align: right;
  color: rgb(131, 131, 131);
  margin-bottom: var(--marginB);
}
</style>