import request from '@/utils/request'

//
export function fetchListBycategoryId(id) {
  return request({
    url:'/member/order/getCountForOneClass?cateId='+id,
    method:'get',
  })
}

//金额统计  接口未成功！！
export function statisticSales(data) {
  return request({
      url: '/charts/v1/aggregate',
      method: 'post',
      data
  }).then(res => res.data.result);
}

//商品销量、金额的初始化  接口未成功！！！
export function fetchProductList(data) {
  return request({
      url: '/charts/v1/aggregate',
      method: 'post',
      data
  })
}
