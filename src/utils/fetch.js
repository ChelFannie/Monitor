import axios from 'axios'
import qs from 'qs'
import store from '../store/store'
import router from '../router'
import { Message } from 'element-ui'
// axios.defaults.baseURL = 'http://192.168.28.30:9731/'
// axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const BASE_URL = '/api/' // 配置api因为使用了代理，每个接口都需要加/api，在此加/api就不要加到每个接口了,生产环境需设置真实服务器地址
const TIMEOUT_MILLISECONDS = 6000 // 超时链接

const instance = axios.create({
  withCredentials: true, // 允许携带cookie
  baseURL: BASE_URL, // 基本url
  timeout: TIMEOUT_MILLISECONDS,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// axios请求拦截器
instance.interceptors.request.use((config) => {
  config.headers.token = `${store.state.token}`
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data) // stringify POST方式提交的数据
  }
  return config
},
(error) => {
  console.log('error.request', error.request)
  return Promise.reject(error)
})
// axios响应拦截器
instance.interceptors.response.use((response) => {
  if (response.data.code && response.data.code === '10003') {
    // 用户没登录
    store.commit('token', '')
    localStorage.removeItem('token')
    router.push({name: '登陆', query: {redirect: router.currentRoute.fullPath}})
  }
  return response.data
}, (error) => {
  switch (error.response && error.response.status) {
    case 400:
      error.message = '请求错误(400)'
      break
    case 401:
      error.message = '未授权，请重新登录(401)'
      break
    case 403:
      error.message = '拒绝访问(403)'
      break
    case 404:
      error.message = '请求出错(404)'
      break
    case 408:
      error.message = '请求超时(408)'
      Message.error({
        message: '请求超时,请刷新后连接!'
        // center: true
      })
      break
    case 500:
      error.message = '服务器错误(500)'
      Message.error({
        message: '服务器异常！'
        // center: true
      })
      break
    case 501:
      error.message = '服务未实现(501)'
      break
    case 502:
      error.message = '网络错误(502)'
      break
    case 503:
      error.message = '服务不可用(503)'
      break
    case 504:
      error.message = '网络超时(504)'
      break
    case 505:
      error.message = 'HTTP版本不受支持(505)'
      break
  }
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error({
      message: '网络异常'
      // center: true
    })
  }
  return Promise.reject(error)
})
export default instance
