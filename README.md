# covid-19-report（移动端新冠肺炎实时报告）
### 项目技术栈：
* Vue2：采用最新Vue2的语法
* Vuex：管理公共组件状态量
* Vue-router：管理项目页面应用路由
* Axios：用于发送网络请求
* Vue-CLI：自动化构建工具。
* ES6：采用ES6语法
* lib-flexible：可伸缩布局方案
* Echarts：一个基于JavaScript的开源可视化图表库
* Vant：轻量、可靠的移动端 Vue 组件库
* postcss-px2rem：根据当前屏幕尺寸将px转化为rem

### 项目主要划分为 4 个模块
* 1、国内疫情
* 2、全球疫情
* 3、疫苗接种
* 4、工具箱

### 项目要点：
* 1、`lib-flexible`可伸缩布局方案，适用于移动端开发，根据屏幕的尺寸自动调整`px`属性；通过`npm i -S amfe-flexible`进行安装；安装完成后通过`import`在`main.js`中进行引入
  ```js
  import 'lib-flexible'  // 导入lib-flexible
  ```
* 2、除了使用`lib-flexible`之外，还需要搭配`postcss-px2rem`插件进行使用；将`px`自动转化为`rem`；通过`npm i postcss-px2rem --save -dev`进行安装；插件需要在`vue.config.js`进行配置使用
  ```js
  // postcss-px2rem配置
  css: {
      loaderOptions: {
          css: {},
          postcss: {
              plugins: [
                  require('postcss-px2rem')({
                      remUnit: 37.5  // 1rem = 37.5px
                  })
              ]
          }
      }
  },
  ```
* 3、解决Vuex刷新后数据丢失问题；当我们刷新页面的时候，Vuex中的数据会丢失，导致页面出错，造成用户不必要的流量浪费和网络请求；解决方法：我们可以在`App.vue`文件中的`create`生命周期函数，判断数据是否储存在内存当中；调用`replaceState`方法重置`Vue.store.state`的状态
  * 3-1、调用`Object.assign(合并对象，对象1，对象2，...)`方法合并出一个新的对象；并且设置到`Vue.store.state`当中；
  * 3-2、给全局绑定一个`beforeunload`事件，监听刷新事件；在刷新之前触发，将`this.$store.state`中数据保存到内存当中
  ```js
  //在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(this.$store.state));
  })
  ```
