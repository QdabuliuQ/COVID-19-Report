<template>
  <div id="ToolsBox">
    <div class="tools_item" @click="routerClick(index)" v-for="item,index in toolList" :key="item.name">
      <div :ref="'toolsItem'+index" :class="[index%2==0?'even_item':'odd_item']" class="left_item">
        <i :ref="'icon'+index" class="iconfont" :class="item.icon"></i>
      </div>
      <div :ref="'title'+index" class="tools_item_name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolsBox',
  data () {
    return {
      toolList: [
        {name: '国内疫情速报', icon: 'icon-subao'},
        {name: '谣言排行榜', icon: 'icon-yaoyan'},
        {name: '出行政策查询', icon: 'icon-zengce'},
        {name: '患者同行查询', icon: 'icon-chuxing'},
        {name: '核酸检测机构', icon: 'icon-jigou'},
        {name: '疫情风险等级', icon: 'icon-fengxian'},
      ]
    }
  },
  methods: {
    setRouter(path) {
      setTimeout(() => {
        this.$router.push(path)
      }, 300);
    },

    routerClick(index) {
      this.$refs['icon'+index][0].classList.add('clickIconClass')
      this.$refs['title'+index][0].classList.add('clickTextClass')
      document.getElementsByClassName('left_item')[index].classList.add('clickClipClass')
      switch (index) {
        case 0:
          this.setRouter('/NationalNews')
          break;
        case 1:
          this.setRouter('/RumourRanking')
          break;
        case 2:
          this.setRouter('/GoOutPolicy')
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.$refs['toolsItem'+index][0].classList.remove('clickClipClass')
        this.$refs['icon'+index][0].classList.remove('clickIconClass')
        this.$refs['title'+index][0].classList.remove('clickTextClass')
      }, 1000);
    }
  },
}

</script>
<style scoped>
#ToolsBox{
  margin-bottom:  calc(45px + var(--marginB));
  margin-top: 20px;
  padding: 0 15px;
}
.tools_item{
  margin-bottom: var(--marginB);
  width: 100%;
  height: 80px;
  background-color: var(--color);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tools_item .iconfont{
  color: #Fff;
  font-size: 40px;
  margin-left: 35px;
  transition: all 0.2s linear;
}
.tools_item_name{
  position: relative;
  z-index: 6;
  color: #fff;
  letter-spacing: 2px;
  font-size: 20px;
  margin-left: 100px;
  transition: all 0.2s linear;
  user-select:none;
}
.left_item{
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4f5d73;
  z-index: 5;
  transition: all 0.2s linear;
}
.odd_item{
  clip-path: polygon(0% 0%, 31% 0, 34% 50%, 31% 100%, 0% 100%);
}
.even_item{
  clip-path: polygon(0% 0%, 34% 0, 31% 50%, 34% 100%, 0% 100%);
}
.clickTextClass {
  margin-left: 0;
  font-size: 24px;
  font-weight: 540;
}
.clickIconClass {
  transform: scale(3);
  opacity: 0;
}
.clickClipClass {
  clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
}
</style>