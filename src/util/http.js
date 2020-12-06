import axios from 'axios'
import { Toast } from 'vant'

const http = axios.create({
  baseURL: 'https://m.maizuo.com/',
  timeout: 5000,
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}' }
})

// 拦截器怎么去理解？ 和axios绑定的
// http.interceptors.request()
// http.interceptors.response()

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent

  // 启动loading拦截器
  Toast.loading({
    message: '变可爱ing...',
    forbidClick: true,
    loadingType: 'spinner',
    overlay: false,
    closeOnClickOverlay: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // 清除弹出提示框
  Toast.clear()

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default http
