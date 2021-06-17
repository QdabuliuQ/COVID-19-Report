<template>
  <div id="vaccineNews">
    <van-tabs animated :title-active-color='"#1d99d3"' :color='"#1d99d3"' v-model="active">
      <van-tab v-for="item,index in newsList" :title="item.topic_info.tag == '新冠疫苗的科普都在这里' ? '疫苗科普' : item.topic_info.tag" :key="index">
        <a :href="news.link" class="newsItem" v-for="news,index2 in item.topic_info.article_list" :key="index2">
          <div class="item_left_box">
            <div class="item_title">{{news.title}}</div>
            <div class="item_author_name">发布来源：{{news.author_name}}</div>
          </div>
          <div class="item_right_box">
            <img :src="news.cover_url" alt="">
          </div>
        </a>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getVaccineNews } from "network/toolsBox";
import "assets/css/vantCss/vaccineNews.css"

export default {
  name: 'vaccineNews',
  data () {
    return {
      newsList: [],  // 新闻数组
      active: 0  // 活跃tab
    }
  },
  created () {
    getVaccineNews().then(res => {
      this.newsList = res.data.cells
    })
  }
}

</script>
<style scoped>
.newsItem {
  width: 100%;
  display: flex;
  color: #000;
  text-decoration: none;
  margin-bottom: 12px;
  position: relative;
  min-height: 65px;
}
.newsItem:first-child {
  margin-top: 15px;
}
.item_left_box {
  flex: 7;
}
.item_right_box {
  flex: 3;
  display: flex;
  align-items: center;
  margin-left: 7px;
}
.item_right_box img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.item_title {
  font-weight: bold;
  font-size: 13px;
}
.item_author_name {
  width: 100%;
  font-size: 11px;
  color: rgb(107, 107, 107);
  position: absolute;
  bottom: 0;
}
    
</style>