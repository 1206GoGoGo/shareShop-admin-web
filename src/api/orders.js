import request from '@/utils/request'

export function fetchList(params) { //订单查询：根据条件查询 
    return request({     //未改？？  多页面使用？？？？？？？？？？
    url:'/pro/comment/list_admin',
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