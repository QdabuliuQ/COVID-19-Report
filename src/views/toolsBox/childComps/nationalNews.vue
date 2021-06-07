<template>
  <div id="nationalNews">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'国内疫情速报'"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div v-if="newsList.length != 0" :style="{ marginTop: mTop }" class="news_container">
      <a :href="item.url" class="news_items" v-for="(item, index) in newsList" :key="index">
        <div class="topleft_icon" :class="[index != newsList.length - 1 ? 'line_box' : '']">
          <div class="icon_box"><i class="iconfont icon-yuandian"></i></div>
        </div>
        <div class="item_container">
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

.news_container {
  padding: 15px;
}
.news_items {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
}
.topleft_icon {
  padding: 10px 0;
  flex: 1;
  position: relative;
}
.topleft_icon .iconfont {
  color: var(--color);
  position: relative;
}
.line_box::before{
  content: '';
  position: absolute;
  top: 26px;
  width: 1px;
  left: 7.5px;
  height: 100%;
  background-color: #1d99d369;
}
.item_container {
  flex: 9;
  padding: 12px;
  border-radius: 8px;
  background: rgba(168, 168, 168, 0.103);
  /* background: var(--color); */
  position: relative;
  color: rgb(0, 0, 0);
  box-shadow: 3px 5px 8px rgba(0, 0, 0, .1);
}
.item_container::before {
  content: "";
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid #f1f1f1;
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
  color: rgba(90, 90, 90, 0.87);
}
.item_pushTime {
  text-align: right;
  font-size: 10px;
  color: rgb(126, 126, 126);
}
</style>