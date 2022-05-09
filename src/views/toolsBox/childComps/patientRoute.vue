<template>
  <div id="patientRoute">
    <van-nav-bar
      class="van-nav-bar"
      ref="nav_bar"
      :title="'患者行程轨迹'"
      left-arrow
      :z-index='999'
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div :style="{ marginTop: mTop }" class="bgImage_box">
      <img class="bgImg" src="~assets/image/toolBgImage.jpg" alt="" />
      <img
        class="leftImg"
        src="~assets/image/searchInstitution/patientsRoute.png"
        alt=""
      />
      <div class="detail_topBox">
        <div class="detail_topBox_title">患者行程轨迹统计</div>
        <div class="detail_topBox_tip">
          如果发现与患者有同行轨迹请马上向有关部门报告。疫情防控，人人有责。
        </div>
      </div>
    </div>
    <div class="patientRoute_container">
      <a
        :href="item.source"
        class="search_items"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <img
          class="routeIcon"
          src="~assets/image/searchInstitution/patientRouteBgImage2.png"
          alt=""
        />
        <div style="position:relative; z-index:1">
          <div class="itemBox2 itemBox item_startTime">
            <div class="item_title">
              <div class="item_title_icon">
                <!-- <i class="iconfont icon-shijian"></i> -->
                <img style="width: 18px" src="~assets/image/time.png" alt="" />
              </div>
              <div class="item_title_text">出行日期：</div>
            </div>
            <div class="item_content">
              <div class="item_time">{{ item.date }}</div>
            </div>
          </div>
          <!-- 地点 -->
          <div class="itemBox2 itemBox item_place">
            <div class="item_title">
              <div class="item_title_icon">
                <i class="iconfont icon-qidian"></i>
              </div>
              <div class="item_title_text">出发地：</div>
            </div>
            <div class="item_content">
              {{ item.pos_start }}
            </div>
          </div>
          <div class="itemBox2 itemBox item_place">
            <div class="item_title">
              <div class="item_title_icon">
                <i style="color: #d8d83b" class="iconfont icon-zhongdian"></i>
              </div>
              <div class="item_title_text">目的地：</div>
            </div>
            <div class="item_content">
              {{ item.pos_end }}
            </div>
          </div>
          <!-- 车次航班 -->
          <div class="itemBox2 itemBox">
            <div class="item_title">
              <div class="item_title_icon">
                <img style="width: 17px" src="~assets/image/checi.png" alt="" />
                <!-- <i class="iconfont icon-checixiangqingriqi"></i> -->
              </div>
              <div class="item_title_text">车次/航班：</div>
            </div>
            <div class="item_content">
              {{ item.no }}{{ item.memo != "" ? "(" + item.memo + ")" : "" }}
            </div>
          </div>
          <div class="itemBox2 itemBox lastItemBox">
            <div class="item_title">
              <div class="item_title_icon">
                <img style="width: 16px" src="~assets/image/fabu.png" alt="" />
                <!-- <i class="iconfont icon-fabu"></i> -->
              </div>
              <div class="item_title_text">发布来源：</div>
            </div>
            <div class="item_content">
              {{ item.who }}
            </div>
          </div>
        </div>
      </a>
    </div>
    <div @click="showDialogClick" class="addRoutesBtn">
      <i class="iconfont icon-jia"></i>
    </div>
    <!-- 上报信息 -->
    <van-dialog
      :before-close="onBeforeClose"
      @confirm="submitForm"
      v-model="showDialog"
      :width="'90%'"
      title="上报患者行程路线"
      :confirm-button-color="'#1d99d3'"
      class="routerForm"
      show-cancel-button
    >
      <div class="dialogTip">患者行程信息审核通过后自动发布</div>
      <van-form ref="vanForm" @submit="onSubmit">
        <van-field
          v-model="formData.noNumber"
          name="车次/航班"
          label="车次/航班"
          placeholder="请输入车次/航班详细信息"
          :rules="[{ required: true, message: '请输入车次/航班' }]"
        />
        <van-field
          readonly
          clickable
          label="出发城市"
          placeholder="点击选择出发城市"
          @click="selectStartPlace"
          :value="formData.startPlace"
          name="选择城市"
          :rules="[
            { trigger: 'onChange', required: true, message: '请选择出发城市' },
          ]"
        />
        <van-field
          readonly
          clickable
          label="终点城市"
          placeholder="点击选择终点城市"
          @click="selectEndPlace"
          :value="formData.endPlace"
          name="选择城市"
          :rules="[
            { trigger: 'onChange', required: true, message: '请选择终点城市' },
          ]"
        />
        <van-field
          readonly
          clickable
          name="选择时间"
          :value="formData.date"
          label="时间选择"
          placeholder="点击选择当天时间"
          @click="showCalendar = true"
          :rules="[
            { trigger: 'onChange', required: true, message: '请选择当天时间' },
          ]"
        />
      </van-form>
    </van-dialog>
    <!-- 地区选择 -->
    <van-popup
      class="routerPopup"
      v-model="showPopup"
      position="bottom"
      :style="{ height: '70%' }"
      :title="'选择城市'"
    >
      <van-cascader
        v-model="cascaderValue"
        :title="cascTitle"
        :options="options"
        active-color="#1d99d3"
        @close="showPopup = false"
        @finish="onFinish"
      />
    </van-popup>
    <!-- 日历 -->
    <van-calendar
      @confirm="confirmDate"
      :color="'#1d99d3'"
      v-model="showCalendar"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import "assets/css/vantCss/provinceDetail.css"; // 导入css样式
