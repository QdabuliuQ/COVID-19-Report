<template>
  <div id="goOutPolicy">
    <van-popup v-model="isShow" position="bottom" :style="{ height: '70%' }">
      <van-cascader
        v-model="cascaderValue"
        :title="cascTitle"
        :options="options"
        active-color="#1d99d3"
        @close="isShow = false"
        @finish="onFinish"
      />
    </van-popup>
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'出行政策查询'"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div :style="{ marginTop: mTop }" class="policy_container">
      <div class="clip_left clip_container"></div>
      <div class="clip_right clip_container"></div>
      <div class="policy_select_box">
        <div class="policy_select_topBox">
          <div class="select_box_top select_box">
            <div class="box_title box_title_line box_title3">出发地</div>
            <div class="box_title box_title2">目的地</div>
          </div>
          <div class="select_box_center select_box">
            <div
              @click="selectPlace"
              class="box_select_place box_select_item box_select_left"
            >
              {{ startPlace.name }}<i class="iconfont icon-policy-xia"></i>
            </div>
            <div class="box_toggle box_select_item">
              <i @click="togglePlace" class="iconfont icon-zhuanhuan"></i>
            </div>
            <div
              @click="selectPlace2"
              class="box_select_place box_select_item box_select_right"
            >
              {{ endPlace.name }} <i class="iconfont icon-policy-xia"></i>
            </div>
          </div>
          <div class="select_box_bottom">
            <div @click="searchPolicy" class="select_box_btn">查询出行政策</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="policyList.length != 0" class="policy_result_container">
      <div class="policy_search_result">
        <div
          class="search_item"
          v-for="(item, index) in policyList"
          :key="index"
        >
          <div class="search_item_left">
            <div class="topleft_icon">
              <div class="icon_box"><i class="iconfont icon-yuandian"></i></div>
            </div>
            <div class="line_box"></div>
          </div>
          <div class="search_item_right">
            <!-- 出发地/目的地 -->
            <div class="item_right_place item_right_box">
              <div class="item_right_title">
                {{ index == 0 ? "出发地：" : "目的地：" }}{{ item.city }}
                <i
                  class="iconfont"
                  :class="[index == 0 ? 'icon-qidian' : 'icon-zhongdian']"
                ></i>
                <div
                  v-if="item.poi_list.length != 0"
                  class="highRisk_target highTarget title_target"
                >
                  风险地区
                </div>
              </div>
              <div class="item_right_tip">
                <span class="item_right_tip_title"
                  >综合当地卫健委和权威网站</span
                ><span class="item_right_tip_pushTime"
                  >政策发布时间：{{ item.back_policy_date }}</span
                >
              </div>
            </div>
            <!-- 到达政策 -->
            <div v-if="index == 1" class="item_right_back item_right_box">
              <div class="item_right_title">
                到达政策<i class="iconfont icon-daoda2"></i>
              </div>
              <div class="item_right_reach">
                <div
                  class="item_right_reach_item"
                  v-for="(policyItem, index) in item.back_policy_list"
                  :key="index"
                >
                  {{ policyItem }}
                </div>
              </div>
            </div>
            <!-- 离开政策 -->
            <div class="item_right_leave item_right_box">
              <div class="item_right_title">
                离开政策<i class="iconfont icon-likai"></i>
              </div>
              <div class="item_right_item">
                <div
                  class="item_right_reach_item"
                  v-for="(policyItem, index) in item.leave_policy_list"
                  :key="index"
                >
                  {{ policyItem }}
                </div>
              </div>
            </div>
            <!-- 中高风险地区 -->
            <div
              v-if="item.poi_list.length != 0"
              class="item_right_highRiskDistrict item_right_box"
            >
              <div class="item_right_title">
                中高风险地区 {{ item.poi_list.length }}个
                <i class="iconfont icon-fengxian1"></i>
              </div>
              <div
                class="item_highRisk_item"
                v-for="(highRisk, index2) in item.poi_list"
                :key="index2"
              >
                <div class="item_right_left_target">
                  <div
                    class="highRisk_target middleTarget"
                    v-if="highRisk.type == 1"
                  >
                    中风险
                  </div>
                  <div class="highRisk_target highTarget" v-else>高风险</div>
                </div>

                <div class="highRisk_districtName">{{ highRisk.area }}</div>
              </div>
            </div>
            <!-- 留宿须知 -->
            <div v-if="index == 1" class="item_right_stay">
              <div class="item_right_title">
                留宿须知<i class="iconfont icon-liusu"></i>
              </div>
              <div
                class="item_right_reach_item"
                v-for="(stayItem, index3) in item.stay_info_list"
                :key="index3"
              >
                {{ stayItem }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else :style="{ height: noContentDomHeight }" class="policy_result_noContent">
      <div class="noContent_box"> 
        <img src="~assets/image/goOutPolicy/noContent.svg" alt="">
        <div class="noContent_text">
          <i>还没有找到相关地区政策</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import "assets/css/vantCss/goOutPolicy.css";
import { getCityList, getCityPolicy } from "network/toolsBox";
export default {
  name: "goOutPolicy",
  data() {
    return {
      mTop: 0, // 距离顶部
      isShow: false, // 显示/隐藏弹出层
      options: [
        // 城市列表
      ],
      cascaderValue: "",
      cascTitle: "",
      startPlace: {
        name: "请选择出发地",
        id: null,
      },
      endPlace: {
        name: "请选择目的地",
        id: null,
      },
      selectFlag: "", // 判断选择是出发还是目的
      policyList: [],
      noContentDomHeight: '200px'
    };
  },
  methods: {
    onClickLeft() {
      // 返回上一层
      this.$router.go(-1);
    },

    selectPlace() {
      // 打开选择面板
      this.isShow = true;
      this.cascTitle = "请选择出发地";
      this.selectFlag = "start";
    },

    selectPlace2() {
      this.isShow = true;
      this.cascTitle = "请选择目的地";
      this.selectFlag = "end";
    },

    setCityList(list) {  // 设置城市数据
      if (list.length != 0) {
        let arr = [];
        for (const item of list) {
          if (item.list.length != 0) {
            arr.push({
              text: item.name,
              value: item.id,
              children: this.setCityList(item.list), // 进行递归调用
            });
          } else {
            arr.push({
              text: item.name,
              value: item.id,
            });
          }
        }
        return arr;
      } else {
        return [];
      }
    },

    onFinish(detail) {  // 监听是否选择完成
      let result = detail.selectedOptions;
      if (this.selectFlag == "start") {
        if (this.endPlace != result[result.length - 1].text) {
          this.startPlace.name = result[result.length - 1].text;
          this.startPlace.id = result[result.length - 1].value;
          this.isShow = false;
        }
      } else {
        if (result[result.length - 1].text != this.startPlace) {
          this.endPlace.name = result[result.length - 1].text;
          this.endPlace.id = result[result.length - 1].value;
          this.isShow = false;
        }
      }
      this.cascaderValue = "";
    },

    togglePlace() { // 切换目的地
      if (
        this.startPlace.name != "请选择出发点" &&
        this.endPlace.name != "请选择目的地"
      ) {
        let temp = this.startPlace;
        this.startPlace = this.endPlace;
        this.endPlace = temp;
      }
    },

    searchPolicy() {  // 搜索政策
      if (
        this.startPlace.name != "请选择出发地" &&
        this.endPlace.name != "请选择目的地"
      ) {
        getCityPolicy(this.startPlace.id + "," + this.endPlace.id).then(
          (res) => {
            this.policyList = res.data.result.data;
          }
        );
      }
    },
  },
  mounted() {
    this.mTop =
      document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
    this.noContentDomHeight = (window.screen.height - document.getElementsByClassName("van-nav-bar")[0].clientHeight - document.getElementsByClassName('policy_container')[0].clientHeight) + "px"
  },
  created() {
    getCityList().then((res) => {
      this.options = this.setCityList(res.data.result);
    });
  },
};
</script>
<style scoped>
#goOutPolicy {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 11;
  top: 0;
  overflow: hidden;
  background-color: #fff;
}
.policy_container {
  padding: 25px 15px;
  position: relative;
}
.clip_container {
  position: absolute;
}
.clip_left {
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  background-color: var(--color);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.clip_right {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #4f5d73;
}
.policy_select_box {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.select_box_top {
  display: flex;
}
.box_title_line {
  box-sizing: border-box;
  border-right: 1px solid rgba(0, 0, 0, 0.192);
}
.select_box_bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.select_box_btn {
  width: 70%;
  height: 35px;
  background-color: var(--color);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13.5px;
  letter-spacing: 2px;
  color: #fff;
}
.select_box_btn:active {
  background-color: #1776a1;
}
.select_box_center {
  display: flex;
  margin-top: 5px;
}
.box_title {
  flex: 1;
  font-size: 11px;
}
.box_title2 {
  text-align: right;
}
.box_title3 {
  text-align: left;
}
.box_select_item {
  flex: 4.25;
}
.box_select_place {
  padding: 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #686868;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
  font-weight: 550;
}
.box_select_left {
  margin: 0 10px 0 0;
}
.box_select_right {
  margin: 0 0 0 10px;
}
.box_select_place .iconfont {
  font-size: 10px;
  margin-left: 5px;
  color: #969696;
  position: relative;
  top: 1px;
}
.box_toggle {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box_toggle .iconfont {
  font-size: 20px;
  position: relative;
  top: 1px;
  color: #686868;
}
.van-area {
  width: 100%;
  height: 100%;
}
.policy_result_container {
  border-top: 8px solid rgb(247, 247, 247);
}
.policy_search_result {
  padding: 15px;
}
.search_item {
  display: flex;
  margin-bottom: 20px;
}
.search_item_left {
  flex: 0.7;
  position: relative;
}
.search_item_right {
  flex: 9.3;
}
.item_right_box {
  margin-bottom: 15px;
}
.item_right_title {
  font-size: 16px !important;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.item_right_title .icon-zhongdian{
  color: rgb(250, 180, 50) !important;
}
.item_right_title .iconfont {
  color: var(--color);
  position: relative;
  margin-left: 8px;
  font-size: 20px;
}
.item_right_title .icon-fengxian1 {
  color: rgb(255, 43, 43);
}
.item_right_tip {
  color: #9e9e9e;
  display: flex;
  font-size: 11px;
  position: relative;
}
.item_right_tip_pushTime {
  position: absolute;
  right: 0;
}
.item_right_reach_item {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.644);
  margin-bottom: 6px;
  letter-spacing: 1px;
}
.item_highRisk_item {
  display: flex;
  margin-bottom: 6px;
}
.highRisk_target {
  font-size: 10px;
  padding: 5px 7px;
  border-radius: 5px;
  transform: scale(0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}
.highRisk_districtName {
  flex: 9;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.middleTarget {
  background-color: rgba(255, 167, 34, 0.301);
  color: rgb(255, 133, 34);
  box-sizing: border-box;
  border: 1px solid rgb(255, 133, 34);
}
.highTarget {
  background-color: rgba(255, 60, 34, 0.199);
  color: rgb(255, 60, 34);
  box-sizing: border-box;
  border: 1px solid rgb(255, 60, 34);
}
.title_target {
  margin-left: 10px;
}
.topleft_icon {
  flex: 1;
  position: relative;
}
.topleft_icon .iconfont {
  color: var(--color);
  position: relative;
  font-size: 15px;
}
.line_box {
  content: "";
  position: absolute;
  top: 16px;
  width: 1px;
  left: 7px;
  height: 100%;
  background-color: rgba(29, 153, 211, 0.412);
}
.item_right_left_target {
  display: flex;
  align-items: center;
}
.policy_result_noContent{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
.noContent_box img {
  width: 100%;
}
.noContent_box{
  width: 70%;
}
.noContent_box .noContent_text{
  font-size: 15px;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 550;
  
}
</style>