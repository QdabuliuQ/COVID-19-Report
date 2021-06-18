<template>
  <div id="vaccineBasic">
    <div class="detail_vaccine_basic">
      <div
        class="detail_vaccine_basic_item"
        v-for="(item, index) in vaccineBasicData"
        :key="index"
      >
        <div @click="showItemPopover(index)" class="detail_item_box">
          <div
            :style="{ backgroundColor: item.title_color }"
            class="item_box_color"
          ></div>
          <div class="item_box_title">{{ item.title }}</div>
        </div>
      </div>
      <div @click="showBasicDataPopup = true" class="detail_item_content">
        <i class="iconfont icon-gengduoshuju"></i>
      </div>
    </div>
    <!-- 疫苗内容信息 -->
    <van-popup class="basicPopuo" v-model="showBasicDataPopup" closeable>
      <div class="vaccine_data_box">
        <div class="data_box_scroll">
          <div
            class="vaccine_data_item"
            v-for="(item, index) in vaccineBasicData"
            :key="index"
          >
            <div class="data_item_topBox">
              <div
                :style="{ backgroundColor: item.title_color }"
                class="data_item_rect"
              ></div>
              <div :style="{ color: item.title_color }" class="data_item_title">
                {{ item.title }}
              </div>
            </div>
            <div class="data_item_content">
              {{ item.content }}
            </div>
            <p v-html="setEnter(item.sub_content)" class="data_item_sub_content">
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getVaccineData } from "network/toolsBox";
import "assets/css/vantCss/vaccineDetail.css";

export default {
  name: "vaccineBasic",
  data () {
    return {
      vaccineBasicData: [], // 疫苗基本信息
      showBasicDataPopup: false,
    }
  },
  methods: {
    setEnter(val) {
      return val.replaceAll('\\n', '<br>')
    }
  },
  created () {
    getVaccineData(
      "yimiao",
      "cover_vaccine_type",
      "b97311c844f341ffbd1d88769b36cdbc",
      '',
      "rank",
      "asc"
    ).then((res) => {
      this.vaccineBasicData = res.data.data;
    });
  }
};
</script>
<style scoped>
.detail_vaccine_basic {
  width: 100%;
  display: flex;
}
.detail_vaccine_basic_item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail_item_box {
  display: flex;
  align-items: center;
  margin-right: 8px;
}
.item_box_title {
  position: relative;
  top: -0.5px;
  color: rgb(90, 90, 90);
  font-size: 11px;
}
.item_box_color {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  margin-right: 4px;
}
.detail_item_content .iconfont {
  color: var(--color);
  font-size: 16px;
}
.vaccine_data_box {
  margin: 30px 0;
  padding: 15px;
  position: relative;
}
.data_item_topBox {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.data_item_rect {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  margin-right: 5px;
}
.data_item_title {
  font-size: 13px;
}
.data_item_content {
  line-height: 22px;
  margin-bottom: 4px;
}
.data_item_sub_content {
  white-space: pre-line;
  font-size: 12px;
  color: rgb(99, 98, 98);
  line-height: 20px;
}
.data_box_scroll {
  max-height: 350px;
  overflow:scroll;
}
.data_box_scroll::-webkit-scrollbar {display: none;}
.vaccine_data_item {
  margin-bottom: 7px;
}
</style>