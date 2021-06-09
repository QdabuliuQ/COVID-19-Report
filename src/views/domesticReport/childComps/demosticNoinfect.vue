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
            if (item > num2) {
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
                    fontSize: 11,
                  },
                },
                nameTextStyle: {
                  // 顶部名称字体大小
                  fontSize: 11,
                  align: "left", // 位置
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
                    fontSize: 11,
                  },
                },
                nameTextStyle: {
                  // 顶部名称字体大小
                  fontSize: 11,
                  align: "right", // 位置
                },
              },
            ],
            ["现有无症状患者", "新增无症状患者"]
          );
          myChartDom4.setOption(options);
        }, 1000);
      });
    },

    // 获取图表选项
    chartsOptions(cityList, confirmList, increaseList, yDetail, detailText) {
      return {
        title: {
          // 标题
          text: "无症状感染者趋势",
          textStyle: {
            fontSize: 14,
          },
          top: "1%",
          left: "1%",
        },
        color: ["#fd4a4a", "#fda94a"],
        legend: {
          itemWidth: 24,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
          },
          data: detailText,
          x:'left', 
          top: "8%",
          right: "1%",
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
            let str = `地点：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.marker} ${item.seriesName}：${item.data}<br>`;
            }
            return str;
          },
        },
        grid: {
          // 布局
          top: "26%",
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
                fontSize: 10,
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
            barWidth: 12,
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
  mounted() {},
};
</script>
<style scoped>
#demosticNoinfect {
  width: 100%;
  height: 280px;
  margin-bottom: var(--marginB);
}
</style>