import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由组件
import homepage from '../views/home/index.vue'
import loginpage from '../views/login/index.vue'

// 二级路由组件

// 内容管理组件部分
import publishArticle from '../views/home/home-center/manage/publish-article.vue'
import articleList from '../views/home/home-center/manage/article-list.vue'
import commentList from '../views/home/home-center/manage/comment-list.vue'
import sourceAdmin from '../views/home/home-center/manage/source-admin.vue'

// 粉丝管理部分组件
import imageText from '../views/home/home-center/fans/image-text.vue'
import fansSummarize from '../views/home/home-center/fans/fans-summarize.vue'
import fansImage from '../views/home/home-center/fans/fans-image.vue'
import fansList from '../views/home/home-center/fans/fans-list.vue'

// 账户信息部分组件
import accountMsg from '../views/home/home-center/accountmsg/account-massage.vue'

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
      { path: '/home/publish', component: publishArticle },
      { path: '/home/articles', component: articleList },
      { path: '/home/comment', component: commentList },
      { path: '/home/source', component: sourceAdmin },

      // 粉丝管理部分路由组件
      { path: '/home/imgtext', component: imageText },
      { path: '/home/summarize', component: fansSummarize },
      { path: '/home/image', component: fansImage },
      { path: '/home/list', component: fansList },

      // 账户信息部分
      { path: '/home/account', component: accountMsg }

    ]
  },
  // 登录页面的路由
  { path: '/login', component: loginpage }
]

const router = new VueRouter({
  routes
})

export default router
