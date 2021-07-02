import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 工具jump
import '@/utils/mixin.js'

// 配置 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 配置 全局初始化样式
import '@/assets/css/reset.scss';
import '@/assets/font/iconfont.css'

// echarts图表
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
