<template>
  <div id="cityListSheet">
    <van-popup v-model="showSheet" position="bottom" :style="{ height: '70%' }">
      <van-cascader
        v-model="cascaderValue"
        :title="cascTitle"
        :options="options"
        active-color="#1d99d3"
        @close="showSheet = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script>
import { getCityList } from "network/toolsBox";
import "assets/css/vantCss/goOutPolicy.css";
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式

export default {
  name:'cityListSheet',
  props: {
    cascTitle: {
      type: String,
      default: "请选择城市"
    }
  },
  data () {
    return {
      showSheet: false,
      cascaderValue: "",
      options: [
        // 城市列表
      ],
    }
  },
  methods: {
    onFinish(detail) {  // 监听是否选择完成
      let result = detail.selectedOptions;
      this.$emit('selectCity', result[result.length-1].text, result[result.length-1].value)
      this.cascaderValue = "";
      this.showSheet = false
    },

    setCityList(list) {  // 设置城市数据
      if (list.length != 0) {
        let arr = [];
        for (const item of list) {
          if (item.list.length != 0) {
            arr.push({
              text: item.name,
              value: item.id,
              children: this.setCityList(item.list), // 进行递归调用
            });
          } else {
            arr.push({
              text: item.name,
              value: item.id,
            });
          }
        }
        return arr;
      } else {
        return [];
      }
    },

    showAction() {
      this.showSheet = true
    }
  },
  created () {
    getCityList().then((res) => {
      this.options = this.setCityList(res.data.result);
    });
  }
}

</script>
<style scoped>
.van-popup {
  background-color: #fff !important;
}
</style>