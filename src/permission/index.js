
// 导入路由
import router from '../router'

// 全局设置导航守卫，当路由发生变化时，回调函数就会执行
router.beforeEach(function (to, from, next) {
  // 权限拦截，确定拦截的范围
  if (to.path.startsWith('/home')) {
    // 获取token如果有token的话就登录成功，否则拦截在登录页面
    if (window.localStorage.getItem('token-item')) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果没有在拦截范围内就放行
    next()
  }
})
