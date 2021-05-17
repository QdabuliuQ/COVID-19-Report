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
      refChartsSwipe: null
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
      this.currentIndex = index
    },

    chartsOption(titleText = "", xData = [], color = [], series = []) {  // 图表设置选项
      return {
        title: {  // 标题
          text: titleText,
          textStyle: {
            fontSize: this.fGetChartFontSize() + 17,
          },
          top: '3%',
          left: "3%",
        },
        color,  // 颜色
        grid: {  // 布局
          top: "15%",
          left: "3%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {  // 图例
          itemWidth: 30,
          itemHeight: 20,
          textStyle: {
            fontSize: this.fGetChartFontSize() + 10,
          },
          top: '4%',
          right: '3%',
        },
        xAxis: [  // x轴
          {
            type: "category",
            data: xData,
            axisLabel: {
              rotate: 40,
              textStyle: {
                fontSize: this.fGetChartFontSize(),
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
              fontSize: this.fGetChartFontSize(),
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
        let options3 = this.chartsOption("全国现有确诊趋势", this.dateList,["#be1313"], [
          {
            name: "现有确诊",
            type: "line",
            data: this.nowConfirmList,
          },
        ])
        myChartDom1.setOption(options);
        myChartDom2.setOption(options2);
        myChartDom3.setOption(options3)
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
}
.activeCharts{
  background-color: #21aff136;
  color: #21aff1;
  border: 1px solid #21aff1;
  
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
}
</style>