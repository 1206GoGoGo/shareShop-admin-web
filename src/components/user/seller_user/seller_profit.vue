<template> 
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2; height:100%;">
            <div>
                <!-- <span>{{order.username}}收益详细信息</span> -->
                <span>订单信息:</span>
            </div>
<!--订单表 S-->
            <div class="table-container">

                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="list"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="订单号" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                    <el-table-column label="登录名" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column><!--不一张的表-->
                    <el-table-column label="支付方式" width="120" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="快递号" width="80" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                    <el-table-column label="运费" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="优惠券" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="订单金额" width="120" align="center">
                    <template slot-scope="scope">￥{{scope.row.paymentMoney}}</template>
                    </el-table-column>
                    <el-table-column label="实际金额" width="120" align="center">
                        <template slot-scope="scope">￥{{scope.row.paymentMoney}}</template>
                    </el-table-column>
                    <el-table-column label="下单时间" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.createTime | dateFormatter}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--订单表 E-->
            <div style="padding-top:20px;">
                <span>收货人信息:</span>
            </div>
<!--收货人表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="list"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="收货人姓名" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                    <el-table-column label="联系方式" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="邮编" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                    <el-table-column label="地址" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--收货人表 E-->
            <div style="padding-top:20px;">
                <span>商品信息:</span>
            </div>
<!--商品表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="list"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="商品名称"  align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                    <el-table-column label="属性" width="260" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="价格" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="数量" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                    <el-table-column label="总价格" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--商品表 E-->
            <div style="padding-top:20px;">
                <span>提现信息:</span>
            </div>
<!--提现表 S-->
            <div class="table-container">
                <el-table ref="orderTable"    
                    highlight-current-row
                    show-overflow-tooltip
                    
                    :data="list"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
                    <el-table-column label="交易时间"  align="center">
                        <template slot-scope="scope">{{scope.row.orderNumber}}</template>
                    </el-table-column>
                    <el-table-column label="交易金额" width="130" align="center">
                        <template slot-scope="scope">{{scope.row.consigneeName}}</template>
                    </el-table-column>
                    <el-table-column label="到账银行" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
                    </el-table-column>
                    <el-table-column label="银行卡号" width="260" align="center">
                        <template slot-scope="scope">{{scope.row.orderId}}</template>
                    </el-table-column>
                </el-table>
            </div>
<!--提现表 E-->
        </el-card>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
   
</style>


