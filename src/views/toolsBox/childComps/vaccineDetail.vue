<template>
  <div id="vaccineDetail">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'世界疫苗动态'"
      left-arrow
      :fixed="true"
      @click-left="$router.go(-1)"
    />
    <div :style="{ marginTop: mTop }" class="bgImage_box">
      <img src="~assets/image/searchInstitution/vaccinesInformation.png" alt="">
      <div class="detail_topBox">
        <div class="detail_topBox_title">国际疫苗研发进度</div>
        <div class="detail_topBox_tip">
          数据来源：均为世卫组织公布或权威媒体公开报道可查询数据，本表仅统计进入临床II期以后疫苗进展。
        </div>
      </div>
    </div>
    <div class="detail_container">
      <content-split :text="'主要国家接种疫苗情况'"></content-split>
      <vaccine-countries></vaccine-countries>
      <content-split :text="'疫苗概况'"></content-split>
      <vaccine-basic></vaccine-basic>
      <vaccine-table></vaccine-table>
      <content-split :text="'疫苗上市流程'"></content-split>
      <vaccineProcess></vaccineProcess>
      <content-split :text="'疫苗动态追踪'"></content-split>
      <vaccineNews></vaccineNews>
    </div>
  </div>
</template>

<script>

import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import vaccineBasic from './childComps/vaccineBasic.vue'  // 疫苗基本信息
import vaccineTable from './childComps/vaccineTable.vue'  // 疫苗信息表格
import vaccineCountries from './childComps/vaccineCountries.vue'  // 国家疫苗信息
import vaccineProcess from './childComps/vaccineProcess.vue'  // 上市流程
import vaccineNews from './childComps/vaccineNews.vue'  // 疫苗信息

export default {
  name: "vaccineDetail",
  data() {
    return {
      mTop: 0, // 距离顶部距离
      
    };
  },
  mounted() {
    this.mTop = document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
  },
  components: {
    vaccineBasic,
    vaccineTable,
    vaccineCountries,
    vaccineProcess,
    vaccineNews
  }
};
</script>
<style scoped>
#vaccineDetail {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 11;
  font-size: 12px;
}
.bgImage_box{
  padding: 0 15px;
  height: 170px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color);
}
.bgImage_box img {
  width: 45%;
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
</style>