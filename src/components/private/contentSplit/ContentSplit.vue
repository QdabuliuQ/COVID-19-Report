<template>
  <div id="ContentSplit">
    <div class="split_text">{{text}}</div>
    <div @click="rightBtnClick" class="split_btn" v-if="btnText != ''">
      <img src="~assets/image/shareBlueIcon.svg" alt="">{{btnText}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '分割线'
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  name: 'ContentSplit',
  methods: {
    rightBtnClick() {
      this.$emit('clickEvent')
    }
  },
}

</script>
<style scoped>
#ContentSplit{
  width: 100%;
  height: 17px;
  /* background-color: #000; */
  box-sizing: border-box;
  border-left: 4px solid var(--color);
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  position: relative;
}
.split_text{
  color: var(--color);
  font-size: 13px;
  text-indent: 8px;
  display: flex;
  align-items: center;
  font-weight: 550;
  position: relative;
  top: -0.5px;
  letter-spacing: 2px;
}
.split_btn {
  border: 1px solid var(--color);
  color: var(--color);
  padding: 3px 12px 3px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 20px;
}
.split_btn:active {
  background-color: rgb(247, 247, 247);
}
.split_btn img {
  width: 15px;
  margin-right: 3px;
}
</style>