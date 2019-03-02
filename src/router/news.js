//登陆路由配置文件

import apply_seller from '@/components/news/apply_seller'
import view_user from '@/components/news/view_user'
import comment_user from '@/components/news/comment_user'

export default [
    {
        path:"/news/apply_seller",
        component:apply_seller,
    },
    {
        path:"/news/view_user",
        component:view_user,
    },
    {
        path:"/news/comment_user",
        component:comment_user,
    }
]