<template>
  <div id="worldMap">
    <div v-if="typeIndex==1" id="map_container1"></div>
    <div v-else id="map_container2"></div>
  </div>
</template>

<script>
import { getWorldJson } from "network/vaccineInformation";
import { getAllCountryData } from "network/worldReport";
import world from "static/js/world";

let mapDom;

export default {
  name: "worldMapTemplate",
  props: {
    typeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      mapJson: null,  // 世界地图数据
      worldData: {  // 世界基本数据
        confirm: [],
        dead: [],
        nowConfirm: [],
      },
      toggleMap: ["累计确诊", "现存确诊", "累计死亡"],  // 地图切换
    };
  },
  created() {
    getWorldJson().then((res) => {  // 发起请求获取地图数据
      this.mapJson = res.data;
      this.setMapChart()  // 设置图表数据
    });
    
  },
  methods: {
    gainAllData() {  // 获取所有数据
      if (!this.$store.state.allCountryData) {
        // 判断是否储存了数据
        getAllCountryData().then((res) => {
          this.$store.state.allCountryData = res.data.data;
          for (const item of res.data.data) {
            this.worldData.confirm.push({
              name: item.name,
              value: item.confirm,
            });
          }
          this.worldData.confirm.push({
            name: "中国",
            value: this.$store.state.demosticDetail.chinaTotal.confirm,
          });
        });
      } else {
        for (const item of this.$store.state.allCountryData) {
          this.worldData.confirm.push({
            name: item.name,
            value: item.confirm,
          });
        }
        this.worldData.confirm.push({
          name: "中国",
          value: this.$store.state.demosticDetail.chinaTotal.confirm,
        });
      }
    },

    getMapOptions(data, pieces, world, formatterText) {
      // 生成地图数据
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
          },
          triggerOn: "click",
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
            if (Number.isNaN(params.value)) {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                "数据不详"
              );
            } else {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                params.value +
                "人"
              );
            }
          },
        },
        visualMap: {
          type: "piecewise",
          splitNumber: 6,
          orient: "horizontal",
          itemGap: 0,
          pieces,
          bottom: 10,
          left: 10,
          itemWidth: 45,
          itemHeight: 6,
          showLabel: false,
          left: "center",
        },
        series: [
          {
            name: "World Population (2010)",
            type: "map",
            mapType: "world",
            roam: false,
            zoom: 1.2,
            itemStyle: {
              emphasis: {
                // 也是选中样式
                borderWidth: 2,
                borderColor: "#fff",
                areaColor: "#3dbd16",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
            },
            data,
            nameMap: world,
          },
        ],
      };
    },

    toggleShowMap(index) {
      // 切换模式
      switch (index) {
        case 0:
          if (this.worldData.confirm.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.confirm,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 10000000, color: "#d11010" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 1000000, lte: 9999999, color: "#ff3e3e" },
                  { gte: 100000, lte: 999999, color: "#ff6e6e" },
                  { gte: 10000, lte: 99999, color: "#ffa0a0" },
                  { gte: 11, lte: 9999, color: "#fdc1c1" },
                  { lte: 10, color: "#fff5f5" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "累计确诊人数 : "
              )
            );
          } else {
            this.setCountryData("confirm");
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.confirm,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 10000000, color: "#d11010" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 1000000, lte: 9999999, color: "#ff3e3e" },
                  { gte: 100000, lte: 999999, color: "#ff6e6e" },
                  { gte: 10000, lte: 99999, color: "#ffa0a0" },
                  { gte: 11, lte: 9999, color: "#fdc1c1" },
                  { lte: 10, color: "#fff5f5" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "累计确诊人数 : "
              )
            );
          }
          break;
        case 1:
          if (this.worldData.nowConfirm.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.nowConfirm,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 1000000, color: "#ff8317" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 100000, lte: 999999, color: "#ff9d48" },
                  { gte: 10000, lte: 99999, color: "#fdb474" },
                  { gte: 1000, lte: 9999, color: "#ffcb9e" },
                  { gte: 11, lte: 999, color: "#fde5d1" },
                  { lte: 10, color: "#fcf2e9" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "现存确诊人数 : "
              )
            );
          } else {
            this.setCountryData("nowConfirm");
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.nowConfirm,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 1000000, color: "#ff8317" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 100000, lte: 999999, color: "#ff9d48" },
                  { gte: 10000, lte: 99999, color: "#fdb474" },
                  { gte: 1000, lte: 9999, color: "#ffcb9e" },
                  { gte: 11, lte: 999, color: "#fde5d1" },
                  { lte: 10, color: "#fcf2e9" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "现存确诊人数 : ",
                500000
              )
            );
          }
          break;
        case 2:
          if (this.worldData.dead.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.dead,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 500000, color: "#5a5a5a" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 50000, lte: 499999, color: "#818181" },
                  { gte: 5000, lte: 49999, color: "#a3a3a3" },
                  { gte: 500, lte: 4999, color: "#bbbbbb" },
                  { gte: 11, lte: 499, color: "#d8d8d8" },
                  { lte: 10, color: "#f5f5f5" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "累计死亡人数 : "
              )
            );
          } else {
            this.setCountryData("dead");
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.dead,
                [
                  // 自定义每一段的范围，以及每一段的文字
                  { gte: 500000, color: "#5a5a5a" }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 50000, lte: 499999, color: "#818181" },
                  { gte: 5000, lte: 49999, color: "#a3a3a3" },
                  { gte: 500, lte: 4999, color: "#bbbbbb" },
                  { gte: 11, lte: 499, color: "#d8d8d8" },
                  { lte: 10, color: "#f5f5f5" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                world,
                "累计死亡人数 : "
              )
            );
          }
          break;
        default:
          break;
      }
    },

    setCountryData(str) {
      for (const item of this.$store.state.allCountryData) {
        this.worldData[str].push({
          name: item.name,
          value: item[str],
        });
      }
      this.worldData[str].push({
        name: "中国",
        value: this.$store.state.demosticDetail.chinaTotal[str],
      });
    },

    setMapChart() {
      // 设置世界地图图表
      this.$nextTick(() => {
        console.log(document.querySelector("#map_container"+this.typeIndex));
        mapDom = this.$echarts.init(  // 初始化echarts对象
          document.querySelector("#map_container"+this.typeIndex),
          null,
          { renderer: "svg" }
        );
        mapDom.showLoading({ text: "正在加载数据" });  // 加载动画
        this.gainAllData(); // 获取数据
        setTimeout(() => {
          this.$echarts.registerMap("world", this.mapJson);
          mapDom.setOption(
            this.getMapOptions(
              this.worldData.confirm,
              [
                // 自定义每一段的范围，以及每一段的文字
                { gte: 10000000, color: "#d11010" }, // 不指定 max，表示 max 为无限大（Infinity）。
                { gte: 1000000, lte: 9999999, color: "#ff3e3e" },
                { gte: 100000, lte: 999999, color: "#ff6e6e" },
                { gte: 10000, lte: 99999, color: "#ffa0a0" },
                { gte: 11, lte: 9999, color: "#fdc1c1" },
                { lte: 10, color: "#fff5f5" }, // 不指定 min，表示 min 为无限大（-Infinity）。
              ],
              world,
              "累计确诊人数 : "
            )
          );
          mapDom.hideLoading();  // 隐藏加载动画
          console.log(66666);
        }, 200);
      });
    },
  },
};
</script>
<style scoped>
#worldMap {
  margin-bottom: var(--marginB);
}
.map_toggle_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 5px;
}
.map_toggle_item {
  padding: 5px 10px;
  margin: 0 10px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 5px;
  transition: all 0.2s linear;
  background-color: #f5f5f5;
  font-size: 12px;
}
#map_container1 {
  width: 100%;
  height: 230px;
  background-color: transparent;
}
#map_container2 {
  width: 100%;
  height: 230px;
  background-color: transparent;
}
.activeModule {
  color: var(--color);
  background-color: rgba(29, 153, 211, 0.122);
  border: 1px solid rgba(29, 153, 211, 0.122);
}
</style>