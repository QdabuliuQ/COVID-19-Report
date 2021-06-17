<template>
  <div id="vaccineTable">
    <div class="table_thead">
      <div class="thead_vaccine_name">研发厂商/疫苗名称</div>
      <div class="thead_vaccine_processes">
        <div class="process_item">临床Ⅰ期</div>
        <div class="process_item">临床Ⅱ/Ⅲ期</div>
        <div class="process_item">临床Ⅲ期</div>
        <div class="process_item">上市</div>
      </div>
    </div>
    <div :class="[index < tableLength ? 'tbody_vaccine_items_padding' : '']" v-for="item,index in vaccineInfor" :key="index" class="tbody_vaccine_items">
      <div class="all_vaccine_data_box" v-if="index < tableLength">
        <div class="tbody_vaccine_name">
          <div class="vaccine_country">
            <img :src="item.devunit_flag_new" alt="">
          </div>
          <div class="vaccine_name">{{item.devunit}}<br><div class="vaccine_name_tip">{{item.vaccine_name}}</div></div>
        </div>
        <div class="tbody_vaccine_process">
          <div :style="{background: (item.vaccine_type == 1 ? 'rgb(240, 96, 97)' : (item.vaccine_type == 2 ? 'rgb(0, 85, 238)' : (item.vaccine_type == 3) ? 'rgb(232, 184, 0)' : 'rgb(47, 192, 127)'))}" v-for="line,index2 in parseInt(item.progress)" :key="index2" class="process_line"></div>
        </div>
      </div>
    </div>
    <div @click="showMoreTable" class="show_more_table">
      <div class="more_table_btn">{{tableText}}<i class="iconfont" :class="[tableLength == 7 ? 'icon-xia' : 'icon-shang']"></i></div>
    </div>
  </div>
</template>

<script>
import {getVaccineData} from 'network/toolsBox'

export default {
  name: 'vaccineTable',
  data () {
    return {
      vaccineInfor: [],
      tableLength: 7,
      tableText: '查看更多',
      showPopover: false
    }
  },
  created () {
    getVaccineData('yimiao', 'vaccine_progress_foreign','1091e06cbb704b40963accd816770461','500','rank','asc').then(res => {
      this.vaccineInfor = res.data.data
    })
  },
  methods: {
    showMoreTable() {
      if (this.tableLength == 7) {
        this.tableLength = this.vaccineInfor.length
        this.tableText = '收起展示'
      } else {
        this.tableLength = 7
        this.tableText = '查看更多'
      }
    }
  }
}

</script>
<style scoped>
#vaccineTable {
  width: 100%;
  margin-top: 6px;
  margin-bottom: var(--marginB);
}
.table_thead {
  width: 100%;
  display: flex;
  padding: 7px 0;
  background-color: #eef5ff;
  color: var(--color)
}
.thead_vaccine_name {
  flex: 4;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thead_vaccine_processes {
  flex: 6;
  height: 30px;
  display: flex;
  align-items: center;
}
.process_item {
  text-align: center;
  flex: 1;
  padding: 0 4px;
  font-size: 11px;
}
.all_vaccine_data_box {
  width: 100%;
  display: flex;
}
.tbody_vaccine_items {
  width: 100%;
  display: flex;
  
}
.tbody_vaccine_items_padding {
  padding: 7px 0;
}
.tbody_vaccine_name {
  flex: 4;
  display: flex;
  padding-right: 8px;
}
.vaccine_country {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vaccine_country img {
  width: 100%;
  margin-right: 4px;
}
.vaccine_name {
  flex: 8;
  font-size: 11px;
}
.vaccine_name_tip {
  font-size: 8px !important;
  color: rgb(163, 163, 163);
}
.tbody_vaccine_process {
  flex: 6;
  display: flex;
  align-items: center;
}
.process_line {
  width: calc(100% / 4);
  height: 6px;
}
.process_line:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.show_more_table {
  width: 100%;
  padding: 7px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.show_more_table .iconfont {
  margin-left: 5px;
  font-size: 11px;
}
.more_table_btn {
  padding: 5px 17px;
  background-color: var(--color);
  color: #Fff;
  border-radius: 50px;
}
</style>