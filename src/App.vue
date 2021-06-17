<template>
  <div id="app">
    <!-- 对页面进行缓存处理 -->
    <div class="app_container">
      <transition>
        <keep-alive exclude="ProvinceDetail,institutionMap">
          <router-view class="router" />
        </keep-alive>
      </transition>
    </div>
    <!-- tabbar -->
    <div class="app_nav_bar">
      <div
        :class="[activeIndex == index ? 'tabbar_active' : '']"
        v-for="(item, index) in tabbarList"
        :key="index"
        @click="toggleTabbar(index)"
        class="app_nav_bar_item"
      >
        <div class="app_nav_bar_item_box">
          <div class="nav_bar_item_iconbox">
            <img v-if="activeIndex != index" :src="item.icon" alt="" />
            <img v-else :src="item.activeIcon" alt="">
          </div>
          <span class="nav_bar_item_title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tabbarList: [
        {
          title: "国内疫情",
          icon: require("assets/image/navbar/demostic.png"),
          activeIcon: require("assets/image/navbar/demosticActive.png")

        },
        { 
          title: "全球疫情", 
          icon: require("assets/image/navbar/global.png"),
          activeIcon: require("assets/image/navbar/globalActive.png")

        },
        {
          title: "疫苗接种",
          icon: require("assets/image/navbar/vaccines.png"),
          activeIcon: require("assets/image/navbar/vaccinesActive.png")
          
        },
        { 
          title: "工具箱", 
          icon: require("assets/image/navbar/tool.png"),
          activeIcon: require("assets/image/navbar/toolActive.png")

        },
      ],
      activeIndex: 0, // 导航栏索引
      transitionName: "",
    };
  },
  // 监听,当路由发生变化的时候执行
  watch:{
    $route(to,from){
      switch (to.path) {
        case '/DomesticReport':
          this.activeIndex = 0
          break;
        case '/WorldReport':
          this.activeIndex = 1
          break;
        case '/VaccineInformation':
          this.activeIndex = 2
          break;
        case '/ToolsBox':
          this.activeIndex = 3
          break;
        default:
          break;
      }
    }
  },
  methods: {
    toggleTabbar(index) {
      this.activeIndex = index;
      switch (index) {
        case 0:
          this.$router.push('/DomesticReport')
          break;
        case 1:
          this.$router.push('/WorldReport')
          break;
        case 2:
          this.$router.push('/VaccineInformation')
          break;
        case 3:
          this.$router.push('/ToolsBox')
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    this.$store.state.nav_bar_clientHeight = document.getElementsByClassName('app_nav_bar')[0].clientHeight
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    })
  }
};
</script>

<style>
#app {
  width: 100%;
  position: relative;
  z-index: 0;
  background-color: #fff;
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
.app_container {
  position: relative;
}
.app_nav_bar_item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.app_nav_bar_item .nav_bar_item_iconbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
}
.app_nav_bar_item_box .nav_bar_item_title {
  font-size: 10.5px;
}
.nav_bar_item_iconbox img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  width: 21px;
  height: 21px;
}
.tabbar_active {
  color: var(--color);
}
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>
