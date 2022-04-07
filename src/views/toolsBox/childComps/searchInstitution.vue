<template>
  <div id="searchInstitution">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'核酸检测机构'"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div :style="{ marginTop: mTop }" class="search_topContainer">
      <!-- <box-background></box-background> -->
      <!-- <div class="insitution_bg_image_box">
      </div> -->
      <img src="~assets/image/searchInstitution/institutionBgImage.png" alt="">
      <div class="detail_topBox">
        <div class="detail_topBox_title">核酸检测机构</div>
        <div class="detail_topBox_tip">
          为保障常态化疫情防控形势下的核酸检测、诊疗服务等有关工作需要，已经收集全国各省的检测机构。
        </div>
      </div>
    </div>
    <div class="select_place_container">
        <div class="select_majorContainer">
          <img class="institutionCardBgImage" src="~assets/image/searchInstitution/institutionCardBgImage.png" alt="">
          <div @click="showSheet = true" class="select_palce_Box">
            <i style="color: #fff" class="iconfont icon-qidian"></i>{{ placeName }}
          </div>
          <div class="container_topTip">
            已收录31个省 448个城市的核酸检测机构
          </div>
        </div>
      </div>
    <div class="search_result_container">
      <van-sticky :offset-top="mTop">
        <div class="search_topTitle">
          {{ lastPlace }}核酸检测机构有{{ count }}家
        </div>
      </van-sticky>
      <div v-if="searchResult.length != 0" class="search_item_container">
        <div
          class="search_items"
          v-for="(item, index) in searchResult"
          :key="index"
        >
          <div class="item_left_infor">
            <div class="items_name">
              {{ item.title }}
              <img
                src="~assets/image/searchInstitution/institution.svg"
                alt=""
              />
            </div>
            <div class="items_place">
              地区：{{ item.city }} / {{ item.district }}
            </div>
            <div class="items_address">地址：{{ item.address }}</div>
            <div class="items_phone">
              电话：<span>{{ item.tel }}</span
              ><i class="iconfont icon-dianhua"></i>
            </div>
          </div>
          <div class="item_right_img">
            <img @click="searchLocation(item, index)" src="~assets/image/searchInstitution/map.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="search_noContent" v-else>
        <img src="~assets/image/goOutPolicy/noContent.svg" alt="">
      </div>
    </div>
    <van-action-sheet class="institutionSheet" v-model="showSheet" title="选择城市">
      <div class="sheetContent">
        <div
          @click="selectPlaceItem(index, item.name)"
          :class="[activeIndex == index ? 'activeItems' : '']"
          class="sheet_city_items"
          v-for="(item, index) in cityList"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import boxBackground from "components/private/boxBackground";
import { getInstitutions } from "network/toolsBox";
import { getCityList } from "network/toolsBox";

