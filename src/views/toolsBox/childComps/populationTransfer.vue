<template>
  <div id="populationTransfer">
    <div class="topContainer_select">
      <div @click="toBack" class="backBox">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="select_city">{{ city }}({{ NowTime }})</div>
      <div @click="qushiCharts" class="check_qushiChart">趋势图</div>
    </div>
    <div class="toggle_container">
      <div @click="modeToggle" class="item_Btn">
        <i class="iconfont icon-jinchu"></i>{{ moduleMap }}
      </div>
      <div @click="$refs.transferCitySheet.showAction()" class="item_Btn">
        <i class="iconfont icon-chengshi"></i>切换城市
      </div>
      <div @click="showCalendar = true" class="item_Btn">
        <i class="iconfont icon-shijian1"></i>切换日期
      </div>
    </div>
    <div id="centerContainer_map"></div>
    <!-- 城市选择 -->
    <cityListSheet
      @selectCity="selectCity"
      ref="transferCitySheet"
    ></cityListSheet>
    <!-- 日期选择 -->
    <van-calendar
      @confirm="confirmDate"
      :color="'#1d99d3'"
      v-model="showCalendar"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <van-action-sheet
      class="transferSheet"
      v-model="showSheetQushi"
      :title="`${city}${moduleMap}趋势图`"
    >
      <div class="qushi_container">
        <div class="chart_container"></div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getTransfer, getCityQushi } from "network/toolsBox";
import cityListSheet from "components/private/cityListSheet";
import "assets/css/vantCss/populationTransfer.css";
import { Toast } from 'vant';

