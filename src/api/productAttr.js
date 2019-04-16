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