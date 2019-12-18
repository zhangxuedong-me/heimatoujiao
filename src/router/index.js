import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由组件
import homepage from '../views/home/index.vue'
import loginpage from '../views/login/index.vue'
Vue.use(VueRouter)
const routes = [

  // 一级路由导航
  // 默认导航
  { path: '/', redirect: '/login' },
  // 主页路由
  { path: '/home', component: homepage },
  // 登录页面的路由
  { path: '/login', component: loginpage }
]

const router = new VueRouter({
  routes
})

export default router
