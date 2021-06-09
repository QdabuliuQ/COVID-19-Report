<template>
  <div id="countriesTrend"></div>
</template>

<script>
import { getCountriesTrend } from "network/worldReport";

export default {
  name: "countriesTrend",
  data() {
    return {
      countriesData: {
        date: [],
        countries: [],
      },
    };
  },
  created() {
    getCountriesTrend().then((res) => {
      let result = res.data.data.FAutoCountryMerge;
      let flag = false;
      for (const str in result) {
        this.countriesData.countries.push(str);
        this.countriesData[str] = [];
        for (const item of result[str].list) {
          if (!flag) {
            this.countriesData.date.push(item.date);
          }
          this.countriesData[str].push(item.confirm);
        }
        flag = true;
      }
      setTimeout(() => {
        let myChart = this.$echarts.init(
          document.getElementById("countriesTrend")
        );
        let series= [];
        for (const str in this.countriesData) {
          if (str != 'date' && str != 'countries') {
            series.push({
              name: str,
              data: this.countriesData[str],
              type: 'line',
              smooth: true
            })
          }
        }
        myChart.setOption(this.setChartsOption(this.countriesData.date, series, this.countriesData.countries));
      }, 500);
    });
  },
  methods: {
    setChartsOption(xdata, series, legendData) {
      let that = this
      return {
        xAxis: {
          type: "category",
          data: xdata,
          axisLabel: {
            rotate: 40,
            textStyle: {
              fontSize: 11,
            },
          },
        },
        grid: {  // 布局
          top: "18%",
          left: "1%",
          right: "1%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          triggerOn:"click",
          textStyle: {
            color: '#FFF',     // 文字的颜色
            fontSize: '11',    // 文字字体大小
          },
          padding:[7],
          backgroundColor:"rgba(0, 0, 0, 0.623)", 
          borderColor: 'transparent',  
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            let str = `日期：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.marker} ${item.seriesName}：${item.data}<br>`
            }
            return str
          },
        },
        legend: {
          data: legendData,
          icon: 'rect',
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            fontSize: 11,
          },
          itemGap: 7 
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 11,
            },
            formatter: function (val) {
              return that.setUnitChar(val);
            },
          },
        },
        series,
      };
    },
  },
  mounted() {
    
  },
};
</script>
<style scoped>
#countriesTrend {
  width: 100%;
  height: 280px;
  margin-bottom: var(--marginB);
}
</style>