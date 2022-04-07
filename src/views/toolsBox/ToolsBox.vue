<template>
  <div id="ToolsBox">
    <div class="report_top_container">
      <div class="top_container_imgBox">
        <img src="~assets/image/toolPageBgImage.jpg" alt="" />
      </div>
      <div class="top_container_textBox">
        <div class="textBox_title">疫情相关工具大全</div>
        <div class="textBox_title2">国内疫情服务平台</div>
        <div class="textBox_title3">整合了疫情资讯，患者路径，核酸检测等基本功能</div>
      </div>
    </div>
    <div class="itemContainer">
      <div
        class="tools_item"
        @click="routerClick(index, item.routerPath)"
        v-for="(item, index) in toolList"
        :key="item.name"
      >
        <img class="bgImage" :src="item.image" alt="" />
        <div :ref="'toolsItem' + index" class="left_item">
          <i :ref="'icon' + index" class="iconfont" :class="item.icon"></i>
        </div>
        <div :ref="'title' + index" class="tools_item_name">
          {{ item.name }}
          <div class="itemTip">{{ item.tip }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolsBox",
  data() {
    return {
      toolList: [
        {
          name: "世界疫苗动态",
          icon: "icon-yimiaodongtai",
          routerPath: "/VaccineDetail",
          image: require("../../assets/image/btn1BgImage.png"),
          tip: "第一时间更新最新世界各国疫苗动态",
        },
        {
          name: "疫情人口迁徙",
          icon: "icon-qianxi",
          routerPath: "/PopulationTransfer",
          image: require("../../assets/image/btn2BgImage.png"),
          tip: "大数据统计疫情期间人员流动",
        },
        {
          name: "疫苗接种预约",
          icon: "icon-yuyue",
          routerPath: "/AppointVaccine",
          image: require("../../assets/image/btn3BgImage.png"),
          tip: "提前申请预约新冠疫苗",
        },
        {
          name: "国内疫情速报",
          icon: "icon-subao",
          routerPath: "/NationalNews",
          image: require("../../assets/image/btn4BgImage.png"),
          tip: "及时更新国内疫情最新资讯",
        },
        {
          name: "谣言排行榜",
          icon: "icon-yaoyan",
          routerPath: "/RumourRanking",
          image: require("../../assets/image/btn5BgImage.png"),
          tip: "疫情期间在线辟谣",
        },
        {
          name: "出行政策查询",
          icon: "icon-zengce",
          routerPath: "/GoOutPolicy",
          image: require("../../assets/image/btn6BgImage.png"),
          tip: "目的地地方防疫政策查询",
        },
        {
          name: "核酸检测机构",
          icon: "icon-jigou",
          routerPath: "/SearchInstitution",
          image: require("../../assets/image/btn7BgImage.png"),
          tip: "大数据统计全国各省核酸机构",
        },
        {
          name: "患者行程轨迹",
          icon: "icon-chuxing",
          routerPath: "/PatientRoute",
          image: require("../../assets/image/btn8BgImage.png"),
          tip: "大数据记录确诊患者行踪路径",
        },
      ],
    };
  },
  methods: {
    setRouter(path) {
      setTimeout(() => {
        this.$router.push(path);
      }, 300);
    },

    routerClick(index, path) {
      this.$refs["icon" + index][0].classList.add("clickIconClass");
      this.$refs["title" + index][0].classList.add("clickTextClass");
      document
        .getElementsByClassName("left_item")
        [index].classList.add("clickClipClass");
      this.setRouter(path); // 路由跳转
      setTimeout(() => {
        this.$refs["toolsItem" + index][0].classList.remove("clickClipClass");
        this.$refs["icon" + index][0].classList.remove("clickIconClass");
        this.$refs["title" + index][0].classList.remove("clickTextClass");
      }, 1000);
    },
  },
};
</script>
<style scoped>
#ToolsBox {
  margin-bottom: calc(45px + var(--marginB));
  position: relative;
  padding-top: 1px;
}
.itemContainer {
  margin-top: 150px;
  padding: 0 15px;
}
.report_top_container {
  width: 100%;
  height: 180px;
  position: absolute;
  top: 0;
}
.top_container_imgBox {
  height: 100%;
}
.top_container_imgBox img {
  width: 100%;
  height: 100%;
}
.top_container_textBox {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.textBox_title {
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 3px;
}
.textBox_title2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.textBox_title3 {
  font-size: 12px;
  color: rgb(221, 221, 221);
  letter-spacing: 1px;
}
.tools_item {
  margin-bottom: 10px;
  width: 100%;
  height: 90px;
  /* background-color: var(--color); */
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.itemTip {
  width: 200px;
  font-weight: normal;
  font-size: 13px;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bgImage {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.tools_item .iconfont {
  color: #fff;
  font-size: 40px;
  margin-left: 35px;
  transition: all 0.2s linear;
}
.tools_item_name {
  position: relative;
  z-index: 6;
  color: #fff;
  letter-spacing: 2px;
  font-size: 20px;
  transition: all 0.2s linear;
  user-select: none;
  font-weight: bold;
  margin-left: 110px;
}
.left_item {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #4f5d73; */
  z-index: 5;
  transition: all 0.2s linear;
}
.clickIconClass {
  transform: scale(3);
  opacity: 0;
}
.icon-qianxi {
  font-size: 45px !important;
}
</style>