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
      <content-split
        @clickEvent="sharePlaybill"
        :btnText="'疫情地图'"
        :text="'中国疫情分布图'"
      ></content-split>
      <!-- 中国地图 -->
      <demostic-map @toggleEvent="toggleEvent" :typeIndex='1' ref="demostic_map"></demostic-map>
      <content-split :text="'中国疫情趋势图表'"></content-split>
      <!-- 疫情趋势 -->
      <demostic-trend ref="demostic_trend"></demostic-trend>
      <!-- 无症状数量趋势 -->
      <demostic-noinfect ref="demostic_noinfect"></demostic-noinfect>

      <content-split :text="'中国各省市数据汇总'"></content-split>
      <demostic-city-table ref="cityTable"></demostic-city-table>
    </div>
    <playbill-template :margin="'170px auto 0'" ref="playbillTemplate">
      <img
        slot="topSlot"
        class="topImage"
        src="~assets/image/playbillElement.png"
        alt=""
      />
      <div v-if="demosticList" slot="centerSlot" style="padding: 15px">
        <div class="dataTable">
          <div class="confirmSumColor marginL basis_table_item">
            <div class="table_item_title">累计确诊</div>
            <div class="table_item_num">
              {{ $store.state.demosticDetail.chinaTotal.confirm }}
            </div>
            <div class="table_item_add">
              {{ $store.state.demosticDetail.chinaAdd.confirm | addCount }}
            </div>
          </div>
          <div class="healSumColor marginL basis_table_item">
            <div class="table_item_title">累计治愈</div>
            <div class="table_item_num">
              {{ $store.state.demosticDetail.chinaTotal.heal }}
            </div>
            <div class="table_item_add">
              {{ $store.state.demosticDetail.chinaAdd.heal | addCount }}
            </div>
          </div>
          <div class="dealSumColor marginL basis_table_item">
            <div class="table_item_title">累计死亡</div>
            <div class="table_item_num">
              {{ $store.state.demosticDetail.chinaTotal.dead }}
            </div>
            <div class="table_item_add">
              {{ $store.state.demosticDetail.chinaAdd.dead | addCount }}
            </div>
          </div>
        </div>
        <div style="font-size: 12px; text-align: left; margin-top: 5px">
          统计截至：{{ demosticList.lastUpdateTime }}
        </div>
        <demostic-map :typeIndex='2' ref="playbillDemosticmap"></demostic-map>
        <!-- <div id="chartDom"></div> -->
      </div>
    </playbill-template>
    <van-popup v-model="showPopup">
      <div class="playbillBox">
        <img :src="imageUrl" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script>

import playbillTemplate from "components/private/playbillTemplate"; // 海报模板
import html2canvas from "html2canvas";
import { Toast } from "vant"; // 导入加载动画
import reportTable from "./childComps/reportTable";
import demosticMap from "./childComps/demosticMap"; // 地图组件
import demosticTrend from "./childComps/demosticTrend"; // 图表组件
import demosticNoinfect from "./childComps/demosticNoinfect"; // 图表组件
import demosticCityTable from "./childComps/demosticCityTable"; // 城市数据汇总
import { throttle } from "static/js/throttle";
import { getDemosticDetail } from "network/demosticReport"; // 网络请求

