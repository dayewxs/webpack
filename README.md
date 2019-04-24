# 第一个阶段

1. 项目名不能是中文或者webpack
2. npm i -D webpack webpack-cli
   - webpack : 核心包
   - webpack-cli： 提供了再终端中使用的命令  可以使用webpack命令
   - -D 开发阶段所用到的包，发布上线后就用不到了 --save -dev
3. 步骤：

```js
 - 创建项目 => 初始化包的配置文件 npm init -y 
 - 安装webpack `npm i -D webpack webpack-cli`
 - 创建 main.js文件 => 入口文件
 - 在 package.json  的 scripts中 配置 "test": "webpack main.js"  
    test名字随意 webpack是webpack-cli中提供的命令，用来实现打包的
 - 运行/驱动脚本： npm run test 
```

1. 警告
   The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to'development' or 'production' to enable defaults for each environment. `如果没有设置 mode 配置项, webpack 会默认提供 开发环境(production)`提供 development 和 production 供你使用

- development 开发环境  不压缩文件
- production 上线环境  压缩文件

1. 隔行变色案例

- 创建 src => index.html main.js

- 方法一  在index.html中引入 jQuery - 可以

- 方法二  不在index.html中引入jQuery 在main.js文件中引入 import $ from 'jquery'

  > es6中import语法是识别不了的 需要通过webpack打包main.js ==> dist/main.js
  > 在index.html中引入 dist/main.js即可

# 第二个阶段

  打包方式 1.命令行 2. 配置文件

## 命令行

- "test": "webpack ./src/main.js --mode development"  默认出口 /dist/main.js
- 指定出口  webpack 入口路径 --output 出口路径 --mode development
  "test": "webpack ./src/main.js --output ./dist/test.js --mode development"

## 配置文件

- 根目录下创建文件 webpack.config.js (固定死的)

```js
// webpack 是基于node 的  所以可以按照node的配置项书写
const path = require('path')
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
    mode: 'development'
}
```

## html-webpack-plugin 插件

> 作用 

- 根据指定的模版文件 生成一个新的index.html文件
- 自动引入 bundle.js文件

1. 安装 npm i html-webpack-plugin
2. 配置 

```js
 // 引入 html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')

 plugins: [
        // 实例这个插件
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html')
        })
    ]
```

## webpack-dev-server 插件

> 作用  给我们的项目提供一个开发服务器环境
>
> > - 提供一个服务器
> > - 自动打开浏览器 --open
> > - 指定端口号 --port 8089
> > - 监听文件变化，自动刷新浏览器
> > - 热更新（css） --hot

1. 安装  npm i webpack-dev-server -D
2. 配置(也可以在文件中配置)
   脚本  "dev": "webpack-dev-server --open"
3. 运行脚本 npm run dev
4. `Project is running at http://localhost:8080/` => 点击打开 => 查看服务器的项目
5. 自动打开浏览器  --open
6. 指定端口号 --port 8089
7. 热更新（css） --hot

<!-- 文件中配置 -->
    devServer: {
        open: true,
        port: 8087
    }

# 第三个阶段  开发和发布上线

"dev": "webpack-dev-server" ==> 开发阶段 => 本地没有包
"build": "webpack"   ==> 上线阶段 => 打包一个包 

> http-server 模拟一个服务器环境， 托管文件
>
> > 安装 npm i http-server -g
> > 使用 在当前文件夹下  http-server  即可

# 第四个阶段 loader => 非js文件

## 1.处理 css  需要 loader => style-loader css-loader

- 安装 npm i style-loader css-loader -D
- 配置 : 

```js
module: {
    rules: [
        // 处理 css 
        {test: /\.css$/, use: ['style-loader', 'css-loader']},
    ]
}
```

## 2.处理less 需要 style-loader css-loader less-loader

- 安装 ： npm i less-header less -D  需要多下载个安装包 less
- 配置 :
  {test: /\.css$/, use: ['style-loader', 'css-loader', 'less-loader]}

## 3.处理图片  需要url-loader/file-loader

 // 如果图片大小 < limit 的值  =》 base64  =》 url-loader
 // 如果图片大小 > limit 的值  =》 不要转化为base64  =》 file-loader
 // 如果图片过大  推荐使用在线图片
 {test: /\.(jpg|png|gif)$/, use: ['url-loader?limit=2000']}

## 4.处理字体图标

## 5.处理webpack处理不来的 es6 => babel

1. 安装1： `npm i -D babel-core babel-loader@7`
2. 安装2： `npm i -D babel-preset-env babel-preset-stage-2`
3. 配置： `{ test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }`
4. 创建babel的配置文件  根目录下 `.babelrc`

```js
 {
    "presets": ["env", "stage-2"]
}
```