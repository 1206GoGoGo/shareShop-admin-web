import request from '@/utils/request'



//订单查询：根据///////查询-----------------------------------------------------------
export function fetchProductList(params) { 
    return request({
    url:'/member/order/getListSearch',  
    method:'get',
    params:params
    })
}

//订单查询：根据订单id获取所有信息----------------------------------------------------------- 
export function getOrdersByOrdersId(id) { 
  return request({
  url:'/member/order/getDetail?id='+id,  
  method:'get',
  })
}

////订单查询：根据商品id查询 
export function fetchListByproductId(params) { 
    return request({
    url:'/member/order/getListByPro',
    method:'get',
    params:params
    })
}

//订单查询：根据订单号查询 
export function fetchListByorderNo(params) { 
  return request({     
  url:'/member/order/search',
  method:'get',
  params:params
  })
}

//订单查询：根据用户登录名查询   /member/order /getListByStatus
export function fetchListByuserName(params) { 
  return request({     
  url:'/member/order/getListByUserName',
  method:'get',
  params:params
  })
}

//订单查询：根据订单状态查询  
export function fetchListByStatus(params) { 
  return request({     
  url:'/member/order/getListByStatus',
  method:'get',
  params:params
  })
}

export function deleteComment(params) {
    return request({
    url:'/pro/comment/delete',
    method:'get',   
    params:params
    })
}

//订单设置   接口未改
export function getorderSetting(id) {
    return request({
      url:'/orderSetting/'+id,
      method:'get',
    })
}

//修改订单设置  接口未改！！！！！！！！！！！！！！！！！！！！
export function updateorderSetting(id,data) {
    return request({
      url:'/orderSetting/update/'+id,
      method:'post',
      data:data
    })
  }

//
  export function fetchList(params) { 
    return request({
    url:'/member/order/getListByPro',
    method:'get',
    params:params
    })
}