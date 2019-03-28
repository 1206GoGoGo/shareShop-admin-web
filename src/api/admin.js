import request from '@/utils/request'


//管理员查询(根据状态)
export function fetchList(params) {  //params  
  return request({
    url:'/manager/info/getList',
    method:'get',
    params:params
  })
}

//管理员分类查询
export function getAdminCateInfo(params) {  //params  
  return request({
    url:'/manager/class/getList',
    method:'get',
    params:params
  })
}

//查询详细信息
export function getAdminDetail(params) {
  return request({
    url:'/manager/info/getDetail',
    method:'get',
    params:params
  })
}

//更新管理员信息
export function updateManager(data) {
  return request({
    url:'/manager/info/modify',
    method:'post',
    data:data
  })
}

//删除管理员
export function deleteManager(params) {
  return request({
    url:'/manager/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}

//添加管理员
export function AddManager(data) {
  return request({
    url:'/manager/info/add',
    method:'post',   
    data:data
  })
}

//添加管理员分类
export function AddManagerCate(data) {
  return request({
    url:'/manager/class/add',
    method:'post',   
    data:data
  })
}