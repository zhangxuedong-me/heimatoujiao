import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由组件
import homepage from '../views/home/index.vue'
import loginpage from '../views/login/index.vue'

// 二级路由组件

// 二级默认路由导航
import home from '../views/home/home.vue'
Vue.use(VueRouter)
const routes = [

  // 一级路由导航
  // 默认导航
  { path: '/', redirect: '/login' },
  // 主页路由
  {
    path: '/home',
    component: homepage,
    children: [

      { path: '', component: home },

      // 内容管理部分路由组件
      { path: '/home/publish', component: () => import('../views/home/home-center/manage/publish-article.vue') },
      // 接收id参数的路由
      { path: '/home/publish/:id', component: () => import('../views/home/home-center/manage/publish-article.vue') },
      { path: '/home/articles', component: () => import('../views/home/home-center/manage/article-list.vue') },
      { path: '/home/comment', component: () => import('../views/home/home-center/manage/comment-list.vue') },
      { path: '/home/source', component: () => import('../views/home/home-center/manage/source-admin.vue') },

      // 粉丝管理部分路由组件
      { path: '/home/imgtext', component: () => import('../views/home/home-center/fans/image-text.vue') },
      { path: '/home/summarize', component: () => import('../views/home/home-center/fans/fans-summarize.vue') },
      { path: '/home/image', component: () => import('../views/home/home-center/fans/fans-image.vue') },
      { path: '/home/list', component: () => import('../views/home/home-center/fans/fans-list.vue') },

      // 账户信息部分
      { path: '/home/account', component: () => import('../views/home/home-center/accountmsg/account-massage.vue') }

    ]
  },
  // 登录页面的路由
  { path: '/login', component: loginpage }
]

const router = new VueRouter({
  routes
})

export default router
