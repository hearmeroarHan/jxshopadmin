// 导入axios模块（留心：必须先通过 cnpm i axios -S
import axios from 'axios'

// 创建request对象（baseURL配置、timeout、headers配置...

// process是node中全局变量
// cnpm run serve  ->  process.env.NODE_ENV -> development
// cnpm run build  ->  process.env.NODE_ENV -> production
const isDev = process.env.NODE_ENV == 'development'

const request = axios.create({
    // baseURL: 'http://kg.zhaodashen.cn/v2/'
    // 思考：实战就一个接口网址，还是n个
    // 回答：必定是多个
    // 原因：开发服务器、线上服务器
    baseURL: isDev ? 'http://kg.zhaodashen.cn/v2/' : 'http://zhaodashen.cn/v2/',
    timeout: 5000,
    headers: {
        token: localStorage.getItem('token') || 'adf7cbdcdc62b07d94f86339e5687ca51'
    }
})

// 拦截request对象的请求（统一加请求loading等
// 拦截request对象的响应（统一关闭loading等


// 导出request对象 其他文件导入使用
export default request