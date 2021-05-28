<template>
  <div class="swipeButton">
    <div :class="[activeIndex == index ? 'activeCharts': '']" @click="toggle_indicators(index)" class="indicators_item" v-for="item,index in btnList" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnList: {
      type: Array,
      default: () => []
    }
  },
  name: 'swipeButton',
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    toggle_indicators(index) {  // 处理函数
      this.activeIndex = index
      this.$emit('toggleSwipe', this.activeIndex)  // 发送事件
    },

    setIndex(index) {
      this.activeIndex = index
    }
  }
}

</script>
<style scoped>
.swipeButton{
  width: 100%;
  display: flex;
  margin-top: 4px;
}
.indicators_item{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
  margin: 0 5px;
  transition: all 0.15s linear;
  padding: 10px 0;
  box-sizing: border-box;
}
.activeCharts{
  background-color: #21aff136;
  color: #21aff1;
  border: 1px solid #21aff1;
  /* background-color: #000000b2; */
}
</style>