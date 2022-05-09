
<template>
  <div id="worldReport">
    <div class="report_top_container">
      <div class="top_container_imgBox">
        <img src="~assets/image/worldPageBgImage.png" alt="" />
      </div>
      <div class="top_container_textBox">
        <div class="textBox_title">新型冠状病毒</div>
        <div class="textBox_title2">全球疫情实时追踪</div>
        <div class="textBox_title3">数据来源：WHO和霍普金斯大学网站</div>
      </div>
    </div>
    <div class="report_center_container">
      <report-table></report-table>
      <content-split
        @clickEvent="clickEvent"
        :btnText="'疫情地图'"
        :text="'全球疫情信息分布情况'"
      ></content-split>
      <world-map :typeIndex="1" @typeToggle="typeToggle"></world-map>
      <content-split :text="'印度疫情趋势图'"></content-split>
      <serious-country ref="serious_country"></serious-country>
      <content-split :text="'海外多国累计趋势'"></content-split>
      <countries-trend ref="countries_trend"></countries-trend>
      <content-split :text="'各大洲疫情累计确诊统计'"></content-split>
      <continentData></continentData>
      <content-split :text="'海外各国详情信息'"></content-split>
      <countries-table></countries-table>
    </div>
    <playbill-template
      :margin="'20px auto 0'"
      :height="'425px'"
      ref="playbillWorldTemplate"
    >
      <div slot="topSlot" class="playbillTopTitle">
        <img src="~assets/image/playbillElement3.png" alt="" />
        <div class="topTitleText">
          #<label style="color: #e3d24c">全球</label>疫情信息分布情况#
        </div>
      </div>
      <div slot="centerSlot">
        <div
          style="
            font-weight: bold;
            font-size: 15px;
            text-align: left;
            padding: 0 14px;
            padding-top: 20px;
            padding-bottom: 5px
          "
        >
          全球疫情概况
        </div>
        <report-table class="playbillTable"></report-table>
        <div
          style="
            font-weight: bold;
            font-size: 15px;
            text-align: left;
            padding: 0 14px;
            margin-top: 10px;
          "
        >
          全球疫情<label style="color: #1d99d3"> {{ dataType }} </label>分布图
        </div>
        <world-map-template
          ref="templateWorldMap"
          class="playbillMap"
          :typeIndex="2"
        ></world-map-template>
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
import { Toast } from "vant"; // 导入加载动画
import playbillTemplate from "components/private/playbillTemplate"; // 海报模板
import html2canvas from "html2canvas";
import reportTable from "./childComps/reportTable"; // 基本数据表格
import worldMap from "./childComps/worldMap"; // 世界地图组件
import worldMapTemplate from "./childComps/worldMapTemplate"; // 世界地图组件
import countriesTrend from "./childComps/countriesTrend"; // 主要国家疫情趋势
import seriousCountry from "./childComps/seriousCountry"; // 严重国家的疫情趋势
import overseaTrend from "./childComps/overseaTrend"; // 海外趋势
import countriesTable from "./childComps/countriesTable"; // 各国详情信息
import continentData from "./childComps/continentData.vue"; // 大洲数据

export default {
  name: "WorldReport",
  data() {
    return {
      countries_trend_load: false, // 判断是否加载图表
      serious_country_load: false,
      oversea_trend_load: false,
      dataType: "累计确诊",
      dataIndex: 0,
      loadTemplate: false,
      imageUrl: "",
      showPopup: false,
    };
  },
  components: {
    worldMap,
    reportTable,
    countriesTrend,
    seriousCountry,
    overseaTrend,
    countriesTable,
    continentData,
    worldMapTemplate,
    playbillTemplate,
  },
  methods: {
    typeToggle(type, index) {
      this.dataType = type;
      this.dataIndex = index;
    },

    clickEvent() {
      this.$refs.templateWorldMap.toggleShowMap(this.dataIndex);
      Toast.loading({
        message: "加载中...", //加载的时候显示的文字
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
        overlay: true, //是否显示遮罩层
        forbidClick: true, //是否禁止背景点击
      });
      setTimeout(() => {
        // 生成海报
        html2canvas(this.$refs.playbillWorldTemplate.$el, {
          scale: 2,
          dpi: 300,
          height: this.$refs.playbillWorldTemplate.$el.clientHeight, // 去除图片白边问题
          width: document.documentElement.clientWidth,
        }).then((canvas) => {
          // 生成图片
          this.imageUrl = canvas.toDataURL("image/png");
          Toast.clear();
          this.showPopup = true;
        });
      }, 500);
    },

    listenScroll() {
      if (!this.serious_country_load) {
        let toTop = this.$refs.serious_country.$el.getBoundingClientRect().top;
        if (
          toTop <=
          window.innerHeight - this.$store.state.nav_bar_clientHeight
        ) {
          this.$refs.serious_country.setChartsOption(0); // 加载图表
          this.serious_country_load = true; // 修改判断条件
        }
      } else if (!this.countries_trend_load) {
        let toTop = this.$refs.countries_trend.$el.getBoundingClientRect().top;
        if (
          toTop <=
          window.innerHeight - this.$store.state.nav_bar_clientHeight
        ) {
          this.$refs.countries_trend.setCharts(); // 加载图表
          this.countries_trend_load = true; // 修改判断条件
        }
      }
    },
  },
  activated() {
    if (!this.serious_country_load) {
      if (
        this.$refs.serious_country.$el.getBoundingClientRect().top <=
        window.innerHeight
      ) {
        this.$refs.serious_country.setChartsOption(); // 加载图表
        this.serious_country_load = true; // 修改判断条件
      }
    }
    document.addEventListener("scroll", this.listenScroll);
  },
  deactivated() {
    document.removeEventListener("scroll", this.listenScroll);
  },
};
</script>
<style scoped>
#worldReport {
  width: 100%;
  margin-bottom: calc(1.2rem + var(--marginB));
}
.van-popup {
  background-color: transparent;
}
.playbillBox {
  width: 85vw;
  border-radius: 8px;
  overflow: hidden;
}
.playbillBox img {
  width: 100%;
}
.playbillTopTitle {
  width: 91vw;
  margin: 40px auto 0;
  position: relative;
}
.topTitleText {
  width: 100%;
  font-size: 27px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.playbillTopTitle img {
  width: 50vw;
  opacity: 0.8;
}
.playbillTable {
  /* position: absolute; */
  transform: scale(0.92);
  /* top: 45px; */
}
.playbillMap {
  transform: scale(0.92);
}
.report_top_container {
  width: 100%;
  position: relative;
  height: 185px;
}
.top_container_imgBox img {
  width: 100%;
  height: 100%;
}
.top_container_textBox {
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
.report_center_container {
  padding: 0 15px;
  position: relative;
  z-index: 1;
  margin-top: -25px;
}
</style>