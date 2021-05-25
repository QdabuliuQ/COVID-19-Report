<template>
  <div id="demosticNoinfect"></div>
</template>

<script>
import { getDemosticNoinfect } from "network/demosticReport";

let myChartDom4; // 图表实例

export default {
  name: "demosticNoinfect",
  data() {
    return {
      infectDetail: {
        increaseList: [], // 新增数据
        confirmList: [], // 累计数据
        cityList: [], // 城市
      },
    };
  },
  methods: {
    demosticNoinfect() {
      // 发起请求
      getDemosticNoinfect().then((res) => {
        for (const item of res.data.data.asymptomaticProvince.confirm) {
          this.infectDetail.increaseList.push(item.increase); // 添加数据
          this.infectDetail.cityList.push(item.province);
          this.infectDetail.confirmList.push(item.confirm);
        }
      });
    },

    // 获取图表选项
    chartsOptions(cityList, confirmList, increaseList, yDetail, detailText) {
      return {
        title: {
          // 标题
          text: "无症状感染者趋势",
          textStyle: {
            fontSize: this.fGetChartFontSize() + 17,
          },
          top: "0%",
          left: "1%",
        },
        color: ['#fd4a4a', '#fda94a'],
        legend: {
          itemWidth: 30,
          itemHeight: 20,
          textStyle: {
            fontSize: this.fGetChartFontSize() + 5,
          },
          top: "1.3%",
          right: "1%",
          data: detailText,
        },
        tooltip: {
          trigger: "axis",
          triggerOn:"click",
          textStyle: {
            color: '#FFF',     // 文字的颜色
            fontSize: '20',    // 文字字体大小
          },
          padding:[12],
          backgroundColor:"#000000b2", 
          borderColor: 'transparent',  
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            let str = `地点：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.seriesName}：${item.data}<br>`
            }
            return str
          },
        },
        grid: {
          // 布局
          top: "18%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: cityList,
            axisLabel: {
              // 旋转角度
              interval: 0,
              rotate: 40,
              textStyle: {
                fontSize: this.fGetChartFontSize(),
              },
            },
          },
        ],
        yAxis: yDetail,
        series: [
          {
            name: detailText[0],
            type: "bar",
            data: confirmList,
            barWidth: 15,
          },
          {
            name: detailText[1],
            type: "line",
            yAxisIndex: 1,
            data: increaseList,
          },
        ],
      };
    },

    // 获取图表合适数据
    getMaxNum(num) {
      let lastNum = num.toString();
      let num2 = num;
      if (parseInt(lastNum[lastNum.length - 1]) > 5) {
        num2 += 10 - parseInt(lastNum[lastNum.length - 1]);
      } else if (parseInt(lastNum[lastNum.length - 1]) < 5) {
        num2 += 5 - parseInt(lastNum[lastNum.length - 1]);
      }
      return num2;
    },
  },
  created() {
    this.demosticNoinfect();
  },
  mounted() {
    setTimeout(() => {
      myChartDom4 = this.$echarts.init(
        document.querySelector("#demosticNoinfect"),
        null,
        { renderer: "svg" }
      );
      let num = this.infectDetail.confirmList[0];
      let num2 = this.infectDetail.increaseList[0];
      for (const item of this.infectDetail.confirmList) {
        // 获取最大值
        if (item > num) {
          num = item;
        }
      }
      for (const item of this.infectDetail.increaseList) {
        // 获取最大值
        if (item > num) {
          num2 = item;
        }
      }
      let options = this.chartsOptions(
        this.infectDetail.cityList,
        this.infectDetail.confirmList,
        this.infectDetail.increaseList,
        [
          {
            type: "value",
            name: "现有无症状患者",
            min: 0, // 设置最小值
            max: this.getMaxNum(num), // 设置最大值
            interval: this.getMaxNum(num) / 5,
            axisLabel: {
              textStyle: {
                fontSize: this.fGetChartFontSize(),
              },
            },
            nameTextStyle: {
              // 顶部名称字体大小
              fontSize: this.fGetChartFontSize() + 7,
              align: "left", // 位置

              lineHeight: this.fGetChartFontSize() + 15,
            },
          },
          {
            type: "value",
            name: "新增无症状患者",
            min: 0, // 设置最小值
            max: this.getMaxNum(num2), // 设置最大值
            interval: this.getMaxNum(num2) / 5,
            axisLabel: {
              // 字体大小
              textStyle: {
                fontSize: this.fGetChartFontSize(),
              },
            },
            nameTextStyle: {
              // 顶部名称字体大小
              fontSize: this.fGetChartFontSize() + 7,
              align: "right", // 位置

              lineHeight: this.fGetChartFontSize() + 15,
            },
          },
        ],
        ["现有无症状患者", "新增无症状患者"]
      );
      myChartDom4.setOption(options);
    }, 600);
  },
};
</script>
<style scoped>
#demosticNoinfect {
  width: 100%;
  height: 240px;
  margin-bottom: var(--marginB);
}
</style>