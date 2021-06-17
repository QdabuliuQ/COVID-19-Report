<template>
  <div id="countriesTable">
    <table class="table_list">
      <thead>
        <tr class="table_list_tr">
          <td class="table_thead_td thead_td_item1 thead_td_color1">地区</td>
          <td class="table_thead_td thead_td_item2 thead_td_color2">
            现存确诊
          </td>
          <td class="table_thead_td thead_td_item2 thead_td_color3">
            累计确诊
          </td>
          <td class="table_thead_td thead_td_item2 thead_td_color4">
            累计治愈
          </td>
          <td class="table_thead_td thead_td_item2 thead_td_color5">
            累计死亡
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table_list_tr country_tr"
          v-for="item in countryData"
          :key="item.name"
        >
          <td>
            <div class="td_item_name">{{ item.name }}</div>
          </td>
          <td>
            <div class="td_item_count">{{ item.nowConfirm | setUnit(2) }}</div>
            <div class="td_item_newAdd">
              {{ item.nowConfirmCompare | setData }}
            </div>
          </td>
          <td>
            <div class="td_item_count">{{ item.confirm | setUnit(2) }}</div>
            <div class="td_item_newAdd">{{ item.confirmAdd | setData }}</div>
          </td>
          <td>
            <div class="td_item_count">{{ item.heal | setUnit(2) }}</div>
            <div class="td_item_newAdd">{{ item.healCompare | setData }}</div>
          </td>
          <td>
            <div class="td_item_count">{{ item.dead | setUnit(2) }}</div>
            <div class="td_item_newAdd">{{ item.deadCompare | setData }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="showThead" class="sticky_container">
      <div class="sticky_thead">
        <div class="sticky_thead_item thead_item1 thead_td_color1">地区</div>
        <div class="sticky_thead_item thead_item2 thead_td_color2">现存确诊</div>
        <div class="sticky_thead_item thead_item3 thead_td_color3">累计确诊</div>
        <div class="sticky_thead_item thead_item4 thead_td_color4">累计治愈</div>
        <div class="sticky_thead_item thead_item5 thead_td_color5">累计死亡</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCountryData } from "network/worldReport";

export default {
  name: "countriesTable",
  data() {
    return {
      countryData: [],
      showThead: false
    };
  },
  filters: {
    setData(val) {
      if (val == 0) {
        return "无新增";
      } else if (val[0] != "-") {
        return "+" + val;
      } else {
        return val;
      }
    },
  },
  created() {
    getAllCountryData().then((res) => {
      this.countryData = res.data.data;
    });
  },
  mounted() {
    let thead_height =
      document.getElementsByClassName("table_list_tr")[0].clientHeight;
    let sticky_thead = document.getElementsByClassName("sticky_thead")[0];
    sticky_thead.style.height = thead_height + "px";
    let item_thead = document.getElementsByClassName("table_thead_td");
    let item_sticky_thead = document.getElementsByClassName("sticky_thead_item");
    for (let i = 0; i < item_thead.length; i++) {
      item_sticky_thead[i].style.width = item_thead[i].getBoundingClientRect().width + "px";
    }
    this.tableToTop = document.getElementsByClassName('table_list')[0].getBoundingClientRect().top
  },
  methods: {
    listenScroll() {
      if (window.pageYOffset >= this.tableToTop && window.pageYOffset <= this.tableToTop + 100) {
        this.showThead = true
      } else if(window.pageYOffset < this.tableToTop){
        this.showThead = false
      }
    }
  },
  activated () {
    this.$nextTick(() => {
      document.addEventListener('scroll', this.listenScroll)
    })
  },
  deactivated () {
    document.removeEventListener('scroll', this.listenScroll)
  }
};
</script>
<style scoped>
.table_list {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  position: relative;
  table-layout: auto;
}
.table_list_tr {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(236, 236, 236);
}
.table_list_tr td {
  padding: 7px 0;
}
.table_list_tr td .iconfont {
  font-size: 11px;
}
.thead_td_item1 {
  width: 15% !important;
  word-wrap: break-word;
  word-break: break-all;
}
.td_item_newAdd {
  font-size: 8.5px;
  margin-top: 3px;
  color: #727272;
}
.td_item_count {
  font-size: 11.5px;
}
.thead_td_item2 {
  padding: 7px 3px !important;
}
.thead_td_item3 {
  width: 10%;
}
.table_thead_td {
  padding: 7px 0 !important;
  font-size: 12px;
}
.thead_td_color1 {
  background-color: rgba(236, 236, 236, 0.486);
}
.thead_td_color2 {
  background-color: rgba(255, 228, 188, 0.486);
  color: rgb(248, 185, 91);
}
.thead_td_color3 {
  background-color: rgba(255, 153, 153, 0.486);
  color: rgb(255, 110, 110);
}
.thead_td_color4 {
  background-color: rgba(154, 255, 154, 0.486);
  color: rgb(67, 221, 67);
}
.thead_td_color5 {
  background-color: rgba(148, 148, 148, 0.486);
  color: rgb(100, 100, 100);
}
.td_item_name {
  font-weight: 550;
  font-size: 12px;
}
.country_tr:nth-of-type(even) {
  background-color: #9696960c;
}
.sticky_container {
  position: fixed;
  top: 0;
  background-color: #f6f6f6 !important
}
.sticky_thead_item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  float: left;
  font-size: 12px;
}
.thead_item1{background-color: #f6f6f6 !important; }
.thead_item2{background-color: #fff2de !important; }
.thead_item3{background-color: #ffcdcd !important; }
.thead_item4{background-color: #ceffce !important; }
.thead_item5{background-color: #cbcbcb !important; }
</style>