<template>
  <div v-if="newsList != null" id="getProvinceNews">
    <content-split
      :text="$route.params.cityName + '疫情资讯'"
    ></content-split>
    <a :href="item.news_url" class="news_items" v-for="item,index in newsList" :key="index">
      <div class="left_news_items">
        <div class="left_news_title">
          {{item.title}}
        </div>
        <div class="left_news_from">
          发布来源：{{item.srcfrom}}
        </div>
      </div>
      <div class="right_news_items">
        <img :src="item.shortcut" alt="">
      </div>
    </a>
  </div>
</template>

<script>
import { getProvinceNews } from "network/provinceDetail";
import { codefans_net_CC2PY } from "static/js/PinYin";

export default {
  name: "getProvinceNews",
  data () {
    return {
      newsList: []
    }
  },
  methods: {
    allCaps(text) {  // 转换省份首字母小写
      let str = ''
      for (var i = 0; i < text.length; i++) {
        var c = text[i].charCodeAt();
        if (c >= 65 && c <= 90) {  
          str += text[i]
        };
      }
      return str
    },
  },
  created() {
    let cityName = this.$route.params.cityName;
    let cityPY;
    if (cityName != "重庆") {
      cityPY = (this.allCaps(codefans_net_CC2PY(this.$route.params.cityName))).toLowerCase(); // 获取城市拼音
    } else {
      cityPY = "cq";
    }
    // getProvinceNews(cityPY, 10).then((res) => {
    //   this.newsList = res.data.data.items
    // });
  },
};
</script>
<style scoped>
#getProvinceNews{width: 100%;}
.news_items{
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  color: #000;
}
.left_news_items{
  flex: 7.2;
  position: relative;
}
.left_news_title{
  font-size: 15.5px;
  font-weight: 500;
  width: 100%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.left_news_from{
  position: absolute;
  left: 0;
  bottom: 2px;
  color: #9e9e9e;
  font-size: 12px;
}
.right_news_items{
  margin-left: 5px;
  flex: 2.8;
}
.right_news_items img{
  width: 100%;
  border-radius: 5px;
}
</style>