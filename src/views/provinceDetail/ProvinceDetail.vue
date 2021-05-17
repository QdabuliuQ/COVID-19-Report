<template>
  <div id="ProvinceDetail">
    <transition name="van-fade">
      <van-nav-bar
        class="van-nav-bar"
        v-show="showNavBar"
        ref="nav_bar"
        :title="navTitle + '疫情资讯'"
        left-arrow
        :fixed='true'
        @click-left="onClickLeft"
      />
    </transition>
    <div class="province_container">
      <div class="province_top_bgImg">
        <div class="top_back_btn">
          <van-icon @click="onClickLeft" size='46px' color="#fff" name="arrow-left" />
        </div>
        <div class="top_bgImg">
          <img src="https://mat1.gtimg.com/news/feiyanarea/area_head_bg.png" alt="">
        </div>
        <div class="top_bgImg_text">
          <div class="top_bgImg_title">新型冠状病毒肺炎</div>
          <div class="top_bgImg_secondTitle"><span>{{this.navTitle}}</span>实时疫情资讯</div>
          <div class="top_bgImg_tip">数据来源：国家及各地卫健委每日信息发布</div>
        </div>
      </div>
      <div ref="provinceTable" class="province_detail_container">
        <province-table></province-table>
      </div>
    </div>
  </div>
</template>

<script>
import 'assets/css/vantCss/provinceDetail.css'  // 引入css文件
import provinceTable from './childComps/provinceTable'  // 导入表格组件
export default {
  name: 'ProvinceDetail',
  data () {
    return {
      navTitle: '',
      cityIndex: 0,
      showNavBar: false,  // 显示/隐藏顶部导航栏
    }
  },
  methods: {
    onClickLeft() {  // 返回上一层
      this.$router.go(-1)
    },
    listenScroll(){
      if (window.pageYOffset > this.tableToTop && window.pageYOffset < this.tableToTop + 100) {
        this.showNavBar = true
      } else if (window.pageYOffset < this.tableToTop && window.pageYOffset > this.tableToTop - 100) {
        this.showNavBar = false
      }
    }
  },
  created () {
    this.navTitle = this.$route.params.cityName  // 保存城市名称
    this.cityIndex = this.$route.params.tableIndex
    if (this.$store.state.demosticDetail) {
      console.log(this.$store.state.demosticDetail);
    }
  },
  mounted () {
    setTimeout(() => {
      this.tableToTop = this.$refs.provinceTable.getBoundingClientRect().top
      window.addEventListener('scroll', this.listenScroll)
    }, 1000);
  },
  destroyed () {
    window.removeEventListener('scroll', this.listenScroll)  // 删除事件
  },
  components: {
    provinceTable
  }
}

</script>
<style scoped>
#ProvinceDetail{
  min-width: 100vw;
  min-height: 200vh;
  background-color: #FFF;
  position: relative;
  z-index: 11;
}
.van-nav-bar{
  z-index: 12;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
}
.province_top_bgImg{
  width: 100%;
  position: relative;
}
.top_bgImg{
  width: 100%;
}
.top_bgImg_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.top_back_btn{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 17px;
  display: flex;
  align-items: center;
}
.top_bgImg img{
  width: 100%;
}
.top_bgImg_title{
  color: #fff;
  font-size: 21px;
  font-weight: 550;
  letter-spacing: 2px;
  margin-bottom: 4px;
  text-align: center;
}
.top_bgImg_secondTitle {
  width: 100%;
  font-size: 20px;
  color: #Fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  letter-spacing: 1px;
}
.top_bgImg_secondTitle span{
  padding: 3px 6px;
  border-radius: 5px;
  font-weight: 550;
  background-color: #Fff;
  color: rgb(52, 79, 236);
  font-size: 13.5px;
  margin-right: 5px;
  position: relative;
  top: 1px;
}
.top_bgImg_tip{
  font-size: 11.5px;
  color: rgb(209, 209, 209);
  white-space:nowrap;
  letter-spacing: 1px;
}
.province_detail_container{
  margin-top: -25px;
  padding: 0 15px;
  position: relative;
  z-index: 3;
}
</style>