<template>
  <div id="reportTable">
    <div v-if="demosticList" class="report_basis_table">
      <div class="basis_table_top">
        <div class="confirmColor marginL basis_table_item">
          <div class="table_item_title">现存确诊</div>
          <div class="table_item_num">
            {{ demosticList.chinaTotal.nowConfirm }}
          </div>
          <div class="table_item_add">
            {{ demosticList.chinaAdd.nowConfirm | addCount }}
          </div>
        </div>
        <div class="fectColor marginL basis_table_item">
          <div class="table_item_title">现存无症状</div>
          <div class="table_item_num">
            {{ demosticList.chinaTotal.noInfect }}
          </div>
          <div class="table_item_add">
            {{ demosticList.chinaAdd.noInfect | addCount }}
          </div>
        </div>
        <div class="suspectColor marginL basis_table_item">
          <div class="table_item_title">现存疑似</div>
          <div class="table_item_num">
            {{ demosticList.chinaTotal.suspect }}
          </div>
          <div class="table_item_add">
            {{ demosticList.chinaAdd.suspect | addCount }}
          </div>
        </div>
        <div class="SevereColor basis_table_item">
          <div class="table_item_title">现存确诊重症</div>
          <div class="table_item_num">
            {{ demosticList.chinaTotal.nowSevere }}
          </div>
          <div class="table_item_add">
            {{ demosticList.chinaAdd.nowSevere | addCount }}
          </div>
        </div>
      </div>
      <div class="marginT basis_table_bottom">
        <div class="confirmSumColor marginL basis_table_item">
          <div class="table_item_title">累计确诊</div>
          <div class="table_item_num">{{demosticList.chinaTotal.confirm}}</div>
          <div class="table_item_add">{{ demosticList.chinaAdd.confirm | addCount }}</div>
        </div>
        <div class="healSumColor marginL basis_table_item">
          <div class="table_item_title">累计治愈</div>
          <div class="table_item_num">{{demosticList.chinaTotal.heal}}</div>
          <div class="table_item_add">{{ demosticList.chinaAdd.heal | addCount }}</div>
        </div>
        <div class="dealSumColor marginL basis_table_item">
          <div class="table_item_title">累计死亡</div>
          <div class="table_item_num">{{demosticList.chinaTotal.dead}}</div>
          <div class="table_item_add">{{ demosticList.chinaAdd.dead | addCount }}</div>
        </div>
        <div class="importedCaseSumColor basis_table_item">
          <div class="table_item_title">累计境外输入</div>
          <div class="table_item_num">{{demosticList.chinaTotal.importedCase}}</div>
          <div class="table_item_add">{{ demosticList.chinaAdd.importedCase | addCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "reportTable",
  data () {
    return {
      demosticList: null,  // 国内数据  
    }
  },
  methods: {
    DemosticDetail() {
      if (this.$store.state.demosticDetail) {  // 判断本地是否储存了数据
        this.demosticList = this.$store.state.demosticDetail  
      }
    }
  },
  mounted () {
    this.DemosticDetail()
  },
};
</script>
<style scoped>
.marginL {
  margin-right: 1px;
}
.marginT {
  margin-top: 1px;
}
.report_basis_table {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, .08);
}
.basis_table_top {
  display: flex;
  justify-content: space-around;
}
.basis_table_bottom {
  display: flex;
  justify-content: space-around;
}
.basis_table_item {
  flex: 1;
  /* margin: 0 0.5px 1px; */
  padding: 10px 4px;
}
.table_item_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: 0.5px;
  margin-bottom: 0.5px;
}
.table_item_num {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 0.5px;
}
.table_item_add {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  color: #777777;
}
.confirmColor{
  background-color: hsla(0, 100%, 64%, 0.11);
}
.confirmColor .table_item_num{
  color: #ff4747;
}
.fectColor{
  background-color: hsla(32, 100%, 65%, 0.11);
}
.fectColor .table_item_num{
  color: #ffac4e;
}
.suspectColor{
  background-color: hsla(281, 100%, 73%, 0.11);
}
.suspectColor .table_item_num{
  color: rgb(211, 116, 255);
}
.SevereColor {
  background-color: hsla(295, 92%, 35%, 0.11);
}
.SevereColor .table_item_num{
  color: #9c07aa;
}
.confirmSumColor {
  background-color: hsla(0, 74%, 42%, 0.11);
}
.confirmSumColor .table_item_num{
  color: #b91c1c;
}
.healSumColor {
  background-color: hsla(115, 93%, 44%, 0.11);
}
.healSumColor .table_item_num{
  color: #19d808;
}
.dealSumColor {
  background-color: hsla(0, 0%, 51%, 0.11);
}
.dealSumColor .table_item_num{
  color: #838383;
}
.importedCaseSumColor {
  background-color: hsla(29, 100%, 53%, 0.11);
}
.importedCaseSumColor .table_item_num{
  color: #ff8411;
}
</style>