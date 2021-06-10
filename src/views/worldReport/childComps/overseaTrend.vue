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
        confirm: [],
        heal: [],
        dead: [],
        deadRate: [],
        healRate: [],
        newAddConfirm: [],
        date: [],
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
          top: "22%",
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
            let str = `日期：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.marker} ${item.seriesName}：${item.data}<br>`;
            }
            return str;
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
      let data = this.$store.state.worldData.FAutoGlobalDailyList;
      for (const item of data) {
        // 处理数据
        this.overseaData.confirm.push(item.all.confirm);
        this.overseaData.heal.push(item.all.heal);
        this.overseaData.dead.push(item.all.dead);
        this.overseaData.date.push(item.date);
      }
      this.$nextTick(() => {
        // 加载图表
        let myChart = this.$echarts.init(
          document.querySelector(".overseaTrend_item_charts_dom1")
        );

        myChart.setOption(
          this.setChartsOption(
            "海外疫情累计趋势",
            this.overseaData.date,
            [
              {
                name: "累计确诊",
                type: "line",
                data: this.overseaData.confirm,
              },
              {
                name: "累计治愈",
                type: "line",
                data: this.overseaData.heal,
              },
              {
                name: "累计死亡",
                type: "line",
                data: this.overseaData.dead,
              },
            ],
            ["#f73838", "#3dbe31", "#6e6e6e"]
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