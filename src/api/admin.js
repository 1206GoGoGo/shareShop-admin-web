import request from '@/utils/request'
import '@/mock.js'

export function fetchList(params) {  //params  
  return request({
    // url:'/manager/info/getList',
    url:'/admin/list_admin',
    method:'get',
    params:params
  })
}

export function getAdminDetail(params) {
  return request({
    url:'/manager/info/getDetail',
    method:'get',
    params:params
  })
}

export function updateManager(data) {
  return request({
    url:'/manager/info/modify/',
    method:'post',
    data:data
  })
}

export function deleteManager(params) {
  return request({
    url:'/manager/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}

export function AddManager(data) {
  return request({
    url:'/manager/info/add',
    method:'post',   
    data:data
  })
}