export default {
  name: "searchInstitution",
  data() {
    return {
      mTop: 0,
      placeName: "北京",
      count: 0,
      searchResult: [], // 机构数据
      pageIndex: 1,
      showSheet: false,
      cityList: [],
      activeIndex: 0,
      lastPlace: "北京",
    };
  },
  methods: {
    onClickLeft() {
      // 路由跳转
      this.$router.go(-1);
    },

    institutions(region, page_index, page_size) {
      // 获取数据
      getInstitutions(region, page_index, page_size).then((res) => {
        this.count = res.data.result.count;
        this.searchResult = res.data.result.data;
      });
    },

    selectPlaceItem(index, name) {
      // 切换地点
      this.activeIndex = index;
      this.placeName = name;
      this.showSheet = false;
      this.searchInstitution()
    },

    searchInstitution() {
      // 查询地点
      if (this.lastPlace != this.placeName) {
        this.pageIndex = 0;
        this.institutions(this.placeName, this.pageIndex, 200);
        this.lastPlace = this.placeName;
      }
    },

    searchLocation(item, index) {  // 路由跳转
      this.$store.state.institutionDetail = item

      let arr = []
      if (index < this.searchResult.length - 10) {
        for (let i = index + 1; i <= index + 10; i++) {
          arr.push(this.searchResult[i])
        }
      } else {
        for (let j = index + 1; j <= this.searchResult.length; j++) {
          arr.push(this.searchResult[i])
        }
      }
      this.$store.state.otherInstitutions = arr
      this.$router.push('/InstitutionMap')
    }
  },
  mounted() {
    this.mTop =
      document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
  },
  components: {
    boxBackground,
  },
  created() {
    this.institutions(this.placeName, this.pageIndex, 200); // 发起请求

    getCityList().then((res) => {
      // 获取城市列表
      this.cityList = res.data.result;
    });
  },
};
</script>
<style scoped>
.institutionSheet {
  background-color: #fff !important;
}
.van-nav-bar {
  z-index: 2;
}
#searchInstitution {
  min-width: 100vw;
  min-height: 102vh;
  background-color: #fff;
  position: relative;
  z-index: 11;
}
.detail_topBox {
  padding: 12px;
  border-radius: 8px;
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0.804);
}
.detail_container {
  padding: 15px;
}
.detail_topBox_title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 3px;
}
.detail_topBox_tip {
  font-size: 12px;
  color: rgb(117, 117, 117);
}
.search_topContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color);
  padding: 0 15px;
  overflow: hidden;
  height: 170px;
}
.search_topContainer img {
  width: 50%;
}
.select_place_container {
  padding: 15px;
  font-size: 12px;
  position: relative;
  z-index: 1;
}
.select_majorContainer {
  padding: 30px 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-left: 10px;
  box-shadow:0px 2px 15px 5px rgb(225, 225, 225);
  position: relative;
  overflow: hidden;
}
.institutionCardBgImage {
  position: absolute;
  top: 50%;
  height: 100%;
  left: 50%;
  opacity: 0.4;
  transform: translate(-50%, -50%);
}
.container_topTip {
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 12px;
  padding-bottom: 10px;
}
.select_palce_Box {
  padding: 10px 12px;
  font-size: 14px;
  background-color: rgba(0, 119, 254, 0.495);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
  color: #Fff;
  font-weight: 550;
}
.select_palce_Box .iconfont {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}
.select_palce_Box:active {
  background-color: rgba(0, 119, 254, 0.694);
}
.iconfont {
  color: var(--color);
  margin-right: 4px;
}
.select_place_btn {
  margin: 0 auto;
  width: 80%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
  background-color: var(--color);
  border-radius: 35px;
  letter-spacing: 2px;
}
.select_place_btn:active {
  background-color: #177dac;
}
.search_topTitle {
  padding: 12px;
  text-align: center;
  font-size: 13px;
  letter-spacing: 2px;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.search_item_container {
  padding: 12px 15px;
  background-color: rgb(248, 248, 248);
}
.search_items {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(226, 226, 226);
  font-size: 12.5px;
  padding: 12px 0;
  color: rgb(112, 112, 112);
  display: flex;
}
.item_left_infor {
  flex: 8;
}
.item_right_img {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.item_right_img img {
  width: 80%;
}
.items_place {
  margin-bottom: 4px;
}
.items_address {
  margin-bottom: 4px;
}
.items_name {
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 4px;
  color: #000;
  display: flex;
  align-items: center;
}
.items_name img {
  width: 15px;
  margin-left: 5px;
  position: relative;
  top: -1px;
}
.items_phone span {
  color: var(--color);
}
.items_phone .iconfont {
  margin-left: 5px;
  position: relative;
  top: 1px;
}
.sheetContent {
  padding: 15px;
  font-size: 13.5px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
.van-popup {
  height: 60%;
}
.sheet_city_items {
  padding: 6px 15px;
  margin-bottom: 8px;
  background-color: rgba(245, 245, 245, 0.71);
  margin: 0 6px 8px;
  border-radius: 6px;
  transition: all 0.15s linear;
}
.activeItems {
  background-color: var(--color);
  color: #fff;
}
.search_noContent {
  margin-top: 120px;
  text-align: center;
}
</style>