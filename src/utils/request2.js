import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Axios from 'axios';

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

// 相应拦截器即异常处理
Axios.interceptors.response.use(response => {
    return response
},  error=>{
    if(error && error.response){
        switch(error.response.status){ //跨域存在获取不到状态码的情况
            case 400:
                error.message="错误请求"
                break;
            case 401:
                error.message="未授权,请重新登录"
                break;
            case 403:
                error.message="拒绝访问"
                break;
            case 404:
                error.message="请求错误,未找到该资源"
                break;
            case 405:
                error.message="请求方法未允许"
                break;
            case 408:
                error.message="请求超时"
                break;
            case 500:
                error.message="服务器端出错"
                break;
            case 501:
                error.message="网络未实现"
                break;
            case 502:
                error.message="网络错误"
                break;
            case 503:
                error.message="服务不可用"
                break;
            case 504:
                error.message="网络超时"
                break;
            case 505:
                error.message="http版本不支持该请求"
                break;
            default:
                error.message=`链接错误${error.response.status}`
        }
    } 
    else {//跨域获取不到状态或者其他状态码进行的处理
        error.message="网络出现问题,请稍后再试"
    }
    if(!isPrompt){
        isPrompt=true;
        let instance = Toast({
            message:error.message,
            className:'serverErr',
        })
        setTimeout(()=>{
            instance.close();
            isPrompt=fase;
        },2000);
    }
    return Promise.resolve(error)
})

export default service
