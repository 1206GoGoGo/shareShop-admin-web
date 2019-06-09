<template>
<div class="sider">
    <div class="top">
        Share Shop Admin
    </div>
    <!--<i class="el-icon-menu"></i>  @select="handleSelect"选择路由跳转:default-active="defaultActive" :default-active="defaultActive"  router-->
    <el-menu :unique-opened='true' background-color="#5b6270" text-color="#fff" :default-active="$route.path" active-text-color="#ffd04b" router>
        <el-submenu index="1">         <!--:default-active="$route.path" 侧边栏跟着自己的路由高亮-->
            <template slot="title"><svg-icon icon-class="userside" class="side-icon"></svg-icon>User</template>   
            
            <el-menu-item index="/user/general_user/general_info"><svg-icon icon-class="usermsgside" class="side-icon"></svg-icon>用户信息</el-menu-item>
            <!-- <el-menu-item index="/user/general_user/general_record"><svg-icon icon-class="recordside" class="side-icon"></svg-icon>消费记录</el-menu-item> -->
            <el-menu-item index="/user/seller_user/seller_setting"><svg-icon icon-class="couponside" class="side-icon"></svg-icon>优惠设置</el-menu-item>
            <el-submenu index="1-4">
                <template slot="title"><svg-icon icon-class="sellerside" class="side-icon"></svg-icon>seller管理</template> 
                <el-menu-item index="/user/seller_user/seller_info"><svg-icon icon-class="usermsgside" class="side-icon"></svg-icon>基本信息</el-menu-item><!--搜索表里面有其特殊的信息-->
                <!-- <el-menu-item index="1-3-2">优惠设置</el-menu-item>
                <el-menu-item index="1-3-3">消费记录</el-menu-item> -->
                <el-menu-item index="/user/seller_user/seller_income"><svg-icon icon-class="incomeside" class="side-icon"></svg-icon>收入明细</el-menu-item>
                <el-menu-item index="/user/seller_user/member_info"><svg-icon icon-class="memberside" class="side-icon"></svg-icon>会员查询</el-menu-item>
            </el-submenu>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title"><svg-icon icon-class="productside" class="side-icon"></svg-icon>Commodity</template>  
            <el-submenu index="2-1">
                <template slot="title"><svg-icon icon-class="recommendside" class="side-icon"></svg-icon>推荐商品管理</template> 
                <el-menu-item index="/product/recommend/list_recommend">推荐商品列表</el-menu-item><!--包括新增、删除-->
                <!-- <el-menu-item index="2-1-2">增加推荐商品</el-menu-item> -->
                <el-menu-item index="/product/recommend/recommend_kinds">推荐商品分类</el-menu-item>
                <el-menu-item index="/product/recommend/add_recommend">推荐商品记录</el-menu-item>
            </el-submenu>
            <el-menu-item index="/product/add_product">Product Add</el-menu-item> 
            <el-menu-item index="/product/list_product">Product List</el-menu-item><!--包括销售量、库存、总金额-->
            <el-menu-item index="/product/product_cate/list_cate">Product Classification</el-menu-item>
            <el-menu-item index="/product/product_Attributes/attr_product">Product Attribute</el-menu-item>
            <el-menu-item index="/product/product_comment/comment_user">Product Comment</el-menu-item>
            <!-- <el-menu-item index="2-3">商品级别</el-menu-item> -->
            
               
            <!-- <el-menu-item index="/product/collect_product">商品收藏</el-menu-item> -->
            <!-- <el-menu-item index="2-7">商品评价</el-menu-item>回复、删除 -->
        </el-submenu>

        <el-submenu index="3">
            <template   slot="title"><svg-icon icon-class="orderside" class="side-icon"></svg-icon>Order</template>  
            <el-menu-item index="/orders/list_orders">Order List</el-menu-item><!--包括订单状态-->
            <!-- <el-menu-item index="3-2">订单设置</el-menu-item> -->
            <!-- <el-menu-item index="/orders/return_orders">Refund & Return</el-menu-item> -->
            <el-menu-item index="/orders/return_money">Refund & Return</el-menu-item>
            <!-- <el-menu-item index="3-3">订单状态</el-menu-item>-->
        </el-submenu>

        <el-submenu index="4">
            <template  slot="title"><svg-icon icon-class="couponside" class="side-icon"></svg-icon>Coupon</template>  
            <el-menu-item index="/coupon/list_coupon">优惠券列表</el-menu-item><!--包括数量、使用条件、有效期……-->
            <el-menu-item index="/coupon/add_coupon">优惠券添加</el-menu-item><!--使用情况-->
        </el-submenu>

        <el-submenu index="5">
            <template  slot="title"><svg-icon icon-class="msgside" class="side-icon"></svg-icon>News</template>  
            <!-- <el-menu-item index="5-1">seller申请</el-menu-item> -->
            <el-menu-item index="/news/view_user">测试页面</el-menu-item>
            <el-menu-item index="/news/comment_user">评价回复</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
            <template   slot="title"><svg-icon icon-class="statistics" class="side-icon"></svg-icon>Statistics</template>  
            <!-- <el-menu-item index="/statistics/product/statistic_product"><svg-icon icon-class="productside" class="side-icon"></svg-icon>商品统计</el-menu-item> -->
            <el-menu-item index="/statistics/user/list_user"><svg-icon icon-class="Suserside" class="side-icon"></svg-icon>用户统计</el-menu-item>
            <el-menu-item index="/statistics/income/list_income"><svg-icon icon-class="incomeside" class="side-icon"></svg-icon>收入统计</el-menu-item>
            <!-- <el-menu-item index="6-2">> 导出表</el-menu-item> -->
        </el-submenu>

        <el-submenu index="7">
            <template   slot="title"><svg-icon icon-class="adminside" class="side-icon"></svg-icon>Administrator</template>  
            <el-menu-item index="/admin/list_kinds">管理员分类</el-menu-item>
            <el-menu-item index="/admin/list_admin">管理员列表</el-menu-item>
            <!-- <el-menu-item index="/admin/add_admin">添加管理员</el-menu-item> 包括管理员状态 -->
        </el-submenu>

        <!-- <el-submenu index="8">
            <template   slot="title"><i class="el-icon-view"></i>Page Settings</template>  
            <el-menu-item index="8-1">Home Section</el-menu-item>
            <el-submenu index="8-2">
                <template slot="title">Each Section</template> 
                <el-menu-item index="8-2-1">Each Section1</el-menu-item>
                <el-menu-item index="8-2-2">Each Section2</el-menu-item>
            </el-submenu>    
        </el-submenu> -->
   </el-menu>
    <!-- </div> -->
    <!-- <div style="display:none">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div> -->
</div>
</template>

<script>
export default {
    name:"sider",
    data:function(){
        return {
        }
    },
    computed: {
        // defaultActive: function(){
        //     return this.$route.path.replace('/', '');
        // }
    },
    methods:{
    }
}
</script>

<style scoped>

    .sider{
        display: block;
        width:230px;
        top:0px;
        left:0px;
        bottom:0px;
        background-color:#5b6270;
        height: 100%;
        position: fixed;  
        z-index: 1001;
        overflow: hidden;
    }
    .sider .top{
        color: azure;
        margin: 20px 20px;
        height: 30px;
        font-size: 16px;
    }
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
    .side-icon{
        font-size: 18px;
        padding-right:10px;
    }
</style>

