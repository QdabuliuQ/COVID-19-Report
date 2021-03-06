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
* html2canvas：通过纯JS对浏览器端进行截屏

### 主要划分为 4 个模块
* 1、国内疫情
* 2、全球疫情
* 3、疫苗接种
* 4、工具箱

### 安装指引
```
git init  // 初始化
git clone https://github.com/QdabuliuQ/COVID-19-Report  // 克隆项目
npm install  // 安装依赖
```

### 文件结构
```
covid-19-report
│   public
└───src
│   └───assets  资源
│         └───css
│         └───icon
│         └───image
│         └───js
│   └───components  组件
│         └───common
│         └───private
│   └───network  网络请求
│   └───router  路由
│   └───static  静态资源
│   └───store  Vuex
│   └───views  页面
│         └───domesticReport  国内疫情
│               └───childComps  子组件
│         └───provinceDetail  省份疫情
│               └───childComps  子组件
│         └───toolsBox  工具箱
│               └───childComps  子组件
│         └───vaccineInformation  疫苗信息
│               └───childComps  子组件
│         └───worldReport  世界疫情
│               └───childComps  子组件
│       App.vue
│       main-dev.js  开发模式入口文件
│       main-prod.js  生产模式入口文件
│       main.js  入口文件
│   babel.config.js  插件配置
│   README.md
│   vue.config.js  项目配置
```
