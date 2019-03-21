//优惠券路由配置文件

import info_coupon from '@/components/coupon/info_coupon'
import list_coupon from '@/components/coupon/list_coupon'

export default [
    {
        path:"/coupon/list_coupon",
        component:list_coupon,
        meta: ['Coupon','List'],
    },
    {
        path:"/coupon/info_coupon",
        component:info_coupon,
        meta: ['Coupon','Add'],
    }
]