// // const path = require('path');

// module.exports = {
//   // configureWebpack: {
//   //   resolve: {
//   //     alias: {
//   //       '@': path.resolve(__dirname, 'src'),
//   //       '~': path.resolve(__dirname, 'src'),
//   //       'style': path.resolve(__dirname, 'src/style')
//   //       // 'assets': '@/assets',
//   //       // 'common': '@/common',
//   //       // 'components': '@/components',
//   //       // 'network': '@/network'
//   //     }
//   //   }
//   // },
//   devServer: {
//     proxy: {
//       'api1': {
//             target: 'http://kg.zhaodashen.cn/v2/',
//            changeOrigin: true, // 是否允许跨域
//            secure: false,      // 关闭SSL证书验证https协议接口需要改成true 
//             pathRewrite: {     // 重写路径请求
//                 '^/api1': '' //路径重写 
//             }
//         },
//         // ....
//     }
//   }
// }