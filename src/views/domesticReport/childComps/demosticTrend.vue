<template>
  <div id="demosticTrend">
    <div class="trend_charts_container">
      <!-- 图表轮播 -->
      <van-swipe
        ref="charts_swipe"
        @change='chartsChange'
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
        <van-swipe-item>
          <div class="trand_item_dom trend_item_charts_dom3"></div>
        </van-swipe-item>
      </van-swipe>
      <div class="charts_indicators">
        <div :class="[currentIndex == index ? 'activeCharts': '']" @click="toggle_indicators(index)" class="indicators_item" v-for="item,index in indicatorsList" :key="index">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEpidemicTrend } from "network/demosticReport";

let myChartDom1; // 图表实例对象
let myChartDom2;
let myChartDom3;

export default {
  name: "demosticTrend",
  data() {
    return {
      dateList: [], // 日期数组
      addConfirmList: [], // 新增确诊数据
      addHealList: [], // 新增治愈数组
      confirmList: [],  // 全国累计确诊
      healList: [],  // 全国累计治愈
      deadList: [],  // 全国累计死亡
      nowConfirmList: [],  // 目前确诊
      indicatorsList: ['疫情新增趋势','疫情累计趋势','现有确诊趋势'],
      currentIndex: 0,  // 活跃索引
      refChartsSwipe: null,
      chartDom2: false,  // 判断图表是否已经被加载
      chartDom3: false,
    };
  },
  methods: {
    epidemicTrend() {
      // 获取数据
      getEpidemicTrend().then((res) => {
        this.$store.state.chinaTrendDetail = res.data.data; // 保存数据
        for (const item of res.data.data.chinaDayList) {
          this.dateList.push(item.date);  // 添加日期
          this.confirmList.push(item.confirm)  // 累计确诊
          this.healList.push(item.heal)  // 累计治愈
          this.deadList.push(item.dead)  // 累计死亡
          this.nowConfirmList.push(item.nowConfirm)  // 现有确诊
        }

        for (const item of res.data.data.chinaDayAddList) {
          this.addConfirmList.push(item.confirm);  // 新增确诊
          this.addHealList.push(item.heal);  // 新增治愈
        }
      });
    },

    chartsChange(index) {  // 监听轮播图改变
      if (index != 0) {
        switch (index) {
          case 1:
            this.loadCharts(index)
            this.chartDom2 = true
            break;
          case 2:
            this.loadCharts(index)
            this.chartDom3 = true
            break;
          default:
            break;
        }
      }
      this.currentIndex = index
    },

    chartsOption(titleText = "", xData = [], color = [], series = []) {  // 图表设置选项
      return {
        title: {  // 标题
          text: titleText,
          textStyle: {
            fontSize: 14,
          },
          top: '3%',
          left: "1%",
        },
        color,  // 颜色
        grid: {  // 布局
          top: "15%",
          left: "3%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          triggerOn:"click",
          textStyle: {
            color: '#FFF',     // 文字的颜色
            fontSize: '12',    // 文字字体大小
          },
          padding:[7],
          backgroundColor:"rgba(0, 0, 0, 0.66)", 
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
        legend: {  // 图例
          itemWidth: 24,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
          },
          top: '3%',
          right: '1%',
        },
        xAxis: [  // x轴
          {
            type: "category",
            data: xData,
            axisLabel: {
              rotate: 40,
              textStyle: {
                fontSize: '10',
              },
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          },
        ],
        yAxis: {  // y轴
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: '10',
            },
          },
          nameGap: 20
        },
        series,  // 数据源
      };
    },

    toggle_indicators(i) {  // 图表切换
      this.currentIndex = i
      this.refChartsSwipe.swipeTo(i)  // 切换轮播图
    },

    loadCharts(index) {
      switch (index) {
        case 1:
          if (!this.chartDom2) {
            let options2 = this.chartsOption("全国疫情累计趋势", this.dateList, ["#be1313", "#3ed81f", "#888888"], [
              {
                name: "累计确诊",
                type: "line",
                data: this.confirmList,
              },
              {
                name: "累计治愈",
                type: "line",
                data: this.healList,
              },
              {
                name: "累计死亡",
                type: "line",
                data: this.deadList,
              },
            ])
            myChartDom2.setOption(options2);
          }
          break;
        case 2:
          if (!this.chartDom3) {
            let options3 = this.chartsOption("全国现有确诊趋势", this.dateList,["#be1313"], [
              {
                name: "现有确诊",
                type: "line",
                data: this.nowConfirmList,
              },
            ])
            myChartDom3.setOption(options3)
          }
        default:
          break;
      }
    }
  },
  created() {
    this.epidemicTrend();
  },
  mounted() {
    setTimeout(() => {
      this.refChartsSwipe = this.$refs.charts_swipe
      if (this.$store.state.chinaTrendDetail) {
        myChartDom1 = this.$echarts.init(
          document.querySelector(".trend_item_charts_dom1"),
          null,
          { renderer: "svg" }
        );
        myChartDom2 = this.$echarts.init(
          document.querySelector(".trend_item_charts_dom2"),
          null,
          { renderer: "svg" }
        );
        myChartDom3 = this.$echarts.init(
          document.querySelector(".trend_item_charts_dom3"),
          null,
          { renderer: "svg" }
        );
        let options = this.chartsOption("全国疫情新增趋势", this.dateList,["#be1313", "#3ed81f"], [
          {
            name: "新增确诊",
            type: "line",
            data: this.addConfirmList,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#fd3053",
                },
              },
            },
          },
          {
            name: "新增治愈",
            type: "line",
            data: this.addHealList,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#1edd1e",
                },
              },
            },
          },
        ]);
        myChartDom1.setOption(options);
      }
    }, 600);
  },
};
</script>
<style scoped>
#demosticTrend {
  width: 100%;
  height: 295px;
  margin-bottom: 10px;
}
.trend_charts_container {
  width: 100%;
  height: 84%;
}
.charts_indicators{
  margin-top: 1%;
  height: 17%;
  width: 100%;
  display: flex;
}
.indicators_item{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
  margin: 0 5px;
  transition: all 0.15s linear;
  box-sizing: border-box;
  font-size: 12px;
}
.activeCharts{
  background-color: rgba(33, 175, 241, 0.212);
  color: #21aff1;
  border: 1px solid #21aff1;
  /* background-color: #000000b2; */
}
.my-swipe {
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
.trand_item_dom {
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.466); */
}
</style>