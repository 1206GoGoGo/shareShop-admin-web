import request from '@/utils/request'

export function fetchList(params) {  
    return request({     //未改？？
    // url:'/manager/info/getList',
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