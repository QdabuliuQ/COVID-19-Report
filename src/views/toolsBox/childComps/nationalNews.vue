<template>
  <div id="nationalNews">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'国内疫情速报'"
      left-arrow
      :fixed="true"
      @click-left="$router.go(-1)"
    />
    <div :style="{ marginTop: mTop }" class="bgImage_box">
      <img src="~assets/image/searchInstitution/newsList2.png" alt="">
      <div class="detail_topBox">
        <div class="detail_topBox_title">国内疫情速报</div>
        <div class="detail_topBox_tip">
          平台会在第一时间更新国内疫情相关资讯，请持续关注最新消息。
        </div>
      </div>
    </div>
    <div v-if="newsList.length != 0" class="news_container">
      <a :href="item.url" class="news_items" v-for="(item, index) in newsList" :key="index">
        <div class="topleft_icon" :class="[index != newsList.length - 1 ? 'line_box' : '']">
          <div class="icon_box"><i class="iconfont icon-yuandian"></i></div>
        </div>
        <div class="item_container">
        <div class="itemBgImage">
          <img class="newsItemBgImage" src="~assets/image/searchInstitution/newsItemBgImage.png" alt="">
        </div>
          <div class="item_title">
            {{ item.title }}
          </div>
          <div class="item_desc">
            {{ item.desc }}
          </div>
          <div class="item_pushTime">
            {{ item.publish_time }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import { getNationalNews } from "network/toolsBox";

export default {
  name: "nationalNews",
  data() {
    return {
      mTop: 0,
      newsList: [],
    };
  },
  created() {
    getNationalNews().then((res) => {  // 请求数据
      this.newsList = res.data.data.FAutoNewsArticleList;
    });
  },
  methods: {
    onClickLeft() {  // 返回上一层
      this.$router.go(-1);
    },

  },
  mounted() {
    this.$nextTick(() => {
      this.mTop =
        document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
    });
  },
};
</script>
<style scoped>
#nationalNews {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 11;
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
.itemBgImage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.newsItemBgImage {
  position: relative;
  width: 100%;
  top: 64%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.25;
}
.bgImage_box img {
  width: 43%;
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
.news_container {
  padding: 15px;
  background-color: rgb(247, 247, 247);
}
.news_items {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  position: relative;
}
.topleft_icon {
  padding: 10px 0;
  flex: 1;
  position: relative;
}
.topleft_icon .iconfont {
  color: var(--color);
  position: relative;
  font-size: 15px;
}
.line_box::before{
  content: '';
  position: absolute;
  top: 25.5px;
  width: 1px;
  left: 7px;
  height: 100%;
  background-color: rgba(29, 153, 211, 0.412);
}

.item_container {
  flex: 9;
  padding: 12px;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  /* background: var(--color); */
  position: relative;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(235, 235, 235);
  /* box-shadow:5px 5px 10px 5px rgba(0, 0, 0, .1); */
}
.item_container::before {
  content: "";
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid #fff;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  
  width: 0;
  height: 0;
  left: -20px;
  top: 9px;
}
.item_title {
  font-size: 14px;
  font-weight: 550;
  margin-bottom: 7px;
}
.item_desc {
  font-size: 13px;
  letter-spacing: 1px;
  margin-bottom: 9px;
  color: rgba(32, 32, 32, 0.927);
}
.item_pushTime {
  text-align: right;
  font-size: 10px;
  color: rgb(126, 126, 126);
}
</style>