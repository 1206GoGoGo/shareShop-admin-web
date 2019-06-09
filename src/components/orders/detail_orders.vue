<template> 
    <div class="app-container">
        <el-card shadow="never" :data="order" style="background:#f2f2f2; height:100%; margin-bottom:20px;font-size:large">
            <!--订单状态获取不到！！！！！！！！！！！！！！-->
            <el-tag>当前订单状态：</el-tag><span style="padding:10px;">{{order.orderStatus | statusFormatter}}</span>
            <el-button type="primary" @click="handleSearchList()" size="small" style="float:right; margin-right:20px;">订单备注</el-button>
            <el-button type="primary" @click="handleSearchList()" size="small" style="float:right; margin-right:20px;">取消订单</el-button>
            <el-button type="primary" @click="handleSearchList()" size="small" style="float:right; margin-right:20px;">修改收货信息</el-button>
        </el-card> 
        <el-card shadow="never" style="background:#f2f2f2; height:100%;">
            <div>
                <el-tag>订单信息:</el-tag>
            </div>
<!--订单表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="orderList"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="订单编号" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column><!--没有用户信息！！！！！！！！！！！！！-->
                    <el-table-column label="订单用户" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column><!--不一张表-->
                     <el-table-column label="用户折扣" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column><!--不一张表-->
                    <el-table-column label="支付方式" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="支付来源" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="订单优惠" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--订单表 E-->
            <div style="padding-top:20px;">
                <el-tag>收货人信息:</el-tag>
            </div>
<!--收货人表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="consigneeList"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="收货人姓名" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="联系方式" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.consigneePhone}}</template>
                    </el-table-column>
                    <el-table-column label="邮编" width="140" align="center">
                        <template slot-scope="scope">{{scope.row.postalCode}}</template>
                    </el-table-column>
                    <el-table-column label="地址" align="center"><!--地址需要自己拼写-->
                        <template slot-scope="scope">{{scope.row.firstAddr}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--收货人表 E-->
            <div style="padding-top:20px;">
                <el-tag>商品信息:</el-tag>
            </div>
<!--商品表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="productList"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="商品名称" align="center">
                        <template slot-scope="scope">{{scope.row.orderDetails.productName}}</template>
                    </el-table-column><!--没有属性 只有规格id？？？？？？？？？？？？？-->
                    <el-table-column label="属性" width="200" align="center">
                        <template slot-scope="scope">{{scope.row.orderDetails.productName}}</template>
                    </el-table-column>
                    <el-table-column label="价格/货号" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.orderDetails.productPrice}}</template>
                        <template slot-scope="scope">{{scope.row.productPrice}}</template>
                    </el-table-column>
                    <el-table-column label="数量" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.orderDetails.productQuantity}}</template>
                    </el-table-column><!--后台算？？？-->
                    <el-table-column label="总价格" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.orderDetails.productQuantity}}</template>
                    </el-table-column>
                </el-table>
                <div style="float:right; margin-right:20px; margin-top:10px;">
                    <span>Total: $2133</span>
                </div>
            </div>
<!--商品表 E-->
            <div style="padding-top:20px;">
                <el-tag>费用信息:</el-tag>
            </div>
<!--费用表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="moneyList"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border><!--有可能买的不是一件商品-->
                    <el-table-column label="总金额" width="140" align="center">
                        <template slot-scope="scope">${{scope.row.orderMoeny}}</template>
                    </el-table-column>
                    <el-table-column label="用户折扣金额" align="center">
                        <template slot-scope="scope">-${{scope.row.orderMoeny}}</template>
                    </el-table-column>
                    <el-table-column label="商品折扣金额"  align="center">
                        <template slot-scope="scope">-${{scope.row.discountMoney}}</template>
                    </el-table-column>
                    <el-table-column label="优惠券" width="120" align="center">
                        <template slot-scope="scope">-${{scope.row.orderMoeny}}</template>
                    </el-table-column>
                    <el-table-column label="运费" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.shippingMoney}}</template>
                    </el-table-column>
                    <el-table-column label="税费" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.shippingMoney}}</template>
                    </el-table-column>
                    <el-table-column label="付款金额" width="140" align="center">
                        <template slot-scope="scope">-${{scope.row.paymentMoney}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--费用表 E-->
            <div style="padding-top:20px;">
                <el-tag>操作信息:</el-tag>
            </div>
<!--操作表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="operateList"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="操作时间" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                    <el-table-column label="操作人" width="140" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="订单状态" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="发货状态" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                    <el-table-column label="付款状态" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                    <el-table-column label="备注" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--操作表 E-->
        </el-card>
    </div>
</template>
<script>
import {getOrdersByOrdersId} from '@/api/orders';
export default {
    created(){
        this.getList();

    },
    data(){
        return{
            order:{},
            productList:null,
            orderList:null,
            consigneeList:null,
            moneyList:null,
            operateList:null,
        }
    },

    //过滤器 格式化
    filters: {
        //日期转变
        dateFormatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        //支付方式格式
        typeFormatter(value){
            if(value === 0){return '支付宝'} 
            else if(value === 1){return '微信'}
            else {return 'Not claer'}
        },
        //状态转变
        statusFormatter(value)
        {
            if(value===0){return 'All'} //待付款
            else if(value===1){return 'Pending payment'} //待付款
            else if(value===2){return 'Payment Fail'} //付款失败
            else if(value===3){return 'To be shipped'} //待发货
            else if(value===4){return 'Shipped'}  //已收货
            else if(value===5){return 'Completed'}  //已完成
            else if(value===6){return 'Closed'}  //已关闭
            else if(value===7){return 'Returning'}  //退货中
            else if(value===8){return 'refunding'}  //退款中
            else {return 'Not clear'}
        },
    },

    methods:{
        getList(){
            getOrdersByOrdersId(this.$route.query.id).then(response=>{
                this.orderList=response.data;
                this.order=response.data;
                this.consigneeList=response.data;
                this.productList=response.data;
                this.moneyList=response.data;
                this.operateList=response.data;
                //console.log(this.order);
            })
        },
    },
}
</script>
<style scoped>
   
</style>