<template>
  <div id="ContentSplit">
    <div class="split_text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '分割线'
    }
  },
  name: 'ContentSplit'
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
</style>