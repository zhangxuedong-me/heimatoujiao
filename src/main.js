import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.less'
import axios from './utils/request.js'
import Compont from './components/index.js'
import './permission'
Vue.config.productionTip = false

// 注册全局element-ui和全局组件
Vue.use(ElementUI)
Vue.use(Compont)
// 将请求的axios赋值给vue的原型的$http属性
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
