<template>
<div class="sider">
    <div class="top">
        Share Shop Admin</div>
        <!-- class="title-area" <img class="whut-logo" src="../../assets/whut-logo.png"> -->
        <!-- <span class="whut-title-area"> -->
            <!-- <img src="../../assets/girl.png" class="whut-title-logo"> -->
            <!-- <div></div> -->
        <!-- </span> #20b2aa   3b6a97   4466b0   3f58a1   #1f2d3d    494e5a     bfcbd9-->
    <!-- <div class="bottom"> -->

    <!-- @select="handleSelect" 选择路由跳转 -->
    <el-menu @select="handleSelect"  :unique-opened=true background-color="#5b6270" text-color="#fff" active-text-color="#ffd04b">
       
       <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>User</template>   
            <!-- <el-submenu index="1-1">
                <template slot="title">普通用户管理</template> 
                <el-menu-item index="1-1-1">基本信息</el-menu-item>
                <el-menu-item index="1-1-2">消费记录</el-menu-item>
                <el-menu-item index="1-1-3">订单查询</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="1-1">用户信息</el-menu-item>
            <el-menu-item index="1-2">消费记录</el-menu-item>
            <el-menu-item index="1-3">优惠设置</el-menu-item>
            <!-- <el-submenu index="1-2">
                <template slot="title">会员管理</template> 
                <el-menu-item index="1-2-1">基本信息</el-menu-item>
                <el-menu-item index="1-2-2">消费记录</el-menu-item>
                <el-menu-item index="1-2-3">优惠设置</el-menu-item>
            </el-submenu> -->
            <el-submenu index="1-4">
                <template slot="title">seller管理</template> 
                <el-menu-item index="1-4-1">基本信息</el-menu-item><!--搜索表里面有其特殊的信息-->
                <!-- <el-menu-item index="1-3-2">优惠设置</el-menu-item>
                <el-menu-item index="1-3-3">消费记录</el-menu-item> -->
                <el-menu-item index="1-4-2">收入明细</el-menu-item>
                <el-menu-item index="1-4-3">会员查询</el-menu-item>
            </el-submenu>
        </el-submenu>

        <el-submenu index="2">
            <template   slot="title"><i class="el-icon-goods"></i>Commodity</template>  
            <el-submenu index="2-1">
                <template slot="title">推荐商品管理</template> 
                <el-menu-item index="2-1-1">推荐商品列表</el-menu-item><!--包括新增、删除-->
                <!-- <el-menu-item index="2-1-2">增加推荐商品</el-menu-item> -->
                <el-menu-item index="2-1-3">推荐商品分类</el-menu-item>
                <el-menu-item index="2-1-2">推荐商品记录</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="2-2">
                <template slot="title">商品分类管理</template> 
                <el-menu-item index="2-2-1">增加商品分类</el-menu-item>
                <el-menu-item index="2-2-2">商品分类列表</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="2-2">商品分类</el-menu-item>
            <el-menu-item index="2-3">属性分类</el-menu-item>
            <!-- <el-menu-item index="2-3">商品级别</el-menu-item> -->
            <el-menu-item index="2-4">商品查询</el-menu-item><!--包括销售量、库存、总金额-->
            <el-menu-item index="2-5">新增商品</el-menu-item>    
            <el-menu-item index="2-6">商品收藏</el-menu-item>
            <!-- <el-menu-item index="2-7">商品评价</el-menu-item>回复、删除 -->
        </el-submenu>

        <el-submenu index="3">
            <template   slot="title"><i class="el-icon-sold-out"></i>Order</template>  
            <el-menu-item index="3-1">订单列表</el-menu-item><!--包括订单状态-->
            <!-- <el-menu-item index="3-2">订单设置</el-menu-item> -->
            <el-menu-item index="3-3">退货处理</el-menu-item>
            <!-- <el-menu-item index="3-3">订单状态</el-menu-item>             -->
        </el-submenu>

        <el-submenu index="4">
            <template  slot="title"><i class="el-icon-tickets"></i>Coupon</template>  
            <el-menu-item index="4-1">优惠券列表</el-menu-item><!--包括数量、使用条件、有效期……-->
            <el-menu-item index="4-2">优惠券添加</el-menu-item><!--使用情况-->
        </el-submenu>

        <el-submenu index="5">
            <template  slot="title"><i class="el-icon-message"></i>News</template>  
            <!-- <el-menu-item index="5-1">seller申请</el-menu-item> -->
            <el-menu-item index="5-2">买前留言</el-menu-item>
            <el-menu-item index="5-3">买后评价</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
            <template   slot="title"><i class="el-icon-news"></i>Income</template>  
            <el-menu-item index="6-1">收入查询</el-menu-item><!--导出表-->
            <!-- <el-menu-item index="6-2">> 导出表</el-menu-item> -->
        </el-submenu>

        <el-submenu index="7">
            <template   slot="title"><i class="el-icon-setting"></i>Administrator</template>  
            <!-- <el-submenu index="7-1">
                <template slot="title">管理员分类</template> 
                <el-menu-item index="7-1-1">增加管理员分类</el-menu-item>
                <el-menu-item index="7-1-2">管理员分类列表</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="7-1">管理员分类</el-menu-item>
            <el-menu-item index="7-2">管理员列表</el-menu-item>
            <el-menu-item index="7-3">添加管理员</el-menu-item> <!--包括管理员状态-->
        </el-submenu>

        <el-submenu index="8">
            <template   slot="title"><i class="el-icon-view"></i>Page Settings</template>  
            <el-menu-item index="8-1">Home Section</el-menu-item>
            <el-submenu index="8-2">
                <template slot="title">Each Section</template> 
                <el-menu-item index="8-2-1">Each Section1</el-menu-item>
                <el-menu-item index="8-2-2">Each Section2</el-menu-item>
            </el-submenu>    
        </el-submenu>

   </el-menu>
    <!-- </div> -->
