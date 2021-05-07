<template>
  <div id="app">
    <!-- 对页面进行缓存处理 -->
    <div class="app_container">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <!-- tabbar -->
    <div class="app_nav_bar">
      <div :class="[activeIndex == index ? 'tabbar_active' : '']" v-for="item,index in tabbarList" :key="index" @click="toggleTabbar(index)" class="app_nav_bar_item">
        <div class="app_nav_bar_item_box">
          <div class="nav_bar_item_iconbox">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span class="nav_bar_item_title">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tabbarList: [
        {title: '国内疫情', icon: 'icon-guonei'},
        {title: '全球疫情', icon: 'icon-quanqiu'},
        {title: '疫苗接种', icon: 'icon-yimiao'},
        {title: '工具箱', icon: 'icon-gongjuxiang'},
      ],
      activeIndex: 0
    }
  },
  methods: {
    toggleTabbar(index) {
      this.activeIndex = index
    } 
  }
}
</script>

<style>
#app {
  width: 100%;
  position: relative;
  z-index: 0;
}
.app_nav_bar {
  width: 100%;
  height: 49px;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
}
.app_container{
  position: relative;
  z-index: 0;
  margin-bottom: calc(45px + var(--marginB));
}
.app_nav_bar_item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around
}
.app_nav_bar_item .nav_bar_item_iconbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
}
.app_nav_bar_item_box .nav_bar_item_title{
  font-size: 11px;
}
.nav_bar_item_iconbox .iconfont{
  font-size: 23px;
}
.tabbar_active{
  color: var(--color);
}
</style>
