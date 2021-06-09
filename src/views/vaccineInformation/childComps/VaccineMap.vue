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

      this.$nextTick(() => {
        setTimeout(() => {
          let mapDom = this.$echarts.init(
            document.getElementById("VaccineMap"),
            null,
            { renderer: "svg" }
          );
          this.$echarts.registerMap("world", this.mapData);
          mapDom.setOption(this.getMapOptions(this.countryData, world));
        }, 500);
      });
    });
  },
  methods: {
    getMapOptions(data, world) {
      let colorArea = [
        "#1480fa",
        "#499eff",
        "#73b4fd",
        "#a1ccfd",
        "#c8e1fd",
        "#ecf5ff",
      ]
      let that = this;
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "11", // 文字字体大小
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
          type: 'piecewise',
          splitNumber: 6,
          calculable: true,
          orient: 'horizontal',
          dimension: 0,
          itemGap: 0,
          pieces: [      // 自定义每一段的范围，以及每一段的文字
            { gte: 100000000, color: colorArea[0] }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gte: 10000000, lte: 99999999, color: colorArea[1] },
            { gte: 1000000, lte: 9999999, color: colorArea[2] },
            { gte: 100000, lte: 999999, color: colorArea[3] },
            { gte: 11, lte: 99999, color: colorArea[4] },
            { lte: 10, color: colorArea[5] }          // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          realtime: false,
          color: colorArea,
          bottom: 5,
          left: 10,
          itemWidth: 45,
          itemHeight: 6,
          showLabel: false,
          left: 'center',
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
  height: 230px;
  background-color: transparent;
  margin-bottom: var(--marginB);
}
</style>