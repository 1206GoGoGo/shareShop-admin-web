//管理员路由配置文件

import add_admin from '@/components/admin/add_admin'
import list_admin from '@/components/admin/list_admin'
import list_kinds from '@/components/admin/list_kinds'

export default [
    {
        path:"/admin/add_admin",
        component:add_admin,
        meta: ['Administrator','Add'],
    },
    {
        path:"/admin/list_admin",
        component:list_admin,
        meta: ['Administrator','List'],
    },
    {
        path:"/admin/list_kinds",
        component:list_kinds,
        meta: ['Administrator','Category'],
    }
]