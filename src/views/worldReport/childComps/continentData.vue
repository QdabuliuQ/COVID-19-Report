<template>
  <div id="continentData">
    <van-popover
      v-model="showPopover"
      trigger="click"
      :actions="actions"
      @select="onSelect"
      :placement="'bottom-end'"
    >
      <template #reference>
        <div
          :style="{
            backgroundColor:
              dataType == 'confirm'
                ? 'hsla(0, 74%, 42%, 0.5)'
                : dataType == 'heal'
                ? 'hsla(115, 93%, 44%, 0.5)'
                : 'hsla(0, 0%, 51%, 0.5)',
          }"
          class="toggleBtn"
        >
          {{
            dataType == "confirm"
              ? "累计确诊"
              : dataType == "heal"
              ? "累计治愈"
              : "累计死亡"
          }}<img src="~assets/image/toggleIcon.png" />
        </div>
      </template>
    </van-popover>
    <div id="continentChartDom"></div>
    <div class="btnList">
      <div
        @click="toggleContinentData(index)"
        v-for="(item, index) in btnList"
        :key="index"
        :class="[activeIndex == index ? 'activeBtnItem' : '', 'btnItem']"
      >
        <div
          :class="['continentClass' + index]"
          style="display: flex; align-items: center"
        >
          <img :class="['continentIcon' + index]" :src="item.icon" alt="" />
          <span :class="['continentName' + index]">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="dataTable">
      <div class="tableItem">
        <div class="topText"></div>
        <div style="color: #ff4747" class="itemData">{{ totalNewConfirm }}</div>
        <div class="bottomText">现有确诊</div>
      </div>
      <div class="tableItem">
        <div class="topText"></div>
        <div style="color: #b91c1c" class="itemData">{{ totalConfirm }}</div>
        <div class="bottomText">累计确诊</div>
      </div>
      <div class="tableItem">
        <div class="topText"></div>
        <div style="color: #19d808" class="itemData">{{ totalHeal }}</div>
        <div class="bottomText">累计治愈</div>
      </div>
      <div class="tableItem">
        <div class="topText"></div>
        <div style="color: #838383" class="itemData">{{ totalDead }}</div>
        <div class="bottomText">累计死亡</div>
      </div>
    </div>
  </div>
</template>

