import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.less'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
// 设置默认的请求的路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 将请求的axios赋值给vue的原型的$http属性
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
