import request from '@/utils/request'

// //初始化得到列表
// export function getLists(params) {
//   return request({
//     url:'/member/info/getList',
//     method:'get',
//     params:params
//   })
// }

//--------------------------------获取商品列表（参数为页码）---------------------------
export function fetchList(params) {
  return request({
    url:'/pro/info/getList',
    method:'get',
    params:params
  })
}

//--------------------------------根据商品id获取商品列表------------------------------------
export function getProductInfo(id) {
  return request({
    url:'/pro/info/getDetail?id='+id,
    method:'get',
    // params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'post',
    params:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'post',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(id,data) {
  return request({
    url:'/product/update/'+id,
    method:'post',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/product/updateInfo/'+id,
    method:'get',
  })
}

