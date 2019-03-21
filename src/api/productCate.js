import request from '@/utils/request'

//
export function fetchList(parentId,params) {
  return request({
    url:'/pro/category/'+parentId,
    method:'get',
    params:params
  })
}

//添加商品分类
export function createProductCate(data) {
    return request({
      url:'/productCategory/create',
      method:'post',
      data:data
    })
  }

//接口未写好   查看信息
export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

//删除
export function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete/'+id,
    method:'get'
  })
}


export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}