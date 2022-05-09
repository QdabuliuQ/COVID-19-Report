<template>
  <div id="demosticMap">
    <div v-if="typeIndex == 1" class="map_toggle_top">
      <div
        @click="toggleShowMap(index)"
        :class="[activeIndex == index ? 'activeModule' : '']"
        v-for="(item, index) in toggleMap"
        :key="index"
        class="map_toggle_item"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="typeIndex == 1" id="demostic_map_container1"></div>
    <div v-else id="demostic_map_container2"></div>
  </div>
</template>

<script>
export default {
  name: "demosticMap",
  props: {
    typeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      myChart: null,
      toggleMap: ["现存确诊", "累计确诊"], // 切换按钮
      activeIndex: 0, // 切换索引
      allCityDetail: [], // 所有城市信息
      nowPieces: [
        // 图表参数
        {
          // 现存确诊
          min: 1000,
          color: "#7D1818",
          label: "1000人以上",
        },
        {
          min: 700,
          max: 1000,
          color: "#BF2321",
          label: "700-1000人",
        },
        {
          min: 300,
          max: 700,
          color: "#FF7B66",
          label: "300-700人",
        },
        {
          min: 1,
          max: 300,
          color: "#FFA789",
          label: "1-300人",
        },
        {
          max: 0,
          min: 0,
          color: "#ffffff",
          label: "无确诊人数",
        },
      ],
      allCityDetailOptions: null, // 现存确诊地图配置选项
      allCitySumDetail: [], // 总计城市数据
      allCitySumDetailOptions: null, // 总计城市数据地图配置选项
      nowPieces2: [
        // 图表参数
        {
          // 现存确诊
          min: 10000,
          color: "#7D1818",
          label: "10000人以上",
        },
        {
          min: 1000,
          max: 9999,
          color: "#BF2321",
          label: "1000-9999人",
        },
        {
          min: 100,
          max: 999,
          color: "#FF7B66",
          label: "500-999人",
        },
        {
          min: 1,
          max: 99,
          color: "#FFA789",
          label: "1-99人",
        },
        {
          max: 0,
          min: 0,
          color: "#ffffff",
          label: "无确诊人数",
        },
      ],
    };
  },
  methods: {

    fGetChartFontSize() {
      // 获取像素比
      const dpr = window.devicePixelRatio;
      let fontSize = 14;
      if (dpr == 2) {
        fontSize = 19;
      } else if (dpr == 3) {
        fontSize = 30;
      } else if (dpr > 3) {
        fontSize = 30;
      }
      return fontSize;
    },

    toggleShowMap(index) {
      // 切换地图
      this.activeIndex = index;
      if (this.typeIndex == 1) {
        this.$emit("toggleEvent", index)
      }
      switch (this.activeIndex) {
        case 0:
          this.myChart.setOption(this.allCityDetailOptions);
          break;
        case 1:
          this.myChart.setOption(this.allCitySumDetailOptions);
          break;
        default:
          break;
      }
    },

    setMapOptions(cityData, nowPieces) {
      // 地图参数
      return {
        visualMap: {
          show: true,
          type: "piecewise",
          splitNumber: 4,
          itemWidth: 24,
          itemHeight: 12,
          itemGap: 5,
          textStyle: {
            color: "#999",
            fontSize: 12,
          },
          pieces: nowPieces,
        },
        tooltip: {
          trigger: "item",
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
            return (
              "地区：" +
              params.data.name +
              "<br>" +
              "确诊人数：" +
              params.data.value
            );
          },
        },
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            roam: false,
            zoom: 1.2,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            label: {
              normal: {
                textStyle: {
                  fontSize: 10,
                  color: "#333",
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: cityData != undefined ? cityData : [],
          },
        ],
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.demosticDetail) {
        // 判断是否储存了数据
        // 监听是否获取到了国内基本数据
        let result = this.$store.state.demosticDetail.areaTree[0].children;
        for (const item of result) {
          // 格式化数据
          this.allCityDetail.push({
            // 添加到现存数据当中
            name: item.name,
            value: item.total.nowConfirm,
          });

          this.allCitySumDetail.push({
            // 添加到总数据当中
            name: item.name,
            value: item.total.confirm,
          });
        }
        let option = this.setMapOptions(this.allCityDetail, this.nowPieces); // 最新生成的地图配置
        let options = this.setMapOptions(
          this.allCitySumDetail,
          this.nowPieces2
        ); // 最新生成的地图配置
        this.allCityDetailOptions = option;
        this.allCitySumDetailOptions = options;
        setTimeout(() => {
          this.myChart = this.$echarts.init(
            document.getElementById("demostic_map_container"+this.typeIndex),
            null,
            { renderer: "svg" }
          ); // 创建echarts对象
          this.myChart.setOption(option);
          this.myChart.resize();
        }, 300);
      }
    });
  },
};
</script>
<style scoped>
#demosticMap {
  width: 100%;
  margin-bottom: var(--marginB);
}
.map_toggle_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}
.map_toggle_item {
  padding: 5px 10px;
  margin: 0 10px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 5px;
  transition: all 0.2s linear;
  font-size: 12px;
  /* background-color: rgba(0, 0, 0, 0.623); */
}
.activeModule {
  color: var(--color);
  background-color: rgba(29, 153, 211, 0.122);
  border: 1px solid rgba(29, 153, 211, 0.122);
}
#demostic_map_container1 {
  width: 100%;
  height: 320px;
}
#demostic_map_container2 {
  width: 100%;
  height: 280px;
}
.shareContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
.shareBtn {
  font-size: 13px;
  color: #fff;
  background-color: var(--color);
  padding: 7px 15px 9px 13px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: relative;
}
.shareBtn:active {
  background-color: var(--clickColor);
}
.shareBtn .shareIcon {
  width: 20px;
  margin-right: 3px;
}
</style>