import axios from 'axios'
import { getToken } from './method'
import { mscf, BASE_URL } from './const'
import APP from '../main'

let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: getToken()
  }
})
instance.interceptors.request.use((config) => {
  if (!getToken()) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('没有token')
    }
    return
  }
  return config
})
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    let data = response.data
    if (data.code === 401) {
      APP.$messageSend.error('无效的token，需要重新登录')
      mscf.emit('loginExpire', '*', {})
      return Promise.reject(new Error(data.errMessage || data.message))
    }
    return data
  },
  (err) => {
    let { data } = err.response
    if (data.code === 401) {
      APP.$messageSend.error('无效的token，需要重新登录')
      mscf.emit('loginExpire', '*', {})
      return Promise.reject(new Error(data.errMessage || data.message))
    }
    return Promise.reject(err)
  }
)

export const http = instance
