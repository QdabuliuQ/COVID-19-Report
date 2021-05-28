<template>
  <div id="VaccineMap"></div>
</template>

<script>
import { getVaccineData, getWorldJson } from "network/vaccineInformation";
import world from "static/js/world";

export default {
  name: "VaccineMap",
  data() {
    return {
      mapJson: null,
      countryData: [],
      mapData: null,
    };
  },
  computed: {},
  created() {
    getWorldJson().then((res) => {
      this.mapData = res.data;
    });
    getVaccineData().then((res) => {
      for (const item of res.data.data.VaccineSituationData) {
        this.countryData.push({
          name: item.country,
          value: item.total_vaccinations,
          count: item.total_vaccinations_per_hundred,
        });
      }

      setTimeout(() => {
        let mapDom = this.$echarts.init(
          document.getElementById("VaccineMap"),
          null,
          { renderer: "svg" }
        );
        this.$echarts.registerMap("world", this.mapData);
        mapDom.setOption(this.getMapOptions(this.countryData, world));
      }, 300);
    });
  },
  methods: {
    getMapOptions(data, world) {
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
            return (
              params.name +
              "<br/>" +
              "累计接种人数 : " +
              that.setUnitChar(params.value) +
              "<br/>" +
              "每百人数接种 : " +
              params.data.count +
              " 剂"
            );
          },
        },
        visualMap: {
          min: 0,
          max: 10000000,
          text: ["高", "低"],
          realtime: false,
          calculable: true,
          color: [
            "#1480fa",
            "#499eff",
            "#73b4fd",
            "#a1ccfd",
            "#c8e1fd",
            "#ecf5ff",
          ],
          botton: 20,
          left: 20
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
  },
  mounted() {},
};
</script>
<style scoped>
#VaccineMap {
  width: 100%;
  height: 210px;
  background-color: #fff;
  margin-bottom: var(--marginB);
}
</style>