* 4、在项目中的接口需要通过跨域，才能够请求到数据；我们需要在`vue.config.js`文件中设置代理，解决开发环境下的跨域问题；
  ```js
  // 解决跨域问题
  devServer: {
		proxy: {
			'/inewsRequest': {
				//代理api
				target: '请求接口根路径', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/inewsRequest': '' //代理路径
				}
			},
		}
	},
  ```
  并且我们在发起请求的时候，就不需要再用`接口根据路径+参数...`；我们可以直接使用在配置文件中配置的路径代码即可；
  ```js
  export function anotherRequest(config) {
    const instance = axios.create({
      baseURL: '/inewsRequest',  // 请求根路径
      timeout: 5000,  // 请求时间
    })
    return instance(config) // 返回 实例对象
  }
  ```
  * 5、关于echarts在Vue项目中的使用
    * 5-1、使用echarts显示中国地图疫情分布情况
      * 5-1-1、首先肯定是需要`China.js`进行配合，才能够显示地图，该文件在项目路径`src/static/js/china.js`，并且在`main.js`文件中进行导入；
      ```js
      import 'static/js/china.js' // 导入china.js配合地图显示
      ```
      * 5-1-2、就是创建一个`div`元素，并且要给`div`指定的高度和宽度
      * 5-1-3、调用echarts官方api的`init`方法，初始化图表实例对象
      ```js
      // this.$echarts 是在main.js中引入了echarts并绑定在prototype当中
      myChart = this.$echarts.init(
        document.getElementById("demostic_map_container"),
        null,
        { renderer: "svg" }
      )
      ```
      * 5-1-4、接下来就是最终的地图options配置
      ```js
      return {
        visualMap: {  // 地图图例配置
          show: true,
          type: "piecewise",
          splitNumber: 4,
          itemWidth: 24,  // 图例宽度
          itemHeight: 12,  // 图例高度
          itemGap: 5,  // 图例间隙
          textStyle: {  // 图例文本样式
            color: "#999",
            fontSize: 12,
          },
          pieces: [  // 图表参数  各个区间的颜色和文本
            {
              // 现存确诊
              min: 10000,
              color: "#7D1818",
              label: "10000人以上",
            },
            {
              min: 1000,
              max: 9999,
              color: "#BF2321",
              label: "1000-9999人",
            },
            {
              min: 100,
              max: 999,
              color: "#FF7B66",
              label: "500-999人",
            },
            {
              min: 1,
              max: 99,
              color: "#FFA789",
              label: "1-99人",
            },
            {
              max: 0,
              min: 0,
              color: "#ffffff",
              label: "无确诊人数",
            },
          ],
        },
        tooltip: {  // 工具配置
          trigger: "item",
          triggerOn:"click",
          textStyle: {
            color: '#FFF',     // 文字的颜色
            fontSize: '12',    // 文字字体大小
          },
          padding:[7],
          backgroundColor:"rgba(0, 0, 0, 0.623)", 
          borderColor: 'transparent',  
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            return (
              "地区："+params.data.name +
              "<br>" +
              "确诊人数：" +params.data.value
            );
          },
        },
        series: [  // 数据源
          {
            name: "",
            type: "map",  // 必备
            mapType: "china",  // 必备
            roam: false,
            zoom: 1.2,  // 放大/缩小
            itemStyle: {
              normal: {
                label: {
                  show: true,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            label: {
              normal: {
                textStyle: {
                  fontSize: 10,
                  color: "#333",
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: cityData != undefined ? cityData : [],  // 关键数据
          },
        ],
      };
      ```
      * 5-1-5、最后将该对象的作为`option`，调用`setOption`方法时传入即可
      ```js
      myChart.setOption(option);
      ```
    * 5-2、使用echarts显示中国各省和直辖市的地图疫情分布情况
      * 5-2-1、原理和上一步一样，都是通过获取数据并且加载到`series`当中，唯一比较特殊的一点就是，每一个省市都是不同`json`文件，需要不同的经纬度文件，才能够配合`echarts`进行使用。
      * 5-2-2、在这里我从腾讯疫情中找到了一个api接口，通过api接口获取不同城市的地图Json文件。`api：https://mat1.gtimg.com/news/feiyanarea/城市拼音.json`
      * 5-2-3、通过api获取到的数据经过网上查阅了其他的Json文件进行比对后，发现还是有一些内容需要我们手动添加上去
      ```js
      // data就是返回的地图数据
      data.features = res.data.features;
      data.type = "FeatureCollection";
      data.UTF8Encoding = true;
      ```
      * 5-2-4、然后最关键的一步就是调用`this.$echarts.registerMap`方法，传入地图Json数据，并且指定哪一个城市名称即可。
      * 5-2-5、最后还是必须调用`setOption`方法将数据导入。
    * 5-3、使用echarts显示世界地图疫情分布情况
      * 5-3-1、同理还是获取数据并且添加到`series`当中
      * 5-3-2、通过echarts加载世界地图也是需要一个对应的json文件才能够显示。我在腾讯疫情中找到了相关的api接口；`api：https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd`
      * 5-3-3、接下来就是世界地图的option配置选项
      ```js
      return {
        tooltip: {  // 工具配置
          trigger: "item",  // 必须设置为item
          textStyle: { 
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
          },
          triggerOn: "click",  // 点击事件
          padding: [7],
          backgroundColor: "rgba(0, 0, 0, 0.623)",
          borderColor: "transparent",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {  // 自定义提示内容
            if (Number.isNaN(params.value)) {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                "数据不详"
              );
            } else  {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                params.value+'人'
              );
            }
          },
        },
        visualMap: {  // 图例配置
          type: 'piecewise',
          splitNumber: 6,  // 分割为6段
          orient: 'horizontal',
          itemGap: 0,  // 间距为0
          pieces: [  // 自定义每一段的范围，以及每一段的文字
            { gte: 10000000, color: "#d11010" }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gte: 1000000, lte: 9999999, color: "#ff3e3e" },
            { gte: 100000, lte: 999999, color: "#ff6e6e" },
            { gte: 10000, lte: 99999, color: "#ffa0a0" },
            { gte: 11, lte: 9999, color: "#fdc1c1" },
            { lte: 10, color: "#fff5f5" }          // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          bottom: 10,
          left: 10,
          itemWidth: 45,
          itemHeight: 6,
          showLabel: false,
          left: 'center',
        },
        series: [
          {
            name: "World Population (2010)",
            type: "map",  // 必备
            mapType: "world",  // 必备
            roam: false,
            zoom: 1.2,  // 缩放
            itemStyle: {
              emphasis: {
                // 也是选中样式
                borderWidth: 2,
                borderColor: "#fff",
                areaColor: "#3dbd16",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
            },
            data,  // 每一个国家的疫情数据
            nameMap: world,  // 国家名称中文
          },
        ],
      };
      ```
      * 5-3-4、当我们配置完成option后，通过调用`registerMap`方法，生成地图；
      ```js
      // this.mapJson就是地图json数据，通过上方api获取得来
      this.$echarts.registerMap("world", this.mapJson);
      ```
      然后再调用`setOption`方法，传入option即可生成世界地图。
      * 5-3-5、但是一开始发现了地图的显示国家名称都是英文的，不是很好。所以就是从网上搜索，找到了一份`world.js`文件，该文件在`src/static/js/world.js`，将该文件导入：`import world from "static/js/world";`
      * 5-3-6、导入的文件都会保存到world变量当中。将world中的数据，作为option地图配置的nameMap属性值即可。这样就解决地图显示英文的问题。
      ```js
      nameMap: world,
      ```