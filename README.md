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