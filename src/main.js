import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.less'
import axios from 'axios'

// 设置全局导航守卫

// 在每一个路由发生改变之前都会触发这个事件
router.beforeEach(function (to, from, next) {
  // to：要进入的目录路由对象
  // from：当前导航正要离开的路由
  // next：必须调用这个函数，意思就是继续执行下一步。如果里面写入路由的地址的话，
  // 意思就是中断到当前导航

  // 判断拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入到了拦截的范围，判断有没有token有的话就让登录，没有的话就拦截在登录页面

    let token = window.localStorage.getItem('token-item')

    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

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
