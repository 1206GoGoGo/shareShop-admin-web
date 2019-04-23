import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
    // if (res.code === 200) {
    //   Message({
    //     message: res.message,
    //     type: 'success',
    //     duration: 3 * 1000
    //   })

      // 401:未登录;
      if (res.code === 401||res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      
      //400
      if (res.code === 400) {
        Message({
          message: res.message,
          type: 'warning',
          message:'没有查到相关信息',
          duration: 3 * 1000
        })
        return;
      }

      //404 查询数据找不到
      if (res.code === 404) {
        Message({
          message: res.message,
          type: 'error',
          message:'查询数据找不到',
          duration: 3 * 1000
        })
        return;
      }

      //403
      if (res.code === 403) {
        Message({
          message: res.message,
          type: 'warning',
          message:'非法访问哦',
          duration: 3 * 1000
        })
        return;
      }

      //406
      if (res.code === 406) {
        Message({
          message: res.message,
          type: 'warning',
          message:'请求参数不正确',
          duration: 3 * 1000
        })
        return;
      }
      //408
      if (res.code === 408) {
        Message({
          message: res.message,
          type: 'warning',
          message:'访问超时啦',
          duration: 3 * 1000
        })
        return;
      }

      //500 访问后台的参数不正确
      if (res.code === 500) {
        Message({
          message: res.message,
          type: 'warning',
          message:'后台出了点小问题',
          duration: 3 * 1000
        })
        return;
      }

      return Promise.reject('error')
    } 
    else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
