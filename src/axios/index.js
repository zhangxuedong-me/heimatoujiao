import request from '../utils/request.js'
import { API_GET_CHANNELS, API_PUBLISH_ARTICLE, API_COMMONTS_STATUS, API_USER_IMAGES, API_AUTHOR_IZATIONS, API_USER_PROFILE, API_USER_PHOTO } from '../request-url/requestUrl.js'

// 获取频道数据
export function getChannels (type, params, data) {
  return request({
    url: API_GET_CHANNELS,
    method: type || 'get',
    params,
    data
  })
}
// 发表文章
export function PublishArticles (id, draft, data) {
  return request({
    // 判断若果有id的话说明是要修改发布的，如果没有id的话，说明是要发布新的文章
    url: id ? API_PUBLISH_ARTICLE + '/' + id : API_PUBLISH_ARTICLE,
    method: id ? 'put' : 'post',
    params: {
      draft
    },
    data
  })
}
// 通过传过来的id获取文章信息或者删除内容列表信息
export function getIdArticleInfo (id, type) {
  return request({
    url: API_PUBLISH_ARTICLE + '/' + id,
    method: type || 'get'
  })
}
// 获取文章列表
export function getArticlesList (params, type) {
  return request({
    url: API_PUBLISH_ARTICLE,
    method: type || 'get',
    params
  })
}

// 判断状态是打开状态还是关闭状态的请求
export function openOrColse (type, params, data) {
  return request({
    url: API_COMMONTS_STATUS,
    method: type || 'get',
    params,
    data
  })
}

// 上传图片的请求和请求是否是收藏的图片和请求的页数
export function uploadUserImage (type, data, params) {
  return request({
    url: API_USER_IMAGES,
    method: type || 'get',
    params,
    data
  })
}

// 删除素材请求和设置收藏图片的请求
export function deleteUserImage (type, id, data) {
  return request({
    url: API_USER_IMAGES + '/' + id,
    method: type || 'get',
    data
  })
}

// 上传用户的登录信息是否正确
export function getUserloginInfo (type, data) {
  return request({
    url: API_AUTHOR_IZATIONS,
    method: type || 'get',
    data
  })
}

// 获取用户信息
export function getUserInfoData (type, data) {
  return request({
    url: API_USER_PROFILE,
    method: type || 'get',
    data
  })
}

// 上传用户头像
export function uploadUserPhoto (type, data) {
  return request({
    url: API_USER_PHOTO,
    method: type || 'get',
    data
  })
}
