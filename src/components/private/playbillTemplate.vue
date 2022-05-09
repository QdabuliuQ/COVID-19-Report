<template>
  <div id="playbillTemplate">
    <div class="playbillTemplate">
      <div ref="playbillContainer" class="playbillContainer">
        <img class="bgImage" src="~assets/image/playbillImage.png" alt="" />
        <div class="playbillContent">
          <slot name="topSlot"></slot>
          <div :style="{height: height, margin: margin}" class="chartContent">
            <slot name="centerSlot"></slot>
          </div>
          <div class="bottomTip">
            <div class="leftImage">
              <img src="~assets/image/playbillElement2.png" alt="" />
            </div>
            <div class="rightTip">
              <i
                >温馨提示：做好自我防护是关爱他人，遵守文明行为就是奉献社会。</i
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '420px'
    },
    margin: {
      type: String,
      default: '24vh auto 0;'
    }
  },
  name: 'playbillTemplate'

}

</script>
<style scoped>
#playbillTemplate {
  /* width: 100vw;
  height: 100vh; */
  width: 375px;
  height: 667px;
  position: absolute;
  z-index: -1;
  top: -9999px;
  overflow: hidden;
}
.playbillTemplate {
  width: 100%;
  height: 100%;
}
.playbillContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.playbillContainer .bgImage {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
.playbillContent {
  position: absolute;
  z-index: 5;
  top: 0;
  text-align: center;
  width: 100%;
}
.chartContent {
  width: 91vw;
  background-color: #fff;
  border-radius: 8px;
}
.bottomTip {
  width: 91vw;
  display: flex;
  align-items: center;
  margin: 10px auto;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
.leftImage {
  flex: 2;
}
.leftImage img {
  width: 50%;
}
.rightTip {
  flex: 8;
  text-align: left;
}
</style>