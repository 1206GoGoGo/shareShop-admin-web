import request from '@/utils/request'

export function fetchList(params) {  //params  需要参数吗？？？？？？？？？？？
  return request({
    url:'/member/info/search',
    method:'get',
    params:params
  })
}

export function fetchListSeller(params) {  //params  需要参数吗？？？？？？？？？？？
  return request({
    url:'/member/info/search',
    method:'get',
    params:params
  })
}

export function getUserDetail(params) {
  return request({
    url:'/member/info/getDetail',
    method:'get',
    params:params
  })
}

export function getSellerDetail(params) {
  return request({
    url:'/member/info/getDetail',
    method:'get',
    params:params
  })
}

export function updateUser(data) {
  return request({
    url:'/member/info/modify/',
    method:'post',
    data:data
  })
}

export function updateSeller(data) {
  return request({
    url:'/member/info/modify/',
    method:'post',
    data:data
  })
}

export function deleteUser(params) {
  return request({
    url:'/member/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}

export function deleteSeller(params) {
  return request({
    url:'/member/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}

export function fetchListIncome(params) {  //没用
  return request({
    url:'/member/info/delete',
    method:'get',   //是post还是个get???????????????      
    params:params
  })
}

//获取优惠  接口未改！！！！！！！！！！！！！！！！！！！！
export function getDiscountSetting(id) {
  return request({
    url:'/orderSetting/'+id,
    method:'get',
  })
}

//修改优惠  接口未改！！！！！！！！！！！！！！！！！！！！
export function updateDiscountSetting(id,data) {
  return request({
    url:'/orderSetting/update/'+id,
    method:'post',
    data:data
  })
}