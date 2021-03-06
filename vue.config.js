module.exports = {
	publicPath: '/',
	chainWebpack: config => {
		
		// 生成模式
		config.when(process.env.NODE_ENV === 'production', config => {
			config.entry('app').clear().add('./src/main-prod.js')

			// external指定依赖不参与打包
			config.set('externals', {
				vue: 'Vue',
				'vue-router': 'VueRouter',
				axios: 'axios',
				echarts: 'echarts',
				vant: 'vant',
				vuex: 'Vuex'
			})

			config.plugin('html').tap(args => {  // 设置顶部title
				args[0].isProd = true
				return args
			})

		})

		// 开发模式
		config.when(process.env.NODE_ENV === 'development', config => {
			config.entry('app').clear().add('./src/main-dev.js')
			config.plugin('html').tap(args => {  // 设置顶部title
				args[0].isProd = false
				return args
			})
		})

		config.module
			.rule('css')
			.test(/\.css$/)
			.oneOf('vue')
			.resourceQuery(/\?vue/)
			.use('px2rem')
			.loader('px2rem-loader')
			.options({
				remUnit: 37.5
			})
	},
	// 配置路径别名
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'static': '@/static'
			}
		}
	},
	// 解决跨域问题
	devServer: {
		proxy: {
			'/inewsRequest': {
				//代理api
				target: 'https://r.inews.qq.com', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/inewsRequest': '' //代理路径
				}
			},
			'/viewRequest': {
				//代理api
				target: 'https://view.inews.qq.com/g2/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/viewRequest': '' //代理路径
				}
			},
			'/provinceMapJson': {
				//代理api
				target: 'https://mat1.gtimg.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/provinceMapJson': '' //代理路径
				}
			},
			'/provinceNewsRequest': {
				//代理api
				target: 'https://api.dreamreader.qq.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/provinceNewsRequest': '' //代理路径
				}
			},
			'/apiMapQQ': {
				//代理api
				target: 'https://apis.map.qq.com', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiMapQQ': '' //代理路径
				}
			},
			'/apiMapTransfer': {
				//代理api
				target: 'https://map.so.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiMapTransfer': '' //代理路径
				}
			},
			'/apiVaccineData': {
				//代理api
				target: 'https://v.qq.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiVaccineData': '' //代理路径
				}
			},
			'/apiVaccineNews': {
				//代理api
				target: 'https://view.inews.qq.com', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiVaccineNews': '' //代理路径
				}
			},
			'/apiProHospital': {
				//代理api
				target: 'https://wechat.wecity.qq.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiProHospital': '' //代理路径
				}
			},
		}
	},
}