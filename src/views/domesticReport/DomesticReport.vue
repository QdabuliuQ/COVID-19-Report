<template>
  <div id="DomesticReport">
    <div class="report_top_bgcImg">
      <div class="top_bgcImg_container">
        <div class="bgcImg_container_firstTitle">新型冠状病毒</div>
        <div class="bgcImg_container_secondTitle">疫情实时大数据报告</div>
        <div class="bgcImg_container_resource">
          数据来源：国家及各地卫健委每日信息发布
        </div>
      </div>
      <img src="~assets/image/homePageBgImage.png" alt="" />
    </div>
    <div v-if="demosticList" class="report_container">
      <!-- 疫情信息汇总表格 -->
      <report-table></report-table>
      <div class="pushTime">统计截至：{{ demosticList.lastUpdateTime }}</div>
      <content-split :text="'中国疫情分布图'"></content-split>
      <!-- 中国地图 -->
      <demostic-map></demostic-map>
      <content-split :text="'中国疫情趋势图表'"></content-split>
      <!-- 疫情趋势 -->
      <demostic-trend ref="demostic_trend"></demostic-trend>
      <!-- 无症状数量趋势 -->
      <demostic-noinfect ref="demostic_noinfect"></demostic-noinfect>

      <content-split :text="'中国各省市数据汇总'"></content-split>
      <demostic-city-table ref="cityTable"></demostic-city-table>
    </div>
  </div>
</template>

<script>
import reportTable from "./childComps/reportTable";
import demosticMap from "./childComps/demosticMap"; // 地图组件
import demosticTrend from "./childComps/demosticTrend"; // 图表组件
import demosticNoinfect from "./childComps/demosticNoinfect"; // 图表组件
import demosticCityTable from "./childComps/demosticCityTable"; // 城市数据汇总
import { throttle } from "static/js/throttle"
import { getDemosticDetail } from "network/demosticReport"; // 网络请求

export default {
  name: "DomesticReport",
  data() {
    return {
      pushTime: "",
      demosticList: null,
      tableToTop: 500, // 表格顶部的距离
      demostic_trend_load: false,  // 国内疫情趋势是否加载
      demostic_noinfect_load: false,  // 国内无症状趋势是否加载
      throttleFun: null,  // 防抖动函数
      throttleStopFun: null
    };
  },
  methods: {
    DemosticDetail() {
      if (!this.$store.state.demosticDetail) {
        // 判断本地是否储存了数据
        // 发起网络请求
        getDemosticDetail().then((res) => {
          if (typeof res.data.data == "string") {
            let result = JSON.parse(res.data.data);
            this.demosticList = result;
            this.$store.state.demosticDetail = result; // 保存数据到store
          }
        });
      } else {
        this.demosticList = this.$store.state.demosticDetail;
      }
    },

    // 加载图表
    loadDemosticTrend() {
      let toTop = this.$refs.demostic_trend.$el.getBoundingClientRect().top
      if (toTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
        this.$refs.demostic_trend.loadCharts(0)  // 加载图表
        this.demostic_trend_load = true  // 修改判断条件
      }
    },

    loadDemosticNoinfect() {
      let toTop = this.$refs.demostic_noinfect.$el.getBoundingClientRect().top
      if (toTop <= window.innerHeight - this.$store.state.nav_bar_clientHeight) {
        this.$refs.demostic_noinfect.setChartsOption()
        this.demostic_noinfect_load = true
      }
    },

    listenScroll() {
      if (!this.demostic_trend_load) {
        this.loadDemosticTrend()
      }
      if (!this.demostic_noinfect_load) {
        this.loadDemosticNoinfect()
      }
    }
  },
  components: {
    reportTable,
    demosticMap,
    demosticTrend,
    demosticNoinfect,
    demosticCityTable,
  },
  created() {
    this.DemosticDetail();
  },
  mounted() {
    this.throttleFun = throttle(this.$refs.cityTable.fixdHead, 150)

    this.throttleStopFun = throttle(this.$refs.cityTable.hideHead, 150)

    setTimeout(() => {
      this.tableToTop = this.$refs.cityTable.$el.getBoundingClientRect().top;
      window.addEventListener("scroll", (e) => {  // 监听滚动
        if (window.pageYOffset >= this.tableToTop && window.pageYOffset <= this.tableToTop + 100) {
          this.throttleFun()
        } else if(window.pageYOffset < this.tableToTop){
          this.throttleStopFun()
        }
      });
    }, 600);
  },
  activated () {
    document.addEventListener('scroll', this.listenScroll)
  },
  deactivated () {
    document.removeEventListener('scroll', this.listenScroll)
  }
};
</script>
<style scoped>
#DomesticReport{
  margin-bottom: calc(45px + var(--marginB));
}
.report_top_bgcImg {
  width: 100%;
  position: relative;
  z-index: 0;
}
.report_top_bgcImg img {
  width: 100%;
}
.top_bgcImg_container {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.bgcImg_container_firstTitle {
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 3px;
}
.bgcImg_container_secondTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.bgcImg_container_resource {
  font-size: 12px;
  color: rgb(221, 221, 221);
  letter-spacing: 0.5px;
}
.report_container {
  margin-top: -25px;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}
.pushTime {
  margin-top: 8px;
  font-size: 11px;
  text-align: right;
  color: rgb(131, 131, 131);
  margin-bottom: var(--marginB);
}
</style>