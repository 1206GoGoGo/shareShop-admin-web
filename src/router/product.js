//商品路由配置文件

import add_product from '@/components/product/add_product'
import list_product from '@/components/product/list_product'
import attr_product from '@/components/product/attr_product'
import review_product from '@/components/product/review_product'
import list_recommend from '@/components/product/recommend/list_recommend'
import recommend_kinds from '@/components/product/recommend/recommend_kinds'
import add_recommend from '@/components/product/recommend/add_recommend'
import add_cate from '@/components/product/product_cate/add_cate'
import collect_product from '@/components/product/collect_product'



export default [
    {
        path:"/product/add_product",
        // meta:{
        //     //loginUnRequired:true,
        // },
        component:add_product,
        meta: ['Product','Add'],
    },
    {
        path:"/product/list_product",
        component:list_product,
        meta: ['Product','List'],
    },
    {
        path:"/product/attr_product",
        component:attr_product,
        meta: ['Product','Attributes'],
    },
    {
        path:"/product/review_product",
        component:review_product,
        meta: ['Product','Review'],
    },
    {
        path:"/product/recommend/list_recommend",
        component:list_recommend,
        meta: ['Product','Recommend','List'],
    },
    {
        path:"/product/recommend/recommend_kinds",
        component:recommend_kinds,
        meta: ['Product','Recommend','Category'],
    },
    {
        path:"/product/recommend/add_recommend",
        component:add_recommend,
        meta: ['Product','Recommend','Add'],
    },
    {
        path:"/product/product_cate/add_cate",
        component:add_cate,
        meta: ['Product','Category','Add'],
    },
    {
        path:"/product/collect_product",
        component:collect_product,
        meta: ['Product','Collect'],
    },

]