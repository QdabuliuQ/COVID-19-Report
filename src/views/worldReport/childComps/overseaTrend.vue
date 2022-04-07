<template>
  <div id="overseaTrend">
    <!-- 图表轮播 -->
    <van-swipe
      ref="overseaTrend_swipe"
      @change="chartsChange"
      :touchable="true"
      class="my-swipe"
      indicator-color="transparent"
    >
      <van-swipe-item>
        <div class="overseaTrand_item_dom overseaTrend_item_charts_dom1"></div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="overseaTrand_item_dom overseaTrend_item_charts_dom2"></div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="overseaTrand_item_dom overseaTrend_item_charts_dom3"></div>
      </van-swipe-item>
    </van-swipe>
    <swipeButton
      ref="overseaTrend_swipe_btn2"
      :currentIndex="currentIndex"
      @toggleSwipe="toggleSwipe"
      class="swipeButton"
      :btnList="btnList"
    ></swipeButton>
  </div>
</template>

<script>
import swipeButton from "components/private/swipeButton"; // 图表切换组件
export default {
  name: "overseaTrend",
  data() {
    return {
      overseaData: {
        date: [],
        asia: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 亚洲
        africa: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 非洲
        oceania: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 大洋洲
        northAmerica: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 北美洲
        southAmerica: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 南美洲
        europe: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 欧洲
        otherArea: {
          confirm: [],
          heal: [],
          dead: [],
          deadRate: [],
          healRate: [],
          newAddConfirm: [],
        }, // 其他地区
      },
      currentIndex: 0,
      btnList: ["累计趋势", "病死率/治愈率", "新增趋势"],
      flagChart2: false,
      flagChart3: false,
    };
  },
  methods: {
    chartsChange(index) {
      // 切换图表
      this.$refs.overseaTrend_swipe_btn2.setIndex(index);
      this.selectData(index);
    },

    setChartsOption(titleText, xData, series, color) {
      let that = this;
      return {
        title: {
          text: titleText,
          textStyle: {
            fontSize: 14,
          },
          top: "1.5%",
          left: "3%",
        },
        color, // 颜色
        grid: {
          // 布局
          top: "30%",
          left: "3%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
          },
          padding: [7],
          backgroundColor: "rgba(0, 0, 0, 0.623)",
          borderColor: "transparent",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            
            return 'xxxxxx';
          },
        },
        legend: {
          // 图例
          icon: "rect",
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 11,
          },
          top: "10%",
          left: "2%",
          x: "left",
        },
        xAxis: [
          // x轴
          {
            type: "category",
            data: xData,
            axisLabel: {
              rotate: 40,
              textStyle: {
                fontSize: 11,
              },
            },
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
          },
        ],
        yAxis: {
          // y轴
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 11,
            },
            formatter: function (val) {
              return that.setUnitChar(val);
            },
          },
          nameGap: 20,
        },
        series, // 数据源
      };
    },

    toggleSwipe(index) {
      // 切换图表
      this.$refs.overseaTrend_swipe.swipeTo(index);
      this.selectData(index);
    },

    selectData(index) {
      switch (index) {
        case 1:
          if (!this.flagChart2) {
            for (const item of this.$store.state.worldData
              .FAutoGlobalDailyList) {
              this.overseaData.deadRate.push(item.all.deadRate);
              this.overseaData.healRate.push(item.all.healRate);
            }
            let myChart = this.$echarts.init(
              document.querySelector(".overseaTrend_item_charts_dom2")
            );
            myChart.setOption(
              this.setChartsOption(
                "海外病死率/治愈率",
                this.overseaData.date,
                [
                  {
                    name: "病死率",
                    type: "line",
                    data: this.overseaData.deadRate,
                  },
                  {
                    name: "治愈率",
                    type: "line",
                    data: this.overseaData.healRate,
                  },
                ],
                ["#6e6e6e", "#3dbe31"]
              )
            );
            this.flagChart2 = true;
          }
          break;
        case 2:
          if (!this.flagChart3) {
            for (const item of this.$store.state.worldData
              .FAutoGlobalDailyList) {
              this.overseaData.newAddConfirm.push(item.all.newAddConfirm);
            }
            let myChart = this.$echarts.init(
              document.querySelector(".overseaTrend_item_charts_dom3")
            );
            myChart.setOption(
              this.setChartsOption(
                "海外疫情新增趋势",
                this.overseaData.date,
                [
                  {
                    name: "新增确诊",
                    type: "line",
                    data: this.overseaData.newAddConfirm,
                  },
                ],
                ["#f73838"]
              )
            );
            this.flagChart3 = true;
          }
          break;
        default:
          break;
      }
    },

    setChartsOption2() {
      let data = this.$store.state.worldData.WomAboard;
      let areaName = "";
      for (const item of data) {
        // 处理数据
        switch (item.continent) {
          case "亚洲":
            areaName = "asia";
            break;
          case "非洲":
            areaName = "africa";
            break;
          case "大洋洲":
            areaName = "oceania";
            break;
          case "北美洲":
            areaName = "northAmerica";
            break;
          case "南美洲":
            areaName = "southAmerica";
            break;
          case "欧洲":
            areaName = "europe";
            break;
        }
        this.overseaData[areaName].confirm.push(item.confirm);
        this.overseaData[areaName].heal.push(item.heal);
        this.overseaData[areaName].dead.push(item.dead);
        this.overseaData[areaName].deadRate.push(item.deadCompare);
        this.overseaData[areaName].healRate.push(item.healCompare);
        this.overseaData[areaName].newAddConfirm.push(item.nowConfirm);
      }
      this.$nextTick(() => {
        // 加载图表
        let myChart = this.$echarts.init(
          document.querySelector(".overseaTrend_item_charts_dom1")
        );

        myChart.setOption(
          this.setChartsOption(
            "各大洲疫情累计趋势",
            this.overseaData.date,
            [
              {
                name: "亚洲",
                type: "line",
                data: this.overseaData['asia'].confirm,
              },
              {
                name: "非洲",
                type: "line",
                data: this.overseaData['africa'].confirm,
              },
              {
                name: "大洋洲",
                type: "line",
                data: this.overseaData['oceania'].confirm,
              },
              {
                name: "北美洲",
                type: "line",
                data: this.overseaData['northAmerica'].confirm,
              },
              {
                name: "南美洲",
                type: "line",
                data: this.overseaData['southAmerica'].confirm,
              },
              {
                name: "欧洲",
                type: "line",
                data: this.overseaData['europe'].confirm,
              },
              {
                name: "其他地区",
                type: "line",
                data: this.overseaData['otherArea'].confirm,
              },
            ],
            ["#329aef", "#bdc0c1", "#6bf0b2", "#e7f138", "#faab34", "#fa4434", "#fa34e6"]
          )
        );
      });
    },
  },
  components: {
    swipeButton,
  },
};
</script>
<style scoped>
#overseaTrend {
  margin-bottom: var(--marginB);
}
.my-swipe {
  width: 100%;
  height: 300px;
  color: #fa34e6;
}
.overseaTrand_item_dom {
  width: 100%;
  height: 100%;
}
.van-swipe-item {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  border: 2px solid rgba(19, 19, 19, 0.062);
  box-sizing: border-box;
}
</style>