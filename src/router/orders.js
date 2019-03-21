//订单路由配置文件

import list_orders from '@/components/orders/list_orders' 
import setting_orders from '@/components/orders/setting_orders' 
import return_orders from '@/components/orders/return_orders' 

export default [
    {
        path:"/orders/list_orders",
        component:list_orders,
        meta: ['Orders','List'],
    },
    {
        path:"/orders/setting_orders",
        component:setting_orders,
        meta: ['Orders','Setting'],
    },
    {
        path:"/orders/return_orders",
        component:return_orders,
        meta: ['Orders','Return'],
    }
]