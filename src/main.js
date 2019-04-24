
// es6中import 语法浏览器是不能识别的  需要使用webpack转化为能够识别的
import $ from 'jquery'

// 引入css 
import './assets/index.css'
// 引入less
import './assets/demo.less'
// 引入字体图标
import './assets/iconfont/iconfont.css'

$('li:odd').css('background', 'skyblue')
$('li:even').css('background', 'red')