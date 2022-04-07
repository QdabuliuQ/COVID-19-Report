<template>
  <div id="provinceDataList">
    <table class="city_table">
      <thead>
        <tr>
          <td class="head_td1 table_head_td">地区</td>
          <td class="head_td2 table_head_td">新增确诊</td>
          <td class="head_td3 table_head_td">累计治愈</td>
          <td class="head_td4 table_head_td">确诊</td>
          <td class="head_td5 table_head_td">死亡</td>
        </tr>
      </thead>
      <tbody class="province_tbody" v-for="item,index in cityDetail" :key="index">
        <tr class="borderB">
          <td class="body_td body_td_city">{{item.name}}</td>
          <td class="body_td">
            <div>{{item.total.nowConfirm}}</div>
            <div class="td_tip">{{item.today.confirm | addCount}}</div>
          </td>
          <td class="body_td">{{item.total.heal}}</td>
          <td class="body_td">{{item.total.confirm}}</td>
          <td class="body_td">{{item.total.dead}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "provinceDataList",
  data() {
    return {
      cityDetail: []
    }
  },
  mounted() {
    this.cityDetail = this.$store.state.demosticDetail.areaTree[0].children[
        this.$route.params.tableIndex
    ].children; // 保存城市信息
    console.log(this.cityDetail);
  },
}

</script>
<style scoped>
.city_table{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  position: relative;
  table-layout : auto;
}
.table_fixd_head{
  padding: 0 15px;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #f2f2f2;
}
.table_head_td{
  padding: 10px 0;
  font-size: 12px;
}
.head_td1{
  color: #000;
  background-color: rgba(146, 146, 146, 0.116);
}
.head_td2{
  color: #f74040;
  background-color: rgba(247, 64, 64, 0.116);
}
.head_td3{
  color: rgb(36, 202, 36);
  background-color: rgba(36, 202, 36, 0.116);
}
.head_td4{
  color: rgb(201, 42, 42);
  background-color: rgba(201, 42, 42, 0.116);
}
.head_td5{
  color: rgb(99, 59, 97);
  background-color: rgba(99, 59, 97, 0.116);
}
.fixd_item1{color: rgb(0, 0, 0); background-color: #f2f2f2;}
.fixd_item2{color: rgb(247, 64, 64); background-color: #fee9e9;}
.fixd_item3{color: rgb(36, 202, 36); background-color: #e5f9e5;}
.fixd_item4{color: rgb(201, 42, 42); background-color: #f9e6e6;}
.fixd_item5{color: rgb(99, 59, 97); background-color: #ede8ec;}
.fixd_item6{color: rgb(0, 0, 0); background-color: #f2f2f2;}
.body_td{
  padding: 7px 0;
  font-size: 12px;
  font-weight: 550;
  box-sizing: border-box;
}
.body_td .td_tip{
  font-size: 10px;
  color: rgb(141, 141, 141);
  font-weight: normal;
  margin-top: 3px;
}
.body_td_city{
  color: var(--color);
}
.borderB{
  border-bottom: 1px solid rgb(240, 240, 240);
}
.body_td .iconfont{
  font-size: 10.5px;
  color: rgb(143, 143, 143);
}
.province_container_td{
  font-size: 12px;
  padding: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.province_container_td span{
  word-break: break-all;
  white-space: normal;
}
.hideTr{
  display: none;
}
.showTr{
  display: table-row;
}
.cityName{
  max-width: 30px !important; 
}
</style>