import { getCityList, getPatientsRoutes } from "network/toolsBox";
import { Toast } from "vant";

export default {
  name: "patientRoute",
  data() {
    return {
      dataList: [], // 城市信息
      mTop: 0,
      showDialog: false,
      formData: {
        noNumber: "",
        startPlace: "",
        endPlace: "",
        date: "",
      },
      cascaderValue: false, // 选择器
      cascaderValue: "",
      cascTitle: "", // 选择器标题
      options: [], // 城市数组
      showPopup: false, // 显示/隐藏弹窗
      selectPlace: "start",
      showCalendar: false, // 显示/隐藏日期
      minDate: new Date(new Date().getFullYear(), 0, 1),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      close: false,
    };
  },
  created() {
    getPatientsRoutes().then((res) => {
      // 获取所有数据
      this.dataList = res.data.data.list;
    });

    getCityList().then((res) => {
      // 获取城市数据
      this.options = this.setCityList(res.data.result);
    });
  },
  methods: {
    onClickLeft() {
      // 退出页面
      this.$router.go(-1);
    },

    onSubmit() {
      // 提交信息
      Toast.success("上传信息成功");
      this.showDialog = false;
    },

    onFinish(detail) {
      // 选择结束回调函数
      let str = "";
      for (const item of detail.selectedOptions) {
        str += item.text;
      }
      if (this.selectPlace == "start") {
        if (str != this.formData.endPlace) {
          this.formData.startPlace = str;
        }
      } else {
        if (str != this.formData.startPlace) {
          this.formData.endPlace = str;
        }
      }
      this.cascaderValue = "";
      this.showPopup = false;
    },

    setCityList(list) {
      // 设置城市数据
      if (list.length != 0) {
        let arr = [];
        for (const item of list) {
          if (item.list.length != 0) {
            arr.push({
              text: item.name,
              value: item.id,
              children: this.setCityList(item.list), // 进行递归调用
            });
          } else {
            arr.push({
              text: item.name,
              value: item.id,
            });
          }
        }
        return arr;
      } else {
        return [];
      }
    },

    selectEndPlace() {
      // 选择终点城市
      this.selectPlace = "end";
      this.showPopup = true;
      this.cascTitle = "选择目的城市";
    },

    selectStartPlace() {
      // 选择起点城市
      this.selectPlace = "start";
      this.showPopup = true;
      this.cascTitle = "选择出发城市";
    },

    confirmDate(d) {
      // 确定日期
      let date = new Date(d);
      this.formData.date = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.showCalendar = false;
    },

    submitForm() {
      // 提交表单
      this.$refs.vanForm.validate().then((res) => {
        // 判断表单
        this.$refs.vanForm.submit();
        this.close = true;
        this.onBeforeClose();
      });
    },

    onBeforeClose(action, done) {
      // 监听关闭弹窗
      if (action === "confirm") {
        this.$refs.vanForm.validate().then(
          (res) => {
            // 判断表单
            this.$refs.vanForm.submit();
            this.close = true;
            done(false);
            this.onSubmit();
            setTimeout(() => {
              this.clearForm();
            }, 200);
          },
          (err) => {}
        );
      } else {
        try {
          done(true);
        } catch (error) {}
        setTimeout(() => {
          this.clearForm();
        }, 200);
      }
    },

    clearForm() {
      // 清除表单数据
      this.formData.noNumber = "";
      this.formData.startPlace = "";
      this.formData.endPlace = "";
      this.formData.date = "";
      this.$refs.vanForm.resetValidation();
    },

    showDialogClick() {
      // 显示对话框
      this.showDialog = true;
      // this.$refs.vanForm.resetValidation()
    },
  },
  mounted() {
    this.mTop =
      document.getElementsByClassName("van-nav-bar")[0].clientHeight + "px";
  },
};
</script>
<style scoped>
#patientRoute {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 11;
  top: 0;
  overflow: hidden;
  background-color: #fff;
}
.van-nav-bar {
  background-color: #fff;
}
.van-nav-bar__content {
  background: #fff !important;
}
.bgImage_box {
  padding: 0 15px;
  height: 170px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.bgImage_box .leftImg {
  width: 45%;
}
.bgImage_box .bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
.detail_topBox {
  padding: 12px;
  border-radius: 8px;
  margin-left: 10px;
  backdrop-filter: blur(2px) saturate(200%);
  -webkit-backdrop-filter: blur(2px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: #fff !important;
}
.detail_container {
  padding: 15px;
}
.detail_topBox_title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 3px;
}
.detail_topBox_tip {
  font-size: 12px;
  color: rgb(241, 241, 241);
}
.patientRoute_container {
  padding: 15px;
  position: relative;
  font-size: 12px;
  background-color: #f8f8f8;
}
.routeIcon {
  position: absolute;
  width: 100%;
  bottom: 0px;
  opacity: 0.9;
  top: 0;
  left: 0;
}
.search_items {
  display: block;
  color: #000;
  padding: 12px;
  margin-bottom: 20px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.055), 0 5px 10px rgba(0, 0, 0, 0.055),
    0 1px 10px rgba(0, 0, 0, 0.055);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.itemBox {
  display: flex;
  font-size: 13px;
  padding: 13px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(226, 226, 226, 0.5);
}
.lastItemBox {
  border-bottom: 1px solid transparent !important;
}
.item_title {
  font-weight: bold;
  display: flex;
}
.item_title .iconfont {
  color: var(--color);
}
.item_title_icon {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item_title_text {
  flex: 9;
  display: flex;
  align-items: center;
}
.item_content {
  display: flex;
  flex: 7;
}
.item_time {
  position: relative;
  top: 1.2px;
}
.item_start {
  flex: 1;
  text-align: center;
  display: flex;
  margin-right: 7px;
}
.itemBox2 .item_title_icon {
  margin-right: 5px;
}
.item_start .iconfont {
  color: var(--color);
}
.item_end {
  flex: 1;
  text-align: center;
  display: flex;
}
.item_end .iconfont {
  color: rgb(255, 166, 82);
}
.item_title_left {
  flex: 8;
}
.item_place {
  display: flex;
}
.item_place .item_title {
  flex: 1.9 !important;
  display: flex;
  align-items: center;
}
.item_place .item_content {
  flex: 5;
}
.addRoutesBtn {
  position: fixed;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  bottom: 20%;
  right: 10px;
  background-color: var(--color);
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.addRoutesBtn .iconfont {
  color: #fff;
  font-size: 16px;
}
.addRoutesBtn:active {
  background-color: #167baa;
}
.dialogTip {
  text-align: center;
  font-size: 12px;
  color: rgb(165, 165, 165);
  margin-bottom: 10px;
}
.routerForm .van-button {
  background-color: #fff !important;
}
.item_startTime {
  padding: 0 0 13px;
}
.lastItemBox {
  padding: 13px 0 0;
}
</style>