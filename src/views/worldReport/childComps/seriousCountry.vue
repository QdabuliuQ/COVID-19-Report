<template>
  <div id="seriousCountry">
    <!-- 图表轮播 -->
    <van-swipe
      ref="overseaCountry_swipe"
      @change="chartsChange"
      :touchable="true"
      class="my-swipe"
      indicator-color="transparent"
    >
      <van-swipe-item>
        <div class="trand_item_dom trend_item_charts_dom1"></div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="trand_item_dom trend_item_charts_dom2"></div>
      </van-swipe-item>
    </van-swipe>
    <swipe-button
    ref="overseaCountry_swipe_btn"
    :currentIndex="currentIndex"
    @toggleSwipe="toggleSwipe"
    class="swipeButton"
    :btnList="btnList"></swipe-button>
  </div>
</template>

<script>
import { getCountryData } from "network/worldReport";
import swipeButton from "components/private/swipeButton"; // 图表切换组件

export default {
  name: "seriousCountry",
  data() {
    return {
      countryData: {  // 国家数据
        comfirm: [],
        comfirmAdd: [],
        date: [],
        heal: [],
        dead: [],
      },
      currentIndex: 0,
      btnList: [  // 切换按钮
        '疫情累计趋势',
        '疫情新增趋势'
      ],
      chartDom: false,  // 判断条件
    };
  },
  components: {
    swipeButton,
  },
  methods: {
    chartsChange(index) {  // 切换图表
      this.$refs.overseaCountry_swipe_btn.setIndex(index);
      this.setChartsOption(index)
    },

    setChartsOption(index) {
      if (index != 0) {
        if (!this.chartDom) {
          let myChart = this.$echarts.init(
            document.querySelector(".trend_item_charts_dom2")
          );
          myChart.setOption(
            this.getChartsOption(['#ee4646'], this.countryData.date, [
              {
                name: "新增确诊",
                type: "line",
                data: this.countryData.comfirmAdd
              },
            ])
          );
          this.chartDom = true
        }
      }
    },

    getChartsOption(color, xData, series) {  // 设置图表选项
      let that = this
      return {
        color, // 颜色
        grid: {
          // 布局
          top: "14%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "11", // 文字字体大小
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
          icon: 'rect',
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 11,
          },
          top: "2%",
          right: "3%",
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
            formatter: function(val) {
              return that.setUnitChar(val)
            }
          },
          nameGap: 20,
        },
        series, // 数据源
      };
    },

    toggleSwipe(index) {  // 切换图表
      this.$refs.overseaCountry_swipe.swipeTo(index); // 切换轮播图
      this.setChartsOption(index)
    }
  },
  created() {
    getCountryData("印度").then((res) => {
      for (const item of res.data.data["印度"]) {
        this.countryData.comfirm.push(item.confirm);
        this.countryData.comfirmAdd.push(item.confirm_add);
        this.countryData.date.push(item.date);
        this.countryData.heal.push(item.heal);
        this.countryData.dead.push(item.dead);
      }
      setTimeout(() => {
      let myChart = this.$echarts.init(
        document.querySelector(".trend_item_charts_dom1")
      );
      myChart.setOption(
        this.getChartsOption(['#bd1e1e','#14a11c','#6d6d6d'],this.countryData.date, [
          {
            name: "累计确诊",
            type: "line",
            data: this.countryData.comfirm
          },
          {
            name: "累计治愈",
            type: "line",
            data: this.countryData.heal
          },
          {
            name: "累计死亡",
            type: "line",
            data: this.countryData.dead
          },
        ])
      );
    }, 500);
    });
  },
  mounted() {
    
  },
};
</script>
<style scoped>
#seriousCountry {
  width: 100%;
  margin-bottom: var(--marginB);
}
.trand_item_dom{
  width: 100%;
  height: 230px;
}
.van-swipe-item {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  border: 2px solid rgba(19, 19, 19, 0.062);
  box-sizing: border-box;
}
</style>