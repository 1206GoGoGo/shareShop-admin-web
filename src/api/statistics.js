import request from '@/utils/request'

//
export function fetchListBycategoryId(id) {
  return request({
    url:'/member/order/getCountForOneClass?cateId='+id,
    method:'get',
  })
}