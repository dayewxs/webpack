
// webpack 是基于node 的  所以可以按照node的配置项书写
const path = require('path')

// 引入 html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口
    entry: path.join(__dirname,'./src/main.js'),
    // 出口
    output: {
        // 出口目录
        path: path.join(__dirname,'./dist'),
        // 出口地址
        filename: 'bundle.js'
    },
    // 模式
    mode: 'development',

    // plugin 
    plugins: [
        // 实例这个插件
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html')
        })
    ],

    devServer: {
        open: true,
        port: 8087
    },

    // 配置loader
    module: {
        rules: [
            // 处理 css 
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 处理less
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 处理图片
            // 如果图片大小 < limit 的值  =》 base64  =》 url-loader
            // 如果图片大小 > limit 的值  =》 不转化为base64  =》 file-loader
            // 如果图片过大  推荐使用在线图片
            {test: /\.(jpg|png|gif)$/, use: ['url-loader?limit=2000']},
            // 处理字体图标
            {test: /\.(eot|svg|ttf|woff|woff2)$/, use: ['url-loader']},
            // 处理webpack处理不来的webpack文件 
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
        ]
    }
}