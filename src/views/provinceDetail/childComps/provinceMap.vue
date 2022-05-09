<template>
  <div
    v-if="cityDetail.length != 1 && cityDetail[0].name != '待确认地区'"
    id="provinceMapContainer"
  >
    <content-split
      v-if="typeIndex == 1"
      :text="$route.params.cityName + '疫情分布图'"
      :btnText="'分享数据'"
      @clickEvent="clickEvent"
    ></content-split>
    <div class="map_toggle_top" v-if="typeIndex == 1">
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
    <div v-if="typeIndex == 1" id="provinceMap1"></div>
    <div v-else id="provinceMap2"></div>
  </div>
</template>.

<script>
import { getCityJson } from "network/provinceDetail";
import { codefans_net_CC2PY } from "static/js/PinYin";


export default {
  name: "provinceMap",
  props: {
    typeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      mapChartDom: null,
      cityDetail: null,
      cityNowData: [], // 现有确诊
      citySumData: [], // 累计确诊
      featuresData: {}, // 城市数据
      cityPY: null,
      setAllDetail: false,
      toggleMap: ["现存确诊", "累计确诊"], // 切换按钮
      activeIndex: 0
    };
  },
  created() {
    this.cityDetail = this.$store.state.demosticDetail.areaTree[0].children[
        this.$route.params.tableIndex
    ].children; // 保存城市信息
    if (
      this.cityDetail.length != 1 &&
      this.cityDetail[0].name != "地区待确认"
    ) {
      this.setAllDetail = true;  // 修改判断条件
      if (this.$route.params.cityName != "重庆" && this.$route.params.cityName != "内蒙古") {
        this.cityPY = codefans_net_CC2PY(
          this.$route.params.cityName
        ).toLowerCase(); // 获取城市拼音
      } else {
        switch (this.$route.params.cityName) {
          case '重庆':
            this.cityPY = "chongqing";
            break;
          case '内蒙古':
            this.cityPY = "neimenggu";
            break;
          default:
            break;
        }
        
      }

      this.setProvinceDetail(); // 处理数据

      getCityJson(this.cityPY).then((res) => {
        // 获取地图json数据
        let data = {};
        data.features = res.data.features;
        data.type = "FeatureCollection";
        data.UTF8Encoding = true;
        this.featuresData = JSON.stringify(data);
      });

      setTimeout(() => {
        if ( this.setAllDetail ) {
          console.log(document.getElementById("provinceMap"+this.typeIndex));
          this.mapChartDom = this.$echarts.init(
            document.getElementById("provinceMap"+this.typeIndex)
          ); // 获取dom元素
          this.$echarts.registerMap(
            this.$route.params.cityName,
            this.featuresData
          ); // 注册地图
          let option = this.getMapOptions(this.cityNowData)
          if (this.$route.params.cityName == "海南") {
            option.geo.center = [109.844902, 19.0392];//中心位置
            option.geo.layoutCenter = ['50%', '60%'];//地图相对容器偏移
            option.geo.layoutSize = "700%";//地图放大比例
          }
          this.mapChartDom.setOption(option); // 设置地图数据
        }
      }, 800);
    }
  },

  methods: {
    clickEvent() {
      this.$emit('shareClickEvent')
    },

    // 获取像素比
    fGetChartFontSize() {
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

    // 地图配置选项
    getMapOptions(cityDetail) {
      return {
        legend: {
          orient: "vertical",
          top: "9%",
          left: "5%",
          icon: "circle",
          data: [],
          selectedMode: "single",
          selected: {},
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 30,
          inactiveColor: "#f7f7f7",
          textStyle: {
            color: "#000000",
            fontSize: 11,
            fontWeight: 300,
            padding: [0, 0, 0, 15],
          },
        },
        tooltip: {
          trigger: "item",
          triggerOn:"click",
          textStyle: {
            color: '#FFF',     // 文字的颜色
            fontSize: '12',    // 文字字体大小
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
            return (
              "地区："+params.name +
              "<br>" +
              "确诊人数：" +(params.data==undefined?0:params.data.value)
            );
          },
        },
        visualMap: {
          show: true,
          type: "piecewise",
          splitNumber: 4,
          itemWidth: 25,
          itemHeight: 12,
          itemGap: 5,
          textStyle: {
            color: "#000000",
            fontSize: 11,
          },
          pieces: [
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
              color: "#f7f7f7",
              label: "无确诊人数",
            },
          ],
          left: "10px", //组件离容器左侧的距离,'left', 'center', 'right','20%'
          top: "10px",
        },
        geo: {
          // 设置地图的显示信息
          map: this.$route.params.cityName, // 注意  哪个区域的就显示哪个区域的名称
          label: {
            normal: {
              // 设置字体相关信息
              show: true,
              color: "#000",
            },
          },
          roam: false,
          itemStyle: {
            // 设置地图块的相关显示信息
            normal: {
              borderWidth: 1,
            },
          },
          left: "15%",
          right: "1%",
          top: "1%",
          bottom: "1%",
        },
        series: [
          {
            // 地图块的相关信息
            name: this.$route.params.cityName,
            type: "map",
            mapType: codefans_net_CC2PY(this.$route.params.cityName),
            roam: false,
            zoom: 1.2,
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: cityDetail ? cityDetail : [],
            label: {
              normal: {
                textStyle: {
                  fontSize: 11,
                  color: "#000",
                },
              },
              emphasis: {
                show: true,
              },
            },
          },
        ],
      };
    },

    // 处理数据
    setProvinceDetail() {
      let name = this.$route.params.cityName; // 获取城市名称
      if (
        this.cityDetail.length != 1 &&
        this.cityDetail[0].name != "待确认地区"
      ) {
        if (
          name != "北京" &&
          name != "上海" &&
          name != "天津" &&
          name != "重庆"
        ) {
          this.setLastCityName("市");
        } else {
          if (name == "北京" || name == "上海") {
            this.setLastCityName("区");
          } else {
            this.setLastCityName("");
          }
        }
      }
    },

    // 处理城市名称后缀
    setLastCityName(char = "") {
      for (const item of this.cityDetail) {
        if (item.name != true) {
          this.cityNowData.push({
            // 保存现有确诊数据
            name: item.name + char,
            value: item.total.nowConfirm,
          });
          this.citySumData.push({
            // 保存现有确诊数据
            name: item.name + char,
            value: item.total.confirm,
          });
        }
      }
    },

    // 切换显示方式
    toggleShowMap(index) {
      // 切换地图
      if (this.typeIndex == 1) {
        this.$emit("toggleEvent", index)
      }
      this.activeIndex = index;
      switch (this.activeIndex) {
        case 0:
          this.mapChartDom.setOption(this.getMapOptions(this.cityNowData));
          break;
        case 1:
          this.mapChartDom.setOption(this.getMapOptions(this.citySumData));
          break;
        default:
          break;
      }
    }
  },

  mounted() {
  },
};
</script>
<style scoped>
#provinceMapContainer{
  margin-bottom: var(--marginB);
}
#provinceMap1 {
  width: 100%;
  height: 260px !important;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
}
#provinceMap2 {
  width: 100%;
  height: 260px !important;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
}
.map_toggle_item {
  padding: 5px 10px;
  margin: 0 10px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 5px;
  transition: all 0.2s linear;
  font-size: 12px;
}
.map_toggle_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.activeModule {
  color: var(--color);
  background-color: rgba(29, 153, 211, 0.122);
  border: 1px solid rgba(29, 153, 211, 0.122);
}
</style>