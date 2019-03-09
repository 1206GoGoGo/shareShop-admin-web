import general_info from '@/components/user/general_user/general_info'
import general_record from '@/components/user/general_user/general_record'
import member_info from '@/components/user/seller_user/member_info'
import member_record from '@/components/user/member_user/member_record'
import member_setting from '@/components/user/member_user/member_setting'
import seller_info from '@/components/user/seller_user/seller_info'
import seller_record from '@/components/user/seller_user/seller_record'
import seller_setting from '@/components/user/seller_user/seller_setting'
import seller_income from '@/components/user/seller_user/seller_income'

export default [
    {
        path:"/user/general_user/general_info",
        meta:{
            //loginUnRequired:true,
        },
        component:general_info,
    },
    {
        path:"/user/general_user/general_record",
        meta:{
            //loginUnRequired:true,
        },
        component:general_record,
    },
    {
        path:"/user/seller_user/member_info",
        meta:{
            //loginUnRequired:true,
        },
        component:member_info,
    },
    {
        path:"/user/member_user/member_record",
        meta:{
            //loginUnRequired:true,
        },
        component:member_record,
    },
    {
        path:"/user/member_user/member_setting",
        meta:{
            //loginUnRequired:true,
        },
        component:member_setting,
    },
    {
        path:"/user/seller_user/seller_info",
        meta:{
            //loginUnRequired:true,
        },
        component:seller_info,
    },
    {
        path:"/user/seller_user/seller_record",
        meta:{
            //loginUnRequired:true,
        },
        component:seller_record,
    },
    {
        path:"/user/seller_user/seller_setting",
        meta:{
            //loginUnRequired:true,
        },
        component:seller_setting,
    },
    
    {
        path:"/user/seller_user/seller_income",
        meta:{
            //loginUnRequired:true,
        },
        component:seller_income,
    },
    
]