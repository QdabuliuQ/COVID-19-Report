<template>
  <div id="provinceTable">
    <div class="table_item_box item_color1 boxMargin">
      <div class="table_item_tip">{{provinceBasicData.confirm_add | addCount}}</div>
      <div class="table_item_count">{{provinceBasicData.confirm}}</div>
      <div class="table_item_title">累计确诊</div>
    </div>
    <div class="table_item_box item_color2 boxMargin">
      <div class="table_item_tip">比例: {{provinceBasicData.healRate}}%</div>
      <div class="table_item_count">{{provinceBasicData.heal}}</div>
      <div class="table_item_title">累计治愈</div>
    </div>
    <div class="table_item_box item_color3 boxMargin">
      <div class="table_item_tip">{{provinceBasicData.confirm_add | addCount}}</div>
      <div class="table_item_count">{{provinceBasicData.nowConfirm}}</div>
      <div class="table_item_title">现存确诊</div>
    </div>
    <div class="table_item_box item_color4">
      <div class="table_item_tip">{{provinceBasicData.wzz_add | addCount}}</div>
      <div class="table_item_count">{{provinceBasicData.wzz}}</div>
      <div class="table_item_title">当地无症状</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'provinceTable',
  data () {
    return {
      provinceBasicData: {

      }
    }
  },
  created () {
    // if (sessionStorage.getItem('state')) {
      console.log(this.$store.state.demosticDetail);
      // this.$store.state = JSON.parse(sessionStorage.getItem('state')).demosticDetail
      // // console.log(JSON.parse(sessionStorage.getItem('state')));
      if (this.$store.state.demosticDetail) {
        let data = this.$store.state.demosticDetail.areaTree[0].children[this.$route.params.tableIndex]
        console.log(data);
        this.provinceBasicData.confirm = data.total.confirm  // 累计确诊
        this.provinceBasicData.heal = data.total.heal  // 累计治愈
        this.provinceBasicData.healRate = data.total.healRate  // 治愈比例
        this.provinceBasicData.dead = data.total.dead  // 累计死亡
        this.provinceBasicData.deadRate = data.total.deadRate  // 死亡比例
        this.provinceBasicData.nowConfirm = data.total.nowConfirm  // 现存确诊
        this.provinceBasicData.wzz = data.total.wzz  // 累计无症状
        this.provinceBasicData.confirm_add = data.today.confirm  // 新增确诊
        this.provinceBasicData.wzz_add = data.today.wzz_add  // 新增无症状
      }
    // }
  }
}

</script>
<style scoped>
#provinceTable{
  width: 100%;
  display: flex;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
}
.table_item_box{
  flex: 1;
  text-align: center;
  padding: 10px 0;
}
.boxMargin{
  margin-left: 1px;
}
.table_item_tip{
  margin-bottom: 2px;
  font-size: 10px;
  color: #424242;
}
.table_item_count{
  font-size: 18px;
  margin-bottom: 1.5px;
}
.table_item_title{
  font-size: 11.5px;
}
.item_color1{
  background-color: hsla(0, 74%, 42%, 0.11);
}
.item_color1 .table_item_count{
  color: #b91c1c;
}

.item_color2{
  background-color: hsla(115, 93%, 44%, 0.11);
}
.item_color2 .table_item_count{
  color: #19d808;
}

.item_color3{
  background-color: hsla(0, 100%, 64%, 0.11);
}
.item_color3 .table_item_count{
  color: #ff4747;
}

.item_color4{
  background-color: hsla(29, 100%, 53%, 0.11);
}
.item_color4 .table_item_count{
  color: #ff8411;
}
</style>