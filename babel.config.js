const proPlugins = []  // 发布阶段插件数组
if (process.env.NODE_ENV === "production") {  // 判断是否是在生产模式下
  proPlugins.push('transform-remove-console')  // 追加插件
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...proPlugins,  // 解构数组
    '@babel/plugin-syntax-dynamic-import'
  ]
}
