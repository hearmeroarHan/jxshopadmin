// 二次封装axios
// 下载包 npm i axios -S 生产环境

// 引入包
import axios from 'axios'

// 真实开发中至少两个接口地址：一个开发服务器，一个线上服务器
// 需要用node来判断是开发还是线上环境
const isDev = process.env.NODE_ENV == 'development'

// 创建request对象
const request = axios.create({
  baseURL: isDev ? 'http://kg.zhaodashen.cn/v2/' : '',
  // baseURL: isDev ? 'api1' : 'http://kg.zhaodashen.cn/v2/',
  timeout: 5000,
  headers: {
    token: localStorage.getItem('token') || 'adf7cbdcdc62b07d94f86339e5687ca51'
  }
})

// 请求拦截器
// 响应拦截器

// 导出request对象 
export default request