</div>
</template>

<script>
//首页侧边栏模块
export default {
    name:"sider",
    data:function(){
        return {
            
        }
    },

    methods:{
        //路由跳转处理
        handleSelect:function(index,indexpath){
            var locthis=this;
            switch(index)
            {
                //通过index来控制路由跳转
                // case "1-1-1":locthis.$router.push({path:'/user/general_user/general_info'});break;
                // case "1-1-2":locthis.$router.push({path:'/user/general_user/general_record'});break;

                // case "1-2-1":locthis.$router.push({path:'/user/member_user/member_info'});break;
                // case "1-2-2":locthis.$router.push({path:'/user/member_user/member_record'});break;
                // case "1-2-3":locthis.$router.push({path:'/user/member_user/member_setting'});break;

                case "1-1":locthis.$router.push({path:'/user/general_user/general_info'});break;
                case "1-2":locthis.$router.push({path:'/user/general_user/general_record'});break;
                case "1-3":locthis.$router.push({path:'/user/seller_user/seller_setting'});break;

                case "1-4-1":locthis.$router.push({path:'/user/seller_user/seller_info'});break;
                // case "1-3-2":locthis.$router.push({path:'/user/seller_user/seller_setting'});break;
                // case "1-3-3":locthis.$router.push({path:'/user/seller_user/seller_record'});break;
                case "1-4-2":locthis.$router.push({path:'/user/seller_user/seller_income'});break;
                case "1-4-3":locthis.$router.push({path:'/user/seller_user/member_info'});break;

                case "2-1-1":locthis.$router.push({path:'/product/recommend/list_recommend'});break;
                case "2-1-2":locthis.$router.push({path:'/product/recommend/add_recommend'});break;
                case "2-1-3":locthis.$router.push({path:'/product/recommend/recommend_kinds'});break;

                case "2-2":locthis.$router.push({path:'/product/product_cate/add_cate'});break;
                case "2-3":locthis.$router.push({path:'/product/attr_product'});break;

                case "2-4":locthis.$router.push({path:'/product/list_product'});break;
                case "2-5":locthis.$router.push({path:'/product/add_product'});break;
                case "2-6":locthis.$router.push({path:'/product/collect_product'});break;
                // case "2-7":locthis.$router.push({path:'/product/review_product'});break; 

                case "3-1":locthis.$router.push({path:'/orders/list_orders'});break;
                // case "3-2":locthis.$router.push({path:'/orders/setting_orders'});break;
                case "3-3":locthis.$router.push({path:'/orders/return_orders'});break;

                case "4-1":locthis.$router.push({path:'/coupon/list_coupon'});break;
                case "4-2":locthis.$router.push({path:'/coupon/add_coupon'});break;

                // case "5-1":locthis.$router.push({path:'/news/apply_seller'});break;
                case "5-2":locthis.$router.push({path:'/news/view_user'});break;
                case "5-3":locthis.$router.push({path:'/news/comment_user'});break;

                case "6-1":locthis.$router.push({path:'/income/list_income'});break;

                case "7-1":locthis.$router.push({path:'/admin/list_kinds'});break;
                case "7-2":locthis.$router.push({path:'/admin/list_admin'});break;
                case "7-3":locthis.$router.push({path:'/admin/add_admin'});break;

                default:console.log("跳转错误");
            }
        }
    }
}
</script>

<style scoped>
    .sider{
        display: inline-block;
        width:230px;
        top:0px;
        left:0px;
        bottom:0px;
        background-color:#5b6270;
        height: 100%;
        /* width: 100%; */
        /* 添加 1!!!!!!!!!!!!!!!!!!!!!*/
        position: relative;
        overflow: hidden;
    }
    /* .sider .title-area{20b2aa
        height:84px;
    } */
    /* .sider .bottom{
        
    } */
    .sider .top{
        color: azure;
        margin: 20px 20px;
        height: 30px;
        font-size: 16px;
    }
    /* .whut-logo{
        float:left;
        height:60px;
        margin-left:10px;
    } */
    /* .whut-title-area{
        float:right;
        width:160px;
        margin-right:10px;
    } */
    /* .whut-title-logo{
        display: inline-block;
        margin-top:7px;
        width:130px;

    } */
    .el-menu{
        font-size: 16px;
        font-family:'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
        text-align: left;
        border-right-width: 0px !important;
    }
    .el-menu.el-submenu{
        background-color:white;
    }

    .el-menu-item.is-active .el-submenu.is-active{
        background-color:#494e5a !important;
    }
  
   .el-submenu{
       position: relative;
   }
    .el-menu .el-submenu:after{
        content:" ";
        z-index: 10;
        position: absolute;
        width:200px;
        height:0px;
        bottom:0px;
        left:25px;
        
       
        /* border-bottom:1px groove #fff;      */
    }
    .el-submenu .el-menu-item:after{
        content:" ";
        z-index: 10;
        position: absolute;
        bottom:0px;
        left:25px;
        background-color: #304156 !important;
        /* border-bottom:1px groove #fff; */
    }
    /* 95989d */
    .el-menu-item:hover{
        background-color: #494e5a  !important;
    }

    .el-submenu__title i{  
        color:#ffE !important;
    }
</style>

