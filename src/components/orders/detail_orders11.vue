<template>
    <div>
        <el-table ref="orderTable"    
          highlight-current-row
          :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
          show-overflow-tooltip
          :default-sort = "{prop: 'scope.row.createTime', order: 'descending'}"

          :data="list"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          v-loading="listLoading"
          border>
        <el-table-column label="订单号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="下单时间" sortable width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormatter}}</template>
        </el-table-column>
        <el-table-column label="收货人" width="130" align="center">
          <template slot-scope="scope">{{scope.row.consigneeName}}</template>
        </el-table-column>
        <el-table-column label="支付金额" width="120" align="center">
          <template slot-scope="scope">${{scope.row.paymentMoney}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orderStatus | statusFormatter}}</template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import {getOrdersByOrdersId} from '@/api/orders';

export default {
    data(){
        return{
            list:[],
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            getOrdersByOrdersId(this.$route.query.id).then(response => {
                this.list = response.data;
            }); 
        },
    },
}
</script>
<style scoped>

</style>


