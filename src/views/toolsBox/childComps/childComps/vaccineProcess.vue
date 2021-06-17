<template>
  <div id="vaccineProcess">
    <div class="process_title_container">
      <div v-for="item,index in processTitleList" :key="index" class="title_item">
        <div class="item_title">
          {{item.name}}
        </div>
        <div :style="{backgroundColor: item.color}" class="item_line"></div>
      </div>
    </div>
    <div class="process_detail_container">
      <div v-for="item,index in processDetail" :key="index" class="detail_item">
        <div class="detail_count">{{item.count}}款</div>
        <div class="detail_content">{{item.process}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVaccineData } from "network/toolsBox";

export default {
  name: 'vaccineProcess',
  data () {
    return {
      processTitleList: [
        {name: '临床前期', color: '#dfe5ff'},
        {name: '临床I期', color: '#bbc7ff'},
        {name: '临床II期', color: '#90a4ff'},
        {name: '临床III期', color: '#6682ff'},
        {name: '上市前期', color: '#3e62ff'},
        {name: '已上市', color: '#1c45ff'},
      ],
      processDetail: []
    }
  },
  created () {
    getVaccineData('yimiao','vaccine_marketing_process_list','fa2a3b867992479b87d3f3af70706f5b', '100', 'rank', 'asc').then(res => {
      this.processDetail = res.data.data
    })
  }
}

</script>
<style scoped>
#vaccineProcess {
  width: 100%;
  margin-bottom: var(--marginB);
}
.process_title_container {
  width: 100%;
  display: flex;
}
.item_title {
  
  display: flex;
  align-items: center;
  justify-content: center;
}
.title_item {
  flex: 1;
  font-size: 11px;
}
.item_line {
  width: 100%;
  height: 2px;
  margin-top: 5px;
}
.process_detail_container {
  display: flex;
  margin-top: 5px;
}
.detail_item {
  flex: 1;
}
.detail_count {
  padding: 4px 7px;
  text-align: center;
  background-color: #eef5ff;
  color: #000;
}
.detail_content {
  margin-top: 1px;
  padding: 5px 7px;
  text-align: center; 
  background-color: #dce9ff;
  color: rgb(43, 128, 255);
}
</style>