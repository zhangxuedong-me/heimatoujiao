import axios from 'axios'

// 解决javscript数值超出安全范围的数值的插件
import JSONBig from 'json-bigint'

// 求情拦截器的好处：在于如果每个组件中有很多的请求，并且有一些请求的参数，都一样
// 就可以在请求拦截中，拦截下来，把参数强行注入，就不用在每个请求中写入相同的参数

import router from '../router'

// 按需引入单独的element-ui模块
import { Message } from 'element-ui'

// 设置默认的请求的路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.interceptors.request.use(function (config) {
  // 获取token令牌，拦截住每一个请求跟他们强行塞入一个令牌
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token-item')}`

  // config：相当于拦截住的请求的各种参数，强行塞入token并且把config返回，就可以到达服务器
  // 否则会一直在这里拦截，数据到达不了服务器
  return config
}, function () {

  // 执行请求错误的处理
})

// 解决数值超出javascript安全数值范围的情况
axios.defaults.transformResponse = [function (data) {
  // 他解决后的id是数值类型的，如果需要是字符串类型的需要转换一下，在请求中
  return data ? JSONBig.parse(data) : {} // 解决js处理大数字失真问题
}]

// 响应拦截器的处理
axios.interceptors.response.use(function (response) {
  // 可以将响应的数据简化一下，并且如果没有响应的数据的话返回空对象，防止报错
  return response.data ? response.data : {}
}, function (err) {
  // 获取请求的url，做相应的判断
  let url = err.response.config.url.substr(40)

  // 设置状态的提示信息
  let message = ''

  // 处理不同状态的信息，根据不同的错误和不同的请求地址，做出不同的错误报告
  switch (err.response.status) {
    case 400 :
      switch (url) {
        case 'authorizations' :
          message = '手机号或者验证码错误'
          break
      }
      break
    case 507 :
      message = '服务器数据库异常'
      break
    case 401 :
      switch (url) {
        case 'authorizations' :
          message = '身份验证失效，请重新登录'
          // 删除失效的token
          window.localStorage.removeItem('token-item')

          // 停留在登录页面
          router.push('/login')
          break
      }
      break
    case 403 :
      message = '没有设置这条评论的权限'
      break

    default :
      break
  }

  Message({
    message,
    type: 'warning'
  })

  // 将错误返回到catch中，因为若果不返回错误的话，会进入到请求中的then和catch中，防止进入then中
  return Promise.reject(err)
})

export default axios
