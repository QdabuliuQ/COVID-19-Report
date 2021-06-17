<template>
  <div id="institutionMap">
    <div class="top_mapBox">
      <div @click="backBtn" class="mapBox_backBtn">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="mapBox_locationInformation">
        <img src="~assets/image/searchInstitution/map.svg" alt="" />
        <div>
          {{ $store.state.institutionDetail.city }} /
          {{ $store.state.institutionDetail.district }}
        </div>
      </div>
      <div id="map_container"></div>
    </div>
    <div class="bottom_detailBox">
      <div class="detail_container">
        <div class="detail_inforBox">
          <div class="detail_title">
            {{ $store.state.institutionDetail.title }}
            <img src="~assets/image/searchInstitution/institution.svg" alt="" />
          </div>
          <div class="detail_address">
            位置：{{ $store.state.institutionDetail.address }}
          </div>
          <div class="detail_phone">
            电话：<span>{{ $store.state.institutionDetail.tel }}</span
            ><i class="iconfont icon-dianhua"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let infoWindow;
export default {
  name: "institutionMap",
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
  },
  mounted() {
    let lat = this.$store.state.institutionDetail.location.lat
    let lng = this.$store.state.institutionDetail.location.lng
    let center = new TMap.LatLng(
      lat,
      lng
    );
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    let map = new TMap.Map(document.getElementById("map_container"), {
      center: center, //设置地图中心点坐标
      zoom: 17.2, //设置地图缩放级别
      pitch: 43.5, //设置俯仰角
      viewMode: "3D",
      panControl: false,
    });

    infoWindow = new TMap.InfoWindow({
      map: map,
      content: this.$store.state.institutionDetail.title,
      position: new TMap.LatLng(
        this.$store.state.institutionDetail.location.lat,
        this.$store.state.institutionDetail.location.lng
      ),
      offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素，为了使其显示在Marker的上方
    });
    infoWindow.close();
    infoWindow.open();  //打开信息窗内容

    let other = this.$store.state.otherInstitutions
    let geometries = []
    let index = 2

    for (const item of other) {  // 生成坐标数据
      geometries.push({
        id: index.toString(), //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: "otherMarker", //指定样式id
        position: new TMap.LatLng(item.location.lat, item.location.lng), //点标记坐标位置
        properties: {
          //自定义属性
          title: "marker2",
        },
      })
      index ++
    }
    //创建并初始化MultiMarker
    let markerLayer = new TMap.MultiMarker({
      map: map, //指定地图容器
      //样式定义
      styles: {
        //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
        myStyle: new TMap.MarkerStyle({
          width: 25, // 点标记样式宽度（像素）
          height: 25, // 点标记样式高度（像素）
          src: require('../../../assets/image/searchInstitution/locationMarker.png'), //图片路径
          //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
          anchor: { x: 16, y: 32 },
        }),

        otherMarker: new TMap.MarkerStyle({
          width: 20, // 点标记样式宽度（像素）
          height: 20, // 点标记样式高度（像素）
          src: require('../../../assets/image/searchInstitution/otherMarker.png'), //图片路径
          //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
          anchor: { x: 16, y: 32 },
        }),
      },
      //点标记数据数组
      geometries: [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: "myStyle", //指定样式id
          position: new TMap.LatLng(lat, lng), //点标记坐标位置
          properties: {
            //自定义属性
            title: "marker1",
          },
        },
        ...geometries
      ],
    });
  },
};
</script>
<style scoped>
.marketClass {
  padding: 12px;
  background-color: pink;
}
#institutionMap {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 11;
  top: 0;
  overflow: hidden;
  background-color: #fff;
  font-size: 12px;
}
.top_mapBox {
  width: 100%;
  height: 80vh;
  position: relative;
}
#map_container {
  width: 100%;
  height: 100%;
}
.mapBox_backBtn {
  position: absolute;
  top: 20px;
  left: 15px;
  background-color: #fff;
  box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 1001;
}
.mapBox_backBtn .iconfont {
  font-size: 14px;
  color: #000;
  position: relative;
  left: -1px;
}
.mapBox_locationInformation {
  height: 40px;
  border-radius: 40px;
  background-color: #fff;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 11px;
  z-index: 5;
}
.mapBox_locationInformation img {
  width: 30px;
  margin-right: 4px;
}
.bottom_detailBox {
  width: 100%;
  height: 20vh;
  background-color: #fff;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}
.detail_container {
  width: 100%;
  height: 100%;
  /* padding: 15px; */
  display: flex;
  align-items: center;
  margin-left: 25px;
}
.detail_inforBox {
  max-width: 80%;
}
.detail_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}
.detail_title img {
  width: 15px;
  position: relative;
  top: 1px;
}
.detail_address {
  font-size: 13px;
  color: rgb(153, 153, 153);
  margin-bottom: 4px;
}
.detail_phone {
  font-size: 13px;
  color: rgb(153, 153, 153);
}
.detail_phone .iconfont {
  color: var(--color);
  margin-left: 5px;
}
.detail_phone span {
  color: var(--color);
}
.rotate-circle {
  display: none !important;
}
</style>