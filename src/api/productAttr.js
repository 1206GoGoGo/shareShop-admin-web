import request from '@/utils/request'

//添加属性名称
export function AddAttributeKey(params) {
  return request({
    //url:'/pro/attribute/addProductAttributeKey?categoryId='+categoryId+'&attrName='+attrName,
    url:'/pro/attribute/addProductAttributeKey',
    method:'post',
    params:params
  })
}

//添加属性值
export function AddAttributeValue(params) {
    return request({
        //url:'/pro/attribute/addProductAttributeValue?categoryId='+categoryId+'attrValue='+attrValue,
        url:'/pro/attribute/addProductAttributeValue',
        method:'post',
        params:params
    })
  }


//--------------------------------查询商品属性（根据商品分类id和属性名称）-----------------------------------------
export function fetchAttrList(params) {
  return request({
    url:'/pro/attribute/getProductAttributeKeyByIdAndName',
    method:'get',
    params:params
  })
}

//------------------------根据商品分类id查询商品key值和value(商品添加页面也使用)-------------------------------------------------
export function fetchAttrByCategoryId(id) {
  return request({
    url:'/pro/attribute/getProductAttributeKeyByCategoryID?id='+id,
    method:'get',
  })
}

//--------------------------------根据商品属性id查询商品value值-----------------------------
export function fetchValueByKeyID(id) {
  return request({
    url:'/pro/attribute/getProductAttributeValueByKeyID?id='+id,
    method:'get',
  })
}

//--------------------------------查询商品属性（主要为了查出来属性名称）(无条件)-----------------------------------------
export function fetchAttrNameList(params) {
  return request({
    url:'/pro/attribute/getProductAttributeKeyList',
    method:'get',
    params:params
  })
}