<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
            <i class="el-icon-search"></i>
            <span>条件查询</span>
            <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
            查询
            </el-button>
            <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
            重置
            </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="订单编号：">
                <el-input v-model="listQuery.orderNumber" style="width: 203px" class="input-width" placeholder="订单编号"></el-input>
            </el-form-item>
            <el-form-item label="收货人：">
                <el-input v-model="listQuery.consigneeName" style="width: 203px" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：">
                <el-select v-model="listQuery.orderStatus" style="width: 203px" class="input-width" placeholder="全部" clearable>
                    <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间：">
                <el-date-picker
                  style="width: 363px"
                  v-model="listQuery.selectTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip!!!!!!!!!!!!!!!!!!!!!!!!!-->
    <div class="table-container">
      <el-table ref="orderTable"    
          highlight-current-row
          show-overflow-tooltip
        
          height="250"
          :data="list"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="用户姓名" width="130" align="center">
          <template slot-scope="scope">{{scope.row.consigneeName}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.paymentMoney}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.paymentMode | formatPayType}}</template>
        </el-table-column>
        <!-- <el-table-column label="订单来源" width="120" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column> -->
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.orderStatus | formatStatus}}</template>
        </el-table-column>
        <el-table-column  label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button>
            <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status===0">关闭订单</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status===1">订单发货</el-button>
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status===4">删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <!-- <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog> -->

  </div> 
</template>
<script>
import {fetchList} from '@/api/orders'
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderNumber: null,
    consigneeName:null,
    orderStatus:null,
    selectTime:null,
  };
export default {
    data(){
        return{
          listQuery: Object.assign({}, defaultListQuery),
          //listLoading: true,
          list: null,
          total: null,
          list:[
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三张三张三张三张三张三张三张三张三张三张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'支付宝',
              orderStatus:'已下单',

            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'支付宝',
              orderStatus:'已下单',
            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'支付宝',
              orderStatus:'已下单',
            }
          ],

          pickerOptions2: {
          shortcuts: [{
              text: '最近一周',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近一个月',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近三个月',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
              }
          }]
          },
          selectTime:'',
            
        }
    },
    methods:{

      //获取搜索列表
      getSearchList(){
          this.listLoading=true;
          //this.listQuery即为搜索条件
          fetchList(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
          });
      },

      //获取搜索结果
      handleSearchList(val){
          this.listQuery.pageNum = 1;
          this.listQuery.pageSize = val;
          this.getSearchList();
      },

      //重置
      handleResetSearch(){
        this.listQuery = Object.assign({}, defaultListQuery);
      },

        handleBatchOperate(){},
        handleViewOrder(){},
        handleCloseOrder(){},
        handleSelectionChange(){},
        handleDeleteOrder(){},
        handleViewLogistics(){},
        handleDeliveryOrder(){},
        handleCloseOrderConfirm(){},
    }
}
</script>

<style scoped>
  .pagination-container{
    float:right;
  }
  .batch-operate-container{
    display: inline-block;
  }
  
</style>
