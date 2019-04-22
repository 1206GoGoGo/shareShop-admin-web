import request from '@/utils/request'

//---------------------------------获取所有优惠券-----------------------------------------
export function fetchList(params) {
  return request({
    url:'/pro/coupon/getList',
    method:'get',
    params:params
  })
}

//---------------------------------添加优惠券--------------------------------------------
//没改!
export function createCoupon(data) {
  return request({
    url:'/coupon/create',
    method:'post',
    data:data
  })
}

export function getCoupon(id) {
  return request({
    url:'/coupon/'+id,
    method:'get',
  })
}

export function updateCoupon(id,data) {
  return request({
    url:'/coupon/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteCoupon(id) {
  return request({
    url:'/coupon/delete/'+id,
    method:'post',
  })
}
