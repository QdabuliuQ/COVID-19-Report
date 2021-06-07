<template>
  <div id="worldMap">
    <div class="map_container"></div>
    <div class="map_toggle_top">
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
  </div>
</template>

<script>
import { getWorldJson } from "network/vaccineInformation";
import { getAllCountryData } from "network/worldReport";
import world from "static/js/world";

let mapDom;

export default {
  name: "worldMap",
  data() {
    return {
      mapJson: null,
      worldData: {
        confirm: [],
        dead: [],
        nowConfirm: [],
      },
      activeIndex: 0,
      toggleMap: ['累计确诊','现存确诊','累计死亡'],
    };
  },
  created() {
    getWorldJson().then((res) => {
      // 发起请求获取地图数据
      this.mapJson = res.data;
    });

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
          name:'中国',
          value: this.$store.state.demosticDetail.chinaTotal.confirm
        })
      });
    } else {
      for (const item of this.$store.state.allCountryData) {
        this.worldData.confirm.push({
          name: item.name,
          value: item.confirm,
        });
      }
      this.worldData.confirm.push({
        name:'中国',
        value: this.$store.state.demosticDetail.chinaTotal.confirm
      })
    }
    this.$nextTick(() => {  // 设置地图数据
      setTimeout(() => {
        this.setMap();
      }, 500);
    });
  },
  methods: {
    getMapOptions(  // 生成地图数据
      data,
      color = [
        "#1480fa",
        "#499eff",
        "#73b4fd",
        "#a1ccfd",
        "#c8e1fd",
        "#ecf5ff",
      ],
      world,
      formatterText,
      max=10000000
    ) {
      let that = this;
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "20", // 文字字体大小
          },
          triggerOn: "click",
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
            if (Number.isNaN(params.value)) {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                "数据不详"
              );
            } else  {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                params.value+'人'
              );
            }
          },
        },
        visualMap: {
          min: 0,
          max,
          text: ["高", "低"],
          realtime: false,
          calculable: true,
          color,
          botton: 20,
          left: 20,
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

    setMap() {  // 设置地图
      try {
        mapDom = this.$echarts.init(
          document.querySelector(".map_container"),
          null,
          { renderer: "svg" }
        );
        this.$echarts.registerMap("world", this.mapJson);
        mapDom.setOption(
          this.getMapOptions(
            this.worldData.confirm,
            ["#d11010", "#ff3e3e", "#ff6e6e", "#ffa0a0", "#fdc1c1", "#fff5f5"],
            world,
            "累计确诊人数 : ",
          )
        );
      } catch (error) {
        
      }
    },

    toggleShowMap(index) {  // 切换模式
      this.activeIndex = index
      switch (index) {
        case 0:
          if (this.worldData.confirm.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.confirm,
                ["#d11010", "#ff3e3e", "#ff6e6e", "#ffa0a0", "#fdc1c1", "#fff5f5"],
                world,
                "累计确诊人数 : ",
              )
            )
          } else {
            this.setCountryData('confirm')
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.confirm,
                ["#d11010", "#ff3e3e", "#ff6e6e", "#ffa0a0", "#fdc1c1", "#fff5f5"],
                world,
                "累计确诊人数 : ",
              )
            )
          }
          break;
        case 1:
          if (this.worldData.nowConfirm.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.nowConfirm,
                ["#ff8317","#ff9d48","#fdb474","#ffcb9e","#fde5d1", "#fcf2e9"],
                world,
                "现存确诊人数 : ",
                500000
              )
            )
          } else {
            this.setCountryData('nowConfirm')
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.nowConfirm,
                ["#ff8317","#ff9d48","#fdb474","#ffcb9e","#fde5d1", "#fcf2e9"],
                world,
                "现存确诊人数 : ",
                500000
              )
            )
          }
          break;
        case 2:
          if (this.worldData.dead.length > 0) {
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.dead,
                ["#5a5a5a","#818181","#a3a3a3","#bbbbbb","#d8d8d8", "#f5f5f5"],
                world,
                "累计死亡人数 : ",
                500000
              )
            )
          } else {
            this.setCountryData('dead')
            mapDom.setOption(
              this.getMapOptions(
                this.worldData.dead,
                ["#5a5a5a","#818181","#a3a3a3","#bbbbbb","#d8d8d8", "#f5f5f5"],
                world,
                "累计死亡人数 : ",
                500000
              )
            )
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
          value: item[str]
        })
      }
      this.worldData[str].push({
        name:'中国',
        value: this.$store.state.demosticDetail.chinaTotal[str]
      })
    }
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
}
.map_container {
  width: 100%;
  height: 210px;
  background-color: #fff;
  /* background-color: #ff8317; */
}
.activeModule {
  color: var(--color);
  background-color: #1d99d31f;
  border: 1px solid #1d99d31f;
}
</style>