export default {
  name: "populationTransfer",
  data() {
    return {
      city: "北京",
      code: "110000",
      geoCoordMap: {}, // 所有城市数据
      toCityData: [], // 数据路线
      time: "", // 时间
      moduleMap: "迁入情况", // 模式文字
      NowTime: "", // 当前时间
      NowMode: "move_in", // 显示模式
      showCalendar: false, // 显示/隐藏时间选择
      minDate: new Date(new Date().getFullYear(), 0, 1),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      showSheetQushi: false, // 趋势图显示/隐藏
      yearList: [], // 今年迁徙指数
      lastYearList: [], // 去年迁徙指数
      dateList: [], // 日期数组
      chartsCity: "",
    };
  },
  components: {
    cityListSheet,
  },
  created() {
    let d = new Date();
    let y = d.getFullYear(); // 获取年份
    let m = (d.getMonth() + 1 + "").padStart(2, "0"); // 获取月份
    let day = (d.getDate() - 1 + "").padStart(2, "0"); // 获取日期
    this.NowTime = `${y}-${m}-${day}`;
    this.time = y + m + day;

    this.createMap();
  },
  methods: {
    getMapOptions(series) {
      // 生成地图options
      return {
        backgroundColor: "#080a20",
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          textStyle: {
            color: "#fff",
          },
          selectedMode: "single",
        },
        geo: {
          map: "china",
          zoom: 1.2,
          scaleLimit: {
            //控制滚轮缩放大小
            max: 8,
            min: 1,
          },
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#132937",
              borderColor: "#0692a4",
            },
            emphasis: {
              areaColor: "#0b1c2d",
            },
          },
        },
        series,
      };
    },

    setMapDom(option) {
      // 设置地图dom
      // 生成地图
      let chartDom;
      chartDom = this.$echarts.getInstanceByDom(
        document.getElementById("centerContainer_map")
      );
      if (chartDom == null) {
        chartDom = this.$echarts.init(
          document.getElementById("centerContainer_map"),
          null,
          { renderer: "svg" }
        );
      }
      chartDom.setOption(option);
    },

    convertData(data) {
      // 筛选数据
      var res = [];
      for (const key in data) {
        let fromCoord = this.geoCoordMap[data[key][0].name];
        let toCoord = this.geoCoordMap[data[key][1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: data[key][0].name,
            toName: data[key][1].name,
            coords: [fromCoord, toCoord],
          });
        }
      }
      return res;
    },

    setMapMethod() {
      // 生成地图series
      // svg图片数据
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

      var color = ["#3ed4ff"];
      var series = [];
      let that = this;
      [[this.city, this.toCityData]].forEach(function (item, i) {
        series.push(
          {
            // 城市点
            name: item[0],
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: function (val) {
                  return val.data.name;
                },
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
            },
            // 线特效的配置
            effect: {
              show: true,
              period: 10, // 特效动画的时间，单位为 s
              trailLength: 0.7, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
              color: "#46bee9", // 移动箭头颜色
              symbol: planePath,
              symbolSize: 3, // 特效标记的大小
            },
            data: item[1].map(function (dataItem) {
              if (that.NowMode == "move_in") {
                return {
                  name: dataItem[0].name,
                  value: that.geoCoordMap[dataItem[0].name],
                };
              } else {
                return {
                  name: dataItem[1].name,
                  value: that.geoCoordMap[dataItem[1].name],
                };
              }
            }),
            markPoint: {
              animation: true,
            },
          },
          {
            // 城市线
            name: item[0],
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "#fff",
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.8,
                opacity: 0.4,
              },
            },
            data: that.convertData(item[1]),
          },
          {
            name: item[0],
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2,
              },
            },
            data: that.convertData(item[1]),
          }
        );
      });

      let option = this.getMapOptions(series);
      this.setMapDom(option);
    },

    createMap() {
      // 请求数据创建地图
      this.geoCoordMap = {};
      this.toCityData = [];
      getTransfer(this.code, this.NowMode, this.time).then((res) => {  // 获取数据
        if (res.data.data.list.length != 0 && res.data.data.ori.length != 0) {   // 判断是否有数据
          let result = res.data.data;
          if (this.NowMode == "move_in") {
            // 迁入模式数据设计
            for (const item of result.list) {
              this.geoCoordMap[item.city_name] = [
                item.coords.lng,
                item.coords.lat,
              ];
              this.toCityData.push([
                { name: item.city_name },
                { name: result.ori.city, value: item.value },
              ]);
            }
          } else {
            // 迁出模式数据设计
            for (const item of result.list) {
              this.geoCoordMap[item.city_name] = [
                item.coords.lng,
                item.coords.lat,
              ];
              this.toCityData.push([
                { name: result.ori.city },
                { name: item.city_name, value: item.value },
              ]);
            }
          }
          this.geoCoordMap[result.ori.city] = [
            // 添加当地的经纬度
            result.ori.coords.lng,
            result.ori.coords.lat,
          ];
          this.$nextTick(() => {
            setTimeout(() => {
              this.setMapMethod();
            }, 300);
          });
        } else {
          Toast.fail('暂无数据来源');
          // 模式切换
          if (this.NowMode == "move_in") {
            this.NowMode = "move_out";
            this.moduleMap = "迁出情况";
          } else {
            this.NowMode = "move_in";
            this.moduleMap = "迁入情况";
          }
        }
      });
    },

    toBack() {
      // 路由跳转
      this.$router.go(-1);
    },

    selectCity(name, id) {
      // 城市选择
      if (name != this.city) {
        this.city = name;
        this.code = id;
        this.createMap();
      }
    },

    modeToggle() {
      // 模式切换
      if (this.NowMode == "move_in") {
        this.NowMode = "move_out";
        this.moduleMap = "迁出情况";
        this.createMap();
      } else {
        this.NowMode = "move_in";
        this.moduleMap = "迁入情况";
        this.createMap();
      }
    },

    confirmDate(d) {
      // 确定日期
      let date = new Date(d);
      let y = date.getFullYear(); // 获取年份
      let m = (date.getMonth() + 1 + "").padStart(2, "0"); // 获取月份
      let day = (date.getDate() - 1 + "").padStart(2, "0"); // 获取日期
      if (`${y}-${m}-${day}` != this.NowTime) {
        // 判断是否选择重复日期
        this.time = y + m + day;
        this.NowTime = `${y}-${m}-${day}`;
        this.createMap();
      }
      this.showCalendar = false;
    },

    qushiCharts() {
      // 打开趋势图表
      let myChart;
      setTimeout(() => {
        myChart = this.$echarts.getInstanceByDom(
          document.getElementsByClassName("chart_container")[0]
        );
        if (myChart == null) {
          myChart = this.$echarts.init(
            document.getElementsByClassName("chart_container")[0],
            null,
            { renderer: "svg" }
          );
        }
      }, 200);
      this.showSheetQushi = true; // 显示action
      if (this.chartsCity != this.city) {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        if (m == 1) {
          m = 12;
          y -= 1;
        } else {
          m = (m - 1 + "").padStart(2, "0");
        }
        let d = (date.getDate() + "").padStart(2, "0"); // 处理日期
        this.yearList = [];
        this.dateList = [];
        this.lastYearList = [];
        getCityQushi(this.code, this.NowMode, y + m + d).then((res) => {
          // 获取趋势数据
          // 获取数据
          for (const key in res.data.data.list) {
            this.yearList.push(res.data.data.list[key]);
            this.dateList.push(key);
          }
          for (const key in res.data.data.list2) {
            this.lastYearList.push(res.data.data.list2[key]);
          }
          let options = {
            // 地图配置选项
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: this.dateList,
              axisLabel: {
                show: true,
                rotate: 40,
                textStyle: {
                  color: "#fff",
                },
                formatter: function (params) {
                  let str1 = params.substr(4);
                  let str2 = str1.slice(0, 2) + "-" + str1.slice(2);
                  return str2;
                },
              },
            },
            legend: {
              // 图例
              icon: "rect",
              itemWidth: 24,
              itemHeight: 12,
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
              top: "0%",
              left: "5%",
              left: "left",
            },
            grid: {
              // 布局
              top: "8%",
              left: "0%",
              right: "0%",
              bottom: "0%",
              containLabel: true,
            },
            yAxis: {
              type: "value",
              axisLabel: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            series: [
              {
                name: "去年迁徙指数",
                data: this.lastYearList,
                type: "line",
                areaStyle: {},
              },
              {
                name: "今年迁徙指数",
                data: this.yearList,
                type: "line",
                areaStyle: {},
              },
            ],
            tooltip: {
              trigger: "axis",
              triggerOn: "click",
              textStyle: {
                color: "#FFF", // 文字的颜色
                fontSize: "12", // 文字字体大小
              },
              padding: [7],
              backgroundColor: "rgba(0, 0, 0, 0.66)",
              borderColor: "transparent",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999",
                },
              },
              formatter: function (params) {
                let str = "";
                for (const item of params) {
                  str += `${item.marker} ${item.seriesName}：${item.value}<br>`;
                }
                return str;
              },
            },
          };
          myChart.setOption(options, true);
        });
        this.chartsCity = this.city;
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
#populationTransfer {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 11;
  top: 0;
  overflow: hidden;
  background-color: #fff;
  font-size: 12px;
}
.topContainer_select {
  width: 100%;
  height: 7vh;
  background-color: #4f5d73;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.select_city {
  color: #fff;
  font-size: 15px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  position: relative;
  top: -1px;
}
.toggle_city_Btn {
  position: absolute;
  padding: 7px 15px;
  background-color: var(--color);
  color: #fff;
  right: 15px;
  border-radius: 40px;
}
.toggle_city_Btn:active {
  background-color: #187ead;
}
#centerContainer_map {
  background-color: rgb(73, 71, 77);
  width: 100%;
  height: 86vh;
}
.toggle_container {
  width: 100%;
  height: 7vh;
  background-color: #34363b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toggle_item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
  font-size: 14px;
}
.item_Btn {
  height: 30px;
  padding: 0px 12px;
  background-color: var(--color);
  color: #fff;
  right: 15px;
  border-radius: 40px;
  font-size: 12px;
  margin: 0 7px;
  display: flex;
  align-items: center;
}
.item_Btn:active {
  background-color: #187ead;
}
.item_Btn .iconfont {
  margin-right: 5px;
}
.backBox {
  position: absolute;
  padding: 7px 0;
  left: 15px;
  color: #fff;
}
.backBox .iconfont {
  font-size: 15px;
}
.check_qushiChart {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: #fff;
  padding: 6px 13px;
  background-color: var(--color);
  border-radius: 40px;
}
.qushi_container {
  padding: 0 10px;
  height: 400px;
  display: flex;
  align-items: center;
}
.chart_container {
  width: 100%;
  height: 95%;
  position: relative;
  z-index: 999;
}
</style>