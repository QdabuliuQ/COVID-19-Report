<template>
  <div id="vaccineCountries">
    <div class="vaccine_thead">
      <div class="country_name">国家</div>
      <div class="country_information">当前疫苗情况</div>
    </div>
    <div v-for="item,index in vaccine_countries" :key="index" class="vaccine_tbody">
      <div class="country_name">
        <div class="name_container">
          <img :src="item.flag" alt=""><br><div>{{item.country}}</div>
        </div>
      </div>
      <div v-html="setEnter(item.content)" class="country_information">
      </div>
    </div>
  </div>
</template>

<script>
import { getVaccineData } from "network/toolsBox";

export default {
  name:'vaccineCountries',
  data () {
    return {
      vaccine_countries: []
    }
  },
  methods: {
    setEnter(val) {
      return val.replaceAll('\\n', '<br>')
    }
  },
  created () {
    getVaccineData('yimiao', 'vaccination_done','42b3b7ffcac0460ca0e239214b3ddcaa', '', 'rank', 'asc').then(res => {
      this.vaccine_countries = res.data.data
    })
  }
}

</script>
<style scoped>
#vaccineCountries {
  width: 100%;
  margin-bottom: var(--marginB);
}
.vaccine_thead {
  display: flex;
  padding: 8px 0;
  background-color: #eef5ff;
  color: var(--color);
}
.country_name {
  flex: 2.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.country_name img {
  width: 17px;
  height: 15px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
}
.name_container {
  text-align: center;
}
.country_information {
  flex: 7.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  text-align: left;
}
.vaccine_tbody {
  padding: 5px 0;
  display: flex;
}
.vaccine_tbody:nth-child(odd) {
  background-color: #eef5ff;
}
</style>