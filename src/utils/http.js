import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/token'
let http = axios.create({
  timeout: 10000  // 请求超时时间
})
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = getToken();
  if (token) {
    config.headers['Authorization'] = token;
  }
  config.headers['Content-Type'] = 'application/json'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor respone拦截器
http.interceptors.response.use(function (response) {
  // Do something with response data
  const res = response.data

if(res.code !== 0){
  Message({
    message: res.msg,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject('error')
}else{
  return response.data
}

}, function (error) {
  // console.log(JSON.stringify(error))
  if (error && error.response) {
    if (error.response.status === 401) {
      Message.error({
        content: ' 401 not auth',
        duration: 10
      })
    }
    if (error.response.status === 404) {
      Message.error({
        content: ' 404 not found',
        duration: 10
      })
    }

    if (error.response.status === 500) {
      Message.error({
        content: ' 500 system error ',
        duration: 10
      })
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

export default http
