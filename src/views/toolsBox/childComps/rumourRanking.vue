<template>
  <div id="rumourRanking">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'谣言排行榜'"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div :style="{ marginTop: mTop }" class="bgImage_box">
      <img class="bgImg" src="~assets/image/toolBgImage.jpg" alt="" />
      <img class="leftImg" src="~assets/image/searchInstitution/newsList.png" alt="">
      <div class="detail_topBox">
        <div class="detail_topBox_title">在线辟谣</div>
        <div class="detail_topBox_tip">
          疫情期间谣言四起，我们要做到不传谣，不信谣。谣言止于智者！
        </div>
      </div>
    </div>
    <div class="rumour_container">
      <div class="rumour_item" v-for="(item, index) in dataList" :key="item.id">
        <div class="romour_item_target">
          <div class="romour_item_index">{{ index + 1 }}</div>
        </div>
        <div class="romour_item_img">
          <img
            v-if="item.rumorType == 1"
            src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/true@3x.d2f5c6ba.png"
            alt=""
          />
          <img
            v-else-if="item.rumorType == 2"
            src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/unknown@3x.7636fb34.png"
            alt=""
          />
          <img
            v-else
            src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/false@3x.02069c64.png"
            alt=""
          />
        </div>
        <div class="romour_item_title">
          {{ item.title }}
        </div>
        <div class="romour_item_textBox">
          <div class="romour_item_mainSummary">
            {{ item.mainSummary }}
          </div>
          <div v-show="item.showFlag" class="romour_item_body">
            {{ item.body }}
          </div>
          <div @click="toggleContent(index)" class="romour_item_show">
            {{item.showText}} <i class="iconfont" :class="item.showIcon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import { getAllRumour } from "network/toolsBox";

export default {
  name: "rumourRanking",
  data() {
    return {
      dataList: [],
      mTop: 0,
    };
  },
  created() {
    getAllRumour().then((res) => {
      for (const item of res.data.data) {
        this.dataList.push({
          id: item.id,
          body: item.body,
          mainSummary: item.mainSummary,
          rumorType: item.rumorType,
          title: item.title,
          showText: "展开详情",
          showIcon: "icon-xia",
          showFlag: false
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.mTop =
        document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    toggleContent(i) {
      let str = this.dataList[i]
      if (!str.showFlag) {
        str.showText = '收起详情'
        str.showIcon = 'icon-shang'
        str.showFlag = true
      } else {
        str.showText = '展开详情'
        str.showIcon = 'icon-xia'
        str.showFlag = false
      }
    }
  },
};
</script>
<style scoped>
#rumourRanking {
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
  position: relative;
}
.bgImage_box .leftImg {
  width: 40%;
}
.bgImage_box .bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
.detail_topBox {
  padding: 12px;
  border-radius: 8px;
  margin-left: 10px;
  backdrop-filter: blur(2px) saturate(200%);
    -webkit-backdrop-filter: blur(2px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: #Fff !important;
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
  color: rgb(241, 241, 241);
}
.rumour_container {
  padding: 15px;
}
.rumour_item {
  margin-bottom: 15px;
  padding: 17px;
  background-color: var(--color);
  border-radius: 8px;
  position: relative;
}
.romour_item_title {
  padding: 15px 20px 15px 0;
  font-size: 30px;
  font-weight: 550;
  color: #fff;
  letter-spacing: 2px;
}
.romour_item_target {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #4f5d73;
  clip-path: polygon(0 0, 0% 100%, 100% 0);
  left: 0;
  top: 0;
  border-top-left-radius: 8px;
  display: flex;
  align-items: center;
}
.romour_item_index {
  width: 100%;
  height: 50%;
  color: #fff;
  font-size: 15px;
  text-align: center;
  text-indent: -20px;
  margin-top: -5px;
}
.romour_item_img {
  position: absolute;
  width: 90px;
  right: 0;
  top: 0;
}
.romour_item_img img {
  width: 100%;
}
.romour_item_textBox {
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
}
.romour_item_mainSummary {
  color: var(--color);
  font-size: 15px;
}
.romour_item_body {
  margin-top: 7px;
  font-size: 13px;
  letter-spacing: 1.5px;
  line-height: 20px;
  transition: all 0.2s linear;
}
.romour_item_show{
  margin-top: 7px;
  width: 100%;
  text-align: right;
  font-size: 12px;
}
.romour_item_show .iconfont {
  margin-top: 2px;
  font-size: 10px;
}
</style>