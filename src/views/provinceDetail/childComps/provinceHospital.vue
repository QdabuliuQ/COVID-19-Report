<template>
  <div v-if="dataLength > 0" id="provinceHospital">
    <content-split
      :text="$route.params.cityName + '医疗救助医院'"
    ></content-split>
    <van-swipe :show-indicators='false' class="hospitalSwipe" :loop='false' indicator-color="white">
      <van-swipe-item class="swipe_item" v-for="item,index in Math.ceil(this.dataLength / 8)" :key="index">
        <div class="hospitalItem_container">
          <div class="hospitalItem" v-for="item,index2 in hospitalData[index]" :key="index2">
            <div class="hospitalItem_box">
              <div class="item_cityName">{{item.cityName}}</div>
              <div class="item_hospCount">{{item.count}}家</div>
              <div v-if="item.link" class="item_url">
                <a :href="item.link.url">查看<i class="iconfont icon-gengduo"></i></a>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {getCityHospital} from 'network/provinceDetail'

export default {
  name: 'provinceHospital',
  data () {
    return {
      hospitalData: [],
      swipeItemCount: 1,
      dataLength: 0
    }
  },
  methods: {
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    }
  },
  created () {
    getCityHospital(this.$route.params.cityName).then(res => {
      this.dataLength = res.data.args.rsp.info.citys.length
      if (this.dataLength <= 8) {
        this.hospitalData = [res.data.args.rsp.info.citys]
      } else if (this.dataLength > 8) {
        this.hospitalData = this.group(res.data.args.rsp.info.citys, 8)
      } else {
        this.hospitalData = []
      }
      this.swipeItemCount = Math.ceil(this.hospitalData.length / 8)
    })
  }
}

</script>
<style scoped>
#provinceHospital{
  margin-bottom: var(--marginB);
}
.van-swipe {
  padding: 6px 0;
}
.hospitalSwipe{
  width: 100%;
}
.hospitalItem_container{
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw - 15px - 15px);
  height: 155px;
}
.hospitalItem{
  margin: 0.75%;
  width: 23.5%;
  height: 48%;
  background-color: var(--color);
  border-radius: 5px;
  color: #Fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item_cityName{
  font-size: 14px;
  font-weight: 550;
  margin-bottom: 2px;
  letter-spacing: 2px;
}
.item_hospCount{
  font-size: 12px;
  margin-bottom: 3px;
  letter-spacing: 0.5px;
}
.item_url a{
  font-size: 11px;
  color: #fff;
  display: flex;
  align-items: center;
}
.item_url .iconfont{
  font-size: 12px;
  color: #fff;
  margin-left: 3px;
  transform: scale(0.7);
  position: relative;
  top: 1px;
}
</style>