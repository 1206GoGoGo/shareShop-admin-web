import add_product from '@/components/product/add_product'
import list_product from '@/components/product/list_product'
import state_product from '@/components/product/state_product'
import review_product from '@/components/product/review_product'
import list_recommend from '@/components/product/recommend/list_recommend'
import recommend_kinds from '@/components/product/recommend/recommend_kinds'
import add_recommend from '@/components/product/recommend/add_recommend'
import add_kinds from '@/components/product/add_kinds'
// import add_level from '@/components/product/add_level'



export default [
    {
        path:"/product/add_product",
        meta:{
            //loginUnRequired:true,
        },
        component:add_product,
    },
    {
        path:"/product/list_product",
        meta:{
            //loginUnRequired:true,
        },
        component:list_product,
    },
    {
        path:"/product/state_product",
        meta:{
            //loginUnRequired:true,
        },
        component:state_product,
    },
    {
        path:"/product/review_product",
        meta:{
            //loginUnRequired:true,
        },
        component:review_product,
    },
    {
        path:"/product/recommend/list_recommend",
        meta:{
            //loginUnRequired:true,
        },
        component:list_recommend,
    },
    {
        path:"/product/recommend/recommend_kinds",
        meta:{
            //loginUnRequired:true,
        },
        component:recommend_kinds,
    },
    {
        path:"/product/recommend/add_recommend",
        meta:{
            //loginUnRequired:true,
        },
        component:add_recommend,
    },
    {
        path:"/product/add_kinds",
        meta:{
            //loginUnRequired:true,
        },
        component:add_kinds,
    },
    // {
    //     path:"/product/add_level",
    //     meta:{
    //         //loginUnRequired:true,
    //     },
    //     component:add_level,
    // },

]