import request from '@/utils/request'

//----------------------------------普通用户--------------------------------------------
//初始化得到列表/查询状态异常用户 （状态=1：正常；状态=0：异常）
export function getLists(params) {   //seller也在用这个表，level='3'
  return request({
    // url:'/member/info/getList',
    url:'/member/info/search',    //初始化和条件查询现在用的是一个接口！！！！！！！！！
    method:'get',
    params:params
  })
}

//根据条件查询列表
export function fetchList(params) {
  return request({
    url:'/member/info/search',
    method:'get',
    params:params
  })
}

//获取用户详细信息 -暂时未用到
export function getUserDetail(params) {
  return request({
    url:'/member/info/getDetail',
    method:'get',
    params:params
  })
}

//修改用户信息  post传递
export function updateUser(data) {
  return request({
    url:'/member/info/modify/',
    method:'post',
    data:data
  })
}

//获取用户地址
export function fetchUserAddr(params) {
  return request({
    url:'/member/address/getListByUser',
    method:'get',
    params:params
  })
}

//删除用户信息
export function deleteUser(params) {
  return request({
    url:'/member/info/delete',
    method:'get',   //是post还是个get???????????????
    params:params
  })
}
//---------------------------------------seller-----------------------------------------------
//与fetchList调用的接口一样！!!!!!!!!!!!
export function fetchListSeller(params) { 
  return request({
    url:'/member/info/search',
    method:'get',
    params:params
  })
}

//
export function getSellerDetail(params) {
  return request({
    url:'/member/info/getDetail',
    method:'get',
    params:params
  })
}

//
export function updateSeller(data) {
  return request({
    url:'/member/info/modify/',
    method:'post',
    data:data
  })
}

//
export function deleteSeller(params) {
  return request({
    url:'/member/info/delete',
    method:'get', 
    params:params
  })
}

//根据seller登录名查询其会员信息
export function fetchMemberList(params) {
  return request({
    url:'/member/info/getListBySeller',
    method:'get', 
    params:params
  })
}

//---------------------------------------收入----------------------------------------
//
export function fetchListIncome(params) {  //没用
  return request({
    url:'/member/info/delete',
    method:'get',   
    params:params
  })
}

//-----------------------------------------优惠设置-----------------------------------------
//获取优惠  接口未改！！！！！！！！！！！！！！！！！！！！
export function getDiscountSetting(id) {
  return request({
    url:'/orderSetting/'+id,
    method:'get',
  })
}

//修改优惠  接口未改！！！！！！！！！！！！！！！！！！！！
export function updateDiscountSetting(id,data) {
  return request({
    url:'/orderSetting/update/'+id,
    method:'post',
    data:data
  })
}