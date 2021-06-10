<template>
  <div id="VaccineNationTend">
    <van-swipe
      :loop='false'
      @change="chartsChange"
      class="my-swipe"
      ref="vaccine_swipe"
      :touchable="true"
      indicator-color="transparent"
    >
      <van-swipe-item>
        <div class="nation_charts"></div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="nation_charts2"></div>
      </van-swipe-item>
    </van-swipe>
    <swipeButton
      ref="vaccine_swipe_btn"
      :currentIndex="currentIndex"
      @toggleSwipe="toggleSwipe"
      class="swipeButton"
      :btnList="btnList"
    ></swipeButton>
  </div>
</template>

<script>
import {
  getVaccineChina
} from "network/vaccineInformation";
import swipeButton from "components/private/swipeButton"; // 图表切换组件
export default {
  name: "VaccineNationTend",
  data() {
    return {
      vaccineData: {
        // 疫苗数据
        sum: [],
        rate: [],
        date: [],
      },
      btnList: [
        // 切换按钮
        "累计接种趋势",
        "每百人接种趋势",
      ],
      currentIndex: 0, // 切换图标索引
    };
  },
  created() {
    getVaccineChina().then((res) => {
      // 发起网络请求
      for (const item of res.data.data.ChinaVaccineTrendData) {
        // 处理数据
        this.vaccineData.sum.push(item.total_vaccinations);
        this.vaccineData.rate.push(item.total_vaccinations_per_hundred);
        this.vaccineData.date.push(item.date);
      }
      setTimeout(() => {
        let myChart = this.$echarts.init(
          document.querySelector(".nation_charts"),
          null,
          { renderer: "svg" }
        );
        myChart.setOption(this.setChartsOption(this.vaccineData.sum));

        let myChart2 = this.$echarts.init(
          document.querySelector(".nation_charts2"),
          null,
          { renderer: "svg" }
        );
        myChart2.setOption(this.setChartsOption(this.vaccineData.rate, true));
      }, 700);
    });
  },
  methods: {
    setChartsOption(data, percentage = false) {
      let that = this;
      return {
        xAxis: {
          type: "category",
          data: this.vaccineData.date,
          axisLabel: {
            rotate: 40,
            textStyle: {
              fontSize: 11,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 11,
            },
            formatter: function (val) {
              if (percentage) {
                return val + "%";
              }
              return that.setUnitChar(val);
            },
          },
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
            let str;
            if (!percentage) {
              str = `日期：${params[0].name}<br>累计接种：${that.setUnitChar(
                params[0].value
              )}`;
            } else {
              str = `日期：${params[0].name}<br>接种比例：${that.setUnitChar(
                params[0].value
              )}%`;
            }
            return str;
          },
        },
        grid: {
          // 布局
          top: "8%",
          left: "3%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        series: [
          {
            data,
            type: "line",
            smooth: true,
          },
        ],
      };
    },

    toggleSwipe(index) {  // 切换图表
      this.$refs.vaccine_swipe.swipeTo(index); // 切换轮播图
    },

    chartsChange(index) {  // 监听图表替换
      this.$refs.vaccine_swipe_btn.setIndex(index);
    }
  },
  components: {
    swipeButton,
  },
  mounted() {
    
  },
};
</script>
<style scoped>
#VaccineNationTend {
  width: 100%;
  margin-bottom: var(--marginB);
}
.nation_charts {
  width: 100%;
  height: 230px;
}
.nation_charts2 {
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