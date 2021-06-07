<template>
  <div v-if="vaccineData != null" id="VaccineTable">
    <div class="table_top">
      <div class="marLeft marBottom table_item_color1 table_item">
        <div class="table_item_title">中国每百人接种</div>
        <div class="count_box table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['中国'].total_vaccinations_per_hundred}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
      <div class="marLeft marBottom table_item_color2 table_item">
        <div class="table_item_title">中国较上日新增</div>
        <div class="table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['中国'].new_vaccinations | setUnit}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
      <div class="marBottom table_item_color3 table_item">
        <div class="table_item_title">中国累计接种</div>
        <div class="table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['中国'].total_vaccinations | setUnit}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
    </div>
    <div class="table_bottom">
      <div class="marLeft table_item_color1 table_item">
        <div class="table_item_title">全球每百人接种</div>
        <div class="count_box table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['全球'].total_vaccinations_per_hundred}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
      <div class="marLeft table_item_color2 table_item">
        <div class="table_item_title">全球较上日新增</div>
        <div class="table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['全球'].new_vaccinations | setUnit}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
      <div class="table_item_color3 table_item">
        <div class="table_item_title">全球累计接种</div>
        <div class="table_item_count">
          <span class="table_item_count_span">
            {{vaccineData['全球'].total_vaccinations | setUnit}}
          </span>
          <span class="table_item_count_text">剂</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getWorldVaccineData} from 'network/vaccineInformation'
import {addChineseUnit} from 'static/js/setUnit'

export default {
  name: 'VaccineTable',
  data () {
    return {
      vaccineData: null  
    }
  },
  created () {
    getWorldVaccineData().then(res => {
      this.vaccineData = res.data.data.VaccineTopData
    })
  }
}

</script>
<style scoped>
#VaccineTable{
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, .08);
  margin-bottom: var(--marginB);
}
.table_top{
  width: 100%;
  display: flex;
}
.table_bottom{
  width: 100%;
  display: flex;
}
.table_item{
  flex: 1;
  padding: 10px 0;
  text-align: center;
}
.table_item_title{
  margin-bottom:3px;
  font-size: 11px;
  color: rgba(3, 3, 3, 0.795);
}
.table_item_count_span{
  font-size: 17px;
  font-weight: 550;
}
.table_item_count_text{
  font-size: 12px;
  margin-left: -3px;
}
.count_box{
  margin-top: 5.5px;
}
.table_item_color1{
  background-color: hsla(125, 80%, 52%, 0.116);
}
.table_item_color2{
  background-color: hsla(39, 100%, 49%, 0.116);
}
.table_item_color3{
  background-color: hsla(214, 100%, 55%, 0.096);
}
.table_item_color1 .table_item_count{
  color: hsla(125, 74%, 33%, 0.904);
}
.table_item_color2 .table_item_count{
  color: hsla(39, 100%, 49%, 0.89);
}
.table_item_color3 .table_item_count{
  color: hsla(214, 100%, 55%, 0.959);
}
.marLeft{
  margin-left: 1px !important;
}
.marBottom{
  margin-bottom: 1px;
}

</style>