export default {
  name: "DomesticReport",
  data() {
    return {
      imageUrl: "",
      allCityDetail: [],
      allCitySumDetail: [],
      showPopup: false,
      pushTime: "",
      demosticList: null,
      tableToTop: 500, // 表格顶部的距离
      demostic_trend_load: false, // 国内疫情趋势是否加载
      demostic_noinfect_load: false, // 国内无症状趋势是否加载
      throttleFun: null, // 防抖动函数
      throttleStopFun: null,
    };
  },
  methods: {
    toggleEvent(index) {
      this.$refs.playbillDemosticmap.toggleShowMap(index)
    },

    sharePlaybill() {
      if (this.$store.state.demosticDetail) {
        Toast.loading({
          message: "加载中...", //加载的时候显示的文字
          duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
          overlay: true, //是否显示遮罩层
          forbidClick: true, //是否禁止背景点击
        });
      }
      html2canvas(this.$refs.playbillTemplate.$el, {
        scale: 2,
        dpi: 300,
        height: this.$refs.playbillTemplate.$el.clientHeight, // 去除图片白边问题
        width: document.documentElement.clientWidth,
      }).then((canvas) => {
        // 生成图片
        this.imageUrl = canvas.toDataURL("image/png");
        Toast.clear();
        this.showPopup = true;
      });
    },

    // setMapOptions(cityData, nowPieces) {
    //   // 地图参数
    //   return {
    //     visualMap: {
    //       show: true,
    //       type: "piecewise",
    //       splitNumber: 4,
    //       itemWidth: 24,
    //       itemHeight: 12,
    //       itemGap: 5,
    //       textStyle: {
    //         color: "#999",
    //         fontSize: 12,
    //       },
    //       pieces: nowPieces,
    //     },
    //     tooltip: {
    //       trigger: "item",
    //       triggerOn: "click",
    //       textStyle: {
    //         color: "#FFF", // 文字的颜色
    //         fontSize: "12", // 文字字体大小
    //       },
    //       padding: [7],
    //       backgroundColor: "rgba(0, 0, 0, 0.623)",
    //       borderColor: "transparent",
    //       axisPointer: {
    //         type: "cross",
    //         crossStyle: {
    //           color: "#999",
    //         },
    //       },
    //       formatter: function (params) {
    //         return (
    //           "地区：" +
    //           params.data.name +
    //           "<br>" +
    //           "确诊人数：" +
    //           params.data.value
    //         );
    //       },
    //     },
    //     series: [
    //       {
    //         name: "",
    //         type: "map",
    //         mapType: "china",
    //         roam: false,
    //         zoom: 1.2,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: true,
    //             },
    //           },
    //           emphasis: {
    //             label: {
    //               show: true,
    //             },
    //           },
    //         },
    //         label: {
    //           normal: {
    //             textStyle: {
    //               fontSize: 10,
    //               color: "#333",
    //             },
    //           },
    //           emphasis: {
    //             show: true,
    //           },
    //         },
    //         data: cityData != undefined ? cityData : [],
    //       },
    //     ],
    //   };
    // },

    DemosticDetail() {
      // console.log(this.$store.state.demosticDetail);
      if (!this.$store.state.demosticDetail) {
        // 判断本地是否储存了数据
        // 发起网络请求
        getDemosticDetail().then((res) => {
            // this.demosticList = JSON.parse(decodeURIComponent(result));
            this.$store.state.demosticDetail = res.data.data.diseaseh5Shelf; // 保存数据到store
          this.demosticList = this.$store.state.demosticDetail
        });
      } else {
        this.demosticList = this.$store.state.demosticDetail;
      }
    },

    // 加载图表
    loadDemosticTrend() {
      let toTop = this.$refs.demostic_trend.$el.getBoundingClientRect().top;
      if (
        toTop <=
        window.innerHeight - this.$store.state.nav_bar_clientHeight
      ) {
        this.$refs.demostic_trend.loadCharts(0); // 加载图表
        this.demostic_trend_load = true; // 修改判断条件
      }
    },

    loadDemosticNoinfect() {
      let toTop = this.$refs.demostic_noinfect.$el.getBoundingClientRect().top;
      if (
        toTop <=
        window.innerHeight - this.$store.state.nav_bar_clientHeight
      ) {
        this.$refs.demostic_noinfect.setChartsOption();
        this.demostic_noinfect_load = true;
      }
    },

    listenScroll() {
      if (!this.demostic_trend_load) {
        this.loadDemosticTrend();
      }
      if (!this.demostic_noinfect_load) {
        this.loadDemosticNoinfect();
      }
    },
  },
  components: {
    reportTable,
    demosticMap,
    demosticTrend,
    demosticNoinfect,
    demosticCityTable,
    playbillTemplate,
  },
  created() {
    this.DemosticDetail();
  },
  mounted() {
    this.throttleFun = throttle(this.$refs.cityTable.fixdHead, 150);

    this.throttleStopFun = throttle(this.$refs.cityTable.hideHead, 150);

    setTimeout(() => {
      this.tableToTop = this.$refs.cityTable.$el.getBoundingClientRect().top;
      window.addEventListener("scroll", (e) => {
        // 监听滚动
        if (
          window.pageYOffset >= this.tableToTop &&
          window.pageYOffset <= this.tableToTop + 100
        ) {
          this.throttleFun();
        } else if (window.pageYOffset < this.tableToTop) {
          this.throttleStopFun();
        }
      });

    }, 600);
  },
  activated() {
    document.addEventListener("scroll", this.listenScroll);
  },
  deactivated() {
    document.removeEventListener("scroll", this.listenScroll);
  },
};
</script>
<style scoped>
#DomesticReport {
  margin-bottom: calc(45px + var(--marginB));
}
.playbillBox {
  width: 85vw;
  border-radius: 8px;
  overflow: hidden;
}
.playbillBox img {
  width: 100%;
}
.dataTable {
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 7px;
  overflow: hidden;
}
.basis_table_item {
  flex: 1;
  padding: 8px 0;
}
.table_item_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: 0.5px;
  margin-bottom: 0.5px;
}
.table_item_num {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 0.5px;
  font-weight: 550;
}
.table_item_add {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  color: #777777;
}
.confirmSumColor {
  background-color: hsla(0, 74%, 42%, 0.11);
}
.confirmSumColor .table_item_num {
  color: #b91c1c;
}
.healSumColor {
  background-color: hsla(115, 93%, 44%, 0.11);
}
.healSumColor .table_item_num {
  color: #19d808;
}
.dealSumColor {
  background-color: hsla(0, 0%, 51%, 0.11);
}
.dealSumColor .table_item_num {
  color: #838383;
}
#chartDom {
  width: 80vw;
  height: 40vh;
  margin: 0 auto;
}
.topImage {
  width: 140px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}
.chartContent {
  width: 91vw;
  height: 60vh;
  background-color: #fff;
  margin: 24vh auto 0;
  border-radius: 8px;
}
.van-popup {
  background-color: transparent;
}
.report_top_bgcImg {
  width: 100%;
  position: relative;
  z-index: 0;
  height: 185px;
}
.report_top_bgcImg img {
  width: 100%;
  height: 100%;
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