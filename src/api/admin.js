import request from '@/utils/request'

export function fetchList() {  //params  需要参数吗？？？？？？？？？？？
  return request({
    url:'/manager/info/getList',
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

export function updateManage(data) {
  return request({
    url:'/manager/info/getDetail/',
    method:'post',
    data:data
  })
}

export function deleteManage(params) {
  return request({
    url:'/manager/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}
