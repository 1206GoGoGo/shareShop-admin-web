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

//---------------------------------根据id获取优惠券详情--------------------------------------------
export function getCoupon(id) {
  return request({
    url:'/pro/coupon/getCouponDetailById?id='+id,
    method:'get',
  })
}

//---------------------------------根据优惠券使用状态获取优惠券详情--------------------------------------------
export function fetchListByStatus(status) {
  return request({
    url:'/pro/coupon/getCouponLogsListByStatus?status='+status,
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
