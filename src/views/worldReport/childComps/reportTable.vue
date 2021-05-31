<template>
  <div v-if="worldData" id="reportTable">
    <div class="table_item_color1 report_table_item">
      <div class="table_item_newData">较上日<span> {{worldData.nowConfirmAdd | setAddNum}}</span></div>
      <div class="table_item_num">{{worldData.nowConfirm}}</div>
      <div class="table_item_title">现有确诊</div>
    </div>
    <div class="table_item_color2 report_table_item">
      <div class="table_item_newData">较上日<span> {{worldData.confirmAdd | setAddNum}}</span></div>
      <div class="table_item_num">{{worldData.confirm}}</div>
      <div class="table_item_title">累计确诊</div>
    </div>
    <div class="table_item_color3 report_table_item">
      <div class="table_item_newData">较上日<span> {{worldData.healAdd | setAddNum}}</span></div>
      <div class="table_item_num">{{worldData.heal}}</div>
      <div class="table_item_title">累计治愈</div>
    </div>
    <div class="table_item_color4 report_table_item">
      <div class="table_item_newData">较上日<span> {{worldData.deadAdd | setAddNum}}</span></div>
      <div class="table_item_num">{{worldData.dead}}</div>
      <div class="table_item_title">累计死亡</div>
    </div>
  </div>
</template>

<script>
import {getWorldData} from "network/worldReport"

export default {
  name: 'reportTable',
  data () {
    return {
      worldData: null,  // 世界基本数据
    }
  },
  filters: {
    setAddNum(num) {  // 设置数据格式
      let str = num.toString()
      if (str[0] != '-') {
        return '+'+str
      }
      return str
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData() {  // 获取数据
      setTimeout(() => {
        if (JSON.stringify(this.$store.state.worldData) == "{}") {
          getWorldData().then(res => {
            this.$store.state.worldData = res.data.data
            this.worldData = this.$store.state.worldData.FAutoGlobalStatis
          })
        } else {
          this.worldData = this.$store.state.worldData.FAutoGlobalStatis
        }
        this.$EventBus.$emit('successfullySetData')
      }, 500);
    }
  }
}

</script>
<style scoped>
#reportTable{
  width: 100%;
  display: flex;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, .08);
  margin-bottom: var(--marginB);
}
.report_table_item{
  flex: 1;
  text-align: center;
  padding: 10px 0;
}
.table_item_color1{
  background-color: hsla(0, 100%, 64%, 0.11);
}
.table_item_color1 .table_item_num{
  color: #ff4747;
}
.table_item_color1 span{
  color: #ff4747;
}
.table_item_color2{
  background-color: hsla(0, 74%, 42%, 0.11);
}
.table_item_color2 .table_item_num{
  color: #b91c1c;
}
.table_item_color2 span{
  color: #b91c1c;
}
.table_item_color3{
  background-color: hsla(115, 93%, 44%, 0.11);
}
.table_item_color3 .table_item_num{
  color: #19d808;
}
.table_item_color3 span{
  color: #19d808;
}
.table_item_color4{
  background-color: hsla(0, 0%, 51%, 0.11);
}
.table_item_color4 .table_item_num{
  color: #838383;
}
.table_item_color4 span{
  color: #838383;
}
.table_item_num{
  font-size: 16px;
  margin-bottom: 2px;
}
.table_item_newData{
  font-size: 10.5px;
  margin-bottom: 3px;
}
</style>