<script>
let myChart;
export default {
  name: "continentData",
  data() {
    return {
      showPopover: false,
      actions: [
        { text: "累计确诊" },
        { text: "累计治愈" },
        { text: "累计死亡" },
      ],
      activeIndex: 0, // 活跃索引
      totalNewConfirm: 0, // 新确诊
      totalConfirm: 0, // 累计确诊
      totalHeal: 0, // 累计治愈
      totalDead: 0, // 累计死亡
      overseaData: {
        asia: [], // 亚洲
        africa: [], // 非洲
        oceania: [], // 大洋洲
        northAmerica: [], // 北美洲
        southAmerica: [], // 南美洲
        europe: [], // 欧洲
      },
      btnList: [
        {
          icon: require("../../../assets/image/asia.svg"),
          name: "亚洲",
        },
        {
          icon: require("../../../assets/image/africa.svg"),
          name: "非洲",
        },
        {
          icon: require("../../../assets/image/oceania.svg"),
          name: "大洋洲",
        },
        {
          icon: require("../../../assets/image/northAmerica.svg"),
          name: "北美洲",
        },
        {
          icon: require("../../../assets/image/southAmerica.svg"),
          name: "南美洲",
        },
        {
          icon: require("../../../assets/image/europe.svg"),
          name: "欧洲",
        },
      ],
      legendData: [],
      dataList: [],
      areaName: "asia",
      dataType: "confirm",
      dataText: "累计确诊",
    };
  },
  methods: {
    onSelect(action) {
      this.dataText = action.text;
      switch (action.text) {
        case "累计确诊":
          this.dataType = "confirm";
          break;
        case "累计治愈":
          this.dataType = "heal";
          break;
        case "累计死亡":
          this.dataType = "dead";
          break;
      }
      this.createChart(this.areaName, this.dataType);
    },

    toggleContinentData(index) {
      this.activeIndex = index;
      switch (index) {
        case 0:
          this.areaName = "asia";
          break;
        case 1:
          this.areaName = "africa";
          break;
        case 2:
          this.areaName = "oceania";
          break;
        case 3:
          this.areaName = "northAmerica";
          break;
        case 4:
          this.areaName = "southAmerica";
          break;
        case 5:
          this.areaName = "europe";
          break;
      }
      this.createChart(this.areaName, this.dataType);
    },

    createChart(continent, dataType) {
      this.getCountryList(continent, dataType); // 格式化数据
      let option = {
        tooltip: {
          trigger: "item",
          formatter: `{b}(${this.dataText}):{c}例 <br/>`,
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          right: 0,
          bottom: 0,
          data: this.legendData,
        },
        series: [
          {
            name: "continent",
            type: "pie",
            radius: "55%",
            center: ["50%", "48%"],
            data: this.dataList,
            labelLine: {
              length: 10,
              length2: 20,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },

    getCountryList(continentName, dataType) {
      // 格式化数据
      this.legendData = [];
      this.dataList = [];
      this.totalNewConfirm = 0; // 新确诊
      this.totalConfirm = 0; // 累计确诊
      this.totalHeal = 0; // 累计治愈
      this.totalDead = 0; // 累计死亡
      for (const item of this.overseaData[continentName]) {
        this.legendData.push(item.name);
        this.dataList.push({
          name: item.name,
          value: item[dataType],
        });
        this.totalNewConfirm += item.nowConfirm;
        this.totalConfirm += item.confirm;
        this.totalHeal += item.heal;
        this.totalDead += item.dead;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      let data = this.$store.state.worldData.WomAboard;
      for (const item of data) {
        // 处理数据
        switch (item.continent) {
          case "亚洲":
            this.areaName = "asia";
            break;
          case "非洲":
            this.areaName = "africa";
            break;
          case "大洋洲":
            this.areaName = "oceania";
            break;
          case "北美洲":
            this.areaName = "northAmerica";
            break;
          case "南美洲":
            this.areaName = "southAmerica";
            break;
          case "欧洲":
            this.areaName = "europe";
            break;
        }
        this.overseaData[this.areaName].push(item);
      }
      this.$nextTick(() => {
        // 创建erchart实例
        myChart = this.$echarts.init(
          document.getElementById("continentChartDom")
        );
        this.createChart("asia", "confirm");
      });
    }, 1000);
  },
};
</script>
<style>
.van-popover__action {
  height: 40px;
  font-size: 13px !important;
  padding: 0 15px;
}
</style>
<style scoped>
#continentData {
  margin-bottom: var(--marginB);
  position: relative;
}
.van-popover__wrapper {
  position: absolute;
  right: 0;
  z-index: 9999;
}

.toggleBtn {
  font-size: 12px;
  padding: 7px 15px;
  transition: 0.2s all linear;
  border-radius: 6px;
  background-color: rgb(243, 108, 108);
  color: #fff;
  display: flex;
  align-items: center;
}
.toggleBtn img {
  width: 15px;
  margin-left: 2px;
}
#continentChartDom {
  width: 100%;
  height: 330px;
}
.btnList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
  justify-content: space-around;
}
.btnItem {
  width: 29%;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 35px;
  justify-content: center;
  border-radius: 8px;
  background-color: rgb(253, 253, 253);
  border: 1px solid #ccc;
  margin-bottom: 5px;
  transition: 0.2s all linear;
}
.activeBtnItem {
  background-color: rgba(33, 175, 241, 0.212) !important;
  color: #21aff1 !important;
  border: 1px solid #21aff1;
}
.dataTable {
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
}
.tableItem {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 12px;
}
.itemData {
  font-size: 15px;
}
.tableItem:nth-child(1) {
  background-color: hsla(0, 100%, 64%, 0.11);
}
.tableItem:nth-child(2) {
  background-color: hsla(0, 74%, 42%, 0.11);
}
.tableItem:nth-child(3) {
  background-color: hsla(115, 93%, 44%, 0.11);
}
.tableItem:nth-child(4) {
  background-color: hsla(0, 0%, 51%, 0.11);
}
.continentIcon0 {
  width: 30px;
}
.continentIcon1 {
  width: 25px;
}
.continentIcon2 {
  width: 25px;
}
.continentName3 {
  margin-left: 4px;
}
.continentName4 {
  margin-left: 4px;
}
.continentName5 {
  margin-left: 4px;
}
.continentClass0 {
  position: relative;
  left: -3px;
}
.continentClass1 {
  position: relative;
  left: -3px;
}
</style>