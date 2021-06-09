<template>
  <div id="provinceMonthData">
    <div class="provinceSumData"></div>
    <div class="provinceNewData"></div>
  </div>
</template>

<script>
import { getProvinceData } from "network/provinceDetail";

export default {
  name: "provinceMonthData",
  data() {
    return {
      cityDate: {
        date: [], // 图表日期
        confirm: [], // 累计确诊
        heal: [], // 累计治愈
        dead: [], // 累计死亡
        newConfirm: [], // 新增确诊
        newDead: [], // 新增死亡
        newHeal: [], // 新增治愈
      },
    };
  },
  methods: {
    setChartsOptions(title, series = [], color) {
      // 设置图表选项
      return {
        title: {
          text: title,
          textStyle: {
            fontSize: this.fGetChartFontSize() + 10,
          },
          top: "0%",
          left: "1%",
        },
        legend: {
          // 图例
          itemWidth: 30,
          itemHeight: 20,
          textStyle: {
            fontSize: this.fGetChartFontSize() + 5,
          },
          top: "0.5%",
          right: "1%",
        },
        xAxis: {
          type: "category",
          data: this.cityDate.date,
          axisLabel: {
            rotate: 40,
            textStyle: {
              fontSize: this.fGetChartFontSize(),
            },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
          },
        },
        tooltip: {
          trigger: "axis",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "20", // 文字字体大小
          },
          padding: [12],
          backgroundColor: "#000000b2",
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
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: this.fGetChartFontSize(),
            },
          },
        },
        series,
        color,
        grid: {
          // 布局
          top: "11%",
          left: "1%",
          right: "1%",
          bottom: "2%",
          containLabel: true,
        },
      };
    },

    setChart() {},
  },
  created() {
    getProvinceData(this.$route.params.cityName).then((res) => {
      // 发起网络请求
      for (const item of res.data.data) {
        this.cityDate.date.push(item.date);
        this.cityDate.confirm.push(item.confirm);
        this.cityDate.heal.push(item.heal);
        this.cityDate.dead.push(item.dead);
        this.cityDate.newConfirm.push(item.newConfirm);
        this.cityDate.newDead.push(item.newDead);
        this.cityDate.newHeal.push(item.newHeal);
      }
      this.$nextTick(() => {
        setTimeout(() => {
          let myChartDom4;
          myChartDom4 = this.$echarts.init(
            document.querySelector(".provinceSumData")
          );
          myChartDom4.setOption(
            this.setChartsOptions(
              this.$route.params.cityName + "累计疫情趋势",
              [
                {
                  name: "累计确诊",
                  data: this.cityDate.confirm,
                  type: "line",
                  smooth: true,
                },
                {
                  name: "累计治愈",
                  data: this.cityDate.heal,
                  type: "line",
                  smooth: true,
                },
                {
                  name: "累计死亡",
                  data: this.cityDate.dead,
                  type: "line",
                  smooth: true,
                },
              ],
              ["#ff4141", "#50c92b", "#616161"]
            )
          );

          let myChartDom5;
          myChartDom5 = this.$echarts.init(
            document.querySelector(".provinceNewData")
          );
          myChartDom5.setOption(
            this.setChartsOptions(
              this.$route.params.cityName + "新增疫情趋势",
              [
                {
                  name: "新增确诊",
                  data: this.cityDate.newConfirm,
                  type: "line",
                  smooth: true,
                },
                {
                  name: "新增治愈",
                  data: this.cityDate.newHeal,
                  type: "line",
                  smooth: true,
                },
                {
                  name: "新增死亡",
                  data: this.cityDate.newDead,
                  type: "line",
                  smooth: true,
                },
              ],
              ["#ff4141", "#50c92b", "#616161"]
            )
          );
        }, 300);
      });
    });
  },
  mounted() {},
};
</script>
<style scoped>
#provinceMonthData {
  margin-bottom: var(--marginB);
}
.provinceSumData {
  width: 100%;
  height: 230px;
  margin-bottom: 15px;
}
.provinceNewData {
  width: 100%;
  height: 230px;
}
</style>