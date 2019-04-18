import request from '@/utils/request'

//???????????????
export function fetchList(parentId,params) {
  return request({
    url:'/pro/category/'+parentId,
    method:'get',
    params:params
  })
}

//--------------------------------查询商品属性（无条件）-----------------------------------------
export function fetchAttrList(params) {
  return request({
    url:'/pro/attribute/getProductAttributeKeyList',
    method:'get',
    params:params
  })
}

//--------------------------------根据条件查询商品属性-----------------------------------------
export function fetchSearchingList(id) {
  return request({
    url:'/pro/attribute/getProductAttributeKeyByCategoryID?id='+id,
    method:'get',
  })
}

//注意：添加时用post方法，且传的参数是data!

//---------------------------------添加商品分类-----------------------------------------
export function AddProductCate(data) {
    return request({
      url:'/pro/category/add',
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

//------------------------------------------获得第一层级的商品分类-------------------------
export function fetchListLevel() {
  return request({
    url:'/pro/category/getList',
    method:'get',
  })
}

//------------------------------------------根据上级id获取子分类-------------------------------------
export function fetchListChildrenLevel(id) {
  return request({
    url:'/pro/category/getListByParentId?id='+id,
    method:'get',
  })
}

//------------------------------------------根据分类名称获取分类列表-------------------------------------
export function getDetailByName(params) {
  return request({
    url:'/pro/category/getCategoryByName',
    method:'get',
    params:params,
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