<template>
  <div id="ProvinceDetail">
    <transition name="van-fade">
      <van-nav-bar
        class="van-nav-bar"
        v-show="showNavBar"
        ref="nav_bar"
        :title="navTitle + '疫情资讯'"
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
      />
    </transition>
    <div class="province_container">
      <div class="province_top_bgImg">
        <div class="top_back_btn">
          <van-icon
            @click="onClickLeft"
            size="22px"
            color="#fff"
            name="arrow-left"
          />
        </div>
        <div class="top_bgImg">
          <img
            src="https://mat1.gtimg.com/news/feiyanarea/area_head_bg.png"
            alt=""
          />
        </div>
        <div class="top_bgImg_text">
          <div class="top_bgImg_title">新型冠状病毒肺炎</div>
          <div class="top_bgImg_secondTitle">
            <span>{{ this.navTitle }}</span
            >实时疫情资讯
          </div>
          <div class="top_bgImg_tip">
            数据来源：国家及各地卫健委每日信息发布
          </div>
        </div>
      </div>
      <div ref="provinceTable" class="province_detail_container">
        <province-table class="province-table"></province-table>
        <provinceMap @toggleEvent="toggleEvent" @shareClickEvent="shareClickEvent"></provinceMap>
        <content-split
          :text="$route.params.cityName + '疫情趋势图'"
        ></content-split>
        <province-month-data></province-month-data>
        <province-hospital></province-hospital>
        <!-- <province-news></province-news> -->
        <content-split :text="$route.params.cityName + '疫情'"></content-split>
        <province-data-list></province-data-list>
      </div>
    </div>
    <playbill-template :height='"460px"' :margin='"4vh auto 0"' ref="playbillProvinceTemplate">
      <div slot="topSlot" class="playbillTopTitle">
        <i>#</i
        ><label style="color: #e3d24c">{{ $route.params.cityName }}</label
        >疫情数据地图<i>#</i>
      </div>
      <div slot="centerSlot" style="padding: 13px">
        <div class="contentTopTitle">
          我正在关注<label style="color: #1d99d3">{{
            $route.params.cityName
          }}</label
          >疫情
        </div>
        <div class="updataTime">
          统计时间：{{ $store.state.demosticDetail.lastUpdateTime }}
        </div>
        <province-table class="province-table"></province-table>
        <provinceMap ref="playbillProvinceMap" :typeIndex="2"></provinceMap>
      </div>
    </playbill-template>
    <van-popup v-model="showPopup">
      <div class="playbillBox">
        <img :src="imageUrl" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import playbillTemplate from "components/private/playbillTemplate"; // 海报模板
import html2canvas from "html2canvas";
import "assets/css/vantCss/provinceDetail.css"; // 引入css文件
import provinceTable from "./childComps/provinceTable"; // 导入表格组件
import provinceMap from "./childComps/provinceMap"; // 地图组件
import provinceMonthData from "./childComps/provinceMonthData"; // 两个月数据图表
import provinceHospital from "./childComps/provinceHospital"; // 医院组件
import provinceNews from "./childComps/provinceNews"; // 疫情资讯
import provinceDataList from "./childComps/provinceDataList.vue";
import { Toast } from "vant"; // 导入加载动画

export default {
  name: "ProvinceDetail",
  data() {
    return {
      navTitle: "",
      cityIndex: 0,
      showPopup: false,
      imageUrl: "",
      showNavBar: false, // 显示/隐藏顶部导航栏
    };
  },
  methods: {
    toggleEvent(index) {
      this.$refs.playbillProvinceMap.toggleShowMap(index);
    },

    shareClickEvent() {
      // 分享海报
      Toast.loading({
        message: "加载中...", //加载的时候显示的文字
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
        overlay: true, //是否显示遮罩层
        forbidClick: true, //是否禁止背景点击
      });
      // 生成海报
      html2canvas(this.$refs.playbillProvinceTemplate.$el, {
        scale: 2,
        dpi: 300,
        height: this.$refs.playbillProvinceTemplate.$el.clientHeight, // 去除图片白边问题
        width: document.documentElement.clientWidth,
      }).then((canvas) => {
        // 生成图片
        this.imageUrl = canvas.toDataURL("image/png");
        Toast.clear();
        this.showPopup = true;
      });
    },

    onClickLeft() {
      // 返回上一层
      this.$router.go(-1);
    },

    listenScroll() {
      if (
        window.pageYOffset > this.tableToTop &&
        window.pageYOffset < this.tableToTop + 200
      ) {
        this.showNavBar = true;
      } else if (
        window.pageYOffset < this.tableToTop &&
        window.pageYOffset > this.tableToTop - 200
      ) {
        this.showNavBar = false;
      }
    },
  },
  created() {
    this.navTitle = this.$route.params.cityName; // 保存城市名称
    this.cityIndex = this.$route.params.tableIndex;
    console.log(
      this.$store.state.demosticDetail.areaTree[0].children[this.cityIndex]
    );
  },
  mounted() {
    setTimeout(() => {
      this.tableToTop = this.$refs.provinceTable.getBoundingClientRect().top;
      window.addEventListener("scroll", this.listenScroll);
    }, 1000);
  },
  destroyed() {
    window.removeEventListener("scroll", this.listenScroll); // 删除事件
  },
  components: {
    provinceTable,
    provinceMap,
    provinceMonthData,
    provinceHospital,
    provinceNews,
    provinceDataList,
    playbillTemplate,
  },
};
</script>
<style scoped>
#ProvinceDetail {
  min-width: 100vw;
  background-color: #fff;
  position: relative;
  z-index: 11;
}
.van-popup {
  background-color: transparent;
}
.playbillBox {
  width: 85vw;
  border-radius: 8px;
  overflow: hidden;
}
.playbillBox img {
  width: 100%;
}
.playbillTopTitle {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-top: 50px;
}
.contentTopTitle {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 3px;
}
.updataTime {
  font-size: 13px;
  text-align: left;
  margin-bottom: 10px;
}
.van-nav-bar {
  z-index: 12;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.province_top_bgImg {
  width: 100%;
  position: relative;
}
.top_bgImg {
  width: 100%;
}
.top_bgImg_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.top_back_btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 17px;
  display: flex;
  align-items: center;
}
.top_bgImg img {
  width: 100%;
}
.top_bgImg_title {
  color: #fff;
  font-size: 21px;
  font-weight: 550;
  letter-spacing: 2px;
  margin-bottom: 4px;
  text-align: center;
}
.top_bgImg_secondTitle {
  width: 100%;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  letter-spacing: 1px;
}
.top_bgImg_secondTitle span {
  padding: 3px 6px;
  border-radius: 5px;
  font-weight: 550;
  background-color: #fff;
  color: rgb(52, 79, 236);
  font-size: 13.5px;
  margin-right: 5px;
  position: relative;
  top: 1px;
}
.top_bgImg_tip {
  font-size: 11.5px;
  color: rgb(209, 209, 209);
  white-space: nowrap;
  letter-spacing: 1px;
}
.province_detail_container {
  margin-top: -25px;
  padding: 0 15px 20px;
  position: relative;
  z-index: 3;
}
.province-table {
  margin-bottom: 20px;
}
</style>